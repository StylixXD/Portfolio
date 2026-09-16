'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/realProjects';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#111113]/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-2xl bg-[#18181B] border-l border-[rgba(244,243,238,0.12)] h-full overflow-y-auto z-10 p-8 md:p-12 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-8 border-b border-[rgba(244,243,238,0.08)]">
            <span className="font-label-bold text-xs text-[#CEFF00]">
              [{project.number}] // {project.category}
            </span>
            <button
              onClick={onClose}
              className="font-label-bold text-xs text-[#8E8E93] hover:text-[#F4F3EE] p-2 focus:outline-none cursor-pointer"
            >
              [Close ✕]
            </button>
          </div>

          {/* Title & Headline */}
          <div className="pt-8 pb-6">
            <h2 className="font-frama-black-italic text-3xl md:text-5xl text-[#F4F3EE] uppercase leading-tight tracking-tight">
              {project.title}
            </h2>
            <p className="font-tag text-base md:text-lg text-[#CEFF00] mt-3 font-bold">
              {project.headline}
            </p>
          </div>

          {/* Visual Asset or Honest Asset Gap */}
          <div className="my-8 rounded-xl border border-[rgba(244,243,238,0.08)] bg-[#111113] p-8 flex items-center justify-center min-h-[220px]">
            {project.isAssetGap ? (
              <div className="text-center p-6 border border-dashed border-[rgba(244,243,238,0.15)] rounded-lg w-full">
                <span className="inline-block px-3 py-1 rounded bg-[#222227] text-[#8E8E93] font-label-bold text-xs mb-2">
                  Asset Status
                </span>
                <p className="font-frama-extrabold-italic text-xl text-[#F4F3EE] uppercase">
                  Visual Asset in Production
                </p>
                <p className="font-sans-body text-xs text-[#8E8E93] mt-2 max-w-sm mx-auto">
                  Engineering documentation and process routines are active. Tool capture pending live verification.
                </p>
              </div>
            ) : project.assetUrl ? (
              <div className="relative w-36 h-36 flex items-center justify-center">
                <Image
                  src={project.assetUrl}
                  alt={project.title}
                  width={140}
                  height={140}
                  className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                />
              </div>
            ) : null}
          </div>

          {/* Key Details */}
          <div className="space-y-8">
            <div>
              <h3 className="font-label-bold text-xs text-[#8E8E93] mb-2">
                Overview
              </h3>
              <p className="font-sans-body text-sm md:text-base text-[#F4F3EE] leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div>
              <h3 className="font-label-bold text-xs text-[#8E8E93] mb-2">
                The Engineering Challenge
              </h3>
              <p className="font-sans-body text-sm md:text-base text-[#8E8E93] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div>
              <h3 className="font-label-bold text-xs text-[#8E8E93] mb-2">
                Architecture &amp; Implementation
              </h3>
              <p className="font-sans-body text-sm md:text-base text-[#F4F3EE] leading-relaxed">
                {project.architecture}
              </p>
            </div>

            {/* Highlights */}
            <div className="pt-4 border-t border-[rgba(244,243,238,0.08)]">
              <h3 className="font-label-bold text-xs text-[#8E8E93] mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.highlights?.map((h, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#222227] border border-[rgba(244,243,238,0.05)]">
                    <p className="font-label-bold text-[11px] text-[#8E8E93]">
                      {h.label}
                    </p>
                    <p className="font-tag text-xs md:text-sm text-[#F4F3EE] font-bold mt-1">
                      {h.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h3 className="font-label-bold text-xs text-[#8E8E93] mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-tag font-semibold bg-[#111113] border border-[rgba(244,243,238,0.1)] text-[#F4F3EE]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-10 mt-10 border-t border-[rgba(244,243,238,0.08)] flex justify-between items-center">
          <span className="font-tag text-xs text-[#8E8E93] font-medium">
            Engineered by Ashu
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#F4F3EE] text-[#111113] font-tag text-xs uppercase tracking-wider font-bold hover:bg-[#CEFF00] transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </aside>
    </div>
  );
}
