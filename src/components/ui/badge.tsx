import * as React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'default' | 'outline' | 'tech' | 'muted';

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'border-ef-accent/30 bg-ef-accent/15 text-ef-accent-text hover:bg-ef-accent/25',
  outline:
    'border-ef-border bg-transparent text-ef-muted hover:text-ef-text',
  tech:
    'border-ef-border bg-ef-bg font-mono text-ef-accent-text hover:border-ef-accent/60',
  muted:
    'border-ef-border bg-ef-surface-hover text-ef-muted',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
