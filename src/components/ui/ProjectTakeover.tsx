'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/realProjects';

interface ProjectTakeoverProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectTakeover({ project, onClose }: ProjectTakeoverProps) {
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
    <div className="fixed inset-0 z-50 bg-[#111113] overflow-y-auto animate-[fadeIn_0.35s_ease-out]">
      {/* Sticky Top Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full bg-[#111113]/90 backdrop-blur-md border-b border-[rgba(244,243,238,0.08)] py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-frama-meta text-xs text-[#CEFF00]">
              [{project.number}]
            </span>
            <span className="font-frama-meta text-xs text-[#8E8E93] hidden sm:inline">
              // {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="group flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#CEFF00] hover:bg-[#F4F3EE] text-[#111113] font-frama-meta text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
          >
            <span>← Back to Exhibition</span>
            <span className="text-[10px] opacity-70 font-sans-body font-bold hidden md:inline">(ESC)</span>
          </button>
        </div>
      </nav>

      {/* Hero Header of the Case Study */}
      <header className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto border-b border-[rgba(244,243,238,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
              Case Study // {project.number}
            </span>

            <h1 className="font-frama-black-italic text-4xl sm:text-6xl lg:text-7xl text-[#F4F3EE] uppercase leading-[0.92] tracking-tight">
              {project.title}
            </h1>

            <p className="font-tag text-lg sm:text-2xl text-[#CEFF00] font-bold">
              {project.headline}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-md text-xs font-tag font-bold bg-[#1E1E22] text-[#F4F3EE] border border-[rgba(244,243,238,0.1)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            {project.isAssetGap ? (
              <div className="w-full max-w-sm p-8 rounded-2xl border border-dashed border-[rgba(244,243,238,0.2)] bg-[#18181C] text-center space-y-3">
                <span className="inline-block px-3 py-1 rounded bg-[#222227] text-[#8E8E93] font-frama-meta text-xs">
                  Asset Status
                </span>
                <p className="font-frama-extrabold-italic text-2xl text-[#F4F3EE] uppercase">
                  Visual Capture Pending
                </p>
                <p className="font-sans-body text-xs text-[#8E8E93] leading-relaxed">
                  Low-level routines and memory structures documented. Capture pending live verification.
                </p>
              </div>
            ) : project.assetUrl ? (
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl bg-[#18181C] border border-[rgba(244,243,238,0.08)] flex items-center justify-center p-8 shadow-2xl">
                <Image
                  src={project.assetUrl}
                  alt={project.title}
                  width={180}
                  height={180}
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Vertical Case Study Body Content */}
      <main className="py-20 px-6 md:px-12 max-w-4xl mx-auto space-y-16">
        {/* The Premise & Motivation */}
        <section className="space-y-4">
          <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
            [01] // The Motivation
          </span>
          <h2 className="font-frama-black-italic text-3xl sm:text-4xl text-[#F4F3EE] uppercase tracking-tight">
            Why I Built This
          </h2>
          <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] leading-relaxed">
            {project.summary}
          </p>
        </section>

        {/* The Engineering Challenge */}
        <section className="space-y-4 pt-8 border-t border-[rgba(244,243,238,0.08)]">
          <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
            [02] // The Obstacle
          </span>
          <h2 className="font-frama-black-italic text-3xl sm:text-4xl text-[#F4F3EE] uppercase tracking-tight">
            The Core Challenge
          </h2>
          <p className="font-sans-body text-base sm:text-lg text-[#8E8E93] leading-relaxed">
            {project.challenge}
          </p>
        </section>

        {/* Architecture & Implementation */}
        <section className="space-y-4 pt-8 border-t border-[rgba(244,243,238,0.08)]">
          <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
            [03] // Architecture
          </span>
          <h2 className="font-frama-black-italic text-3xl sm:text-4xl text-[#F4F3EE] uppercase tracking-tight">
            System Design &amp; Decisions
          </h2>
          <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] leading-relaxed">
            {project.architecture}
          </p>
        </section>

        {/* Technical Highlights & Metrics */}
        <section className="space-y-6 pt-8 border-t border-[rgba(244,243,238,0.08)]">
          <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
            [04] // Specifications
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.highlights?.map((h, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#18181C] border border-[rgba(244,243,238,0.08)]"
              >
                <p className="font-frama-meta text-xs text-[#8E8E93]">
                  {h.label}
                </p>
                <p className="font-tag text-sm sm:text-base text-[#F4F3EE] font-bold mt-2">
                  {h.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Exit Bar */}
        <footer className="pt-12 border-t border-[rgba(244,243,238,0.08)] flex justify-between items-center">
          <p className="font-sans-body text-sm text-[#8E8E93]">
            End of Case Study // {project.title}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#CEFF00] hover:bg-[#F4F3EE] text-[#111113] font-frama-meta text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            ← Return to Exhibition
          </button>
        </footer>
      </main>
    </div>
  );
}
