'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  characters?: string;
  speed?: number;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
  as?: React.ElementType;
}

const DEFAULT_CHARS = '0123456789_#$!%&*?@+-=/\\<>[]';

export default function TextScramble({
  text,
  className = '',
  characters = DEFAULT_CHARS,
  speed = 35,
  triggerOnHover = true,
  triggerOnView = true,
  as: Component = 'span',
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimatedOnView = useRef(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 2;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < iteration / 2) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1;
    }, speed);

    return () => clearInterval(interval);
  }, [text, characters, speed, isScrambling]);

  useEffect(() => {
    if (!triggerOnView || hasAnimatedOnView.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedOnView.current) {
          hasAnimatedOnView.current = true;
          scramble();
        }
      },
      { threshold: 0.2 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [triggerOnView, scramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScrambling) {
      scramble();
    }
  };

  return (
    <Component
      ref={elementRef as unknown as React.Ref<any>}
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none cursor-default font-mono transition-colors ${className}`}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
}
