'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/realProjects';
import { getLenis } from '@/lib/smoothScroll';

export interface OriginRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ProjectWindowProps {
  project: Project | null;
  originRect: OriginRect | null;
  onClose: () => void;
}

type FoldPhase = 'idle' | 'origin' | 'unfolding' | 'settled' | 'folding';

export default function ProjectWindow({ project, originRect, onClose }: ProjectWindowProps) {
  const [phase, setPhase] = useState<FoldPhase>('idle');
  const [targetRect, setTargetRect] = useState<OriginRect>({ top: 0, left: 0, width: 0, height: 0 });
  const surfaceRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);

  // Measure destination rect (86% viewport on desktop, deliberate insets on mobile)
  const computeTargetRect = useCallback((): OriginRect => {
    if (typeof window === 'undefined') return { top: 0, left: 0, width: 0, height: 0 };
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw < 768) {
      // Mobile: deliberate 12px side inset and 16px top/bottom inset
      const width = vw - 24;
      const height = vh - 32;
      return { top: 16, left: 12, width, height };
    }

    // Desktop: 86% viewport width (max 1080px) and 88% viewport height
    const width = Math.min(1080, Math.round(vw * 0.86));
    const height = Math.round(vh * 0.88);
    const top = Math.round((vh - height) / 2);
    const left = Math.round((vw - width) / 2);

    return { top, left, width, height };
  }, []);

  // Initiate Open / Fold-Out Sequence
  useEffect(() => {
    if (project && originRect) {
      scrollPosRef.current = window.scrollY;
      const target = computeTargetRect();
      setTargetRect(target);

      // Check reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setPhase('settled');
        return;
      }

      // Step 1: Inception at the clicked project's exact geometry
      setPhase('origin');

      // Pause background Lenis scrolling while surface is open
      const lenis = getLenis();
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      // Step 2: Unfold & Expand into case study surface
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('unfolding');
        });
      });

      // Step 3: Settle cleanly
      const settleTimer = setTimeout(() => {
        setPhase('settled');
      }, 540);

      return () => {
        cancelAnimationFrame(timer);
        clearTimeout(settleTimer);
      };
    } else {
      setPhase('idle');
    }
  }, [project, originRect, computeTargetRect]);

  // Initiate Close / Fold-Back Sequence
  const handleClose = useCallback(() => {
    if (phase === 'folding' || phase === 'idle') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !originRect) {
      setPhase('idle');
      onClose();
      const lenis = getLenis();
      if (lenis && typeof lenis.start === 'function') lenis.start();
      return;
    }

    // Scroll inner container to top before folding back
    if (surfaceRef.current) {
      surfaceRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }

    setPhase('folding');

    setTimeout(() => {
      setPhase('idle');
      onClose();

      // Resume background scrolling
      const lenis = getLenis();
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }

      // Ensure exact scroll position restoration
      if (typeof window !== 'undefined' && scrollPosRef.current !== undefined) {
        window.scrollTo({ top: scrollPosRef.current, behavior: 'instant' });
      }
    }, 420);
  }, [phase, originRect, onClose]);

  // Keyboard shortcut (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleClose]);

  if (!project || phase === 'idle') return null;

  // Determine current 3D transform & layout styles based on transition phase
  const isAtOrigin = phase === 'origin' || phase === 'folding';
  const currentRect = isAtOrigin && originRect ? originRect : targetRect;

  // Master surface fixed positioning & smooth spatial expansion
  const surfaceStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${currentRect.top}px`,
    left: `${currentRect.left}px`,
    width: `${currentRect.width}px`,
    height: `${currentRect.height}px`,
    transition:
      phase === 'unfolding'
        ? 'top 560ms cubic-bezier(0.16, 1, 0.3, 1), left 560ms cubic-bezier(0.16, 1, 0.3, 1), width 560ms cubic-bezier(0.16, 1, 0.3, 1), height 560ms cubic-bezier(0.16, 1, 0.3, 1), transform 560ms cubic-bezier(0.16, 1, 0.3, 1)'
        : phase === 'folding'
        ? 'top 440ms cubic-bezier(0.32, 0, 0.67, 0), left 440ms cubic-bezier(0.32, 0, 0.67, 0), width 440ms cubic-bezier(0.32, 0, 0.67, 0), height 440ms cubic-bezier(0.32, 0, 0.67, 0), transform 440ms cubic-bezier(0.32, 0, 0.67, 0)'
        : 'none',
    transform:
      phase === 'origin' || phase === 'folding'
        ? 'perspective(1400px) rotateX(10deg) scale(0.98) translateZ(0)'
        : 'perspective(1400px) rotateX(0deg) scale(1) translateZ(0)',
    transformOrigin: 'center center',
    transformStyle: 'preserve-3d',
    willChange: phase === 'settled' ? 'auto' : 'transform, top, left, width, height',
  };

  // 3D Origami Fold leaf angles
  const isFolded = phase === 'origin' || phase === 'folding';
  const topLeafAngle = isFolded ? 36 : 0;
  const bottomLeafAngle = isFolded ? -36 : 0;

  const backdropOpacity =
    phase === 'origin' || phase === 'folding'
      ? 'opacity-0'
      : 'opacity-100';

  const contentOpacity =
    phase === 'settled'
      ? 'opacity-100 translate-y-0 transition-all duration-300'
      : 'opacity-0 translate-y-3 pointer-events-none transition-opacity duration-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Editorial Ambient Backdrop (leaves portfolio perimeter visible) */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-[#0A0A0C]/80 backdrop-blur-md transition-opacity duration-400 ease-out cursor-pointer ${backdropOpacity}`}
        aria-label="Click to return to exhibition"
      />

      {/* Physical 3D Folding Surface */}
      <div
        ref={surfaceRef}
        style={surfaceStyle}
        className={`relative z-10 bg-[#141417] border rounded-2xl shadow-[0_35px_100px_rgba(0,0,0,0.9)] flex flex-col ${
          phase === 'settled'
            ? 'overflow-y-auto border-[rgba(244,243,238,0.18)]'
            : 'overflow-hidden border-[rgba(244,243,238,0.12)] select-none'
        }`}
      >
        {/* ============================================================ */}
        {/* PHYSICAL 3D DUAL-LEAF BI-FOLD ENVELOPE (Active during Fold) */}
        {/* ============================================================ */}
        {phase !== 'settled' && (
          <div
            className="absolute inset-0 z-40 pointer-events-none"
            style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
          >
            {/* Top Leaf (Hinged at Bottom, folds inward) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                transformOrigin: 'bottom center',
                transform: `rotateX(${topLeafAngle}deg)`,
                transition:
                  phase === 'unfolding'
                    ? 'transform 560ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 440ms cubic-bezier(0.32, 0, 0.67, 0)',
                transformStyle: 'preserve-3d',
              }}
              className="bg-[#18181D] border-b border-[rgba(244,243,238,0.15)] overflow-hidden flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Grazing Specular Sheen across top face */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between font-frama-meta text-xs text-[#CEFF00]">
                <span>[{project.number}] // FOLD ORIGIN</span>
                <span className="text-[#8E8E93] uppercase tracking-wider">{project.category}</span>
              </div>

              <div className="relative z-10">
                <h2 className="font-frama-black-italic text-2xl sm:text-4xl text-[#F4F3EE] uppercase tracking-tight">
                  {project.title}
                </h2>
                <p className="font-sans-body text-xs text-[#8E8E93] mt-2 line-clamp-1">
                  {project.headline}
                </p>
              </div>
            </div>

            {/* Central Crease Line with Physical Shadow Valley */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1.5px',
                transform: 'translateY(-50%)',
              }}
              className="bg-white/30 shadow-[0_0_12px_rgba(0,0,0,0.9)] z-50 pointer-events-none"
            />

            {/* Bottom Leaf (Hinged at Top, folds outward) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '50%',
                transformOrigin: 'top center',
                transform: `rotateX(${bottomLeafAngle}deg)`,
                transition:
                  phase === 'unfolding'
                    ? 'transform 560ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 440ms cubic-bezier(0.32, 0, 0.67, 0)',
                transformStyle: 'preserve-3d',
              }}
              className="bg-[#131316] overflow-hidden flex flex-col justify-between p-6 sm:p-8"
            >
              {/* Deep Valley Ambient Occlusion Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-wrap gap-2 pt-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded text-[10px] font-frama-meta bg-[#1C1C22] text-[#F4F3EE] border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs font-frama-meta text-[#8E8E93] border-t border-white/5 pt-3">
                <span>SYSTEM ARCHITECTURE AUDIT</span>
                <span className="text-[#CEFF00]">EXPANDING CASE STUDY ↗</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* EDITORIAL CASE STUDY SURFACE (Pure High-End Editorial, NO OS CHROME) */}
        {/* ============================================================ */}
        <div className={`flex flex-col min-h-full ${contentOpacity}`}>
          {/* Sticky Editorial Bar */}
          <div className="sticky top-0 z-20 w-full bg-[#151518]/95 backdrop-blur-md border-b border-[rgba(244,243,238,0.08)] py-4 px-6 md:px-12 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-frama-meta text-xs md:text-sm text-[#CEFF00]">
                [{project.number}]
              </span>
              <span className="font-frama-meta text-xs md:text-sm text-[#F4F3EE]">
                // Case Study
              </span>
              <span className="font-sans-body text-xs text-[#8E8E93] hidden md:inline">
                • {project.category}
              </span>
            </div>

            <button
              onClick={handleClose}
              className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-[#CEFF00] hover:bg-[#F4F3EE] text-[#111113] font-frama-meta text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
            >
              <span>← Return to Exhibition</span>
              <span className="text-[10px] opacity-65 font-sans-body font-bold hidden sm:inline">(ESC)</span>
            </button>
          </div>

          {/* Unfolded Case Study Body */}
          <div className="p-6 md:p-14 space-y-16 flex-1">
            {/* Project Hero Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[rgba(244,243,238,0.08)] pb-12">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center space-x-3 text-[#CEFF00] font-frama-meta text-xs md:text-sm tracking-wider">
                  <span>{project.number}</span>
                  <span>//</span>
                  <span>{project.category}</span>
                </div>

                <h1 className="font-frama-black-italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F3EE] uppercase leading-[0.95] tracking-tight">
                  {project.title}
                </h1>

                <p className="font-tag text-base sm:text-xl text-[#CEFF00] font-bold">
                  {project.headline}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#1E1E22] text-[#F4F3EE] border border-[rgba(244,243,238,0.08)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                {project.isAssetGap ? (
                  <div className="w-full max-w-xs p-6 rounded-xl border border-dashed border-[rgba(244,243,238,0.2)] bg-[#18181C] text-center space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#222227] text-[#8E8E93] font-frama-meta text-[11px]">
                      Status
                    </span>
                    <p className="font-frama-extrabold-italic text-lg text-[#F4F3EE] uppercase">
                      Visual Capture Pending
                    </p>
                    <p className="font-sans-body text-xs text-[#8E8E93]">
                      Native process routines documented. Capture pending live upload.
                    </p>
                  </div>
                ) : project.assetUrl ? (
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl bg-[#18181C] border border-[rgba(244,243,238,0.08)] flex items-center justify-center p-6 shadow-xl">
                    <Image
                      src={project.assetUrl}
                      alt={project.title}
                      width={160}
                      height={160}
                      className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* Deep Technical Narrative */}
            <div className="space-y-12 max-w-3xl">
              {/* The Premise & Motivation */}
              <section className="space-y-3">
                <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
                  [01] // The Motivation
                </span>
                <h2 className="font-frama-black-italic text-2xl sm:text-3xl text-[#F4F3EE] uppercase tracking-tight">
                  Why I Built This
                </h2>
                <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] leading-relaxed">
                  {project.summary}
                </p>
              </section>

              {/* The Engineering Challenge */}
              <section className="space-y-3 pt-8 border-t border-[rgba(244,243,238,0.08)]">
                <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
                  [02] // The Obstacle
                </span>
                <h2 className="font-frama-black-italic text-2xl sm:text-3xl text-[#F4F3EE] uppercase tracking-tight">
                  The Core Challenge
                </h2>
                <p className="font-sans-body text-base sm:text-lg text-[#8E8E93] leading-relaxed">
                  {project.challenge}
                </p>
              </section>

              {/* Architecture & Implementation */}
              <section className="space-y-3 pt-8 border-t border-[rgba(244,243,238,0.08)]">
                <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
                  [03] // Architecture
                </span>
                <h2 className="font-frama-black-italic text-2xl sm:text-3xl text-[#F4F3EE] uppercase tracking-tight">
                  System Design &amp; Decisions
                </h2>
                <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] leading-relaxed">
                  {project.architecture}
                </p>
              </section>

              {/* Specifications */}
              <section className="space-y-4 pt-8 border-t border-[rgba(244,243,238,0.08)]">
                <span className="font-frama-meta text-xs tracking-widest text-[#CEFF00]">
                  [04] // Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.highlights?.map((h, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-[#18181C] border border-[rgba(244,243,238,0.08)]"
                    >
                      <p className="font-frama-meta text-xs text-[#8E8E93]">
                        {h.label}
                      </p>
                      <p className="font-tag text-sm text-[#F4F3EE] font-bold mt-1.5">
                        {h.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Surface Footer */}
            <div className="pt-10 border-t border-[rgba(244,243,238,0.08)] flex justify-between items-center">
              <span className="font-sans-body text-xs text-[#8E8E93]">
                Stylix Exhibition // {project.title}
              </span>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full bg-[#CEFF00] hover:bg-[#F4F3EE] text-[#111113] font-frama-meta text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                ← Return to Exhibition
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
