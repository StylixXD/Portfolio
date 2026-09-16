"use client";

import React from "react";
import { soundEngine } from "../../lib/soundEngine";
import { Cpu, Zap, Activity, Globe } from "lucide-react";

export const CapabilitySection: React.FC = () => {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-16 flex items-center select-none pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Oversized Editorial Statement */}
        <div className="lg:col-span-8">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00F0FF]" />
            CAPABILITIES // MANIFESTO
          </div>

          <div className="font-chunko text-3xl sm:text-5xl text-zinc-500 uppercase tracking-wide mb-3">
            I ARCHITECT & BUILD:
          </div>

          <div className="space-y-4">
            <div
              onMouseEnter={() => soundEngine.playHover()}
              className="group cursor-default border-b border-white/10 pb-4 hover:border-[#00F0FF] transition-all"
            >
              <h2 className="font-chunko text-5xl sm:text-7xl md:text-8xl uppercase text-white group-hover:text-[#00F0FF] group-hover:translate-x-4 transition-all duration-200 leading-none">
                REALTIME SYSTEMS
              </h2>
              <p className="font-mono text-xs md:text-sm text-zinc-400 mt-2">
                Distributed runtimes, zero-copy socket buffers, high-throughput microservices.
              </p>
            </div>

            <div
              onMouseEnter={() => soundEngine.playHover()}
              className="group cursor-default border-b border-white/10 pb-4 hover:border-[#00F0FF] transition-all"
            >
              <h2 className="font-chunko text-5xl sm:text-7xl md:text-8xl uppercase text-white group-hover:text-[#00F0FF] group-hover:translate-x-4 transition-all duration-200 leading-none">
                INTERACTIVE WORLDS
              </h2>
              <p className="font-mono text-xs md:text-sm text-zinc-400 mt-2">
                Procedural GLSL raymarchers, GPU particles, physics-driven WebGL interfaces.
              </p>
            </div>

            <div
              onMouseEnter={() => soundEngine.playHover()}
              className="group cursor-default border-b border-white/10 pb-4 hover:border-[#00F0FF] transition-all"
            >
              <h2 className="font-chunko text-5xl sm:text-7xl md:text-8xl uppercase text-white group-hover:text-[#00F0FF] group-hover:translate-x-4 transition-all duration-200 leading-none">
                HIGH-PERFORMANCE APPS
              </h2>
              <p className="font-mono text-xs md:text-sm text-zinc-400 mt-2">
                Sub-millisecond state management, deterministic frame loops, 60+ FPS stability.
              </p>
            </div>

            <div
              onMouseEnter={() => soundEngine.playHover()}
              className="group cursor-default border-b border-white/10 pb-4 hover:border-[#00F0FF] transition-all"
            >
              <h2 className="font-chunko text-5xl sm:text-7xl md:text-8xl uppercase text-white group-hover:text-[#00F0FF] group-hover:translate-x-4 transition-all duration-200 leading-none">
                CREATIVE AI TOOLS
              </h2>
              <p className="font-mono text-xs md:text-sm text-zinc-400 mt-2">
                Latent vector explorers, neural audio synthesis, procedural spatial intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Industrial Telemetry Cards (Inspired by Reference Image 2) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border border-white/15 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-[#00F0FF]" />
              <div className="font-mono text-xs uppercase text-zinc-400 tracking-wider">UPTIME RUNTIME</div>
            </div>
            <div className="font-chunko text-4xl text-white">99.999%</div>
            <p className="font-mono text-xs text-zinc-500 mt-1">Autonomous edge fault-recovery</p>
          </div>

          <div className="border border-white/15 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner">
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="w-5 h-5 text-[#FF6B00]" />
              <div className="font-mono text-xs uppercase text-zinc-400 tracking-wider">GPU ACCELERATION</div>
            </div>
            <div className="font-chunko text-4xl text-white">100% SHADER</div>
            <p className="font-mono text-xs text-zinc-500 mt-1">Zero CPU overhead on particle updates</p>
          </div>

          <div className="border border-white/15 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-[#00F0FF]" />
              <div className="font-mono text-xs uppercase text-zinc-400 tracking-wider">LATENCY CEILING</div>
            </div>
            <div className="font-chunko text-4xl text-white">&lt; 0.2 MS</div>
            <p className="font-mono text-xs text-zinc-500 mt-1">Deterministic lock-free telemetry queues</p>
          </div>

          <div className="border border-white/15 bg-[#08090C]/80 backdrop-blur-md p-6 chamfer-corner">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-white" />
              <div className="font-mono text-xs uppercase text-zinc-400 tracking-wider">CROSS-PLATFORM</div>
            </div>
            <div className="font-chunko text-4xl text-white">MOBILE & DESKTOP</div>
            <p className="font-mono text-xs text-zinc-500 mt-1">Unified responsive spatial coordinate system</p>
          </div>
        </div>

      </div>
    </section>
  );
};
