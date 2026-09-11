import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Compass, Eye, Sparkles } from 'lucide-react';

export default function AtelierWalkthrough() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.2,
  });

  // Camera choreographies: deliberate pan & zoom path across composition
  // 0.0 - 0.25: Wide establishing shot (scale: 1.0, x: 0%, y: 0%)
  // 0.25 - 0.55: Move in toward embroidery motif (scale: 1.28, x: 8%, y: 12%)
  // 0.55 - 0.85: Pan across to gold-embossed box (scale: 1.36, x: -12%, y: -8%)
  // 0.85 - 1.0: Pull back smoothly to center overview (scale: 1.08, x: 0%, y: 2%)
  const cameraScale = useTransform(smoothProgress, [0, 0.3, 0.65, 0.95, 1], [1.0, 1.28, 1.38, 1.1, 1.05]);
  const cameraX = useTransform(smoothProgress, [0, 0.3, 0.65, 0.95, 1], ['0%', '7%', '-10%', '-2%', '0%']);
  const cameraY = useTransform(smoothProgress, [0, 0.3, 0.65, 0.95, 1], ['0%', '9%', '-7%', '2%', '0%']);

  // Phase narration opacities
  const caption1Opacity = useTransform(smoothProgress, [0, 0.08, 0.22, 0.28], [1, 1, 0.3, 0]);
  const caption2Opacity = useTransform(smoothProgress, [0.26, 0.34, 0.48, 0.56], [0, 1, 1, 0]);
  const caption3Opacity = useTransform(smoothProgress, [0.54, 0.62, 0.78, 0.86], [0, 1, 1, 0]);
  const caption4Opacity = useTransform(smoothProgress, [0.84, 0.9, 0.98, 1], [0, 1, 1, 0.4]);

  // Viewfinder metadata telemetry
  const focalLength = useTransform(smoothProgress, [0, 0.65, 1], [35, 85, 50]);
  const chapterText = useTransform(smoothProgress, (v) => {
    if (v < 0.28) return '01 // OVERVIEW';
    if (v < 0.56) return '02 // EMBROIDERY MOTIF';
    if (v < 0.86) return '03 // HEIRLOOM CASING';
    return '04 // FINISHED PAIR';
  });

  if (shouldReduceMotion) {
    return null; // Gracefully omitted or static in reduced motion mode
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh] bg-ink text-ivory will-change-transform"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 1: Photographic Canvas with Camera Movement */}
        <motion.div
          style={{
            scale: cameraScale,
            x: cameraX,
            y: cameraY,
          }}
          className="absolute inset-0 h-full w-full will-change-transform origin-center"
        >
          <img
            src="/images/jutti-cycle-denim-lifestyle.jpg"
            alt="Cinematic walkthrough of Riwaaz handcrafted footwear studio composition"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Layer 2: Vignette & Lighting Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16,13,13,0.2) 0%, rgba(16,13,13,0.55) 60%, rgba(16,13,13,0.92) 100%)',
          }}
        />

        {/* Layer 3: Architectural Cine-Viewfinder Overlay */}
        <div className="absolute inset-5 md:inset-10 border border-gold/20 pointer-events-none rounded-sm">
          {/* Viewfinder Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

          {/* Top HUD Telemetry */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[0.65rem] font-mono tracking-widest text-gold/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>CINE CAM // 4K 60FPS</span>
            </div>
            <motion.div className="hidden sm:block">
              <span>FOCAL: </span>
              <motion.span>{focalLength}</motion.span>
              <span>mm</span>
            </motion.div>
            <motion.span className="text-ivory font-semibold">{chapterText}</motion.span>
          </div>

          {/* Bottom HUD Timeline Progress */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[0.65rem] font-mono text-gold/70">
            <span>SCROLL CONTROLLED</span>
            <div className="w-32 md:w-64 h-1 bg-ivory/15 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full bg-gold origin-left will-change-transform"
              />
            </div>
            <span>RIWAAZ ATELIER</span>
          </div>
        </div>

        {/* Layer 4: Dynamic Narrative Step Overlays */}
        <div className="relative z-10 max-w-2xl px-6 text-center pointer-events-none">
          {/* Phase 1 Overlay */}
          <motion.div
            style={{ opacity: caption1Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
          >
            <p className="eyebrow text-gold mb-3">Cinematic Exploration</p>
            <h2 className="font-display text-4xl md:text-6xl text-ivory">
              The Living Atelier.
            </h2>
            <p className="mt-4 text-sm md:text-base text-ivory/80 max-w-md font-light">
              Scroll down to step inside. Experience how each element comes together in harmony.
            </p>
          </motion.div>

          {/* Phase 2 Overlay */}
          <motion.div
            style={{ opacity: caption2Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory/10 backdrop-blur-md border border-gold/40 text-gold text-xs font-mono mb-3">
              <Sparkles size={12} />
              <span>DETAIL FOCUS: THREADWORK</span>
            </div>
            <h3 className="font-display text-3xl md:text-5xl text-ivory">
              Silk Floss Needlework.
            </h3>
            <p className="mt-4 text-sm md:text-base text-ivory/85 max-w-md font-light">
              Over eight distinct yarn colors woven by hand to shape the whimsical cycle motif.
            </p>
          </motion.div>

          {/* Phase 3 Overlay */}
          <motion.div
            style={{ opacity: caption3Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory/10 backdrop-blur-md border border-gold/40 text-gold text-xs font-mono mb-3">
              <Eye size={12} />
              <span>HERITAGE CASING</span>
            </div>
            <h3 className="font-display text-3xl md:text-5xl text-ivory">
              Gift-Ready Presentation.
            </h3>
            <p className="mt-4 text-sm md:text-base text-ivory/85 max-w-md font-light">
              Debossed gold foil typography on heavy royal maroon board. Crafted to be cherished.
            </p>
          </motion.div>

          {/* Phase 4 Overlay */}
          <motion.div
            style={{ opacity: caption4Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
          >
            <p className="eyebrow text-gold mb-3">Tradition Reimagined</p>
            <h3 className="font-display text-3xl md:text-5xl text-ivory">
              Rooted in Where We Come From.
            </h3>
            <p className="mt-4 text-sm md:text-base text-ivory/85 max-w-md font-light">
              Yet tailored for everywhere you go today.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
