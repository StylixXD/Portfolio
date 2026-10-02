'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type TooltipContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  followCursor?: boolean | 'x' | 'y';
  coords: { x: number; y: number };
};

const TooltipContext = React.createContext<TooltipContextType | null>(null);

export interface TooltipProps {
  children: React.ReactNode;
  followCursor?: boolean | 'x' | 'y';
  delayDuration?: number;
}

export function Tooltip({
  children,
  followCursor = false,
  delayDuration = 100,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <TooltipContext.Provider
      value={{
        open,
        setOpen: (val: boolean) => {
          if (timerRef.current) clearTimeout(timerRef.current);
          if (val) {
            timerRef.current = setTimeout(() => setOpen(true), delayDuration);
          } else {
            setOpen(false);
          }
        },
        followCursor,
        coords,
      }}
    >
      <div
        className="relative inline-block"
        onMouseMove={(e) => {
          if (followCursor) {
            const rect = e.currentTarget.getBoundingClientRect();
            setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
        }}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export function TooltipTrigger({ children, className }: TooltipTriggerProps) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) throw new Error('TooltipTrigger must be used within Tooltip');

  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      onMouseEnter={() => ctx.setOpen(true)}
      onMouseLeave={() => ctx.setOpen(false)}
      onFocus={() => ctx.setOpen(true)}
      onBlur={() => ctx.setOpen(false)}
    >
      {children}
    </div>
  );
}

export interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
}

export function TooltipContent({
  children,
  className,
  side = 'top',
  sideOffset = 6,
  align = 'center',
  alignOffset = 0,
}: TooltipContentProps) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) throw new Error('TooltipContent must be used within Tooltip');

  const sideClasses = {
    top: 'bottom-full mb-1.5',
    bottom: 'top-full mt-1.5',
    left: 'right-full mr-1.5',
    right: 'left-full ml-1.5',
  };

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={
            ctx.followCursor
              ? {
                  position: 'absolute',
                  top: ctx.coords.y + sideOffset,
                  left: ctx.coords.x + alignOffset,
                  pointerEvents: 'none',
                }
              : undefined
          }
          className={cn(
            'absolute z-50 whitespace-nowrap rounded-md bg-[#162630] border border-[rgba(56,189,248,0.25)] px-2.5 py-1 text-xs font-mono text-[#F4F6F7] shadow-xl pointer-events-none',
            !ctx.followCursor && sideClasses[side],
            !ctx.followCursor && alignClasses[align],
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
