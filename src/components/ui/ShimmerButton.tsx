'use client';

import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shimmerColor?: string;
  className?: string;
}

export default function ShimmerButton({
  children,
  shimmerColor = '#CEFF00',
  className = '',
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[rgba(244,243,238,0.15)] bg-[#141417] px-6 py-2.5 transition-all duration-300 hover:border-[#CEFF00] hover:shadow-[0_0_25px_rgba(206,255,0,0.25)] focus:outline-none cursor-pointer ${className}`}
      {...props}
    >
      {/* Moving Shimmer Beam */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(206,255,0,0.2)] to-transparent group-hover:animate-shimmer-sweep"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center space-x-2">{children}</span>
    </button>
  );
}
