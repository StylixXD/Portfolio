'use client';

import React from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  characters?: string;
  speed?: number;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
  as?: React.ElementType;
}

export default function TextScramble({
  text,
  className = '',
  as: Component = 'span',
}: TextScrambleProps) {
  return (
    <Component
      className={`inline-block select-none cursor-default font-mono transition-colors ${className}`}
      aria-label={text}
    >
      {text}
    </Component>
  );
}
