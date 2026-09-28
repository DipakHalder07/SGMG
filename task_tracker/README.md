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
| 7 | **Location Reach & Amenities Sections Scale & Proportions** (fixed "Everything you need, within reach" & "Just outside your door" typography, lead paragraph, distance table, carousel cards) |  Completed | `src/index.css` | Visual CDP screenshot verification at 1920px & 390px |
| 8 | **All Sections Container System & Horizontal Alignment** (removed restrictive 1440px/1720px/2200px max-width bottlenecks; standardized full-width `2rem` (32px) edge alignment matching header logo & CTA across all sections: Hero, Sides, Reach, Amenities, How it Works, Testimonials, FAQs, Footer) |  Completed | `src/index.css` | CDP automated container audit & visual screenshots at 1920px & 390px |
| 9 | **Global Typography System** (Michroma for all headings, Plus Jakarta Sans for all body text) |  Completed | `index.html`, `public/webflow.min.css`, `src/index.css`, `src/*.css` | Automated computed font audit & visual screenshots across viewports |
| 10 | **Amenities Section ("Just outside your door") Header Clearance & Proportions** (fixed header collision, generous 160px top padding matching 21oaks, balanced Michroma heading scale) |  Completed | `src/index.css` | CDP bbox measurement & visual screenshot verification at 1920px, 1440px, 390px |
| 11 | **Amenities Card Sizing & Aspect Ratio Restoration** (restored canonical Webflow `aspect-ratio: 1440 / 1546` (~0.931), eliminated horizontal squashing clamp, restored tall editorial portrait cards ~639px high on desktop matching 21oaks.org) |  Completed | `src/index.css` | Chrome CDP measurement (595px x 639px, ratio 0.931) & visual screenshots |
| 12 | **Mobile Purple Background & Button Icon Box Design Fix** (eliminated all legacy `#e8ceff` purple gradients from mobile apartments section; set signature SGMG green icon box `#a2cd3a` with blue text box `#2391cf`, matching 40px height & 4px border-radius, and crisp white SVG arrow) |  Completed | `public/webflow.min.css`, `src/index.css` | Mobile CDP screenshots and computed style audits |
| 13 | *Next item from user guidance...* |  Pending | — | — |

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

### Item 7: Location Reach & Amenities Sections Scale & Proportions
- **Goal:** Fix the layout, scale, typography, and vertical spacing of "Everything you need, within reach" (`.everything_u_need`) and "Just outside your door" (`.amenities_section`) on large screens and mobile without altering content.
- **Root Cause:**
  - `h2.everything_you_need` was capped at `48px`, making it look shrunken on large monitors.
  - The right paragraph (`.md_p`) was styled as tiny 16px body copy with an oversized 6rem padding, instead of serving as the bold editorial lead statement seen on 21oaks.
  - `h2.middle_spec` in Amenities had a duplicate override that hard-capped its font-size to `34px`, making it microscopic in the center of the viewport.
  - Excessive 12rem stacked padding between the two sections left a massive empty white void.
- **Changes:**
  - Scaled `.everything_u_need .h2` to `clamp(32px, 3.8vw, 68px)` in `Michroma`.
  - Transformed `.md_p` into a bold, commanding editorial lead paragraph: `clamp(18px, 1.6vw, 28px)` with `line-height: 1.35; color: #1a1a1a`.
  - Enhanced distance table items (`.title_line` to `clamp(15px, 1.1vw, 20px)` and `.timing_txt` to `clamp(14px, 0.95vw, 17px)`).
  - Removed duplicate 34px cap on `.amenities_heading .h2.middle_spec` and upgraded it to fluid `clamp(34px, 4.2vw, 72px)` with `-0.02em` tracking in `Michroma`.
  - Polished amenity cards with responsive height (`clamp(380px, 30vw, 500px)`), high-contrast gradient overlays, and crisp card headings (`clamp(18px, 1.4vw, 26px)`).
  - Maintained complete mobile responsiveness across 390px-768px viewports.
  - **Zero content or image changes made.**

### Item 8: All Sections Container System & Horizontal Alignment Fix
- **Goal:** Fix container width, horizontal margins, and alignment across all sections on the site so that every section has consistent full-width alignment without artificial bottlenecks or uneven gutters.
- **Root Cause:**
  - In `21oaks.org`, Webflow uses a full-width container system (`width: 100%; max-width: none; margin: 0; padding: ... 2rem / 32px`).
  - Several sections in the local project had arbitrary `max-width` restrictions (e.g. `1440px` on `.how_it_works`, `1720px` on `.everything_u_need` and `.amenities_section`, `2200px` on `.sides`), which indented content inwards by 100px-240px on large displays and caused them to misalign with the header logo and Apply CTA button.
  - In `.amenities_section`, the 3 amenity cards were squeezed into 1604px instead of spanning edge-to-edge (x: 32px to 1888px) as in the live site.
- **Changes:**
  - **Hero (`.wrapper_hero`)**: Updated padding to `0 2rem 5vh` (`max-width: none; width: 100%`) so the hero heading starts at `x = 32px` directly under the header logo.
  - **Sides (`.wrapper_sides`)**: Removed `max-width: 2200px` and set padding to `3.5rem 2rem` (`width: 100%; margin: 0;`), aligning the everyday living section at `x = 32px` to `1888px`.
  - **Location Reach (`.everything_u_need`)**: Set `.wrapper_general` to `width: 100%; max-width: none; margin: 0; padding: clamp(3.5rem, 6vw, 6.5rem) 2rem clamp(2rem, 3.5vw, 3.5rem);`. Updated `.txt_sides` to `display: flex; justify-content: space-between;` with `.left_lines` at `35%` (max 650px) starting at `x = 32px` and `.p_right` at `40%` (max 740px) ending at `x = 1888px`.
  - **Amenities (`.amenities_section`)**: Set `.wrapper_general.basic.slider_spec` to `width: 100%; max-width: none; margin: 0; padding: clamp(2.5rem, 4vw, 4.5rem) 2rem clamp(4rem, 7vw, 7.5rem);`. Set `.container.only_amenities` to `width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important;`. The 3 amenity cards now span edge-to-edge across the viewport.
  - **How it Works (`.how_it_works`)**: Removed `max-width: 1440px; margin: 0 auto;`. Set `.wrapper_general.basic, .wrapper_how_to` to `width: 100%; max-width: none; margin: 0; padding: clamp(4rem, 8vw, 10rem) 2rem;`. Configured `.flex_how` with `justify-content: space-between;` (`.left_title` at `38%` and `.right_cards` at `48%` aligned to the right edge).
  - **Testimonials (`.testimonials`)**: Standardized `.wrapper_general.basic` to `width: 100%; max-width: none; margin: 0; padding: clamp(4rem, 8vw, 10rem) 2rem;`.
  - **FAQs (`.faqs`)**: Standardized `.wrapper_general.basic` to `width: 100%; max-width: none; margin: 0; padding: clamp(4rem, 8vw, 10rem) 2rem clamp(3rem, 6vw, 8rem);`.
  - **Footer (`.footer`)**: Updated `.wrapper_footer` to `width: 100%; max-width: none; margin: 0; padding: 4.5rem 2rem 1rem;`.
  - **Base Container Rules**: Added canonical definitions for `.wrapper_general`, `.wrapper_general.basic`, and `.container` at the top of [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css).
  - **Verified via automated container audit**: All sections now measure `bbox.x = 0px`, `maxWidth = none`, with exact `32px` (`2rem`) horizontal gutters matching `21oaks.org` on 1920px desktop and full mobile responsiveness on 390px.
  - **Zero content or image changes made.**

### Item 9: Global Typography System (Michroma for Headings, Plus Jakarta Sans for Body)
- **Goal:** Set all headings to **Michroma** and all body text to **Plus Jakarta Sans** across the entire website without changing any text or image content.
- **Root Cause & Cleanup:**
  - `webflow.min.css` originally had `body { font-family: Exposure, Georgia, sans-serif; }` hardcoded across several default class declarations, which caused unstyled elements to inherit serif fonts.
  - Previous CSS variables had `--font-display: "Michroma"` and `--font-sans: "Plus Jakarta Sans"`, but several individual components directly declared fonts or inherited Webflow base styles.
- **Changes:**
  - **Google Fonts Integration**: Linked Google Fonts for both `Michroma` and `Plus Jakarta Sans` (weights `300` to `800` + italics) with `preconnect` in [index.html](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/index.html) and CSS `@import` in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css).
  - **CSS Design Tokens**: Defined `--font-heading: "Michroma", sans-serif;` and `--font-body: "Plus Jakarta Sans", ...;` in `:root`.
  - **Global Body & Text Hierarchy**: Applied `body { font-family: var(--font-body, "Plus Jakarta Sans", sans-serif) !important; }` to override Webflow defaults globally.
  - **Comprehensive Heading Selectors**: Mapped `h1-h6`, `.h1-.h6`, `.heading`, `[class*="heading"] h1-h6`, `.hero .heading_box h1`, `.dynamic_section .middle .h2`, `.left_side .h2`, `.flex_txt .title_txt`, `.apartments_heading`, `.apart_title`, `.everything_you_need`, `.title_line`, `.middle_spec`, `.title_amenities`, `.sticky_how .h2`, `.title_how`, `.testimonials_heading h2`, `.faq_heading .h2`, `.txt_cta`, and `.cap_footer` to `font-family: var(--font-heading, "Michroma", sans-serif) !important;`.
  - **Webflow Stylesheet Cleanup**: Replaced 8 occurrences of legacy `Exposure` / `Georgia` in [webflow.min.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/public/webflow.min.css) with `Plus Jakarta Sans`.
  - **Sub-page Stylesheets Updated**: Updated all page-level stylesheets ([apartment-detail.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/apartment-detail.css), [careers.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/careers.css), [contact.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/contact.css), [faq.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/faq.css), [gallery.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/gallery.css), [how-to-apply.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/how-to-apply.css), [location.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/location.css), [not-found.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/not-found.css), [team.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/team.css)) to use the standard tokens.
  - **Hero Body Copy Polish**: Explicitly set `.hero .heading_box .p_gen` to `var(--font-body, "Plus Jakarta Sans", sans-serif) !important;` so that hero description renders in crisp Plus Jakarta Sans.
  - **Verification**: Verified with automated computed style inspection via Chrome CDP — 100% of tested headings computed to `Michroma, sans-serif` and 100% of tested body/paragraph/button elements computed to `Plus Jakarta Sans`.
  - **Zero content or image changes made.**

### Item 10: Amenities Section ("Just outside your door") Header Clearance & Proportions
- **Goal:** Fix the layout of the Amenities section so the heading does not collide with or get obscured by the floating header dock, while achieving balanced vertical rhythm and card proportions on all screen sizes.
- **Root Cause:**
  - The section wrapper originally had insufficient top padding (`clamp(2.5rem, 4vw, 4.5rem)` = 72px), placing the heading directly behind the floating fixed header dock (`y = 32px to 72px`).
  - Heading font size (`72px`) and tight line-height caused the heading to blow up to `164px` in Michroma, overlapping the blue scribble underline and forcing the section to an excessive `1065px` total height.
  - When users scrolled down to view the 3 amenity cards, the heading was pushed off-screen and trapped behind the frosted glass of the header dock.
- **Changes:**
  - **Generous Top Padding**: Upgraded wrapper padding to `clamp(6.5rem, 9vw, 10rem) 2rem clamp(4rem, 6vw, 7.5rem)` matching the `160px` top padding from `21oaks.org`. This creates a clean `96.44px` clearance zone between the header dock and the heading.
  - **Scroll Margin**: Added `scroll-margin-top: 100px;` so `#amenities` anchor navigation lands smoothly without header obstruction.
  - **Michroma Heading Proportion**: Scaled `.h2.middle_spec` to `clamp(28px, 3.4vw, 56px)` with `line-height: 1.2` and `-0.015em` letter spacing, allowing "Just outside" and "your door" to breathe with the scribble underline intact.
  - **Button Spacing**: Set `.button_amenities` margin to `clamp(1.2rem, 1.8vw, 2rem)` and heading bottom margin to `clamp(2.5rem, 3.5vw, 4rem)`.
  - **Card Proportions**: Calibrated card height to `clamp(340px, 24vw, 440px)` with `8px` rounded corners and full edge-to-edge alignment (`2rem` / 32px gutters).
  - **Mobile Layout**: Polished `@media (max-width: 991px)` padding and touch carousel slide proportions (`380px` height).
  - **Verification**: Verified via Chrome CDP across 1920px desktop, 1440px laptop, and 390px mobile viewports. The entire section (heading, button, cards) fits and displays cleanly without header overlap.
  - **Zero content or image changes made.**

### Item 11: Amenities Card Sizing & Aspect Ratio Restoration
- **Goal:** Resolve card squashing ("still card size issue") in the Amenities section ("Just outside your door") where cards appeared horizontally squished into short letterbox strips (~340px high), restoring their tall, stately editorial portrait format matching `21oaks.org`.
- **Root Cause:**
  - An artificial height clamp (`height: clamp(340px, 24vw, 440px) !important;`) had been applied to `.amenities_section .splide__slide`, which overrode the natural image proportions and squashed the cards into flat strips on wide screens.
  - In `21oaks.org`, the original Webflow stylesheet declared `aspect-ratio: 1440 / 1546;` (~0.9314 portrait ratio) on `.image_amenities`, giving the cards their distinctive vertical presence.
- **Changes:**
  - Removed artificial fixed height clamps on `.amenities_section .splide__slide`.
  - Re-established `aspect-ratio: 1440 / 1546 !important;` with `height: auto !important;` and `min-height: clamp(420px, 30vw, 640px) !important;` on `.image_amenities` in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css).
  - Maintained `8px` rounded corners and edge-to-edge alignment (`2rem` / 32px gutters).
  - Polished mobile slider styles (`@media (max-width: 991px)`) with `aspect-ratio: 1440 / 1546` and `min-height: 380px`.
  - **Verification:** Chrome CDP measurements confirmed exact dimensions on 1920px desktop:
    - Width: `595.33px`
    - Height: `639.14px`
    - Aspect Ratio: `0.931` (exact 1440/1546 ratio)
    - Visual screenshots verified tall, balanced cards with ample heading clearance and zero content changes.

---

### Item 12: Mobile Purple Background & Button Icon Box Design Fix
- **Goal:** Fix the unexpected purple/lavender background on mobile viewports in the "Where student life feels balanced" section, and ensure button icon boxes use SGMG signature green (`#a2cd3a`) with refined proportions and aligned styling.
- **Root Cause:**
  - `public/webflow.min.css` inherited 21oaks' legacy purple color palette (`--primary: #e8ceff`), hardcoded `.icon_box { background-color: #e8ceff; }`, and multiple mobile media query rules setting `linear-gradient(#fff, #e8ceff 47%, #e8ceff)` and `linear-gradient(#e8ceff, #e8ceff ...)` on `.apartments_bg_gradient` and `.apartments_bg_gradient.only_mobile`.
  - On mobile, different font sizes on `.text_box` and `.icon_box` caused `border-radius: 0.375em` to compute to `4.38px` on the text box and `1.46px` on the icon box, making the icon box look square and misaligned with arbitrary height (`39px`).
- **Changes:**
  - **Purged 21oaks Purple Palette:** Replaced all 14 occurrences of `#e8ceff` and associated lavender shades (`#d5beeb`, `#d8c0ed`, `#fbf7ff`, `#6e30f7`) in [webflow.min.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/public/webflow.min.css) with SGMG's canonical blue (`#2391cf`), subtle brand tints (`#e8f4fa`, `#f8fafc`), and hover states (`#1b7cb3`).
  - **Clean Brand Mobile Background:** Set `.apartments` on mobile to a pristine brand gradient (`linear-gradient(180deg, #ffffff 0%, #edf6fb 50%, #ffffff 100%)`) and completely disabled `.apartments_bg_gradient` / `.only_mobile` overlay layers.
  - **Signature SGMG Green Icon Box Design:**
    - Set `.button .icon_box` to SGMG's signature green (`var(--logo-green, #a2cd3a) !important;`) paired with the blue text box (`var(--primary, #2391cf)`).
    - Standardized both `.text_box` and `.icon_box` to exact `40px` height and `4px` border-radius on all viewports, eliminating the previous `1.46px` vs `4.38px` corner mismatch.
    - Set icon box to a crisp `40px x 40px` square with `3px` gap and centered white SVG arrow (`fill: #ffffff !important; stroke: none !important;`).
- **Verification:** Chrome CDP mobile inspection confirmed:
  - Section background computed to clean white-to-ice-blue gradient with zero purple bleed.
  - Button text box computed to `rgb(35, 145, 207)` and icon box computed to SGMG green `rgb(162, 205, 58)` with matching 40px height and 4px radius.
  - Verified with mobile screenshot captures.

---

### Item 13: Button Typography (Michroma) & Indian Rupee (₹) Currency Standardization
- **Goal:**
  1. Apply the website's heading font family (`Michroma`, `--font-heading`) to all buttons across the entire website.
  2. Eliminate all `$` dollar currency symbols/icons and replace them with the Indian Rupee symbol (`₹`).
- **Changes:**
  - **Universal Heading Font Family (`Michroma`) for All Buttons:**
    - Added global typography rules in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css) mapping `button`, `input[type="button"]`, `input[type="submit"]`, `input[type="reset"]`, `.button`, `.text_box`, `.header_button`, `.contact_button`, `.submit_button`, `.button_apply`, `.button_schedule`, `.clear_btn`, `.team_tab_btn`, `.team_member_bio_btn`, `.team_modal_close_btn`, `.faq-explore-btn`, `.apartment-lightbox-view-page-btn`, `.apartment-lightbox-apply-btn`, and `[class*="button"]` to `font-family: var(--font-heading, "Michroma", sans-serif) !important;` with refined tracking (`letter-spacing: 0.02em;`).
    - Updated specific button definitions in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css), [apartment-detail.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/apartment-detail.css), [contact.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/contact.css), [team.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/team.css), and [not-found.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/not-found.css) to eliminate any conflicting `Plus Jakarta Sans` overrides.
  - **Indian Rupee (`₹`) Currency Replacement:**
    - Swapped out the legacy `$` bitmap icon asset by replacing `public/assets/icons/price-icon.png` with the Indian Rupee `₹` glyph asset.
    - Updated image references in [HomePage.tsx](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/pages/HomePage.tsx), [ApartmentDetailPage.tsx](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/pages/ApartmentDetailPage.tsx), and [ApartmentCard.tsx](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/components/ApartmentCard.tsx) to use crisp vector `/assets/icons/rupee-icon.svg` with `alt="₹"`.
    - Verified all price sliders, fee items, and price displays across the website display `₹` and zero `$` occurrences.
- **Verification:**
  - Automated Chrome CDP scan across Desktop (1920px) and Mobile (390px) verified across 4 major routes (`/`, `/apartments`, `/apartments/d1`, `/contact`):
    - **100% of tested buttons compute to `font-family: Michroma, sans-serif`**.
    - **0 literal `$` occurrences** found in page text content or alt attributes.
    - Price badges visibly render the crisp Indian Rupee symbol `₹` alongside unit pricing.
  - Production build (`npm run build`) passed with zero errors in 3.67s.

---

### Item 14: Mouse Drag & Swipe Interaction for "Everything modern living should be" Slider
- **Goal:** Enable mouse dragging/swiping on desktop and trackpads so users can click and drag the slider horizontally to move slides, in addition to touch and navigation buttons.
- **Changes:**
  - **Unified Pointer & Mouse Drag System in [HomePage.tsx](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/pages/HomePage.tsx):**
    - Implemented `onPointerDown`, `onPointerMove`, `onPointerUp`, and `onPointerCancel` with pointer capture for seamless tracking even if the cursor moves outside the viewport.
    - Added real-time visual drag tracking: track translates in real time with cursor offset (`translateX(calc(-${propertySlideIndex * (100 / visibleSlides)}% + ${dragOffset}px))`) with `transition: none` during drag for 0-latency feedback.
    - Added organic boundary resistance (dampened to `0.32` factor) when dragging past the first or last slide.
    - Integrated flick velocity detection and distance thresholds (`threshold = slideWidth * 0.18`, velocity > `0.3px/ms`) to advance or retreat slides on release.
    - Added horizontal trackpad / mouse wheel gesture support via `onWheel`.
  - **False Click Prevention:**
    - Captured clicks during dragging with `onClickCapture` and guarded card links (`<Link>`, `<WebflowButton>`), ensuring that dragging across cards never accidentally triggers unwanted navigation.
    - Added `draggable={false}` and `user-drag: none` to all card images and links to eliminate native browser image drag ghosts.
  - **Grab Cursor Styling in [index.css](file:///c:/Users/Ayushman/Downloads/SGMG-website%202/SGMG-website%202/src/index.css):**
    - Set `.property_slider_viewport` to `cursor: grab;`.
    - Applied `.property_slider_viewport:active, .property_slider_viewport.is-dragging` to `cursor: grabbing !important;` with `user-select: none !important;`.
- **Verification:**
  - Automated Chrome CDP tests on both Mobile (390px) and Desktop (1920px):
    - Dragged left by 200px / 350px: active slide dot moved from `0` to `1` (advance slide).
    - Dragged right by 200px / 350px: active slide dot moved from `1` to `0` (retreat slide).
    - Verified real-time transform translation during drag.
    - Captured verification screenshots (`slider_drag_1_slid_left.png`, `desktop_slider_dragged.png`).
  - Production build (`npm run build`) completed cleanly with zero errors in 3.50s.

---

## 🎯 Next Steps
- Awaiting your guidance for the next task or adjustment.



