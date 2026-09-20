'use client';

import React from 'react';
import CircularBadge from '@/components/ui/CircularBadge';
import InteractiveHeroHeading from '@/components/ui/InteractiveHeroHeading';
import AmbientDustCanvas from '@/components/ui/AmbientDustCanvas';
import ShimmerButton from '@/components/ui/ShimmerButton';
import { scrollToSection } from '@/lib/smoothScroll';

export default function Hero() {
  const scrollToWork = () => {
    scrollToSection('work');
  };

  const heroLines = [
    { text: "HELLO. I'M ASHU.", colorClass: 'text-[#8E8E93] hover:text-[#F4F3EE] transition-colors duration-300' },
    { text: "I MAKE MACHINES", colorClass: 'text-[#F4F3EE]' },
    { text: "WORK FOR ME.", colorClass: 'text-[#F4F3EE]' },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background Ambient Dust Canvas */}
      <AmbientDustCanvas />

      {/* Top row: Subtle identity note & circular typographic badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-[rgba(244,243,238,0.08)] pb-8">
        <div className="flex items-center space-x-5">
          {/* Clean Editorial Avatar Frame */}
          <CircularBadge size={58} />

          <div>
            <p className="font-frama-meta text-sm md:text-base text-[#F4F3EE] tracking-wide">
              Ashu <span className="text-[#8E8E93] font-normal">(@stylixXD)</span>
            </p>
            <p className="font-sans-body text-xs md:text-sm text-[#8E8E93] font-medium tracking-wide mt-0.5">
              Student Developer · Tool Builder · Automation Engineer
            </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-[#18181C] border border-[rgba(244,243,238,0.08)] mb-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CEFF00] animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider text-[#CEFF00] uppercase font-bold">SYSTEMS ACTIVE</span>
          </div>
          <p className="font-sans-body text-xs md:text-sm text-[#F4F3EE] font-medium">
            2026 — Present
          </p>
        </div>
      </div>

      {/* Hero Heading */}
      <div className="relative z-10 my-auto py-10 md:py-16 rounded-3xl overflow-hidden">
        {/* Heading backdrop container with subtle ambient glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(206,255,0,0.04),transparent_70%)]"
        />

        {/* Foreground typography */}
        <div className="relative z-10">
          <InteractiveHeroHeading lines={heroLines} />
        </div>
      </div>

      {/* Bottom row: Human subline & direct action trigger */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-8 border-t border-[rgba(244,243,238,0.08)]">
        <div className="md:col-span-8 space-y-3">
          <p className="font-sans-body text-base md:text-lg text-[#8E8E93] max-w-2xl leading-relaxed font-normal">
            I build bots, automation, tools, websites, and systems around problems that are too repetitive, too slow, or simply too interesting to leave alone.
          </p>
          <p className="font-sans-body text-base md:text-lg text-[#8E8E93] max-w-2xl leading-relaxed font-normal">
            I like figuring out how things work, then turning that understanding into something useful.
          </p>
        </div>

        <div className="md:col-span-4 flex md:justify-end">
          <ShimmerButton
            onClick={scrollToWork}
            className="px-5 py-2.5"
            aria-label="Explore My Projects"
          >
            <span className="font-frama-meta text-xs md:text-sm uppercase tracking-widest text-[#F4F3EE] group-hover:text-[#CEFF00] transition-colors">
              Explore My Projects
            </span>
            <span className="text-[#CEFF00] transform group-hover:translate-y-1 transition-transform duration-200 font-bold">
              ↓
            </span>
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}

