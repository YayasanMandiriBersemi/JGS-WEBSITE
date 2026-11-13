'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

/** Shared luxury easing curve (Linear / Stripe-style expo-out). */
export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================================================
// 1. <ScrollReveal>, fade + rise on first intersection (optional stagger)
// ============================================================================

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  as?: 'div' | 'section' | 'article' | 'li';
}

export function MotionReveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  as = 'div',
}: MotionRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, ease: LUXURY_EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Alias matching the spec name `<ScrollReveal>` (the legacy CSS-only version lives in ui/ScrollReveal.tsx). */
export const ScrollReveal = MotionReveal;

/** Staggered grid container: wrap children in <MotionStaggerItem>. */
export function MotionStagger({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: LUXURY_EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 2. <SpotlightCard>, cursor-tracking radial gold glow + subtle hover lift
// ============================================================================

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Spotlight radius in px. */
  radius?: number;
}

export function SpotlightCard({ children, className = '', radius = 500 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
    node.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => updatePointer(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) updatePointer(t.clientX, t.clientY);
      }}
      className={`jgs-spotlight group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D6A937]/40 hover:shadow-[0_18px_50px_-24px_rgba(214,169,55,0.35)] ${className}`}
      style={{ ['--spot-radius' as string]: `${radius}px` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(var(--spot-radius) circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214,169,55,0.12), transparent 40%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

// ============================================================================
// 3. <Tilt3DCard>, perspective mouse tilt (max 8deg) + moving specular glare
// ============================================================================

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function Tilt3DCard({ children, className = '', maxTilt = 8 }: Tilt3DCardProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 180, damping: 18, mass: 0.4 });

  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const glareX = useTransform(springX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(springY, [0, 1], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,236,170,0.28), rgba(214,169,55,0.08) 30%, transparent 60%)`;

  function handleMove(clientX: number, clientY: number, el: HTMLDivElement) {
    const rect = el.getBoundingClientRect();
    px.set((clientX - rect.left) / rect.width);
    py.set((clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <motion.div
        onMouseMove={(e) => handleMove(e.clientX, e.clientY, e.currentTarget)}
        onMouseLeave={reset}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) handleMove(t.clientX, t.clientY, e.currentTarget);
        }}
        onTouchEnd={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative will-change-transform"
      >
        {children}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
            style={{ background: glare }}
          />
        )}
      </motion.div>
    </div>
  );
}

// ============================================================================
// 4. <AnimatedNumber>, smooth interpolation when the value changes
// ============================================================================

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  /** Locale used for thousands separators. */
  locale?: 'id' | 'en';
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  decimals = 0,
  locale = 'id',
  prefix = '',
  suffix = '',
  className = '',
  duration = 0.6,
}: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const controls = animate(fromRef.current, value, {
      duration,
      ease: LUXURY_EASE,
      onUpdate: (latest) => setDisplay(latest),
    });
    fromRef.current = value;
    return () => controls.stop();
  }, [value, duration, reduce]);

  const formatted = display.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ============================================================================
// 5. useInViewOnce, tiny helper for components that start animations on view
// ============================================================================

export function useInViewOnce<T extends Element>() {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  return { ref, inView };
}

// ============================================================================
// 6. <GoldConfettiBurst>, lightweight celebratory gold/emerald burst
// ============================================================================

const CONFETTI_PARTICLES = [
  { x: -120, y: -110, r: -45, c: '#D6A937', s: 1.0 },
  { x: -85, y: -140, r: 30, c: '#F3E5AB', s: 0.9 },
  { x: -45, y: -155, r: 75, c: '#10B981', s: 1.1 },
  { x: -15, y: -130, r: -60, c: '#D6A937', s: 0.85 },
  { x: 20, y: -150, r: 50, c: '#F3E5AB', s: 1.05 },
  { x: 55, y: -145, r: -35, c: '#10B981', s: 0.95 },
  { x: 95, y: -125, r: 80, c: '#D6A937', s: 1.0 },
  { x: 130, y: -95, r: -70, c: '#F3E5AB', s: 0.8 },
  { x: -105, y: -60, r: 40, c: '#10B981', s: 0.75 },
  { x: 110, y: -65, r: -55, c: '#D6A937', s: 0.85 },
  { x: -60, y: -90, r: 110, c: '#D6A937', s: 0.9 },
  { x: 65, y: -85, r: -100, c: '#F3E5AB', s: 0.9 },
];

export function GoldConfettiBurst({
  triggerKey,
  className = '',
}: {
  /** Increment or change this value whenever a celebratory burst should fire. */
  triggerKey: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (triggerKey <= 0 || reduce) return null;

  return (
    <div
      key={triggerKey}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-1/2 z-50 flex justify-center overflow-visible ${className}`}
    >
      {CONFETTI_PARTICLES.map((p, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: p.s, rotate: p.r * 3 }}
          transition={{ duration: 1.05, ease: LUXURY_EASE }}
          style={{ backgroundColor: p.c }}
          className="absolute h-2.5 w-2.5 rounded-sm shadow-sm"
        />
      ))}
    </div>
  );
}
