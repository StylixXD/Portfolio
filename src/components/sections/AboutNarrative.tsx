'use client';

import React from 'react';
import ColorPaintingQuote from '@/components/ui/ColorPaintingQuote';
import AliveSectionHeading from '@/components/ui/AliveSectionHeading';

function HighlightWord({
  children,
  rotate = '-rotate-1',
}: {
  children: React.ReactNode;
  rotate?: string;
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 ${rotate} rounded bg-[#CEFF00]/10 text-[#CEFF00] border border-[#CEFF00]/30 font-medium text-inherit shadow-sm transform hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-default select-none mx-0.5`}
    >
      {children}
    </span>
  );
}

export default function AboutNarrative() {
  return (
    <section id="about" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(244,243,238,0.1)]">
      <div data-scroll-reveal className="mb-16">
        <span className="font-frama-meta text-xs md:text-sm tracking-wider text-[#CEFF00]">
          [02] // THE STORY
        </span>
        <AliveSectionHeading
          text="Behind the Screen"
          variant="stagger-chars"
          className="text-4xl sm:text-6xl text-[#F4F3EE] mt-2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Interactive Character-Level Color Painting Pull Quote */}
        <div data-scroll-reveal className="lg:col-span-5 space-y-6">
          <ColorPaintingQuote
            quote="I DON'T BUILD JUST FOR THE VIEWPORT. I BUILD MACHINES TO WORK FOR ME."
          />
          <p className="font-frama-meta text-xs text-[#8E8E93] tracking-wider">
            — Ashu // Stylix
          </p>
        </div>

        {/* Right: Candid Human Narrative with Tilted Highlighted Keyword Badges */}
        <div data-scroll-reveal className="lg:col-span-7 space-y-6 font-sans-body text-base sm:text-lg text-[#8E8E93] leading-relaxed">
          <p>
            I&apos;m a <HighlightWord rotate="-rotate-1">student developer</HighlightWord>, <HighlightWord rotate="rotate-1">tool maker</HighlightWord>, and someone who gets <HighlightWord rotate="-rotate-1">curious</HighlightWord> way too easily.
          </p>

          <p>
            I started programming because I wanted to understand what was actually happening behind the software I was using. That curiosity took me from simple scripts to <HighlightWord rotate="rotate-1">bots</HighlightWord>, <HighlightWord rotate="-rotate-1">APIs</HighlightWord>, <HighlightWord rotate="rotate-1">automation</HighlightWord>, <HighlightWord rotate="-rotate-1">websites</HighlightWord>, <HighlightWord rotate="rotate-1">systems</HighlightWord>, and <HighlightWord rotate="-rotate-1">low-level experiments</HighlightWord>.
          </p>

          <div className="pt-2 pb-2">
            <p className="font-sans-body text-xs md:text-sm text-[#8E8E93] uppercase tracking-wider mb-2 font-medium">
              Then I discovered something important:
            </p>
            <h3 className="font-frama-black-italic text-2xl sm:text-3xl lg:text-4xl text-[#CEFF00] uppercase tracking-tight leading-tight">
              I&apos;M TOO LAZY TO DO THE SAME WORK TWICE.
            </h3>
          </div>

          <p>
            If I have to repeat something, I usually start asking how it works, what the workflow looks like, and whether I can turn the whole thing into a <HighlightWord rotate="rotate-1">tool</HighlightWord>.
          </p>

          <p>
            That&apos;s how a lot of my projects happen.
          </p>

          <p>
            I also care a lot about <HighlightWord rotate="-rotate-1">privacy and security</HighlightWord>. I like knowing what software is doing with my data and what is happening underneath the interface, which is why I naturally end up exploring <HighlightWord rotate="rotate-1">authentication</HighlightWord>, <HighlightWord rotate="-rotate-1">APIs</HighlightWord>, <HighlightWord rotate="rotate-1">system behaviour</HighlightWord>, and <HighlightWord rotate="-rotate-1">security-focused tooling</HighlightWord>.
          </p>

          <p>
            I&apos;m still learning, still experimenting, and still building random things that probably started with a five-minute question and turned into a much bigger project.
          </p>

          <p className="text-[#F4F3EE] font-medium pt-4 border-t border-[rgba(244,243,238,0.08)]">
            And honestly, that is the part I enjoy most.
          </p>
        </div>
      </div>
    </section>
  );
}
