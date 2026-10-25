import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

interface SectionHeaderProps {
  icon?: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  eyebrow,
  title,
  subtitle,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className="max-w-2xl">
        <Badge variant="tech" className="mb-3 px-3 py-1">
          {icon}
          <span>{eyebrow}</span>
        </Badge>
        <h2 className="text-3xl font-extrabold tracking-tight text-ef-text sm:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm leading-relaxed text-ef-muted sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
