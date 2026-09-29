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
  2. **Enlarged Logo**:
     - Desktop: Increased `.logo_box` height to `clamp(52px, 3.8vw, 64px)` and `.logo_img` to `height: clamp(48px, 3.8vw, 62px); max-height: 64px; max-width: clamp(200px, 16vw, 290px)`.
     - Mobile: Increased `.logo_box` height to `38px` and `.logo_img` to `height: 36px; max-height: 40px; max-width: 175px` (up from 21.4px / 26px).
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

## Verification Status
- `npm run build`: Passed (0 errors, 10.93s).
- Visual Chrome headless tests: Verified at 1440x900 (Desktop) and 390x844 (Mobile).
- Desktop What's Included tab clicks: Verified with real mouse events clicking "Features" and "Community Spaces", with DOM and tab classes updating dynamically.
- Screenshots captured and verified:
  - `desktop_header_verified.png`
  - `desktop_tabs_verified.png`
  - `mobile_header_verified.png`
