# Task Tracker & Issue Fix Log

This directory tracks all items, bug fixes, design adjustments, and improvements as we work through them step by step.

---

## 📌 Status Dashboard

| # | Item Description | Status | Files Modified | Verification |
|---|------------------|--------|----------------|--------------|
| 1 | **Header Menu Drawer** (remove duplicate links, exact 8 items + contact button) |  Completed | `src/components/Header.tsx` | Visual CDP & build check |
| 2 | **Large Screen Headings Scale** (fluid clamp responsive typography) |  Completed | `src/index.css` | 1920px & 2560px test |
| 3 | **Header Button Alignment ("Apply Now" & "Schedule a Tour")** (fixed 40px icon box & text box alignment, 0px vertical offset on all viewports) |  Completed | `src/index.css` | CDP bbox match across all viewports (390px - 2560px) |
| 4 | **Add "Where student life feels balanced" section** (restored with pin-scroll horizontal card track & mobile slider, brand color background, without removing "Everything modern living should be") |  Completed | `src/pages/HomePage.tsx`, `src/index.css` | Build verified & verified on localhost |
| 5 | **Remove Card Hover Effects** (eliminated hover transform snapping and box-shadow overrides across apartment cards) |  Completed | `src/index.css` | Verified build & styling |
| 6 | **Sides Section ("Made for everyday living") Editorial Layout & Scale** (fixed big screen proportions, heading scale, sticky card sizing, gap balance, typography) |  Completed | `src/index.css` | Visual CDP screenshot verification at 1920px, 768px, 390px |
| 7 | *Next item from user guidance...* |  Pending | — | — |

---

## 📋 Log of Completed Work

### Item 1: Header Mobile Drawer Layout
- **Goal:** Match `https://21oaks.org/` drawer links exactly.
- **Changes:** Removed redundant 9th link (`Contact`) from the mobile 2-column grid in [Header.tsx](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/components/Header.tsx). Retained the 8 balanced links and the prominent white `.contact_button`.

### Item 2: Large Screen Headings & Typography
- **Goal:** Fix microscopic headers on high-resolution displays.
- **Changes:** Replaced restrictive `clamp(..., 38px)` with fluid scaling `clamp(28px, 4vw, 76px)` for `h1` and proportional clamps for `h2-h6` in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css).

### Item 3: Apply Now & Schedule a Tour Button Proportions
- **Goal:** Fix button split/breakage on desktop & large screens.
- **Changes:**
  - Standardized `.button.header_cta`, `.text_box.header_btn`, and `.icon_box.is-right` to fixed `40px` height with strict `0px` vertical offset.
  - Removed accidental `height: auto` override on `.text_box.header_btn` at line 5196 in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css).
  - Scaled `.header_button` ("Schedule a Tour") with `0.7em` font size inside the pill dock.

### Item 4: "Where student life feels balanced" Section Addition
- **Goal:** Add the "Where student life feels balanced" section with horizontal card scroll & mobile slider, using the website's brand colors, while preserving the "Everything modern living should be" section.
- **Changes:**
  - Kept the **"Everything modern living should be"** section (`.property_listing_section`) with its full interactive slider right after the hero.
  - Added the **"Where student life feels balanced"** section (`.apartments`) right after the everyday living (`.sides`) section.
  - Implemented GSAP horizontal pin-scroll track on desktop and touch Splide carousel on mobile.
  - Styled with the website's brand color gradient: `linear-gradient(180deg, #ffffff 0%, #e4f3fa 43%, #d2ecf9 100%)`.

### Item 5: Card Hover Removal
- **Goal:** Remove card hover effects so cards do not jerk, snap straight from their tilt, or shift shadows on hover.
- **Changes:**
  - Removed `transform: none !important;` from `.apart_card:hover` in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css) so horizontal pin-scroll cards remain smoothly tilted without jumping when hovered.
  - Removed hover transform and shadow jumps from `.property_slider_slide .apart_card:hover`.
  - Added `transition: none !important;` to ensure cards remain completely stable.

### Item 6: Sides Section ("Made for everyday living") Design & Scale Fix
- **Goal:** Fix the layout and proportions of the `.sides` section on large screens and mobile without modifying any text or image content.
- **Root Cause:**
  - `.sides` had `font-size: clamp(12px, 0.98vw, 15px);` which capped `1em` at `15px` on screens wider than 1500px, causing cards to shrink to 330px while columns stretched to 960px+.
  - `h2.smaller` was capped at `45px`, leaving an awkward 600px dead void between the heading and the sticky card.
  - Card text (`title_txt`, `caption_txt`) was hardcoded at `15px`/`13px` rather than scaling proportionally.
- **Changes:**
  - Upgraded `.sides` base font-size to fluid `clamp(13px, 1vw, 22px)` matching the original Webflow 1vw scaling system.
  - Centered and constrained container to `max-width: 2200px; padding: 3.5rem clamp(1.5rem, 2.5vw, 3.5rem);`.
  - Scaled heading `.left_side .h2.smaller` with `clamp(30px, 3.6vw, 66px)` in `Michroma` brand font with `-0.02em` letter spacing so it harmoniously spans over the sticky card.
  - Scaled `.small_box` card with fluid sizing (`22em`, ~422px at 1920px) and `image_small` (`24em`, ~460px at 1920px).
  - Enhanced caption typography with bold `Michroma` title (`1.05em`, ~20px at 1920px) and readable body caption (`0.9em`, ~17px at 1920px).
  - Maintained sticky alignment for `.small_box` (`top: clamp(80px, 6.5vw, 115px)`) in `.sides_f` and mid-column sticky alignment (`top: clamp(130px, 11vw, 200px)`) in `.sides_s`.
  - Preserved mobile stack responsiveness (`@media (max-width: 767px)`).
  - **Zero content or image changes made.**

---

## 🎯 Next Steps
- Awaiting your guidance for the next issue to address.
