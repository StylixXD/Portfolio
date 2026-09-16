"use client";

import React from "react";
import { soundEngine } from "../../lib/soundEngine";
import { Terminal, Layers, Box, Cpu } from "lucide-react";

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-16 flex items-center select-none pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              SYSTEM TELEMETRY // CORE SPECIFICATIONS
            </div>
            <h2 className="font-chunko text-5xl sm:text-7xl md:text-8xl uppercase text-white tracking-wider leading-none">
              ENGINEERING ARCHITECTURE
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-sm">
            PRECISION-ENGINEERED CODEBASES // ZERO FLUFF // HIGH RELIABILITY.
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 01 */}
          <div
            onMouseEnter={() => soundEngine.playHover()}
            className="border border-white/10 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner hover:border-[#00F0FF] transition-all group"
          >
            <div className="font-mono text-xs text-[#00F0FF] mb-4">SPEC // 01</div>
            <Layers className="w-8 h-8 text-white group-hover:text-[#00F0FF] transition-colors mb-4" />
            <h3 className="font-condensed text-2xl uppercase text-white font-bold mb-2">
              CUSTOM GLSL PIPELINES
            </h3>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              Raymarched black hole event horizons, Simplex noise volumetric accretion disks, and Doppler relativistic beaming calculated per-fragment.
            </p>
          </div>

          {/* Item 02 */}
          <div
            onMouseEnter={() => soundEngine.playHover()}
            className="border border-white/10 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner hover:border-[#00F0FF] transition-all group"
          >
            <div className="font-mono text-xs text-[#FF6B00] mb-4">SPEC // 02</div>
            <Box className="w-8 h-8 text-white group-hover:text-[#FF6B00] transition-colors mb-4" />
            <h3 className="font-condensed text-2xl uppercase text-white font-bold mb-2">
              GPU PARTICLE DYNAMICS
            </h3>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              14,000+ continuous Keplerian orbital particles simulated at 60 FPS using Float32 buffer attributes and dynamic pointer gravitational deflection.
            </p>
          </div>

          {/* Item 03 */}
          <div
            onMouseEnter={() => soundEngine.playHover()}
            className="border border-white/10 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner hover:border-[#00F0FF] transition-all group"
          >
            <div className="font-mono text-xs text-[#00F0FF] mb-4">SPEC // 03</div>
            <Cpu className="w-8 h-8 text-white group-hover:text-[#00F0FF] transition-colors mb-4" />
            <h3 className="font-condensed text-2xl uppercase text-white font-bold mb-2">
              ZERO-ASSET SYNTHESIS
            </h3>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              Pure procedural Web Audio API oscillators producing sub-bass mechanical impacts, resonant chirp feedback, and dual-detuned gravitational drones.
            </p>
          </div>

          {/* Item 04 */}
          <div
            onMouseEnter={() => soundEngine.playHover()}
            className="border border-white/10 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner hover:border-[#FF6B00] transition-all group"
          >
            <div className="font-mono text-xs text-[#FF6B00] mb-4">SPEC // 04</div>
            <Terminal className="w-8 h-8 text-white group-hover:text-[#FF6B00] transition-colors mb-4" />
            <h3 className="font-condensed text-2xl uppercase text-white font-bold mb-2">
              MEMORY & FPS DISCIPLINE
            </h3>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              No React state updates inside render loops. Refs and uniform buffers isolate high-frequency 60 FPS changes from the DOM tree.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
