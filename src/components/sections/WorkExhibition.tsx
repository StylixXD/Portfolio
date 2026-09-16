'use client';

import React from 'react';
import Image from 'next/image';
import { REAL_PROJECTS } from '@/lib/realProjects';
import AliveSectionHeading from '@/components/ui/AliveSectionHeading';

export default function WorkExhibition() {
  const [p1, p2, p3, p4, p5] = REAL_PROJECTS;

  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header with Alive Typography */}
      <div data-scroll-reveal className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[rgba(244,243,238,0.1)] pb-8 mb-20 gap-4">
        <div>
          <span className="font-frama-meta text-xs md:text-sm tracking-wider text-[#CEFF00]">
            [01] // MY WORK
          </span>
          <AliveSectionHeading
            text="Things I've Built"
            variant="slide-left"
            className="text-4xl sm:text-6xl text-[#F4F3EE] mt-2"
          />
        </div>
        <p className="font-sans-body text-sm text-[#8E8E93] max-w-md md:text-right leading-relaxed">
          A collection of bots, tools, and systems I've built while trying to solve problems — or just understand how something works.
        </p>
      </div>

      <div className="space-y-28 md:space-y-36">
        {/* Project 01: Telegram Concurrency */}
        <a
          data-scroll-reveal
          href={p1.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative cursor-pointer border border-[rgba(244,243,238,0.08)] bg-[#141417] rounded-2xl p-8 md:p-14 hover:border-[rgba(244,243,238,0.25)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg focus:outline-none"
          aria-label={`${p1.title} - View on GitHub`}
        >
          {/* Top-Left Corner Bot Mascot */}
          <div className="absolute -top-5 left-4 sm:-top-7 sm:left-6 md:-top-8 md:left-8 w-16 h-16 sm:w-20 sm:h-20 z-30 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
            <Image
              src="/images/processed/bot-mascot-clean.png"
              alt="Bot Mascot"
              width={80}
              height={80}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Typographic Context */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-3 text-[#CEFF00] font-frama-meta text-xs md:text-sm tracking-wider uppercase">
                <span>{p1.category}</span>
              </div>

              <h3 className="font-frama-black-italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F3EE] uppercase leading-[0.95] tracking-tight group-hover:text-[#CEFF00] transition-colors duration-300">
                {p1.title}
              </h3>

              <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] font-medium leading-snug max-w-xl">
                {p1.headline}
              </p>

              <p className="font-sans-body text-sm sm:text-base text-[#8E8E93] leading-relaxed max-w-xl">
                {p1.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {p1.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#1E1E22] text-[#F4F3EE] border border-[rgba(244,243,238,0.06)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <span className="inline-flex items-center space-x-2 font-frama-meta text-xs md:text-sm tracking-wider uppercase text-[#CEFF00] group-hover:text-[#F4F3EE] transition-colors duration-200">
                  <span>VIEW ON GITHUB</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">
                    →
                  </span>
                </span>
              </div>
            </div>

            {/* Right: Floating Visual Window */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-[#161619] border border-[rgba(244,243,238,0.08)] flex items-center justify-center p-6 group-hover:border-[rgba(244,243,238,0.25)] group-hover:scale-[1.03] transition-all duration-300 shadow-2xl overflow-hidden">
                <Image
                  src={p1.assetUrl}
                  alt={p1.title}
                  width={200}
                  height={153}
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                />
                <span className="absolute bottom-4 right-4 font-frama-meta text-xs text-[#8E8E93] group-hover:text-[#CEFF00] transition-colors">
                  View on GitHub ↗
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Project 02: Discord Token & Session Manager */}
        <a
          data-scroll-reveal
          href={p2.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative cursor-pointer border border-[rgba(244,243,238,0.08)] bg-[#141417] rounded-2xl p-8 md:p-14 hover:border-[rgba(244,243,238,0.25)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg focus:outline-none"
          aria-label={`${p2.title} - View on GitHub`}
        >
          {/* Top-Left Corner Bot Mascot */}
          <div className="absolute -top-5 left-4 sm:-top-7 sm:left-6 md:-top-8 md:left-8 w-16 h-16 sm:w-20 sm:h-20 z-30 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
            <Image
              src="/images/processed/bot-mascot-clean.png"
              alt="Bot Mascot"
              width={80}
              height={80}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Floating Discord Visual Window */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-[#161619] border border-[rgba(244,243,238,0.08)] flex items-center justify-center p-8 group-hover:border-[#5865F2]/50 group-hover:scale-[1.03] transition-all duration-300 shadow-2xl overflow-hidden">
                <Image
                  src={p2.assetUrl}
                  alt={p2.title}
                  width={190}
                  height={190}
                  className="object-contain rounded-2xl filter drop-shadow-[0_20px_40px_rgba(88,101,242,0.4)]"
                />
                <span className="absolute bottom-4 left-4 font-frama-meta text-xs text-[#8E8E93] group-hover:text-[#CEFF00] transition-colors">
                  ↖ View on GitHub
                </span>
              </div>
            </div>

            {/* Right: Typographic Narrative */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <div className="flex items-center space-x-3 text-[#CEFF00] font-frama-meta text-xs md:text-sm tracking-wider uppercase">
                <span>{p2.category}</span>
              </div>

              <h3 className="font-frama-black-italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F3EE] uppercase leading-[0.95] tracking-tight group-hover:text-[#CEFF00] transition-colors duration-300">
                {p2.title}
              </h3>

              <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] font-medium leading-snug max-w-xl">
                {p2.headline}
              </p>

              <p className="font-sans-body text-sm sm:text-base text-[#8E8E93] leading-relaxed max-w-xl">
                {p2.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {p2.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#1E1E22] text-[#F4F3EE] border border-[rgba(244,243,238,0.06)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <span className="inline-flex items-center space-x-2 font-frama-meta text-xs md:text-sm tracking-wider uppercase text-[#CEFF00] group-hover:text-[#F4F3EE] transition-colors duration-200">
                  <span>VIEW ON GITHUB</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Project 03: Xbox / Microsoft Account Engine */}
        <a
          data-scroll-reveal
          href={p3.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative cursor-pointer border border-[rgba(244,243,238,0.08)] bg-[#141417] rounded-2xl hover:border-[rgba(244,243,238,0.25)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg focus:outline-none"
          aria-label={`${p3.title} - View on GitHub`}
        >
          {/* Top-Left Corner Bot Mascot */}
          <div className="absolute -top-5 left-4 sm:-top-7 sm:left-6 md:-top-8 md:left-8 w-16 h-16 sm:w-20 sm:h-20 z-30 pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
            <Image
              src="/images/processed/bot-mascot-clean.png"
              alt="Bot Mascot"
              width={80}
              height={80}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Poster Composition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 rounded-2xl overflow-hidden">
            <div className="md:col-span-6 p-8 md:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#107C10] font-frama-meta text-xs md:text-sm tracking-wider uppercase">
                  <span>{p3.category}</span>
                </div>

                <h3 className="font-frama-black-italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F3EE] uppercase tracking-tight group-hover:text-[#107C10] transition-colors duration-300">
                  {p3.title}
                </h3>

                <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] font-medium leading-snug">
                  {p3.headline}
                </p>

                <p className="font-sans-body text-sm sm:text-base text-[#8E8E93] leading-relaxed">
                  {p3.description}
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-[rgba(244,243,238,0.06)]">
                <div className="flex flex-wrap gap-2">
                  {p3.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#1E1E22] text-[#F4F3EE] border border-[rgba(244,243,238,0.06)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div>
                  <span className="inline-flex items-center space-x-2 font-frama-meta text-xs md:text-sm tracking-wider uppercase text-[#107C10] group-hover:text-[#F4F3EE] transition-colors duration-200">
                    <span>VIEW ON GITHUB</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Stage */}
            <div className="md:col-span-6 bg-[#0E0E10] border-t md:border-t-0 md:border-l border-[rgba(244,243,238,0.08)] flex items-center justify-center p-8 relative overflow-hidden group-hover:border-[rgba(244,243,238,0.25)] transition-colors">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                <Image
                  src={p3.assetUrl}
                  alt={p3.title}
                  width={200}
                  height={200}
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(16,124,16,0.35)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="absolute bottom-4 right-4 font-frama-meta text-xs text-[#8E8E93] group-hover:text-[#107C10] transition-colors">
                View on GitHub ↗
              </span>
            </div>
          </div>
        </a>

        {/* Project 04: StorageIQ (Android) */}
        <a
          data-scroll-reveal
          href={p4.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative cursor-pointer border border-[rgba(244,243,238,0.08)] bg-[#111113] rounded-2xl p-8 md:p-14 hover:border-[#3DDC84]/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg focus:outline-none"
          aria-label={`${p4.title} - View on GitHub`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Engineering Context */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-3 text-[#3DDC84] font-frama-meta text-xs md:text-sm tracking-wider uppercase">
                <span>{p4.category}</span>
              </div>

              <h3 className="font-frama-black-italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F3EE] uppercase tracking-tight group-hover:text-[#3DDC84] transition-colors duration-300">
                {p4.title}
              </h3>

              <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] font-medium leading-snug max-w-xl">
                {p4.headline}
              </p>

              <p className="font-sans-body text-sm sm:text-base text-[#8E8E93] leading-relaxed max-w-xl">
                {p4.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {p4.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#1E1E22] text-[#F4F3EE] border border-[rgba(244,243,238,0.06)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <span className="inline-flex items-center space-x-2 font-frama-meta text-xs md:text-sm tracking-wider uppercase text-[#3DDC84] group-hover:text-[#F4F3EE] transition-colors duration-200">
                  <span>VIEW ON GITHUB</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">
                    →
                  </span>
                </span>
              </div>
            </div>

            {/* Right: StorageIQ Visual Window */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-[#161619] border border-[rgba(244,243,238,0.08)] flex items-center justify-center p-6 group-hover:border-[#3DDC84]/50 group-hover:scale-[1.03] transition-all duration-300 shadow-2xl overflow-hidden">
                <Image
                  src={p4.assetUrl}
                  alt={p4.title}
                  width={200}
                  height={153}
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(61,220,132,0.35)]"
                />
                <span className="absolute bottom-4 right-4 font-frama-meta text-xs text-[#8E8E93] group-hover:text-[#3DDC84] transition-colors">
                  View on GitHub ↗
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Project 05: Modern Web / Creative Development */}
        <a
          data-scroll-reveal
          href={p5.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative cursor-pointer border border-[rgba(244,243,238,0.08)] bg-[#141417] rounded-2xl p-8 md:p-14 hover:border-[rgba(244,243,238,0.25)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg focus:outline-none"
          aria-label={`${p5.title} - View on GitHub`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Grand Robot Arm Industrial Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-[#161619] border border-[rgba(244,243,238,0.08)] flex items-center justify-center p-8 group-hover:border-[#F06565]/40 group-hover:scale-[1.03] transition-all duration-300 shadow-2xl overflow-hidden">
                <Image
                  src={p5.assetUrl}
                  alt={p5.title}
                  width={210}
                  height={210}
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(240,101,101,0.35)]"
                />
                <span className="absolute bottom-4 left-4 font-frama-meta text-xs text-[#8E8E93] group-hover:text-[#CEFF00] transition-colors">
                  View on GitHub ↗
                </span>
              </div>
            </div>

            {/* Right: Narrative Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-3 text-[#CEFF00] font-frama-meta text-xs md:text-sm tracking-wider uppercase">
                <span>{p5.category}</span>
              </div>

              <h3 className="font-frama-black-italic text-3xl sm:text-5xl lg:text-6xl text-[#F4F3EE] uppercase tracking-tight group-hover:text-[#CEFF00] transition-colors duration-300">
                {p5.title}
              </h3>

              <p className="font-sans-body text-base sm:text-lg text-[#F4F3EE] font-medium leading-snug max-w-xl">
                {p5.headline}
              </p>

              <p className="font-sans-body text-sm sm:text-base text-[#8E8E93] leading-relaxed max-w-xl">
                {p5.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {p5.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md text-xs font-frama-meta bg-[#1E1E22] text-[#F4F3EE] border border-[rgba(244,243,238,0.06)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <span className="inline-flex items-center space-x-2 font-frama-meta text-xs md:text-sm tracking-wider uppercase text-[#CEFF00] group-hover:text-[#F4F3EE] transition-colors duration-200">
                  <span>VIEW ON GITHUB</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 font-bold">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
