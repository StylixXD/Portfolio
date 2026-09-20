'use client';

import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  borderColor?: string;
  radius?: number;
  className?: string;
}

export default function SpotlightCard({
  children,
  spotlightColor = 'rgba(206, 255, 0, 0.08)',
  borderColor = 'rgba(206, 255, 0, 0.35)',
  radius = 500,
  className = '',
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCoords({ x: -1000, y: -1000 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* Dynamic Border Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          border: '1px solid transparent',
          WebkitMask: `radial-gradient(${radius * 0.75}px circle at ${coords.x}px ${coords.y}px, black, transparent 70%)`,
          mask: `radial-gradient(${radius * 0.75}px circle at ${coords.x}px ${coords.y}px, black, transparent 70%)`,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-0 h-full w-full">{children}</div>
    </div>
  );
}
