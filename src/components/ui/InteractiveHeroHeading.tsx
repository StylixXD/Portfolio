'use client';

import React, { useRef, useEffect } from 'react';

interface InteractiveHeroHeadingProps {
  lines: { text: string; colorClass?: string }[];
}

export default function InteractiveHeroHeading({ lines }: InteractiveHeroHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLSpanElement>('.interactive-char');

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const radius = 130; // Radius of influence in pixels

        chars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const charX = rect.left + rect.width / 2;
          const charY = rect.top + rect.height / 2;

          const dx = charX - mouseX;
          const dy = charY - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            const factor = Math.pow(1 - dist / radius, 1.6);
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * factor * 14;
            const moveY = Math.sin(angle) * factor * 14;
            const scale = 1 + factor * 0.16;
            const rotate = (dx / radius) * factor * 12;

            char.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) scale(${scale.toFixed(2)}) rotate(${rotate.toFixed(1)}deg)`;
            char.style.transition = 'transform 0.08s ease-out';
          } else if (char.style.transform && char.style.transform !== 'translate3d(0px, 0px, 0px)') {
            char.style.transform = 'translate3d(0px, 0px, 0px)';
            char.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
          }
        });
      });
    };

    const handlePointerLeave = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      chars.forEach((char) => {
        char.style.transform = 'translate3d(0px, 0px, 0px)';
        char.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    };

    // Mobile / Touch Wave Trigger
    const handleTouchStart = () => {
      chars.forEach((char, idx) => {
        setTimeout(() => {
          char.style.transform = 'translate3d(0px, -8px, 0px) scale(1.1) rotate(2deg)';
          char.style.transition = 'transform 0.2s ease-out';
          setTimeout(() => {
            char.style.transform = 'translate3d(0px, 0px, 0px)';
            char.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          }, 220);
        }, idx * 18);
      });
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <h1
      ref={containerRef}
      className="font-frama-black-italic text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.92] tracking-tighter uppercase select-none cursor-default py-4"
    >
      {lines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className={`block ${lineIdx > 0 ? 'mt-2 md:mt-4' : ''} ${
            line.colorClass || 'text-[#F4F3EE]'
          }`}
        >
          {line.text.split(' ').map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
              {word.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="interactive-char inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
