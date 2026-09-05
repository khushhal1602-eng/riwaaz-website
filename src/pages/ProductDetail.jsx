import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, formatINR, createWhatsAppLink, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { InstagramIcon } from '../components/Icons';
import { ShieldCheck, MessageCircle, ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { addItem, openDrawer } = useCart();
  const { addToast } = useToast();

  // Reset state and scroll to top when slug changes
  useEffect(() => {
    setSelectedSize(null);
    setSelectedImageIndex(0);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 py-32">
        <h1 className="font-display text-4xl text-maroon mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested jutti design could not be found in the capsule.</p>
        <Link to="/collection" className="eyebrow bg-maroon text-ivory px-8 py-4 hover:bg-burgundy">
          Return to Collection
        </Link>
      </div>
    );
  }

  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size first (UK/IND 36–39)', 'warning');
      return;
    }
    addItem(product.id, selectedSize, 1);
    addToast(`Added — ${product.name} (Size ${selectedSize})`, 'success');
  };

  const whatsAppDirectLink = createWhatsAppLink(
    `Hi Riwaaz! I'm interested in ordering the ${product.name}${
      selectedSize ? ` in size UK/IND ${selectedSize}` : ''
    }. Please share payment and delivery details.`
  );

  return (
    <>
      <article className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-10 md:pt-40">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            to="/collection"
            className="link-underline text-[0.68rem] tracking-[0.22em] text-muted-foreground uppercase inline-flex items-center gap-1 hover:text-ink"
          >
            <ArrowLeft size={13} />
            <span>The Collection</span>
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Product Image Gallery */}
          <div className="lg:col-span-7">
            <div className="aspect-4/5 overflow-hidden bg-secondary border border-border/60 shadow-lg relative group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.alt}
                className="h-full w-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm px-3 py-1.5 text-[0.65rem] tracking-widest uppercase text-maroon font-sans border border-border/60 shadow-sm">
                100% Genuine Leather
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View angle ${idx + 1}`}
                    className={`h-24 w-20 shrink-0 overflow-hidden border-2 transition-all duration-200 bg-secondary ${
                      selectedImageIndex === idx
                        ? 'border-gold shadow-md'
                        : 'border-border/60 opacity-70 hover:opacity-100 hover:border-border'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} — angle ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground italic">
              Authentic handmade Indian footwear. Small handcrafted variations are the unique signature of the artisan.
            </p>
          </div>

          {/* Product Info & Purchase Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h1 className="font-display text-4xl leading-tight md:text-5xl text-ink">
                {product.name}
              </h1>

              <p className="mt-4 font-sans text-2xl tracking-wide text-ink font-light">
                {formatINR(product.price)}
              </p>

              <div className="rule-gold my-8" />

              <p className="leading-relaxed text-muted-foreground text-sm md:text-base font-light">
                {product.description}
              </p>

              {/* Highlight Chips */}
              <ul className="mt-8 flex flex-wrap gap-2 text-[0.65rem] tracking-[0.18em] text-maroon uppercase">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="bg-secondary/70 border border-border/80 px-3 py-1.5 rounded-sm font-medium"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Size Selection */}
              <div className="mt-10">
                <fieldset>
                  <legend className="eyebrow text-muted-foreground mb-4">
                    Select size (UK / IND)
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => {
                      const isAvailable = product.availability[size] !== false;
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={!isAvailable}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedSize(size)}
                          className={`h-12 min-w-14 border px-4 font-sans text-sm tracking-widest transition-all duration-200 rounded-sm font-medium ${
                            isSelected
                              ? 'border-maroon bg-maroon text-ivory shadow-sm'
                              : 'border-border text-ink hover:border-gold hover:bg-secondary/40'
                          } ${!isAvailable ? 'cursor-not-allowed text-muted-foreground/40 line-through' : ''}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck size={16} className="text-gold shrink-0" />
                  <span>If your jutti doesn't fit, we'll replace it in the correct size.</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-10 flex flex-col gap-3.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="eyebrow bg-maroon px-8 py-5 text-ivory transition-all duration-300 hover:bg-burgundy shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} className="text-gold" />
                  <span>Add to Cart</span>
                </button>

                <a
                  href={whatsAppDirectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow border border-maroon px-8 py-5 text-center text-maroon transition-all duration-300 hover:bg-maroon hover:text-ivory flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  <span>Order via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={openDrawer}
                  className="link-underline mt-2 w-fit text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase self-center hover:text-ink"
                >
                  View Selection in Cart
                </button>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-maroon transition-colors py-1 group"
                >
                  <InstagramIcon size={14} className="text-gold group-hover:scale-110 transition-transform" />
                  <span>DM {INSTAGRAM_HANDLE} for styling & video previews</span>
                </a>
              </div>
            </div>

            {/* Specifications Details */}
            <dl className="mt-12 space-y-4 border-t border-border pt-8 text-sm">
              <div>
                <dt className="eyebrow text-muted-foreground">Materials</dt>
                <dd className="mt-1 font-light text-ink">{product.materials}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Craftsmanship</dt>
                <dd className="mt-1 font-light text-ink">{product.craftsmanship}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Care</dt>
                <dd className="mt-1 font-light text-muted-foreground">{product.careInstructions}</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>

      {/* Also in the capsule section */}
      <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10">
        <div className="rule-gold mb-14" />
        <h2 className="font-display text-3xl md:text-4xl text-ink">Also in the capsule</h2>
        <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-16">
          {otherProducts.map((p) => (
            <Reveal key={p.id}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-ivory/95 px-4 py-3 backdrop-blur md:hidden shadow-lg">
        <button
          type="button"
          onClick={handleAddToCart}
          className="eyebrow flex-1 bg-maroon px-4 py-4 text-ivory text-center"
        >
          Add to Cart
        </button>
        <a
          href={whatsAppDirectLink}
          target="_blank"
          rel="noreferrer"
          className="eyebrow flex-1 border border-maroon px-4 py-4 text-center text-maroon flex items-center justify-center gap-1.5"
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
