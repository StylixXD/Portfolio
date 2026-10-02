import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'accent' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs';
}

export function buttonVariants({
  variant = 'default',
  size = 'default',
  className = '',
}: {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
} = {}) {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38BDF8] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none';

  const variants = {
    default: 'bg-[#38BDF8] text-[#0B1317] hover:bg-[#38BDF8]/90 font-bold',
    outline:
      'border border-[rgba(56,189,248,0.25)] bg-[#111E24] text-[#F4F6F7] hover:bg-[#162630] hover:border-[#38BDF8] hover:text-[#38BDF8]',
    ghost: 'hover:bg-[#162630] hover:text-[#38BDF8] text-[#8FA4B2]',
    secondary: 'bg-[#162630] text-[#F4F6F7] hover:bg-[#162630]/80',
    accent: 'bg-[#162630] text-[#38BDF8] hover:bg-[#38BDF8]/20',
    destructive: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30',
    link: 'text-[#38BDF8] underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-9 px-4 py-2',
    xs: 'h-7 px-2 text-xs',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-10 px-8 text-base',
    icon: 'h-9 w-9 p-0',
  };

  return cn(base, variants[variant || 'default'], sizes[size || 'default'], className);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
