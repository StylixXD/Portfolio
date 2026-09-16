'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AliveSectionHeadingProps {
  text: string;
  variant?: 'slide-left' | 'stagger-chars' | 'tracking-expand';
  className?: string;
}

export default function AliveSectionHeading({
  text,
  variant = 'slide-left',
  className = '',
}: AliveSectionHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    // Micro-proximity hover effect on letters
    const chars = el.querySelectorAll<HTMLSpanElement>('.alive-char');
    const handlePointerMove = (e: PointerEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const dist = Math.hypot(rect.left + rect.width / 2 - mouseX, rect.top + rect.height / 2 - mouseY);
        if (dist < 80) {
          const factor = 1 - dist / 80;
          char.style.transform = `translateY(${-factor * 6}px) scale(${1 + factor * 0.08})`;
          char.style.color = '#CEFF00';
          char.style.transition = 'transform 0.08s ease-out, color 0.1s ease-out';
        } else if (char.style.transform && char.style.transform !== '') {
          char.style.transform = '';
          char.style.color = '';
          char.style.transition = 'transform 0.4s ease-out, color 0.3s ease-out';
        }
      });
    };

    const handlePointerLeave = () => {
      chars.forEach((char) => {
        char.style.transform = '';
        char.style.color = '';
        char.style.transition = 'transform 0.4s ease-out, color 0.3s ease-out';
      });
    };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <h2
      ref={headingRef}
      className={`font-frama-black-italic uppercase tracking-tight select-none cursor-default py-1 ${className}`}
    >
      {text.split(' ').map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIdx) => {
            const globalCharIdx = wordIdx * 10 + charIdx;
            return (
              <span
                key={charIdx}
                className="alive-char inline-block will-change-transform"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView
                    ? 'translate3d(0, 0, 0)'
                    : variant === 'slide-left'
                    ? 'translate3d(-24px, 0, 0)'
                    : variant === 'stagger-chars'
                    ? 'translate3d(0, 24px, 0)'
                    : 'translate3d(0, 0, 0) scale(0.95)',
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${globalCharIdx * 0.025}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${globalCharIdx * 0.025}s`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}
