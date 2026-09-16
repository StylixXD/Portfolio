"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { createSingularityCore } from "./SingularityCore";
import { createGravitationalDust } from "./GravitationalDust";
import { createOrbitalSystem, OrbitalNodeObject } from "./OrbitalSystem";
import { OrbitalProject } from "../../lib/projectData";
import { soundEngine } from "../../lib/soundEngine";
import { CanvasFallback } from "./CanvasFallback";

interface SingularitySceneProps {
  onSelectProject: (project: OrbitalProject) => void;
  selectedProject: OrbitalProject | null;
  onFpsUpdate?: (fps: number) => void;
  onCoordsUpdate?: (coords: { lat: string; lng: string; rad: string }) => void;
  focusedNodeIndex?: number;
}

export const SingularityScene: React.FC<SingularitySceneProps> = ({
  onSelectProject,
  selectedProject,
  onFpsUpdate,
  onCoordsUpdate,
  focusedNodeIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const orbitalSystemRef = useRef<ReturnType<typeof createOrbitalSystem> | null>(null);
  const dustUpdateRef = useRef<((time: number, mx: number, my: number, warp: number) => void) | null>(null);
  const singularityGroupRef = useRef<THREE.Group | null>(null);

  // Interaction tracking refs
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const scrollOffsetRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);

  // Camera baseline
  const cameraBasePos = useRef(new THREE.Vector3(0, 18, 38));
  const cameraTargetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isLockedOnNodeRef = useRef(false);

  // Handle focus when user selects via HUD or direct click
  const focusOnNode = useCallback((node: OrbitalNodeObject) => {
    if (!cameraRef.current) return;
    isLockedOnNodeRef.current = true;
    soundEngine.playLock();

    const nodePos = new THREE.Vector3();
    node.group.getWorldPosition(nodePos);

    // Position camera offset to view node with singularity dramatic backdrop
    const camTargetPos = nodePos.clone().add(new THREE.Vector3(3.5, 2.5, 5.0));

    gsap.killTweensOf(cameraRef.current.position);
    gsap.killTweensOf(cameraTargetLookAt.current);

    gsap.to(cameraRef.current.position, {
      x: camTargetPos.x,
      y: camTargetPos.y,
      z: camTargetPos.z,
      duration: 1.8,
      ease: "power3.inOut",
    });

    gsap.to(cameraTargetLookAt.current, {
      x: nodePos.x,
      y: nodePos.y,
      z: nodePos.z,
      duration: 1.8,
      ease: "power3.inOut",
    });
  }, []);

  const resetCamera = useCallback(() => {
    if (!cameraRef.current) return;
    isLockedOnNodeRef.current = false;

    gsap.killTweensOf(cameraRef.current.position);
    gsap.killTweensOf(cameraTargetLookAt.current);

    gsap.to(cameraRef.current.position, {
      x: cameraBasePos.current.x,
      y: cameraBasePos.current.y,
      z: cameraBasePos.current.z,
      duration: 1.6,
      ease: "power3.out",
    });

    gsap.to(cameraTargetLookAt.current, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.6,
      ease: "power3.out",
    });
  }, []);

  // Respond to prop changes for selected project or focused index
  useEffect(() => {
    if (!orbitalSystemRef.current) return;
    if (selectedProject) {
      const node = orbitalSystemRef.current.nodes.find(
        (n) => n.project.id === selectedProject.id
      );
      if (node) {
        focusOnNode(node);
      }
    } else if (focusedNodeIndex !== undefined && focusedNodeIndex >= 0) {
      const node = orbitalSystemRef.current.nodes[focusedNodeIndex];
      if (node) {
        focusOnNode(node);
      }
    } else {
      resetCamera();
    }
  }, [selectedProject, focusedNodeIndex, focusOnNode, resetCamera]);

  useEffect(() => {
    // Detect WebGL capability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#010204");
    scene.fog = new THREE.FogExp2("#010204", 0.008);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.copy(cameraBasePos.current);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x223344, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00F0FF, 3.5, 60);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0xFF6B00, 2.0, 50);
    secondaryLight.position.set(5, -2, 5);
    scene.add(secondaryLight);

    // 1. Singularity Core & Accretion Disk
    const singularity = createSingularityCore();
    scene.add(singularity);
    singularityGroupRef.current = singularity;

    // 2. Gravitational Dust
    const dust = createGravitationalDust(14000);
    scene.add(dust.points);
    dustUpdateRef.current = dust.update;

    // 3. Orbital Satellites System
    const orbitalSystem = createOrbitalSystem((project) => {
      onSelectProject(project);
    });
    scene.add(orbitalSystem.systemGroup);
    orbitalSystemRef.current = orbitalSystem;

    // 4. Background Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2800;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 240 + Math.random() * 200;

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const isCyan = Math.random() > 0.85;
      starColors[i * 3] = isCyan ? 0.4 : 1.0;
      starColors[i * 3 + 1] = isCyan ? 0.9 : 1.0;
      starColors[i * 3 + 2] = 1.0;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Raycaster for 3D interactions
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2();

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouse2D.x = mouseRef.current.targetX;
      mouse2D.y = mouseRef.current.targetY;

      // Raycast to check for orbital node hovers
      raycaster.setFromCamera(mouse2D, camera);
      const targets = orbitalSystem.getRaycastTargets();
      const intersects = raycaster.intersectObjects(targets, true);

      let foundHovered = false;
      orbitalSystem.nodes.forEach((node) => {
        let isNodeHit = false;
        for (const hit of intersects) {
          if (hit.object === node.interactiveMesh || node.group.children.includes(hit.object)) {
            isNodeHit = true;
            break;
          }
        }

        if (isNodeHit && !node.isHovered) {
          node.isHovered = true;
          foundHovered = true;
          soundEngine.playHover();
        } else if (!isNodeHit && node.isHovered) {
          node.isHovered = false;
        }
      });

      if (foundHovered) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    };

    const handleClick = (e: MouseEvent) => {
      mouse2D.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse2D.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse2D, camera);
      const targets = orbitalSystem.getRaycastTargets();
      const intersects = raycaster.intersectObjects(targets, true);

      if (intersects.length > 0) {
        const hitObj = intersects[0].object as THREE.Mesh;
        const node = orbitalSystem.getNodeByMesh(hitObj) || 
          orbitalSystem.nodes.find(n => n.group.children.includes(hitObj));
        if (node) {
          focusOnNode(node);
          onSelectProject(node.project);
        }
      }
    };

    // Drag to rotate universe
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleDragMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || isLockedOnNodeRef.current) return;
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };

      scene.rotation.y += deltaX * 0.003;
      scene.rotation.x = Math.max(-0.4, Math.min(0.6, scene.rotation.x + deltaY * 0.003));
    };

    // Touch support for mobile universe orbit
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1 || isLockedOnNodeRef.current) return;
      const deltaX = e.touches[0].clientX - previousMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosRef.current.y;
      previousMousePosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      scene.rotation.y += deltaX * 0.004;
      scene.rotation.x = Math.max(-0.4, Math.min(0.6, scene.rotation.x + deltaY * 0.004));
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const handleScroll = () => {
      const curY = window.scrollY;
      const delta = curY - lastScrollYRef.current;
      lastScrollYRef.current = curY;
      scrollOffsetRef.current = curY;
      scrollVelocityRef.current = Math.abs(delta);
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // RAF Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameTimes: number[] = [];
    let lastFpsBroadcast = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // FPS tracking
      const now = performance.now();
      frameTimes.push(now);
      while (frameTimes.length > 0 && frameTimes[0] <= now - 1000) {
        frameTimes.shift();
      }
      if (now - lastFpsBroadcast > 400 && onFpsUpdate) {
        onFpsUpdate(frameTimes.length);
        lastFpsBroadcast = now;
      }

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Scroll decay
      scrollVelocityRef.current *= 0.92;

      // Update Singularity shaders
      if (singularityGroupRef.current) {
        singularityGroupRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
            if (child.material.uniforms.uTime) {
              child.material.uniforms.uTime.value = time;
            }
          }
        });
      }

      // Update Dust
      if (dustUpdateRef.current) {
        dustUpdateRef.current(
          time,
          mouseRef.current.x,
          mouseRef.current.y,
          scrollVelocityRef.current
        );
      }

      // Update Orbital Satellites
      orbitalSystem.update(delta, time);

      // Starfield subtle axial drift
      starField.rotation.y = time * 0.008;

      // Camera motion when not locked on a specific node
      if (!isLockedOnNodeRef.current) {
        // Natural parallax
        const parallaxX = mouseRef.current.x * 2.5;
        const parallaxY = mouseRef.current.y * 1.5;

        // Scroll drives camera descent & subtle zoom
        const scrollFactor = Math.min(1.0, scrollOffsetRef.current / 3000);
        camera.position.x = cameraBasePos.current.x + parallaxX;
        camera.position.y = cameraBasePos.current.y + parallaxY - scrollFactor * 14.0;
        camera.position.z = cameraBasePos.current.z - scrollFactor * 10.0;

        camera.lookAt(cameraTargetLookAt.current);
      } else {
        camera.lookAt(cameraTargetLookAt.current);
      }

      // Dynamic coordinates calculation for HUD
      if (onCoordsUpdate) {
        const camDist = camera.position.length();
        const lat = ((camera.position.y / camDist) * 90).toFixed(2);
        const lng = ((Math.atan2(camera.position.x, camera.position.z) * 180) / Math.PI).toFixed(2);
        const rad = (camDist / 38).toFixed(3);
        onCoordsUpdate({
          lat: (Number(lat) >= 0 ? "+" : "") + lat + "°",
          lng: (Number(lng) >= 0 ? "+" : "") + lng + "°",
          rad: rad + " AU",
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectProject, focusOnNode, onFpsUpdate, onCoordsUpdate]);

  if (!hasWebGL) {
    return <CanvasFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-auto overflow-hidden select-none"
      style={{ touchAction: "none" }}
    />
  );
};
