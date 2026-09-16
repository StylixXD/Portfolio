export interface OrbitalProject {
  id: string;
  index: string;
  name: string;
  codeName: string;
  category: string;
  tagline: string;
  description: string;
  architecture: string;
  orbitalTelemetry: {
    orbitRadius: number;
    orbitSpeed: number;
    inclination: number;
    elevation: number;
    rotationSpeed: number;
    color: string;
    accentColor: string;
    spectralClass: string;
    mass: string;
    diameter: string;
    velocity: string;
  };
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  techStack: string[];
  capabilities: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const ORBITAL_PROJECTS: OrbitalProject[] = [
  {
    id: "core-systems",
    index: "01",
    name: "HYPERDRIVE",
    codeName: "SYS-HD01",
    category: "HIGH-PERFORMANCE ARCHITECTURE",
    tagline: "Deterministic distributed runtime with zero-allocation memory pipelines.",
    description:
      "A bare-metal, low-latency computing engine architected for real-time mission telemetry and parallel state synchronization. Engineered with custom memory arenas, lock-free ring buffers, and SIMD-accelerated data transformations to guarantee sub-millisecond execution.",
    architecture:
      "Asynchronous actor topology with distributed consensus relays. Decoupled I/O threads feed memory-mapped cache rings directly to GPU compute pipelines, bypassing OS context switches.",
    orbitalTelemetry: {
      orbitRadius: 16.5,
      orbitSpeed: 0.18,
      inclination: 0.22,
      elevation: 1.8,
      rotationSpeed: 0.4,
      color: "#00F0FF",
      accentColor: "#FFFFFF",
      spectralClass: "SYNCHRONOUS O-TYPE",
      mass: "1.42e12 KG",
      diameter: "14,280 KM",
      velocity: "28.4 KM/S"
    },
    metrics: [
      { label: "P99 LATENCY", value: "0.14 ms", change: "-42% overhead" },
      { label: "THROUGHPUT", value: "4.8M ops/sec", change: "Linear scale" },
      { label: "MEMORY LEAK RATE", value: "0.00%", change: "Zero gc pauses" },
      { label: "FAULT TOLERANCE", value: "99.999%", change: "Self-healing" }
    ],
    techStack: ["RUST", "TYPESCRIPT", "WEBGL", "SIMD", "LOCK-FREE QUEUES", "DOCKER"],
    capabilities: [
      "Zero-copy serialization protocol",
      "Dynamic backpressure routing",
      "Deterministic state replication across nodes",
      "Real-time hardware performance telemetry"
    ],
    liveUrl: "https://github.com/StylixXD",
    repoUrl: "https://github.com/StylixXD/hyperdrive"
  },
  {
    id: "realtime-engine",
    index: "02",
    name: "NEBULA",
    codeName: "ENG-NB02",
    category: "INTERACTIVE WEBGL / SPATIAL GRAPHICS",
    tagline: "Volumetric raymarching and particle physics engine for spatial web interfaces.",
    description:
      "A bleeding-edge real-time 3D renderer built on top of WebGL and custom GLSL compute shaders. Features physical-based relativistic gravitational lensing, atmospheric scattering, procedural volumetric noise, and 60 FPS instanced geometry orchestration on mobile and desktop.",
    architecture:
      "Two-pass deferred rendering with GPU-driven compute buffers. Particle simulation updates occur in custom WebGL fragment passes, transferring positions directly to vertex buffers without CPU readbacks.",
    orbitalTelemetry: {
      orbitRadius: 24.0,
      orbitSpeed: 0.12,
      inclination: -0.35,
      elevation: -2.4,
      rotationSpeed: 0.25,
      color: "#FF6B00",
      accentColor: "#00F0FF",
      spectralClass: "LUMINOUS B-CLASS",
      mass: "3.85e13 KG",
      diameter: "48,600 KM",
      velocity: "19.8 KM/S"
    },
    metrics: [
      { label: "PARTICLE COUNT", value: "32,000+", change: "Zero frame drops" },
      { label: "FRAME TIME", value: "16.1 ms (60 FPS)", change: "Adaptive DPR" },
      { label: "SHADER COMPLEXITY", value: "128 ALU Instructions", change: "Optimized GLSL" },
      { label: "GPU MEMORY", value: "< 48 MB", change: "Buffer pooling" }
    ],
    techStack: ["THREE.JS", "CUSTOM GLSL", "WEBGL2", "REACT 19", "MATH-FLOAT32", "GSAP"],
    capabilities: [
      "Relativistic gravitational lensing raymarcher",
      "Volumetric accretion disk with procedural Perlin noise",
      "Dynamic camera dolly choreography with easing curves",
      "Multi-viewport responsive canvas synchronization"
    ],
    liveUrl: "https://github.com/StylixXD",
    repoUrl: "https://github.com/StylixXD/nebula-engine"
  },
  {
    id: "event-runtime",
    index: "03",
    name: "PULSAR",
    codeName: "RUN-PS03",
    category: "DISTRIBUTED ASYNC INFRASTRUCTURE",
    tagline: "Sub-millisecond event streaming daemon with deterministic backpressure.",
    description:
      "A high-velocity event streaming and orchestration infrastructure. Routes millions of concurrent event pulses across edge nodes with cryptographic tamper-proofing, automated failover gossiping, and live WebSocket telemetry feeds.",
    architecture:
      "Peer-to-peer gossip protocol over UDP/QUIC with fallback TLS WebSockets. Zero-allocation ring buffers handle message ingress while thread pools execute asynchronous subscriber notifications.",
    orbitalTelemetry: {
      orbitRadius: 31.5,
      orbitSpeed: 0.08,
      inclination: 0.15,
      elevation: 3.1,
      rotationSpeed: 0.55,
      color: "#00F0FF",
      accentColor: "#FF6B00",
      spectralClass: "PULSING NEUTRON FLUX",
      mass: "8.12e14 KG",
      diameter: "22,100 KM",
      velocity: "14.2 KM/S"
    },
    metrics: [
      { label: "EVENT INGRESS", value: "1.2M msg/sec", change: "Sub-10ms delivery" },
      { label: "PEER CONNECTIONS", value: "10,000+ nodes", change: "Mesh topology" },
      { label: "PACKET LOSS", value: "< 0.001%", change: "Forward error correction" },
      { label: "CPU CONSUMPTION", value: "2.4% avg", change: "Async epoll/kqueue" }
    ],
    techStack: ["PYTHON 3.13", "ASYNCIO", "RUST NAPI", "WEBSOCKETS", "REDIS SHARDS", "KAFKA"],
    capabilities: [
      "Cryptographic payload signature validation (Ed25519)",
      "Dynamic rate limiting and DDoS token buckets",
      "Autonomous mesh node discovery and healing",
      "Streaming telemetry export to Prometheus/Grafana"
    ],
    liveUrl: "https://github.com/StylixXD",
    repoUrl: "https://github.com/StylixXD/pulsar-runtime"
  },
  {
    id: "creative-ai",
    index: "04",
    name: "SYNAPSE",
    codeName: "GEN-SY04",
    category: "GENERATIVE AI & NEURAL SHADERS",
    tagline: "Real-time latent vector navigation and procedural node-graph generative tooling.",
    description:
      "An interactive neural visual synthesis laboratory. Translates high-dimensional embedding vectors into real-time visual parameters, procedural surface displacements, and dynamic typographic motion choreography.",
    architecture:
      "Client-side WebAssembly inference engine linked directly to WebGL uniform buffers. Latent activations directly modulate shader frequencies and geometric topologies in real time.",
    orbitalTelemetry: {
      orbitRadius: 38.0,
      orbitSpeed: 0.05,
      inclination: -0.18,
      elevation: -1.5,
      rotationSpeed: 0.15,
      color: "#FFFFFF",
      accentColor: "#00F0FF",
      spectralClass: "NEURAL QUANTUM CLUSTER",
      mass: "5.60e13 KG",
      diameter: "36,400 KM",
      velocity: "11.5 KM/S"
    },
    metrics: [
      { label: "INFERENCE SPEED", value: "12 ms/token", change: "Quantized weights" },
      { label: "VECTOR DIMENSIONS", value: "1536-D", change: "UMAP projection" },
      { label: "SHADER REGEN TIME", value: "Instant", change: "Hot compilation" },
      { label: "ACCURACY RATE", value: "98.7%", change: "Empirical validation" }
    ],
    techStack: ["PYTORCH", "ONNX RUNTIME", "WEBASSEMBLY", "GLSL SHADERS", "REACT", "TAILWIND"],
    capabilities: [
      "Real-time latent space audio-reactive distortion",
      "Interactive multi-modal parameter steering",
      "Procedural SVG & WebGL mesh topology morphing",
      "Continuous vector cache synchronization"
    ],
    liveUrl: "https://github.com/StylixXD",
    repoUrl: "https://github.com/StylixXD/synapse-ai"
  }
];
