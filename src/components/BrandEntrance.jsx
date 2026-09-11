import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandEntrance({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    // Auto-dismiss after 2.4 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 400);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy grain text-ivory cursor-pointer select-none px-6 overflow-hidden"
          role="region"
          aria-label="Brand Entrance Presentation (Tap to continue)"
        >
          {/* Atelier Photo in Background */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/images/atelier-flatlay-studio.jpg"
              alt="RIWAAZ Atelier"
              className="h-full w-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/80 to-burgundy/90" />
          </div>
          {/* Subtle Arch linework outline inspired by the logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-72 h-80 md:w-96 md:h-[26rem] border-t-2 border-x-2 border-gold rounded-t-full absolute pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center text-center max-w-md">
            {/* Logo reveal: slow, elegant fade/scale — no bounce, no spin */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/images/riwaaz-gold-emblem-transparent.png"
                alt="RIWAAZ by Jiya"
                className="h-52 w-52 md:h-72 md:w-72 object-contain opacity-80 drop-shadow-[0_0_35px_rgba(201,162,74,0.35)] mb-6"
              />
            </motion.div>

            {/* "Tradition, Reimagined." fades in beneath */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl md:text-3xl tracking-wide text-ivory/90 font-light"
            >
              Tradition, Reimagined.
            </motion.p>

            {/* Confirmed Brand Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.85, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 font-display text-base md:text-lg italic text-gold/90 tracking-wider font-light"
            >
              Where timeless craft finds a modern soul.
            </motion.p>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-12 eyebrow text-[0.62rem] text-gold/70 tracking-widest"
            >
              Tap anywhere to enter
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
