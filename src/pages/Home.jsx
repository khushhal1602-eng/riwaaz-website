import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, BRAND_VALUES } from '../data/products';
import BrandEntrance from '../components/BrandEntrance';
import HeroSection from '../components/HeroSection';
import StickyStorytelling from '../components/StickyStorytelling';
import LaunchVideoSection from '../components/LaunchVideoSection';
import ProductCard from '../components/ProductCard';
import ImageReveal from '../components/ImageReveal';
import Reveal from '../components/Reveal';
import InstagramShowcase from '../components/InstagramShowcase';
import CinematicCampaignExperience from '../components/CinematicCampaignExperience';
import KineticHeadline from '../components/KineticHeadline';
import FullScreenImageExpand from '../components/FullScreenImageExpand';
import AtelierWalkthrough from '../components/AtelierWalkthrough';
import ScrollParallax, { ParallaxLayer } from '../components/ScrollParallax';
import { ArrowRight, Award, Scissors, Sparkles } from 'lucide-react';

export default function Home() {
  const [showEntrance, setShowEntrance] = useState(false);

  useEffect(() => {
    // Show brand entrance only once per session
    try {
      const seen = sessionStorage.getItem('riwaaz_entrance_seen');
      if (!seen) {
        setShowEntrance(true);
        sessionStorage.setItem('riwaaz_entrance_seen', 'true');
      }
    } catch {
      // Fallback if sessionStorage is disabled
      setShowEntrance(false);
    }
  }, []);

  return (
    <div className="overflow-x-clip bg-ivory">
      {/* 1. BRAND ENTRANCE SEQUENCE (ONCE PER SESSION, SKIPPABLE) */}
      {showEntrance && <BrandEntrance onComplete={() => setShowEntrance(false)} />}

      {/* 2. CINEMATIC HERO (WITH TIMELINE ENTRANCE & CONTINUOUS SCROLL TRANSFORMATION) */}
      <HeroSection />

      {/* 3. COUTURE CAMPAIGN ANIMATION EXPERIENCE: TRADITION, REIMAGINED */}
      <CinematicCampaignExperience />

      {/* 4. THE COLLECTION (4 PRODUCTS WITH KINETIC TYPOGRAPHY & STAGGERED CARDS) */}
      <section id="collection" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <KineticHeadline
              eyebrow="The Collection"
              text="Four pairs. Nothing surplus."
              as="h2"
              className="font-display text-4xl md:text-6xl text-ink"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground font-light">
            A deliberately small capsule — each design drawn, stitched and finished by hand before it earns a place here.
          </p>
        </div>

        <div className="rule-gold my-14" />

        {/* 2x2 Desktop Grid, 1 Column Mobile with 0ms, 100ms, 200ms, 300ms Staggered Entrance */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* 5. FULL-SCREEN SCROLL EXPANSION (CAMERA ZOOM PUSH-IN ON HIGH-RES PHOTOGRAPHY) */}
      <FullScreenImageExpand
        imageSrc="/images/riwaaz-heirloom-legacy.jpg"
        alt="Riwaaz signature Punjabi jutti collection with luxury black presentation box, brass lantern, and floral embroidered details"
        eyebrow="The Atelier Standard"
        title="Every stitch an heirloom."
        subtitle="Every step a legacy."
        description="Crafted slowly over 18 hours of master artisan lasting. Real leather molds naturally to the unique contours of your stride."
      />

      {/* 6. CRAFTSMANSHIP SECTION WITH SCROLL-PROGRESS REVEAL & MULTI-LAYER DEPTH */}
      <section className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 overflow-hidden">
        {/* Ambient Subtle Background Parallax Ornament */}
        <ParallaxLayer speed={0.2} className="absolute -right-20 top-20 pointer-events-none opacity-10">
          <img
            src="/images/riwaaz-gold-emblem-transparent.png"
            alt=""
            className="w-96 h-96 object-contain"
          />
        </ParallaxLayer>

        <div className="grid gap-14 md:grid-cols-12 md:items-center relative z-10">
          <div className="md:col-span-6">
            <KineticHeadline
              eyebrow="Craftsmanship"
              text="Made slowly, by hand, in leather."
              as="h2"
              className="font-display text-4xl leading-tight md:text-5xl text-ink"
            />
            <div className="rule-gold my-10 max-w-40" />

            <ul className="space-y-8">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1 text-maroon shadow-sm">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-maroon">100% Genuine Leather</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed font-light">
                    Upper, lining and sole — real leather throughout.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1 text-maroon shadow-sm">
                  <Scissors size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-maroon">Completely Handmade</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed font-light">
                    Shaped and finished by hand, pair by pair.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1 text-maroon shadow-sm">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-maroon">Handmade Embroidery</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed font-light">
                    Every motif is worked thread by thread — small variations are the signature.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 pt-6 border-t border-border/70 flex items-center gap-4 text-xs font-mono text-gold-dark">
              <span>PUNJAB ATELIER</span>
              <span>✦</span>
              <span>18+ HOURS LASTING</span>
              <span>✦</span>
              <span>ZERO SYNTHETICS</span>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <ScrollParallax speed={1.15} offset={50}>
              <ImageReveal
                src={PRODUCTS[0].images[1]}
                alt="Close view of hand embroidery on a denim-toned Riwaaz jutti"
                aspectRatio="aspect-[3/4] sm:aspect-[4/5]"
                objectFit="object-contain"
                className="border border-border/70 shadow-2xl"
                badge="100% Genuine Leather"
              />
            </ScrollParallax>
          </div>
        </div>
      </section>

      {/* 7. CINEMATIC ATELIER WALKTHROUGH (SCROLL-CONTROLLED CAMERA TRACK) */}
      <AtelierWalkthrough />

      {/* 8. STICKY STORYTELLING SECTION (THE ANATOMY OF CRAFT PINNED PRESENTATION) */}
      <StickyStorytelling />

      {/* 9. OFFICIAL LAUNCH FILM SHOWCASE */}
      <LaunchVideoSection />

      {/* 10. BIG TYPOGRAPHY MOMENT / TRADITION × MODERNITY VERSATILITY GRID */}
      <section className="grain bg-burgundy px-5 py-24 text-ivory md:px-10 md:py-36 relative overflow-hidden">
        {/* Ambient warm golden glow behind typography */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <ParallaxLayer speed={0.15} className="absolute -left-20 bottom-10 pointer-events-none opacity-10">
          <img
            src="/images/riwaaz-gold-emblem-transparent.png"
            alt=""
            className="w-[32rem] h-[32rem] object-contain"
          />
        </ParallaxLayer>

        <div className="mx-auto max-w-[1440px] relative z-10">
          <div className="mx-auto max-w-4xl text-center mb-16 md:mb-20">
            <KineticHeadline
              align="center"
              eyebrow={
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gold/50 bg-gold/15 backdrop-blur-md shadow-[0_0_30px_rgba(201,168,106,0.25)] group hover:border-gold/80 hover:bg-gold/25 transition-all duration-300">
                  <span className="text-gold text-xs">✦</span>
                  <span className="eyebrow text-gold font-semibold tracking-[0.32em] text-xs uppercase drop-shadow-[0_1px_10px_rgba(201,168,106,0.4)]">
                    Modern Versatility
                  </span>
                  <span className="text-gold text-xs">✦</span>
                </div>
              }
              text="Not just for occasions."
              highlightWords={['occasions.']}
              highlightClassName="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#ffeac0] via-[#f7d68a] to-[#c9a86a] drop-shadow-[0_2px_16px_rgba(201,168,106,0.35)]"
              as="h2"
              className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.12] text-ivory drop-shadow-md justify-center"
            />

            {/* Antique gold hairline divider */}
            <div className="flex items-center justify-center gap-3.5 my-7">
              <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-gold" />
              <span className="text-gold/90 text-xs">❖</span>
              <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent via-gold/60 to-gold" />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-[#fbf7ee] font-light leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              Designed to move effortlessly with you everywhere — styling seamlessly with{' '}
              <span className="text-gold font-normal underline decoration-gold/40 underline-offset-4">raw denim</span>,{' '}
              <span className="text-gold font-normal underline decoration-gold/40 underline-offset-4">flowing dresses</span>,{' '}
              <span className="text-gold font-normal underline decoration-gold/40 underline-offset-4">festive kurtas</span>, or a quiet Tuesday.
            </p>

            {/* Versatile Styling Occasion Tags */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {[
                'Everyday Denim',
                'Festive Celebrations',
                'Handcrafted Comfort',
                'Contemporary Heritage',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-gold/30 bg-black/25 backdrop-blur-sm text-[11px] uppercase tracking-[0.22em] text-ivory/90 hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product, idx) => (
              <ScrollParallax key={`versatile-${product.id}`} speed={0.95 + (idx % 2) * 0.1} offset={35}>
                <Link to={`/collection/${product.slug}`} className="block group">
                  <ImageReveal
                    src={product.thumbnail}
                    alt={product.alt}
                    aspectRatio="aspect-[3/4] sm:aspect-[4/5]"
                    className="border border-gold/25 shadow-2xl transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                    badge={product.name}
                  />
                </Link>
              </ScrollParallax>
            ))}
          </div>
        </div>
      </section>

      {/* 11. WHY RIWAAZ — BRAND PILLARS */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <KineticHeadline
          eyebrow="Why Riwaaz"
          text="Four ideas we don't compromise on."
          as="h2"
          className="font-display text-4xl md:text-5xl text-ink max-w-2xl"
        />

        <div className="rule-gold my-14" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_VALUES.map((value, idx) => (
            <Reveal key={value.title} delay={idx * 80}>
              <div className="p-8 bg-secondary/30 border border-border/70 rounded-sm h-full flex flex-col justify-between hover:border-gold hover:shadow-xl transition-all duration-300 group">
                <div>
                  <span className="font-mono text-xs text-gold-dark/60 group-hover:text-gold block mb-2">0{idx + 1}</span>
                  <h3 className="font-display text-3xl text-maroon mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground font-light">
                    {value.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 12. INSTAGRAM ATELIER FEED SHOWCASE */}
      <InstagramShowcase />

      {/* 13. FINAL CTA (LARGE, QUIET CLOSING STATEMENT) */}
      <section className="grain bg-maroon px-5 py-28 text-center text-ivory md:py-40 relative overflow-hidden">
        <ParallaxLayer speed={0.25} className="absolute inset-x-0 -top-20 flex justify-center pointer-events-none opacity-10">
          <img
            src="/images/riwaaz-gold-emblem-transparent.png"
            alt=""
            className="w-96 h-96 object-contain"
          />
        </ParallaxLayer>

        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          <KineticHeadline
            align="center"
            eyebrow="Begin Your Journey"
            eyebrowClassName="text-gold tracking-[0.3em] font-medium"
            text="Step into the collection."
            highlightWords={['collection.']}
            highlightClassName="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold"
            as="h2"
            className="font-display text-5xl md:text-7xl text-ivory justify-center"
          />
          <div>
            <Link
              to="/collection"
              className="eyebrow inline-flex items-center gap-2 border border-gold px-10 py-5 text-gold transition-all duration-300 hover:bg-gold hover:text-ink shadow-2xl"
            >
              <span>Explore the Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
