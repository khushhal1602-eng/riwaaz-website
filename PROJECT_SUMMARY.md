# RIWAAZ by Jiya — Complete Project Summary & Documentation

> **Official Brand Slogan**: *"Where timeless craft finds a modern soul."*  
> **Brand Philosophy**: *"Riwaaz — a tradition, carried forward. Rooted in where we come from, yet designed for where we're going."*

---

## 1. Brand Contact & Communication Touchpoints

- **Official Email**: `sachdevajiya2005@gmail.com` (configured in `src/data/products.js`, Header, Footer, and Contact page)
- **WhatsApp Direct**: `+91 95493 05678` (display: `+91 95493 05678`, automated order formatting)
- **Official Instagram**: `https://www.instagram.com/riwaazbyjiya?stkn=MTJ1d2pvamV2ZjAyMw==`
- **Instagram Handle**: `@riwaazbyjiya`

---

## 2. Product Capsule Catalog (Sizes 36–39)

1. **Cycle Embroidered Denim Jutti** (`EDITION 01`)
   - Price: ₹2,499 (Original: ₹2,999)
   - Materials: 100% Genuine Leather, Indigo Raw Denim, Hand-worked Floral Silk Floss Embroidery
   - Signature Motif: Vintage Floral Bicycle Basket
2. **Chai Teapot Embroidered Denim Jutti** (`EDITION 02`)
   - Price: ₹2,499 (Original: ₹2,999)
   - Materials: 100% Genuine Leather, Deep Indigo Denim, Hand-stitched Chai Kettle Motif
   - Signature Motif: Vintage Heritage Chai Kettle
3. **Cycle Embroidered Natural Jute Jutti** (`EDITION 03`)
   - Price: ₹2,499 (Original: ₹2,999)
   - Materials: 100% Genuine Leather, Hand-woven Natural Jute Fabric, Silk Threadwork
   - Signature Motif: Vintage Floral Bicycle Basket
4. **Chai Teapot Embroidered Natural Jute Jutti** (`EDITION 04`)
   - Price: ₹2,499 (Original: ₹2,999)
   - Materials: 100% Genuine Leather, Organic Textured Jute, Fine Artisanal Embroidery
   - Signature Motif: Heritage Chai Kettle

---

## 3. Key Pages & Features

### A. Homepage (`src/pages/Home.jsx`)
- **Brand Entrance Overlay**: Luxury introductory splash animation shown once per session (`BrandEntrance.jsx`).
- **Hero Section**: High-contrast editorial hero with tagline, CTA buttons, and Instagram frosted pill (`HeroSection.jsx`).
- **Royal Couture Campaign**: 5-chapter narrative journey with Ken Burns camera movement, hairlines, and edition breakdowns (`CinematicCampaignExperience.jsx`).
- **Debut Capsule Grid**: Staggered product cards with hover zoom and quick-add to bag (`ProductCard.jsx`).
- **Full-Screen Scroll Expansion ("Every stitch an heirloom. Every step a legacy.")**:
  - Background image: `/images/riwaaz-heirloom-legacy.jpg` (denim & jute pairs on brass platter with black Riwaaz box and lantern).
  - Atmospheric soft blur (`blur-[3.5px] scale-105`) with deep radial vignette.
  - Frosted glass spotlight card focusing prominently on the narrative typography.
- **Craftsmanship Anatomy**: Interactive scroll breakdown of leather soles, hand embroidery, double cushioning, and artisan lasting (`StickyStorytelling.jsx`).
- **Official Launch Film Showcase**: Dedicated vertical video player looping the 46s vertical fashion campaign film with play/pause and sound controls (`LaunchVideoSection.jsx`).
- **Modern Versatility Section**:
  - Radiant gold couture insignia badge: `✦ MODERN VERSATILITY ✦`.
  - Liquid-gold headline accent: *"Not just for occasions."*
  - High-contrast copy highlighting styling with raw denim, dresses, and kurtas.
  - 4 occasion tags: *Everyday Denim*, *Festive Celebrations*, *Handcrafted Comfort*, *Contemporary Heritage*.
- **Atelier Walkthrough**: Multi-phase camera pan across high-res artisan workshop composition (`AtelierWalkthrough.jsx`).
- **Instagram Editorial Showcase**: 5-photo atelier visual grid with preview tags and follow CTA (`InstagramShowcase.jsx`).
- **Final Closing Statement**: High-contrast gold-trimmed CTA leading to the full collection.

### B. Two-Step Checkout & Customer Details Form (`src/components/CartDrawer.jsx`)
- **Step 1 (Bag)**: Review selected pairs, sizes (36–39), and quantities.
- **Step 2 (Delivery Form)**:
  - Full Name (Required)
  - Mobile Number (Required, 10-digit validation with `+91`)
  - Email Address (Optional, validated if provided)
  - Complete Delivery Address (Required)
  - City & State (Required)
  - PIN Code (Required, 6-digit postal validation)
- **Data Persistence**: Customer details and last order saved to browser `localStorage` for returning visits.
- **WhatsApp Order Integration**: Submitting the form automatically generates a structured WhatsApp message with customer name, phone number, address, itemized products with sizes, and total order value.

### C. Collection Page (`src/pages/Collection.jsx`)
- Complete product showcase with filter by material (Denim / Jute) and instant add-to-bag.

### D. Product Detail Page (`src/pages/ProductDetail.jsx`)
- High-res photography gallery, size selector (36–39), detailed craftsmanship breakdown, direct WhatsApp styling inquiry, and Instagram DM link.

### E. Brand Story Page (`src/pages/Story.jsx`)
- Complete editorial text celebrating Punjabi heritage, slow artisanal shoe-making, and modern design philosophy.

### F. Contact Page (`src/pages/Contact.jsx`)
- WhatsApp direct support card.
- Official Email card (`mailto:sachdevajiya2005@gmail.com`) with hover gold-border micro-interactions.
- Instagram card linking to `@riwaazbyjiya`.
- Personal message inquiry form.

---

## 4. Local Development & Production Commands

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  *(Default port: `http://localhost:3001` or `http://localhost:5173`)*

- **Build Production Bundle**:
  ```bash
  npm run build
  ```
  *(Generates production-ready bundle into `dist/` directory)*

- **Preview Production Build**:
  ```bash
  npm run preview
  ```
