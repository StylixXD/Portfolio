'use client';

import React from 'react';
import Image from 'next/image';

interface CircularBadgeProps {
  size?: number;
}

export default function CircularBadge({ size = 56 }: CircularBadgeProps) {
  return (
    <div
      className="group relative flex items-center justify-center select-none flex-shrink-0 cursor-pointer"
      style={{ width: size, height: size }}
    >
      {/* Editorial Dual-Ring Avatar Frame */}
      <div
        className="w-full h-full rounded-full overflow-hidden border-2 border-[rgba(244,243,238,0.18)] bg-[#18181B] shadow-xl flex items-center justify-center ring-1 ring-white/[0.08] ring-offset-2 ring-offset-[#111113] group-hover:border-[#CEFF00]/60 group-hover:scale-105 transition-all duration-300"
      >
        <Image
          src="/images/processed/pfp-clean.png"
          alt="Ashu Avatar"
          width={64}
          height={64}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Active status pip with subtle breathing aura */}
      <span
        className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#CEFF00] border-2 border-[#111113] shadow-[0_0_8px_rgba(206,255,0,0.6)]"
        title="Active / Available"
      />
    </div>
  );
}
