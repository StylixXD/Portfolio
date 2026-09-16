"use client";

import React, { useEffect, useState } from "react";
import { soundEngine } from "../../lib/soundEngine";

interface SystemBootProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING SINGULARITY OS // SYS.V4",
  "LOADING SPATIAL ENGINE & GLSL RUNTIME",
  "ESTABLISHING RELATIVISTIC GRAVITATIONAL FIELD",
  "SYNCHRONIZING ORBITAL SATELLITE TELEMETRY",
  "SINGULARITY CORE ACTIVE // SYSTEM READY"
];

export const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // If reduced motion is preferred, bypass instantly
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 25;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundEngine.playLock();
            onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
      setLogIndex((prev) => Math.min(prev + 1, BOOT_LOGS.length - 1));
      soundEngine.playHover();
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#010204] flex flex-col justify-between p-8 md:p-16 select-none transition-opacity duration-500">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
          ANTIGRAVITY // INITIALIZATION STACK
        </div>
        <button
          onClick={() => {
            soundEngine.playLock();
            onComplete();
          }}
          className="font-mono text-xs uppercase tracking-wider text-[#00F0FF] hover:text-white px-3 py-1 border border-[#00F0FF]/40 hover:border-white transition-all chamfer-corner-sm"
        >
          [ SKIP / ENTER ? ]
        </button>
      </div>

      {/* Center Console */}
      <div className="max-w-2xl">
        <div className="font-chunko text-5xl md:text-7xl uppercase text-white tracking-wider mb-6">
          SINGULARITY <span className="text-[#00F0FF]">OS</span>
        </div>

        <div className="space-y-2 font-mono text-xs md:text-sm text-zinc-300">
          {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <span className="text-[#00F0FF]">{">"}</span>
              <span className={idx === logIndex ? "text-white font-bold" : "text-zinc-500"}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>CORE SYNCHRONIZATION</span>
            <span className="text-[#00F0FF] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 overflow-hidden">
            <div
              className="h-full bg-[#00F0FF] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer System Identifiers */}
      <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between text-xs font-mono text-zinc-500">
        <div>STYLIX-XD // ASHU - DIGITAL EXPERIENCE ARCHITECT</div>
        <div>KERNEL: AMD64-WEBGL2-PROD</div>
      </div>
    </div>
  );
};
