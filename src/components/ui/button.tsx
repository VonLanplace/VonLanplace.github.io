import * as React from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-ef-accent text-ef-accent-ink font-bold shadow-lg shadow-ef-accent/20 hover:brightness-105 active:scale-[0.98]',
  outline:
    'border border-ef-border bg-ef-surface text-ef-text hover:bg-ef-surface-hover hover:border-ef-accent/60 shadow-xs active:scale-[0.98]',
  secondary:
    'bg-ef-surface-hover text-ef-text hover:bg-ef-surface border border-ef-border shadow-xs active:scale-[0.98]',
  ghost:
    'text-ef-muted hover:bg-ef-surface hover:text-ef-text',
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'h-11 px-5 py-2.5 rounded-xl text-sm',
  sm: 'h-9 px-3.5 py-1.5 rounded-lg text-xs',
  lg: 'h-12 px-7 py-3 rounded-2xl text-base',
  icon: 'h-10 w-10 rounded-xl p-0',
};

interface ButtonVariantOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: ButtonVariantOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ef-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
);

Button.displayName = 'Button';
