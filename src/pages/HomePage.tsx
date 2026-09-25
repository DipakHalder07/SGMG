import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";
import confetti from "canvas-confetti";
import FooterIllustration from "../components/FooterIllustration";
import Header from "../components/Header";
import ApartmentLightboxModal from "../components/ApartmentLightboxModal";
import { APARTMENTS_DATA, ApartmentUnit } from "../data/apartmentsData";


gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
}

function ArrowIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.1255 19.7628C11.0656 19.8708 8.22317 18.9049 5.93495 16.846C4.47939 15.5356 3.386 13.8723 2.76021 12.0164C2.62187 11.6157 2.48585 11.2023 2.44064 10.7747C2.34121 10.0684 3.35659 9.76884 3.65706 10.365C3.84475 10.7374 3.92284 11.2876 4.07246 11.7023C4.58843 13.1699 5.43808 14.4978 6.55443 15.5813C8.45906 17.44 11.0264 18.4623 13.6874 18.4216C16.4386 18.3889 18.929 17.2713 20.8443 15.313C21.9258 14.1223 22.7385 12.8566 23.1727 11.2896C22.6501 11.6705 22.1253 12.0483 21.5983 12.4232C21.2917 12.6426 21.0064 12.8674 20.6642 13.0538C20.3212 13.2407 19.9159 13.0637 19.7399 12.7308C19.6321 12.5269 19.7386 12.1287 19.9234 11.9784C20.2204 11.7367 20.5451 11.5134 20.8618 11.288L22.372 10.2147C23.0189 9.75549 23.6958 9.2389 24.3816 8.84082C24.4655 8.79211 24.7301 8.83579 24.8205 8.87576C25.244 9.06291 25.2366 9.59525 25.3249 9.98057C25.391 10.3075 25.4501 10.6403 25.5132 10.9681L25.9183 13.074C26 13.4993 26.2317 14.3897 26.1173 14.8172C26.031 15.1398 25.4683 15.2925 25.2013 15.1156C25.1247 15.0648 25.0017 15.0014 24.9563 14.9001C24.7186 14.3244 24.6779 13.6405 24.5413 13.0347C24.4666 12.7031 24.4368 12.4232 24.328 12.1029C24.2205 12.3637 24.141 12.6276 24.0213 12.9031C23.5454 14.0084 22.8965 15.0308 22.0988 15.9319C20.0272 18.2869 17.2347 19.5627 14.1255 19.7628Z"
        fill="#292929"
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
      { id: "bed", label: "Designed to recharge", x: "55%", y: "43%", deg: 130 },
    ],
  },
  {
    image: "/assets/hero-banner-2.avif",
    alt: "Vega Circle modern interior space and amenities.",
    tips: [
      { id: "living", label: "Comfort in every corner", x: "32%", y: "58%", deg: 120 },
    ],
  },
  {
    image: "/assets/hero-banner-3.avif",
    alt: "Vega Circle wide architectural view and surrounding area.",
    tips: [
      { id: "builtins", label: "Movie nights ready", x: "78%", y: "48%", deg: 160 },
      { id: "overhead", label: "Sink into comfort", x: "82%", y: "28%", deg: 180 },
      { id: "lounge", label: "Spaces meant to connect", x: "48%", y: "72%", deg: 90 },
    ],
  },
];

const apartments = [
  {
    id: "d1",
    name: "D1",
    price: "695.00",
    beds: "4 Bed",
    baths: "2 Baths",
    sqft: "1,108",
    image: "/__l5e/assets-v1/99fd06dd-6afa-4b67-abf8-39ede97c7f0c/13-D1-Gen.avif",
    desc: "A 4-bedroom layout that gives everyone their own space to unwind, recharge, and stay focused while shared areas keep everyday living easy and connected.",
  },
  {
    id: "d1-premium",
    name: "D1 Premium",
    price: "730.00",
    beds: "4 Bed",
    baths: "2 Baths",
    sqft: "1,108",
    image: "/__l5e/assets-v1/acd690d1-5688-4922-bb11-74d7b9907009/14-D1-Hero.avif",
    desc: "An elevated 4-bedroom layout with refined interiors, warm shared spaces, and a more curated atmosphere designed to make student living feel more comfortable and intentional.",
  },
  {
    id: "d2",
    name: "D2",
    price: "760.00",
    beds: "4 Bed",
    baths: "4 Baths",
    sqft: "1,372",
    image: "/__l5e/assets-v1/f754fa92-f595-4bb8-b37d-ee32ca51f8f6/15-D2-Gen.avif",
    desc: "A spacious 4-bedroom layout designed for students who enjoy a more social atmosphere, combining open common areas with comfortable private spaces for everyday balance.",
  },
  {
    id: "d2-premium",
    name: "D2 Premium",
    price: "820.00",
    beds: "4 Bed",
    baths: "4 Baths",
    sqft: "1,372",
    image: "/__l5e/assets-v1/005428ee-de9a-4d26-8b99-1b654aea0707/16-D2-Hero.avif",
    desc: "A spacious premium 4-bedroom layout that combines open social living with hospitality-inspired interiors, creating a student apartment that feels both connected and elevated.",
  },
  {
    id: "c1",
    name: "C1",
    price: "815.00",
    beds: "3 Bed",
    baths: "3 Baths",
    sqft: "1,107",
    image: "/assets/plans/C1-Gen.avif",
    desc: "A bright and functional 3-bedroom layout designed around calm student living, blending comfortable shared spaces with private areas that support focus and everyday routines.",
  },
  {
    id: "c1-premium",
    name: "C1 Premium",
    price: "865.00",
    beds: "3 Bed",
    baths: "3 Baths",
    sqft: "1,107",
    image: "/assets/plans/C1-Hero.avif",
    desc: "A refined and balanced 3-bedroom layout with brighter interiors, curated details, and comfortable shared spaces designed for a calmer and more elevated student living experience.",
  },
];

const amenitiesList = [
  {
    title: "Grilling Courtyard",
    desc: "Host easy evenings with friends in the outdoor social zone.",
    image: "/assets/amenities/amenity-1.avif",
  },
  {
    title: "Resort-Style Pool",
    desc: "Unwind, cool off, and recharge between classes.",
    image: "/assets/amenities/amenity-2.avif",
  },
  {
    title: "Study Spaces",
    desc: "Quiet corners built for deep focus and productive days.",
    image: "/assets/amenities/amenity-3.avif",
  },
  {
    title: "Fitness Center",
    desc: "Train on your schedule with modern cardio and strength equipment.",
    image: "/assets/amenities/amenity-4.avif",
  },
  {
    title: "Campus Shuttle",
    desc: "Fast, reliable rides that keep your day moving.",
    image: "/assets/amenities/amenity-5.avif",
  },
];

const testimonialsList = [
  {
    author: "Emily Carter",
    photo: "/assets/authors/author-1.avif",
    quote:
      "“I can't say enough about how great all of the improvements are going. The entire leasing team went above and beyond to ensure a smooth move in and thoroughly explained the entire process. The property is very well kept. Convenient to the stadium perfect for games! A great place to call home at a great value. You won't be disappointed!”",
  },
  {
    author: "Ryan Mitchell",
    photo: "/assets/authors/author-2.avif",
    quote:
      "“I wasn’t sure what to expect at first, but everything turned out way better than I thought. The apartment is clean, well-designed, and actually feels comfortable to live in. The whole move-in process was simple, and the team was always responsive. It’s been a really solid experience so far.”",
  },
  {
    author: "Daniel Brooks",
    photo: "/assets/authors/author-3.avif",
    quote:
      "“Living here has been easy from day one. Everything you need is already set up, and the layout just works. It’s quiet when you need it to be, but still close to everything around campus. Honestly, it just makes daily life simpler, which is exactly what I was looking for.”",
  },
];

const faqsList = [
  {
    q: "How do I apply for an apartment?",
    a: "Click “Apply Now,” choose your lease term and floor plan, and complete the online application. If applying with roommates, make sure everyone selects the same floor plan.",
  },
  {
    q: "What does by-the-bed leasing mean?",
    a: "Each resident signs an individual lease and is only responsible for their portion of the rent.",
  },
  {
    q: "What do I need to apply?",
    a: "To guarantee your bed space, you’ll need a signed lease agreement. Leases are generated once your application is complete and your screening has been approved.",
  },
  {
    q: "Do I need a guarantor?",
    a: "Most applicants require a guarantor to meet the income requirement and ensure monthly installment payments can be made. If you do not have a guarantor, you may self-qualify using your own income or apply through a third-party guarantor service. Contact the onsite team for more information.",
  },
  {
    q: "How long does approval take?",
    a: "Typically 24–48 hours, depending on how quickly your guarantor submits their application.",
  },
  {
    q: "Can I apply if I’m not a student?",
    a: "Yes. All applicants who meet the qualifying criteria are welcome.",
  },
  {
    q: "How is rent paid?",
    a: "Rent is divided into 12 equal installments and is due on the 1st of each month. Additional fees, such as pet rent or parking, are billed separately.",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalUnit, setModalUnit] = useState<ApartmentUnit | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentHeroImg, setCurrentHeroImg] = useState(heroSlides[0].image);
  const [nextHeroImg, setNextHeroImg] = useState(heroSlides[0].image);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const bgCurrentRef = useRef<HTMLImageElement>(null);
  const bgNextRef = useRef<HTMLImageElement>(null);
  const dynamicSectionRef = useRef<HTMLElement>(null);
  const apartmentsSectionRef = useRef<HTMLElement>(null);
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
        if (hero && hero.getBoundingClientRect().bottom <= y) {
          mode = "light";
        } else {
          mode = "hero";
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
    async (index: number) => {
      if (index === activeSlideRef.current || heroBusyRef.current) return;
      heroBusyRef.current = true;

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

      try {
        // 1. Pre-decode the target image in memory so it renders immediately
        const preloadImg = new Image();
        preloadImg.src = targetImg;
        if (typeof preloadImg.decode === "function") {
          await preloadImg.decode().catch(() => { });
        }

        // 2. Set next image source and decode on the element
        bgNext.src = targetImg;
        if (typeof bgNext.decode === "function") {
          await bgNext.decode().catch(() => { });
        }
        setNextHeroImg(targetImg);

        gsap.killTweensOf([bgNext, bgCurrent]);

        // 3. Keep current image visible underneath and reset next image masked
        gsap.set(bgCurrent, { opacity: 1, scale: 1 });
        gsap.set(bgNext, {
          opacity: 1,
          clipPath: "circle(0% at 100% 50%)",
          willChange: "clip-path",
        });

        // 4. Smooth circular mask reveal
        gsap.to(bgNext, {
          clipPath: "circle(150% at 100% 50%)",
          duration: 1.25,
          ease: "power3.out",
          onComplete: () => {
            // Immediately mirror targetImg on the bgCurrent DOM element before resetting bgNext.
            // This guarantees bgCurrent already displays the new image, preventing any 1-frame flash.
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
      } catch (err) {
        console.error("Hero slide transition error:", err);
        setCurrentHeroImg(targetImg);
        heroBusyRef.current = false;
      }
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

  // 3. Dynamic Section Photos GSAP ScrollTrigger (Pinning + Outward Flyout Physics)
  useEffect(() => {
    const section = dynamicSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector(".middle");
      const gallery = section.querySelector(".interaction_gallery");
      const center = section.querySelector(".photo--center");

      const lt = section.querySelector(".photo--lt");
      const lm = section.querySelector(".photo--lm");
      const lb = section.querySelector(".photo--lb");
      const rt = section.querySelector(".photo--rt");
      const rm = section.querySelector(".photo--rm");
      const rb = section.querySelector(".photo--rb");

      if (!title || !gallery || !center) return;

      const left = [lt, lm, lb].filter(Boolean) as HTMLElement[];
      const right = [rt, rm, rb].filter(Boolean) as HTMLElement[];

      const offLeft = (el: HTMLElement) =>
        -(window.innerWidth + (el.offsetWidth || el.getBoundingClientRect().width || 200) + 160);
      const offRight = (el: HTMLElement) =>
        window.innerWidth + (el.offsetWidth || el.getBoundingClientRect().width || 200) + 160;

      gsap.set(center, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set([lt, lm, lb, rt, rm, rb].filter(Boolean), {
        autoAlpha: 0,
        y: 180,
        scale: 0.9,
        x: 0,
      });

      // Title zoom scrub matching live 21oaks.org
      gsap.to(center, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: title,
          start: "top top",
          end: "bottom -120%",
          scrub: true,
        },
      });

      // Gallery stage pin & scatter timeline
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: isDesktop ? 1.2 : true,
          anticipatePin: isDesktop ? 1 : 0,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        [lt, lm, lb, rt, rm, rb].filter(Boolean),
        {
          autoAlpha: 1,
          scale: 1,
          ease: "none",
          duration: 0.2,
          stagger: 0.02,
        },
        0.02
      );

      if (lt) tl.to(lt, { y: -16, ease: "none", duration: 1.2 }, 0.02);
      if (lm) tl.to(lm, { y: -24, ease: "none", duration: 1.2 }, 0.02);
      if (lb) tl.to(lb, { y: -12, ease: "none", duration: 1.2 }, 0.02);
      if (rt) tl.to(rt, { y: -18, ease: "none", duration: 1.2 }, 0.02);
      if (rm) tl.to(rm, { y: -10, ease: "none", duration: 1.2 }, 0.02);
      if (rb) tl.to(rb, { y: -22, ease: "none", duration: 1.2 }, 0.02);

      tl.to(
        left,
        {
          x: (_: any, el: any) => offLeft(el),
          y: "-=52",
          ease: "none",
          duration: 1.1,
          stagger: 0.05,
        },
        1.25
      );

      tl.to(
        right,
        {
          x: (_: any, el: any) => offRight(el),
          y: "-=52",
          ease: "none",
          duration: 1.1,
          stagger: 0.05,
        },
        1.25
      );

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      window.addEventListener("load", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onResize);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  // 3b. Sides Section & Fullscreen Parallax Scrub (matching Webflow a-3 Parallax General)
  useEffect(() => {
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
      gsap.set(scribbles, { "--scribble-line-color": "#E8CEFF" });

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

      tl.to(title, { y: -240, duration: 0.3 }, 0.0)
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
        gsap.set(scribbles, { "--scribble-line-color": "#E8CEFF" });
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
              gap: "1.5rem",
              arrows: false,
              pagination: false,
              speed: 800,
              breakpoints: {
                991: {
                  perPage: 2,
                  gap: "1rem",
                  padding: { right: "2rem" },
                },
                767: {
                  perPage: 1,
                  gap: "1rem",
                  padding: { right: "2rem" },
                },
                479: {
                  perPage: 1,
                  gap: "0.85rem",
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

    authors.forEach((el, i) => {
      el.addEventListener("click", () => {
        setActive(i, !canAnimateNow());
      });
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
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    window.open("https://calendly.com/dipakh810/30min", "_blank");
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
                  Live <span data-scribble="hero" className="scribble-wrap scribble-visible">better,</span>
                  <br />
                  closer to USC
                </h1>
              </div>
              <div className="p_box">
                <div className="p_gen">
                  Freshly renovated and upgraded. Minutes from Williams-Brice. Designed for focused mornings, long nights, and balanced student living.
                </div>
              </div>
            </div>

            {/* 3 Thumbnails with active indicator */}
            <div className="thumbnails_images">
              {heroSlides.map((slide, i) => (
                <div
                  key={`${slide.image}-${activeSlide === i ? "active" : "inactive"}`}
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

        {/* DYNAMIC SECTION (Everything student living should be) */}
        <section ref={dynamicSectionRef} className="dynamic_section" id="gallery">
          <div className="middle">
            <h2 className="h2 second_h">
              Everything student<br />
              living <span data-scribble="1" className="scribble-wrap">should be</span>
            </h2>
          </div>

          <div className="interaction_gallery">
            <div className="wrapper_dynamic">
              <div className="interaction__stage">
                <div className="photo--rt">
                  <img src="/assets/gallery/Elevation_Evening_1.webp" alt="Elevation Evening" className="image" />
                </div>
                <div className="photo--lt">
                  <img src="/assets/gallery/Gym_1.webp" alt="Gym" className="image" />
                </div>
                <div className="photo--center">
                  <img src="/assets/gallery/center.webp" alt="Aerial view" className="image" style={{ borderRadius: "8px", width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="photo--lm">
                  <img src="/assets/gallery/CommunityHall_1.webp" alt="Community Hall" className="image" />
                </div>
                <div className="photo--rm">
                  <img src="/assets/gallery/Swimming_Pool_1.webp" alt="Swimming Pool" className="image" />
                </div>
                <div className="photo--lb">
                  <img src="/assets/gallery/Landscape_Lawn_1.webp" alt="Landscape Lawn" className="image" />
                </div>
                <div className="photo--rb">
                  <img src="/assets/gallery/Indoor_Games_Arena_1.webp" alt="Indoor Games Arena" className="image" />
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
                    <img src="/assets/Sinage_Presentation.avif" alt="Signage Presentation" className="image" />
                  </div>
                  <div className="caption_info">
                    <div className="purple_dot"></div>
                    <div className="flex_txt">
                      <div className="title_txt">Private space</div>
                      <div className="caption_txt">Your space to reset and focus</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right_side">
                <img src="/assets/Front_Elevation_View.webp" alt="Front Elevation View" className="image" />
              </div>
            </div>
          </div>

          <div className="sides_s">
            <div className="sides_wrap">
              <div className="right_side">
                <img src="/assets/SwimmingPoolView_Night_.avif" alt="Swimming Pool Night View" className="image" />
              </div>
              <div className="left_side">
                <div className="small_box caption_info right_box second_b">
                  <div className="image_small">
                    <img src="/assets/SideElevation_Day_.avif" alt="Side Elevation Day View" className="image" />
                  </div>
                  <div className="caption_info">
                    <div className="purple_dot"></div>
                    <div className="flex_txt">
                      <div className="title_txt">Shared spaces</div>
                      <div className="caption_txt">Room to connect, relax, and live beyond your apartment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APARTMENTS SECTION (Where student life feels balanced) */}
      <section ref={apartmentsSectionRef} data-section="light" className="apartments" id="apartments">
        <div className="wrapper_apartments">
          <div className="apartments_bg_gradient"></div>
          <div className="heading_apartments">
            <h2 className="h2 smaller">
              Where student life<br />
              feels <span data-scribble="4" className="scribble-wrap scribble-visible">balanced</span>
            </h2>
          </div>

          {/* Desktop Horizontal Track */}
          <div className="apart_cards_viewport only_desktop">
            <div className="apart_cards_track">
              {apartments.slice(0, 4).map((apart) => (
                <div className="apart_card" key={apart.id}>
                  <div className="apart_image">
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
                    <img src={apart.image} alt={apart.name} className="image" />
                  </div>

                  <div className="content_apart">
                    <div className="apart_title_line">
                      <div>
                        <div className="apart_title">{apart.name}</div>
                      </div>
                      <div className="price_box">
                        <div className="icon_price">
                          <img src="/assets/icons/price-icon.png" alt="$" className="image" />
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
                        onClick={(e) => {
                          e.preventDefault();
                          const matched = APARTMENTS_DATA.find((x) => x.id === apart.id) || null;
                          setModalUnit(matched);
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
                      <div className="apart_image">
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
                        <img src={apart.image} alt={apart.name} className="image" />
                      </div>
                      <div className="content_apart">
                        <div className="apart_title_line">
                          <div className="apart_title">{apart.name}</div>
                          <div className="price_box"><div className="price_txt">${apart.price}</div></div>
                        </div>
                        <div className="desc_home"><div className="p_gen black specific">{apart.desc}</div></div>
                        <div className="explore_button" style={{ marginTop: "16px" }}>
                          <WebflowButton
                            text="Explore Details"
                            onClick={(e) => {
                              e.preventDefault();
                              const matched = APARTMENTS_DATA.find((x) => x.id === apart.id) || null;
                              setModalUnit(matched);
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
                <span data-scribble="3" className="scribble-wrap scribble-visible">Closer</span> than<br />
                you think
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
            <img src="/__l5e/assets-v1/0965a376-88b5-41d6-800b-c528286cc0ab/19-fs-image.avif" alt="Aerial view of 21Oaks" className="image" />
          </div>
        </div>
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
                  From campus to everyday essentials — everything is closer than you think.
                </div>
              </div>

              <div className="lines_list">
                <div className="lines_dynamic">
                  <div className="flex_dyn">
                    <div className="title_line">Campus</div>
                    <div className="timing_txt">3 min</div>
                  </div>
                  <div className="bar_dynamic">
                    <div className="active_bar" style={{ width: "0%" }}></div>
                  </div>
                </div>

                <div className="lines_dynamic">
                  <div className="flex_dyn">
                    <div className="title_line">Daily Essentials</div>
                    <div className="timing_txt">5 min</div>
                  </div>
                  <div className="bar_dynamic">
                    <div className="active_bar" style={{ width: "0%" }}></div>
                  </div>
                </div>

                <div className="lines_dynamic">
                  <div className="flex_dyn">
                    <div className="title_line">Food &amp; Social Spots</div>
                    <div className="timing_txt">10 min</div>
                  </div>
                  <div className="bar_dynamic">
                    <div className="active_bar" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p_right">
              <div className="md_p">
                Designed around your routine, so everything feels easy and connected. From campus to everyday essentials, you’re always close to what matters — without the hassle of long commutes or planning around distance.
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
                    <div className="splide__slide" key={amenity.title}>
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
                        <img src={amenity.image} alt={amenity.title} className="image" />
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
                    <div className="caption_small">Simple Move-In</div>
                  </div>
                  <div className="headline_box">
                    <h2 className="h2 smaller">
                      How it <span data-scribble="2" className="scribble-wrap scribble-visible">Works</span>
                    </h2>
                  </div>
                </div>

                <div className="bottom_how only_desktop">
                  <div className="p_gen black">
                    Sounds like a fit? <br />
                    Apply now or book a tour.
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
                <div style={{ backgroundColor: "#e8ceff" }} className="how_card">
                  <div className="wrapper_how">
                    <div className="icon_how">
                      <img src="/assets/icons/find-1.avif" alt="Find your space" />
                    </div>
                    <div className="content_how">
                      <div className="title_how">Find your space</div>
                      <div className="p_gen black">
                        Explore different layouts, compare options, and choose a space that fits your routine, lifestyle, and daily flow.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: "#feb7b9" }} className="how_card">
                  <div className="wrapper_how">
                    <div className="icon_how">
                      <img src="/assets/icons/apply-2.avif" alt="Apply in minutes" />
                    </div>
                    <div className="content_how">
                      <div className="title_how">Apply in minutes</div>
                      <div className="p_gen black">
                        Complete your application online in just a few steps. The process is simple, fast, and designed to get you approved without delays.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: "#f3ede6" }} className="how_card">
                  <div className="wrapper_how">
                    <div className="icon_how">
                      <img src="/assets/icons/move-3.avif" alt="Move in, settle fast" />
                    </div>
                    <div className="content_how">
                      <div className="title_how">Move in, settle fast</div>
                      <div className="p_gen black">
                        Once approved, everything is ready for your arrival. Move in seamlessly and start living comfortably from day one.
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
              <span data-scribble="2" className="scribble-wrap scribble-visible">Real</span> student<br />
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
      <section data-section="light" className="faqs" id="faq">
        <div className="wrapper_general basic">
          <div className="faq_heading">
            <h2 className="h2 smaller">
              Frequently asked<br />questions
            </h2>
          </div>

          <div className="sides_faq">
            <div className="short_left">
              <div className="caption_faq">
                <div>Everything you might want to know before moving in.</div>
              </div>
              <div className="bottom_faq">
                <div className="p_gen black caption_cta">
                  Didn’t find what you were<br />looking for?
                </div>
                <div>
                  <WebflowButton
                    text="Explore FAQ"
                    href="#faq"
                  />
                </div>
              </div>
            </div>

            <div className="faq_general">
              <div className="collection_faq w-dyn-list">
                <div role="list" className="w-dyn-items">
                  {faqsList.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        role="listitem"
                        key={faq.q}
                        className={`accordion-item w-dyn-item ${isOpen ? "is-open" : ""}`}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <div className="accordion_head-wrapper">
                          <div className="item_head">
                            <div className="title_wrapper">
                              <div className="item_title">{faq.q}</div>
                              <div className="icon_wrapper" />
                            </div>
                          </div>
                        </div>

                        <div className="item_content-wrapper">
                          <div className="accordion_paragraph">
                            <div className="item_paragraph w-richtext">
                              <p>{faq.a}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRE-FOOTER CTA SECTION */}
      <section data-section="dark" id="contact">
        <section className="fs_cta">
          <div className="abs_box">
            <div className="pink_cta">
              <div className="wrapper_box_cta">
                <div className="heading_cta">
                  <div className="txt_cta">
                    Find your place.<br />
                    Make it yours.
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
                    <img src="/assets/icons/move-3.png" alt="Moon outline" className="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fs_bg">
            <img src="/assets/image_cta.avif" alt="21Oaks luxury lounge" className="image" />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="wrapper_footer">
            <div className="flex_f_top">
              <div className="caption_left">
                <div className="cap_footer">21Oaks</div>
                <div className="cap_footer">
                  Your space. <span data-scribble="4" className="scribble-wrap scribble-visible">Still on.</span>
                </div>
              </div>

              <div className="menu_footer">
                <div className="box_menu">
                  <div className="title_footer">Discover</div>
                  <div className="links_list">
                    <Link to="/apartments" className="link_f">Apartments</Link>
                    <a href="#amenities" className="link_f">Amenities</a>
                    <Link to="/location" className="link_f">Location</Link>
                    <a href="#gallery" className="link_f">Gallery</a>
                    <a href="#how-it-works" className="link_f">How to apply</a>
                    <a href="#contact" className="link_f">Contact</a>
                  </div>
                </div>

                <div className="box_menu">
                  <div className="title_footer">Contact</div>
                  <div className="links_list">
                    <div
                      className="link_f"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopy("21 National Guard Rd, Columbia, SC 29201", "Address Copied!")}
                    >
                      21 National Guard Rd<br />Columbia, SC 29201
                    </div>
                    <div
                      className="link_f"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopy("+1 (803) 937-2431", "Phone Copied!")}
                    >
                      +1 (803) 937-2431
                    </div>
                    <div
                      className="link_f"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCopy("21oaks@bhom.com", "Email Copied!")}
                    >
                      21oaks@bhom.com
                    </div>
                    {copyFeedback && (
                      <div style={{ color: "#d6b2ff", fontSize: "11px", fontWeight: 600 }}>
                        ✓ {copyFeedback}
                      </div>
                    )}
                  </div>
                </div>

                <div className="box_menu">
                  <div className="title_footer">Office Hours</div>
                  <div className="links_list">
                    <div className="link_f">Mon - Fri: 10am - 6pm</div>
                    <div className="link_f">Sat: 10am - 5pm</div>
                    <div className="link_f">Sun: 1pm - 5pm</div>
                  </div>
                </div>

                <div className="box_menu">
                  <div className="title_footer">Legals</div>
                  <div className="links_list">
                    <a href="/privacy-policy" target="_blank" className="link_f">Privacy Policy</a>
                    <a href="/accessibility-policy" target="_blank" className="link_f">Accessibility Policy</a>
                    <a href="/equal-housing-fair-housing" target="_blank" className="link_f">Equal Housing</a>
                    <a href="/disclosures-licenses" target="_blank" className="link_f">Disclosures</a>
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
                <a aria-label="Our Instagram" href="https://www.instagram.com/21_oaks/" target="_blank" rel="noreferrer" className="social_link w-inline-block">
                  <div className="social_icon ig" />
                </a>
                <a aria-label="Our Facebook" href="https://www.facebook.com/live21oaks" target="_blank" rel="noreferrer" className="social_link w-inline-block">
                  <div className="social_icon fb" />
                </a>
                <a aria-label="Our TikTok" href="https://www.tiktok.com/@21oaks5" target="_blank" rel="noreferrer" className="social_link w-inline-block">
                  <div className="social_icon tiktok" />
                </a>
              </div>
            </div>
          </div>

          {/* Lamp SVG interactive illustration */}
          <div className="ill_interactive">
            <FooterIllustration />
          </div>

          <div className="last_line ll_fs">
            <div className="last_txt">© B.HOM Student Living</div>
            <div className="web_dev_by">
              <span className="op_spec">Website by </span>
              <a href="https://www.artemiilebedev.com" target="_blank" rel="noreferrer" className="spec_link">
                Artemii Lebedev
              </a>
            </div>
            <div className="last_txt">All Rights Reserved 2026</div>
          </div>
        </footer>
      </section>

      {/* Lightbox Modal */}
      {modalUnit && (
        <ApartmentLightboxModal
          unit={modalUnit}
          onClose={() => setModalUnit(null)}
        />
      )}
    </div>
  );
}
