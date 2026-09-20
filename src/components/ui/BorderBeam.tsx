'use client';

import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export default function BorderBeam({
  className = '',
  size = 250,
  duration = 12,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = '#CEFF00',
  colorTo = '#FFFFFF',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--anchor': `${anchor}%`,
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute aspect-square w-[var(--size)] animate-border-beam [animation-delay:var(--delay)] [animation-duration:var(--duration)] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] [offset-anchor:var(--anchor)_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)))]"
      />
    </div>
  );
}
