# 21OAKS & SGMG ANIMATION SYSTEM REFERENCE

This document outlines the exact animation parameters, math, and implementations to ensure 1:1 motion parity with `https://21oaks.org/`.

---

## 1. Route Line Dynamic Path (`path_js`)
- **Target**: SVG route lines (e.g. `/amenities` hero, `/about` connecting line).
- **Core Math**:
  - `path.getTotalLength()` dynamically measured.
  - Initial state: `strokeDasharray = length + " " + length`, `strokeDashoffset = length`.
  - On view / scroll progress: lerped using cubic-bezier easing `cubic-bezier(0.65, 0, 0.35, 1)`.
  - SGMG brand stroke: `#2391cf` (stroke width: 3.5px).

---

## 2. Continuous Tabular Odometer Clock & Day/Night Lottie Scrubbing
- **Time Range**: `08:00 AM` -> `10:00 PM`
- **Total Minutes**: 840 minutes (from 480 min to 1320 min)
- **Formatting**:
  ```ts
  const hours24 = Math.floor(currentMinutes / 60);
  const mins = Math.floor(currentMinutes % 60);
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const timeStr = `${String(hours12).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  ```
- **Lottie Scrubbing**:
  - Attached to scroll progress `progress = clamped(scroll / totalScroll)`.
  - Frame: `progress * totalFrames`.
  - Visual: Sun morphs smoothly into Moon.
- **Day-to-Night Background Color Lerp**:
  - Start: `#ffffff` (R: 255, G: 255, B: 255), Text: `#292929`
  - End: `#121214` (R: 18, G: 18, B: 20), Text: `#ffffff`
  - Interpolation: `rgb(lerp(255, 18, p), lerp(255, 18, p), lerp(255, 20, p))`

---

## 3. Dual-Pill Button Micro-Interactions
- **HTML Structure**:
  ```html
  <a class="button w-inline-block">
    <div class="icon_box is-left"><div class="arrow_icon">...</div></div>
    <div class="text_box"><div>Text</div></div>
    <div class="icon_box is-right"><div class="arrow_icon">...</div></div>
  </a>
  ```
- **CSS Transition**:
  - `transition: transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.25s ease;`
  - Default: `is-left` is hidden / translated off-left, `is-right` is visible.
  - Hover: `is-right` translates right and fades out, `is-left` slides in from left.

---

## 4. Hand-Drawn Scribble Underlines
- **Scribble SVGs**:
  - Underline 1: `/assets/svg/scribble-1-21oaks.svg` (used under "routine", "us")
  - Underline 2: `/assets/svg/scribble-5-21oaks.svg` (used under "Them.", "Siliguri")
- **Alignment**:
  - `position: absolute; left: 0; bottom: -0.14em; width: 100%; height: 0.38em;`
  - Stroke: `#2391cf` (SGMG Blue)
  - Stroke-dashoffset animation triggered upon `IntersectionObserver` threshold `0.4`.

---

## 5. FAQ Accordion Smooth Expansion
- **Mechanism**:
  - Content measured using `scrollHeight`.
  - Default: `max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;`
  - Open: `max-height: ${scrollHeight}px; opacity: 1;`
  - Plus/minus icon rotates 45deg on open.
