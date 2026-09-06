import React from 'react';
import { Link } from 'react-router-dom';
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal';
import ImageReveal from '../components/ImageReveal';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Sparkles, Award, Scissors, Feather } from 'lucide-react';

export default function Story() {
  return (
    <>
      {/* Editorial Header */}
      <section className="mx-auto max-w-[1440px] px-5 pt-32 pb-20 md:px-10 md:pt-44">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-maroon">Our Story</p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.05] text-ink">
            Tradition, Reimagined.
          </h1>
          <div className="mt-8 space-y-5 text-lg md:text-xl leading-relaxed text-muted-foreground font-light">
            <p className="font-display text-2xl md:text-3xl text-maroon italic">
              Riwaaz — a tradition, carried forward.
            </p>
            <p>
              Inspired by the timeless art of Indian craftsmanship, Riwaaz brings the soul of tradition into the rhythm of modern life. Every jutti is a meeting of heritage and contemporary expression — rooted in where we come from, yet designed for where we&apos;re going.
            </p>
            <p className="text-ink font-medium italic font-display text-xl md:text-2xl">
              Because tradition isn&apos;t meant to be left behind. It&apos;s meant to be reimagined.
            </p>
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground font-light">
            [FOUNDER STORY — CONFIRM]
          </p>
        </Reveal>
      </section>

      {/* Craftsmanship Section */}
      <section className="grain bg-maroon px-5 py-24 text-ivory md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-ivory">
              What we can say without embellishment.
            </h2>
            <ul className="mt-10 space-y-8 text-ivory/80">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                  <Award size={20} />
                </div>
                <div>
                  <span className="eyebrow text-gold block mb-1">100% Genuine Leather</span>
                  <p className="text-sm font-light leading-relaxed text-ivory/80">
                    Real leather throughout — upper, lining, and sole. No synthetic alternatives or cut corners.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                  <Scissors size={20} />
                </div>
                <div>
                  <span className="eyebrow text-gold block mb-1">Completely Handmade</span>
                  <p className="text-sm font-light leading-relaxed text-ivory/80">
                    Each pair is lasted, curved, stitched, and finished by generational craftsmen in Punjab.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                  <Sparkles size={20} />
                </div>
                <div>
                  <span className="eyebrow text-gold block mb-1">Handmade Embroidery</span>
                  <p className="text-sm font-light leading-relaxed text-ivory/80">
                    Every motif is stitched thread by thread by hand — never machine-stamped or automated.
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-8 text-xs text-ivory/50 font-mono">
              [CRAFTSMANSHIP PROCESS DETAILS — artisan counts, hours, geographic origin — CONFIRM]
            </p>
          </Reveal>

          <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
            <ImageReveal
              src="/images/jutti-jute-box-lifestyle.png"
              alt="Denim-toned Riwaaz juttis resting beside the maroon and gold Riwaaz box"
              aspectRatio="aspect-4/3"
              objectFit="object-contain"
              className="border border-gold/30 shadow-2xl"
              badge="Generational Art"
            />
          </Reveal>
        </div>
      </section>

      {/* Wardrobe Philosophy & CTA */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 text-center md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-2xl space-y-8">
          <h2 className="font-display text-4xl md:text-6xl text-ink">
            Worn with everything.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-light">
            Denim on a weekday. A kurta at a wedding. A dress in between. Riwaaz juttis are built for a wardrobe, not a single evening.
          </p>
          <div className="pt-4">
            <Link
              to="/collection"
              className="eyebrow inline-flex items-center gap-2 border border-maroon px-10 py-5 text-maroon transition-all duration-300 hover:bg-maroon hover:text-ivory shadow-sm"
            >
              <span>Explore the Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
