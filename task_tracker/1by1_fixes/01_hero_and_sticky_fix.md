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

## Verification Status
- `npm run build`: Passed (0 errors, 6.06s).
- Visual Chrome headless tests: Verified at 390x844 viewport.
- Hero title is left-aligned and vertically centered; description is left-aligned at the bottom side with clean breathing room above the sticky card.
