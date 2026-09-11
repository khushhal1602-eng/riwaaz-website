import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Scissors, Sparkles, Feather } from 'lucide-react';
import Reveal from './Reveal';

const STORY_STEPS = [
  {
    id: 'leather',
    number: '01',
    icon: Award,
    title: '100% Genuine Leather',
    subtitle: 'Sole, Lining & Upper',
    description:
      'We never use synthetic substitutes or Rexine. Real premium leather allows the jutti to breathe naturally, softening and contouring to the exact shape of your foot with every step you take.',
    highlight: 'Pure Leather Construction throughout',
    image: '/images/cycle-jute-wide.jpg',
    alt: 'Riwaaz handcrafted juttis resting beside the maroon embossed box on fur',
    badge: '100% Genuine Leather',
  },
  {
    id: 'lasting',
    number: '02',
    icon: Scissors,
    title: 'Completely Handmade',
    subtitle: 'Pair by Pair Construction',
    description:
      'Each jutti is hand-cut, shaped around wooden lasts, and stitched by master craftsmen in Punjab carrying forward generations of footwear heritage without industrial shortcuts.',
    highlight: 'Over 18 hours of dedicated artisan labor',
    image: '/images/cycle-jute-closeup.jpg',
    alt: 'Natural jute handcrafted jutti with cycle embroidery',
    badge: 'Artisanal Lasting',
  },
  {
    id: 'embroidery',
    number: '03',
    icon: Sparkles,
    title: 'Handmade Silk Floss Embroidery',
    subtitle: 'Every Thread Stitched by Hand',
    description:
      'Our whimsical motifs — from the iconic bicycle carrying blooming florals to the heritage teapot — are hand-embroidered with vibrant silk floss threads. Subtle nuances mark each pair as a unique piece of wearable art.',
    highlight: 'Original motif illustrations & threadwork',
    image: '/images/cycle-denim-closeup.jpg',
    alt: 'Detailed close up of handcrafted cycle and flower basket embroidery',
    badge: 'Hand Embroidery',
  },
  {
    id: 'versatility',
    number: '04',
    icon: Feather,
    title: 'Modern Everyday Versatility',
    subtitle: 'Built for Your Daily Wardrobe',
    description:
      'Designed to transition effortlessly from morning markets and casual denim to festive occasions, destination weddings, and quiet Tuesdays. A piece made for the way we actually live and dress today.',
    highlight: 'No break-in pain with soft leather lining',
    image: '/images/teapot-denim-wide.jpg',
    alt: 'Editorial denim-toned jutti pair with handmade box presentation',
    badge: 'Everyday Luxury',
  },
];

export default function StickyStorytelling() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = STORY_STEPS[activeStep];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 relative">
      <Reveal className="max-w-2xl mb-16">
        <p className="eyebrow text-maroon">Artisan Philosophy</p>
        <h2 className="mt-4 font-display text-4xl md:text-6xl text-ink">
          The Anatomy of Craft.
        </h2>
        <p className="mt-6 text-muted-foreground text-base md:text-lg font-light leading-relaxed">
          Four uncompromised standards that define every single pair crafted in our atelier.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT / STICKY VISUAL CONTAINER */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 z-20">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#FAF6F0] border border-border/80 shadow-2xl rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full flex items-center justify-center"
              >
                <img
                  src={current.image}
                  alt={current.alt}
                  className="h-full w-full object-contain p-2 sm:p-3.5"
                />
              </motion.div>
            </AnimatePresence>

            {/* Step Counter Indicator Badge */}
            <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-md px-3.5 py-1.5 border border-border/80 shadow-md text-maroon eyebrow text-xs z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>{current.badge}</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-ink/90 backdrop-blur-md px-4 py-2 text-ivory text-xs font-sans tracking-widest uppercase border border-gold/30 z-10">
              Chapter {current.number} / 04
            </div>
          </div>

          {/* Progress Indicators for Desktop */}
          <div className="mt-6 hidden lg:flex items-center gap-3">
            {STORY_STEPS.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  stepRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === idx ? 'w-12 bg-maroon' : 'w-4 bg-border hover:bg-gold'
                }`}
                aria-label={`Go to chapter ${step.number}: ${step.title}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT / SCROLLABLE CONTENT BLOCKS */}
        <div className="lg:col-span-6 space-y-24 md:space-y-36 py-8">
          {STORY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[idx] = el)}
                className={`transition-all duration-500 p-8 md:p-10 border rounded-sm ${
                  isActive
                    ? 'bg-ivory border-gold/70 shadow-lg scale-[1.02]'
                    : 'bg-secondary/20 border-border/50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'bg-maroon text-ivory' : 'bg-secondary text-ink'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="eyebrow text-gold text-xs">Chapter {step.number}</span>
                      <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                    </div>
                  </div>
                  <span className="font-display text-3xl text-maroon/40 font-light">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl text-ink leading-snug">
                  {step.title}
                </h3>

                <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground font-light">
                  {step.description}
                </p>

                <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-2 text-xs text-maroon font-medium uppercase tracking-wider">
                  <span className="text-gold">✦</span>
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
