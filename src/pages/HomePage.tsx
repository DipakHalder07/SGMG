import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";
import confetti from "canvas-confetti";
import FooterIllustration from "../components/FooterIllustration";
import Header from "../components/Header";
import FaqSection from "../components/FaqSection";
import { getUnitPathById } from "../data/apartmentsData";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("webflowEase", "0.165, 0.84, 0.44, 1");

if (typeof window !== "undefined") {
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
}

function ArrowIcon({ fill = "#ffffff" }: { fill?: string } = {}) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.1255 19.7628C11.0656 19.8708 8.22317 18.9049 5.93495 16.846C4.47939 15.5356 3.386 13.8723 2.76021 12.0164C2.62187 11.6157 2.48585 11.2023 2.44064 10.7747C2.34121 10.0684 3.35659 9.76884 3.65706 10.365C3.84475 10.7374 3.92284 11.2876 4.07246 11.7023C4.58843 13.1699 5.43808 14.4978 6.55443 15.5813C8.45906 17.44 11.0264 18.4623 13.6874 18.4216C16.4386 18.3889 18.929 17.2713 20.8443 15.313C21.9258 14.1223 22.7385 12.8566 23.1727 11.2896C22.6501 11.6705 22.1253 12.0483 21.5983 12.4232C21.2917 12.6426 21.0064 12.8674 20.6642 13.0538C20.3212 13.2407 19.9159 13.0637 19.7399 12.7308C19.6321 12.5269 19.7386 12.1287 19.9234 11.9784C20.2204 11.7367 20.5451 11.5134 20.8618 11.288L22.372 10.2147C23.0189 9.75549 23.6958 9.2389 24.3816 8.84082C24.4655 8.79211 24.7301 8.83579 24.8205 8.87576C25.244 9.06291 25.2366 9.59525 25.3249 9.98057C25.391 10.3075 25.4501 10.6403 25.5132 10.9681L25.9183 13.074C26 13.4993 26.2317 14.3897 26.1173 14.8172C26.031 15.1398 25.4683 15.2925 25.2013 15.1156C25.1247 15.0648 25.0017 15.0014 24.9563 14.9001C24.7186 14.3244 24.6779 13.6405 24.5413 13.0347C24.4666 12.7031 24.4368 12.4232 24.328 12.1029C24.2205 12.3637 24.141 12.6276 24.0213 12.9031C23.5454 14.0084 22.8965 15.0308 22.0988 15.9319C20.0272 18.2869 17.2347 19.5627 14.1255 19.7628Z"
        fill={fill}
      />
    </svg>
  );
}

function WebflowButton({
  text,
  href,
  onClick,
  className = "",
  target,
}: {
  text: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  target?: string;
}) {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      target={target}
      className={`button ${className}`}
    >
      <div className={`icon_box is-left ${className}`}>
        <div className="arrow_icon">
          <ArrowIcon />
        </div>
      </div>
      <div className={`text_box ${className}`}>
        <div>{text}</div>
      </div>
      <div className={`icon_box is-right ${className}`}>
        <div className="arrow_icon">
          <ArrowIcon />
        </div>
      </div>
    </a>
  );
}

const heroSlides = [
  {
    image: "/assets/hero-banner-1.avif",
    alt: "Vega Circle commercial and retail center with modern architecture and landscaped surroundings.",
    tips: [
      { id: "bed", label: "Master Suites Designed to Unwind", x: "55%", y: "43%", deg: 130 },
    ],
  },
  {
    image: "/assets/hero-banner-2.avif",
    alt: "Vega Circle modern interior space and amenities.",
    tips: [
      { id: "living", label: "Crafted for Elevated Living", x: "32%", y: "58%", deg: 120 },
    ],
  },
  {
    image: "/assets/hero-banner-3.avif",
    alt: "Vega Circle wide architectural view and surrounding area.",
    tips: [
      { id: "builtins", label: "Entertainment & Media Ready", x: "78%", y: "48%", deg: 160 },
      { id: "overhead", label: "Bespoke Living Spaces", x: "82%", y: "28%", deg: 180 },
      { id: "lounge", label: "Grand Architectural Lounges", x: "48%", y: "72%", deg: 90 },
    ],
  },
];

const apartments = [
  {
    id: "d1",
    name: "D1",
    price: "61.65 L",
    beds: "3 Bed",
    baths: "2 Baths",
    sqft: "1,340",
    image: "/__l5e/assets-v1/99fd06dd-6afa-4b67-abf8-39ede97c7f0c/13-D1-Gen.avif",
    desc: "A 4-bedroom layout that gives everyone their own space to unwind, recharge, and stay focused while shared areas keep everyday living easy and connected.",
  },
  {
    id: "d1-premium",
    name: "Green View",
    price: "72.40 L",
    beds: "3 Bed",
    baths: "3 Baths",
    sqft: "1,340",
    image: "/images/apartments/d1-premium/03_front_exterior_professional_eye_level_architectural_photograph_of_green_view.jpg",
    desc: "An elevated 4-bedroom sanctuary featuring upgraded designer finishes, panoramic view vistas, and private suite layouts that redefine luxury living.",
  },
  {
    id: "d2",
    name: "D2",
    price: "77.50 L",
    beds: "4 Bed",
    baths: "3 Baths",
    sqft: "1,685",
    image: "/images/apartments/d2/01-exterior.jpg",
    desc: "A stately 4-bedroom, 4-bath residence featuring grand double-aspect living zones, dedicated dining spaces, and generous private en-suites.",
  },
  {
    id: "d2-premium",
    name: "D2 Premium",
    price: "91.00 L",
    beds: "4 Bed",
    baths: "4 Baths",
    sqft: "1,685",
    image: "/images/apartments/d2-premium/01-exterior.jpg",
    desc: "The pinnacle of luxury living — an expansive 4-bedroom signature home with custom Italian-inspired fittings, bespoke joinery, and private balconies.",
  },
  {
    id: "c1",
    name: "C1",
    price: "50.85 L",
    beds: "2 Bed",
    baths: "2 Baths",
    sqft: "1,105",
    image: "/images/apartments/c1/01-exterior.jpg",
    desc: "A luminous 3-bedroom, 3-bath residence engineered for optimal ventilation, featuring a seamless open floor plan and serene personal retreats.",
  },
  {
    id: "c1-premium",
    name: "C1 Premium",
    price: "59.70 L",
    beds: "2 Bed",
    baths: "2 Baths",
    sqft: "1,105",
    image: "/images/apartments/c1-premium/01-exterior.jpg",
    desc: "A prestigious 3-bedroom luxury residence featuring curated designer aesthetics, grand entry foyer, and sweeping city and garden landscape views.",
  },
];

const amenitiesList = [
  {
    title: "Rooftop Swimming Pool",
    desc: "An open-air pool on the roof, with deck seating and views across the neighbourhood.",
    image: "/assets/gallery/Swimming_Pool_1.webp",
  },
  {
    title: "Multi-Gym, Aerobics & Yoga",
    desc: "Cardio and strength equipment with a dedicated floor for aerobics and yoga.",
    image: "/assets/gallery/Gym_1.webp",
  },
  {
    title: "Indoor Games Arena",
    desc: "A double-height lounge for carrom, cards, table games and darts.",
    image: "/assets/gallery/Indoor_Games_Arena_1.webp",
  },
  {
    title: "Community Hall",
    desc: "An air-conditioned hall for pujas, weddings, annaprashan and society gatherings.",
    image: "/assets/gallery/CommunityHall_1.webp",
  },
  {
    title: "Landscaped Garden",
    desc: "Green lawns, flowering walkways and a children\u2019s play zone within the grounds.",
    image: "/assets/gallery/Landscape_Lawn_1.webp",
  },
];

const testimonialsList = [
  {
    author: "Mrs. P. Sherpa",
    photo: "/assets/authors/author-1.avif",
    quote:
      "“The quality of construction and prompt possession handed over by SGMG gave our family absolute confidence. From transparent documentation to the beautifully landscaped amenities, SGMG delivers truly world-class residential standards in North Bengal.”",
  },
  {
    author: "Rajesh Agarwal",
    photo: "/assets/authors/author-2.avif",
    quote:
      "“Investing in an SGMG residence has been our best decision. The architectural planning, ventilation, and premium fittings exceed expectations. The management’s professionalism and commitment to on-time delivery reflect four decades of trust.”",
  },
  {
    author: "Dr. Anirban Mukherjee",
    photo: "/assets/authors/author-3.avif",
    quote:
      "“Living here provides the tranquility and security my family always sought. The peaceful surroundings, modern clubhouse, and rapid connectivity to arterial Siliguri hubs make daily life completely effortless. A true benchmark in luxury living.”",
  },
];

const faqsList = [
  {
    q: "How do I schedule a site visit or book a residence?",
    a: "You can schedule a private site visit through our online tour scheduler or connect directly with our sales advisors. Our team will guide you through master plans, model residences, and complete booking formalities.",
  },
  {
    q: "Are SGMG residential projects RERA approved and compliant?",
    a: "Yes, all SGMG developments are fully compliant with West Bengal HIRA / RERA guidelines, with transparent approvals, clear land titles, and verified legal clearances.",
  },
  {
    q: "What financing and home loan assistance is available?",
    a: "SGMG is partnered with leading public and private banks (including SBI, HDFC, ICICI, and Axis Bank) to facilitate competitive interest rates, pre-approved loans, and seamless loan documentation.",
  },
  {
    q: "What is the construction quality and warranty provided by SGMG?",
    a: "With a 40-year legacy of engineering excellence in Siliguri, SGMG utilizes Grade-A structural materials, earthquake-resistant RCC framing, premium waterproofing, and dedicated post-possession maintenance.",
  },
  {
    q: "What are the possession timelines and payment structures?",
    a: "We offer flexible, milestone-linked construction payment plans with strict adherence to scheduled delivery dates. Possession dates are explicitly guaranteed in your agreement.",
  },
  {
    q: "Can Non-Resident Indians (NRIs) purchase properties with SGMG?",
    a: "Yes. We offer end-to-end dedicated NRI concierge assistance, including virtual 3D walkthroughs, digital documentation, NRE/NRO banking facilitation, and property management.",
  },
  {
    q: "What amenities and community features are included?",
    a: "Every project features world-class residential amenities: multi-tier 24/7 security, landscaped central courtyards, swimming pools, high-speed elevators, wellness gymnasiums, and uninterrupted power backup.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentHeroImg, setCurrentHeroImg] = useState(heroSlides[0].image);
  const [nextHeroImg, setNextHeroImg] = useState(heroSlides[0].image);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Property listing card slider — desktop only ("Everything modern living should be")
  const [propertySlideIndex, setPropertySlideIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sliderViewportRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const didDragRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const pointerStartTimeRef = useRef(0);
  const currentDragOffsetRef = useRef(0);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hero Interactive Zones & Brightness State (matching 21oaks)
  const brightnessInputRef = useRef<HTMLInputElement>(null);

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const min = Number(e.target.min || 0);
    const max = Number(e.target.max || 100);
    const t = (val - min) / (max - min);
    const p = t * 100;
    e.target.style.background = `linear-gradient(to top, #ffffff 0%, #ffffff ${p}%, rgba(255,255,255,0.25) ${p}%, rgba(255,255,255,0.25) 100%)`;

    const hero = document.querySelector<HTMLElement>(".hero");
    const slide0 = hero?.querySelector<SVGElement>('.hero-svg[data-hero-slide="0"]');
    const lightZone = slide0?.querySelector<SVGPathElement>(".zone--light");
    const lightDecor = slide0?.querySelector<SVGGElement>(".decor--light");

    if (lightZone) {
      const fill = 0.2 + t * 0.7;
      lightZone.style.fillOpacity = fill.toFixed(3);
      lightZone.style.filter = `drop-shadow(0 0 ${8 + t * 20}px rgba(255,242,125,${0.2 + t * 0.5}))`;
    }
    if (lightDecor) {
      lightDecor.style.opacity = (0.25 + t * 0.75).toFixed(3);
    }
  };

  const clearHeroZoneUi = useCallback(() => {
    document.querySelectorAll(".hero-svg .zone.is-active").forEach((el) => el.classList.remove("is-active"));
    document.querySelectorAll(".hero-svg .zone-stroke.is-active").forEach((el) => el.classList.remove("is-active"));
    document.querySelectorAll(".hero-tip.is-active").forEach((el) => el.classList.remove("is-active"));
  }, []);

  const handleZoneMouseEnter = (zoneName: string) => {
    clearHeroZoneUi();
    document.querySelectorAll(`.hero-svg .zone[data-zone="${zoneName}"]`).forEach((el) => el.classList.add("is-active"));
    document.querySelectorAll(`.hero-svg .zone-stroke[data-zone="${zoneName}"]`).forEach((el) => el.classList.add("is-active"));
    document.querySelectorAll(`.hero-tip[data-tip="${zoneName}"]`).forEach((el) => el.classList.add("is-active"));
  };

  const handleZoneMouseLeave = (zoneName: string) => {
    document.querySelectorAll(`.hero-svg .zone[data-zone="${zoneName}"]`).forEach((el) => el.classList.remove("is-active"));
    document.querySelectorAll(`.hero-svg .zone-stroke[data-zone="${zoneName}"]`).forEach((el) => el.classList.remove("is-active"));
    document.querySelectorAll(`.hero-tip[data-tip="${zoneName}"]`).forEach((el) => el.classList.remove("is-active"));
  };

  useEffect(() => {
    if (brightnessInputRef.current) {
      const val = Number(brightnessInputRef.current.value || 65);
      brightnessInputRef.current.style.background = `linear-gradient(to top, #ffffff 0%, #ffffff ${val}%, rgba(255,255,255,0.25) ${val}%, rgba(255,255,255,0.25) 100%)`;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxPropertySlideIndex = Math.max(0, apartments.length - visibleSlides);

  useEffect(() => {
    if (propertySlideIndex > maxPropertySlideIndex) {
      setPropertySlideIndex(maxPropertySlideIndex);
    }
  }, [maxPropertySlideIndex, propertySlideIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    didDragRef.current = false;
    pointerStartXRef.current = e.clientX;
    pointerStartYRef.current = e.clientY;
    pointerStartTimeRef.current = Date.now();
    currentDragOffsetRef.current = 0;
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const dx = e.clientX - pointerStartXRef.current;
    const dy = e.clientY - pointerStartYRef.current;

    if (!didDragRef.current) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
        isPointerDownRef.current = false;
        return;
      }
      if (Math.abs(dx) > 6) {
        didDragRef.current = true;
        setIsDragging(true);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch (_) {}
      }
    }

    if (didDragRef.current) {
      let effectiveDx = dx;
      if (propertySlideIndex === 0 && dx > 0) {
        effectiveDx = dx * 0.32;
      } else if (propertySlideIndex >= maxPropertySlideIndex && dx < 0) {
        effectiveDx = dx * 0.32;
      }
      currentDragOffsetRef.current = effectiveDx;
      setDragOffset(effectiveDx);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current && !isDragging) return;
    isPointerDownRef.current = false;

    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    if (didDragRef.current) {
      const dx = currentDragOffsetRef.current;
      const dt = Math.max(1, Date.now() - pointerStartTimeRef.current);
      const velocity = dx / dt;

      const viewportWidth = sliderViewportRef.current?.clientWidth || window.innerWidth;
      const slideWidth = viewportWidth / visibleSlides;
      const threshold = Math.min(80, Math.max(35, slideWidth * 0.18));

      if (dx < -threshold || velocity < -0.3) {
        setPropertySlideIndex((prev) => Math.min(maxPropertySlideIndex, prev + 1));
      } else if (dx > threshold || velocity > 0.3) {
        setPropertySlideIndex((prev) => Math.max(0, prev - 1));
      }

      setDragOffset(0);
      setIsDragging(false);

      setTimeout(() => {
        didDragRef.current = false;
      }, 100);
    } else {
      setDragOffset(0);
      setIsDragging(false);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    setDragOffset(0);
    setIsDragging(false);
    setTimeout(() => {
      didDragRef.current = false;
    }, 100);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > 25) {
      if (wheelTimeoutRef.current) return;
      if (e.deltaX > 25) {
        setPropertySlideIndex((prev) => Math.min(maxPropertySlideIndex, prev + 1));
      } else if (e.deltaX < -25) {
        setPropertySlideIndex((prev) => Math.max(0, prev - 1));
      }
      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 400);
    }
  };



  const apartmentsSectionRef = useRef<HTMLElement>(null);

  const bgCurrentRef = useRef<HTMLImageElement>(null);
  const bgNextRef = useRef<HTMLImageElement>(null);
  const testimonialsSectionRef = useRef<HTMLElement>(null);
  const linesSectionRef = useRef<HTMLDivElement>(null);
  const heroBusyRef = useRef(false);
  const activeSlideRef = useRef(0);
  activeSlideRef.current = activeSlide;
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const handleSlideChangeRef = useRef<(index: number) => void>(() => { });
  const splideInstancesRef = useRef<Splide[]>([]);

  const startAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (document.hidden || heroBusyRef.current) return;
      const next = (activeSlideRef.current + 1) % heroSlides.length;
      handleSlideChangeRef.current(next);
    }, 4500);
  }, []);

  // Preload all hero slide images immediately to avoid any load latency
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // 1. Dynamic Header theme with data-section detector
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section="hero"], [data-section="light"], [data-section="dark"]')
    );
    if (!sections.length) return;

    const header = document.querySelector<HTMLElement>(".header");
    const headerH = header ? header.offsetHeight : 80;

    const updateHeader = () => {
      const y = headerH + 1;
      let mode: string | null = null;

      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          mode = el.getAttribute("data-section");
          break;
        }
      }

      if (!mode) {
        const hero = document.querySelector<HTMLElement>('[data-section="hero"]');
        if (hero && hero.getBoundingClientRect().top <= y && hero.getBoundingClientRect().bottom > y) {
          mode = "hero";
        } else {
          mode = "light";
        }
      }

      document.body.classList.toggle("is-hero", mode === "hero");
      document.body.classList.toggle("is-light", mode === "light");
      document.body.classList.toggle("is-dark", mode === "dark");
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  // 2. Hero Circular Mask Transition with GSAP & Auto Advance
  const handleSlideChange = useCallback(
    (index: number) => {
      if (index === activeSlideRef.current) return;

      const targetImg = heroSlides[index].image;
      setActiveSlide(index);
      activeSlideRef.current = index;

      // Restart timer so new slide displays for full 4.5s
      startAutoTimer();

      const bgNext = bgNextRef.current;
      const bgCurrent = bgCurrentRef.current;

      if (!bgNext || !bgCurrent) {
        setCurrentHeroImg(targetImg);
        heroBusyRef.current = false;
        return;
      }

      // If an animation is already in flight when clicked, settle previous image onto bgCurrent immediately
      if (heroBusyRef.current) {
        gsap.killTweensOf([bgNext, bgCurrent]);
        if (bgNext.src) {
          bgCurrent.src = bgNext.src;
          setCurrentHeroImg(bgNext.src);
        }
      }

      heroBusyRef.current = true;
      bgNext.src = targetImg;
      setNextHeroImg(targetImg);

      gsap.killTweensOf([bgNext, bgCurrent]);

      // Base current image visible underneath
      gsap.set(bgCurrent, { opacity: 1, scale: 1 });

      // Reset next image to start circular mask from right side
      gsap.set(bgNext, {
        opacity: 1,
        clipPath: "circle(0% at 100% 50%)",
        willChange: "clip-path",
      });

      // Signature circular mask reveal animation (responsive and smooth)
      gsap.to(bgNext, {
        clipPath: "circle(150% at 100% 50%)",
        duration: 1.1,
        ease: "power2.out",
        onComplete: () => {
          bgCurrent.src = targetImg;
          setCurrentHeroImg(targetImg);
          gsap.set(bgCurrent, { opacity: 1 });
          gsap.set(bgNext, {
            opacity: 0,
            clipPath: "circle(0% at 100% 50%)",
            clearProps: "willChange",
          });
          heroBusyRef.current = false;
        },
      });
    },
    [startAutoTimer]
  );

  useEffect(() => {
    handleSlideChangeRef.current = handleSlideChange;
  }, [handleSlideChange]);

  useEffect(() => {
    startAutoTimer();
    const handleVisibility = () => {
      if (document.hidden) {
        if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      } else {
        startAutoTimer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startAutoTimer]);





  // 3b. Sides Section & Fullscreen Parallax Scrub (matching Webflow a-3 Parallax General)
  useEffect(() => {
    // Scrubbed parallax on large images is a main-thread cost that iOS Safari
    // pays on every scroll frame. Desktop only.
    if (!window.matchMedia("(min-width: 992px)").matches) return;

    const ctx = gsap.context(() => {
      const parallaxConfigs = [
        { trigger: ".sides_f .right_side", img: ".sides_f .right_side .image" },
        { trigger: ".sides_s .right_side", img: ".sides_s .right_side .image" },
        { trigger: ".fs_box_m", img: ".fs_box_m .image" },
        { trigger: ".fs_cta", img: ".fs_bg .image" },
      ];

      parallaxConfigs.forEach(({ trigger, img }) => {
        const triggerEl = document.querySelector<HTMLElement>(trigger);
        const imgEl = document.querySelector<HTMLElement>(img);
        if (!triggerEl || !imgEl) return;

        gsap.set(imgEl, { scale: 1.12, transformOrigin: "50% 50%", force3D: true });
        gsap.fromTo(
          imgEl,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // 4. Apartments Cards Horizontal Scroll GSAP ScrollTrigger (Desktop)
  useEffect(() => {
    const section = apartmentsSectionRef.current;
    if (!section) return;

    const sticky = section.querySelector<HTMLElement>(".wrapper_apartments");
    const title = section.querySelector<HTMLElement>(".heading_apartments");
    const desktopViewport = section.querySelector<HTMLElement>(".apart_cards_viewport.only_desktop");
    const track = desktopViewport?.querySelector<HTMLElement>(".apart_cards_track");
    const cards = gsap.utils.toArray<HTMLElement>(track?.querySelectorAll(".apart_card") || []);
    const scribbles = gsap.utils.toArray<HTMLElement>(
      title?.querySelectorAll('[data-scribble="4"].scribble-wrap') || []
    );

    if (!sticky || !title || !desktopViewport || !track || cards.length < 2) return;
    const trackEl = track;

    let bg = sticky.querySelector<HTMLElement>(".apartments_bg_gradient");
    if (!bg) {
      bg = document.createElement("div");
      bg.className = "apartments_bg_gradient";
      sticky.prepend(bg);
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      const vw = window.innerWidth;
      const getTrackWidth = () => trackEl.scrollWidth || (cards.length * 360 + (cards.length - 1) * 40);
      const xStart = vw + 220;

      gsap.set(trackEl, { x: xStart, force3D: true });
      gsap.set(title, { y: 0, opacity: 1, scale: 1 });
      gsap.set(bg, { opacity: 0 });
      gsap.set(scribbles, { "--scribble-line-color": "#2391cf" });

      const presets = [
        { dir: 1, baseRot: -3.2, xAmp: 8, yAmp: 3.5, rotAmp: 3.2 },
        { dir: -1, baseRot: 3.0, xAmp: 9, yAmp: 4.5, rotAmp: 3.4 },
        { dir: 1, baseRot: -2.8, xAmp: 7, yAmp: 3.0, rotAmp: 2.9 },
        { dir: -1, baseRot: 3.4, xAmp: 8, yAmp: 4.0, rotAmp: 3.6 },
      ];

      cards.forEach((card: any, i) => {
        const p = presets[i % presets.length];
        gsap.set(card, {
          xPercent: 0,
          yPercent: 0,
          rotation: p.baseRot,
          force3D: true,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=430%",
          pin: sticky,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(title, { y: -285, duration: 0.3 }, 0.0)
        .to(bg, { opacity: 1, duration: 0.55, ease: "power2.out" }, 0.06)
        .to(
          scribbles,
          { "--scribble-line-color": "#292929", duration: 0.45, ease: "power2.out" },
          0.1
        )
        .to(trackEl, { x: () => -(getTrackWidth() + 220), duration: 1.0 }, 0.08)
        .to(title, { y: 0, duration: 0.24 }, 0.82);

      cards.forEach((card: any, i) => {
        const p = presets[i % presets.length];

        tl.to(
          card,
          {
            xPercent: p.dir * p.xAmp,
            yPercent: -p.yAmp,
            rotation: p.baseRot + p.rotAmp,
            duration: 0.24,
          },
          0.1
        )
          .to(
            card,
            {
              xPercent: -p.dir * (p.xAmp * 0.7),
              yPercent: p.yAmp * 0.55,
              rotation: p.baseRot - p.rotAmp * 0.7,
              duration: 0.26,
            },
            0.36
          )
          .to(
            card,
            {
              xPercent: p.dir * (p.xAmp * 0.35),
              yPercent: -p.yAmp * 0.3,
              rotation: p.baseRot + 0.8,
              duration: 0.24,
            },
            0.64
          );
      });

      // Refresh on image / font load
      const imgs = Array.from(desktopViewport.querySelectorAll("img"));
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
          img.addEventListener("error", () => ScrollTrigger.refresh(), { once: true });
        }
      });

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      ScrollTrigger.refresh();
      const tId = setTimeout(() => ScrollTrigger.refresh(), 250);

      return () => {
        clearTimeout(tId);
        gsap.set(trackEl, { clearProps: "x,transform" });
        gsap.set(title, { clearProps: "y,opacity,scale,transform" });
        gsap.set(bg, { clearProps: "opacity" });
        gsap.set(scribbles, { "--scribble-line-color": "#2391cf" });
        cards.forEach((card: any) =>
          gsap.set(card, { clearProps: "xPercent,yPercent,rotation,transform" })
        );
      };
    });

    return () => {
      mm.revert();
    };
  }, []);



  // 5. Splide Carousel for Amenities and Mobile Apartments
  useEffect(() => {
    const splideEls = document.querySelectorAll<HTMLElement>(".slider1");
    const instances: Splide[] = [];

    splideEls.forEach((el) => {
      try {
        const isAmenities = el.classList.contains("second_splide");
        const inst = new Splide(
          el,
          isAmenities
            ? {
              perPage: 3,
              perMove: 1,
              focus: 0,
              type: "slide",
              gap: "8px",
              arrows: false,
              pagination: false,
              speed: 600,
              trimSpace: true,
              dragAngleThreshold: 60,
              rewind: false,
              rewindSpeed: 500,
              breakpoints: {
                991: {
                  perPage: 2,
                  gap: "8px",
                  padding: { right: "2rem" },
                },
                767: {
                  perPage: 1,
                  gap: "8px",
                  padding: { right: "2rem" },
                },
                479: {
                  perPage: 1,
                  gap: "8px",
                  padding: { left: "0rem", right: "2.6rem" },
                },
              },
            }
            : {
              perPage: 1,
              perMove: 1,
              focus: 0,
              type: "slide",
              rewind: true,
              rewindSpeed: 500,
              gap: "1rem",
              arrows: true,
              pagination: true,
              drag: true,
              flickPower: 600,
              speed: 600,
              padding: { left: "0rem", right: "14%" },
              breakpoints: {
                991: {
                  perPage: 2,
                  gap: "1rem",
                  padding: { right: "2.5rem" },
                },
                767: {
                  perPage: 1,
                  gap: "1rem",
                  padding: { left: "0rem", right: "14%" },
                },
                479: {
                  perPage: 1,
                  gap: "0.85rem",
                  padding: { left: "0rem", right: "12%" },
                },
              },
            }
        );
        inst.mount();
        // Allow clicking any slide to instantly navigate to that slide
        inst.on("click", (slide) => {
          if (slide && typeof slide.index === "number") {
            inst.go(slide.index);
          }
        });
        instances.push(inst);
      } catch (err) {
        console.warn("Splide init notice:", err);
      }
    });

    splideInstancesRef.current = instances;

    // Observe size changes so Splide recalculates slide widths instantly on viewport change
    const observer = new ResizeObserver(() => {
      instances.forEach((inst) => {
        try {
          inst.refresh();
        } catch {
          // ignore
        }
      });
    });

    splideEls.forEach((el) => observer.observe(el));

    const handleResize = () => {
      instances.forEach((inst) => inst.refresh());
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      instances.forEach((inst) => {
        try {
          inst.destroy();
        } catch {
          // ignore
        }
      });
    };
  }, []);

  // 6. Scribbles dynamic reveal on viewport entry
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-scribble]");
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scribble-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 7. Location Distance Bars Animation (IntersectionObserver)
  useEffect(() => {
    const el = linesSectionRef.current;
    if (!el) return;

    const bars = Array.from(el.querySelectorAll(".lines_dynamic .active_bar")) as HTMLElement[];
    const targets = ["35%", "55%", "70%"];
    bars.forEach((b) => (b.style.width = "0%"));

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played) return;
          played = true;

          bars.forEach((bar, i) => {
            bar.style.transition = "width 900ms cubic-bezier(0.22, 1, 0.36, 1)";
            bar.style.transitionDelay = `${i * 140}ms`;
            bar.style.width = targets[i] || "0%";
          });

          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 8. Testimonials Interactive Controller matching Webflow
  useEffect(() => {
    const section = testimonialsSectionRef.current;
    if (!section) return;

    const authors = Array.from(section.querySelectorAll<HTMLElement>(".author_item"));
    const quotes = Array.from(section.querySelectorAll<HTMLElement>(".testimonial_item"));
    const desktopMq = window.matchMedia("(min-width: 992px)");

    if (!authors.length || authors.length !== quotes.length) return;

    const INTERVAL_MS = 10000;
    let current = 0;
    let ringTween: gsap.core.Tween | null = null;
    let quoteTween: gsap.core.Timeline | null = null;
    let isAnimating = false;
    let isInViewport = true;
    let isDesktop = desktopMq.matches;

    function getRingEl(author: HTMLElement) {
      return author.querySelector<HTMLElement>(".author_circle") || author;
    }

    function canAnimateNow() {
      return isInViewport && !document.hidden;
    }

    function canAutoplay() {
      return isDesktop && canAnimateNow();
    }

    function hardResetQuotes(activeIndex: number) {
      if (quoteTween) {
        quoteTween.kill();
        quoteTween = null;
      }
      isAnimating = false;
      quotes.forEach((q, i) => {
        gsap.killTweensOf(q);
        q.classList.toggle("is-active", i === activeIndex);
        gsap.set(q, {
          display: i === activeIndex ? "flex" : "none",
          opacity: i === activeIndex ? 1 : 0,
          y: i === activeIndex ? 0 : 12,
        });
      });
    }

    function animateQuoteChange(nextIndex: number) {
      if (isAnimating) return;

      const currentQuote = quotes.find((q) => q.classList.contains("is-active"));
      const nextQuote = quotes[nextIndex];
      if (!nextQuote) return;

      if (!canAnimateNow() || !currentQuote || currentQuote === nextQuote) {
        hardResetQuotes(nextIndex);
        return;
      }

      if (quoteTween) {
        quoteTween.kill();
        quoteTween = null;
      }

      gsap.killTweensOf([currentQuote, nextQuote]);
      isAnimating = true;

      quoteTween = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          isAnimating = false;
          quoteTween = null;
        },
      });

      quoteTween.to(currentQuote, {
        opacity: 0,
        y: 12,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          currentQuote.classList.remove("is-active");
          gsap.set(currentQuote, { display: "none" });
          nextQuote.classList.add("is-active");
          gsap.set(nextQuote, { display: "flex" });
        },
      });

      quoteTween.fromTo(
        nextQuote,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        }
      );
    }

    function clearRingProgress() {
      authors.forEach((author, i) => {
        const ring = getRingEl(author);
        ring.style.setProperty("--p", i === current && !isDesktop ? "100" : "0");
      });
    }

    function startRing() {
      if (ringTween) {
        ringTween.kill();
        ringTween = null;
      }

      const activeAuthor = authors[current];
      const activeRing = getRingEl(activeAuthor);
      if (!activeAuthor || !activeRing) return;

      if (!isDesktop) {
        clearRingProgress();
        return;
      }

      authors.forEach((author) => {
        const ring = getRingEl(author);
        ring.style.setProperty("--p", "0");
      });

      const progressState = { value: 0 };
      ringTween = gsap.to(progressState, {
        value: 100,
        duration: INTERVAL_MS / 1000,
        ease: "none",
        paused: !canAutoplay(),
        onUpdate() {
          activeRing.style.setProperty("--p", progressState.value.toFixed(2));
        },
        onComplete() {
          next();
        },
      });
    }

    function pausePlayback() {
      if (ringTween) ringTween.pause();
      if (quoteTween) quoteTween.pause();
    }

    function resumePlayback() {
      if (quoteTween && quoteTween.paused() && canAnimateNow()) {
        quoteTween.resume();
      }
      if (ringTween && ringTween.paused() && canAutoplay()) {
        ringTween.resume();
      }
    }

    function setActive(index: number, instant = false) {
      current = (index + authors.length) % authors.length;

      authors.forEach((el, i) => {
        el.classList.toggle("is-active", i === current);
        const ring = getRingEl(el);
        if (i !== current) ring.style.setProperty("--p", "0");
      });

      if (instant) {
        hardResetQuotes(current);
      } else {
        animateQuoteChange(current);
      }

      startRing();
    }

    function next() {
      setActive(current + 1, false);
    }

    function syncDesktopMode() {
      isDesktop = desktopMq.matches;
      startRing();
    }

    const clickHandlers: (() => void)[] = [];
    authors.forEach((el, i) => {
      const handler = () => {
        setActive(i, !canAnimateNow());
      };
      clickHandlers.push(handler);
      el.addEventListener("click", handler);
    });

    const onVisibilityChange = () => {
      if (document.hidden) {
        pausePlayback();
      } else {
        resumePlayback();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = !!entry?.isIntersecting;
        if (isInViewport) {
          resumePlayback();
        } else {
          pausePlayback();
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -10% 0px",
      }
    );
    observer.observe(section);

    if (desktopMq.addEventListener) {
      desktopMq.addEventListener("change", syncDesktopMode);
    }

    setActive(0, true);

    return () => {
      if (ringTween) ringTween.kill();
      if (quoteTween) quoteTween.kill();
      authors.forEach((el, i) => {
        if (clickHandlers[i]) el.removeEventListener("click", clickHandlers[i]);
      });
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (desktopMq.removeEventListener) {
        desktopMq.removeEventListener("change", syncDesktopMode);
      }
      observer.disconnect();
    };
  }, []);

  // 9. Delayed ScrollTrigger refresh on fonts ready
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/contact");
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const startY = window.pageYOffset;
    if (startY <= 0) return;
    const duration = 1000;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      window.scrollTo(0, Math.round(startY * (1 - easeInOutCubic(p))));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <Header />

      <main className="main" id="top">
        {/* HERO SECTION */}
        <section data-section="hero" className="hero" data-hero-slide={activeSlide}>
          <div className="wrapper_hero">
            <div className="heading_box">
              <div className="heading_h1">
                <h1 className="h1">
                  Own your dream,
                  <br />
                  home in <span data-scribble="hero" className="scribble-wrap scribble-visible">Siliguri</span>.
                </h1>
              </div>
              <div className="p_box">
                <div className="p_gen">
                  Residences built on four decades of trust in Siliguri. Established 1985, a unit of the Begraj Group.
                </div>
              </div>
            </div>

            {/* 3 Thumbnails with active indicator */}
            <div className="thumbnails_images">
              {heroSlides.map((slide, i) => (
                <div
                  key={slide.image}
                  className={`image_thumbnail ${activeSlide === i ? "is-active" : ""}`}
                  onClick={() => handleSlideChange(i)}
                  title={slide.alt}
                >
                  <div className="thumb_media">
                    <img src={slide.image} alt={slide.alt} className="image thumbnail_image" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Tooltips matching 21oaks.org */}
          <div className="hero-tooltips">
            {/* Slide 1 x3 */}
            <div className="hero-tip tip--comod" data-tip="comod">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Within reach</span>
            </div>
            <div className="hero-tip tip--bed" data-tip="bed">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Designed to recharge</span>
            </div>
            <div className="hero-tip tip--table" data-tip="table">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Built for focus</span>
            </div>

            {/* Slide 2 x2 */}
            <div className="hero-tip tip--living" data-tip="living">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Comfort in every corner</span>
            </div>
            <div className="hero-tip tip--accent" data-tip="accent">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Little details matter</span>
            </div>

            {/* Slide 3 x3 */}
            <div className="hero-tip tip--builtins" data-tip="builtins">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Movie nights ready</span>
            </div>
            <div className="hero-tip tip--overhead" data-tip="overhead">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Sink into comfort</span>
            </div>
            <div className="hero-tip tip--lounge" data-tip="lounge">
              <img src="/assets/svg/arrow-hover.png" alt="" />
              <span>Spaces meant to connect</span>
            </div>
          </div>

          {/* Hero Brightness Slider matching 21oaks.org */}
          <div className="light_box">
            <div className="hero-brightness-panel">
              <img
                className="hero-brightness-icon"
                src="/assets/svg/sun.svg"
                alt="Adjust brightness"
              />
              <input
                ref={brightnessInputRef}
                className="hero-brightness-range"
                type="range"
                min="0"
                max="100"
                defaultValue="65"
                step="1"
                onChange={handleBrightnessChange}
                aria-label="Room lighting brightness"
              />
            </div>
          </div>

          {/* Interactive SVG Room Zones matching 21oaks.org */}
          <div className="svg_mask">
            <div className="embed_svg">
              {/* Slide 0 SVG */}
              <svg className="hero-svg" viewBox="0 0 1920 1080" data-hero-slide="0" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Hero interactive masks">
                <g clipPath="url(#clip0_427_3224)">
                  {/* TABLE ZONE */}
                  <path
                    className="zone zone--table"
                    data-zone="table"
                    d="M1921 961.5L1238 755L1380 724.177V715L1371.5 708.5V697.152H1504.5L1572 682.5L1859.5 723.5L1921 748V961.5Z"
                    fill="white"
                    fillOpacity="0.75"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("table")}
                    onMouseLeave={() => handleZoneMouseLeave("table")}
                  />

                  {/* LIGHT DECOR + LIGHT SOURCE */}
                  <g filter="url(#filter0_f_427_3224)" className="decor decor--light" style={{ pointerEvents: "none" }}>
                    <path
                      className="zone zone--light zone--light-source"
                      data-zone="light"
                      d="M1695 499C1682 489.5 1682 472.5 1682 472.5C1682 472.5 1650.54 472.465 1631.5 471C1623.81 470.409 1616.24 469.489 1606.5 468.224C1597.89 467.106 1584.5 465 1584.5 465C1584.5 465 1600.5 460.572 1618.5 456C1684.5 439.238 1793.61 432.808 1865 436.5C1883.12 437.437 1902 436 1908 442C1914 448 1869.77 454.492 1844.5 459C1819.4 463.476 1779.5 465 1779.5 465C1779.5 465 1777.5 486 1767 494.5C1755.5 503.81 1744.68 507.151 1729 507.5C1715.32 507.804 1706.05 507.075 1695 499Z"
                      fill="#FFF27D"
                      fillOpacity="0.55"
                      style={{ mixBlendMode: "soft-light", vectorEffect: "non-scaling-stroke" }}
                    />
                  </g>

                  {/* COMOD ZONE */}
                  <path
                    className="zone zone--comod"
                    data-zone="comod"
                    d="M442 538L101.5 532.5H97.5V1081H442.5L466.5 918L472.5 535L442 538Z"
                    fill="white"
                    fillOpacity="0.75"
                    style={{ mixBlendMode: "soft-light", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("comod")}
                    onMouseLeave={() => handleZoneMouseLeave("comod")}
                  />
                  <path
                    className="zone-stroke zone-stroke--comod"
                    data-zone="comod"
                    d="M442 538L101.5 532.5H97.5V1081H442.5L466.5 918L472.5 535L442 538Z"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                    fill="none"
                    style={{ vectorEffect: "non-scaling-stroke", pointerEvents: "none" }}
                  />

                  {/* BED ZONE */}
                  <path
                    className="zone zone--bed"
                    data-zone="bed"
                    d="M946.5 882H928.5V871L918 863.5L906.5 848.5L895 830L888 815V785.5L881.5 779.5L870.5 770.5L865 769L862 766L853 759L846.5 756.5L832 737.5L820 727L809.5 712L799 705.5L787.5 699.5L781 689L772 684.5L760 671.5L753 668L751 631.5L738 620.5L742.5 611.5L746.5 593.5L758 579.5L779 570V503L776 492.5L790.5 496V484.5L787.5 476L790.5 461L798.5 464L812 472L825 483L838 488L845.5 492.5L848 489.5L854.5 483L864.5 476L870 469L874.5 467.5L880.5 475H887.5L913 481.5L928 489.5H942.5L949 486L970 474L983 472L983.5 476.5L982 492.842L988.5 493.5L997 489.5L1004.5 491.5L1012 489.5L1017.5 492V509L1020.5 516.5L1033 564H1046.5L1066.5 560.5L1083.5 566L1198 564L1212 568.5L1256.5 587L1257.87 633L1194.5 639L1179 635.5L1174.5 630.5L1165.5 634.5L1162 642L1165.5 654L1168.5 656.5L1182.5 706L1109.5 709L1105 706L1091.5 710.5H1064.5L1060 715H1046.5L1026.5 719L1017.5 715L1005.5 721H993.5V725L987.5 727V741L979 744.5L974.5 770.5L967 782V803H954L946.5 815V882Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("bed")}
                    onMouseLeave={() => handleZoneMouseLeave("bed")}
                  />
                  <path
                    className="zone zone--bed zone--bed-part"
                    data-zone="bed"
                    d="M1182.5 651.5L1188 667H1215.5L1182.5 651.5Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("bed")}
                    onMouseLeave={() => handleZoneMouseLeave("bed")}
                  />
                  <path
                    className="zone zone--bed zone--bed-part"
                    data-zone="bed"
                    d="M1194.5 684.5L1190 674L1248 670.5L1280 664.724L1334.5 654L1338 663.5L1243 681L1210.5 683L1194.5 684.5Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("bed")}
                    onMouseLeave={() => handleZoneMouseLeave("bed")}
                  />
                  <path
                    className="zone zone--bed zone--bed-part"
                    data-zone="bed"
                    d="M1216 705.5L1215.5 702L1228 700L1240 699L1233.5 706L1225.5 705.5H1216Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("bed")}
                    onMouseLeave={() => handleZoneMouseLeave("bed")}
                  />

                  {/* BED STROKES */}
                  <g style={{ pointerEvents: "none" }}>
                    <path d="M946.5 882H928.5V871L918 863.5L906.5 848.5L895 830L888 815V785.5L881.5 779.5L870.5 770.5L865 769L862 766L853 759L846.5 756.5L832 737.5L820 727L809.5 712L799 705.5L787.5 699.5L781 689L772 684.5L760 671.5L753 668L751 631.5L738 620.5L742.5 611.5L746.5 593.5L758 579.5L779 570V503L776 492.5L790.5 496V484.5L787.5 476L790.5 461L798.5 464L812 472L825 483L838 488L845.5 492.5L848 489.5L854.5 483L864.5 476L870 469L874.5 467.5L880.5 475H887.5L913 481.5L928 489.5H942.5L949 486L970 474L983 472L983.5 476.5L982 492.842L988.5 493.5L997 489.5L1004.5 491.5L1012 489.5L1017.5 492V509L1020.5 516.5L1033 564H1046.5L1066.5 560.5L1083.5 566L1198 564L1212 568.5L1256.5 587L1257.87 633L1194.5 639L1179 635.5L1174.5 630.5L1165.5 634.5L1162 642L1165.5 654L1168.5 656.5L1182.5 706L1109.5 709L1105 706L1091.5 710.5H1064.5L1060 715H1046.5L1026.5 719L1017.5 715L1005.5 721H993.5V725L987.5 727V741L979 744.5L974.5 770.5L967 782V803H954L946.5 815V882Z" stroke="white" strokeOpacity="0.2" strokeWidth="2" fill="none" style={{ vectorEffect: "non-scaling-stroke" }} />
                    <path d="M1182.5 651.5L1188 667H1215.5L1182.5 651.5Z" stroke="white" strokeOpacity="0.2" strokeWidth="2" fill="none" style={{ vectorEffect: "non-scaling-stroke" }} />
                    <path d="M1194.5 684.5L1190 674L1248 670.5L1280 664.724L1334.5 654L1338 663.5L1243 681L1210.5 683L1194.5 684.5Z" stroke="white" strokeOpacity="0.2" strokeWidth="2" fill="none" style={{ vectorEffect: "non-scaling-stroke" }} />
                    <path d="M1216 705.5L1215.5 702L1228 700L1240 699L1233.5 706L1225.5 705.5H1216Z" stroke="white" strokeOpacity="0.2" strokeWidth="2" fill="none" style={{ vectorEffect: "non-scaling-stroke" }} />
                  </g>
                </g>

                <defs>
                  <filter id="filter0_f_427_3224" x="1554.3" y="405.291" width="384.453" height="132.463" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="15.1" result="effect1_foregroundBlur_427_3224" />
                  </filter>
                  <clipPath id="clip0_427_3224">
                    <rect width="1920" height="1080" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              {/* Slide 1 SVG */}
              <svg className="hero-svg" data-hero-slide="1" viewBox="0 0 1921 1082" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Hero slide 2 interactive masks">
                <g clipPath="url(#clip_hero2)">
                  <path
                    className="zone zone--living"
                    data-zone="living"
                    d="M168 502H-0.5V1082H701.5L809.5 1057.5L980.5 1022L996 1008.5L974.5 994L980.5 976.5L1002.5 984.5L1012.5 969L1002.5 947.5L1012.5 926.5L1037 917.5L1022 897.5L1037 880L1050 862L1048 842.5L1052 823L1071 830L1075.5 812L1087 813.5L1099 806L1121.5 799L1150.5 813.5L1162 801L1180.5 796L1187 813.5L1162 828L1171.5 834L1183.5 850.5L1213 837.5L1216.5 862L1204.5 886L1221.5 917.5V866.5L1218.5 775V686.5L1203.5 678L1159.5 675L997.5 671.5L994 651V622L996 609L997.5 570.5L1002.5 560.5V537L1009.5 486L1012.5 461L1016.5 440L1004.5 438L991.5 440H981.5L971 444.5L898 461L831 478L823.5 486L800.5 483.5L785 486L744.5 483.5L571 475L548 483.5V502L201.5 495L181 519L168 502Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("living")}
                    onMouseLeave={() => handleZoneMouseLeave("living")}
                  />
                  <path
                    className="zone-stroke zone-stroke--living"
                    data-zone="living"
                    d="M168 502H-0.5V1082H701.5L809.5 1057.5L980.5 1022L996 1008.5L974.5 994L980.5 976.5L1002.5 984.5L1012.5 969L1002.5 947.5L1012.5 926.5L1037 917.5L1022 897.5L1037 880L1050 862L1048 842.5L1052 823L1071 830L1075.5 812L1087 813.5L1099 806L1121.5 799L1150.5 813.5L1162 801L1180.5 796L1187 813.5L1162 828L1171.5 834L1183.5 850.5L1213 837.5L1216.5 862L1204.5 886L1221.5 917.5V866.5L1218.5 775V686.5L1203.5 678L1159.5 675L997.5 671.5L994 651V622L996 609L997.5 570.5L1002.5 560.5V537L1009.5 486L1012.5 461L1016.5 440L1004.5 438L991.5 440H981.5L971 444.5L898 461L831 478L823.5 486L800.5 483.5L785 486L744.5 483.5L571 475L548 483.5V502L201.5 495L181 519L168 502Z"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                    fill="none"
                    style={{ vectorEffect: "non-scaling-stroke", pointerEvents: "none" }}
                  />

                  <path
                    className="zone zone--accent"
                    data-zone="accent"
                    d="M1367 562L1375.5 574.5V603L1228 599.5H1162.5L1151.5 591.5V550H1162.5H1176.5L1198 545.5L1221.5 539L1228 562L1235 591.5H1249V574.5L1244.5 558.5L1240 545.5L1265 539H1363V550L1367 562Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("accent")}
                    onMouseLeave={() => handleZoneMouseLeave("accent")}
                  />
                  <path
                    className="zone-stroke zone-stroke--accent"
                    data-zone="accent"
                    d="M1367 562L1375.5 574.5V603L1228 599.5H1162.5L1151.5 591.5V550H1162.5H1176.5L1198 545.5L1221.5 539L1228 562L1235 591.5H1249V574.5L1244.5 558.5L1240 545.5L1265 539H1363V550L1367 562Z"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                    fill="none"
                    style={{ vectorEffect: "non-scaling-stroke", pointerEvents: "none" }}
                  />
                </g>

                <defs>
                  <clipPath id="clip_hero2">
                    <rect width="1921" height="1082" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              {/* Slide 2 SVG */}
              <svg className="hero-svg" data-hero-slide="2" viewBox="0 0 1922 1080" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Hero slide 3 interactive masks">
                <g clipPath="url(#clip_hero3)">
                  <path
                    className="zone zone--builtins"
                    data-zone="builtins"
                    d="M1086.5 839V645L1197.5 640.5L1201.5 630.5L1205.5 613L1210 610.5H1216.5L1224.5 613L1229.5 611.5L1241.5 613L1251.5 616H1259L1269.5 620L1271.5 610.5L1275.5 603L1280.5 604.5L1303 613H1310.5L1321 610.5H1331L1343.5 603L1353.5 604.5V611.5L1349.5 630.5H1363.5L1387 633L1401 640.5L1412.5 637.5L1431 635.5L1458.5 633L1476 629.5H1484.5L1489 633V642L1484.5 650.5L1478.5 663L1922 724V1080.5H1544L1322 964.5L1086.5 839Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("builtins")}
                    onMouseLeave={() => handleZoneMouseLeave("builtins")}
                  />
                  <path
                    className="zone-stroke zone-stroke--builtins"
                    data-zone="builtins"
                    d="M1086.5 839V645L1197.5 640.5L1201.5 630.5L1205.5 613L1210 610.5H1216.5L1224.5 613L1229.5 611.5L1241.5 613L1251.5 616H1259L1269.5 620L1271.5 610.5L1275.5 603L1280.5 604.5L1303 613H1310.5L1321 610.5H1331L1343.5 603L1353.5 604.5V611.5L1349.5 630.5H1363.5L1387 633L1401 640.5L1412.5 637.5L1431 635.5L1458.5 633L1476 629.5H1484.5L1489 633V642L1484.5 650.5L1478.5 663L1922 724V1080.5H1544L1322 964.5L1086.5 839Z"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                    fill="none"
                    style={{ vectorEffect: "non-scaling-stroke", pointerEvents: "none" }}
                  />

                  <path
                    className="zone zone--overhead"
                    data-zone="overhead"
                    d="M1557 508.5L1547 301L1920.5 214.5V529H1723H1592L1587.5 517H1581L1575.5 511L1570.5 513.5L1557 508.5Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("overhead")}
                    onMouseLeave={() => handleZoneMouseLeave("overhead")}
                  />
                  <path
                    className="zone-stroke zone-stroke--overhead"
                    data-zone="overhead"
                    d="M1557 508.5L1547 301L1920.5 214.5V529H1723H1592L1587.5 517H1581L1575.5 511L1570.5 513.5L1557 508.5Z"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                    fill="none"
                    style={{ vectorEffect: "non-scaling-stroke", pointerEvents: "none" }}
                  />

                  <path
                    className="zone zone--lounge"
                    data-zone="lounge"
                    d="M784.5 874L617 895C617 895 600.299 900.24 592 906C583.701 911.76 574.5 924.5 574.5 924.5L568.5 938V961.5L592.5 1079.5H1166.5C1166.5 1079.5 1195.18 1076.12 1208.5 1065C1218.98 1056.25 1224.07 1049.07 1228 1036C1231.82 1023.28 1228 1002 1228 1002L1215.5 982.5L1113.5 916.5L1035 863.5C1035 863.5 1016.19 855.985 1003.5 854C989.224 851.768 966.5 854 966.5 854L784.5 874Z"
                    fill="white"
                    fillOpacity="0.65"
                    style={{ mixBlendMode: "overlay", vectorEffect: "non-scaling-stroke" }}
                    onMouseEnter={() => handleZoneMouseEnter("lounge")}
                    onMouseLeave={() => handleZoneMouseLeave("lounge")}
                  />
                  <path
                    className="zone-stroke zone-stroke--lounge"
                    data-zone="lounge"
                    d="M784.5 874L617 895C617 895 600.299 900.24 592 906C583.701 911.76 574.5 924.5 574.5 924.5L568.5 938V961.5L592.5 1079.5H1166.5C1166.5 1079.5 1195.18 1076.12 1208.5 1065C1218.98 1056.25 1224.07 1049.07 1228 1036C1231.82 1023.28 1228 1002 1228 1002L1215.5 982.5L1113.5 916.5L1035 863.5C1035 863.5 1016.19 855.985 1003.5 854C989.224 851.768 966.5 854 966.5 854L784.5 874Z"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                    fill="none"
                    style={{ vectorEffect: "non-scaling-stroke", pointerEvents: "none" }}
                  />
                </g>

                <defs>
                  <clipPath id="clip_hero3">
                    <rect width="1922" height="1080" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          {/* Background Images Layer with GSAP circular reveal */}
          <div className="hero-shade" />
          <div className="background">
            <img
              ref={bgCurrentRef}
              src={currentHeroImg}
              alt="Current hero"
              className="image bg-layer"
            />
            <img
              ref={bgNextRef}
              src={nextHeroImg}
              alt="Next hero"
              className="image bg-layer"
              style={{
                opacity: 0,
                clipPath: "circle(0% at 100% 50%)",
              }}
            />
          </div>
        </section>

        {/* DYNAMIC SECTION (Everything modern living should be) */}
        <section className="dynamic_section desktop_only" id="residences" data-section="light">
          <div className="middle">
            <h2 className="h2 second_h">
              Everything modern<br />
              living <span data-scribble="1" className="scribble-wrap scribble-visible">should be</span>
            </h2>
          </div>

          <div className="property_listing_section only_desktop">
            <div className="property_slider_container">
              <div className="property_slider_wrapper">
                <div
                  ref={sliderViewportRef}
                  className={`property_slider_viewport ${isDragging ? "is-dragging" : ""}`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  onWheel={handleWheel}
                  onClickCapture={(e) => {
                    if (didDragRef.current) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  <div
                    className="property_slider_track"
                    style={{
                      transform: isDragging
                        ? `translateX(calc(-${propertySlideIndex * (100 / visibleSlides)}% + ${dragOffset}px))`
                        : `translateX(-${propertySlideIndex * (100 / visibleSlides)}%)`,
                      transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                  >
                    {apartments.map((apart) => (
                      <div
                        className="property_slider_slide"
                        key={apart.id}
                        style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                      >
                        <div className="apart_card">
                          <Link
                            to={getUnitPathById(apart.id)}
                            className="apart_image"
                            draggable={false}
                            style={{ display: "block", textDecoration: "none", cursor: "pointer" }}
                            onClick={(e) => {
                              if (didDragRef.current) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <div className="overlay_tags">
                              <div className="tag_available">
                                <div className="dot_available"></div>
                                <div>Available</div>
                              </div>
                              <div className="tags_info">
                                <div className="tag_info">
                                  <div className="icon_tag">
                                    <img src="/assets/icons/bed-icon.png" alt="" className="image" draggable={false} />
                                  </div>
                                  <div>{apart.beds}</div>
                                </div>
                                <div className="tag_info">
                                  <div className="icon_tag">
                                    <img src="/assets/icons/bath-icon.png" alt="" className="image" draggable={false} />
                                  </div>
                                  <div>{apart.baths}</div>
                                </div>
                                <div className="tag_info">
                                  <div className="icon_tag">
                                    <img src="/assets/icons/ft-icon.png" alt="" className="image" draggable={false} />
                                  </div>
                                  <div>{apart.sqft}</div>
                                  <div>ft<sup>2</sup></div>
                                </div>
                              </div>
                            </div>
                            <img src={apart.image} alt={apart.name} className="image" draggable={false} />
                          </Link>

                          <div className="content_apart">
                            <div className="apart_title_line">
                              <div>
                                <Link
                                  to={getUnitPathById(apart.id)}
                                  className="apart_title"
                                  draggable={false}
                                  style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                                  onClick={(e) => {
                                    if (didDragRef.current) {
                                      e.preventDefault();
                                    }
                                  }}
                                >
                                  {apart.name}
                                </Link>
                              </div>
                              <div className="price_box">
                                <div className="icon_price">
                                  <img src="/assets/icons/rupee-icon.svg" alt="₹" className="image" draggable={false} />
                                </div>
                                <div className="price_txt">{apart.price}</div>
                              </div>
                            </div>

                            <div className="desc_home">
                              <div className="p_gen black specific">{apart.desc}</div>
                            </div>

                            <div className="explore_button" style={{ marginTop: "18px" }}>
                              <WebflowButton
                                text="Explore Details"
                                href={getUnitPathById(apart.id)}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (didDragRef.current) return;
                                  navigate(getUnitPathById(apart.id));
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="property_slider_controls">
                  <div className="property_slider_pagination">
                    {Array.from({ length: maxPropertySlideIndex + 1 }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`property_slider_dot ${propertySlideIndex === idx ? "is-active" : ""}`}
                        onClick={() => setPropertySlideIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="property_slider_arrows">
                    <button
                      type="button"
                      className="property_slider_arrow is-prev"
                      onClick={() => setPropertySlideIndex((prev) => Math.max(0, prev - 1))}
                      disabled={propertySlideIndex === 0}
                      aria-label="Previous property"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="property_slider_arrow is-next"
                      onClick={() => setPropertySlideIndex((prev) => Math.min(maxPropertySlideIndex, prev + 1))}
                      disabled={propertySlideIndex >= maxPropertySlideIndex}
                      aria-label="Next property"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>
      </main>

      {/* SIDES SECTION (Made for everyday living) */}
      <section data-section="light" className="sides">
        <div className="wrapper_sides">
          <div className="sides_f">
            <div className="sides_wrap">
              <div className="left_side">
                <h2 className="h2 smaller">
                  Made for<br />
                  <span data-scribble="2" className="scribble-wrap scribble-visible">everyday</span> living
                </h2>
                <div className="small_box">
                  <div className="image_small">
                    <img src="/assets/everyday-living/living-room.jpg" alt="Luxurious Modern Living Room" className="image" loading="lazy" decoding="async" />
                  </div>
                  <div className="caption_info">
                    <div className="purple_dot"></div>
                    <div className="flex_txt">
                      <div className="title_txt">Private Residences</div>
                      <div className="caption_txt">Serene sanctuaries engineered for comfort and privacy</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right_side">
                <img src="/assets/everyday-living/high-rise-elevation.jpg" alt="Modern Luxury High-Rise Elevation" className="image" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

          <div className="sides_s">
            <div className="sides_wrap">
              <div className="right_side">
                <img src="/assets/everyday-living/modern-residential.jpg" alt="State of the Art Modern Architecture" className="image" loading="lazy" decoding="async" />
              </div>
              <div className="left_side">
                <div className="small_box caption_info right_box second_b">
                  <div className="image_small">
                    <img src="/assets/everyday-living/clubhouse-landscape.jpg" alt="Community Clubhouse and Landscape" className="image" loading="lazy" decoding="async" />
                  </div>
                  <div className="caption_info">
                    <div className="purple_dot"></div>
                    <div className="flex_txt">
                      <div className="title_txt">Curated Lifestyle</div>
                      <div className="caption_txt">Vibrant clubhouses, lush gardens, and spaces designed to connect</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENTS SECTION (Find the home that fits your life) */}
      <section ref={apartmentsSectionRef} data-section="light" className="apartments" id="apartments">
        <div className="wrapper_apartments">
          <div className="apartments_bg_gradient"></div>
          <div className="heading_apartments">
            <h2 className="h2 smaller">
              Find the home<br />
              that fits <span data-scribble="4" className="scribble-wrap scribble-visible">your life</span>
            </h2>
          </div>

          {/* Desktop Horizontal Track */}
          <div className="apart_cards_viewport only_desktop">
            <div className="apart_cards_track">
              {apartments.slice(0, 4).map((apart) => (
                <div className="apart_card" key={apart.id}>
                  <Link
                    to={getUnitPathById(apart.id)}
                    className="apart_image"
                    style={{ display: "block", textDecoration: "none", cursor: "pointer" }}
                  >
                    <div className="overlay_tags">
                      <div className="tag_available">
                        <div className="dot_available"></div>
                        <div>Available</div>
                      </div>
                      <div className="tags_info">
                        <div className="tag_info">
                          <div className="icon_tag">
                            <img src="/assets/icons/bed-icon.png" alt="" className="image" />
                          </div>
                          <div>{apart.beds}</div>
                        </div>
                        <div className="tag_info">
                          <div className="icon_tag">
                            <img src="/assets/icons/bath-icon.png" alt="" className="image" />
                          </div>
                          <div>{apart.baths}</div>
                        </div>
                        <div className="tag_info">
                          <div className="icon_tag">
                            <img src="/assets/icons/ft-icon.png" alt="" className="image" />
                          </div>
                          <div>{apart.sqft}</div>
                          <div>ft<sup>2</sup></div>
                        </div>
                      </div>
                    </div>
                    <img src={apart.image} alt={apart.name} className="image" loading="lazy" decoding="async" />
                  </Link>

                  <div className="content_apart">
                    <div className="apart_title_line">
                      <div>
                        <Link
                          to={getUnitPathById(apart.id)}
                          className="apart_title"
                          style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                        >
                          {apart.name}
                        </Link>
                      </div>
                      <div className="price_box">
                        <div className="icon_price">
                          <img src="/assets/icons/rupee-icon.svg" alt="₹" className="image" />
                        </div>
                        <div className="price_txt">{apart.price}</div>
                      </div>
                    </div>

                    <div className="desc_home">
                      <div className="p_gen black specific">{apart.desc}</div>
                    </div>

                    <div className="explore_button" style={{ marginTop: "18px" }}>
                      <WebflowButton
                        text="Explore Details"
                        href={getUnitPathById(apart.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(getUnitPathById(apart.id));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Touch Splide Slider */}
          <div className="container only_mobile">
            <div className="splide slider1">
              <div className="splide__track">
                <div className="splide__list">
                  {apartments.map((apart) => (
                    <div className="splide__slide apart_card" key={apart.id}>
                      <Link
                        to={getUnitPathById(apart.id)}
                        className="apart_image"
                        style={{ display: "block", textDecoration: "none", cursor: "pointer" }}
                      >
                        <div className="overlay_tags">
                          <div className="tag_available">
                            <div className="dot_available"></div>
                            <div>Available</div>
                          </div>
                          <div className="tags_info">
                            <div className="tag_info">
                              <div className="icon_tag"><img src="/assets/icons/bed-icon.png" alt="" className="image" /></div>
                              <div>{apart.beds}</div>
                            </div>
                            <div className="tag_info">
                              <div className="icon_tag"><img src="/assets/icons/bath-icon.png" alt="" className="image" /></div>
                              <div>{apart.baths}</div>
                            </div>
                            <div className="tag_info">
                              <div className="icon_tag"><img src="/assets/icons/ft-icon.png" alt="" className="image" /></div>
                              <div>{apart.sqft}</div>
                            </div>
                          </div>
                        </div>
                        <img src={apart.image} alt={apart.name} className="image" loading="lazy" decoding="async" />
                      </Link>
                      <div className="content_apart">
                        <div className="apart_title_line">
                          <Link
                            to={getUnitPathById(apart.id)}
                            className="apart_title"
                            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                          >
                            {apart.name}
                          </Link>
                          <div className="price_box">
                            <div className="icon_price">
                              <img src="/assets/icons/rupee-icon.svg" alt="₹" className="image" />
                            </div>
                            <div className="price_txt">{apart.price}</div>
                          </div>
                        </div>
                        <div className="desc_home"><div className="p_gen black specific">{apart.desc}</div></div>
                        <div className="explore_button" style={{ marginTop: "16px" }}>
                          <WebflowButton
                            text="Explore Details"
                            href={getUnitPathById(apart.id)}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(getUnitPathById(apart.id));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Controls Row: Pagination Dots on Left, Navigation Arrow Buttons on Right */}
              <div className="pagination_arrows">
                <ul className="splide__pagination"></ul>
                <div className="splide__arrows">
                  <button
                    className="splide__arrow splide__arrow--prev"
                    type="button"
                    aria-label="Previous apartment"
                    onClick={() => {
                      const apartInst = splideInstancesRef.current.find(
                        (inst) => !inst.root.classList.contains("second_splide")
                      );
                      apartInst?.go("<");
                    }}
                  >
                    <img src="/assets/icons/chevron-left.svg" alt="Previous" />
                  </button>
                  <button
                    className="splide__arrow splide__arrow--next"
                    type="button"
                    aria-label="Next apartment"
                    onClick={() => {
                      const apartInst = splideInstancesRef.current.find(
                        (inst) => !inst.root.classList.contains("second_splide")
                      );
                      apartInst?.go(">");
                    }}
                  >
                    <img src="/assets/icons/chevron-right.svg" alt="Next" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FULLSCREEN SECTION (Closer than you think) */}
      <section className="fs" id="location">
        <div className="fs_box">
          <div className="txt_wrap">
            <div className="heading_fs">
              <h2 className="h2 white">
                <span data-scribble="3" className="scribble-wrap scribble-visible">Closer</span>&nbsp;than<br />
                you&nbsp;think
              </h2>
            </div>
          </div>
          <div className="svg_items">
            <div className="clouds_top">
              <div className="cloud_f"></div>
              <div className="cloud_s"></div>
              <div className="cloud_t"></div>
            </div>
            <div className="pin_ill"></div>
          </div>
          <div className="overlay_fs"></div>
          <div className="fs_box_m">
            <img src="/assets/location/aerial-community.jpg" alt="Aerial view of the residential community and the surrounding neighbourhood" className="image" loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="apartments_bg_gradient only_mobile"></div>
      </section>

      {/* EVERYTHING YOU NEED SECTION */}
      <section className="everything_u_need">
        <div className="wrapper_general">
          <div className="heading_times">
            <h2 className="h2 everything_you_need">
              Everything you<br />
              <span data-scribble="1" className="scribble-wrap scribble-visible">need</span>, within reach
            </h2>
          </div>

          <div className="txt_sides" ref={linesSectionRef}>
            <div className="left_lines">
              <div className="lines_caption">
                <div className="p_gen black">
                  From premier retail hubs to everyday transit — everything in Siliguri is seamlessly connected.
                </div>
              </div>

              <div className="lines_list">
                <div className="lines_dynamic">
                  <div className="flex_dyn">
                    <div className="title_line">City Center &amp; Malls</div>
                    <div className="timing_txt">5 min</div>
                  </div>
                  <div className="bar_dynamic">
                    <div className="active_bar" style={{ width: "0%" }}></div>
                  </div>
                </div>

                <div className="lines_dynamic">
                  <div className="flex_dyn">
                    <div className="title_line">Healthcare &amp; Schools</div>
                    <div className="timing_txt">8 min</div>
                  </div>
                  <div className="bar_dynamic">
                    <div className="active_bar" style={{ width: "0%" }}></div>
                  </div>
                </div>

                <div className="lines_dynamic">
                  <div className="flex_dyn">
                    <div className="title_line">Airport &amp; Railway Hubs</div>
                    <div className="timing_txt">15 min</div>
                  </div>
                  <div className="bar_dynamic">
                    <div className="active_bar" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p_right">
              <div className="md_p">
                Strategically located in Siliguri to give you seamless access to major commercial corridors, reputed schools, and healthcare hubs. Enjoy effortless connectivity without compromising on peaceful, green residential tranquility.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section className="amenities_section" id="amenities">
        <div className="wrapper_general basic slider_spec">
          <div className="amenities_heading">
            <h2 className="h2 middle_spec">
              Just <span data-scribble="1" className="scribble-wrap scribble-visible">outside</span><br />
              your door
            </h2>
            <div className="button_amenities">
              <WebflowButton
                text="Discover Amenities"
                href="https://calendly.com/dipakh810/30min"
                target="_blank"
              />
            </div>
          </div>

          {/* Desktop and Mobile Splide Carousel */}
          <div className="container only_amenities">
            <div className="splide slider1 second_splide">
              <div className="splide__track">
                <div className="splide__list">
                  {amenitiesList.map((amenity) => (
                    <div className="splide__slide amenities_splide" key={amenity.title}>
                      <div className="image_amenities">
                        <div className="overlay_amenities">
                          <div className="heading_text">
                            <div className="title_amenities">{amenity.title}</div>
                          </div>
                          <div className="bottom_amenities">
                            <div className="desc_amenities">
                              <div className="p_gen">{amenity.desc}</div>
                            </div>
                          </div>
                        </div>
                        <div className="overlay_color"></div>
                        <img src={amenity.image} alt={amenity.title} className="image" loading="lazy" decoding="async" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how_it_works" id="how-it-works">
        <div className="wrapper_general basic">
          <div className="flex_how">
            <div className="left_title">
              <div className="sticky_how">
                <div className="top_how">
                  <div className="cap_box">
                    <div className="caption_small">Seamless Process</div>
                  </div>
                  <div className="headline_box">
                    <h2 className="h2 smaller">
                      How it <span data-scribble="2" className="scribble-wrap scribble-visible">Works</span>
                    </h2>
                  </div>
                </div>

                <div className="bottom_how only_desktop">
                  <div className="p_gen black">
                    Ready to find your dream residence? <br />
                    Connect with us or book a site tour.
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <WebflowButton
                      text="Schedule a Tour"
                      href="https://calendly.com/dipakh810/30min"
                      target="_blank"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="right_cards">
              <div className="how_cms">
                {/* Card 1: SGMG Blue */}
                <div className="how_card card_blue">
                  <div className="wrapper_how">
                    <div className="icon_how">
                      <img src="/assets/icons/find-1.avif" alt="Choose your residence" />
                    </div>
                    <div className="content_how">
                      <div className="title_how">Choose your residence</div>
                      <div className="p_gen">
                        Explore master floor plans, compare unit layouts, and select a home tailored to your family's lifestyle and aspirations.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: SGMG Green */}
                <div className="how_card card_green">
                  <div className="wrapper_how">
                    <div className="icon_how">
                      <img src="/assets/icons/apply-2.avif" alt="Personalized site tour" />
                    </div>
                    <div className="content_how">
                      <div className="title_how">Personalized site tour</div>
                      <div className="p_gen">
                        Experience the development firsthand. Walk through model residences, landscaped amenities, and consult our property advisors.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: SGMG Black */}
                <div className="how_card card_black">
                  <div className="wrapper_how">
                    <div className="icon_how">
                      <img src="/assets/icons/move-3.avif" alt="Seamless booking & possession" />
                    </div>
                    <div className="content_how">
                      <div className="title_how">Seamless booking &amp; possession</div>
                      <div className="p_gen">
                        Transparent documentation, flexible milestone payment schedules, and timely handover with complete peace of mind.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section ref={testimonialsSectionRef} data-section="light" className="testimonials" id="testimonials">
        <div className="wrapper_general basic">
          <div className="testimonials_heading">
            <h2 className="h2 bigger">
              <span data-scribble="2" className="scribble-wrap scribble-visible">Real</span> resident<br />
              experiences
            </h2>
          </div>

          <div className="cms_testimonials">
            <div className="authors">
              <div className="collection-list-wrapper w-dyn-list">
                <div role="list" className="author_coll w-dyn-items">
                  {testimonialsList.map((item, idx) => (
                    <div
                      role="listitem"
                      key={item.author}
                      className={`author_item w-dyn-item ${idx === 0 ? "is-active" : ""}`}
                      data-index={idx}
                    >
                      <div className="author_circle">
                        <div className="author_photo">
                          <img src={item.photo} alt={item.author} className="image" />
                        </div>
                      </div>
                      <div className="author_name">
                        <div className="author_name_txt">{item.author}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="quotes">
              <div className="testimonial_coll w-dyn-list">
                <div role="list" className="testimonial_list w-dyn-items">
                  {testimonialsList.map((item, idx) => (
                    <div
                      role="listitem"
                      key={item.author}
                      className={`testimonial_item w-dyn-item ${idx === 0 ? "is-active" : ""}`}
                      data-index={idx}
                    >
                      <div className="testimonial_txt">{item.quote}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <FaqSection faqs={faqsList} />

      {/* PRE-FOOTER CTA SECTION */}
      <section data-section="dark" id="contact">
        <section className="fs_cta">
          <div className="abs_box">
            <div className="pink_cta">
              <div className="wrapper_box_cta">
                <div className="heading_cta">
                  <div className="txt_cta">
                    Your Gateway To An<br />
                    Elevated Lifestyle.
                  </div>
                </div>

                <div className="flex_cta">
                  <div className="black_button">
                    <WebflowButton
                      text="Schedule a Tour"
                      href="https://calendly.com/dipakh810/30min"
                      target="_blank"
                      className="black"
                    />
                  </div>
                  <div className="icon_right">
                    <img src="/images/sgmg-icon.svg" alt="SGMG Logo Icon" className="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fs_bg">
            <img src="/assets/image_cta.avif" alt="SGMG luxury residences lounge" className="image" loading="lazy" decoding="async" />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="wrapper_footer">
            <div className="flex_f_top">
              <div className="caption_left">
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="footer_logo_link" title="SGMG - Sushil Gangadhar Mittal Group">
                  <img
                    src="/images/sgmg-logo-white.png"
                    alt="SGMG - Sushil Gangadhar Mittal Group"
                    className="footer_logo_img"
                  />
                </Link>
                <div className="cap_footer">
                  Tranquility and <span data-scribble="4" className="scribble-wrap scribble-visible">Living.</span>
                </div>

                {/* Other Ventures */}
                <div className="footer_ventures">
                  <div className="title_footer">Other Ventures</div>
                  <div className="ventures_logos_wrap">
                    <a
                      href="https://cosmospreschool.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venture_link venture_cosmos"
                      title="Cosmos Global Pre-School"
                    >
                      <img
                        src="/assets/ventures/cosmos-global.png"
                        alt="Cosmos Global Pre-School"
                        className="venture_logo_img venture_logo_cosmos"
                        loading="lazy"
                      />
                    </a>
                    <a
                      href="https://sgmg.in/inox/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venture_link venture_inox"
                      title="INOX Live the Movie"
                    >
                      <img
                        src="/assets/ventures/inox.png"
                        alt="INOX Live the Movie"
                        className="venture_logo_img venture_logo_inox"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="menu_footer">
                <div className="box_menu">
                  <div className="title_footer">Discover</div>
                  <div className="links_list">
                    <Link to="/apartments" className="link_f">Residences</Link>
                    <Link to="/gallery" className="link_f">Gallery</Link>
                    <a href="#how-it-works" className="link_f">How it works</a>
                    <a href="#contact" className="link_f">Contact</a>
                  </div>
                </div>

                <div className="box_menu">
                  <div className="title_footer">Contact</div>
                  <div className="links_list">
                    <div
                      className="link_f"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopy("2nd Floor, Jeevandeep Tower, Siliguri, West Bengal", "Address Copied!")}
                    >
                      2nd Floor, Jeevandeep Tower<br />Siliguri, West Bengal
                    </div>
                    <div
                      className="link_f"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopy("+91 97330 02244", "Phone Copied!")}
                    >
                      +91 97330 02244
                    </div>
                    <div
                      className="link_f"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopy("sales@sgmg.in", "Email Copied!")}
                    >
                      sales@sgmg.in
                    </div>
                    {copyFeedback && (
                      <div style={{ color: "var(--logo-green, #a2cd3a)", fontSize: "11px", fontWeight: 600 }}>
                        ✓ {copyFeedback}
                      </div>
                    )}
                  </div>
                </div>

                <div className="box_menu">
                  <div className="title_footer">Office Hours</div>
                  <div className="links_list">
                    <div className="link_f">Mon - Sat: 10:00 AM - 7:00 PM</div>
                    <div className="link_f">Sunday: 10:00 AM - 5:00 PM</div>
                    <div className="link_f">Site Visits: Available 7 Days</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="back_socials">
              <div>
                <a id="to-top" href="#top" onClick={handleScrollToTop} className="back_top w-inline-block">
                  <div>Back to top</div>
                </a>
              </div>
              <div className="socials_box">
                <a aria-label="Our Instagram" href="https://www.instagram.com/sgmgrealestate/" target="_blank" rel="noreferrer" className="social_link w-inline-block">
                  <div className="social_icon ig" />
                </a>
                <a aria-label="Our Facebook" href="https://www.facebook.com/SGMGRealEstate" target="_blank" rel="noreferrer" className="social_link w-inline-block">
                  <div className="social_icon fb" />
                </a>
              </div>
            </div>
          </div>

          {/* Lamp SVG interactive illustration */}
          <div className="ill_interactive">
            <FooterIllustration />
          </div>

          <div className="last_line ll_fs">
            <div className="last_txt">© Copyright 2026 by Sushil Gangadhar Mittal Group</div>
            <div className="web_dev_by">
              <span className="op_spec">Website by </span>
              <span className="spec_name">Dipak</span>
            </div>

          </div>
        </footer>
      </section>
    </div>
  );
}
