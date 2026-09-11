import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

export default function Collection() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-32 pb-24 md:px-10 md:pt-44 md:pb-36">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-maroon">The Collection</p>
        <h1 className="mt-5 font-display text-5xl md:text-7xl text-ink">
          A capsule of four.
        </h1>
        <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed font-light">
          Each design is completely handmade in 100% genuine leather, with embroidery worked entirely by hand. Sizes 36–39.
        </p>
      </Reveal>

      <div className="rule-gold my-14" />

      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
        {PRODUCTS.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </section>
  );
}
