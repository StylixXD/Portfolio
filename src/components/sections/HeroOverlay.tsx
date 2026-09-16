"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "../../lib/soundEngine";
import { ChevronDown, Move } from "lucide-react";

interface HeroOverlayProps {
  onExploreClick: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ onExploreClick }) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const dismissCues = () => setHasInteracted(true);
    window.addEventListener("scroll", dismissCues, { once: true });
    window.addEventListener("mousedown", dismissCues, { once: true });
    window.addEventListener("touchstart", dismissCues, { once: true });

    return () => {
      window.removeEventListener("scroll", dismissCues);
      window.removeEventListener("mousedown", dismissCues);
      window.removeEventListener("touchstart", dismissCues);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between p-6 md:p-16 pointer-events-none select-none">
      {/* Top Spacer for HUD */}
      <div className="pt-24" />

      {/* Hero Core Content */}
      <div className="max-w-6xl my-auto">
        {/* Identity Tag */}
        <div className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#00F0FF] mb-4 flex items-center gap-3">
          <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
          <span>STYLIX-XD // ASHU  PRINCIPAL CREATIVE TECHNOLOGIST & ARCHITECT</span>
        </div>

        {/* Ultra-Bold Display Headline (Bison / Chunko style condensed) */}
        <h1 className="font-chunko text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.85] uppercase text-white tracking-wider glow-cyan mb-6">
          WARPING<br />
          <span className="text-white/90">THE VOID</span>
        </h1>

        {/* Mission Statement */}
        <div className="font-mono text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed border-l border-[#00F0FF]/40 pl-6 mb-8">
          REAL-TIME GRAPHICS ENGINE // DISTRIBUTED LOW-LATENCY RUNTIMES // EXPERIMENTAL 3D COMPUTING ENVIRONMENTS.
        </div>

        {/* Quick Launch Button */}
        <div className="pointer-events-auto">
          <button
            onClick={() => {
              soundEngine.playLock();
              onExploreClick();
            }}
            className="px-8 py-4 bg-white text-black font-condensed text-xl uppercase tracking-wider font-bold hover:bg-[#00F0FF] transition-all chamfer-corner shadow-xl inline-flex items-center gap-3"
          >
            <span>INITIALIZE SPATIAL DESCENT</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Instruction Cues (Naturally fades after interaction) */}
      <div
        className={`transition-opacity duration-700 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-zinc-400 ${
          hasInteracted ? "opacity-20" : "opacity-90"
        }`}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <Move className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>[ DRAG TO ROTATE UNIVERSE ]</span>
        </div>

        <div className="flex items-center gap-2">
          <span>[ SCROLL TO DESCEND THROUGH ORBITS ]</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#00F0FF] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
