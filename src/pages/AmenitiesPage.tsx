import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FamilySection from "../components/FamilySection";
import "../amenities.css";

interface AmenityFlowItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  includedTitle: string;
  includedDesc: string;
  image: string;
  alt: string;
}

const AMENITY_ITEMS: AmenityFlowItem[] = [
  {
    id: "amenity-1",
    tag: "Start Your Day",
    title: "Kitchen",
    description:
      "A clean, modern kitchen designed to make mornings easy, whether it’s a quick coffee before class or a simple meal to start the day without friction.",
    includedTitle: "What's included",
    includedDesc:
      "Modern appliances, ample storage, and a functional layout designed for everyday use.",
    image: "/assets/amenities/flow/amenity-1.avif",
    alt: "Modern clean kitchen with premium fittings and natural sunlight",
  },
  {
    id: "amenity-2",
    tag: "Head to Campus / Work",
    title: "Walkable Location",
    description:
      "A well-connected location that keeps everything within reach, making it easy to get to campus, classes, and daily essentials without long commutes or extra planning.",
    includedTitle: "What's included",
    includedDesc:
      "Walkable access to campus, nearby essentials, and quick connections around the area.",
    image: "/assets/amenities/flow/amenity-2.avif",
    alt: "Central tree-lined connectivity path and walkable avenue",
  },
  {
    id: "amenity-3",
    tag: "Stay Focused",
    title: "Study Lounge",
    description:
      "A calm, well-balanced space designed for concentration, offering a comfortable environment to settle in, stay productive, and move through the day with fewer distractions.",
    includedTitle: "What's included",
    includedDesc:
      "Quiet work areas, comfortable seating, and high-speed Wi-Fi.",
    image: "/assets/amenities/flow/amenity-3.avif",
    alt: "Quiet study lounge with ergonomic chairs and natural light",
  },
  {
    id: "amenity-4",
    tag: "Keep Moving",
    title: "Fitness Center",
    description:
      "A flexible training space built to support daily movement, quick workouts, and moments of reset between classes, work, and everything in between.",
    includedTitle: "What's included",
    includedDesc:
      "Cardio and strength equipment, open workout areas, and flexible access.",
    image: "/assets/amenities/flow/amenity-4.avif",
    alt: "State of the art fitness center with cardio equipment and weights",
  },
  {
    id: "amenity-5",
    tag: "Slow Down",
    title: "Pool, Sundeck & Hot Tub",
    description:
      "A resort-style setting designed for slower moments, where you can step outside, recharge, and ease into the evening at your own pace.",
    includedTitle: "What's included",
    includedDesc:
      "Resort pool with sun lounger deck, hot tub, and private cabana seating.",
    image: "/assets/amenities/flow/amenity-5.avif",
    alt: "Resort-style outdoor swimming pool and sun terrace",
  },
  {
    id: "amenity-6",
    tag: "Unwind Together",
    title: "Clubroom",
    description:
      "A relaxed, social space designed for connection, offering a comfortable setting to spend time with others or simply wind down at the end of the day.",
    includedTitle: "What's included",
    includedDesc:
      "Lounge seating, shared social areas, and flexible gathering spaces.",
    image: "/assets/amenities/flow/amenity-6.avif",
    alt: "Clubroom lounge with billiards table and gathering spaces",
  },
  {
    id: "amenity-7",
    tag: "Always Available",
    title: "Essentials",
    description:
      "A layer of everyday conveniences that quietly supports daily life, making sure everything you need is always close and ready when you need it.",
    includedTitle: "What's included",
    includedDesc:
      "On-site services, essential utilities, and convenient access.",
    image: "/assets/amenities/flow/amenity-7.avif",
    alt: "24/7 on-site facilities, gated security, and resident services",
  },
];

export default function AmenitiesPage() {
  const fsSectionRef = useRef<HTMLDivElement | null>(null);
  const routeLineRef = useRef<SVGPathElement | null>(null);
  const flowSectionRef = useRef<HTMLElement | null>(null);
  const cmsSectionRef = useRef<HTMLDivElement | null>(null);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);
  const clockContainerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    document.title = "Amenities • SGMG";
    window.scrollTo(0, 0);
  }, []);

  // 1. EXACT 21OAKS SVG ROUTE LINE DRAWING ANIMATION
  useEffect(() => {
    const section = fsSectionRef.current;
    const path = routeLineRef.current;
    if (!section || !path) return;

    const drawFromBottomToTop = true;
    let len = 0;

    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    }

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function setupPaths() {
      try {
        len = path!.getTotalLength();
        path!.style.strokeDasharray = `${len}`;
        path!.style.strokeDashoffset = drawFromBottomToTop ? `${-len}` : `${len}`;
      } catch (e) {
        console.warn("SVG error", e);
      }
    }

    function getTargetProgress() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      const startAt = 0.05;
      const endAt = 1.3;
      const shifted = (raw - startAt) / (endAt - startAt);
      return clamp(shifted, 0, 1);
    }

    let currentProgress = 0;
    let targetProgress = 0;
    let rafId: number | null = null;

    function render() {
      targetProgress = getTargetProgress();
      currentProgress += (targetProgress - currentProgress) * 0.03;
      const eased = easeInOutCubic(currentProgress);

      if (len > 0 && path) {
        const hiddenOffset = drawFromBottomToTop ? -len : len;
        path.style.strokeDashoffset = String(hiddenOffset * (1 - eased));
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0008) {
        rafId = requestAnimationFrame(render);
      } else {
        currentProgress = targetProgress;
        rafId = null;
      }
    }

    function requestRender() {
      if (!rafId) rafId = requestAnimationFrame(render);
    }

    setupPaths();
    requestRender();

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", () => {
      setupPaths();
      requestRender();
    });
    const lenis = (window as any).lenis;
    if (lenis) lenis.on("scroll", requestRender);

    return () => {
      window.removeEventListener("scroll", requestRender);
      if (lenis) lenis.off("scroll", requestRender);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 2. LOTTIE ANIMATION INITIALIZATION & PROGRESS SCRUBBING
  useEffect(() => {
    if (!lottieContainerRef.current) return;

    try {
      const anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/assets/lottie/sun-evening.json",
      });

      animRef.current = anim;
      anim.addEventListener("DOMLoaded", () => {
        anim.goToAndStop(0, true);
      });

      return () => {
        anim.destroy();
      };
    } catch (e) {
      console.warn("Lottie error:", e);
    }
  }, []);

  // 3. EXACT 21OAKS DYNAMIC CLOCK & DAY-TO-NIGHT COLOR SCRUBBING
  useEffect(() => {
    const section = cmsSectionRef.current;
    const flow = flowSectionRef.current;
    const root = clockContainerRef.current?.querySelector<HTMLElement>("[data-clock]");
    const timeClock = clockContainerRef.current;

    if (!section || !root || !flow || !timeClock) return;

    const START_HOUR = 8;
    const END_HOUR = 22;
    const START_AT = 0.12;
    const END_AT = 0.92;
    const NIGHT_START = 17;
    const NIGHT_END = 18;
    const CLOCK_COLOR_SCRUB_MIN_WIDTH = 768;

    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function rgbToCss(c: number[]) {
      return `rgb(${c[0]} ${c[1]} ${c[2]})`;
    }

    function parseRGB(str: string): number[] {
      const m = str && str.match(/rgba?\(([\d.\s]+),\s*([\d.\s]+),\s*([\d.\s]+)/i);
      if (!m) return [41, 41, 41];
      return [Number(m[1]), Number(m[2]), Number(m[3])];
    }

    function rgbLerp(c1: number[], c2: number[], t: number) {
      return [
        Math.round(lerp(c1[0], c2[0], t)),
        Math.round(lerp(c1[1], c2[1], t)),
        Math.round(lerp(c1[2], c2[2], t)),
      ];
    }

    function toUS(hour24: number) {
      const isPM = hour24 >= 12;
      let h12 = hour24 % 12;
      if (h12 === 0) h12 = 12;
      return {
        hh: String(h12).padStart(2, "0"),
        suffix: isPM ? "PM" : "AM",
      };
    }

    function sectionProgress() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      return clamp((raw - START_AT) / (END_AT - START_AT), 0, 1);
    }

    const initial = toUS(START_HOUR);

    const digits = document.createElement("span");
    digits.className = "clock-digits";

    function makeDigitWrap(ch: string) {
      const wrap = document.createElement("span");
      wrap.className = "digit-wrap";

      const cur = document.createElement("span");
      cur.className = "digit-current";
      cur.textContent = ch;

      const next = document.createElement("span");
      next.className = "digit-next";
      next.textContent = ch;
      next.style.transform = "translateY(100%)";

      wrap.appendChild(cur);
      wrap.appendChild(next);
      return { wrap, cur, next };
    }

    const d1 = makeDigitWrap(initial.hh[0]);
    const d2 = makeDigitWrap(initial.hh[1]);

    digits.appendChild(d1.wrap);
    digits.appendChild(d2.wrap);

    const mins = document.createElement("span");
    mins.textContent = ":00";

    const suffix = document.createElement("span");
    suffix.className = "clock-suffix";
    suffix.textContent = initial.suffix;

    root.textContent = "";
    root.appendChild(digits);
    root.appendChild(mins);
    root.appendChild(suffix);

    let prevHourFloat = START_HOUR;

    function setDigitProgress(
      digitObj: { cur: HTMLElement; next: HTMLElement },
      fromCh: string,
      toCh: string,
      t: number
    ) {
      if (fromCh === toCh) {
        digitObj.cur.textContent = toCh;
        digitObj.next.textContent = toCh;
        digitObj.cur.style.transform = "translateY(0%)";
        digitObj.next.style.transform = "translateY(100%)";
        return;
      }

      const p = clamp(t, 0, 1);
      digitObj.cur.textContent = fromCh;
      digitObj.next.textContent = toCh;

      digitObj.cur.style.transform = `translateY(${-100 * p}%)`;
      digitObj.next.style.transform = `translateY(${100 - 100 * p}%)`;
    }

    function updateClock(hourFloat: number) {
      const dir = hourFloat >= prevHourFloat ? 1 : -1;
      const baseHour = dir >= 0 ? Math.floor(hourFloat) : Math.ceil(hourFloat);
      const nextHour = clamp(baseHour + dir, START_HOUR, END_HOUR);

      const fracRaw = dir >= 0 ? hourFloat - baseHour : baseHour - hourFloat;
      const frac = clamp(fracRaw, 0, 1);

      const a = toUS(baseHour);
      const b = toUS(nextHour);

      setDigitProgress(d1, a.hh[0], b.hh[0], frac);
      setDigitProgress(d2, a.hh[1], b.hh[1], frac);

      suffix.textContent = frac < 0.5 ? a.suffix : b.suffix;
      prevHourFloat = hourFloat;
    }

    const allAmenityNodes = Array.from(flow.querySelectorAll<HTMLElement>(".amenities_item *"));
    const tagNodes = Array.from(flow.querySelectorAll<HTMLElement>(".amenities_item .tag_amen, .amenities_item .tag_amen *"));

    const textEls = allAmenityNodes.filter((el) => {
      if (el.matches(".tag_amen")) return false;
      if (el.closest(".tag_amen")) return false;
      if (el.querySelector(".tag_amen")) return false;
      return true;
    });

    const clockEls = [timeClock, ...Array.from(timeClock.querySelectorAll<HTMLElement>("*"))];

    const dayBg = [255, 255, 255];
    const nightBg = [18, 18, 20];
    const nightText = [255, 255, 255];

    const dayTextByEl = new Map<HTMLElement, number[]>();
    textEls.forEach((el) => dayTextByEl.set(el, parseRGB(getComputedStyle(el).color)));

    const dayClockByEl = new Map<HTMLElement, number[]>();
    clockEls.forEach((el) => dayClockByEl.set(el, parseRGB(getComputedStyle(el).color)));

    const dayTagByEl = new Map<HTMLElement, number[]>();
    tagNodes.forEach((el) => dayTagByEl.set(el, parseRGB(getComputedStyle(el).color)));

    function updateNightScrub(hourFloat: number) {
      const t = clamp((hourFloat - NIGHT_START) / (NIGHT_END - NIGHT_START), 0, 1);

      flow!.style.backgroundColor = rgbToCss(rgbLerp(dayBg, nightBg, t));

      textEls.forEach((el) => {
        const day = dayTextByEl.get(el) || [41, 41, 41];
        el.style.color = rgbToCss(rgbLerp(day, nightText, t));
      });

      if (window.innerWidth >= CLOCK_COLOR_SCRUB_MIN_WIDTH) {
        clockEls.forEach((el) => {
          const day = dayClockByEl.get(el) || [41, 41, 41];
          el.style.color = rgbToCss(rgbLerp(day, nightText, t));
        });
      } else {
        clockEls.forEach((el) => {
          el.style.color = "";
        });
      }

      tagNodes.forEach((el) => {
        const day = dayTagByEl.get(el) || [255, 255, 255];
        el.style.color = rgbToCss(day);
      });
    }

    function renderClock() {
      const p = sectionProgress();
      const hourFloat = START_HOUR + (END_HOUR - START_HOUR) * p;

      updateClock(hourFloat);
      updateNightScrub(hourFloat);

      // Scrub Lottie sun/evening animation
      if (animRef.current && animRef.current.totalFrames) {
        const targetFrame = p * (animRef.current.totalFrames - 1);
        animRef.current.goToAndStop(targetFrame, true);
      }
    }

    window.addEventListener("scroll", renderClock, { passive: true });
    window.addEventListener("resize", renderClock);
    const lenis = (window as any).lenis;
    if (lenis) lenis.on("scroll", renderClock);
    renderClock();

    return () => {
      window.removeEventListener("scroll", renderClock);
      window.removeEventListener("resize", renderClock);
      if (lenis) lenis.off("scroll", renderClock);
    };
  }, []);

  // 4. DYNAMIC SCRIBBLE INTERSECTION OBSERVER (EXACT 21OAKS DYNAMIC SCRIBBLE)
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-scribble]");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((el) => el.classList.add("scribble-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scribble-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="amenities-page">
      <Header />

      <main data-section="light">
        {/* Top Heading */}
        <div className="wrapper_general base_ab">
          <div className="middle_h1">
            <h1 className="h1 black spec_amenities">
              Built around your
              <br />
              daily{" "}
              <span data-scribble="1" className="scribble-wrap">
                routine
              </span>
            </h1>
          </div>
        </div>

        {/* Fullscreen Architectural Sketch & Drawn SVG Path */}
        <div ref={fsSectionRef} className="amenities_fs">
          <div className="path_overlay">
            <div className="path w-embed">
              <svg
                className="amenities-svg"
                width="100%"
                height="100%"
                viewBox="0 0 1920 1080"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  ref={routeLineRef}
                  className="route-line"
                  d="M1099.64 239.7C1102.11 240.32 1104.36 240.367 1106.39 239.84C1106.24 240.887 1106.48 242.127 1107.11 243.56C1105.64 244.913 1103.78 246.043 1101.53 246.95C1101.4 247.003 1101.28 247.082 1101.19 247.182C1101.09 247.282 1101.02 247.401 1100.97 247.53L1100.35 249.25C1100.3 249.394 1100.21 249.522 1100.09 249.621C1099.98 249.721 1099.84 249.79 1099.69 249.82C1094.78 250.813 1092.15 251.333 1091.79 251.38C1085.58 252.18 1080.37 253.93 1074.04 254.64C1072.28 254.84 1070.04 255.303 1067.32 256.03C1065.16 256.61 1062.93 257.147 1060.64 257.64C1058.79 256.667 1057.86 256.733 1057.85 257.84C1053.2 258.34 1046.86 259.92 1043.26 263.03C1043.02 263.233 1042.85 263.51 1042.78 263.817C1042.72 264.124 1042.75 264.445 1042.88 264.73C1043.01 265.016 1043.24 265.251 1043.51 265.399C1043.79 265.547 1044.11 265.6 1044.42 265.55C1045.03 265.457 1045.65 265.52 1046.29 265.74C1046.07 265.727 1045.92 265.823 1045.84 266.03C1045.82 266.082 1045.82 266.139 1045.83 266.193C1045.84 266.247 1045.88 266.295 1045.92 266.33C1047.31 267.61 1048.83 268.253 1050.49 268.26L1058.99 270.08C1059.16 270.293 1059.53 270.303 1060.1 270.11C1060.09 270.203 1060.08 270.29 1060.07 270.37C1060.07 270.519 1060.11 270.664 1060.2 270.782C1060.29 270.9 1060.42 270.984 1060.56 271.02C1065.76 272.393 1071.03 272.733 1076.38 272.04C1076.53 272.02 1076.85 272.13 1077.34 272.37C1077.23 272.39 1077.15 272.403 1077.08 272.41V272.42C1079.83 273.11 1082.54 274.73 1085.03 275.15C1089.09 275.83 1092.76 275.423 1096.04 273.93C1096.28 273.822 1096.54 273.763 1096.8 273.756C1097.07 273.749 1097.33 273.795 1097.58 273.89C1098.67 274.31 1099.73 275.043 1100.76 276.09C1100.98 276.317 1101.27 276.468 1101.59 276.522C1101.91 276.576 1102.23 276.53 1102.52 276.39C1104.26 275.55 1105.36 275.347 1105.83 275.78C1111.06 277.187 1116.12 278.21 1120.99 278.85C1121.44 278.91 1121.7 278.713 1121.75 278.26C1121.77 278.133 1121.76 278.013 1121.71 277.9C1122.52 278.453 1123.26 279.22 1123.92 280.2C1123.96 280.262 1124.02 280.309 1124.09 280.332C1124.17 280.355 1124.24 280.354 1124.31 280.329C1124.39 280.304 1124.45 280.256 1124.49 280.193C1124.53 280.13 1124.55 280.055 1124.54 279.98L1124.49 279.47L1142.76 281.72L1142.81 285.68C1142.81 285.711 1142.82 285.742 1142.83 285.768C1142.85 285.794 1142.88 285.813 1142.91 285.822C1142.94 285.831 1142.97 285.83 1143 285.819C1143.03 285.808 1143.05 285.787 1143.07 285.76C1143.9 284.553 1144.44 283.18 1144.71 281.64C1146.56 282.64 1148.55 282.897 1150.7 282.41L1170.62 286.97C1170.47 287.123 1170.45 287.337 1170.54 287.61C1170.58 287.726 1170.66 287.828 1170.77 287.9C1175.83 290.95 1179.4 293.01 1182.06 298.1L1179.47 298.5C1179.43 298.507 1179.4 298.525 1179.38 298.551C1179.35 298.578 1179.34 298.611 1179.33 298.646C1179.33 298.681 1179.34 298.715 1179.36 298.743C1179.38 298.771 1179.41 298.791 1179.44 298.8L1183.25 300.08C1183.02 302.533 1181.61 304.423 1179.04 305.75C1176.29 307.163 1173.67 308.66 1171.18 310.24L1170.95 309.78C1170.92 309.724 1170.88 309.677 1170.82 309.644C1170.77 309.611 1170.71 309.594 1170.64 309.594C1170.58 309.594 1170.52 309.611 1170.47 309.644C1170.42 309.677 1170.38 309.724 1170.35 309.78L1169.84 310.87L1166.39 311.58C1166.45 310.233 1165.87 310.83 1164.64 313.37C1164.43 313.19 1164.19 313.063 1163.91 312.99C1163.75 312.946 1163.59 312.937 1163.43 312.962C1163.27 312.988 1163.11 313.049 1162.98 313.14C1160.37 314.967 1157.87 316.287 1155.49 317.1C1151.24 318.56 1146.29 319.813 1140.63 320.86C1135.33 321.847 1130.53 322.977 1126.22 324.25C1119.17 326.337 1108.81 329.1 1095.16 332.54C1091.66 333.42 1089.19 333.933 1087.74 334.08C1084.67 334.393 1082.2 334.793 1080.31 335.28C1075.61 336.49 1067.8 336.42 1062.96 337.62C1060.7 338.18 1058 339.043 1054.86 340.21C1048.89 342.423 1042.01 344.47 1034.23 346.35C1030.82 347.177 1026.75 347.87 1022.01 348.43C1017.09 349.01 1013.03 349.813 1009.82 350.84C1004.87 352.42 997.623 354.433 988.089 356.88C987.969 356.909 987.862 356.977 987.785 357.074C987.709 357.171 987.667 357.291 987.667 357.415C987.667 357.539 987.709 357.659 987.785 357.756C987.862 357.853 987.969 357.921 988.089 357.95L989.189 358.23L976.329 361.22L952.249 365.99C951.942 366.052 951.623 365.991 951.359 365.819C951.096 365.647 950.909 365.378 950.839 365.07L950.179 362.04C950.17 362.003 950.149 361.968 950.121 361.942C950.093 361.915 950.059 361.897 950.021 361.889C949.984 361.882 949.946 361.886 949.912 361.9C949.878 361.914 949.849 361.939 949.829 361.97C949.423 362.543 949.143 362.957 948.989 363.21C948.904 363.341 948.852 363.492 948.839 363.65C948.773 364.503 948.479 365.247 947.959 365.88L947.719 365.58C947.635 365.48 947.526 365.405 947.403 365.363C947.279 365.321 947.147 365.313 947.019 365.34C942.499 366.307 937.283 367.537 931.369 369.03C924.903 370.67 918.786 371.87 913.019 372.63C912.499 372.696 911.998 372.87 911.549 373.14C909.749 374.227 907.256 374.867 904.069 375.06C902.863 375.133 901.809 375.933 900.909 377.46C900.758 377.71 900.55 377.925 900.299 378.09C897.099 380.21 893.809 378.57 891.099 377.85C890.784 377.765 890.451 377.758 890.129 377.83C888.456 378.203 887.546 379.167 887.399 380.72C885.306 380.787 883.979 380.873 883.419 380.98C853.759 386.76 826.173 393.58 800.659 401.44C799.339 401.853 798.093 402.357 796.919 402.95C796.841 402.989 796.777 403.051 796.735 403.127C796.693 403.203 796.675 403.291 796.683 403.378C796.692 403.464 796.727 403.546 796.783 403.613C796.84 403.68 796.915 403.727 796.999 403.75L797.519 403.89L794.609 405.31C794.468 405.378 794.354 405.491 794.285 405.632C794.216 405.772 794.196 405.932 794.229 406.085C794.261 406.238 794.343 406.376 794.463 406.476C794.583 406.577 794.733 406.635 794.889 406.64L796.679 406.7L794.509 407.48C794.403 407.518 794.309 407.583 794.235 407.668C794.161 407.753 794.11 407.856 794.087 407.966C794.064 408.076 794.07 408.19 794.103 408.298C794.137 408.405 794.198 408.503 794.279 408.58C794.933 409.193 795.756 409.4 796.749 409.2C798.876 408.767 800.433 408.503 801.419 408.41L823.999 415.09C824.046 415.103 824.09 415.12 824.129 415.14C826.043 416.107 828.213 416.41 830.639 416.05L828.109 416.65C828.018 416.67 827.936 416.723 827.88 416.799C827.824 416.874 827.798 416.967 827.805 417.061C827.812 417.155 827.853 417.243 827.92 417.309C827.987 417.375 828.076 417.414 828.169 417.42C830.229 417.567 831.933 417.43 833.279 417.01C835.499 416.31 836.779 416.6 838.199 417.98C838.369 418.143 838.599 418.259 838.848 418.305C839.098 418.351 839.349 418.325 839.557 418.232C839.765 418.139 839.916 417.985 839.983 417.797C840.049 417.61 840.027 417.401 839.919 417.21C839.673 416.79 839.699 416.4 839.999 416.04C840.063 415.97 840.139 415.914 840.225 415.875C840.311 415.835 840.404 415.813 840.499 415.81L852.389 415.62C852.289 416.447 853.159 417.08 854.999 417.52C861.673 419.093 868.289 420.87 874.849 422.85C879.019 424.11 883.709 425 887.369 426.14C897.069 429.16 903.509 431.207 906.689 432.28C917.896 436.047 929.429 440.78 941.289 446.48C942.623 447.12 944.279 448.107 946.259 449.44C950.019 451.99 955.209 454.84 957.889 457.93C962.289 463.01 964.859 469.21 963.609 475.66C962.589 480.947 960.336 485.703 956.849 489.93C954.503 492.777 950.339 496.09 944.359 499.87C936.439 504.883 931.846 507.853 930.579 508.78C929.973 509.227 928.856 509.777 927.229 510.43C920.836 512.99 915.569 515.4 911.429 517.66C907.543 519.773 904.246 521.137 901.539 521.75C901.006 521.87 895.346 523.63 884.559 527.03C883.073 527.503 879.593 528.247 874.119 529.26C870.613 529.907 867.139 530.707 863.699 531.66C862.033 532.113 858.649 533.383 853.549 535.47C853.069 535.59 852.269 535.367 851.149 534.8C850.696 534.573 850.269 534.61 849.869 534.91C849.176 535.43 849.026 536.003 849.419 536.63C845.573 537.917 841.999 539.707 838.699 542C838.123 542.41 837.481 542.721 836.799 542.92C829.973 544.953 821.949 548.033 812.729 552.16C810.096 553.333 804.923 554.977 797.209 557.09C793.449 558.123 788.706 559.727 782.979 561.9C774.559 565.093 767.229 567.513 760.989 569.16C758.496 569.813 756.909 570.317 756.229 570.67L755.779 570.56C755.659 570.527 755.531 570.533 755.413 570.576C755.295 570.619 755.193 570.697 755.119 570.8L754.589 571.55C754.496 571.363 754.356 571.253 754.169 571.22C754.023 571.187 753.846 571.233 753.639 571.36C751.586 572.527 749.206 573.637 746.499 574.69C738.699 577.73 730.736 580.687 722.609 583.56C719.536 584.647 716.636 586.083 713.909 587.87C711.136 589.677 707.053 592.58 701.659 596.58C698.629 598.83 694.529 602.69 694.609 606.81C694.616 607.165 694.705 607.514 694.869 607.83C696.663 611.183 699.249 613.587 702.629 615.04C704.469 615.84 705.609 616.46 706.049 616.9C706.128 616.986 706.228 617.051 706.339 617.09L717.779 621.26C718.173 623.353 719.489 625.353 721.729 627.26C721.74 627.267 721.752 627.271 721.765 627.27C721.778 627.27 721.79 627.265 721.8 627.258C721.81 627.25 721.817 627.239 721.82 627.227C721.824 627.215 721.824 627.202 721.819 627.19L719.189 621.86C727.069 625.287 732.096 627.4 734.269 628.2C740.509 630.48 750.289 633.37 758.579 635.32C758.586 635.32 767.169 637.28 784.329 641.2C791.456 642.827 797.336 643.937 801.969 644.53C807.909 645.297 813.846 646.097 819.779 646.93C820.226 646.99 821.316 647.25 823.049 647.71C824.183 648.01 825.299 648.123 826.399 648.05L829.069 651.04C829.128 651.101 829.206 651.142 829.29 651.156C829.374 651.17 829.461 651.157 829.536 651.118C829.61 651.08 829.67 651.018 829.705 650.942C829.74 650.867 829.749 650.782 829.729 650.7L829.329 649.05C831.696 648.903 833.713 649.013 835.379 649.38C843.859 651.26 850.193 652.653 854.379 653.56C860.653 654.92 865.769 656.317 869.729 657.75C869.769 657.763 874.846 659.28 884.959 662.3C893.119 664.733 901.566 667.993 910.299 672.08C917.829 675.6 924.659 680.38 931.029 685.69C934.003 688.163 936.616 692.033 938.869 697.3C939.109 697.86 939.963 698.807 941.429 700.14C941.529 701.28 942.143 702.107 943.269 702.62C946.643 709.2 948.219 715.77 947.999 722.33C947.953 723.743 947.699 725.22 947.239 726.76C945.639 732.113 943.533 737.24 940.919 742.14C938.199 747.247 934.393 751.84 929.499 755.92C928.566 756.7 928.526 757.37 929.379 757.93L924.339 759.82C924.269 759.845 924.208 759.89 924.164 759.951C924.12 760.011 924.095 760.083 924.093 760.158C924.091 760.233 924.111 760.306 924.152 760.369C924.192 760.432 924.251 760.481 924.319 760.51L925.669 761.12C921.436 765.193 916.529 768.567 910.949 771.24C910.684 771.369 910.466 771.583 910.329 771.85L910.009 772.48C909.983 772.533 909.97 772.592 909.972 772.652C909.974 772.711 909.99 772.769 910.02 772.821C910.049 772.872 910.091 772.915 910.142 772.947C910.193 772.978 910.25 772.996 910.309 773L914.399 773.29L909.179 773.42C909.053 773.423 908.932 773.467 908.834 773.544C908.737 773.622 908.668 773.73 908.639 773.85C908.606 773.963 908.576 774.097 908.549 774.25C907.696 774.037 907.053 774.063 906.619 774.33C903.186 776.437 900.859 777.787 899.639 778.38C897.479 779.44 895.189 780.837 892.769 782.57C889.116 785.19 884.409 787.797 878.649 790.39C878.343 790.53 878.049 790.701 877.769 790.9C874.769 793.04 871.639 794.967 868.379 796.68C865.249 798.32 862.279 800.45 859.039 802.1C855.933 803.687 853.586 804.99 851.999 806.01C849.453 807.65 846.776 809.32 843.969 811.02C841.663 811.667 839.426 812.87 837.259 814.63C837.055 814.794 836.816 814.911 836.559 814.97L833.519 815.7C833.011 815.819 832.535 816.033 832.119 816.33C831.586 816.703 756.899 864.107 751.139 867.08C750.086 867.62 749.763 868.19 750.169 868.79C746.623 870.337 743.506 870.853 740.819 870.34C738.846 869.967 734.916 868.69 729.029 866.51C729.649 866.67 730.359 866.55 731.159 866.15C731.282 866.088 731.381 865.987 731.441 865.863C731.501 865.739 731.519 865.599 731.492 865.464C731.464 865.329 731.394 865.206 731.29 865.115C731.187 865.024 731.057 864.97 730.919 864.96C728.926 864.82 727.389 865.033 726.309 865.6C721.089 863.713 716.083 861.977 711.289 860.39C710.336 860.07 709.619 860.103 709.139 860.49C709.233 860.203 709.216 859.997 709.089 859.87C708.956 859.737 708.789 859.727 708.589 859.84C708.429 859.94 708.309 860.077 708.229 860.25L706.049 857.33C705.651 856.796 705.463 856.133 705.522 855.469C705.581 854.805 705.883 854.186 706.369 853.73L708.209 852.01C708.449 852.65 708.663 852.983 708.849 853.01C710.236 853.243 711.563 852.94 712.829 852.1C712.676 852.58 712.646 853.007 712.739 853.38C712.783 853.546 712.868 853.698 712.987 853.822C713.106 853.946 713.255 854.038 713.419 854.09C717.699 855.417 720.929 856.517 723.109 857.39C728.219 859.45 732.659 860.44 738.189 862.47C740.999 863.5 743.289 863.8 745.879 862.59C750.699 860.337 828.946 810.897 837.539 805.73C841.553 803.317 846.559 800.403 852.559 796.99C856.193 794.93 858.719 793.44 860.139 792.52C863.186 790.553 865.749 789.14 867.829 788.28C871.639 786.71 876.109 783.21 878.519 781.49C879.919 780.497 883.139 778.88 888.179 776.64C892.593 774.68 897.599 771.993 903.199 768.58C906.659 766.47 909.249 763.24 912.619 760.94C916.759 758.12 920.459 754.857 923.719 751.15C924.126 750.683 927.383 746.727 933.489 739.28C938.236 733.48 940.633 726.757 940.679 719.11C940.693 717.243 940.423 715.403 939.869 713.59C938.849 710.223 937.406 707.04 935.539 704.04C935.946 703.707 936.183 703.333 936.249 702.92C936.329 702.467 936.159 702.21 935.739 702.15C935.393 702.103 935.059 702.25 934.739 702.59C929.946 697.777 925.283 692.9 920.749 687.96C919.523 686.627 917.443 685.31 914.509 684.01C907.779 681.04 903.639 678.61 896.489 675.04C894.669 674.133 892.486 673.297 889.939 672.53C867.093 665.677 855.463 662.197 855.049 662.09C850.663 660.897 847.299 660.123 844.959 659.77C842.126 659.343 838.749 658.573 834.829 657.46C833.629 657.12 832.186 657.053 830.499 657.26C830.119 656.46 829.686 656.39 829.199 657.05C828.946 656.537 828.443 656.327 827.689 656.42C826.796 656.527 826.216 656.56 825.949 656.52C819.023 655.44 811.816 654.553 804.329 653.86C803.904 653.827 803.485 653.743 803.079 653.61C798.566 652.143 793.769 651.043 788.689 650.31C781.809 649.317 777.003 648.527 774.269 647.94C765.256 646 757.626 644.297 751.379 642.83C747.179 641.843 741.876 639.887 735.469 636.96C732.343 635.527 728.336 634.33 723.449 633.37C723.429 632.877 723.309 632.577 723.089 632.47C722.863 632.357 722.663 632.437 722.489 632.71C722.363 632.91 722.289 633.15 722.269 633.43C722.236 633.303 722.196 633.19 722.149 633.09C722.096 632.958 722.015 632.84 721.914 632.744C721.812 632.647 721.691 632.574 721.559 632.53C714.899 630.22 708.289 628.13 702.269 624.04C695.889 619.71 686.609 616.12 685.739 606.5C685.119 599.51 692.309 591.42 697.739 588C702.099 585.26 707.233 582.59 713.139 579.99C713.386 579.883 718.279 577.59 727.819 573.11C736.173 569.197 744.999 566.077 754.299 563.75C754.406 565.983 755.526 565.413 757.659 562.04C757.799 561.813 757.776 561.623 757.589 561.47C762.049 560.003 768.399 558.29 776.639 556.33C781.526 555.17 787.356 553.103 794.129 550.13C797.919 548.47 802.279 547.18 805.639 545.92C808.559 544.82 811.009 543.967 812.989 543.36C816.756 542.213 819.209 541.343 820.349 540.75C825.549 538.063 830.336 536.183 834.709 535.11C835.547 534.904 836.358 534.605 837.129 534.22C844.139 530.76 851.009 528.2 858.959 526.27C859.819 526.063 862.953 525.093 868.359 523.36C871.839 522.24 875.483 521.31 879.289 520.57C883.179 519.81 887.669 518.11 891.379 516.88C893.326 516.233 896.369 515.337 900.509 514.19C904.929 512.97 910.339 511.48 914.359 509.06C917.446 507.207 922.303 504.74 928.929 501.66C935.579 498.57 940.149 492.52 945.939 488.66C948.186 487.16 950.339 485.31 952.399 483.11C960.109 474.89 955.079 464.65 947.139 459.06C940.686 454.513 934.649 450.89 929.029 448.19C927.403 447.41 925.233 446.627 922.519 445.84C918.406 444.647 915.773 443.817 914.619 443.35C907.899 440.623 900.909 438.107 893.649 435.8C892.176 435.327 889.196 434.763 884.709 434.11C881.023 433.57 878.063 432.94 875.829 432.22C874.203 431.693 869.903 430.35 862.929 428.19C862.823 428.157 862.722 428.113 862.629 428.06L858.879 425.89C858.644 425.759 858.381 425.694 858.119 425.7C853.133 425.767 849.339 425.347 846.739 424.44C844.666 423.727 841.199 422.38 836.339 420.4C835.975 420.247 835.591 420.146 835.199 420.1C833.153 419.86 831.643 419.43 830.669 418.81C830.316 418.588 829.907 418.47 829.489 418.47H818.129C817.554 418.47 816.982 418.369 816.439 418.17L795.239 410.52C795.093 410.466 794.932 410.468 794.786 410.525C794.641 410.582 794.522 410.69 794.45 410.829C794.379 410.968 794.361 411.128 794.4 411.279C794.438 411.43 794.53 411.562 794.659 411.65C797.733 413.743 801.133 415.32 804.859 416.38C819.453 420.52 828.943 423.107 833.329 424.14C839.479 425.58 845.939 427.72 850.939 429.38C851.559 429.59 852.129 429.42 852.659 429.14C852.599 429.607 853.066 429.71 854.059 429.45L861.679 432C861.752 432.023 861.83 432.029 861.906 432.018C861.981 432.006 862.053 431.976 862.115 431.931C862.178 431.887 862.229 431.828 862.264 431.76C862.299 431.692 862.318 431.617 862.319 431.54L862.329 431.01C864.096 432.53 865.733 433.39 867.239 433.59C869.486 433.563 871.286 433.71 872.639 434.03C883.339 436.53 896.759 440.78 909.079 444.37C915.126 446.137 918.856 447.33 920.269 447.95C926.349 450.637 933.193 455.177 940.799 461.57C944.033 464.29 945.763 467.63 945.989 471.59C946.679 483.56 933.879 493.08 923.699 496.91C923.161 497.109 922.644 497.375 922.159 497.7C918.413 500.2 915.816 501.743 914.369 502.33C907.429 505.16 895.459 509.65 886.179 512.86C882.279 514.207 878.183 515.9 873.889 517.94C873.836 517.96 873.786 517.98 873.739 518L868.149 519.73C868.116 519.737 868.086 519.743 868.059 519.75C862.713 520.69 858.889 521.567 856.589 522.38C847.629 525.54 838.329 527.92 830.319 531.75C829.146 532.31 827.386 532.933 825.039 533.62C824.326 533.827 822.606 534.537 819.879 535.75C817.553 536.783 815.553 537.26 813.879 537.18C813.708 537.171 813.538 537.2 813.382 537.266C813.226 537.332 813.088 537.433 812.979 537.56C812.693 537.893 811.999 538.207 810.899 538.5C809.266 538.94 808.389 539.19 808.269 539.25C805.936 540.477 803.186 541.473 800.019 542.24C797.906 542.753 795.149 543.723 791.749 545.15C787.389 546.977 782.199 548.667 776.179 550.22C775.547 550.386 774.932 550.604 774.339 550.87C770.286 552.71 766.183 554.273 762.029 555.56C753.109 558.33 744.619 561.34 738.549 563.12C730.839 565.38 724.609 568.56 717.989 570.82C714.589 571.98 711.353 573.43 708.279 575.17C703.446 577.91 700.393 579.72 699.119 580.6C690.689 586.41 685.019 589.83 680.669 595.37C674.809 602.85 677.819 614.01 683.639 620.59C685.973 623.223 688.709 625.513 691.849 627.46C693.783 628.653 697.069 630.033 701.709 631.6C708.249 633.8 712.246 635.29 713.699 636.07C715.893 637.25 718.203 638.037 720.629 638.43C720.981 638.483 721.327 638.581 721.659 638.72C723.809 639.63 725.639 640.44 727.759 640.88C733.779 642.14 739.836 643.943 745.929 646.29C748.929 647.45 751.949 648.23 755.729 649.13C761.209 650.44 766.209 651.02 771.249 652.85C771.383 652.897 771.52 652.933 771.659 652.96L826.179 662.66C826.279 662.847 826.399 662.987 826.539 663.08C826.686 663.18 826.866 663.19 827.079 663.11C827.353 663.01 827.553 662.887 827.679 662.74C835.806 664.513 843.869 666.303 851.869 668.11C854.629 668.73 857.939 669.08 860.949 669.78C868.059 671.43 875.639 672.45 881.719 674.2C891.169 676.91 900.709 679.27 908.899 684.54C916.819 689.65 922.299 692.65 925.229 698.75C927.723 703.943 929.229 707.043 929.749 708.05C931.309 711.05 931.669 713.73 931.609 716.6C931.509 721.36 931.053 725.48 930.239 728.96C929.746 731.067 927.633 735.843 923.899 743.29C923.833 743.423 923.752 743.544 923.659 743.65L918.079 750.13C917.981 750.255 917.909 750.398 917.869 750.55L917.559 751.81C917.539 751.887 917.501 751.958 917.449 752.018C917.397 752.078 917.332 752.125 917.259 752.155C917.186 752.186 917.107 752.198 917.029 752.192C916.951 752.186 916.876 752.161 916.809 752.12C916.083 751.68 915.259 751.9 914.339 752.78C912.859 754.207 912.033 755.46 911.859 756.54C910.986 756.68 910.303 757.003 909.809 757.51C909.762 757.558 909.727 757.618 909.709 757.683C909.692 757.749 909.692 757.818 909.709 757.884C909.726 757.949 909.76 758.009 909.807 758.058C909.855 758.106 909.914 758.141 909.979 758.16C910.259 758.247 910.616 758.24 911.049 758.14C907.829 760.04 904.719 762.73 901.869 764.42C895.923 767.947 889.153 772.393 881.559 777.76C879.353 779.32 875.399 781.337 869.699 783.81C869.327 783.969 868.975 784.167 868.649 784.4C865.399 786.71 862.239 788.97 858.709 790.96C852.123 794.667 847.129 797.57 843.729 799.67C839.639 802.2 835.949 803.94 831.589 806.92C831.556 806.94 831.523 806.96 831.489 806.98L744.599 860.48C744.157 860.705 743.678 860.844 743.189 860.89C740.876 861.103 738.883 860.947 737.209 860.42C733.769 859.34 727.899 857.22 719.599 854.06C718.526 853.647 717.316 852.927 715.969 851.9C715.476 851.513 714.776 851.407 713.869 851.58L725.849 848.5L740.839 854.45C742.179 855.137 744.213 854.627 746.939 852.92C756.319 847.033 832.569 798.367 832.609 798.38C832.743 798.433 833.043 798.163 833.509 797.57C833.716 797.303 834.006 797.173 834.379 797.18C834.593 797.18 834.896 797.05 835.289 796.79C837.123 795.557 838.686 794.293 839.979 793C843.806 791.627 847.203 789.5 850.169 786.62C850.355 786.441 850.564 786.286 850.789 786.16L861.519 780.21C861.473 780.67 861.523 781.11 861.669 781.53C861.709 781.651 861.775 781.762 861.862 781.854C861.95 781.946 862.058 782.017 862.177 782.062C862.296 782.108 862.423 782.125 862.55 782.115C862.677 782.104 862.8 782.065 862.909 782C869.129 778.4 875.309 775.12 880.389 769.82C880.496 769.707 880.62 769.606 880.759 769.52L887.729 765.18L895.899 758.66L899.059 756.14C903.686 752.8 907.339 749.16 910.019 745.22C913.539 740.04 916.213 736.223 918.039 733.77C921.029 729.77 924.929 722.13 923.919 717.11C923.126 713.203 921.369 709.197 918.649 705.09C918.269 704.517 917.753 704.173 917.099 704.06C917.193 703.847 917.246 703.653 917.259 703.48C917.286 703.267 917.216 703.09 917.049 702.95C916.829 702.757 916.533 702.657 916.159 702.65L916.349 702.36C916.429 702.239 916.464 702.095 916.45 701.951C916.435 701.807 916.371 701.672 916.269 701.57C914.183 699.443 912.053 697.363 909.879 695.33C908.119 693.68 906.389 692.69 904.089 691.3C903.583 690.993 902.753 690.6 901.599 690.12C896.706 688.087 890.386 685.843 882.639 683.39C871.239 679.78 860.429 678.97 847.379 674.7C844.393 673.727 841.363 673.03 838.289 672.61C837.916 672.557 836.023 672.063 832.609 671.13C830.696 670.61 828.756 670.387 826.789 670.46L815.689 668.03L806.189 666.59C803.576 664.663 801.239 664.183 799.179 665.15C793.299 664.237 787.636 663.2 782.189 662.04C772.529 659.98 762.796 658.313 752.989 657.04C752.358 656.954 751.738 656.796 751.139 656.57C744.873 654.163 738.493 652.06 731.999 650.26C730.019 649.713 726.649 648.007 721.889 645.14C721.123 644.68 720.683 644.917 720.569 645.85C719.163 643.917 718.133 643.643 717.479 645.03C716.399 642.483 714.656 641.593 712.249 642.36L711.639 641.39C711.565 641.268 711.453 641.175 711.32 641.126C711.187 641.076 711.041 641.073 710.904 641.116C710.768 641.16 710.649 641.248 710.567 641.366C710.485 641.484 710.443 641.626 710.449 641.77L710.699 646.17C710.709 646.312 710.68 646.453 710.616 646.58C710.552 646.707 710.456 646.815 710.337 646.892C710.218 646.97 710.08 647.014 709.938 647.021C709.796 647.027 709.655 646.996 709.529 646.93C709.076 646.69 708.803 646.373 708.709 645.98C708.303 644.24 707.919 642.483 707.559 640.71C707.446 640.13 707.119 639.89 706.579 639.99C706.51 640.005 706.445 640.039 706.392 640.088C706.34 640.138 706.301 640.2 706.279 640.27L706.039 641.08C698.773 640.14 691.809 637.047 685.149 631.8C678.029 626.193 673.089 619.81 670.329 612.65C669.336 610.063 668.899 607.037 669.019 603.57C669.419 592.19 675.859 585.81 684.519 579.38C687.106 577.46 690.693 575.357 695.279 573.07C707.386 567.037 714.486 563.543 716.579 562.59C720.433 560.83 723.863 559.573 726.869 558.82C732.059 557.52 736.349 555.72 741.629 554.19C741.684 554.174 741.735 554.147 741.779 554.111C741.823 554.075 741.859 554.031 741.885 553.98C741.911 553.93 741.927 553.874 741.931 553.817C741.935 553.761 741.928 553.704 741.909 553.65C741.869 553.537 741.706 553.463 741.419 553.43C746.586 553.45 751.736 552.687 756.869 551.14C756.947 551.118 757.017 551.077 757.074 551.021C757.131 550.964 757.173 550.894 757.195 550.816C757.217 550.739 757.219 550.658 757.2 550.58C757.182 550.501 757.144 550.429 757.089 550.37C756.976 550.243 756.629 550.2 756.049 550.24L760.209 548.67C760.289 548.643 760.369 548.62 760.449 548.6C764.089 547.887 767.473 546.85 770.599 545.49C770.413 545.823 770.503 546.413 770.869 547.26C770.905 547.347 770.965 547.422 771.043 547.475C771.121 547.528 771.212 547.557 771.307 547.559C771.402 547.561 771.496 547.536 771.578 547.486C771.66 547.437 771.726 547.365 771.769 547.28L773.579 543.6C778.506 541.24 782.123 539.677 784.429 538.91C791.136 536.683 797.856 534.32 804.589 531.82C805.469 532.733 806.116 532.993 806.529 532.6C806.476 531.513 807.776 530.683 810.429 530.11C819.049 528.25 827.439 525.66 835.599 522.34C835.753 522.28 836.969 521.897 839.249 521.19C840.676 520.75 841.746 520.077 842.459 519.17C843.333 519.103 844.466 519.013 845.859 518.9C847.439 518.767 847.783 518.53 846.889 518.19C849.656 517.517 852.263 516.527 854.709 515.22C854.982 515.074 855.27 514.953 855.569 514.86C859.609 513.633 863.643 512.383 867.669 511.11C869.249 510.61 869.669 510.067 868.929 509.48L872.639 508.16C872.626 508.8 872.959 509.023 873.639 508.83C878.926 507.357 885.153 504.99 892.319 501.73C894.313 501.67 895.996 500.783 897.369 499.07C897.196 499.39 897.183 499.617 897.329 499.75C897.556 499.957 897.823 500 898.129 499.88C903.143 497.893 908.316 495.897 913.649 493.89C921.663 490.877 928.923 485.603 935.429 478.07C937.476 475.697 937.983 473.16 936.949 470.46C936.043 468.087 933.956 465.603 930.689 463.01C923.749 457.497 916.063 453.943 907.629 452.35C906.951 452.224 906.288 452.033 905.649 451.78C898.176 448.8 890.499 446.547 882.619 445.02C881.946 444.893 881.546 445.073 881.419 445.56C880.799 444.66 879.976 444.16 878.949 444.06L869.939 442.98C869.78 442.96 869.619 442.93 869.459 442.89L858.069 439.96C857.91 439.92 857.756 439.867 857.609 439.8C854.059 438.19 850.729 436.48 846.999 435.42C837.193 432.613 827.493 430.223 817.899 428.25C813.519 428.077 809.253 428.347 805.099 429.06C803.913 429.26 803.103 429.293 802.669 429.16C801.843 428.9 801.456 428.25 801.509 427.21C801.629 424.637 801.216 423.4 800.269 423.5L797.869 423.12C795.149 420.1 791.989 418.273 788.389 417.64L784.209 411.43C784.816 410.07 783.683 409.81 780.809 410.65C780.096 410.856 779.335 410.784 778.679 410.45L775.649 408.9C775.544 408.845 775.458 408.759 775.403 408.654C775.348 408.549 775.327 408.429 775.342 408.311C775.358 408.193 775.409 408.083 775.489 407.995C775.569 407.907 775.674 407.846 775.789 407.82L782.089 406.44C782.218 406.414 782.332 406.34 782.409 406.233C782.487 406.126 782.522 405.993 782.509 405.86C782.449 405.327 781.996 404.91 781.149 404.61C781.196 399.05 783.669 395.02 788.569 392.52C790.369 391.6 794.433 389.857 800.759 387.29C804.606 385.73 808.766 384.24 813.239 382.82C826.926 378.467 835.999 375.783 840.459 374.77C846.626 373.363 852.623 371.857 858.449 370.25C866.789 367.943 872.103 366.46 874.389 365.8C881.369 363.793 886.693 362.38 890.359 361.56C902.579 358.807 912.156 356.887 919.089 355.8C924.399 354.97 931.229 352.84 937.469 351.95C940.649 351.49 943.949 350.31 946.939 349.95C952.659 349.243 958.329 348.687 963.949 348.28C964.063 348.273 964.173 348.242 964.274 348.191C964.376 348.139 964.465 348.067 964.538 347.979C964.611 347.891 964.666 347.789 964.699 347.679C964.731 347.57 964.742 347.454 964.729 347.34C964.329 343.827 964.493 340.25 965.219 336.61C965.339 336.003 965.649 335.583 966.149 335.35C966.843 336.437 967.533 337.123 968.219 337.41C966.433 340.457 965.559 343.773 965.599 347.36C965.602 347.526 965.638 347.69 965.705 347.841C965.771 347.993 965.868 348.129 965.989 348.242C966.109 348.355 966.251 348.443 966.406 348.499C966.561 348.555 966.725 348.579 966.889 348.57C970.189 348.397 972.079 348.277 972.559 348.21C975.533 347.777 982.343 346.4 992.989 344.08C993.395 343.993 993.81 343.943 994.229 343.93C1000.72 343.71 1007 342.527 1013.05 340.38L1013.41 342.65C1013.42 342.735 1013.46 342.814 1013.53 342.873C1013.59 342.933 1013.67 342.97 1013.75 342.979C1013.84 342.988 1013.93 342.969 1014 342.924C1014.07 342.879 1014.13 342.811 1014.16 342.73L1015.25 339.93L1027.8 337.78C1027.84 337.773 1027.88 337.767 1027.91 337.76C1031.2 336.787 1034.53 335.977 1037.9 335.33C1038.35 335.243 1038.65 335.07 1038.8 334.81C1038.97 334.51 1039.02 334.153 1038.97 333.74C1039.8 334.42 1040.43 335.277 1040.88 336.31C1040.95 336.474 1041.06 336.621 1041.19 336.741C1041.32 336.861 1041.48 336.952 1041.65 337.008C1041.82 337.064 1042 337.083 1042.17 337.064C1042.35 337.046 1042.52 336.99 1042.68 336.9L1049.85 332.72C1049.81 333.78 1050.15 334.26 1050.87 334.16C1062.07 332.58 1072.33 330.93 1083.38 328.07C1096.63 324.65 1102.83 322.82 1113.9 320.7C1120.65 319.407 1127.37 317.77 1134.05 315.79C1142.28 313.35 1150.44 311.76 1159.09 308.78C1160.1 308.433 1160.64 308.04 1160.73 307.6C1160.73 307.581 1160.73 307.562 1160.72 307.545C1160.71 307.528 1160.7 307.515 1160.68 307.51C1160.66 307.505 1160.64 307.507 1160.62 307.516C1160.61 307.526 1160.59 307.541 1160.59 307.56C1160.54 307.693 1159.86 307.743 1158.55 307.71C1158.42 307.71 1158.29 307.723 1158.16 307.75C1148.85 310.183 1140.76 312.213 1133.91 313.84C1128.73 315.08 1123.84 315.59 1119.87 316.25C1118.18 316.53 1114.93 317.36 1110.12 318.74C1105.23 320.147 1101.34 321.067 1098.47 321.5C1091.29 322.58 1085.98 324.29 1078.73 325.96C1077.12 326.333 1074.47 327.073 1070.77 328.18C1067.57 329.14 1064.33 329.833 1061.04 330.26L1066.36 323.89C1072.17 321.923 1077.95 319.95 1083.68 317.97C1089.07 316.11 1093.92 314.993 1098.24 314.62C1103.91 314.12 1107.65 313.61 1109.45 313.09C1110.6 312.757 1115.37 311.963 1123.74 310.71C1125.91 310.383 1132.52 308.65 1143.57 305.51C1146.02 304.81 1147.59 304.42 1148.26 304.34C1156.33 303.38 1163.24 301.62 1170.66 298.32C1170.71 298.301 1170.75 298.267 1170.78 298.224C1170.8 298.18 1170.82 298.129 1170.81 298.078C1170.81 298.027 1170.79 297.977 1170.76 297.936C1170.73 297.895 1170.69 297.865 1170.64 297.85C1165.4 296.083 1160.12 294.833 1154.81 294.1C1149.73 292.4 1144.91 291.647 1140.34 291.84C1135.75 291.7 1131.27 291.047 1126.9 289.88C1126.68 289.193 1126.17 289.01 1125.38 289.33C1125.19 289.41 1124.88 289.703 1124.44 290.21C1119.73 289.52 1115.03 288.72 1110.33 288.47C1103.87 288.13 1097.7 286.43 1091.24 285.26C1090.56 285.14 1089.89 284.939 1089.26 284.66C1082.81 281.84 1076.1 280.32 1069.13 280.1C1066.79 278.42 1064.29 277.95 1061.63 278.69C1058.18 277.363 1054.1 276.227 1049.4 275.28C1045.63 274.513 1042.08 272.83 1038.77 270.23C1038.57 270.073 1038.32 269.973 1038.06 269.94L1037.68 269.9C1037.03 269.687 1036.44 269.61 1035.93 269.67C1034.35 267.943 1033.46 266.477 1033.27 265.27C1033.1 264.177 1033.21 261.807 1033.6 258.16C1034.33 258.127 1034.74 257.913 1034.83 257.52C1035.08 257.313 1035.45 257.19 1035.94 257.15C1036.09 257.138 1036.23 257.085 1036.34 256.996C1036.46 256.908 1036.55 256.788 1036.6 256.65C1039.19 249.25 1045.79 248.26 1052.37 246.12C1057.48 244.45 1063.34 243.79 1068.73 242.93C1068.75 242.923 1071.46 242.37 1076.85 241.27C1080.12 240.597 1083.56 240.247 1087.15 240.22C1088.55 240.567 1089.87 240.543 1091.11 240.15C1093.67 240.663 1094.9 240.28 1094.79 239C1095.86 240.193 1097.47 240.427 1099.64 239.7ZM1083.55 247.74C1080.86 247.633 1077.81 247.78 1074.38 248.18C1067.87 248.947 1062.57 249.78 1058.46 250.68C1053.54 251.76 1048.97 253.76 1044.34 255.01C1043.35 255.27 1042.57 255.823 1042 256.67C1041.93 256.772 1041.9 256.893 1041.91 257.015C1041.92 257.136 1041.97 257.252 1042.05 257.342C1042.13 257.432 1042.24 257.493 1042.35 257.515C1042.47 257.536 1042.59 257.517 1042.7 257.46C1046.49 255.493 1050.51 253.997 1054.76 252.97C1058.78 251.99 1065.43 251.86 1070.51 250.68C1074.04 249.86 1078.45 249.027 1083.72 248.18C1083.73 248.179 1083.75 248.175 1083.76 248.169C1083.77 248.162 1083.78 248.154 1083.79 248.144C1083.8 248.134 1083.8 248.122 1083.81 248.109C1083.81 248.096 1083.81 248.083 1083.81 248.07V248C1083.81 247.932 1083.78 247.867 1083.73 247.819C1083.68 247.771 1083.62 247.742 1083.55 247.74Z"
                />
              </svg>
            </div>
          </div>

          <div className="box_fs_image">
            <img
              src="/assets/amenities/amenities_sketch.avif"
              alt="Architectural master plan sketch of residential community in Siliguri."
              className="image amenities_fs_spec"
              loading="eager"
            />
          </div>

          <div className="ovelay_fs_sketch" />
        </div>

        {/* Intermediate Quote */}
        <div className="md_amenities">
          <div className="md_txt">
            <div>
              From everyday essentials to spaces designed to recharge,
              everything is thoughtfully placed to support how you live, study
              and unwind.
            </div>
          </div>
        </div>
      </main>

      {/* Amenities Flow Timeline Section */}
      <section ref={flowSectionRef} className="amenities_flow">
        <div className="amenities_wrapper">
          <div ref={cmsSectionRef} className="amenities_cms">
            {/* Sticky Sun Clock Container */}
            <div ref={clockContainerRef} className="sun-clock">
              <div className="lottie_on_scroll">
                <div ref={lottieContainerRef} className="sun_changing" />
              </div>
              <div className="time_clock">
                <div data-clock="">08:00</div>
              </div>
            </div>

            {/* 7 Amenity Flow Cards */}
            <div className="amenities_parent w-dyn-list">
              <div role="list" className="amenities_flex w-dyn-items">
                {AMENITY_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    role="listitem"
                    className="amenities_item w-dyn-item"
                    id={item.id}
                  >
                    <div className="amenities_info">
                      <div className="top_amen">
                        <div className="tag_amen">
                          <div>{item.tag}</div>
                        </div>
                      </div>

                      <div className="info_amen">
                        <div className="title_amen">
                          <div>{item.title}</div>
                        </div>
                        <div className="desc_amen">
                          <div>{item.description}</div>
                        </div>
                      </div>

                      <div className="included_box">
                        <div className="inc_title">
                          <div>{item.includedTitle}</div>
                        </div>
                        <div className="inc_desc">
                          <div>{item.includedDesc}</div>
                        </div>
                      </div>
                    </div>

                    <div className="amenities_img">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Section */}
      <FamilySection />

      {/* Pre-Footer CTA & Lamp Footer */}
      <Footer />
    </div>
  );
}
