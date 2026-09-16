'use client';

import React from 'react';
import AliveSectionHeading from '@/components/ui/AliveSectionHeading';

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
  return (
    <section id="craft" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(244,243,238,0.1)]">
      <div data-scroll-reveal className="flex flex-col md:flex-row md:items-baseline justify-between mb-16">
        <div>
          <span className="font-frama-meta text-xs md:text-sm tracking-wider text-[#CEFF00]">
            [03] // WHAT I BUILD WITH
          </span>
          <AliveSectionHeading
            text="Craft & Toolbox"
            variant="tracking-expand"
            className="text-4xl sm:text-6xl text-[#F4F3EE] mt-2"
          />
        </div>
        <p className="font-sans-body text-sm text-[#8E8E93] max-w-xs mt-4 md:mt-0">
          The tools I actually use to turn ideas into working software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {CRAFT_DOMAINS.map((domain) => (
          <div
            data-scroll-reveal
            key={domain.num}
            className={`p-8 md:p-10 rounded-2xl bg-[#141417] border border-[rgba(244,243,238,0.08)] ${domain.initialRotate} hover:rotate-0 hover:scale-[1.015] hover:-translate-y-2.5 hover:border-[rgba(244,243,238,0.25)] hover:shadow-2xl transition-all duration-300 ease-out flex flex-col justify-between space-y-6 shadow-lg will-change-transform cursor-default`}
          >
            <div>
              <span className="font-frama-meta text-sm text-[#CEFF00]">
                [{domain.num}]
              </span>
              <h3 className="font-frama-black-italic text-2xl sm:text-3xl text-[#F4F3EE] uppercase tracking-tight mt-2">
                {domain.title}
              </h3>
              <p className="font-sans-body text-sm sm:text-base text-[#8E8E93] leading-relaxed mt-3">
                {domain.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(244,243,238,0.08)]">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#18181C] border border-[rgba(244,243,238,0.08)] flex flex-wrap items-center gap-x-3 gap-y-2">
                {domain.tools.map((tool, idx) => (
                  <span key={tool} className="inline-flex items-center space-x-3 whitespace-nowrap">
                    <span className="font-frama-meta text-xs sm:text-[13px] tracking-wide text-[#F4F3EE] font-medium">
                      {tool}
                    </span>
                    {idx < domain.tools.length - 1 && (
                      <span className="text-[#CEFF00] text-xs font-bold select-none opacity-80" aria-hidden="true">·</span>
                    )}
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
