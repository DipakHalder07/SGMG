# Task Tracker & Issue Fix Log

This directory tracks all items, bug fixes, design adjustments, and improvements as we work through them step by step.

---

## 📌 Status Dashboard

| # | Item Description | Status | Files Modified | Verification |
|---|------------------|--------|----------------|--------------|
| 1 | **Header Menu Drawer** (remove duplicate links, exact 8 items + contact button) |  Completed | `src/components/Header.tsx` | Visual CDP & build check |
| 2 | **Large Screen Headings Scale** (fluid clamp responsive typography) |  Completed | `src/index.css` | 1920px & 2560px test |
| 3 | **Header Button Alignment ("Apply Now" & "Schedule a Tour")** (fixed 40px icon box & text box alignment, 0px vertical offset on all viewports) |  Completed | `src/index.css` | CDP bbox match across all viewports (390px - 2560px) |
| 4 | *Next item from user guidance...* |  Pending | — | — |

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

---

## 🎯 Next Steps
- Awaiting your guidance for the next issue to address.
