'use client';

import React, { useState } from 'react';
import TextScramble from '@/components/ui/TextScramble';
import InteractiveContactHeading from '@/components/ui/InteractiveContactHeading';
import SwipeToast from '@/components/reactbits/SwipeToast/SwipeToast';
import { CopyButton } from '@/components/animate-ui/components/buttons/copy';

export default function ContactEditorial() {
  const [toast, setToast] = useState<{ id: number; title: string; desc: string } | null>(null);

  const contactLines = [
    { text: 'GOT A TASK?', colorClass: 'text-[#8FA4B2]' },
    { text: "LET'S AUTOMATE", colorClass: 'text-[#F4F6F7]' },
    { text: 'THE PROCESS.', colorClass: 'text-[#38BDF8]' },
  ];

  const copyToClipboard = (text: string, title: string, desc: string) => {
    navigator.clipboard.writeText(text);
    setToast({
      id: Date.now(),
      title,
      desc,
    });
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(56,189,248,0.12)]">
      <div data-scroll-reveal className="mb-12">
        <TextScramble
          text="[05] // GET IN TOUCH"
          className="font-frama-meta text-xs md:text-sm tracking-wider text-[#38BDF8]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        {/* Left: Interactive Character-Level Hover Headline */}
        <div data-scroll-reveal className="lg:col-span-8">
          <InteractiveContactHeading lines={contactLines} />

          <p className="font-sans-body text-base sm:text-lg text-[#8FA4B2] max-w-xl mt-8 leading-relaxed">
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
            className="group flex items-center justify-between p-5 rounded-xl bg-[#111E24] border border-[rgba(56,189,248,0.12)] hover:border-[#38BDF8] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8FA4B2]">
                Telegram
              </p>
              <p className="font-frama-meta text-base text-[#F4F6F7] mt-1">
                @stylixXD
              </p>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#162630] border border-[rgba(56,189,248,0.15)] flex items-center justify-center text-[#8FA4B2] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
              ↗
            </span>
          </a>

          {/* Discord */}
          <div
            onClick={() => copyToClipboard('Itzboyashu', 'Discord ID copied', 'Itzboyashu')}
            className="group flex items-center justify-between p-5 rounded-xl bg-[#111E24] border border-[rgba(56,189,248,0.12)] hover:border-[#38BDF8] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8FA4B2]">
                Discord
              </p>
              <p className="font-frama-meta text-base text-[#F4F6F7] mt-1">
                Itzboyashu
              </p>
            </div>
            <CopyButton
              content="Itzboyashu"
              variant="outline"
              size="sm"
              className="bg-[#162630] border-[rgba(56,189,248,0.2)] text-[#8FA4B2] hover:text-[#38BDF8] hover:border-[#38BDF8]"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard('Itzboyashu', 'Discord ID copied', 'Itzboyashu');
              }}
              title="Copy Discord ID"
            />
          </div>

          {/* Email */}
          <div
            onClick={() => copyToClipboard('stylixXD@gmail.com', 'Email copied', 'stylixXD@gmail.com')}
            className="group flex items-center justify-between p-5 rounded-xl bg-[#111E24] border border-[rgba(56,189,248,0.12)] hover:border-[#38BDF8] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8FA4B2]">
                Direct Email
              </p>
              <p className="font-frama-meta text-base text-[#F4F6F7] mt-1">
                stylixXD@gmail.com
              </p>
            </div>
            <CopyButton
              content="stylixXD@gmail.com"
              variant="outline"
              size="sm"
              className="bg-[#162630] border-[rgba(56,189,248,0.2)] text-[#8FA4B2] hover:text-[#38BDF8] hover:border-[#38BDF8]"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard('stylixXD@gmail.com', 'Email copied', 'stylixXD@gmail.com');
              }}
              title="Copy Email"
            />
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/stylixXD"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-5 rounded-xl bg-[#111E24] border border-[rgba(56,189,248,0.12)] hover:border-[#38BDF8] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md"
          >
            <div>
              <p className="font-frama-meta text-xs text-[#8FA4B2]">
                GitHub
              </p>
              <p className="font-frama-meta text-base text-[#F4F6F7] mt-1">
                @stylixXD
              </p>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#162630] border border-[rgba(56,189,248,0.15)] flex items-center justify-center text-[#8FA4B2] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* SwipeToast integration */}
      {toast && (
        <SwipeToast
          key={toast.id}
          open={true}
          onClose={() => setToast(null)}
          title={toast.title}
          description={toast.desc}
          duration={2500}
          inline={false}
          closeButton={false}
          fuse="bottom"
          background="#111E24"
          color="#F4F6F7"
          fuseColor="#38BDF8"
        />
      )}

      {/* Editorial Footer Note */}
      <footer className="mt-28 pt-8 border-t border-[rgba(56,189,248,0.1)] flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-sans-body text-[#8FA4B2] space-y-4 sm:space-y-0">
        <p className="text-xs sm:text-sm">
          &copy; 2026 Ashu (Stylix).
        </p>
        <p className="font-frama-meta text-xs sm:text-sm text-[#8FA4B2]">
          Designed &amp; Built with Intention by Ashu.
        </p>
      </footer>
    </section>
  );
}
