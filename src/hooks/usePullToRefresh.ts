import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => void | Promise<void>;
  threshold?: number;
  resistance?: number;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
}: UsePullToRefreshOptions) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const scrollableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Only allow pull-to-refresh when scrolled to the top
      const scrollable = scrollableRef.current || document.documentElement;
      if (scrollable.scrollTop === 0 && !isRefreshing) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isRefreshing) return;

      const scrollable = scrollableRef.current || document.documentElement;
      if (scrollable.scrollTop > 0) return;

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY.current;

      if (deltaY > 0) {
        // Apply resistance to make the pull feel natural
        const distance = Math.min(deltaY / resistance, threshold * 1.5);
        setPullDistance(distance);
        
        // Prevent default scrolling when pulling down
        if (distance > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        setPullDistance(0);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, resistance, pullDistance, isRefreshing]);

  return {
    pullDistance,
    isRefreshing,
    setScrollableRef: (ref: HTMLElement | null) => {
      scrollableRef.current = ref;
    },
  };
}
