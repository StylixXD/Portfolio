import * as THREE from "three";

export function createSingularityCore(): THREE.Group {
  const group = new THREE.Group();

  // 1. Event Horizon (Pitch-black light-swallowing sphere)
  const eventHorizonGeo = new THREE.SphereGeometry(3.2, 64, 64);
  const eventHorizonMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  const eventHorizon = new THREE.Mesh(eventHorizonGeo, eventHorizonMat);
  group.add(eventHorizon);

  // 2. Gravitational Lensing Rim / Photon Ring (Cyan / White-hot edge)
  const rimGeo = new THREE.SphereGeometry(3.26, 64, 64);
  const rimShader = {
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#00F0FF") },
      uColor2: { value: new THREE.Color("#FFFFFF") },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = 1.0 - abs(dot(viewDir, normal));
        fresnel = pow(fresnel, 4.0);
        
        // Doppler & thermal flutter
        float flutter = sin(uTime * 4.0 + normal.y * 8.0) * 0.15 + 0.85;
        vec3 col = mix(uColor1, uColor2, fresnel * flutter);
        
        gl_FragColor = vec4(col, fresnel * 0.95);
      }
    `,
  };

  const rimMat = new THREE.ShaderMaterial({
    uniforms: rimShader.uniforms,
    vertexShader: rimShader.vertexShader,
    fragmentShader: rimShader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });

  const photonRim = new THREE.Mesh(rimGeo, rimMat);
  group.add(photonRim);

  // 3. Multi-Layer Relativistic Accretion Disk
  const diskGeo = new THREE.RingGeometry(3.5, 11.5, 128, 8);
  const diskShader = {
    uniforms: {
      uTime: { value: 0 },
      uInnerColor: { value: new THREE.Color("#FFFFFF") },
      uMidColor: { value: new THREE.Color("#00F0FF") },
      uOuterColor: { value: new THREE.Color("#FF6B00") },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uInnerColor;
      uniform vec3 uMidColor;
      uniform vec3 uOuterColor;
      varying vec2 vUv;
      varying vec3 vPos;

      // 2D Simplex Noise approximation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        float r = length(vPos.xy);
        float normR = (r - 3.5) / (11.5 - 3.5); // 0.0 at inner, 1.0 at outer
        if (normR < 0.0 || normR > 1.0) discard;

        float angle = atan(vPos.y, vPos.x);

        // Relativistic differential rotation (inner rotates faster)
        float spinSpeed = (1.0 / (normR + 0.3)) * 1.5;
        float twistedAngle = angle - uTime * spinSpeed;

        // Spiral noise bands
        vec2 noiseCoord = vec2(normR * 6.0, twistedAngle * 3.0);
        float noiseVal = snoise(noiseCoord) * 0.5 + 0.5;
        float fineNoise = snoise(noiseCoord * 2.5 + uTime) * 0.5 + 0.5;
        float density = mix(noiseVal, fineNoise, 0.4);

        // Relativistic Doppler beaming (left side approaches, blueshifted & brighter)
        float doppler = 1.0 + 0.45 * sin(angle);

        // Multi-tier color ramp: Inner white/cyan -> Mid cyan -> Outer amber
        vec3 col;
        if (normR < 0.25) {
          col = mix(uInnerColor, uMidColor, normR / 0.25);
        } else {
          col = mix(uMidColor, uOuterColor, (normR - 0.25) / 0.75);
        }

        // Fade out cleanly at inner edge and outer boundary
        float edgeAlpha = smoothstep(0.0, 0.1, normR) * smoothstep(1.0, 0.65, normR);
        float finalAlpha = edgeAlpha * (density * 0.8 + 0.3) * doppler;

        gl_FragColor = vec4(col * doppler, clamp(finalAlpha, 0.0, 0.95));
      }
    `,
  };

  const diskMat = new THREE.ShaderMaterial({
    uniforms: diskShader.uniforms,
    vertexShader: diskShader.vertexShader,
    fragmentShader: diskShader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const disk = new THREE.Mesh(diskGeo, diskMat);
  disk.rotation.x = Math.PI * 0.42; // Tilt slightly toward viewer
  disk.rotation.z = 0.15;
  group.add(disk);

  return group;
}
