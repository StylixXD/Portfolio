"use client";

import React, { useEffect } from "react";
import { OrbitalProject } from "../../lib/projectData";
import { soundEngine } from "../../lib/soundEngine";
import { X, ExternalLink, Activity, Cpu, ShieldCheck } from "lucide-react";

interface ProjectDossierProps {
  project: OrbitalProject | null;
  onClose: () => void;
}

export const ProjectDossier: React.FC<ProjectDossierProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundEngine.playLock();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md transition-all duration-300 select-none">
      {/* Off-canvas industrial panel */}
      <div className="w-full max-w-2xl h-full bg-[#08090C] border-l border-white/15 p-6 md:p-12 overflow-y-auto flex flex-col justify-between relative shadow-2xl">
        
        {/* Top Header & Close button */}
        <div>
          <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
                MISSION DOSSIER // {project.codeName}
              </div>
              <div className="font-mono text-xs text-zinc-400 uppercase mt-1">
                CATEGORY: {project.category}
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playLock();
                onClose();
              }}
              className="p-2 border border-white/20 hover:border-[#FF6B00] hover:text-[#FF6B00] text-white transition-all chamfer-corner-sm"
              aria-label="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Massive Index & Title */}
          <div className="flex items-baseline gap-6 mb-6">
            <span className="font-chunko text-7xl md:text-8xl text-white/20 leading-none">
              {project.index}
            </span>
            <div>
              <h2 className="font-chunko text-4xl md:text-6xl text-white uppercase tracking-wider leading-tight">
                {project.name}
              </h2>
              <div className="font-mono text-sm text-[#00F0FF] mt-1">
                // {project.tagline}
              </div>
            </div>
          </div>

          {/* System Abstract */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" /> SYSTEM ABSTRACT
            </h3>
            <p className="font-display text-zinc-300 text-sm md:text-base leading-relaxed border-l-2 border-[#00F0FF] pl-4 py-1">
              {project.description}
            </p>
          </div>

          {/* Architecture Specification */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" /> ARCHITECTURE & RUNTIME TOPOLOGY
            </h3>
            <p className="font-mono text-xs md:text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 border border-white/10">
              {project.architecture}
            </p>
          </div>

          {/* Performance Telemetry Grid */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00F0FF]" /> EMPIRICAL BENCHMARKS & TELEMETRY
            </h3>
            <div className="grid grid-cols-2 gap-3 font-mono">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">{metric.label}</div>
                  <div className="text-lg md:text-xl font-bold text-white mt-1">{metric.value}</div>
                  {metric.change && (
                    <div className="text-[10px] text-[#00F0FF] mt-0.5">{metric.change}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technology Arsenal */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
              INTEGRATED TECHNOLOGIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="font-mono text-xs uppercase px-3 py-1 bg-white/5 border border-white/10 text-zinc-200"
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playHover()}
              className="flex-1 py-3 px-4 bg-[#00F0FF] text-black font-condensed text-lg uppercase tracking-wider text-center font-bold hover:bg-white transition-all flex items-center justify-center gap-2 chamfer-corner-sm"
            >
              <span>EXECUTE DEPLOYMENT</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playHover()}
              className="flex-1 py-3 px-4 border border-white/30 text-white font-condensed text-lg uppercase tracking-wider text-center font-bold hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all flex items-center justify-center gap-2 chamfer-corner-sm"
            >
              <span>INSPECT REPO</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
