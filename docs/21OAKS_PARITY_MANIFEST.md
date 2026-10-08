# 21Oaks & SGMG Parity Master Manifest

This document serves as the single source of truth for the SGMG Luxury Residences web application, enabling instantaneous reference, rapid component scaffolding, and strict design/animation parity with `https://21oaks.org/`.

---

## 1. Brand Tokens & Typography Contract

### Typography
- **Headings & Badges:** `Michroma`, sans-serif (`font-family: var(--font-heading, "Michroma", sans-serif)`)
  - Used for all `h1`, `h2`, `h3`, `h4`, tags, button labels, time digits, and stat numbers.
  - Tracking: `-0.02em` to `-0.03em` for tight, architectural luxury feel.
- **Body & Captions:** `Plus Jakarta Sans`, sans-serif (`font-family: var(--font-body, "Plus Jakarta Sans", sans-serif)`)
  - Used for descriptions, FAQ answers, paragraphs, inputs, and legal copy.
  - Weights: `400` (Regular), `500` (Medium), `600` (Semi-bold), `700` (Bold).

### Color Palette
- **Primary Brand Blue:** `#2391cf` (SGMG Blue, used for hero accents, tags, buttons, scribble accents)
- **Deep Canvas (Dark/Night):** `#121214` (Used for dark sections, night mode in amenities, footer background)
- **Clean Canvas (Light):** `#ffffff` (Used for light sections, cards, modals)
- **Text Primary (Dark on Light):** `#121214` / `#292929`
- **Text Primary (Light on Dark):** `#ffffff` / `rgba(255, 255, 255, 0.95)`
- **Muted Body Text:** `#52525b` / `#71717a`
- **Border / Outline:** `rgba(0, 0, 0, 0.08)` (Light) / `rgba(255, 255, 255, 0.12)` (Dark)

---

## 2. Interactive Component Patterns

### Webflow-Style Dual-Arrow Pill Button
Desktop hover animation shifts `.text_box` left, hides right arrow with rotation/scale, reveals left arrow:
```html
<a href="/contact" class="button header_cta w-inline-block">
  <div class="icon_box is-left">
    <div class="arrow_icon"><!-- SVG arrow --></div>
  </div>
  <div class="text_box"><div>Schedule a Tour</div></div>
  <div class="icon_box is-right">
    <div class="arrow_icon"><!-- SVG arrow --></div>
  </div>
</a>
```

### Scribble System
Underlines text with animated SVG hand-drawn strokes:
- `data-scribble="1"`: `/assets/svg/scribble-1.svg`
- `data-scribble="2"`: `/assets/svg/scribble-2.svg`
- `data-scribble="3"`: `/assets/svg/scribble-3.svg`
- `data-scribble="4"`: `/assets/svg/scribble-4.svg`
- `data-scribble="5"`: `/assets/svg/scribble-5.svg`
- `data-scribble="hero"`: `/assets/svg/hero-svg.svg`

### Dynamic Header Theme Detection
Pages signal header color by putting `data-section="hero"`, `data-section="light"`, or `data-section="dark"` on `<main>` and top-level sections.
- `is-hero`: Transparent background, white logo, blurred glass menu trigger.
- `is-light`: White background or solid, dark logo, dark menu trigger.
- `is-dark`: Dark background, white logo, light menu trigger.

---

## 3. Route & Page Directory

| Route | Page Component | CSS Stylesheet | Key Features |
|---|---|---|---|
| `/` | `src/pages/HomePage.tsx` | `src/index.css` | Hero video, 3D interactive model, featured units, neighborhood preview, FAQs |
| `/apartments` | `src/pages/ApartmentsPage.tsx` | `src/index.css` | Residence catalog, bedrooms filter (2/3/4 BHK), price slider, Lightbox modal |
| `/apartments/:slug` | `src/pages/ApartmentDetailPage.tsx` | `src/apartment-detail.css` | Interactive floorplan, spec highlights, unit image slider, booking bar |
| `/amenities` | `src/pages/AmenitiesPage.tsx` | `src/amenities.css` | Architectural sketch + SVG route scroll draw, sticky Sun-Clock Lottie scrubber, Day/Night scrub, Pet section |
| `/location` | `src/pages/LocationPage.tsx` | `src/location.css` | Leaflet transit map, neighborhood slider, travel times (walk/bike/drive) |
| `/about` | `src/pages/HowToApplyPage.tsx` | `src/how-to-apply.css` | Brand heritage, philosophy, architectural craftsmanship, steps |
| `/gallery` | `src/pages/GalleryPage.tsx` | `src/index.css` | High-res image gallery, categorized tabs, full-screen lightbox |
| `/team` | `src/pages/TeamPage.tsx` | `src/index.css` | Leadership profiles, architecture partners, visionaries |
| `/careers` | `src/pages/CareersPage.tsx` | `src/index.css` | Open job roles, company culture, employee benefits, application modal |
| `/faq` | `src/pages/FaqPage.tsx` | `src/index.css` | Comprehensive project FAQs with category tabs and search |
| `/contact` | `src/pages/ContactPage.tsx` | `src/index.css` | Interactive inquiry form, address & phone copy buttons, site map |
| `/404` | `src/pages/NotFoundPage.tsx` | `src/not-found.css` | Balanced Michroma heading, dual-arrow return home button |

---

## 4. Assets Directory

### Lottie Animations (`public/assets/lottie/`)
- `sun-evening.json` — 28KB vector sun-to-moon morphing animation scrubbed on scroll.

### SVG Illustrations (`public/assets/svg/`)
- `amenities-route.svg` — 35KB master architectural route line drawn dynamically.
- `pets.svg` — 51KB pet living silhouette graphic.
- `scribble-1.svg` through `scribble-5.svg` — Hand-drawn reveal underlines.

### Amenities Flow Imagery (`public/assets/amenities/flow/`)
- `amenity-1.avif` — Kitchen & Dining (8:00 AM)
- `amenity-2.avif` — Central Connectivity (10:00 AM)
- `amenity-3.avif` — Executive Coworking (2:00 PM)
- `amenity-4.avif` — Fitness & Wellness Gym (5:00 PM)
- `amenity-5.avif` — Infinity Pool & Sun Deck (7:00 PM)
- `amenity-6.avif` — Clubhouse & Games Arena (9:00 PM)
- `amenity-7.avif` — 24/7 Security & Essentials (10:00 PM)
- `amenities_sketch.avif` — 225KB master architectural sketch.

### Other Ventures Logos (`public/assets/ventures/`)
- `cosmos-global.png` — Cosmos Global Pre-School
- `inox.png` — INOX Live the Movie

---

## 5. Quick Development Commands
- **Dev Server:** `npm run dev` (running at `http://localhost:5173`)
- **Typecheck:** `npx tsc --noEmit`
- **Production Build:** `npm run build` (`tsc -b && vite build`)
