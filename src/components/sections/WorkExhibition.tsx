'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { REAL_PROJECTS } from '@/lib/realProjects';
import TextScramble from '@/components/ui/TextScramble';
import AliveSectionHeading from '@/components/ui/AliveSectionHeading';
import { scrollToSection } from '@/lib/smoothScroll';

export default function WorkExhibition() {
  const [activeProject, setActiveProject] = useState<string>(REAL_PROJECTS[0].id);
  const projectRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Detect which project stage is currently in the active reading viewport
  useEffect(() => {
    const handleScroll = () => {
      // 160px aligns with sticky top-28
      const stickyThreshold = 160;
      let currentActive = REAL_PROJECTS[0].id;

      for (let i = 0; i < REAL_PROJECTS.length; i++) {
        const p = REAL_PROJECTS[i];
        const el = projectRefs.current.get(p.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= stickyThreshold) {
            currentActive = p.id;
          }
        }
      }
      setActiveProject(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(`project-${id}`);
  };

  const activeIndex = REAL_PROJECTS.findIndex((p) => p.id === activeProject);

  return (
    <section id="work" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header with Text Scramble */}
      <div
        data-scroll-reveal
        className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[rgba(56,189,248,0.12)] pb-8 mb-16 sm:mb-24 gap-6"
      >
        <div>
          <div className="flex items-center gap-3">
            <TextScramble
              text="[01] // SYSTEM IN MOTION"
              className="font-frama-meta text-xs md:text-sm tracking-wider text-[#38BDF8]"
            />
          </div>

          <AliveSectionHeading
            text="Things I've Built"
            variant="slide-left"
            className="text-4xl sm:text-6xl text-[#F4F6F7] mt-3"
          />
        </div>

        <div className="space-y-2 md:text-right">
          <p className="font-sans-body text-sm text-[#8FA4B2] max-w-md leading-relaxed">
            Five real repositories spanning concurrent automation, server moderation, authentication flows, Android storage, and data extraction pipelines.
          </p>
        </div>
      </div>

      {/* Main Layout Grid: Side Project Navigator + Sticky Stacking Project Stages */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Editorial Side Project Navigator (Desktop Sticky Rail) with Gliding Indicator */}
        <aside
          aria-label="Project Navigator"
          className="hidden lg:flex lg:col-span-1 sticky top-36 flex-col py-4 border-l border-[rgba(56,189,248,0.15)] pl-3 z-30 select-none"
        >
          <div className="relative flex flex-col space-y-6">
            {/* Smoothly moving indicator bar that tracks the active project */}
            <div
              className="absolute -left-[14px] w-1 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8] transition-all duration-300 ease-out"
              style={{
                top: `${(activeIndex >= 0 ? activeIndex : 0) * 48}px`,
                height: '24px',
              }}
            />

            {REAL_PROJECTS.map((p) => {
              const isActive = activeProject === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleNavClick(p.id)}
                  className={`group flex items-center space-x-2.5 text-left h-6 transition-all duration-300 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'text-[#38BDF8] translate-x-1 font-bold'
                      : 'text-[#8FA4B2] hover:text-[#F4F6F7]'
                  }`}
                  aria-label={`Jump to Project ${p.number}: ${p.title}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] scale-125'
                        : 'bg-[rgba(56,189,248,0.25)] group-hover:bg-[#8FA4B2]'
                    }`}
                  />
                  <span className="font-frama-meta text-xs tracking-wider">
                    {p.number}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Scroll-Driven Sticky / Stacking Project Sequence */}
        <div className="lg:col-span-11 space-y-16 sm:space-y-24">
          {REAL_PROJECTS.map((project, index) => {
            const isActive = activeProject === project.id;

            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                ref={(el) => {
                  if (el) projectRefs.current.set(project.id, el);
                  else projectRefs.current.delete(project.id);
                }}
                style={{ zIndex: 10 + index }}
                className="sticky top-28 transition-all duration-500 will-change-transform"
              >
                {/* Project card wrapper */}
                <div
                  className={`group relative rounded-2xl bg-[#111E24] border border-[rgba(56,189,248,0.12)] transition-all duration-500 ${
                    isActive ? 'shadow-2xl' : ''
                  }`}
                >
                  {/* Active-Project Subtle Editorial Scanline Sweep (Single Pass, Thin Editorial Line) */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent overflow-hidden pointer-events-none z-20"
                    >
                      <div className="w-full h-full animate-scanline-sweep" />
                    </div>
                  )}

                  {/* Giant Editorial Background Project Number */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-6 right-6 sm:right-10 text-8xl sm:text-9xl lg:text-[11rem] font-frama-black-italic text-[#F4F6F7]/[0.035] select-none pointer-events-none tracking-tighter leading-none z-0 group-hover:text-[#38BDF8]/[0.08] group-hover:-translate-x-2 transition-all duration-500"
                  >
                    {project.number}
                  </div>

                  {/* Inner Project Content */}
                  <div className="p-8 sm:p-10 lg:p-12 relative z-10 w-full">
                    {/* Controlled Asymmetric Layouts Across Projects */}
                    {index % 2 === 0 ? (
                      /* Layout A: Typography Dominant on Left, Floating Visual on Right */
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left: Deconstructed Typographic Layer */}
                        <div className="lg:col-span-7 space-y-5">
                          {/* Metadata row with deconstructed offset */}
                          <div className="flex flex-wrap items-center gap-3 text-[#38BDF8] font-frama-meta text-xs md:text-sm tracking-wider uppercase group-hover:translate-x-[2px] group-hover:translate-y-[1px] transition-transform duration-300">
                            <span>{project.category}</span>
                          </div>

                          {/* Title with independent hover offset */}
                          <h3 className="font-frama-black-italic text-3xl sm:text-4xl lg:text-5xl text-[#F4F6F7] leading-tight tracking-tight group-hover:text-[#38BDF8] group-hover:translate-x-[3px] group-hover:-translate-y-[1px] transition-all duration-300">
                            {project.title}
                          </h3>

                          {/* Headline */}
                          <p className="font-sans-body text-base sm:text-lg text-[#F4F6F7] font-medium leading-snug max-w-xl">
                            {project.headline}
                          </p>

                          {/* Description */}
                          <p className="font-sans-body text-sm sm:text-base text-[#8FA4B2] leading-relaxed max-w-xl">
                            {project.description}
                          </p>

                          {/* Stack Pills */}
                          <div className="flex flex-wrap gap-2 pt-1 group-hover:translate-x-[2px] transition-transform duration-300">
                            {project.stack.map((t) => (
                              <span
                                key={t}
                                className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#162630] text-[#F4F6F7] border border-[rgba(56,189,248,0.12)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Primary Actions: View on GitHub */}
                          <div className="flex flex-wrap items-center gap-4 pt-3">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2.5 font-frama-meta text-xs md:text-sm tracking-wider uppercase text-[#8FA4B2] hover:text-[#F4F6F7] transition-colors duration-200 cursor-pointer"
                              aria-label={`View ${project.title} source code on GitHub`}
                            >
                              <span>VIEW ON GITHUB</span>
                              <span className="w-7 h-7 rounded-full bg-[#162630] border border-[rgba(56,189,248,0.2)] flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:border-[#38BDF8] group-hover:bg-[#1A2D39] transition-all duration-300">
                                <span className="text-xs font-bold leading-none">↗</span>
                              </span>
                            </a>
                          </div>
                        </div>

                        {/* Right: Floating Visual Layer with independent micro-offset */}
                        <div className="lg:col-span-5 flex justify-center group-hover:-translate-x-[3px] group-hover:-translate-y-[2px] transition-transform duration-300">
                          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-[#14232B] border border-[rgba(56,189,248,0.12)] flex items-center justify-center p-8 hover:border-[rgba(56,189,248,0.35)] transition-all duration-300 shadow-2xl overflow-hidden animate-float-idle">
                            <Image
                              src={project.assetUrl}
                              alt={project.title}
                              width={200}
                              height={180}
                              className="max-h-[190px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(56,189,248,0.35)]"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Layout B: Reversed Asymmetric Composition (Visual on Left, Narrative on Right) */
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left: Floating Visual Layer */}
                        <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 group-hover:-translate-x-[3px] group-hover:-translate-y-[2px] transition-transform duration-300">
                          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-[#14232B] border border-[rgba(56,189,248,0.12)] flex items-center justify-center p-8 hover:border-[rgba(56,189,248,0.35)] transition-all duration-300 shadow-2xl overflow-hidden animate-float-idle">
                            <Image
                              src={project.assetUrl}
                              alt={project.title}
                              width={200}
                              height={180}
                              className="max-h-[190px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(56,189,248,0.35)]"
                            />
                          </div>
                        </div>

                        {/* Right: Deconstructed Typographic Layer */}
                        <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
                          {/* Metadata row with deconstructed offset */}
                          <div className="flex flex-wrap items-center gap-3 text-[#38BDF8] font-frama-meta text-xs md:text-sm tracking-wider uppercase group-hover:translate-x-[2px] group-hover:translate-y-[1px] transition-transform duration-300">
                            <span>{project.category}</span>
                          </div>

                          {/* Title with independent hover offset */}
                          <h3 className="font-frama-black-italic text-3xl sm:text-4xl lg:text-5xl text-[#F4F6F7] leading-tight tracking-tight group-hover:text-[#38BDF8] group-hover:translate-x-[3px] group-hover:-translate-y-[1px] transition-all duration-300">
                            {project.title}
                          </h3>

                          {/* Headline */}
                          <p className="font-sans-body text-base sm:text-lg text-[#F4F6F7] font-medium leading-snug max-w-xl">
                            {project.headline}
                          </p>

                          {/* Description */}
                          <p className="font-sans-body text-sm sm:text-base text-[#8FA4B2] leading-relaxed max-w-xl">
                            {project.description}
                          </p>

                          {/* Stack Pills */}
                          <div className="flex flex-wrap gap-2 pt-1 group-hover:translate-x-[2px] transition-transform duration-300">
                            {project.stack.map((t) => (
                              <span
                                key={t}
                                className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#162630] text-[#F4F6F7] border border-[rgba(56,189,248,0.12)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Primary Actions: View on GitHub */}
                          <div className="flex flex-wrap items-center gap-4 pt-3">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2.5 font-frama-meta text-xs md:text-sm tracking-wider uppercase text-[#8FA4B2] hover:text-[#F4F6F7] transition-colors duration-200 cursor-pointer"
                              aria-label={`View ${project.title} source code on GitHub`}
                            >
                              <span>VIEW ON GITHUB</span>
                              <span className="w-7 h-7 rounded-full bg-[#162630] border border-[rgba(56,189,248,0.2)] flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:border-[#38BDF8] group-hover:bg-[#1A2D39] transition-all duration-300">
                                <span className="text-xs font-bold leading-none">↗</span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
