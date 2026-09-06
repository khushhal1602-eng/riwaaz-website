import React from 'react';
import { InstagramIcon } from './Icons';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';
import Reveal from './Reveal';

export default function InstagramShowcase({ videoSrc = null }) {
  return (
    <section className="bg-secondary/40 border-y border-border/80 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header Block */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 text-maroon mb-3">
              <InstagramIcon size={18} />
              <span className="eyebrow tracking-[0.25em] text-maroon">{INSTAGRAM_HANDLE}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.1]">
              Follow our story on Instagram.
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground font-light leading-relaxed">
              Glimpses of quiet craftsmanship, artisan hands at work, new drop announcements, and everyday styling inspiration.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-maroon text-ivory px-8 py-4 rounded-[1px] tracking-[0.2em] text-xs uppercase font-sans font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:bg-burgundy inline-flex items-center gap-2.5 shrink-0 self-start md:self-end border border-gold/40 hover:border-gold"
          >
            <InstagramIcon size={16} className="text-gold group-hover:scale-110 transition-transform" />
            <span>Follow {INSTAGRAM_HANDLE}</span>
            <ArrowUpRight size={15} className="text-gold opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </Reveal>

        {/* Video Area (Ready for video to be added) */}
        {videoSrc && (
          <Reveal className="mt-6">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gold/30 shadow-2xl bg-ink">
              <video
                src={videoSrc}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Footer Callout */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-light">
            Tag <span className="text-maroon font-medium">#RiwaazByJiya</span> or <span className="text-maroon font-medium">{INSTAGRAM_HANDLE}</span> to be featured in our collective styling stories.
          </p>
        </div>
      </div>
    </section>
  );
}

