'use client';

import React from 'react';
import CircularBadge from '@/components/ui/CircularBadge';
import InteractiveHeroHeading from '@/components/ui/InteractiveHeroHeading';
import AmbientDustCanvas from '@/components/ui/AmbientDustCanvas';
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';
import { LiquidButton } from '@/components/animate-ui/components/buttons/liquid';
import { scrollToSection } from '@/lib/smoothScroll';

export default function Hero() {
  const scrollToWork = () => {
    scrollToSection('work');
  };

  const heroLines = [
    { text: "HELLO. I'M ASHU.", colorClass: 'text-[#8FA4B2] hover:text-[#F4F6F7] transition-colors duration-300' },
    { text: "I MAKE MACHINES", colorClass: 'text-[#F4F6F7]' },
    { text: "WORK FOR ME.", colorClass: 'text-[#F4F6F7]' },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background Ambient Dust Canvas */}
      <AmbientDustCanvas />

      {/* Top row: Identity and status badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-[rgba(56,189,248,0.12)] pb-8">
        <div className="flex items-center space-x-5">
          <CircularBadge size={58} />

          <div>
            <p className="font-frama-meta text-sm md:text-base text-[#F4F6F7] tracking-wide">
              Ashu <span className="text-[#8FA4B2] font-normal">(@stylixXD)</span>
            </p>
            <p className="font-sans-body text-xs md:text-sm text-[#8FA4B2] font-medium tracking-wide mt-0.5">
              Student Developer · Tool Builder · Automation Engineer
            </p>
          </div>
        </div>

        {/* Timeline badge */}
        <div className="hidden sm:flex flex-col items-end justify-center px-4 py-2 rounded-xl bg-[#111E24] border border-[rgba(56,189,248,0.14)]">
          <p className="font-frama-meta text-[11px] text-[#8FA4B2] tracking-wider uppercase">
            Selected Works
          </p>
          <p className="font-frama-meta text-xs text-[#38BDF8] font-bold mt-0.5">
            2026 — Present
          </p>
        </div>
      </div>

      {/* Hero Heading */}
      <div className="relative z-10 my-auto py-10 md:py-16 rounded-3xl overflow-hidden">
        {/* Background stars */}
        <GravityStarsBackground
          className="absolute inset-0 flex items-center justify-center rounded-xl text-[#38BDF8]"
          starsCount={80}
          movementSpeed={0.5}
          mouseInfluence={220}
          gravityStrength={120}
          glowIntensity={15}
        />

        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.07),transparent_70%)]"
        />

        {/* Foreground typography */}
        <div className="relative z-10">
          <InteractiveHeroHeading lines={heroLines} />
        </div>
      </div>

      {/* Bottom row: Bio and CTA */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-8 border-t border-[rgba(56,189,248,0.12)]">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <p className="font-sans-body text-base md:text-lg text-[#8FA4B2] max-w-2xl leading-relaxed font-normal">
              I build bots, automation, tools, websites, and systems around problems that are too repetitive, too slow, or simply too interesting to leave alone.
            </p>
            <p className="font-sans-body text-base md:text-lg text-[#8FA4B2] max-w-2xl leading-relaxed font-normal">
              I like figuring out how things work, then turning that understanding into something useful.
            </p>
          </div>

          <div>
            <LiquidButton
              onClick={scrollToWork}
              aria-label="Explore My Projects"
            >
              <span>Explore My Projects</span>
              <span className="w-6 h-6 rounded-full bg-[#0B1317] text-[#38BDF8] flex items-center justify-center font-bold text-xs transform group-hover:translate-y-0.5 transition-transform duration-200">
                ↓
              </span>
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
