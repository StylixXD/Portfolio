'use client';

import * as React from 'react';
import { motion, useMotionValue, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export type CursorContextType = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  active: boolean;
  global: boolean;
  enabled: boolean;
  toggleCursor: () => void;
  setEnabled: (v: boolean) => void;
};

const CursorContext = React.createContext<CursorContextType | null>(null);

export function useCursor() {
  const context = React.useContext(CursorContext);
  if (!context) throw new Error('useCursor must be used within CursorProvider');
  return context;
}

export type CursorProviderProps = {
  children: React.ReactNode;
  global?: boolean;
  defaultEnabled?: boolean;
};

export function CursorProvider({
  children,
  global = false,
  defaultEnabled = true,
}: CursorProviderProps) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [active, setActive] = React.useState(false);
  const [enabled, setEnabled] = React.useState(defaultEnabled);

  const toggleCursor = React.useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const id = '__cursor_none_style__';
    let style = document.getElementById(id) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = id;
      document.head.appendChild(style);
    }

    if (enabled && active) {
      style.textContent = `
        .animate-ui-cursor-none, .animate-ui-cursor-none * { cursor: none !important; }
      `;
      if (global) document.documentElement.classList.add('animate-ui-cursor-none');
    } else {
      style.textContent = '';
      document.documentElement.classList.remove('animate-ui-cursor-none');
    }

    return () => {
      document.documentElement.classList.remove('animate-ui-cursor-none');
    };
  }, [enabled, active, global]);

  React.useEffect(() => {
    // Disable on touch devices
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    ) {
      setEnabled(false);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!active) setActive(true);
    };

    const handlePointerOut = (e: PointerEvent | MouseEvent) => {
      if (e instanceof PointerEvent && e.relatedTarget === null) {
        setActive(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') setActive(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('mouseout', handlePointerOut, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('mouseout', handlePointerOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mouseX, mouseY, active]);

  return (
    <CursorContext.Provider
      value={{
        mouseX,
        mouseY,
        active,
        global,
        enabled,
        toggleCursor,
        setEnabled,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export type CursorProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function Cursor({ className, style }: CursorProps) {
  const { mouseX, mouseY, active, enabled } = useCursor();

  if (!enabled || !active) return null;

  return (
    <motion.div
      data-slot="cursor"
      style={{
        pointerEvents: 'none',
        zIndex: 99999,
        position: 'fixed',
        left: 0,
        top: 0,
        x: mouseX,
        y: mouseY,
        translateX: -2,
        translateY: -2,
        willChange: 'transform',
        ...style,
      }}
    >
      <svg
        className={cn('size-6 text-[#38BDF8] drop-shadow-[0_2px_8px_rgba(56,189,248,0.45)]', className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
      >
        <path
          fill="currentColor"
          d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
        />
      </svg>
    </motion.div>
  );
}

export type CursorFollowProps = {
  className?: string;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
};

export function CursorFollow({
  className,
  children,
  sideOffset = 15,
  alignOffset = 5,
}: CursorFollowProps) {
  const { mouseX, mouseY, active, enabled } = useCursor();
  if (!enabled || !active) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: mouseX,
        y: mouseY,
        translateX: alignOffset,
        translateY: sideOffset,
        pointerEvents: 'none',
        zIndex: 99998,
      }}
      className={cn('bg-[#111E24] text-[#38BDF8] border border-[#38BDF8]/30 rounded-md px-2 py-1 text-xs font-mono shadow-lg', className)}
    >
      {children}
    </motion.div>
  );
}
