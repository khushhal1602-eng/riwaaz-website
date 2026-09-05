import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

export default function ImageReveal({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-4/5',
  priority = false,
  badge = null,
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Track progress from when container starts entering bottom of viewport to when it leaves top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.18,
  });

  // Scroll-linked transforms:
  // As element enters: scale gradually settles from 1.08 to 1.00, Y moves from 35px to -25px
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.08, 1.02, 0.98]);
  const y = useTransform(smoothProgress, [0, 1], ['35px', '-25px']);
  const opacity = useTransform(smoothProgress, [0, 0.25], [0.65, 1]);

  // Dynamic clip-path uncover linked directly to entrance scroll progress
  const clipInset = useTransform(smoothProgress, [0, 0.28], ['8%', '0%']);

  if (shouldReduceMotion) {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} bg-secondary ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover"
        />
        {badge && (
          <div className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm px-3 py-1.5 text-[0.62rem] tracking-widest uppercase text-maroon font-sans border border-border/60 shadow-sm z-10">
            {badge}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectRatio} bg-secondary ${className}`}
    >
      <motion.div
        style={{
          clipPath: useTransform(clipInset, (v) => `inset(${v} 0 0 0)`),
        }}
        className="h-full w-full will-change-transform"
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{ y, scale, opacity }}
          className="h-full w-full object-cover origin-center will-change-transform"
        />
      </motion.div>

      {badge && (
        <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-md px-3.5 py-1.5 text-[0.62rem] tracking-widest uppercase text-maroon font-sans border border-border/70 shadow-sm z-10">
          {badge}
        </div>
      )}
    </div>
  );
}
