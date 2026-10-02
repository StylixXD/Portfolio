'use client';

import React from 'react';
import ColorPaintingQuote from '@/components/ui/ColorPaintingQuote';
import TextScramble from '@/components/ui/TextScramble';
import AliveSectionHeading from '@/components/ui/AliveSectionHeading';
import { AvatarGroup } from '@/components/animate-ui/components/animate/avatar-group';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/animate-ui/components/radix/accordion';

function HighlightWord({
  children,
  rotate = '-rotate-1',
}: {
  children: React.ReactNode;
  rotate?: string;
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 ${rotate} rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 font-medium text-inherit transform hover:scale-110 hover:-translate-y-1 hover:rotate-0 hover:bg-[#38BDF8]/25 hover:border-[#38BDF8] hover:shadow-[0_6px_16px_rgba(56,189,248,0.35)] transition-all duration-200 align-baseline mx-0.5 cursor-pointer select-none`}
    >
      {children}
    </span>
  );
}

export default function AboutNarrative() {
  return (
    <section id="about" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(56,189,248,0.12)]">
      <div data-scroll-reveal className="mb-16">
        <TextScramble
          text="[02] // THE STORY"
          className="font-frama-meta text-xs md:text-sm tracking-wider text-[#38BDF8]"
        />
        <AliveSectionHeading
          text="Behind the Screen"
          variant="stagger-chars"
          className="text-4xl sm:text-6xl text-[#F4F6F7] mt-2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Overview & FAQ */}
        <div data-scroll-reveal className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <ColorPaintingQuote
              quote="I DON'T BUILD JUST FOR THE VIEWPORT. I BUILD MACHINES TO WORK FOR ME."
            />
            <p className="font-frama-meta text-xs text-[#8FA4B2] tracking-wider">
              — Ashu // Stylix
            </p>
          </div>

          {/* Team status */}
          <div className="pt-6 border-t border-[rgba(56,189,248,0.12)]">
            <AvatarGroup />
          </div>

          {/* FAQ */}
          <div className="pt-6 border-t border-[rgba(56,189,248,0.12)]">
            <p className="font-frama-meta text-xs uppercase tracking-wider text-[#38BDF8] font-bold mb-4">
              [FAQ] // FREQUENT INQUIRIES
            </p>
            <Accordion type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>What do I build?</AccordionTrigger>
                <AccordionContent>
                  Bots, automation scripts, desktop utilities, full-stack web applications, and low-level tools that eliminate repetitive manual workflows.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What do I work with?</AccordionTrigger>
                <AccordionContent>
                  Python (Asyncio, Telethon, Discord.py), TypeScript, Next.js, Kotlin for Android, Tailwind CSS, and Windows API/system tooling.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Why do I build tools?</AccordionTrigger>
                <AccordionContent>
                  I&apos;m too lazy to do the same work twice. If a task or workflow is repetitive, I figure out how the system works and turn it into software.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What am I exploring?</AccordionTrigger>
                <AccordionContent>
                  Authentication mechanisms, internal APIs, privacy & security-focused tooling, and reverse engineering software architectures.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Narrative */}
        <div data-scroll-reveal className="lg:col-span-7 space-y-6 font-sans-body text-base sm:text-lg text-[#8FA4B2] leading-relaxed">
          <p className="leading-relaxed">
            I&apos;m a <HighlightWord rotate="-rotate-1">student developer</HighlightWord>, <HighlightWord rotate="rotate-1">tool maker</HighlightWord>, and someone who gets <HighlightWord rotate="-rotate-1">curious</HighlightWord> way too easily.
          </p>

          <p className="leading-relaxed">
            I started programming because I wanted to understand what was actually happening behind the software I was using. That curiosity took me from simple scripts to <HighlightWord rotate="rotate-1">bots</HighlightWord>, <HighlightWord rotate="-rotate-1">APIs</HighlightWord>, <HighlightWord rotate="rotate-1">automation</HighlightWord>, <HighlightWord rotate="-rotate-1">websites</HighlightWord>, <HighlightWord rotate="rotate-1">systems</HighlightWord>, and <HighlightWord rotate="-rotate-1">low-level experiments</HighlightWord>.
          </p>

          <div className="pt-2 pb-2">
            <p className="font-sans-body text-xs md:text-sm text-[#8FA4B2] uppercase tracking-wider mb-2 font-medium">
              Then I discovered something important:
            </p>
            <h3 className="font-frama-black-italic text-xl sm:text-2xl lg:text-3xl text-[#38BDF8] uppercase tracking-tight leading-snug">
              I&apos;M TOO LAZY TO DO THE SAME WORK TWICE.
            </h3>
          </div>

          <p className="leading-relaxed">
            If I have to repeat something, I usually start asking how it works, what the workflow looks like, and whether I can turn the whole thing into a <HighlightWord rotate="rotate-1">tool</HighlightWord>.
          </p>

          <p className="leading-relaxed">
            That&apos;s how a lot of my projects happen.
          </p>

          <p className="leading-relaxed">
            I also care a lot about <HighlightWord rotate="-rotate-1">privacy and security</HighlightWord>. I like knowing what software is doing with my data and what is happening underneath the interface, which is why I naturally end up exploring <HighlightWord rotate="rotate-1">authentication</HighlightWord>, <HighlightWord rotate="-rotate-1">APIs</HighlightWord>, <HighlightWord rotate="rotate-1">system behaviour</HighlightWord>, and <HighlightWord rotate="-rotate-1">security-focused tooling</HighlightWord>.
          </p>

          <p className="leading-relaxed">
            I&apos;m still learning, still experimenting, and still building random things that probably started with a five-minute question and turned into a much bigger project.
          </p>

          <p className="text-[#F4F6F7] font-medium pt-4 border-t border-[rgba(56,189,248,0.12)]">
            And honestly, that is the part I enjoy most.
          </p>
        </div>
      </div>
    </section>
  );
}
