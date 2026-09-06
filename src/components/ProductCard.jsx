import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatINR } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const delay = (index % 4) * 0.1; // 0ms, 100ms, 200ms, 300ms

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1.0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 0.85,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="will-change-transform"
    >
      <Link
        to={`/collection/${product.slug}`}
        className="group block transition-transform duration-500 ease-out hover:-translate-y-1.5"
        aria-label={`${product.name}, ${formatINR(product.price)} — view details`}
      >
        <div className="relative aspect-4/5 overflow-hidden bg-secondary border border-border/60 transition-all duration-500 group-hover:border-gold/80 group-hover:shadow-2xl rounded-sm">
          <motion.img
            src={product.thumbnail}
            alt={product.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03] will-change-transform"
          />
          <div className="absolute top-3.5 left-3.5 bg-ivory/95 backdrop-blur-md px-3 py-1 text-[0.62rem] tracking-widest uppercase text-maroon font-sans border border-border/70 shadow-sm">
            100% Handmade Jutti
          </div>
          <div className="absolute bottom-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-maroon text-ivory p-2.5 rounded-full shadow-lg group-hover:scale-105">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="flex items-start justify-between gap-6 pt-5">
          <div className="min-w-0">
            <h3 className="font-display text-xl md:text-2xl leading-snug text-ink group-hover:text-maroon transition-colors duration-300">
              {product.name}
            </h3>
            <span className="link-underline mt-3 inline-block text-[0.68rem] tracking-[0.22em] text-muted-foreground uppercase font-medium">
              View details
            </span>
          </div>
          <p className="shrink-0 pt-1 font-sans text-base tracking-wide text-ink font-medium">
            {formatINR(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
