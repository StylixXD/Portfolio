"use client";

import React, { useEffect, useState } from "react";
import { soundEngine } from "../../lib/soundEngine";
import { Volume2, VolumeX, Menu, X, Activity } from "lucide-react";

interface NavbarProps {
  fps: number;
  coords: { lat: string; lng: string; rad: string };
  onToggleMenu: () => void;
  isMenuOpen: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  fps,
  coords,
  onToggleMenu,
  isMenuOpen,
  soundEnabled,
  onToggleSound,
}) => {
  const [utcTime, setUtcTime] = useState<string>("00:00:00.0");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const ms = Math.floor(now.getMilliseconds() / 100);
      setUtcTime(`${timeStr}.${ms}`);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-white/10 bg-[#010204]/80 backdrop-blur-md select-none transition-all">
      {/* Left: Identity & Operating System */}
      <div className="flex items-center space-x-4">
        <div className="w-2.5 h-2.5 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_8px_#00F0FF]" />
        <div>
          <div className="font-condensed text-xl md:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            ANTIGRAVITY <span className="text-[#00F0FF] font-mono text-xs">// SYS.V4</span>
          </div>
          <div className="font-mono text-[11px] md:text-xs text-zinc-400 uppercase tracking-widest">
            STYLIX-XD <span className="text-zinc-500">aka</span> ASHU <span className="text-zinc-600">// PRINCIPAL ARCHITECT</span>
          </div>
        </div>
      </div>

      {/* Center: Live Spatial Telemetry & UTC clock (hidden on mobile, visible on lg) */}
      <div className="hidden lg:flex items-center space-x-8 font-mono text-xs text-zinc-300">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 chamfer-corner-sm">
          <span className="text-zinc-500">UTC:</span>
          <span className="text-[#00F0FF] font-bold">{utcTime}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-400">
          <div>
            <span className="text-zinc-500">LAT: </span>
            <span className="text-white">{coords.lat}</span>
          </div>
          <div>
            <span className="text-zinc-500">LNG: </span>
            <span className="text-white">{coords.lng}</span>
          </div>
          <div>
            <span className="text-zinc-500">RAD: </span>
            <span className="text-[#00F0FF]">{coords.rad}</span>
          </div>
        </div>
      </div>

      {/* Right: Real FPS Status + Sound Control + Menu Trigger */}
      <div className="flex items-center space-x-3 md:space-x-5">
        {/* Real FPS & System state */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs bg-white/5 border border-white/10 px-3 py-1.5">
          <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span className="text-zinc-400">ONLINE</span>
          <span className="font-bold text-white ml-1">{fps} FPS</span>
        </div>

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={() => {
            soundEngine.playHover();
            onToggleSound();
          }}
          className={`flex items-center gap-2 font-mono text-xs uppercase px-3 py-1.5 border transition-all ${
            soundEnabled
              ? "border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
          }`}
          title="Toggle Synthesized Web Audio"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{soundEnabled ? "AUDIO: ON" : "AUDIO: OFF"}</span>
        </button>

        {/* System Menu Button */}
        <button
          onClick={() => {
            soundEngine.playLock();
            onToggleMenu();
          }}
          className="flex items-center gap-2 font-condensed text-base tracking-wider uppercase px-4 py-1.5 bg-white text-black hover:bg-[#00F0FF] transition-all font-bold chamfer-corner-sm"
          aria-label="Toggle Command Deck"
        >
          {isMenuOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>CLOSE</span>
            </>
          ) : (
            <>
              <Menu className="w-4 h-4" />
              <span>MENU</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
