import React, { useState } from 'react';
import Reveal from '../components/Reveal';
import { MessageCircle, Mail, ArrowUpRight, ShieldCheck, Send, Ruler } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { WHATSAPP_DISPLAY, createWhatsAppLink, INSTAGRAM_URL, INSTAGRAM_HANDLE, OFFICIAL_EMAIL } from '../data/products';
import SizeChartModal from '../components/SizeChartModal';

export default function Contact() {
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    topic: 'Size & Fit Inquiry',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = `Hi Riwaaz! My name is ${formData.name || 'Customer'}.\n\nTopic: ${formData.topic}\nMessage: ${formData.message}`;
    window.open(createWhatsAppLink(query), '_blank');
  };

  const defaultWhatsAppLink = createWhatsAppLink("Hi Riwaaz! I'd like to know more about your juttis.");

  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-32 pb-28 md:px-10 md:pt-44 md:pb-40">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-maroon">Contact</p>
        <h1 className="mt-5 font-display text-5xl md:text-7xl text-ink">
          Talk to us directly.
        </h1>
        <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed font-light">
          Orders, sizing questions and custom requests are handled personally over WhatsApp.
        </p>
      </Reveal>

      <div className="rule-gold my-14" />

      {/* Direct Contact Methods */}
      <div className="grid gap-12 md:grid-cols-3">
        <Reveal>
          <a
            href={defaultWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-secondary/40 border border-border/70 rounded h-full flex flex-col justify-between group hover:border-gold/60 hover:bg-secondary/70 transition-all duration-300 shadow-sm hover:shadow-md block"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-ivory transition-colors">
                  <MessageCircle size={22} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600/10 border border-emerald-600/25 text-emerald-800 text-[10px] tracking-wider uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Live Concierge</span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="eyebrow text-muted-foreground">WhatsApp Direct</h2>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-maroon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <p className="mt-4 font-display text-2xl md:text-3xl text-ink group-hover:text-maroon transition-colors font-medium">
                {WHATSAPP_DISPLAY}
              </p>

              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Direct personal line for real-time sizing recommendations, custom requests, live video previews, and order support.
              </p>

              <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-2 text-[11px] text-muted-foreground/90">
                <span className="text-gold">✦</span>
                <span>Mon–Sat, 10:00 AM – 8:00 PM IST · Priority response</span>
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-maroon group-hover:text-gold transition-colors">
              <span>Chat on WhatsApp</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </Reveal>

        <Reveal delay={80}>
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="p-8 bg-secondary/40 border border-border/70 rounded h-full flex flex-col justify-between group hover:border-gold/60 hover:bg-secondary/70 transition-all duration-300 shadow-sm hover:shadow-md block"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center text-maroon mb-4 group-hover:bg-maroon group-hover:text-ivory transition-colors">
                <Mail size={22} />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="eyebrow text-muted-foreground">Email</h2>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-maroon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="mt-4 font-display text-lg sm:text-xl md:text-2xl text-ink group-hover:text-maroon transition-colors break-all">
                {OFFICIAL_EMAIL}
              </p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                For customer orders, custom requests, partnerships, and press.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-maroon group-hover:text-gold transition-colors">
              <span>Send an Email</span>
              <ArrowUpRight size={14} />
            </span>
          </a>
        </Reveal>

        <Reveal delay={160}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-secondary/40 border border-border/70 rounded h-full flex flex-col justify-between group hover:border-gold/60 hover:bg-secondary/70 transition-all duration-300 shadow-sm hover:shadow-md block"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center text-maroon mb-4 group-hover:bg-maroon group-hover:text-ivory transition-colors">
                <InstagramIcon size={22} />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="eyebrow text-muted-foreground">Instagram</h2>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-maroon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="mt-4 font-display text-2xl text-ink group-hover:text-maroon transition-colors">
                {INSTAGRAM_HANDLE}
              </p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Behind the scenes, styling inspirations, and craft journals. Follow our journey.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-maroon group-hover:text-gold transition-colors">
              Visit Profile &rarr;
            </span>
          </a>
        </Reveal>
      </div>

      {/* Interactive WhatsApp Quick Query Form & Policy */}
      <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-6 bg-secondary/30 p-8 md:p-10 border border-border/80 rounded">
          <h2 className="font-display text-3xl text-ink mb-2">Send a Message</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Fill in your query and we'll instantly open WhatsApp with your message pre-formatted.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-sans">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-3 bg-ivory border border-border focus:border-gold focus:outline-none text-sm rounded"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-sans">
                Subject
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-3 bg-ivory border border-border focus:border-gold focus:outline-none text-sm rounded"
              >
                <option value="Size & Fit Inquiry">Size & Fit Inquiry</option>
                <option value="Order Status">Order Status</option>
                <option value="Exchange Request">Exchange Request</option>
                <option value="General Question">General Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1 font-sans">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we assist you with your jutti selection?"
                className="w-full px-4 py-3 bg-ivory border border-border focus:border-gold focus:outline-none text-sm rounded"
              />
            </div>

            <button
              type="submit"
              className="eyebrow bg-maroon text-ivory w-full py-4.5 flex items-center justify-center gap-2 hover:bg-burgundy transition-colors shadow-md"
            >
              <Send size={15} />
              <span>Connect via WhatsApp</span>
            </button>
          </form>
        </Reveal>

        <Reveal className="lg:col-span-6 space-y-6" delay={100}>
          <div className="p-8 border border-border/80 bg-ivory rounded">
            <h2 className="font-display text-3xl text-maroon mb-4">Sizing & exchanges</h2>
            <div className="flex items-start gap-3 text-sm text-ink mb-4">
              <ShieldCheck size={20} className="text-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Sizes 36, 37, 38 and 39. If your jutti doesn't fit, we'll replace it in the correct size within 7 days.
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground font-light">
              Because leather naturally expands and softens around the contours of your feet, our juttis are crafted to fit snug initially. If your pair doesn't fit comfortably, we replace it in the correct size within 7 days.
            </p>
            <div className="mt-6 pt-5 border-t border-border/80">
              <button
                type="button"
                onClick={() => setShowSizeModal(true)}
                className="eyebrow bg-maroon text-ivory px-5 py-3 text-xs inline-flex items-center gap-2 hover:bg-burgundy transition-colors shadow-xs"
              >
                <Ruler size={14} />
                <span>View Full Size Chart & Guide</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Sizing Chart Modal */}
      <SizeChartModal
        isOpen={showSizeModal}
        onClose={() => setShowSizeModal(false)}
      />
    </section>
  );
}
