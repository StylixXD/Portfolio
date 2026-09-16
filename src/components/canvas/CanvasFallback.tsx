import React from "react";

export const CanvasFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#010204] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-radial from-[#00F0FF]/10 via-[#010204]/90 to-[#010204]" />
      <div className="relative border border-white/10 p-8 max-w-md bg-[#08090C] text-center chamfer-corner">
        <div className="font-mono text-xs uppercase text-[#00F0FF] mb-2 tracking-widest">
          // WEBGL ACCELERATION OFFLINE
        </div>
        <h2 className="font-chunko text-3xl uppercase text-white tracking-wider mb-3">
          SYSTEM STATIC MODE
        </h2>
        <p className="text-zinc-400 text-sm font-mono leading-relaxed">
          Rendering in 2D accessible fallback pipeline. Full DOM telemetry, orbital dossiers, and transmission terminal remain fully operational.
        </p>
      </div>
    </div>
  );
};
