import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Mail } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { useCart } from '../context/CartContext';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, OFFICIAL_EMAIL } from '../data/products';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Our Story', path: '/story' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-border/80 py-3.5'
          : 'bg-gradient-to-b from-burgundy/85 via-burgundy/40 to-transparent text-ivory py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 transition-colors z-10 ${
            isScrolled ? 'text-ink hover:text-maroon' : 'text-ivory hover:text-gold'
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo - Prominently Centered on Mobile, Elegant on Desktop */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-10 flex items-center justify-center group transition-transform duration-300 hover:scale-[1.03]"
          aria-label="Riwaaz - Home"
        >
          <img
            src="/images/riwaaz-logo.png"
            alt="RIWAAZ by Jiya"
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled
                ? 'h-11 sm:h-12 md:h-12 lg:h-13 drop-shadow-[0_2px_8px_rgba(61,12,17,0.18)] brightness-95 group-hover:brightness-110'
                : 'h-13 sm:h-14 md:h-15 lg:h-17 drop-shadow-[0_2px_16px_rgba(201,168,106,0.55)] brightness-110 group-hover:brightness-125'
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`eyebrow transition-all duration-200 link-underline text-xs ${
                  isScrolled
                    ? isActive
                      ? 'text-maroon font-semibold'
                      : 'text-ink/80 hover:text-ink'
                    : isActive
                    ? 'text-gold font-semibold'
                    : 'text-ivory/90 hover:text-ivory'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Instagram Link + Cart Bag Button */}
        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
              isScrolled
                ? 'border-border text-ink hover:border-gold hover:text-maroon hover:bg-secondary/60'
                : 'border-ivory/30 text-ivory hover:border-gold hover:text-gold hover:bg-white/10'
            }`}
            aria-label={`Follow Riwaaz by Jiya on Instagram ${INSTAGRAM_HANDLE}`}
            title={`Instagram ${INSTAGRAM_HANDLE}`}
          >
            <InstagramIcon size={16} />
          </a>

          <button
            type="button"
            onClick={openDrawer}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${
              isScrolled
                ? 'border-border text-ink hover:border-gold hover:bg-secondary/60'
                : 'border-ivory/30 text-ivory hover:border-gold hover:text-gold'
            }`}
            aria-label={`Shopping bag with ${totalItems} items`}
          >
            <ShoppingBag size={17} />
            <span className="text-xs font-sans tracking-wider uppercase font-medium">
              {totalItems > 0 ? `(${totalItems})` : 'Cart'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory border-b border-border px-6 py-8 shadow-2xl animate-fadeIn text-ink">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`eyebrow text-sm py-2 border-b border-border/40 ${
                  location.pathname === link.path ? 'text-maroon font-semibold' : 'text-ink/80 hover:text-ink'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="eyebrow bg-maroon text-ivory px-6 py-4 text-center hover:bg-burgundy transition-colors"
              >
                View Cart ({totalItems})
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gold/40 text-maroon px-6 py-3.5 text-center text-xs uppercase tracking-widest font-sans font-medium hover:bg-gold/10 transition-colors"
              >
                <InstagramIcon size={16} />
                <span>Follow {INSTAGRAM_HANDLE}</span>
              </a>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="flex items-center justify-center gap-2 text-ink/75 hover:text-maroon py-2 text-xs font-sans tracking-wide transition-colors"
              >
                <Mail size={14} className="text-maroon" />
                <span>{OFFICIAL_EMAIL}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
