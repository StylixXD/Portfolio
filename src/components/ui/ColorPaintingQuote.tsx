'use client';

import React, { useRef, useEffect } from 'react';

interface ColorPaintingQuoteProps {
  quote: string;
}

export default function ColorPaintingQuote({ quote }: ColorPaintingQuoteProps) {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLSpanElement>('.paint-char');

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const radius = 90; // Proximity painting zone

        chars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const charX = rect.left + rect.width / 2;
          const charY = rect.top + rect.height / 2;

          const dx = charX - mouseX;
          const dy = charY - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            const factor = 1 - dist / radius;
            // Transition between ivory (#F4F3EE) and electric lime (#CEFF00)
            if (factor > 0.6) {
              char.style.color = '#CEFF00';
              char.style.transform = 'translateY(-2px)';
            } else if (factor > 0.25) {
              char.style.color = '#DFFF4F';
              char.style.transform = 'translateY(-1px)';
            } else {
              char.style.color = '#EAFFAA';
              char.style.transform = 'translateY(0px)';
            }
            char.style.transition = 'color 0.08s ease-out, transform 0.08s ease-out';
          } else if (char.style.color && char.style.color !== '') {
            char.style.color = '';
            char.style.transform = '';
            char.style.transition = 'color 0.5s ease-out, transform 0.4s ease-out';
          }
        });
      });
    };

    const handlePointerLeave = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      chars.forEach((char) => {
        char.style.color = '';
        char.style.transform = '';
        char.style.transition = 'color 0.6s ease-out, transform 0.5s ease-out';
      });
    };

    // Mobile touch sweep
    const handleTouch = () => {
      chars.forEach((char, i) => {
        setTimeout(() => {
          char.style.color = '#CEFF00';
          char.style.transform = 'translateY(-2px)';
          setTimeout(() => {
            char.style.color = '';
            char.style.transform = '';
          }, 350);
        }, i * 20);
      });
    };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    el.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      el.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <blockquote
      ref={quoteRef}
      className="font-frama-black-italic text-2xl sm:text-3xl lg:text-4xl text-[#F4F3EE] uppercase leading-[1.05] tracking-tight select-none cursor-default py-2"
    >
      &ldquo;
      {quote.split(' ').map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              className="paint-char inline-block will-change-[color,transform]"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
      &rdquo;
    </blockquote>
  );
}
