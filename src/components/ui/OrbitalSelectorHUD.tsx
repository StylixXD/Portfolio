"use client";

import React from "react";
import { ORBITAL_PROJECTS, OrbitalProject } from "../../lib/projectData";
import { soundEngine } from "../../lib/soundEngine";
import { ChevronLeft, ChevronRight, Compass, Maximize2, Shield } from "lucide-react";

interface OrbitalSelectorHUDProps {
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDossier: (project: OrbitalProject) => void;
}

export const OrbitalSelectorHUD: React.FC<OrbitalSelectorHUDProps> = ({
  currentIndex,
  onSelectIndex,
  onOpenDossier,
}) => {
  const currentProject = ORBITAL_PROJECTS[currentIndex];

  const handlePrev = () => {
    soundEngine.playHover();
    const prev = (currentIndex - 1 + ORBITAL_PROJECTS.length) % ORBITAL_PROJECTS.length;
    onSelectIndex(prev);
  };

  const handleNext = () => {
    soundEngine.playHover();
    const next = (currentIndex + 1) % ORBITAL_PROJECTS.length;
    onSelectIndex(next);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 select-none pointer-events-auto">
      {/* Probe Navigation Pill Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {ORBITAL_PROJECTS.map((p, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={p.id}
              onClick={() => {
                soundEngine.playLock();
                onSelectIndex(idx);
              }}
              className={`font-mono text-xs uppercase px-4 py-2 border transition-all flex items-center gap-2 chamfer-corner-sm ${
                isActive
                  ? "border-[#00F0FF] bg-[#00F0FF]/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)] font-bold"
                  : "border-white/15 bg-black/40 text-zinc-400 hover:border-white/40 hover:text-white"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#00F0FF] animate-pulse" : "bg-zinc-600"}`} />
              <span>{p.index} // {p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Celestial Telemetry Floating Display (Inspired by Reference Images 1 & 5) */}
      <div className="relative border border-white/15 bg-[#08090C]/85 backdrop-blur-xl p-6 md:p-10 chamfer-corner shadow-2xl">
        {/* Left / Right Carousel Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white/20 bg-black/60 text-white hover:border-[#00F0FF] hover:text-[#00F0FF] flex items-center justify-center transition-all z-10 chamfer-corner-sm"
          aria-label="Previous Probe"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white/20 bg-black/60 text-white hover:border-[#00F0FF] hover:text-[#00F0FF] flex items-center justify-center transition-all z-10 chamfer-corner-sm"
          aria-label="Next Probe"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Center Content */}
        <div className="px-8 md:px-16 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] mb-2 flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            <span>ORBITAL SATELLITE NODE // {currentProject.codeName}</span>
          </div>

          <h3 className="font-chunko text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-wider mb-2 leading-none">
            {currentProject.name}
          </h3>

          <p className="font-mono text-xs md:text-sm text-zinc-300 max-w-2xl mx-auto mb-8">
            {currentProject.tagline}
          </p>

          {/* Telemetry Metrics Row (Like Reference Image 1) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8 font-mono text-left">
            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">SPECTRAL CLASS</div>
              <div className="text-xs md:text-sm font-bold text-[#00F0FF] mt-1">{currentProject.orbitalTelemetry.spectralClass}</div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">DIAMETER</div>
              <div className="text-xs md:text-sm font-bold text-white mt-1">{currentProject.orbitalTelemetry.diameter}</div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">ORBITAL VELOCITY</div>
              <div className="text-xs md:text-sm font-bold text-white mt-1">{currentProject.orbitalTelemetry.velocity}</div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">MASS ESTIMATE</div>
              <div className="text-xs md:text-sm font-bold text-[#FF6B00] mt-1">{currentProject.orbitalTelemetry.mass}</div>
            </div>
          </div>

          {/* Action Trigger to Open Full Dossier */}
          <button
            onClick={() => {
              soundEngine.playLock();
              onOpenDossier(currentProject);
            }}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black hover:bg-[#00F0FF] transition-all font-condensed text-lg uppercase tracking-wider font-bold chamfer-corner-sm"
          >
            <Maximize2 className="w-4 h-4" />
            <span>INSPECT FULL MISSION DOSSIER ?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
