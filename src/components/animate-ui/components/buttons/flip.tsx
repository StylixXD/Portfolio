'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonProps } from '@/components/ui/button';

type FlipDirection = 'top' | 'bottom' | 'left' | 'right';

type FlipButtonContextType = {
  from: FlipDirection;
  isVertical: boolean;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
};

const FlipButtonContext = React.createContext<FlipButtonContextType>({
  from: 'top',
  isVertical: true,
  variant: 'default',
  size: 'default',
});

export interface FlipButtonProps extends HTMLMotionProps<'button'> {
  from?: FlipDirection;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  tapScale?: number;
}

export function FlipButton({
  from = 'top',
  variant,
  size,
  tapScale = 0.95,
  className,
  style,
  children,
  ...props
}: FlipButtonProps) {
  const isVertical = from === 'top' || from === 'bottom';

  return (
    <FlipButtonContext.Provider value={{ from, isVertical, variant, size }}>
      <motion.button
        data-slot="flip-button"
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: tapScale }}
        style={{
          display: 'inline-grid',
          placeItems: 'center',
          perspective: '1000px',
          ...style,
        }}
        className={cn('relative overflow-hidden cursor-pointer select-none rounded-lg focus:outline-none', className)}
        {...props}
      >
        {children}
      </motion.button>
    </FlipButtonContext.Provider>
  );
}

export interface FlipButtonFaceProps extends HTMLMotionProps<'span'> {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}

export function FlipButtonFront({
  variant,
  size,
  className,
  children,
  ...props
}: FlipButtonFaceProps) {
  const ctx = React.useContext(FlipButtonContext);
  const isVertical = ctx.isVertical;
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY';

  const frontVariants = {
    initial: {
      opacity: 1,
      [rotateAxis]: 0,
      ...(isVertical ? { y: '0%' } : { x: '0%' }),
    },
    hover: {
      opacity: 0,
      [rotateAxis]: ctx.from === 'top' || ctx.from === 'left' ? 90 : -90,
      ...(isVertical
        ? { y: ctx.from === 'top' ? '50%' : '-50%' }
        : { x: ctx.from === 'left' ? '50%' : '-50%' }),
    },
  };

  return (
    <motion.span
      data-slot="flip-button-front"
      variants={frontVariants}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      style={{
        gridArea: '1 / 1',
        backfaceVisibility: 'hidden',
      }}
      className={buttonVariants({
        variant: variant ?? ctx.variant,
        size: size ?? ctx.size,
        className,
      })}
      {...props}
    >
      {children}
    </motion.span>
  );
}

export function FlipButtonBack({
  variant,
  size,
  className,
  children,
  ...props
}: FlipButtonFaceProps) {
  const ctx = React.useContext(FlipButtonContext);
  const isVertical = ctx.isVertical;
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY';

  const backVariants = {
    initial: {
      opacity: 0,
      [rotateAxis]: ctx.from === 'top' || ctx.from === 'left' ? -90 : 90,
      ...(isVertical
        ? { y: ctx.from === 'top' ? '-50%' : '50%' }
        : { x: ctx.from === 'left' ? '-50%' : '50%' }),
    },
    hover: {
      opacity: 1,
      [rotateAxis]: 0,
      ...(isVertical ? { y: '0%' } : { x: '0%' }),
    },
  };

  return (
    <motion.span
      data-slot="flip-button-back"
      variants={backVariants}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      style={{
        gridArea: '1 / 1',
        backfaceVisibility: 'hidden',
      }}
      className={buttonVariants({
        variant: variant ?? ctx.variant,
        size: size ?? ctx.size,
        className,
      })}
      {...props}
    >
      {children}
    </motion.span>
  );
}
