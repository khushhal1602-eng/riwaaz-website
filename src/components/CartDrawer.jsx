import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../data/products';

const CUSTOMER_STORAGE_KEY = 'riwaaz_customer_details';

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    generateWhatsAppOrderLink,
  } = useCart();

  // Navigation step: 'cart' | 'details'
  const [step, setStep] = useState('cart');

  // Customer Form State with local storage pre-fill
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      fullName: '',
      mobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    };
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset step to 'cart' whenever drawer opens
  useEffect(() => {
    if (isDrawerOpen) {
      setStep('cart');
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  // Form Field Change Handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field on typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Form Validation Logic
  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    // 2. Mobile Number (10 digits Indian mobile number)
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (cleanMobile.length !== 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    } else if (!/^[6-9]/.test(cleanMobile)) {
      newErrors.mobile = 'Mobile number must start with 6, 7, 8, or 9';
    }

    // 3. Email Address (Optional)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // 4. Complete Delivery Address
    if (!formData.address || formData.address.trim().length < 6) {
      newErrors.address = 'Please enter complete delivery address';
    }

    // 5. City
    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = 'City is required';
    }

    // 6. State
    if (!formData.state || formData.state.trim().length < 2) {
      newErrors.state = 'State is required';
    }

    // 7. PIN Code (6 digits)
    const cleanPin = formData.pincode.replace(/\D/g, '');
    if (!cleanPin) {
      newErrors.pincode = 'PIN Code is required';
    } else if (cleanPin.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit & Continue to WhatsApp
  const handleDetailsSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Cleaned payload
    const cleanedCustomer = {
      fullName: formData.fullName.trim(),
      mobile: formData.mobile.replace(/\D/g, ''),
      email: formData.email ? formData.email.trim() : '',
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.replace(/\D/g, ''),
    };

    // Save customer details for future orders
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(cleanedCustomer));
      localStorage.setItem(
        'riwaaz_last_order',
        JSON.stringify({
          items,
          subtotal,
          customer: cleanedCustomer,
          createdAt: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.warn('Could not save details to localStorage', err);
    }

    // Generate WhatsApp order URL with full customer details
    const whatsAppUrl = generateWhatsAppOrderLink(cleanedCustomer);

    // Open WhatsApp in new tab
    window.open(whatsAppUrl, '_blank');

    // Close drawer
    closeDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart and Checkout"
        className="relative z-10 w-full max-w-md bg-ivory text-ink flex flex-col h-full shadow-2xl border-l border-border transition-transform duration-300 ease-out"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/80 bg-secondary/40">
          <div className="flex items-center gap-3">
            {step === 'details' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="p-1.5 -ml-1 text-ink/70 hover:text-maroon hover:bg-secondary rounded-full transition-colors"
                aria-label="Back to selection"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <h2 className="font-display text-2xl text-ink">
                {step === 'cart' ? 'Your selection' : 'Delivery details'}
              </h2>
              <p className="eyebrow text-muted-foreground mt-0.5 text-[0.65rem]">
                {step === 'cart'
                  ? `${totalItems} ${totalItems === 1 ? 'Pair' : 'Pairs'} Selected`
                  : 'Step 2 of 2 · Complete to order'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            className="p-2 text-ink/70 hover:text-maroon hover:bg-secondary rounded-full transition-colors"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: CART ITEMS VIEW */}
        {step === 'cart' && (
          <>
            {/* Drawer Body: Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-2">
                    <ShieldCheck size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-maroon">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Four pairs. Handmade, one stitch at a time. Discover the curated capsule.
                  </p>
                  <Link
                    to="/collection"
                    onClick={closeDrawer}
                    className="eyebrow bg-maroon px-6 py-4 text-ivory transition-colors hover:bg-burgundy mt-4 inline-flex items-center gap-2"
                  >
                    <span>View the collection</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border/60">
                  {items.map((item) => (
                    <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex gap-4">
                      {/* Thumbnail */}
                      <Link
                        to={`/collection/${item.slug}`}
                        onClick={closeDrawer}
                        className="w-20 h-24 shrink-0 overflow-hidden bg-secondary border border-border/60 rounded"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              to={`/collection/${item.slug}`}
                              onClick={closeDrawer}
                              className="font-display text-lg text-ink hover:text-maroon leading-snug line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-red-700 p-1 transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-1 flex items-center gap-3">
                            <span className="inline-block px-2 py-0.5 text-[0.65rem] tracking-wider uppercase bg-secondary text-ink font-sans border border-border/70 rounded">
                              Size UK/IND {item.size}
                            </span>
                            <span className="text-xs text-muted-foreground">100% Genuine Leather</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center border border-border rounded">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-ink/70 hover:text-ink hover:bg-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="px-2 text-xs font-medium">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-ink/70 hover:text-ink hover:bg-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <p className="font-sans text-sm font-medium tracking-wide text-ink">
                            {formatINR(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer & Place Order CTA */}
            {items.length > 0 && (
              <div className="border-t border-border bg-secondary/30 px-6 py-5 space-y-4">
                <div className="flex items-start gap-2.5 bg-ivory/80 border border-border/80 p-3 text-xs text-muted-foreground rounded">
                  <ShieldCheck size={18} className="text-gold shrink-0 mt-0.5" />
                  <p>
                    <strong>Guaranteed Perfect Fit:</strong> If your jutti doesn't fit, we'll replace it in the correct size free of hassle.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="eyebrow text-muted-foreground">Estimated Total</span>
                  <span className="font-display text-2xl text-ink font-medium">{formatINR(subtotal)}</span>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  {/* Primary Button: Transition to Customer Details Form */}
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="eyebrow bg-maroon text-ivory px-6 py-4.5 text-center flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-burgundy shadow-md hover:-translate-y-0.5"
                  >
                    <span>Place Order</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="flex justify-between items-center pt-1 text-xs">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-maroon underline text-[0.68rem] tracking-wider uppercase"
                    >
                      Clear Selection
                    </button>
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="text-muted-foreground hover:text-ink underline text-[0.68rem] tracking-wider uppercase"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* STEP 2: CUSTOMER & DELIVERY DETAILS FORM */}
        {step === 'details' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Scrollable Form Body */}
            <form
              id="customer-details-form"
              onSubmit={handleDetailsSubmit}
              noValidate
              className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
            >
              {/* Order Summary Pill */}
              <div className="p-3 bg-secondary/50 border border-gold/35 rounded-xs flex items-center justify-between text-xs">
                <div>
                  <span className="text-muted-foreground">Ordering: </span>
                  <span className="font-medium text-ink">
                    {totalItems} {totalItems === 1 ? 'Pair' : 'Pairs'}
                  </span>
                </div>
                <div className="font-display text-base text-maroon font-semibold">
                  {formatINR(subtotal)}
                </div>
              </div>

              {/* 1. Full Name */}
              <div>
                <label
                  htmlFor="customer-full-name"
                  className="block text-xs font-medium uppercase tracking-wider text-ink mb-1.5"
                >
                  Full Name <span className="text-maroon">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-full-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full bg-white border px-3.5 py-2.5 text-sm text-ink outline-none rounded-xs transition-colors ${
                      errors.fullName
                        ? 'border-maroon focus:border-maroon ring-1 ring-maroon/20'
                        : 'border-border/80 focus:border-gold'
                    }`}
                  />
                  <User
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-[0.7rem] text-maroon font-sans">{errors.fullName}</p>
                )}
              </div>

              {/* 2. Mobile Number (10 digits) */}
              <div>
                <label
                  htmlFor="customer-mobile"
                  className="block text-xs font-medium uppercase tracking-wider text-ink mb-1.5"
                >
                  Mobile Number <span className="text-maroon">*</span>
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 text-xs font-mono text-muted-foreground bg-secondary/60 border border-r-0 border-border/80 rounded-l-xs">
                    +91
                  </span>
                  <input
                    id="customer-mobile"
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit phone number"
                    className={`w-full bg-white border px-3.5 py-2.5 text-sm text-ink outline-none rounded-r-xs transition-colors ${
                      errors.mobile
                        ? 'border-maroon focus:border-maroon ring-1 ring-maroon/20'
                        : 'border-border/80 focus:border-gold'
                    }`}
                  />
                  <Phone
                    size={15}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
                  />
                </div>
                {errors.mobile ? (
                  <p className="mt-1 text-[0.7rem] text-maroon font-sans">{errors.mobile}</p>
                ) : (
                  <p className="mt-1 text-[0.68rem] text-muted-foreground font-light">
                    For order confirmation & shipping updates
                  </p>
                )}
              </div>

              {/* 3. Email Address (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="customer-email"
                    className="block text-xs font-medium uppercase tracking-wider text-ink"
                  >
                    Email Address
                  </label>
                  <span className="text-[0.65rem] text-muted-foreground font-light lowercase tracking-normal">
                    (optional)
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="customer-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="e.g. priya@example.com"
                    className={`w-full bg-white border px-3.5 py-2.5 text-sm text-ink outline-none rounded-xs transition-colors ${
                      errors.email
                        ? 'border-maroon focus:border-maroon ring-1 ring-maroon/20'
                        : 'border-border/80 focus:border-gold'
                    }`}
                  />
                  <Mail
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-[0.7rem] text-maroon font-sans">{errors.email}</p>
                )}
              </div>

              {/* 4. Complete Delivery Address */}
              <div>
                <label
                  htmlFor="customer-address"
                  className="block text-xs font-medium uppercase tracking-wider text-ink mb-1.5"
                >
                  Complete Delivery Address <span className="text-maroon">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="customer-address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House/Flat No., Building/Apartment, Street name, Locality"
                    className={`w-full bg-white border px-3.5 py-2.5 text-sm text-ink outline-none rounded-xs transition-colors resize-none ${
                      errors.address
                        ? 'border-maroon focus:border-maroon ring-1 ring-maroon/20'
                        : 'border-border/80 focus:border-gold'
                    }`}
                  />
                  <MapPin
                    size={16}
                    className="absolute right-3.5 top-3 text-muted-foreground/60 pointer-events-none"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-[0.7rem] text-maroon font-sans">{errors.address}</p>
                )}
              </div>

              {/* 5 & 6. City and State (Side by side) */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="customer-city"
                    className="block text-xs font-medium uppercase tracking-wider text-ink mb-1.5"
                  >
                    City <span className="text-maroon">*</span>
                  </label>
                  <input
                    id="customer-city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g. Mumbai"
                    className={`w-full bg-white border px-3.5 py-2.5 text-sm text-ink outline-none rounded-xs transition-colors ${
                      errors.city
                        ? 'border-maroon focus:border-maroon ring-1 ring-maroon/20'
                        : 'border-border/80 focus:border-gold'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-[0.7rem] text-maroon font-sans">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customer-state"
                    className="block text-xs font-medium uppercase tracking-wider text-ink mb-1.5"
                  >
                    State <span className="text-maroon">*</span>
                  </label>
                  <input
                    id="customer-state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="e.g. Maharashtra"
                    className={`w-full bg-white border px-3.5 py-2.5 text-sm text-ink outline-none rounded-xs transition-colors ${
                      errors.state
                        ? 'border-maroon focus:border-maroon ring-1 ring-maroon/20'
                        : 'border-border/80 focus:border-gold'
                    }`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-[0.7rem] text-maroon font-sans">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* 7. PIN Code */}
              <div>
                <label
                  htmlFor="customer-pincode"
                  className="block text-xs font-medium uppercase tracking-wider text-ink mb-1.5"
                >
                  PIN Code <span className="text-maroon">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-pincode"
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                    placeholder="6-digit postal code"
                    className={`w-full bg-white border px-3.5 py-2.5 text-sm text-ink outline-none rounded-xs transition-colors ${
                      errors.pincode
                        ? 'border-maroon focus:border-maroon ring-1 ring-maroon/20'
                        : 'border-border/80 focus:border-gold'
                    }`}
                  />
                  <Building
                    size={15}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
                  />
                </div>
                {errors.pincode && (
                  <p className="mt-1 text-[0.7rem] text-maroon font-sans">{errors.pincode}</p>
                )}
              </div>
            </form>

            {/* Bottom Submit Action Bar */}
            <div className="border-t border-border bg-secondary/30 px-6 py-5 space-y-3">
              <button
                type="submit"
                form="customer-details-form"
                className="w-full eyebrow bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-4.5 text-center flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md hover:-translate-y-0.5 rounded-xs"
              >
                <MessageCircle size={19} className="fill-current" />
                <span className="font-semibold tracking-wider">Continue to WhatsApp Order</span>
              </button>

              <p className="text-[0.68rem] text-center text-muted-foreground leading-normal">
                Your details and selected juttis will be automatically prepared in WhatsApp.
              </p>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-muted-foreground hover:text-ink text-xs underline uppercase tracking-wider text-[0.65rem]"
                >
                  &larr; Back to Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
