'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  immediate?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  immediate = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);

    // Fallback safety timer so elements below viewport never stay stuck invisible
    const safety = setTimeout(() => setVisible(true), 1800);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [immediate]);

  return (
    <div
      ref={ref}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`jgs-reveal ${visible ? 'jgs-reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
