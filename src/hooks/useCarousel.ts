import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

function isInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    target.closest(
      'button, input, textarea, select, [role="button"], a:not([data-carousel-swipe])'
    ) !== null
  );
}

export function useCarousel(totalItems: number, itemsPerPage: number) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const didSwipeRef = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, totalPages - 1));
  }, [totalPages]);

  const next = useCallback(() => {
    setCurrentIndex((index) => (index < totalPages - 1 ? index + 1 : 0));
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentIndex((index) => (index > 0 ? index - 1 : totalPages - 1));
  }, [totalPages]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalPages - 1)));
    },
    [totalPages]
  );

  const startDrag = (clientX: number) => {
    draggingRef.current = true;
    didSwipeRef.current = false;
    setIsDragging(true);
    setDragOffset(0);
    startX.current = clientX;
    currentX.current = clientX;
  };

  const moveDrag = (clientX: number) => {
    if (!draggingRef.current) return;
    currentX.current = clientX;
    setDragOffset(clientX - startX.current);
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);

    const diff = startX.current - currentX.current;
    if (Math.abs(diff) > 40) {
      didSwipeRef.current = true;
      if (diff > 0) next();
      else prev();
    }
    setDragOffset(0);
  };

  const handleClickCapture = (event: MouseEvent) => {
    if (!didSwipeRef.current) return;
    didSwipeRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const containerProps = {
    onClickCapture: handleClickCapture,
    onTouchStart: (event: TouchEvent) => {
      if (isInteractiveTarget(event.target)) return;
      startDrag(event.touches[0].clientX);
    },
    onTouchMove: (event: TouchEvent) => {
      moveDrag(event.touches[0].clientX);
    },
    onTouchEnd: endDrag,
    onTouchCancel: endDrag,
    onMouseDown: (event: MouseEvent) => {
      if (isInteractiveTarget(event.target)) return;
      event.preventDefault();
      startDrag(event.clientX);
    },
    onMouseMove: (event: MouseEvent) => {
      moveDrag(event.clientX);
    },
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
  };

  return {
    currentIndex,
    totalPages,
    dragOffset,
    isDragging,
    next,
    prev,
    goTo,
    containerProps,
  };
}
