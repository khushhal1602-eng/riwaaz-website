import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * ScrollParallax provides multi-layer 3D depth linked directly to scroll progress.
 * @param {number} speed - Relative speed factor:
 *   - < 1 (e.g. 0.3): Slow background layer
 *   - 1.0: Normal flow
 *   - > 1 (e.g. 1.25): Foreground layer moving faster
 * @param {number} offset - Maximum translation in pixels (default 80)
 */
export default function ScrollParallax({
  children,
  speed = 0.5,
  offset = 80,
  className = '',
  as: Component = 'div',
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const delta = (speed - 1) * offset;
  const rawY = useTransform(scrollYProgress, [0, 1], [delta, -delta]);
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 26, mass: 0.2 });

  const MotionComponent = motion[Component] || motion.div;

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <MotionComponent
      ref={ref}
      style={{ y: smoothY }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * ParallaxLayer provides a designated layer inside a relative parent container
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = (1 - speed) * 100;
  const rawY = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const smoothY = useSpring(rawY, { stiffness: 100, damping: 24 });

  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ ...style, y: smoothY }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
