"use client";

import React, { useEffect, useState, useRef } from "react";

export const Cursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "lock" | "open" | "rotate" | "descend">("default");
  const [isTouch, setIsTouch] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor hints
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='lock']") || target.closest("canvas")) {
        // Can be lock or rotate
        if (target.closest("[data-cursor='lock']")) {
          setCursorState("lock");
        } else {
          setCursorState("default");
        }
      } else if (target.closest("a") || target.closest("button") || target.closest("[data-cursor='open']")) {
        setCursorState("open");
      } else if (target.closest("[data-cursor='rotate']")) {
        setCursorState("rotate");
      } else if (target.closest("[data-cursor='descend']")) {
        setCursorState("descend");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let frameId: number;
    const updateCursor = () => {
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.2;
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.targetX}px, ${pos.current.targetY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      frameId = requestAnimationFrame(updateCursor);
    };

    frameId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Precision inner center crosshair dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00F0FF] rounded-full"
      />

      {/* Outer interactive ring & tactical badge */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,border-color] duration-150 ease-out ${
          cursorState !== "default"
            ? "w-14 h-14 border border-[#00F0FF] bg-[#00F0FF]/10 rounded-full"
            : "w-8 h-8 border border-white/30 rounded-full"
        }`}
      >
        {cursorState !== "default" && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#00F0FF] font-bold bg-[#010204]/90 px-1 py-0.5 border border-[#00F0FF]/40 rounded -mt-9">
            [{cursorState.toUpperCase()}]
          </span>
        )}
      </div>
    </div>
  );
};
