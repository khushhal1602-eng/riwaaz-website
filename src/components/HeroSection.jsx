import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, Film } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';

export default function HeroSection() {
  const containerRef = useRef(null);
  const heroImage = '/images/atelier-flatlay-studio.jpg';
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress of Hero section: 0 when top is at top of screen, 1 when bottom reaches top of screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.2,
  });

  // 0% -> 100% Continuous Cinematic Scroll Transformation:
  // 0%: Hero dominant
  // 25%: Hero image slowly scales down, background moves slightly slower, text moves up
  // 50%: Hero content fades, visual recedes into depth
  // 75%: Hero almost completely transformed
  // 100%: Next section takes over
  const bgScale = useTransform(smoothProgress, [0, 0.25, 0.5, 1], [1.0, 0.96, 0.92, 0.88]);
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '18%']);
  const bgOpacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 0.85, 0.4]);

  const contentY = useTransform(smoothProgress, [0, 0.25, 0.6, 1], ['0px', '-25px', '-80px', '-140px']);
  const contentOpacity = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75], [1, 0.92, 0.35, 0]);
  const logoScale = useTransform(smoothProgress, [0, 0.5, 1], [1.0, 0.9, 0.82]);
  const logoY = useTransform(smoothProgress, [0, 0.5, 1], ['0px', '-15px', '-50px']);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-burgundy text-center px-5 pt-28 pb-16 md:px-10 will-change-transform"
    >
      {/* Background Image with Cinematic Parallax & Smooth Scale */}
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : bgScale,
          y: shouldReduceMotion ? 0 : bgY,
          opacity: shouldReduceMotion ? 1 : bgOpacity,
        }}
        className="absolute inset-0 h-full w-full will-change-transform pointer-events-none origin-center"
      >
        <motion.img
          src={heroImage}
          alt="Handcrafted Riwaaz juttis with handmade embroidery"
          // Timeline: 0–200ms background begins appearing, very subtle scale 1.03 → 1.00
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Atmospheric Vignette & Radial Shadow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(23,19,18,0.4) 0%, rgba(23,19,18,0.74) 55%, rgba(23,19,18,0.94) 100%)',
        }}
      />

      {/* Center Stage Container */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : contentY,
          opacity: shouldReduceMotion ? 1 : contentOpacity,
        }}
        className="relative mx-auto w-full max-w-4xl z-10 flex flex-col items-center justify-center will-change-transform pt-12 md:pt-16"
      >
        {/* CENTERED ANIMATED EMBLEM LOGO */}
        {/* Timeline: 500–1200ms: Main hero image/product enters with subtle scale + movement */}
        <motion.div
          style={{
            scale: shouldReduceMotion ? 1 : logoScale,
            y: shouldReduceMotion ? 0 : logoY,
          }}
          className="relative flex items-center justify-center mb-6 md:mb-8 will-change-transform"
        >
          {/* Ambient Warm Golden Aura Glow behind Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: [0.18, 0.32, 0.18],
              scale: [0.96, 1.05, 0.96],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full bg-gold/20 blur-3xl pointer-events-none"
          />

          {/* Logo Entrance 500–1200ms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative group cursor-pointer"
            >
              <img
                src="/images/riwaaz-gold-emblem-transparent.png"
                alt="RIWAAZ by Jiya Gold Emblem Logo"
                className="h-56 w-56 sm:h-72 sm:w-72 md:h-88 md:w-88 lg:h-[25rem] lg:w-[25rem] xl:h-[28rem] xl:w-[28rem] object-contain opacity-80 md:opacity-85 transition-all duration-700 group-hover:opacity-95 group-hover:scale-105 drop-shadow-[0_4px_30px_rgba(201,162,74,0.35)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Timeline: 200–500ms: Main headline moves upward approx 40px, Opacity 0 → 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] text-ivory drop-shadow-lg tracking-wide"
        >
          Tradition, Reimagined.
        </motion.h1>

        {/* Timeline: 400–700ms: Supporting text appears */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-lg md:text-2xl leading-relaxed text-ivory/90 font-display italic tracking-wide"
        >
          Where timeless craft finds a modern soul.
        </motion.p>

        {/* Timeline: 600–900ms: CTA buttons appear */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          {/* Primary Button: Explore the Collection */}
          <Link
            to="/collection"
            className="group relative overflow-hidden bg-ivory text-ink px-10 py-5 rounded-[1px] tracking-[0.24em] text-xs uppercase font-sans font-medium transition-all duration-500 ease-out shadow-[0_10px_30px_-5px_rgba(201,162,74,0.35),0_0_0_1px_rgba(201,162,74,0.5)] hover:shadow-[0_16px_38px_-4px_rgba(201,162,74,0.55),0_0_0_1px_rgba(201,162,74,0.9)] hover:-translate-y-0.5 inline-flex items-center gap-3"
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute inset-[3px] border border-gold/25 pointer-events-none transition-colors duration-300 group-hover:border-gold/50"
              aria-hidden="true"
            />
            <span className="relative z-10 text-ink group-hover:text-maroon transition-colors duration-300">
              Explore the Collection
            </span>
            <ArrowRight
              size={13}
              className="relative z-10 text-gold-dark group-hover:text-maroon group-hover:translate-x-1.5 transition-all duration-300"
            />
          </Link>

          {/* Secondary Button: Discover Our Story */}
          <Link
            to="/story"
            className="group relative overflow-hidden bg-ink/40 backdrop-blur-md text-ivory border border-gold/50 hover:border-gold px-9 py-5 rounded-[1px] tracking-[0.24em] text-xs uppercase font-sans font-medium transition-all duration-500 ease-out shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,162,74,0.45)] hover:-translate-y-0.5 hover:bg-gold/15 inline-flex items-center gap-2.5"
          >
            <span
              className="absolute inset-[3px] border border-white/5 pointer-events-none transition-colors duration-300 group-hover:border-gold/30"
              aria-hidden="true"
            />
            <span className="relative z-10 text-ivory/95 group-hover:text-gold transition-colors duration-300">
              Discover Our Story
            </span>
          </Link>
        </motion.div>

        {/* Quick Links: Watch Film + Instagram (600–900ms) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#capsule-video"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon/75 backdrop-blur-md border border-gold/45 text-ivory/95 text-[0.68rem] uppercase tracking-[0.22em] font-sans transition-all duration-300 hover:border-gold hover:text-gold hover:bg-burgundy shadow-lg group"
          >
            <Film size={12} className="text-gold group-hover:scale-110 transition-transform" />
            <span>Watch Launch Film</span>
            <span className="text-gold/40">✦</span>
            <span className="text-[0.62rem] text-gold/90 font-light lowercase">46s</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink/50 backdrop-blur-md border border-gold/35 text-ivory/80 text-[0.68rem] uppercase tracking-[0.22em] font-sans transition-all duration-300 hover:border-gold hover:text-gold hover:bg-ink/75 shadow-lg group"
          >
            <InstagramIcon size={13} className="text-gold group-hover:scale-110 transition-transform" />
            <span>{INSTAGRAM_HANDLE}</span>
            <span className="text-gold/40">✦</span>
            <span className="text-[0.65rem] text-gold/90 font-light tracking-widest lowercase">follow on instagram</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
