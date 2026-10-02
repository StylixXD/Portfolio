'use client';

import React, { useState } from 'react';
import TextScramble from '@/components/ui/TextScramble';
import AliveSectionHeading from '@/components/ui/AliveSectionHeading';
import OptionWheel from '@/components/reactbits/OptionWheel/OptionWheel';
import { motion, AnimatePresence } from 'framer-motion';

const CRAFT_DOMAINS = [
  {
    num: '01',
    title: 'BOTS & AUTOMATION',
    summary:
      'Building bots and automation systems that can handle repetitive work without needing someone watching them every second.',
    tools: ['Python', 'Asyncio', 'Telethon', 'Discord.py', 'Discord.js'],
    initialRotate: 'sm:-rotate-[1.6deg]',
  },
  {
    num: '02',
    title: 'SYSTEMS & LOW-LEVEL',
    summary:
      'Exploring what happens underneath the interface — from Windows processes and memory to system APIs and low-level tooling.',
    tools: ['C++', 'WinAPI', 'Kernel32', 'VirtualQueryEx', 'Process APIs'],
    initialRotate: 'sm:rotate-[1.4deg]',
  },
  {
    num: '03',
    title: 'APIS & DATA',
    summary:
      "Working with APIs, authentication flows, scraping, data extraction, and the weird problems that appear when software doesn't behave exactly how you expect.",
    tools: ['OAuth', 'REST APIs', 'Data Extraction', 'Web Scraping', 'Automation'],
    initialRotate: 'sm:rotate-[1.6deg]',
  },
  {
    num: '04',
    title: 'WEB & CREATIVE DEVELOPMENT',
    summary:
      'Building websites and interfaces where the code, interaction, typography, and visual direction all matter.',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Motion'],
    initialRotate: 'sm:-rotate-[1.4deg]',
  },
];

export default function CraftToolbox() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedDomain = CRAFT_DOMAINS[selectedIdx] || CRAFT_DOMAINS[0];

  return (
    <section id="craft" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(56,189,248,0.12)]">
      <div data-scroll-reveal className="flex flex-col md:flex-row md:items-baseline justify-between mb-16">
        <div>
          <TextScramble
            text="[03] // WHAT I BUILD WITH"
            className="font-frama-meta text-xs md:text-sm tracking-wider text-[#38BDF8]"
          />
          <AliveSectionHeading
            text="Craft & Toolbox"
            variant="tracking-expand"
            className="text-4xl sm:text-6xl text-[#F4F6F7] mt-2"
          />
        </div>
        <p className="font-sans-body text-sm text-[#8FA4B2] max-w-xs mt-4 md:mt-0">
          The tools I actually use to turn ideas into working software.
        </p>
      </div>

      {/* Desktop view */}
      <div data-scroll-reveal className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Domain selector */}
        <div className="md:col-span-5 lg:col-span-6 h-[460px] relative overflow-hidden flex items-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]">
          <div className="w-full h-full relative">
            <OptionWheel
              items={CRAFT_DOMAINS.map((d) => d.title)}
              defaultSelected={0}
              onChange={(idx) => setSelectedIdx(idx)}
              side="left"
              fontSize={2.4}
              inset={28}
              loop={false}
              draggable={true}
              soundUrl=""
              textColor="#8FA4B2"
              activeColor="#38BDF8"
              className="w-full h-full font-frama-black-italic tracking-tight"
            />
          </div>
        </div>

        {/* Domain details */}
        <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-center min-h-[460px] py-4 pl-2 lg:pl-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDomain.num}
              initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-frama-meta text-xs md:text-sm text-[#38BDF8] tracking-widest uppercase font-semibold">
                  [{selectedDomain.num}] // CATEGORY
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[rgba(56,189,248,0.3)] to-transparent" />
              </div>

              <h3 className="font-frama-black-italic text-3xl sm:text-4xl lg:text-5xl text-[#F4F6F7] uppercase tracking-tight leading-tight">
                {selectedDomain.title}
              </h3>

              <p className="font-sans-body text-base sm:text-lg text-[#8FA4B2] leading-relaxed max-w-xl">
                {selectedDomain.summary}
              </p>

              <div className="pt-4 border-t border-[rgba(56,189,248,0.12)] space-y-3">
                <span className="block font-frama-meta text-xs text-[#8FA4B2] tracking-wider uppercase">
                  Verified Tools &amp; Technologies
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {selectedDomain.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#14232B] border border-[rgba(56,189,248,0.18)] font-frama-meta text-xs sm:text-[13px] tracking-wide text-[#F4F6F7] font-medium hover:border-[#38BDF8] hover:text-[#38BDF8] hover:scale-105 transition-all duration-200 select-none shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="grid grid-cols-1 gap-8 md:hidden">
        {CRAFT_DOMAINS.map((domain) => (
          <div
            data-scroll-reveal
            key={domain.num}
            className="p-8 rounded-2xl bg-[#111E24] border border-[rgba(56,189,248,0.12)] flex flex-col justify-between space-y-6 shadow-lg cursor-default"
          >
            <div>
              <span className="font-frama-meta text-sm text-[#38BDF8]">
                [{domain.num}]
              </span>
              <h3 className="font-frama-black-italic text-2xl text-[#F4F6F7] uppercase tracking-tight mt-2">
                {domain.title}
              </h3>
              <p className="font-sans-body text-sm text-[#8FA4B2] leading-relaxed mt-3">
                {domain.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(56,189,248,0.1)]">
              <div className="p-3.5 rounded-xl bg-[#14232B] border border-[rgba(56,189,248,0.12)] flex flex-wrap items-center gap-2">
                {domain.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center px-3 py-1 rounded-md bg-[#162630] border border-[rgba(56,189,248,0.12)] font-frama-meta text-xs tracking-wide text-[#F4F6F7] font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
