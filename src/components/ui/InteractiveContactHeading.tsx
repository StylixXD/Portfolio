'use client';

import React, { useRef, useEffect } from 'react';

interface InteractiveContactHeadingProps {
  lines: { text: string; colorClass?: string }[];
}

export default function InteractiveContactHeading({ lines }: InteractiveContactHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLSpanElement>('.contact-interactive-char');

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const radius = 110; // Softer influence zone

        chars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const charX = rect.left + rect.width / 2;
          const charY = rect.top + rect.height / 2;

          const dx = charX - mouseX;
          const dy = charY - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            // Softer, floaty vertical drift and subtle scale
            const factor = Math.pow(1 - dist / radius, 1.4);
            const moveY = -factor * 12; // lifts upward towards light
            const moveX = (dx / radius) * factor * 6;
            const scale = 1 + factor * 0.1;
            const skew = (dx / radius) * factor * -4;

            char.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) scale(${scale.toFixed(2)}) skewX(${skew.toFixed(1)}deg)`;
            char.style.color = factor > 0.4 ? '#CEFF00' : '#F4F3EE';
            char.style.transition = 'transform 0.08s ease-out, color 0.12s ease-out';
          } else if (char.style.transform && char.style.transform !== 'translate3d(0px, 0px, 0px)') {
            char.style.transform = 'translate3d(0px, 0px, 0px) scale(1) skewX(0deg)';
            char.style.color = '';
            char.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease-out';
          }
        });
      });
    };

    const handlePointerLeave = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      chars.forEach((char) => {
        char.style.transform = 'translate3d(0px, 0px, 0px) scale(1) skewX(0deg)';
        char.style.color = '';
        char.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s ease-out';
      });
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <h2
      ref={containerRef}
      className="font-frama-black-italic text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight select-none cursor-default"
    >
      {lines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className={`block ${lineIdx > 0 ? 'mt-2' : ''} ${
            line.colorClass || 'text-[#F4F3EE]'
          }`}
        >
          {line.text.split(' ').map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
              {word.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="contact-interactive-char inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
