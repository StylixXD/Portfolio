import * as THREE from "three";

export function createGravitationalDust(particleCount = 14000): {
  points: THREE.Points;
  update: (time: number, mouseX: number, mouseY: number, scrollWarp: number) => void;
} {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const radii = new Float32Array(particleCount);
  const angles = new Float32Array(particleCount);
  const speeds = new Float32Array(particleCount);
  const verticalOffsets = new Float32Array(particleCount);

  const innerColor = new THREE.Color("#00F0FF");
  const midColor = new THREE.Color("#FFFFFF");
  const outerColor = new THREE.Color("#FF6B00");
  const farColor = new THREE.Color("#2A313D");

  for (let i = 0; i < particleCount; i++) {
    // Inverse square distribution to populate denser core near singularity
    const u = Math.random();
    const r = 4.0 + Math.pow(u, 1.8) * 36.0;
    const angle = Math.random() * Math.PI * 2;
    // Disk thickness increases slightly with radius
    const vOffset = (Math.random() - 0.5) * (0.8 + r * 0.08);

    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = vOffset;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    originalPositions[i * 3] = x;
    originalPositions[i * 3 + 1] = y;
    originalPositions[i * 3 + 2] = z;

    radii[i] = r;
    angles[i] = angle;
    // Keplerian orbital velocity v ~ 1 / sqrt(r)
    speeds[i] = (1.8 / Math.sqrt(r)) * (0.85 + Math.random() * 0.3);
    verticalOffsets[i] = vOffset;

    // Color gradient based on radius
    const t = (r - 4.0) / 36.0;
    const pColor = new THREE.Color();
    if (t < 0.2) {
      pColor.lerpColors(midColor, innerColor, t / 0.2);
    } else if (t < 0.6) {
      pColor.lerpColors(innerColor, outerColor, (t - 0.2) / 0.4);
    } else {
      pColor.lerpColors(outerColor, farColor, (t - 0.6) / 0.4);
    }

    colors[i * 3] = pColor.r;
    colors[i * 3 + 1] = pColor.g;
    colors[i * 3 + 2] = pColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Particle Material with circular soft falloff
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.7)");
    gradient.addColorStop(0.8, "rgba(255,255,255,0.15)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.PointsMaterial({
    size: 0.28,
    map: texture,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.x = Math.PI * 0.42; // Match accretion disk plane

  const update = (time: number, mouseX: number, mouseY: number, scrollWarp: number) => {
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const mouseDistortion = Math.sqrt(mouseX * mouseX + mouseY * mouseY);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const r = radii[i];
      const speed = speeds[i];

      // Update Keplerian orbit angle
      angles[i] += speed * 0.008;
      const curAngle = angles[i];

      // Base coordinates on orbital plane
      let curR = r;
      // Pointer gravitational pull / deflection
      if (mouseDistortion > 0.01) {
        const angleDiff = Math.abs(Math.sin(curAngle - mouseX * 2.0));
        curR += (1.0 - angleDiff) * mouseY * 1.5;
      }

      const x = Math.cos(curAngle) * curR;
      const z = Math.sin(curAngle) * curR;
      // Subtle vertical wave flutter + scroll warp stretching
      const y = verticalOffsets[i] + Math.sin(curAngle * 3.0 + time * 2.0) * 0.25 - scrollWarp * 0.08;

      posArray[idx] = x;
      posArray[idx + 1] = y;
      posArray[idx + 2] = z;
    }

    posAttr.needsUpdate = true;
  };

  return { points, update };
}
