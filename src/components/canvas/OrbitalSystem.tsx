import * as THREE from "three";
import { ORBITAL_PROJECTS, OrbitalProject } from "../../lib/projectData";

export interface OrbitalNodeObject {
  project: OrbitalProject;
  group: THREE.Group;
  interactiveMesh: THREE.Mesh;
  gimbal1?: THREE.Object3D;
  gimbal2?: THREE.Object3D;
  emissiveCore: THREE.Mesh;
  halo: THREE.Mesh;
  currentAngle: number;
  currentElevation: number;
  targetElevation: number;
  speedMultiplier: number;
  isHovered: boolean;
}

export function createOrbitalSystem(onSelectNode: (project: OrbitalProject) => void): {
  systemGroup: THREE.Group;
  nodes: OrbitalNodeObject[];
  update: (delta: number, time: number) => void;
  getRaycastTargets: () => THREE.Mesh[];
  getNodeByMesh: (mesh: THREE.Mesh) => OrbitalNodeObject | undefined;
} {
  const systemGroup = new THREE.Group();
  const nodes: OrbitalNodeObject[] = [];

  ORBITAL_PROJECTS.forEach((project, idx) => {
    const nodeGroup = new THREE.Group();
    const config = project.orbitalTelemetry;

    // Build unique mechanical geometry for each node
    let interactiveMesh: THREE.Mesh;
    let emissiveCore: THREE.Mesh;
    let halo: THREE.Mesh;
    let gimbal1: THREE.Object3D | undefined;
    let gimbal2: THREE.Object3D | undefined;

    const accentColor = new THREE.Color(config.color);

    if (idx === 0) {
      // 01: HYPERDRIVE - Gyroscopic Reactor Node
      // Inner glowing core
      const coreGeo = new THREE.DodecahedronGeometry(0.9, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 1.2,
        roughness: 0.2,
        metalness: 0.8,
      });
      emissiveCore = new THREE.Mesh(coreGeo, coreMat);
      nodeGroup.add(emissiveCore);

      // Outer mechanical Gimbal Ring 1
      const ring1Geo = new THREE.TorusGeometry(1.6, 0.08, 16, 64);
      const metalMat = new THREE.MeshStandardMaterial({
        color: 0x8899A6,
        roughness: 0.3,
        metalness: 0.9,
      });
      gimbal1 = new THREE.Mesh(ring1Geo, metalMat);
      nodeGroup.add(gimbal1);

      // Outer Gimbal Ring 2
      const ring2Geo = new THREE.TorusGeometry(2.0, 0.06, 16, 64);
      gimbal2 = new THREE.Mesh(ring2Geo, metalMat);
      nodeGroup.add(gimbal2);

      // Solar arrays / telemetry fins
      const finGeo = new THREE.BoxGeometry(0.1, 2.8, 0.5);
      const fin1 = new THREE.Mesh(finGeo, metalMat);
      fin1.position.x = 2.1;
      nodeGroup.add(fin1);
      const fin2 = new THREE.Mesh(finGeo, metalMat);
      fin2.position.x = -2.1;
      nodeGroup.add(fin2);

      interactiveMesh = emissiveCore;
    } else if (idx === 1) {
      // 02: NEBULA - Celestial Sphere with Geodesic Wireframe
      const sphereGeo = new THREE.SphereGeometry(1.1, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x111625,
        roughness: 0.2,
        metalness: 0.9,
        emissive: accentColor,
        emissiveIntensity: 0.6,
      });
      emissiveCore = new THREE.Mesh(sphereGeo, sphereMat);
      nodeGroup.add(emissiveCore);

      // Geodesic outer wireframe
      const wireGeo = new THREE.IcosahedronGeometry(1.5, 2);
      const wireMat = new THREE.MeshBasicMaterial({
        color: accentColor,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      gimbal1 = new THREE.Mesh(wireGeo, wireMat);
      nodeGroup.add(gimbal1);

      // Equatorial particle halo
      const ringGeo = new THREE.RingGeometry(1.6, 2.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: accentColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      gimbal2 = new THREE.Mesh(ringGeo, ringMat);
      gimbal2.rotation.x = Math.PI * 0.5;
      nodeGroup.add(gimbal2);

      interactiveMesh = emissiveCore;
    } else if (idx === 2) {
      // 03: PULSAR - Dual Octahedron Telemetry Satellite
      const octGeo = new THREE.OctahedronGeometry(1.0, 0);
      const octMat = new THREE.MeshStandardMaterial({
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.95,
      });
      emissiveCore = new THREE.Mesh(octGeo, octMat);
      nodeGroup.add(emissiveCore);

      // Outer inverse octahedron cage
      const cageGeo = new THREE.OctahedronGeometry(1.7, 0);
      const cageMat = new THREE.MeshStandardMaterial({
        color: 0x556677,
        wireframe: true,
        metalness: 0.9,
      });
      gimbal1 = new THREE.Mesh(cageGeo, cageMat);
      nodeGroup.add(gimbal1);

      // Radar dish emitter
      const dishGeo = new THREE.ConeGeometry(0.8, 0.4, 24, 1, true);
      const dishMat = new THREE.MeshStandardMaterial({
        color: 0xCCCCCC,
        metalness: 0.9,
        roughness: 0.2,
      });
      gimbal2 = new THREE.Mesh(dishGeo, dishMat);
      gimbal2.position.y = 1.3;
      nodeGroup.add(gimbal2);

      interactiveMesh = emissiveCore;
    } else {
      // 04: SYNAPSE - Quantum Icosahedral Core
      const icoGeo = new THREE.IcosahedronGeometry(1.1, 0);
      const icoMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        emissive: accentColor,
        emissiveIntensity: 1.0,
        roughness: 0.1,
        metalness: 1.0,
      });
      emissiveCore = new THREE.Mesh(icoGeo, icoMat);
      nodeGroup.add(emissiveCore);

      // Quantum orbital ringlets
      const ringGeo = new THREE.TorusGeometry(1.8, 0.05, 12, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00F0FF,
        transparent: true,
        opacity: 0.8,
      });
      gimbal1 = new THREE.Mesh(ringGeo, ringMat);
      gimbal1.rotation.x = 0.8;
      nodeGroup.add(gimbal1);

      gimbal2 = new THREE.Mesh(ringGeo, ringMat);
      gimbal2.rotation.y = 1.2;
      nodeGroup.add(gimbal2);

      interactiveMesh = emissiveCore;
    }

    // Atmospheric Glow Halo
    const haloGeo = new THREE.SphereGeometry(2.3, 24, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    halo = new THREE.Mesh(haloGeo, haloMat);
    nodeGroup.add(halo);

    // Initial position on orbit
    const initialAngle = (idx * Math.PI * 2) / 4 + 0.4;
    const r = config.orbitRadius;
    nodeGroup.position.set(
      Math.cos(initialAngle) * r,
      config.elevation,
      Math.sin(initialAngle) * r
    );

    // Give the interactive mesh user data reference
    interactiveMesh.userData = { projectId: project.id, projectIndex: idx };

    systemGroup.add(nodeGroup);

    nodes.push({
      project,
      group: nodeGroup,
      interactiveMesh,
      gimbal1,
      gimbal2,
      emissiveCore,
      halo,
      currentAngle: initialAngle,
      currentElevation: config.elevation,
      targetElevation: config.elevation,
      speedMultiplier: 1.0,
      isHovered: false,
    });
  });

  // Orbital Path Guide Lines (delicate spatial rings)
  ORBITAL_PROJECTS.forEach((project) => {
    const r = project.orbitalTelemetry.orbitRadius;
    const curve = new THREE.EllipseCurve(0, 0, r, r, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(128);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x334155,
      transparent: true,
      opacity: 0.22,
    });
    const orbitLine = new THREE.Line(lineGeo, lineMat);
    orbitLine.rotation.x = Math.PI * 0.42; // Match inclination
    systemGroup.add(orbitLine);
  });

  const update = (delta: number, time: number) => {
    nodes.forEach((node) => {
      const config = node.project.orbitalTelemetry;

      // When hovered, slow down orbit smoothly (Keplerian deceleration)
      const targetMultiplier = node.isHovered ? 0.08 : 1.0;
      node.speedMultiplier += (targetMultiplier - node.speedMultiplier) * 0.08;

      node.currentAngle += config.orbitSpeed * node.speedMultiplier * delta * 0.8;

      // Smooth elevation transition
      node.targetElevation = node.isHovered ? config.elevation + 1.2 : config.elevation;
      node.currentElevation += (node.targetElevation - node.currentElevation) * 0.1;

      const r = config.orbitRadius;
      const x = Math.cos(node.currentAngle) * r;
      const z = Math.sin(node.currentAngle) * r;
      const y = node.currentElevation + Math.sin(node.currentAngle * 2.0 + time) * 0.3;

      node.group.position.set(x, y, z);

      // Local mechanical rotations
      if (node.gimbal1) {
        node.gimbal1.rotation.x += config.rotationSpeed * delta;
        node.gimbal1.rotation.y += config.rotationSpeed * delta * 0.7;
      }
      if (node.gimbal2) {
        node.gimbal2.rotation.y -= config.rotationSpeed * delta * 1.2;
        node.gimbal2.rotation.z += config.rotationSpeed * delta * 0.5;
      }
      node.emissiveCore.rotation.y += config.rotationSpeed * delta * 0.5;

      // Hover emissive flare
      const targetCoreIntensity = node.isHovered ? 2.5 : 1.0;
      const mat = node.emissiveCore.material as THREE.MeshStandardMaterial;
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity += (targetCoreIntensity - mat.emissiveIntensity) * 0.1;
      }
      const haloMat = node.halo.material as THREE.MeshBasicMaterial;
      const targetHaloOpacity = node.isHovered ? 0.35 : 0.12;
      haloMat.opacity += (targetHaloOpacity - haloMat.opacity) * 0.1;
    });
  };

  const getRaycastTargets = () => nodes.map((n) => n.interactiveMesh);

  const getNodeByMesh = (mesh: THREE.Mesh) =>
    nodes.find((n) => n.interactiveMesh === mesh);

  return { systemGroup, nodes, update, getRaycastTargets, getNodeByMesh };
}
