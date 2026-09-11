import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { WHATSAPP_DISPLAY, createWhatsAppLink, INSTAGRAM_URL, INSTAGRAM_HANDLE, OFFICIAL_EMAIL } from '../data/products';

export default function Footer() {
  const whatsAppGeneralLink = createWhatsAppLink("Hi Riwaaz! I'd like to know more about your juttis.");

  return (
    <footer className="bg-ink text-ivory/90 border-t border-white/10 pt-20 pb-12 grain">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 pb-16 border-b border-white/10">
          {/* Brand Philosophy */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/">
              <img
                src="/images/riwaaz-logo.png"
                alt="RIWAAZ by Jiya"
                className="h-14 w-auto brightness-150"
              />
            </Link>
            <p className="font-display text-2xl text-ivory/90">Tradition, Reimagined.</p>
            <p className="text-sm leading-relaxed text-ivory/60 max-w-sm">
              Handcrafted Indian juttis in 100% genuine leather with handmade embroidery. A deliberately small capsule of four signature designs.
            </p>
            <div className="pt-2 text-xs text-gold/90 flex items-center gap-2">
              <span>✦</span>
              <span>If your jutti doesn't fit, we'll replace it in the correct size within 7 days.</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <p className="eyebrow text-gold">Navigation</p>
            <ul className="space-y-3 pt-2 text-sm">
              <li>
                <Link to="/" className="text-ivory/70 hover:text-ivory transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-ivory/70 hover:text-ivory transition-colors">
                  The Collection
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-ivory/70 hover:text-ivory transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ivory/70 hover:text-ivory transition-colors">
                  Contact & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Order & Enquiries */}
          <div className="md:col-span-4 space-y-4">
            <p className="eyebrow text-gold">Order & Enquiries</p>
            <div className="space-y-4 pt-2">
              <a
                href={whatsAppGeneralLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-ivory/80 hover:text-gold transition-colors group"
              >
                <MessageCircle size={16} className="text-gold" />
                <span>WhatsApp {WHATSAPP_DISPLAY}</span>
                <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="flex items-center gap-2 text-sm text-ivory/80 hover:text-gold transition-colors group"
              >
                <Mail size={16} className="text-gold" />
                <span>{OFFICIAL_EMAIL}</span>
                <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-ivory/80 hover:text-gold transition-colors group"
              >
                <InstagramIcon size={16} className="text-gold group-hover:scale-110 transition-transform" />
                <span>Instagram {INSTAGRAM_HANDLE}</span>
                <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} RIWAAZ by Jiya. All rights reserved.</p>
          <p className="tracking-wider uppercase text-[0.65rem]">100% Handmade Jutti · Punjab, India</p>
        </div>
      </div>
    </footer>
  );
}
