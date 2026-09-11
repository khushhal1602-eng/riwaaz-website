import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import Reveal from './Reveal';

export default function StatsSection() {
  const stats = [
    {
      value: 100,
      suffix: '%',
      label: 'Genuine Leather',
      description: 'Upper, lining, and durable sole with zero synthetic shortcuts.',
    },
    {
      value: 4,
      suffix: '',
      label: 'Signature Silhouettes',
      description: 'A capsule where every design earns its place.',
    },
    {
      value: 18,
      suffix: '+',
      label: 'Hours Handcrafted',
      description: 'Dedicated single-needle stitching and lasting per pair.',
    },
    {
      value: 0,
      suffix: '',
      label: 'Compromises',
      description: 'Comfort, heritage integrity, and everyday elegance.',
    },
  ];

  return (
    <section className="bg-ivory py-20 md:py-28 border-y border-border/80">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <Reveal className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow text-maroon">Artisan Integrity</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink">
            Crafted Without Compromise.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 100} className="text-center">
              <div className="p-6 bg-secondary/30 rounded-sm border border-border/60 hover:border-gold transition-colors duration-300">
                <div className="font-display text-5xl md:text-6xl lg:text-7xl text-maroon font-light mb-3">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="eyebrow text-ink text-xs font-medium mb-2">{stat.label}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
