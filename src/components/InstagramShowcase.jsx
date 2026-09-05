import React from 'react';
import { InstagramIcon } from './Icons';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';
import Reveal from './Reveal';

const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    image: '/images/atelier-flatlay-studio.jpg',
    caption: 'Four pairs. A circle of generations, leather, and quiet tradition.',
    tag: 'The Collection',
  },
  {
    id: 'post-2',
    image: '/images/jutti-embroidery-detail.png',
    caption: 'Every single flower basket motif stitched thread by thread.',
    tag: 'Hand Embroidery',
  },
  {
    id: 'post-3',
    image: '/images/DSC4609.jpg',
    caption: 'Denim on a weekday. Tradition made for the rhythm of modern life.',
    tag: 'Everyday Styling',
  },
  {
    id: 'post-4',
    image: '/images/jutti-jute-box-lifestyle.png',
    caption: 'Each pair arrives wrapped in our signature maroon & gold atelier box.',
    tag: 'The Packaging',
  },
  {
    id: 'post-5',
    image: '/images/DSC4628.jpg',
    caption: 'The iconic cycle motif on natural jute texture. 100% genuine leather.',
    tag: 'Atelier Details',
  },
];

export default function InstagramShowcase() {
  return (
    <section className="bg-secondary/40 border-y border-border/80 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header Block */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
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

        {/* 5-Column Visual Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <Reveal key={post.id} delay={idx * 70}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-secondary border border-border/70 rounded-sm shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-500"
              >
                {/* Image */}
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Tag Badge (Always visible on mobile, elevated on hover) */}
                <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-ink/75 backdrop-blur-sm text-ivory text-[0.6rem] uppercase tracking-wider font-sans rounded-xs opacity-90 group-hover:bg-maroon group-hover:text-gold transition-colors duration-300">
                  {post.tag}
                </span>

                {/* Luxury Frosted Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-ivory z-20">
                  <div className="self-end">
                    <span className="w-8 h-8 rounded-full bg-ivory/15 backdrop-blur-md flex items-center justify-center text-gold border border-gold/40">
                      <InstagramIcon size={14} />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-light text-ivory/90 line-clamp-2 leading-relaxed">
                      {post.caption}
                    </p>
                    <span className="mt-2 text-[0.65rem] tracking-widest text-gold uppercase flex items-center gap-1 font-medium">
                      View on Instagram <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

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
