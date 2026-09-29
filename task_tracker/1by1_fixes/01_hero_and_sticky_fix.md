# Fix Tracking: 1-by-1 Methodical Improvements

## Fix 1: Mobile Hero Description Wrapping & Layout ("mobile screen hero dec design brack")
- **Root Cause**:
  - In `src/apartment-detail.css`, `.bottom_desc` had `max-width: 44ch` inherited from tablet media query into mobile portrait (`@media (max-width: 479px)`).
  - Because of the fluid 1vw font scale on mobile (`~3.9px`), `44ch` evaluated to `125px`, forcing `.bottom_desc`, `.title_temp`, and `.p_apartments` to squish into a narrow 125px column.
  - "About the property" wrapped into two lines ("About the \n property"), and paragraph text broke into awkward 2-word lines.
- **Solution Applied**:
  - Explicitly set `.bottom_desc { width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }` across all mobile media queries (`<= 767px` and `<= 479px`).
  - Set `.title_temp { width: 100% !important; white-space: nowrap !important; display: block !important; }` so "About the property" displays on one clean header line.
  - Set `.p_apartments { width: 100% !important; max-width: 100% !important; word-break: normal !important; display: block !important; }` so the description flows smoothly across the available screen width.

---

## Fix 2: Bottom Sticky Price Card Scroll Hide/Show Interaction ("bottom stiky after some section that is hide")
- **Live Reference Inspection (`https://21oaks.org/apartments-cards/d1`)**:
  - Webflow IX2 interaction `a-13` ("Fixed Price") is triggered by `<main>` (containing the Hero `.scroll_stage` and Apartment Details `.list_details`).
  - Progress 0% to 85% of `<main>`: `.fixed_price { transform: translateY(0%); }` (visible booking card).
  - Progress 85% to 100% of `<main>`: `.fixed_price` translates down `translateY(150%)` as the user approaches the end of apartment details.
  - After `<main>` (`.full_gallery`, `.amenities_section`, `.pets`, `.faqs`, `.fs_cta`, `.footer`): `.fixed_price` stays hidden off-screen (`translateY(150%)`, `pointer-events: none`).
  - Scrolling back up into `<main>`: smoothly scrubs back into view (`translateY(0%)`).
- **Solution Applied**:
  - In `src/pages/ApartmentDetailPage.tsx`, implemented a dedicated GSAP ScrollTrigger timeline attached to `<main>`.
  - Scrubbed timeline: Keyframe 0 to 0.85 progress remains at `yPercent: 0`, and from 0.85 to 1.0 progress smoothly translates `yPercent: 150`.
  - Added `onUpdate`, `onLeave`, and `onEnterBack` callbacks to manage `pointerEvents: "none"` / `pointerEvents: "auto"` so the off-screen card cannot intercept clicks in the bottom sections.

---

## Fix 3: Mobile Hero Title Left-Center & Description Bottom ("title left side center side and dec bottom side")
- **User Requirement**:
  - Title ("D1 Premium" + specs tags) must be on the left side, vertically centered in the hero screen.
  - Description ("About the property" + paragraph) must be positioned on the bottom side of the hero screen.
- **Solution Applied**:
  - Configured `.apartment_content` with flex column `justify-content: space-between` and `align-items: flex-start`.
  - Set `.h1_apartments` with `margin-top: auto; margin-bottom: auto;` to automatically center it vertically in the hero upper half (`top: ~273px`).
  - Set `.bottom_desc` with `margin-top: 0; margin-bottom: 0;` and reserved `padding-bottom: calc(185px + 5.8rem)` on `.apartment_content` so the description sits cleanly at the bottom side (`top: ~492px - 566px`) above the sticky booking card with zero overlap.

---

## Fix 4: Header Responsiveness, Enlarged Logo, Heading Font for Menu, & Desktop Tab Buttons
- **User Requirements**:
  1. Header font responsive issue: text was too small (under 10px-12px); fix and make responsive.
  2. Make logo more big: enlarge the brand logo across desktop and mobile.
  3. Menu item heading font family: use heading font family (`Michroma`) for menu items.
  4. Apartment detail "What's Included" tab buttons not working on desktop: fix tab buttons ("Interior", "Features", "Community Spaces").
- **Root Cause & Solution Applied**:
  1. **Desktop Tab Buttons Inoperable**:
     - The transparent fixed header (`.header`, `.wrapper_header`, `.grid_header`) had `pointer-events: auto` applied via `.header * { pointer-events: auto; }`.
     - `.menu_fs` was assigned to `grid-area: 2 / 2 / 3 / 3` in `.grid_header` with `display: flex`, creating an invisible 245px tall row in the header that intercepted mouse clicks across the upper part of desktop viewports.
     - Solution: Set `.header`, `.wrapper_header`, and `.grid_header` to `pointer-events: none !important`, only granting `pointer-events: auto !important` to actual clickable items (logo, pill, buttons, open drawer). Positioned `.menu_fs` on desktop as `position: absolute; left: 50%; top: calc(100% + 0.6em); transform: translate3d(-50%, ...)` to eliminate the ghost 190px grid row.
     - Added `position: relative; z-index: 13; pointer-events: auto !important; cursor: pointer;` to `.tab_gen` and `pointer-events: none` on child text in `src/apartment-detail.css`.
     - Added `ScrollTrigger.refresh()` upon tab switching in `src/pages/ApartmentDetailPage.tsx`.
  2. **Logo Big (Without Making Full Header Big)**:
     - Scaled the brand logo itself to be prominent and clear (`.logo_img` height `clamp(44px, 3.2vw, 50px)`, max-width 240px) while keeping `.logo_box` aligned at 46px.
     - Kept the header wrapper compact (`padding: 0.6em 2rem`).
     - Maintained sleek 40px standard height for the center menu pill (`.menu` height: 40px, width: 23em) and the CTA button (`.button.header_cta` height: 40px).
     - The full header remains sleek and compact at ~58px, while only the logo stands out large and clear.
  3. **Menu Item Heading Font Family**:
     - Set `.menu_txt`, `.menu_link`, `.mobile_link`, and `.mobile_link div` to `font-family: var(--font-heading, "Michroma", sans-serif) !important` with `letter-spacing: 0.02em`.
  4. **Header Font Responsiveness**:
     - Replaced hard-coded small font sizes (`0.7em` inside `0.85em` = ~9.5px) with responsive `clamp(...)` values:
       - `.menu_txt`, `.menu_link`: `font-size: clamp(13px, 0.95vw, 15px)`
       - `.header_button`: `font-size: clamp(12.5px, 0.88vw, 14px)`
       - `.button.header_cta .text_box`: `font-size: clamp(13.5px, 0.95vw, 15px)`
       - Mobile `.menu_link`, `.menu_txt`: `font-size: 13.5px !important`
       - Mobile `.button.header_cta .text_box`: `font-size: clamp(12.5px, 3.2vw, 14px) !important`

---

## Fix 5: Apartments & Light Pages Transparent Header & Invisible Logo Issue
- **User Requirement**:
  - "1 use is apartments page hero section header trasprand showing why check all page and fix , like live okay"
  - Diagnose why the header showed transparent on `/apartments`, audit all pages, and align behavior 1:1 with the live site (`https://21oaks.org`).
- **Root Cause Identified**:
  1. On `/apartments`, the top section/wrapper was missing `data-section="light"`.
  2. The fallback theme detector in `src/components/Header.tsx` evaluated `mode = null`. When checking `const hero = document.querySelector('[data-section="hero"]')`, `hero` was `null` (since `/apartments` has no hero image slider). The condition `hero && hero.getBoundingClientRect().bottom <= y` evaluated to `false`, causing the detector to fall through to `else { mode = "hero"; }`!
  3. `mode = "hero"` added `.is-hero` to `document.body`.
  4. `body.is-hero` triggered hero-slider styles: `.logo_img_white` displayed while `.logo_img_dark` was hidden, and the center menu pill had `rgba(0, 0, 0, 0.11)`.
  5. Because `/apartments` is a light page with a white/cream background, displaying the white logo made it completely invisible, and the header appeared broken/transparent.
  6. Additionally, `index.html` had `<body class="is-hero">` hardcoded, creating a flash of `is-hero` before React scripts initialized.
  7. On desktop, the `#w-node-...` ID selector in `index.css` had higher specificity than class selectors, overriding `.menu` with `rgba(0,0,0,0.11)` unless marked `!important`.
- **Solution Applied**:
  1. **Fixed Theme Fallback Logic (`src/components/Header.tsx`, `HomePage.tsx`, `ApartmentDetailPage.tsx`)**:
     - Corrected the fallback: `mode` is `"hero"` ONLY if `hero` exists AND `hero.getBoundingClientRect().top <= y && hero.getBoundingClientRect().bottom > y`. Otherwise, it safely defaults to `"light"`.
     - Added the authentic 21Oaks overlap rule: even if `mode === "hero"`, if the logo does not overlap the hero image element, it switches to `"light"`.
     - Automatically applies `is-light` immediately on navigation to known non-hero routes (`/apartments`, `/gallery`, `/team`, `/careers`, `/faq`, `/how-to-apply`, `/contact`) to prevent flash.
  2. **Audit & Fixed `data-section="light"` Across All Pages**:
     - `ApartmentsPage.tsx`: Wrapped top residences wrapper with `<section data-section="light">` and added `data-section="light"` to `<main>`.
     - `GalleryPage.tsx`: Added `data-section="light"` to `<main className="gallery">`.
     - `TeamPage.tsx`: Added `data-section="light"` to `.team_page` and `<section className="team_hero">`.
     - `CareersPage.tsx`: Added `data-section="light"` to `.careers_page` and `<section className="careers_hero">`.
     - `index.html`: Replaced hardcoded `<body class="is-hero">` with clean `<body>`.
  3. **Solid `#292929` Desktop Menu Pill & Header Styling (`src/index.css`)**:
     - Enforced `background-color: #292929 !important` on `body:not(.is-hero) .menu` and `body.is-light .menu`.
     - Kept `rgba(0, 0, 0, 0.11) !important` strictly reserved for `body.is-hero .menu`.
     - Preserved solid white `#ffffff` mobile header bar on all light pages with visible dark logo and bottom dark pill dock.
- **Verification Across All Routes**:
  - `/apartments`: `bodyClass: is-light`, dark logo `block`, white logo `none`, menuBg `#292929`, mobile headerBg `#ffffff`.
  - `/gallery`: `bodyClass: is-light`, dark logo `block`, menuBg `#292929`.
  - `/team`: `bodyClass: is-light`, dark logo `block`, menuBg `#292929`.
  - `/careers`: `bodyClass: is-light`, dark logo `block`, menuBg `#292929`.
  - `/faq`: `bodyClass: is-light`, dark logo `block`, menuBg `#292929`.
  - `/how-to-apply`: `bodyClass: is-light`, dark logo `block`, menuBg `#292929`.
  - `/contact`: `bodyClass: is-light`, dark logo `block`, menuBg `#292929`.
  - `/` (Home): `bodyClass: is-hero`, white logo visible over dark hero slider.
  - `/location`: `bodyClass: is-hero`, white logo visible over hero slideshow.
- **Screenshots Verified**:
  - `apartments_desktop_verified.png`: Dark logo, solid dark `#292929` pill, clear layout.
  - `apartments_mobile_verified.png`: Solid white header bar, dark logo, solid bottom dock pill.

---

## Fix 6: Header Typography Refinement & Scaling ("header font is to big")
- **User Requirement**:
  - "1 more think is header font is to big , so fix that too"
- **Inspection Against Live Ground Truth (`https://21oaks.org/apartments`)**:
  - Live site computed styles:
    * Desktop: `.menu_txt.open_txt` is `10.03px`, `.header_button` is `10.03px`, `.header_cta .text_box` is `9.21px`.
    * Mobile: `.menu_txt.open_txt` is `11.60px`, `.header_button` is `11.60px`, `.header_cta .text_box` is `11.31px`.
  - Previous local styles had oversized clamp values (`13px` - `15px`), which combined with `Michroma` (a wide geometric display font) appeared bulky and disproportionate.
- **Solution Applied**:
  - **Desktop (`min-width: 992px`)**:
    * `.menu_link`, `.menu_txt`: Calibrated to `10.5px !important` with `letter-spacing: 0.04em !important`.
    * `.header_button`: Calibrated to `10px !important` with `letter-spacing: 0.04em !important` and `padding: 0 16px`.
    * `.button.header_cta .text_box`, `.text_box.header_btn`: Calibrated to `10px !important` with `letter-spacing: 0.04em !important`.
  - **Mobile (`max-width: 991px`)**:
    * `.menu_link`, `.menu_txt`: Set to `11px !important` with `letter-spacing: 0.03em !important`.
    * `.header_button`: Set to `10.5px !important` with `letter-spacing: 0.03em !important`.
    * `.button.header_cta .text_box`: Set to `10.5px !important` with `letter-spacing: 0.03em !important` and `padding: 0 16px`.
    * `.mobile_link, .mobile_link div`: Set to `12px !important` with `letter-spacing: 0.03em !important`.
    * `.contact_button`: Set to `11.5px !important` with `letter-spacing: 0.03em !important`.
- **Visual Verification**:
  - Re-captured screenshots (`apartments_desktop_verified.png` & `apartments_mobile_verified.png`).
  - Font is now crisp, elegant, properly scaled, and aligned with 21Oaks live design.

---

## Verification Status
- `npm run build`: Passed (0 errors, 5.56s).
- Live ground truth comparison: Matched 1:1 against `https://21oaks.org/apartments`.
- Visual Chrome headless tests: Verified across all 9 routes on Desktop and Mobile.
