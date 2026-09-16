'use client';

import React, { useState } from 'react';
import InteractiveContactHeading from '@/components/ui/InteractiveContactHeading';

export default function ContactEditorial() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const contactLines = [
    { text: "GOT A TASK?", colorClass: "text-[#8E8E93]" },
    { text: "LET'S AUTOMATE", colorClass: "text-[#F4F3EE]" },
    { text: "THE PROCESS.", colorClass: "text-[#CEFF00]" },
  ];

  return (
    <section id="contact" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(244,243,238,0.1)]">
      <div data-scroll-reveal className="mb-12">
        <span className="font-frama-meta text-xs md:text-sm tracking-wider text-[#CEFF00]">
          [04] // GET IN TOUCH
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        {/* Left: Giant Character-Interactive Contact Headline */}
        <div data-scroll-reveal className="lg:col-span-8">
          <InteractiveContactHeading lines={contactLines} />

          <p className="font-sans-body text-base sm:text-lg text-[#8E8E93] max-w-xl mt-8 leading-relaxed">
            Whether you need high-concurrency bot infrastructure, low-level process tooling,
            or custom automation pipelines built from scratch, reach out directly.
          </p>
        </div>

        {/* Right: Direct Contact Channels */}
        <div data-scroll-reveal className="lg:col-span-4 space-y-4">
          {/* Telegram */}
          <a
            href="https://t.me/stylixXD"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-5 rounded-xl bg-[#141417] border border-[rgba(244,243,238,0.08)] hover:border-[#CEFF00] transition-colors shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8E8E93]">
                Telegram
              </p>
              <p className="font-frama-meta text-base text-[#F4F3EE] mt-1">
                @stylixXD
              </p>
            </div>
            <span className="text-sm font-frama-meta text-[#8E8E93] group-hover:text-[#CEFF00] transition-colors">
              ↗
            </span>
          </a>

          {/* Discord */}
          <div
            onClick={() => copyToClipboard('Itzboyashu', 'Discord')}
            className="group flex items-center justify-between p-5 rounded-xl bg-[#141417] border border-[rgba(244,243,238,0.08)] hover:border-[#CEFF00] transition-colors cursor-pointer shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8E8E93]">
                Discord {copiedText === 'Discord' && <span className="text-[#CEFF00] ml-2 font-tag normal-case">(Copied!)</span>}
              </p>
              <p className="font-frama-meta text-base text-[#F4F3EE] mt-1">
                Itzboyashu
              </p>
            </div>
            <span className="text-xs font-frama-meta text-[#8E8E93] group-hover:text-[#CEFF00] transition-colors">
              [Copy]
            </span>
          </div>

          {/* Email */}
          <a
            href="mailto:stylixXD@gmail.com"
            className="group flex items-center justify-between p-5 rounded-xl bg-[#141417] border border-[rgba(244,243,238,0.08)] hover:border-[#CEFF00] transition-colors shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8E8E93]">
                Direct Email
              </p>
              <p className="font-frama-meta text-base text-[#F4F3EE] mt-1">
                stylixXD@gmail.com
              </p>
            </div>
            <span className="text-sm font-frama-meta text-[#8E8E93] group-hover:text-[#CEFF00] transition-colors">
              ↗
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/stylixXD"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-5 rounded-xl bg-[#141417] border border-[rgba(244,243,238,0.08)] hover:border-[#CEFF00] transition-colors shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8E8E93]">
                GitHub
              </p>
              <p className="font-frama-meta text-base text-[#F4F3EE] mt-1">
                @stylixXD
              </p>
            </div>
            <span className="text-sm font-frama-meta text-[#8E8E93] group-hover:text-[#CEFF00] transition-colors">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Editorial Footer Note */}
      <footer className="mt-28 pt-8 border-t border-[rgba(244,243,238,0.06)] flex flex-col sm:flex-row items-center justify-between text-xs font-sans-body text-[#8E8E93] space-y-4 sm:space-y-0">
        <p>
          &copy; 2026 Ashu (Stylix).
        </p>
        <p className="font-frama-meta text-[11px] text-[#8E8E93]">
          Designed &amp; Built with Intention by Ashu.
        </p>
      </footer>
    </section>
  );
}
