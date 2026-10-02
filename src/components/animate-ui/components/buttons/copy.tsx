'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonProps } from '@/components/ui/button';

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  delay?: number;
  copied?: boolean;
  onCopiedChange?: (copied: boolean, content?: string) => void;
}

export function CopyButton({
  content,
  variant = 'outline',
  size = 'default',
  delay = 2500,
  copied: controlledCopied,
  onCopiedChange,
  className,
  onClick,
  ...props
}: CopyButtonProps) {
  const [copiedInternal, setCopiedInternal] = React.useState(false);
  const isCopied = controlledCopied !== undefined ? controlledCopied : copiedInternal;

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (isCopied) return;
    if (content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          setCopiedInternal(true);
          onCopiedChange?.(true, content);
          setTimeout(() => {
            setCopiedInternal(false);
            onCopiedChange?.(false);
          }, delay);
        })
        .catch((err) => {
          console.error('Failed to copy', err);
        });
    }
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <button
      data-slot="copy-button"
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleCopy}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isCopied ? 'check' : 'copy'}
          data-slot="copy-button-icon"
          initial={{ scale: 0, opacity: 0.4, filter: 'blur(4px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0, opacity: 0.4, filter: 'blur(4px)' }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center justify-center"
        >
          <Icon className={cn('size-4', isCopied && 'text-[#38BDF8]')} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
