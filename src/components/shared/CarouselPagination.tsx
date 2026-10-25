import React from 'react';
import { cn } from '../../lib/utils';

interface CarouselPaginationProps {
  currentIndex: number;
  totalPages: number;
  onSelect: (index: number) => void;
}

const MAX_DOTS = 7;

export const CarouselPagination: React.FC<CarouselPaginationProps> = ({
  currentIndex,
  totalPages,
  onSelect,
}) => {
  if (totalPages <= 1) return null;

  const showWindow = totalPages > MAX_DOTS;
  const start = showWindow
    ? Math.min(Math.max(currentIndex - Math.floor(MAX_DOTS / 2), 0), totalPages - MAX_DOTS)
    : 0;
  const pages = showWindow
    ? Array.from({ length: MAX_DOTS }, (_, index) => start + index)
    : Array.from({ length: totalPages }, (_, index) => index);

  return (
    <div className="mt-8 flex flex-col items-center gap-2.5">
      {showWindow && (
        <div className="flex items-center gap-3 font-mono text-xs text-ef-muted">
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <div className="h-1 w-28 overflow-hidden rounded-full bg-ef-border">
            <div
              className="h-full rounded-full bg-ef-accent transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalPages) * 100}%` }}
            />
          </div>
          <span>{String(totalPages).padStart(2, '0')}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {pages.map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Page ${index + 1}`}
            aria-current={currentIndex === index}
            className={cn(
              'h-2.5 rounded-full transition-all',
              currentIndex === index
                ? 'w-8 bg-ef-accent'
                : 'w-2.5 bg-ef-border hover:bg-ef-muted'
            )}
          />
        ))}
      </div>
    </div>
  );
};
