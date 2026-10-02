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
      title="Ashu (@stylixXD)"
    >
      {/* Editorial Dual-Ring Avatar Frame */}
      <div
        className="w-full h-full rounded-full overflow-hidden border-2 border-[rgba(56,189,248,0.3)] bg-[#111E24] shadow-md flex items-center justify-center ring-1 ring-[#38BDF8]/20 ring-offset-2 ring-offset-[#0B1317] group-hover:border-[#38BDF8] group-hover:ring-[#38BDF8]/50 group-hover:scale-105 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <Image
          src="/images/processed/avatar-v2.png"
          alt="Ashu Avatar"
          width={64}
          height={64}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          priority
          unoptimized
        />
      </div>

      {/* Active status indicator pip */}
      <span
        className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#38BDF8] border-2 border-[#0B1317] shadow-sm animate-pulse"
        title="Active / Available"
      />
    </div>
  );
}
