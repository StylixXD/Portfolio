"use client";

import React from "react";
import { soundEngine } from "../../lib/soundEngine";
import { ArrowUpRight } from "lucide-react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

const MENU_ITEMS = [
  { id: "hero", index: "01", label: "SINGULARITY CORE", desc: "EPICENTER // GRAVITATIONAL FIELD" },
  { id: "orbital-system", index: "02", label: "ORBITAL PROJECTS", desc: "4 AUTONOMOUS SATELLITE NODES" },
  { id: "capabilities", index: "03", label: "ARCHITECTURE & SYSTEMS", desc: "DISTRIBUTED SPECIFICATIONS" },
  { id: "transmission", index: "04", label: "TRANSMISSION TERMINAL", desc: "DIRECT ENCRYPTED COMMS" },
  { id: "github", index: "05", label: "SOURCE CODE & ARCHIVE", desc: "GITHUB.COM/STYLIX-XD", external: "https://github.com/StylixXD" },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-45 bg-[#010204]/90 backdrop-blur-xl flex flex-col justify-between p-8 md:p-16 select-none transition-all duration-300">
      {/* Top Metadata */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
          COMMAND DECK // NAVIGATION MATRIX
        </div>
        <div className="font-mono text-xs text-[#00F0FF]">
          STATUS: ORBIT ACTIVE
        </div>
      </div>

      {/* Menu Options with Massive Typography */}
      <div className="max-w-4xl space-y-4 my-auto">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => {
              soundEngine.playLock();
              if (item.external) {
                window.open(item.external, "_blank");
              } else {
                onNavigate(item.id);
                onClose();
              }
            }}
            className="group cursor-pointer flex items-baseline gap-6 md:gap-10 border-b border-white/5 pb-4 hover:border-[#00F0FF] transition-all"
          >
            <span className="font-mono text-sm md:text-lg text-zinc-500 group-hover:text-[#00F0FF] transition-colors">
              {item.index}
            </span>
            <div className="flex-1 flex flex-col md:flex-row md:items-baseline justify-between">
              <h2 className="font-chunko text-4xl sm:text-6xl md:text-7xl uppercase text-white group-hover:text-[#00F0FF] group-hover:translate-x-3 transition-all duration-200 tracking-wider">
                {item.label}
              </h2>
              <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors mt-1 md:mt-0 flex items-center gap-1">
                {item.desc}
                {item.external && <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF]" />}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer system details */}
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500 gap-2">
        <div>DESIGNED & ENGINEERED BY STYLIX-XD (ASHU)</div>
        <div>ANTIGRAVITY // 2026 NEXT-GEN RELEASE</div>
      </div>
    </div>
  );
};
