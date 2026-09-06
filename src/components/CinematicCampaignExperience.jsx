import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { formatINR } from '../data/products';

const CAMPAIGN_CHAPTERS = [
  {
    id: 'overture',
    tagline: 'RIWAAZ CAMPAIGN',
    heading: 'Tradition, Reimagined.',
    subheading: 'A curated dialogue between generational Punjabi shoe-craft and contemporary restraint.',
    primaryImage: '/images/atelier-flatlay-studio.jpg',
    secondaryImage: '/images/jutti-jute-box-lifestyle.png',
    alt: 'Studio presentation of the 4 Riwaaz signature pairs',
    accentText: 'A Four-Silhouette Capsule',
    productLink: '/collection',
    buttonText: 'View The Capsule',
    badge: 'Atelier Overture',
  },
  {
    id: 'cycle-denim',
    tagline: 'DENIM SERIES · VINTAGE CYCLE',
    heading: 'Rooted in Heritage.',
    subheading: 'Rich indigo denim transformed into a canvas for traditional Phulkari-inspired silk floss threadwork.',
    primaryImage: '/images/jutti-cycle-denim-portrait.jpg',
    secondaryImage: '/images/jutti-cycle-denim-lifestyle.jpg',
    alt: 'Denim jutti with cycle and flower basket embroidery beside maroon box',
    productName: 'Cycle + Floral Basket Design — Denim Edition',
    price: 1499,
    accentText: '100% Genuine Leather · Hand Embroidered',
    productLink: '/collection/cycle-floral-basket-denim',
    buttonText: 'Discover Denim Cycle',
    badge: 'Iconic Cycle Motif',
  },
  {
    id: 'teapot-denim',
    tagline: 'DENIM SERIES · CHAI TEAPOT',
    heading: 'Crafted by Hand.',
    subheading: 'The playful warmth of chai culture — delicate floral tea-cups stitched thread by thread over deep denim.',
    primaryImage: '/images/jutti-teapot-denim-portrait.jpg',
    secondaryImage: '/images/DSC4625.jpg',
    alt: 'Denim jutti with teapot and blooming floral embroidery',
    productName: 'Teapot Floral Design — Denim Edition',
    price: 1499,
    accentText: 'Generational Lasting · Soft Leather Lining',
    productLink: '/collection/teapot-floral-denim',
    buttonText: 'Discover Denim Teapot',
    badge: 'Chai & Floral Motifs',
  },
  {
    id: 'cycle-jute',
    tagline: 'NATURAL JUTE · VINTAGE CYCLE',
    heading: 'Made for Today.',
    subheading: 'Earthy, textured raw jute paired with radiant silk floss — built for denim, dresses, and quiet Tuesdays.',
    primaryImage: '/images/cycle-jute-box-lifestyle.jpg',
    secondaryImage: '/images/DSC4628.jpg',
    alt: 'Natural jute handcrafted jutti with cycle embroidery and luxury Riwaaz presentation box',
    productName: 'Cycle + Floral Basket Design — Natural Jute Edition',
    price: 1399,
    accentText: 'Raw Jute Texture · Genuine Leather Sole',
    productLink: '/collection/cycle-floral-basket-jute',
    buttonText: 'Discover Jute Cycle',
    badge: 'Tactile Jute Weave',
  },
  {
    id: 'teapot-jute',
    tagline: 'NATURAL JUTE · CHAI TEAPOT',
    heading: 'Every Step Carries a Story.',
    subheading: 'Unembellished honesty. Natural earthy fibres meeting the warmth of heirloom needlework.',
    primaryImage: '/images/teapot-jute-box-lifestyle.jpg',
    secondaryImage: '/images/DSC4627.jpg',
    alt: 'Natural jute jutti with teapot embroidery and luxury Riwaaz presentation box',
    productName: 'Teapot Floral Design — Natural Jute Edition',
    price: 1399,
    accentText: 'Completely Handmade · Heirloom Stitching',
    productLink: '/collection/teapot-floral-jute',
    buttonText: 'Discover Jute Teapot',
    badge: 'Story in Stitches',
  },
];

const CHAPTER_DURATION = 6000; // 6 seconds per chapter

export default function CinematicCampaignExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const current = CAMPAIGN_CHAPTERS[currentIndex];

  // Auto-progression timer & smooth progress calculation
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(progressIntervalRef.current);
      clearTimeout(timerRef.current);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    // 60fps-smooth progress bar ticker
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min((elapsed / CHAPTER_DURATION) * 100, 100);
      setProgress(currentPct);
    }, 40);

    // Chapter switcher
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % CAMPAIGN_CHAPTERS.length);
    }, CHAPTER_DURATION);

    return () => {
      clearInterval(progressIntervalRef.current);
      clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPlaying]);

  const handleSelectChapter = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="relative bg-burgundy text-ivory overflow-hidden grain py-24 md:py-36 border-y border-gold/25">
      {/* Ambient Radial Vignette & Warm Gold Aura */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(90,11,11,0.6) 0%, rgba(58,5,7,0.92) 65%, rgba(23,19,18,0.98) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 z-10">
        {/* Campaign Header Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 mb-8 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <p className="eyebrow tracking-[0.28em] text-gold/90 text-xs">
              THE COUTURE CAMPAIGN · FOUR EDITIONS
            </p>
          </div>

          {/* Interactive Play/Pause Toggle */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleAutoPlay}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 hover:border-gold bg-ink/40 text-ivory/80 hover:text-gold text-xs transition-colors shadow-sm"
              aria-label={isPlaying ? 'Pause campaign presentation' : 'Play campaign presentation'}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span className="font-sans text-[0.68rem] uppercase tracking-widest font-medium">
                {isPlaying ? 'Pause' : 'Play'}
              </span>
            </button>
          </div>
        </div>

        {/* Main Stage: Layered Dual-Pane Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[580px] md:min-h-[640px]">
          {/* LEFT: EDITORIAL TYPOGRAPHY & STORYTELLING */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Chapter Tagline (No numbers) */}
                <div className="flex items-center gap-2.5">
                  <span className="eyebrow text-gold text-[0.68rem] tracking-[0.24em]">
                    {current.tagline}
                  </span>
                </div>

                {/* Major Statement Title (High-contrast Serif) */}
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ivory leading-[1.08] tracking-tight drop-shadow-md">
                  {current.heading}
                </h2>

                {/* Narrative Description */}
                <p className="text-ivory/80 text-base md:text-lg font-light leading-relaxed max-w-md pt-1">
                  {current.subheading}
                </p>

                {/* Product Detail Chip (If present) */}
                {current.productName && (
                  <div className="pt-2">
                    <div className="p-4 bg-ink/45 border border-gold/30 rounded-xs backdrop-blur-sm max-w-md">
                      <div className="flex justify-between items-baseline gap-2">
                        <p className="font-display text-lg text-gold leading-tight">
                          {current.productName}
                        </p>
                        <p className="font-sans text-base text-ivory font-medium shrink-0">
                          {formatINR(current.price)}
                        </p>
                      </div>
                      <div className="mt-2.5 flex items-center gap-2 text-xs text-ivory/70 font-mono">
                        <Sparkles size={11} className="text-gold" />
                        <span>{current.accentText}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Direct Action CTA */}
                <div className="pt-4">
                  <Link
                    to={current.productLink}
                    className="group relative overflow-hidden bg-ivory text-ink hover:bg-gold px-8 py-4 rounded-[1px] tracking-[0.22em] text-xs uppercase font-sans font-medium transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center gap-3 border border-gold/40"
                  >
                    <span>{current.buttonText}</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: CINEMATIC PRODUCT HERO & ARTISAN DETAIL MASKING */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <div className="relative aspect-4/5 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden bg-ink/60 border border-gold/40 shadow-2xl rounded-xs group">
              {/* Antique Gold Architectural Hairlines */}
              <div
                className="absolute inset-[8px] border border-gold/20 pointer-events-none z-20 transition-colors duration-500 group-hover:border-gold/40"
                aria-hidden="true"
              />

              {/* Crossfading Hero Photography with Subtle Ken Burns Zoom */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full"
                >
                  <motion.img
                    src={current.primaryImage}
                    alt={current.alt}
                    initial={{ scale: 1.0 }}
                    animate={{ scale: 1.04 }}
                    transition={{
                      duration: CHAPTER_DURATION / 1000 + 0.5,
                      ease: 'linear',
                    }}
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                  {/* Gentle Gradient Shadow to anchor details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Architectural Badge */}
              <div className="absolute top-5 left-5 z-20">
                <div className="px-3.5 py-1.5 bg-ink/90 backdrop-blur-md border border-gold/40 text-gold text-[0.65rem] uppercase tracking-[0.24em] font-sans shadow-lg flex items-center gap-2">
                  <Sparkles size={11} className="text-gold" />
                  <span>{current.badge}</span>
                </div>
              </div>

              {/* Floating Miniature Secondary Detail Vignette (Desktop only) */}
              {current.secondaryImage && (
                <div className="hidden sm:block absolute bottom-5 right-5 z-20 max-w-[140px] md:max-w-[170px] overflow-hidden border border-gold/50 shadow-2xl bg-ink/90 p-1 rounded-xs backdrop-blur-md">
                  <div className="aspect-square overflow-hidden bg-black/40">
                    <img
                      src={current.secondaryImage}
                      alt={`${current.heading} artisan detail`}
                      className="h-full w-full object-cover brightness-95"
                    />
                  </div>
                  <p className="mt-1 text-[0.58rem] tracking-wider text-gold/90 text-center font-mono uppercase truncate px-1">
                    Artisan Detail
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Chapter Progress Track & Interactive Tabs (No numbers) */}
        <div className="mt-14 pt-8 border-t border-gold/20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CAMPAIGN_CHAPTERS.map((chapter, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleSelectChapter(idx)}
                  className={`text-left group relative p-3 transition-all duration-300 border-t-2 ${
                    isActive
                      ? 'border-gold bg-gold/10'
                      : 'border-white/15 hover:border-gold/40 bg-transparent'
                  }`}
                >
                  {/* Auto-advancing progress bar for active chapter */}
                  {isActive && isPlaying && (
                    <motion.div
                      style={{ width: `${progress}%` }}
                      className="absolute -top-[2px] left-0 h-[2px] bg-gold"
                    />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[0.62rem] tracking-[0.2em] uppercase font-sans text-gold/90 font-medium truncate pr-1">
                      {chapter.badge}
                    </span>
                    <ChevronRight
                      size={12}
                      className={`transition-transform duration-300 shrink-0 ${
                        isActive ? 'translate-x-0.5 text-gold' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  </div>

                  <p
                    className={`font-display text-sm tracking-wide line-clamp-1 transition-colors ${
                      isActive ? 'text-ivory font-medium' : 'text-ivory/60 group-hover:text-ivory/90'
                    }`}
                  >
                    {chapter.heading}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
