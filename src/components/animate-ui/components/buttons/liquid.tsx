'use client';

import React, { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface LiquidButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
}

export function LiquidButton({
  children,
  className,
  onClick,
  ...props
}: LiquidButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn(
        'group relative isolate overflow-hidden rounded-full px-7 py-3.5 font-frama-meta text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 focus:outline-none cursor-pointer border border-[#38BDF8]/40 bg-[#38BDF8] text-[#0B1317] shadow-[0_0_20px_rgba(56,189,248,0.25)]',
        className
      )}
      {...props}
    >
      {/* Liquid fluid background ripple layers */}
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: hovered ? '0%' : '100%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10 rounded-full bg-[#F4F6F7]"
      />
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: hovered ? 1.5 : 0,
          opacity: hovered ? 0.35 : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute -inset-2 -z-20 rounded-full bg-[#38BDF8] blur-md"
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center space-x-3 text-[#0B1317] group-hover:text-[#0B1317] transition-colors duration-200">
        {children}
      </span>
    </motion.button>
  );
}
