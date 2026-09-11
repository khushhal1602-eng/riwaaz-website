import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

export default function FullScreenImageExpand({
  imageSrc = '/images/riwaaz-heirloom-legacy.jpg',
  alt = 'Riwaaz signature Punjabi jutti collection with luxury black presentation box and brass lantern',
  eyebrow = 'The Atelier Standard',
  title = 'Every stitch an heirloom.',
  subtitle = 'Every step a legacy.',
  description = 'From raw hide selection to the final needle pull, our artisans take no shortcuts. Shaped slowly to become softer with every mile you walk.',
  blurAmount = 'blur-[3.5px]',
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.2,
  });

  // Scale & width expansion: starts contained, expands to full viewport
  const containerWidth = useTransform(smoothProgress, [0, 0.65], ['82%', '100%']);
  const containerHeight = useTransform(smoothProgress, [0, 0.65], ['70vh', '100vh']);
  const containerRadius = useTransform(smoothProgress, [0, 0.65], ['16px', '0px']);
  const containerBorder = useTransform(smoothProgress, [0, 0.5], ['rgba(197, 160, 89, 0.35)', 'rgba(197, 160, 89, 0)']);

  // Camera push-in on image
  const imgScale = useTransform(smoothProgress, [0, 1], [1.12, 1.0]);
  const imgY = useTransform(smoothProgress, [0, 1], ['0%', '4%']);

  // Narrative text reveals at midpoint
  const textOpacity = useTransform(smoothProgress, [0.15, 0.45, 0.85, 0.98], [0, 1, 1, 0.2]);
  const textY = useTransform(smoothProgress, [0.15, 0.45], [40, 0]);

  if (shouldReduceMotion) {
    return (
      <section className="relative min-h-screen bg-ink py-24 px-5 text-ivory flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={alt}
            className={`h-full w-full object-cover object-center scale-105 ${blurAmount} opacity-40`}
          />
          <div className="absolute inset-0 bg-ink/75" />
        </div>
        <div className="relative z-10 max-w-3xl text-center px-6 sm:px-12 py-10 sm:py-14 rounded-3xl bg-black/50 backdrop-blur-md border border-gold/30 shadow-2xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/50 text-gold text-xs tracking-[0.3em] uppercase font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ivory">
            {title}
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffeac0] via-[#f7d68a] to-[#c9a86a] font-light mt-2 sm:mt-3">
              {subtitle}
            </span>
          </h2>
          <div className="flex items-center justify-center gap-3 my-6">
            <span className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs">❖</span>
            <span className="w-16 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="mt-4 text-base md:text-lg text-[#f7f2e8] max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[220vh] bg-ink text-ivory will-change-transform"
    >
      {/* Sticky Camera Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Expanding Framing Card */}
        <motion.div
          style={{
            width: containerWidth,
            height: containerHeight,
            borderRadius: containerRadius,
            borderWidth: '1px',
            borderColor: containerBorder,
          }}
          className="relative overflow-hidden will-change-transform shadow-2xl transition-shadow duration-500"
        >
          {/* Background Visual with Camera Push-In and Soft Cinematic Blur */}
          <motion.div
            style={{ scale: imgScale, y: imgY }}
            className="absolute inset-0 h-full w-full will-change-transform overflow-hidden"
          >
            <img
              src={imageSrc}
              alt={alt}
              className={`h-full w-full object-cover object-center scale-105 ${blurAmount}`}
            />
          </motion.div>

          {/* Deep Cinematic Film Scrim Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(12,10,10,0.52) 0%, rgba(12,10,10,0.72) 55%, rgba(12,10,10,0.92) 100%)',
            }}
          />

          {/* Golden Architectural Hairlines */}
          <div className="absolute inset-6 md:inset-12 border border-gold/25 pointer-events-none rounded-sm hidden sm:block" />

          {/* Centered Cinematic Editorial Narrative — Focused Prominently on the Text */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-4 sm:px-8 text-center will-change-transform"
          >
            {/* Frosted Luxury Spotlight Card to focus entirely on the typography */}
            <div className="w-full max-w-3xl px-6 sm:px-12 py-10 sm:py-14 rounded-3xl bg-black/45 backdrop-blur-md border border-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),_inset_0_0_40px_rgba(201,168,106,0.06)] flex flex-col items-center">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold/15 backdrop-blur-md border border-gold/50 text-gold text-xs tracking-[0.3em] uppercase font-sans mb-6 shadow-[0_0_20px_rgba(201,168,106,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="font-medium">{eyebrow}</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-ivory drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                {title}
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-[#ffeac0] via-[#f7d68a] to-[#c9a86a] font-light mt-2 sm:mt-3 drop-shadow-[0_2px_18px_rgba(201,168,106,0.35)]">
                  {subtitle}
                </span>
              </h2>

              <div className="flex items-center justify-center gap-3 my-6 sm:my-7">
                <span className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/70" />
                <span className="text-gold/90 text-xs">❖</span>
                <span className="w-16 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/70" />
              </div>

              <p className="max-w-xl text-sm sm:text-base md:text-lg text-[#f7f2e8] font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono tracking-wider">
                <span className="px-3.5 py-1 rounded-full border border-gold/35 bg-gold/10 text-gold text-[11px] tracking-widest uppercase">
                  Genuine Leather
                </span>
                <span className="text-gold/60">✦</span>
                <span className="px-3.5 py-1 rounded-full border border-gold/35 bg-gold/10 text-gold text-[11px] tracking-widest uppercase">
                  Punjab Atelier
                </span>
                <span className="text-gold/60">✦</span>
                <span className="px-3.5 py-1 rounded-full border border-gold/35 bg-gold/10 text-gold text-[11px] tracking-widest uppercase">
                  Hand Lasted
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
