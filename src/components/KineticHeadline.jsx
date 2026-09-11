import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * KineticHeadline splits text into lines or words and reveals them
 * through a scroll-progress linked clip-path and vertical slide.
 * Bidirectional and smooth at 60 FPS.
 */
export default function KineticHeadline({
  text,
  as: Component = 'h2',
  className = '',
  eyebrow = null,
  eyebrowClassName = '',
  highlightWords = [],
  highlightClassName = 'text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold italic font-normal',
  splitBy = 'words', // 'words' | 'lines'
  align = 'left', // 'left' | 'center' | 'right'
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.3'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.15,
  });

  const tokens = splitBy === 'lines' ? text.split('\n') : text.split(' ');

  const checkHighlighted = (token) => {
    if (!highlightWords || highlightWords.length === 0) return false;
    const cleanToken = token.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return highlightWords.some(
      (hw) => hw.toLowerCase() === token.toLowerCase() || hw.toLowerCase() === cleanToken
    );
  };

  if (shouldReduceMotion) {
    return (
      <div className={align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}>
        {eyebrow && (
          typeof eyebrow === 'string' ? (
            <span className={`block eyebrow mb-3 ${eyebrowClassName || 'text-maroon'}`}>{eyebrow}</span>
          ) : (
            <div className={`mb-3 ${align === 'center' ? 'flex justify-center' : align === 'right' ? 'flex justify-end' : 'flex justify-start'}`}>
              {eyebrow}
            </div>
          )
        )}
        <Component className={className}>
          {tokens.map((token, i) => (
            <span
              key={i}
              className={`inline-block mr-[0.28em] ${checkHighlighted(token) ? highlightClassName : ''}`}
            >
              {token}
            </span>
          ))}
        </Component>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
      {eyebrow && (
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.4], [0, 1]),
            y: useTransform(smoothProgress, [0, 0.4], [20, 0]),
          }}
          className={`mb-4 will-change-transform ${align === 'center' ? 'flex justify-center' : align === 'right' ? 'flex justify-end' : 'flex justify-start'}`}
        >
          {typeof eyebrow === 'string' ? (
            <p className={`eyebrow ${eyebrowClassName || 'text-maroon'}`}>
              {eyebrow}
            </p>
          ) : (
            eyebrow
          )}
        </motion.div>
      )}

      <Component className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'} ${className}`}>
        {tokens.map((token, i) => {
          const start = (i / tokens.length) * 0.5;
          const end = Math.min(start + 0.5, 1);

          // Scroll-driven transforms
          const y = useTransform(smoothProgress, [start, end], ['105%', '0%']);
          const opacity = useTransform(smoothProgress, [start, end], [0, 1]);
          const scale = useTransform(smoothProgress, [start, end], [0.94, 1]);
          const isHighlighted = checkHighlighted(token);

          return (
            <span key={i} className="inline-block overflow-hidden py-0.5">
              <motion.span
                style={{ y, opacity, scale }}
                className={`inline-block will-change-transform ${isHighlighted ? highlightClassName : ''}`}
              >
                {token}
              </motion.span>
            </span>
          );
        })}
      </Component>
    </div>
  );
}
