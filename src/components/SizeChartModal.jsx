import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { SIZE_CHART, MEASURING_STEPS } from '../data/products';

export default function SizeChartModal({
  isOpen,
  onClose,
  selectedSize,
  onSelectSize,
}) {
  const [activeTab, setActiveTab] = useState('table'); // 'table' | 'visual'

  // Close on Escape key press & prevent background scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Luxury Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden bg-[#FAF6F0] border border-gold/40 shadow-2xl rounded-sm my-8"
          >
            {/* Antique Gold Architectural Hairlines */}
            <div
              className="absolute inset-[6px] border border-gold/20 pointer-events-none rounded-[1px]"
              aria-hidden="true"
            />

            {/* Modal Header */}
            <div className="relative px-6 pt-8 pb-4 text-center border-b border-border/80">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close size chart"
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-maroon transition-colors rounded-full hover:bg-black/5"
              >
                <X size={20} />
              </button>

              <div className="flex items-center justify-center gap-2 mb-2 text-gold">
                <span className="text-xs">✦</span>
                <span className="eyebrow text-xs tracking-[0.25em]">PERFECT FIT GUIDE</span>
                <span className="text-xs">✦</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-maroon font-medium">
                Jutti Size Chart
              </h2>
              <p className="mt-1 text-xs tracking-widest uppercase text-muted-foreground font-light">
                Find your exact comfort & fit
              </p>

              {/* View Mode Toggle Tabs */}
              <div className="mt-5 inline-flex p-1 bg-secondary/60 rounded-sm border border-border/80">
                <button
                  type="button"
                  onClick={() => setActiveTab('table')}
                  className={`px-4 py-1.5 text-xs uppercase tracking-wider font-sans transition-all duration-200 rounded-xs ${
                    activeTab === 'table'
                      ? 'bg-maroon text-ivory shadow-sm'
                      : 'text-muted-foreground hover:text-ink'
                  }`}
                >
                  Size Table & Guide
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('visual')}
                  className={`px-4 py-1.5 text-xs uppercase tracking-wider font-sans transition-all duration-200 rounded-xs ${
                    activeTab === 'visual'
                      ? 'bg-maroon text-ivory shadow-sm'
                      : 'text-muted-foreground hover:text-ink'
                  }`}
                >
                  Illustrated Chart
                </button>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto space-y-6">
              {activeTab === 'table' ? (
                <>
                  {/* Luxury Sizing Table */}
                  <div className="overflow-hidden border border-border rounded-sm shadow-sm">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-maroon text-ivory">
                          <th className="py-3 px-4 font-sans text-xs uppercase tracking-wider font-medium border-r border-burgundy/40">
                            Size (UK / IND)
                          </th>
                          <th className="py-3 px-4 font-sans text-xs uppercase tracking-wider font-medium">
                            Foot Length (cm)
                          </th>
                          {onSelectSize && (
                            <th className="py-3 px-4 font-sans text-xs uppercase tracking-wider font-medium border-l border-burgundy/40">
                              Select
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/80 bg-ivory/60 font-sans text-sm">
                        {SIZE_CHART.map(({ size, length }) => {
                          const isSelected = selectedSize === size;
                          return (
                            <tr
                              key={size}
                              className={`transition-colors hover:bg-gold/10 ${
                                isSelected ? 'bg-gold/15 font-semibold text-maroon' : 'text-ink'
                              }`}
                            >
                              <td className="py-3.5 px-4 border-r border-border/80 font-display text-xl">
                                {size}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-sm tracking-wide text-ink">
                                {length}
                              </td>
                              {onSelectSize && (
                                <td className="py-2.5 px-4 border-l border-border/80">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onSelectSize(size);
                                      onClose();
                                    }}
                                    className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm transition-all ${
                                      isSelected
                                        ? 'bg-maroon text-ivory shadow-xs'
                                        : 'border border-border text-muted-foreground hover:border-maroon hover:text-maroon'
                                    }`}
                                  >
                                    {isSelected ? 'Chosen' : 'Choose'}
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Measuring Guide: 3 Easy Steps */}
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-px bg-gold/60" />
                      <h3 className="font-display text-xl text-maroon font-medium text-center">
                        How to Measure Your Foot
                      </h3>
                      <span className="w-8 h-px bg-gold/60" />
                    </div>

                    <div className="space-y-3.5">
                      {MEASURING_STEPS.map(({ step, text }) => (
                        <div key={step} className="flex items-start gap-3.5 bg-ivory/80 border border-border/60 p-3 rounded-sm">
                          <span className="w-6 h-6 rounded-full bg-maroon text-ivory font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {step}
                          </span>
                          <p className="text-xs sm:text-sm text-ink leading-relaxed font-light">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual diagram thumbnail */}
                  <div className="mt-4 p-4 bg-secondary/40 border border-border/80 rounded-sm flex items-center justify-center">
                    <img
                      src="/images/jutti-size-chart.png"
                      alt="Foot length measurement diagram against wall"
                      className="max-h-48 w-auto object-contain rounded-xs shadow-xs"
                    />
                  </div>
                </>
              ) : (
                /* Full Graphic Image View */
                <div className="flex flex-col items-center justify-center">
                  <div className="border border-border shadow-md rounded-xs overflow-hidden bg-white p-2">
                    <img
                      src="/images/jutti-size-chart.png"
                      alt="Full official Riwaaz Jutti Size Chart"
                      className="w-full max-h-[60vh] object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Sizing & Replacement Assurance */}
              <div className="flex items-start gap-3 bg-gold/10 border border-gold/30 p-3.5 rounded-sm text-xs text-ink/90">
                <ShieldCheck size={18} className="text-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Snug Fit Tip:</strong> Genuine leather gently stretches and conforms to your feet within 1–2 wears. If your pair doesn't fit comfortably, we'll replace it in the correct size <strong>within 7 days</strong> free of hassle.
                </p>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="px-6 py-4 bg-secondary/50 border-t border-border flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-mono">
                Sizes 36 · 37 · 38 · 39
              </p>
              <button
                type="button"
                onClick={onClose}
                className="eyebrow bg-maroon text-ivory px-6 py-2.5 text-xs hover:bg-burgundy transition-colors shadow-xs"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
