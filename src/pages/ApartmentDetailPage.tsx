import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";
import Header, { ArrowIcon, WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import EmiCalculator from "../components/EmiCalculator";
import { APARTMENTS_DATA, ApartmentUnit, APARTMENT_FAQS } from "../data/apartmentsData";

gsap.registerPlugin(ScrollTrigger);

interface AmenityShowcaseItem {
  title: string;
  desc: string;
  img: string;
}

const AMENITY_SHOWCASE: AmenityShowcaseItem[] = [
  {
    title: "Rooftop Swimming Pool",
    desc: "An open-air pool on the roof, with deck seating and views across the neighbourhood.",
    img: "/assets/gallery/Swimming_Pool_1.webp",
  },
  {
    title: "Multi-Gym, Aerobics & Yoga",
    desc: "Cardio and strength equipment with a dedicated floor for aerobics and yoga.",
    img: "/assets/gallery/Gym_1.webp",
  },
  {
    title: "Indoor Games Arena",
    desc: "A double-height lounge for carrom, cards, table games and darts.",
    img: "/assets/gallery/Indoor_Games_Arena_1.webp",
  },
  {
    title: "Community Hall",
    desc: "An air-conditioned hall for pujas, weddings, annaprashan and society gatherings.",
    img: "/assets/gallery/CommunityHall_1.webp",
  },
  {
    title: "Landscaped Garden",
    desc: "Green lawns, flowering walkways and a children\u2019s play zone within the grounds.",
    img: "/assets/gallery/Landscape_Lawn_1.webp",
  },
];

export default function ApartmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Find apartment by slug/id (or default to D1)
  const unit: ApartmentUnit =
    APARTMENTS_DATA.find((a) => a.id.toLowerCase() === (slug || "").toLowerCase()) ||
    APARTMENTS_DATA[0];

  // GSAP ScrollTrigger Hero Stage Refs
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pinInnerRef = useRef<HTMLDivElement | null>(null);
  const flyerRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Splide Slider Ref
  const splideContainerRef = useRef<HTMLDivElement | null>(null);
  const splideInstanceRef = useRef<Splide | null>(null);

  // Sticky price card collapsed / expanded state
  const [feesOpen, setFeesOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 767;
    }
    return true;
  });

  // Manual override for price card auto-collapse on scroll
  const manualOverrideRef = useRef<boolean>(false);
  const lastScrollYRef = useRef<number>(0);

  // Amenities tab state
  const [activeAmenityTab, setActiveAmenityTab] = useState<"Interior" | "Features" | "Community">("Interior");

  // FAQ accordion active state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 1. Route initialization: scroll to top & set document title
  useEffect(() => {
    window.scrollTo(0, 0);
    if (unit) {
      document.title = `${unit.name} • ${unit.bedrooms} Bedroom Luxury Residence in Siliguri | SGMG`;
    }
  }, [slug, unit]);

  // 2. Desktop Price Card scroll collapse / expand behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (window.innerWidth <= 767) {
        lastScrollYRef.current = currentY;
        return;
      }

      if (currentY > 60) {
        manualOverrideRef.current = false;
      }

      if (manualOverrideRef.current) {
        lastScrollYRef.current = currentY;
        return;
      }

      const delta = currentY - lastScrollYRef.current;
      if (Math.abs(delta) < 4) {
        lastScrollYRef.current = currentY;
        return;
      }

      const shouldOpen = delta < 0; // scroll up -> open; scroll down -> collapse
      setFeesOpen(shouldOpen);
      lastScrollYRef.current = currentY;
    };

    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setFeesOpen(false);
      } else {
        setFeesOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3. Signature GSAP ScrollTrigger Hero Pinning & Flyer Scaling (Authentic 21Oaks mechanism)
  useEffect(() => {
    // A. Dynamic Header Color Switcher (is-hero, is-light, is-dark)
    const updateHeaderMode = () => {
      const header = document.querySelector<HTMLElement>(".header");
      const headerH = header ? header.offsetHeight : 80;
      const y = headerH + 1;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-section="hero"], [data-section="light"], [data-section="dark"]'
        )
      );
      if (!sections.length) return;

      let mode: string | null = null;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          mode = el.getAttribute("data-section");
          break;
        }
      }

      if (!mode) {
        const hero = stageRef.current || document.querySelector<HTMLElement>('[data-section="hero"]');
        if (hero && hero.getBoundingClientRect().top <= y && hero.getBoundingClientRect().bottom > y) {
          mode = "hero";
        } else {
          mode = "light";
        }
      }

      if (mode === "hero") {
        const logo = document.querySelector<HTMLElement>(".logo");
        const flyerEl = flyerRef.current || document.querySelector<HTMLElement>(".fs_template");
        if (logo && flyerEl) {
          const logoR = logo.getBoundingClientRect();
          const flyerR = flyerEl.getBoundingClientRect();
          const overlaps = !(
            logoR.right < flyerR.left ||
            logoR.left > flyerR.right ||
            logoR.bottom < flyerR.top ||
            logoR.top > flyerR.bottom
          );
          if (!overlaps) {
            mode = "light";
          }
        }
      }

      document.body.classList.toggle("is-hero", mode === "hero");
      document.body.classList.toggle("is-light", mode === "light");
      document.body.classList.toggle("is-dark", mode === "dark");
    };

    updateHeaderMode();
    window.addEventListener("scroll", updateHeaderMode, { passive: true });
    window.addEventListener("resize", updateHeaderMode);

    // B. Lenis smooth scrolling is mounted globally by <SmoothScroll /> in App.tsx.
    // Lenis scrolls the window, so the native listener above keeps the header in
    // sync; a second instance here would fight the global one for the scroller.

    // C. GSAP MatchMedia & Hero ScrollTrigger
    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      const stage = stageRef.current;
      const pinInner = pinInnerRef.current;
      const flyer = flyerRef.current;
      const slot = slotRef.current;
      const content = contentRef.current;

      if (!stage || !pinInner || !flyer || !slot || !content) return;

      const stageEl: HTMLDivElement = stage;
      const pinInnerEl: HTMLDivElement = pinInner;
      const flyerEl: HTMLDivElement = flyer;
      const slotEl: HTMLDivElement = slot;
      const contentEl: HTMLDivElement = content;

      const rem = () =>
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const layoutWidth = () => document.documentElement.clientWidth;
      const layoutHeight = () => window.innerHeight;

      const easeFly = gsap.parseEase("sine.inOut");
      const invertSteep = 0.22;
      const invertCoverFloor = 0.08;
      const invertStartCover = 0.82;

      let start = { left: 0, top: 0, width: 0, height: 0 };
      let end = { left: 0, top: 0, width: 0, height: 0 };

      function overlapRatio(a: DOMRect, b: DOMRect) {
        const left = Math.max(a.left, b.left);
        const top = Math.max(a.top, b.top);
        const right = Math.min(a.right, b.right);
        const bottom = Math.min(a.bottom, b.bottom);
        const w = Math.max(0, right - left);
        const h = Math.max(0, bottom - top);
        const inter = w * h;
        const base = Math.max(1, b.width * b.height);
        return inter / base;
      }

      function invertFromCover(cover: number) {
        const c = Math.max(0, Math.min(1, cover));
        if (c >= invertStartCover) return 0;
        if (c <= invertCoverFloor) return 100;
        const span = Math.max(1e-6, invertStartCover - invertCoverFloor);
        const t = (invertStartCover - c) / span;
        const steep = Math.pow(Math.min(1, t), invertSteep);
        return Math.min(100, Math.round(steep * 100));
      }

      function measure() {
        const vw = layoutWidth();
        const vh = layoutHeight();
        const marginRightPx = 2 * rem();
        const marginBottomPx = 0.2 * rem();

        gsap.set(flyerEl, {
          left: 0,
          top: 0,
          width: vw,
          height: vh,
          x: 0,
          y: 0,
          scale: 1,
        });

        start = { left: 0, top: 0, width: vw, height: vh };

        const r = slotEl.getBoundingClientRect();
        end = {
          width: r.width,
          height: r.height,
          top: vh - marginBottomPx - r.height,
          left: vw - marginRightPx - r.width,
        };
      }

      function apply(p: number) {
        p = Math.max(0, Math.min(1, p));
        const pe = easeFly(p);

        const curLeft = start.left + (end.left - start.left) * pe;
        const curTop = start.top + (end.top - start.top) * pe;
        const curW = start.width + (end.width - start.width) * pe;
        const curH = start.height + (end.height - start.height) * pe;

        gsap.set(flyerEl, {
          left: curLeft,
          top: curTop,
          width: curW,
          height: curH,
          margin: 0,
          maxWidth: "none",
        });

        const fr = flyerEl.getBoundingClientRect();
        const cr = contentEl.getBoundingClientRect();
        contentEl.style.filter = `invert(${invertFromCover(overlapRatio(fr, cr))}%)`;
      }

      gsap.set(flyerEl, {
        position: "fixed",
        top: 0,
        left: 0,
        right: "auto",
        bottom: "auto",
        margin: 0,
        maxWidth: "none",
        width: layoutWidth(),
        height: layoutHeight(),
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        skewX: 0,
        skewY: 0,
      });

      measure();

      const st = ScrollTrigger.create({
        trigger: stageEl,
        start: "top top",
        end: "bottom bottom",
        pin: pinInnerEl,
        pinSpacing: true,
        pinType: "fixed",
        anticipatePin: 1,
        scrub: 0.75,
        invalidateOnRefresh: true,
        onRefresh(self) {
          measure();
          apply(self.progress);
          updateHeaderMode();
        },
        onUpdate(self) {
          apply(self.progress);
          updateHeaderMode();
        },
      });

      const imgs = Array.from(
        document.querySelectorAll<HTMLImageElement>(".fs_template img, #gallery-slot img")
      );
      let pending = imgs.length;
      const done = () => {
        pending--;
        if (pending <= 0) ScrollTrigger.refresh();
      };
      if (!pending) ScrollTrigger.refresh();
      imgs.forEach((img) => {
        if (img.complete) done();
        else {
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }
      });

      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
          apply(st.progress);
        });
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        apply(st.progress);
        updateHeaderMode();
      });

      return () => {
        window.removeEventListener("resize", onResize);
        st.kill();
        contentEl.style.filter = "";
        gsap.set(flyerEl, { clearProps: "all" });
      };
    });

    return () => {
      window.removeEventListener("scroll", updateHeaderMode);
      window.removeEventListener("resize", updateHeaderMode);
      document.body.classList.remove("is-hero", "is-light", "is-dark");
      mm.revert();
    };
  }, [slug, unit]);

  // 3B. Signature Fixed Price Card Scroll Progress Hide/Show Interaction (Authentic 21Oaks mechanism)
  // On 21Oaks: Triggered by <main> (Hero + Apartment Details section).
  // From 0% to 85% progress: translateY(0%) (visible).
  // From 85% to 100% progress: translateY(150%) (smoothly slides down out of view).
  // After <main> (Gallery, Amenities, Pets, FAQs, CTA, Footer): stays hidden at translateY(150%).
  // Scrolling back up into <main>: smoothly slides back into view.
  useEffect(() => {
    const mainEl = document.querySelector<HTMLElement>("main");
    const fixedPriceEl = document.querySelector<HTMLElement>(".fixed_price");
    if (!mainEl || !fixedPriceEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainEl,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress >= 0.98) {
            fixedPriceEl.style.pointerEvents = "none";
          } else {
            fixedPriceEl.style.pointerEvents = "auto";
          }
        },
        onLeave: () => {
          gsap.set(fixedPriceEl, { yPercent: 150, pointerEvents: "none" });
        },
        onLeaveBack: () => {
          gsap.set(fixedPriceEl, { yPercent: 0, pointerEvents: "auto" });
        },
        onEnter: () => {
          fixedPriceEl.style.pointerEvents = "auto";
        },
        onEnterBack: () => {
          fixedPriceEl.style.pointerEvents = "auto";
        },
      },
    });

    tl.to(fixedPriceEl, {
      yPercent: 0,
      ease: "none",
      duration: 0.85,
    }).to(fixedPriceEl, {
      yPercent: 150,
      ease: "power1.in",
      duration: 0.15,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.set(fixedPriceEl, { clearProps: "transform,pointerEvents" });
    };
  }, [slug, unit]);

  // 4. Splide Slider for Amenities Carousel ("Just outside your door")
  useEffect(() => {
    let splideInstance: Splide | null = null;
    let observer: ResizeObserver | null = null;
    const container = splideContainerRef.current;
    if (container) {
      try {
        splideInstance = new Splide(container, {
          perPage: 3,
          perMove: 1,
          focus: 0,
          type: "slide",
          gap: "0rem",
          arrows: false,
          pagination: false,
          speed: 800,
          drag: true,
          flickPower: 600,
          dragAngleThreshold: 60,
          autoWidth: false,
          rewind: false,
          rewindSpeed: 500,
          waitForTransition: true,
          updateOnMove: false,
          trimSpace: true,
          breakpoints: {
            991: {
              perPage: 2,
              gap: "0rem",
              padding: { right: "2.5rem" },
            },
            767: {
              perPage: 1,
              gap: "0rem",
              padding: { right: "3rem" },
            },
            479: {
              perPage: 1,
              gap: "0rem",
              padding: { left: "0rem", right: "2.5rem" },
            },
          },
        });

        splideInstance.mount();
        splideInstanceRef.current = splideInstance;
        (container as any).splide = splideInstance;

      } catch (err) {
        console.warn("Splide init notice:", err);
      }
    }

    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      splideInstance?.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (splideInstance) {
        splideInstance.destroy();
        splideInstanceRef.current = null;
      }
    };
  }, []);

  // 5. Dynamic Scribble Animation on Scroll
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-scribble]");
    if (!nodes.length) return;

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

  // 6. Authentic Webflow Drag Scroller with Inertia Physics for Full Gallery
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingGallery, setIsDraggingGallery] = useState<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);

  useEffect(() => {
    const scroller = galleryRef.current;
    if (!scroller) return;

    let isDown = false;
    let prevX = 0;
    let startX = 0;
    let velocity = 0;
    let rafId = 0;

    const DRAG_MULT = 1;
    const FRICTION = 0.94;
    const STOP_EPS = 0.08;

    function startInertia() {
      cancelAnimationFrame(rafId);

      const tick = () => {
        if (isDown || !scroller) return;
        velocity *= FRICTION;

        if (Math.abs(velocity) < STOP_EPS) {
          velocity = 0;
          return;
        }

        scroller.scrollLeft -= velocity;
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      isDown = true;
      prevX = e.clientX;
      startX = e.clientX;
      velocity = 0;
      hasDraggedRef.current = false;
      setIsDraggingGallery(true);
      scroller.classList.add("is-dragging");
      scroller.setPointerCapture?.(e.pointerId);
      cancelAnimationFrame(rafId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;

      const totalDelta = Math.abs(e.clientX - startX);
      if (totalDelta > 6) {
        hasDraggedRef.current = true;
      }

      const dx = (e.clientX - prevX) * DRAG_MULT;
      prevX = e.clientX;

      scroller.scrollLeft -= dx;
      velocity = velocity * 0.7 + dx * 0.3;
    };

    const stop = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      setIsDraggingGallery(false);
      scroller.classList.remove("is-dragging");
      try {
        scroller.releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      startInertia();

      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 120);
    };

    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", stop);
    scroller.addEventListener("pointercancel", stop);
    scroller.addEventListener("pointerleave", stop);
    scroller.addEventListener("dragstart", onDragStart);

    return () => {
      cancelAnimationFrame(rafId);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", stop);
      scroller.removeEventListener("pointercancel", stop);
      scroller.removeEventListener("pointerleave", stop);
      scroller.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return (
    <div className="page-wrapper apartment-detail-view">
      <Header />

      {/* Floating Sticky Booking Card (Desktop & Mobile) */}
      <div className="fixed_price">
        <div className="price_card">
          <div className="w-dyn-list">
            <div role="list" className="price_card_box w-dyn-items">
              <div role="listitem" className="price_card_item w-dyn-item">
                <div className={`price_card_wrapper ${feesOpen ? "is-open" : "is-collapsed"}`}>
                  <div className="top_line">
                    <div className="heading_card">
                      <div>{unit.name}</div>
                    </div>
                    <div className="right_chev">
                      <div className="price_field">
                        <div className="price_box">
                          <div className="icon_price">
                            <img
                              src="/assets/icons/rupee-icon.svg"
                              loading="lazy"
                              alt="₹"
                              className="image"
                            />
                          </div>
                          <div className="price_txt specific_card">{unit.priceFormatted}</div>
                        </div>
                      </div>
                      <div
                        className={`chevron_dropdown ${feesOpen ? "is-open" : ""}`}
                        role="button"
                        tabIndex={0}
                        aria-expanded={feesOpen}
                        aria-label="Toggle one-time fees"
                        onClick={() => {
                          manualOverrideRef.current = true;
                          setFeesOpen(!feesOpen);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            manualOverrideRef.current = true;
                            setFeesOpen(!feesOpen);
                          }
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="list_prices" style={{ maxHeight: feesOpen ? "420px" : "0px" }}>
                    <div className="list_prices_inner">
                      <div className="box_prices">
                        <div className="title_prices">
                          <div>Indicative charges</div>
                        </div>
                        <div className="lists_prices">
                          <div className="line_price">
                            <div>Base rate</div>
                            <div>{unit.pricePerSqft}</div>
                          </div>
                          {unit.charges.map((charge) => (
                            <div className="line_price" key={charge.label}>
                              <div>{charge.label}</div>
                              <div>{charge.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="buttons_last">
                    <a href="/contact" className="button_apply w-inline-block">
                      <div>Apply Now</div>
                    </a>
                    <a
                      href="https://calendly.com/dipakh810/30min"
                      target="_blank"
                      rel="noreferrer"
                      className="button_schedule w-inline-block"
                    >
                      <div>Schedule a Tour</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* Signature 21Oaks ScrollTrigger Hero Stage */}
        <div data-section="hero" className="scroll_stage" ref={stageRef}>
          <div className="pin_inner" ref={pinInnerRef}>
            <div className="hero_section">
              {/* Overlay Content with Dynamic Invert Text Filter */}
              <div className="apartment_content" ref={contentRef}>
                <div className="h1_apartments">
                  <h1 className="h1">{unit.name}</h1>
                  <div className="tags_info">
                    <div className="tag_info">
                      <div className="icon_tag">
                        <img
                          src="/assets/icons/6a31483f3822b51654193a93_bed-icon.png"
                          loading="lazy"
                          alt="Bed icon"
                          className="image"
                        />
                      </div>
                      <div>{unit.beds}</div>
                    </div>
                    <div className="tag_info">
                      <div className="icon_tag">
                        <img
                          src="/assets/icons/6a31483f3822b51654193a92_bath-icon.png"
                          loading="lazy"
                          alt="Bath icon"
                          className="image"
                        />
                      </div>
                      <div>{unit.baths}</div>
                    </div>
                    <div className="tag_info">
                      <div className="icon_tag">
                        <img
                          src="/assets/icons/6a31483f3822b51654193a94_ft-icon.png"
                          loading="lazy"
                          alt="Square feet icon"
                          className="image"
                        />
                      </div>
                      <div>{unit.sqft}</div>
                      <div>
                        ft<sup>2</sup>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bottom_desc">
                  <div className="title_temp">About the property</div>
                  <div className="p_apartments">{unit.aboutText || unit.desc}</div>
                </div>
              </div>

              {/* Fullscreen Hero Flyer that scrubs smoothly into #gallery-slot */}
              <div className="fs_template" ref={flyerRef}>
                <div className="fs_template_inner">
                  <div className="overlay_template"></div>
                  <ImageWithSkeleton
                    src={unit.coverImage}
                    loading="eager"
                    alt={unit.name}
                    className="image apartments_f1"
                  />
                </div>
              </div>

              {/* Right Stack Target Slot */}
              <div className="right_stack">
                <div id="gallery-slot" className="gallery_slot" ref={slotRef}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Split Section: Left Details & Right Stacked Gallery */}
        <div className="list_details" data-section="light">
          <div className="wrapper_details">
            <div className="side_apartments">
              {/* Left Column: Details, Narrative, Amenities Tabs */}
              <div className="side_details">
                {/* Part 1: Apartment Details Feature Grid */}
                <div className="part_1">
                  <div className="details_main">
                    <h1 className="h2 apartments_heading">
                      Apartment<br />Details
                    </h1>
                    <div className="grid_features">
                      <div className="box_featured">
                        <div className="icon_apart_box">
                          <img
                            src="/assets/icons/6a31483f3822b51654193ae8_1.png"
                            loading="lazy"
                            alt="Furnished & Ready"
                            className="image"
                          />
                        </div>
                        <div className="content_featured">
                          <div className="title_featured">Furnished &amp; Ready</div>
                          <div className="desc_featured">Everything is in place from day one.</div>
                        </div>
                      </div>

                      <div className="box_featured">
                        <div className="icon_apart_box">
                          <img
                            src="/assets/icons/6a31483f3822b51654193ae7_3.png"
                            loading="lazy"
                            alt="Private Bedrooms"
                            className="image"
                          />
                        </div>
                        <div className="content_featured">
                          <div className="title_featured">Private Bedrooms</div>
                          <div className="desc_featured">A quiet space to relax and recharge.</div>
                        </div>
                      </div>

                      <div className="box_featured">
                        <div className="icon_apart_box">
                          <img
                            src="/assets/icons/6a31483f3822b51654193b2f_university.png"
                            loading="lazy"
                            alt="Architectural Balance"
                            className="image"
                          />
                        </div>
                        <div className="content_featured">
                          <div className="title_featured">Architectural Balance</div>
                          <div className="desc_featured">
                            Designed to balance privacy, comfort, and shared family living.
                          </div>
                        </div>
                      </div>

                      <div className="box_featured">
                        <div className="icon_apart_box">
                          <img
                            src="/assets/icons/6a31483f3822b51654193b08_f-icon-4.png"
                            loading="lazy"
                            alt="Generous Shared Living"
                            className="image"
                          />
                        </div>
                        <div className="content_featured">
                          <div className="title_featured">Generous Shared Living</div>
                          <div className="desc_featured">
                            Spacious open-plan living and dining areas designed to bring families together.
                          </div>
                        </div>
                      </div>

                      <div className="box_featured">
                        <div className="icon_apart_box">
                          <img
                            src="/assets/icons/6a31483f3822b51654193aea_2.png"
                            loading="lazy"
                            alt="Premium Options"
                            className="image"
                          />
                        </div>
                        <div className="content_featured">
                          <div className="title_featured">Premium Options</div>
                          <div className="desc_featured">Enhanced finishes and added comfort.</div>
                        </div>
                      </div>

                      <div className="box_featured">
                        <div className="icon_apart_box">
                          <img
                            src="/assets/icons/6a31483f3822b51654193ae9_4.png"
                            loading="lazy"
                            alt="Kitchen & Laundry"
                            className="image"
                          />
                        </div>
                        <div className="content_featured">
                          <div className="title_featured">Kitchen &amp; Laundry</div>
                          <div className="desc_featured">Designed for everyday living.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Box Images A (Interleaved on mobile, hidden on desktop) */}
                <div className="mobile_box_images">
                  <div className="collection_mobile collection--a">
                    {unit.gallery.slice(1, 3).map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="image_box_mobile"
                      >
                        <ImageWithSkeleton
                          src={imgUrl}
                          alt={`${unit.name} photo ${idx + 2}`}
                          loading="lazy"
                          className="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 2: Narrative Layout Description */}
                <div className="part_2">
                  <div className="desc_box sp_part">
                    <h1 className="h2 apartments_heading">
                      A balanced<br />living layout
                    </h1>
                    <div className="p_md">
                      <div className="p_gen black">
                        {unit.storyDesc || unit.desc}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Box Images B (Interleaved on mobile, hidden on desktop) */}
                <div className="mobile_box_images">
                  <div className="collection_mobile collection--b">
                    {unit.gallery.slice(3, 5).map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="image_box_mobile"
                      >
                        <ImageWithSkeleton
                          src={imgUrl}
                          alt={`${unit.name} photo ${idx + 4}`}
                          loading="lazy"
                          className="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 3: Amenities Tabs */}
                <div className="part_3">
                  <div className="desc_box">
                    <div className="amenities_box">
                      <h1 className="h2 apartments_heading">Amenities</h1>
                      <div className="p_md">
                        <div className="p_gen black">
                          {unit.name} features expansive sunlit interiors, premium finishes, modern fittings, and thoughtfully designed living zones crafted to support an elevated lifestyle. The layout optimizes natural ventilation and privacy while offering generous common spaces to relax, entertain, and recharge. Homeowners also enjoy exclusive access to state-of-the-art wellness amenities, swimming facilities, landscaped gardens, and dedicated community spaces across SGMG Residences.
                        </div>
                      </div>
                    </div>

                    <div className="included_list">
                      <div className="title_included">What&#x27;s Included</div>
                      <div className="tabs_list w-tabs">
                        <div className="tabs_boxes w-tab-menu">
                          <button
                            type="button"
                            className={`tab_gen w-inline-block w-tab-link ${activeAmenityTab === "Interior" ? "w--current" : ""}`}
                            onClick={() => {
                              setActiveAmenityTab("Interior");
                              setTimeout(() => ScrollTrigger.refresh(), 50);
                            }}
                          >
                            <div>Interior</div>
                          </button>
                          <button
                            type="button"
                            className={`tab_gen w-inline-block w-tab-link ${activeAmenityTab === "Features" ? "w--current" : ""}`}
                            onClick={() => {
                              setActiveAmenityTab("Features");
                              setTimeout(() => ScrollTrigger.refresh(), 50);
                            }}
                          >
                            <div>Features</div>
                          </button>
                          <button
                            type="button"
                            className={`tab_gen w-inline-block w-tab-link ${activeAmenityTab === "Community" ? "w--current" : ""}`}
                            onClick={() => {
                              setActiveAmenityTab("Community");
                              setTimeout(() => ScrollTrigger.refresh(), 50);
                            }}
                          >
                            <div>Community Spaces</div>
                          </button>
                        </div>

                        <div className="content_tabs w-tab-content">
                          {/* Tab 1: Interior */}
                          {activeAmenityTab === "Interior" && (
                            <div className="tab_content w-tab-pane w--tab-active">
                              {/* Kitchen */}
                              <div className="content_part">
                                <div className="title_list"><div>Kitchen</div></div>
                                <div className="grid_apart_list">
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193aba_1.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Dishwasher</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193abc_2.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Oven</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193ab9_3.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Microwave</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193abe_4.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Refrigerator</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193abd_5.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Range</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193abb_6.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Freezer</div>
                                  </div>
                                </div>
                              </div>

                              {/* Living Room */}
                              <div className="content_part">
                                <div className="title_list"><div>Living Room</div></div>
                                <div className="grid_apart_list">
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193adb_1.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Wall-mounted TV</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193ac0_2.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Sectional sofa</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193abf_3.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Coffee table</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193ac1_4.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Bar stools</div>
                                  </div>
                                </div>
                              </div>

                              {/* Bedroom */}
                              <div className="content_part">
                                <div className="title_list"><div>Bedroom</div></div>
                                <div className="grid_apart_list">
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193adf_1.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Full XL-size bed</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193ade_2.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Mattress</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193adc_3.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Dresser</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193ae1_4.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Study desk</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193ae0_5.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Desk chair</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193add_6.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Keyed lock</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193ae2_7.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Window blinds</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Tab 2: Features */}
                          {activeAmenityTab === "Features" && (
                            <div className="tab_content w-tab-pane w--tab-active">
                              <div className="content_part">
                                <div className="title_list"><div>Built for Comfort &amp; Convenience</div></div>
                                <div className="grid_apart_list">
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b07_f-icon-1.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Air Conditioning</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b06_f-icon-2.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Premium Wi-Fi</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b0b_f-icon-3.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>In-Unit Washer &amp; Dryer</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b05_f-icon-5.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Individual Leases</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b08_f-icon-4.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Roommate Matching</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b09_f-icon-7.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Pet Friendly</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b0a_f-icon-6.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>24/7 Maintenance</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Tab 3: Community Spaces */}
                          {activeAmenityTab === "Community" && (
                            <div className="tab_content w-tab-pane w--tab-active">
                              <div className="content_part">
                                <div className="title_list"><div>Spaces to unwind, gather &amp; connect</div></div>
                                <div className="grid_apart_list">
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b2d_c-icon-1.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Vaastu compliant</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b2b_c-icon-5.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Rooftop pool</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b0c_c-icon-2.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>24x7 power back-up</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b2e_c-icon-6.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>24x7 filtered water</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b2a_c-icon-3.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Fully automatic lifts</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b2c_c-icon-7.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Intercom ready</div>
                                  </div>
                                  <div className="item_apartment">
                                    <div className="icon_apartments">
                                      <img src="/assets/icons/6a31483f3822b51654193b29_c-icon-4.png" loading="lazy" alt="" className="image" />
                                    </div>
                                    <div>Covered Parking</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Stacked High-Resolution Photo Gallery (Desktop: photos 2-7) */}
              <div className="list_images">
                <div className="w-dyn-list">
                  <div role="list" className="list_gallery w-dyn-items">
                    {unit.gallery.slice(1).map((photoUrl, idx) => (
                      <div
                        key={idx}
                        role="listitem"
                        className="list_item_image w-dyn-item w-dyn-repeater-item"
                      >
                        <ImageWithSkeleton
                          src={photoUrl}
                          loading="lazy"
                          alt={`${unit.name} photo ${idx + 2}`}
                          className="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Full Width Gallery Section with Drag-Momentum Scroller */}
      <section className="full_gallery">
        <div className="wrapper_gallery">
          <div className="flex_gal">
            <div className="ill_gallery">
              <img
                src="/assets/icons/ill-gallery.svg"
                loading="lazy"
                alt="Gallery illustration, svg, black"
                className="image"
              />
            </div>
            <h2 className="h2 smaller">Gallery</h2>
          </div>
        </div>

        <div className="gallery_slides">
          <div
            className={`parent_gallery w-dyn-list ${isDraggingGallery ? "is-dragging" : ""}`}
            ref={galleryRef}
          >
            <div role="list" className="full_gallery_apartment w-dyn-items">
              {unit.gallery.map((photoUrl, idx) => (
                <div
                  key={idx}
                  role="listitem"
                  className="item_gallery w-dyn-item w-dyn-repeater-item"
                >
                  <div className="box_image_gallery">
                    <ImageWithSkeleton
                      src={photoUrl}
                      loading="lazy"
                      alt={`${unit.name} slide ${idx + 1}`}
                      className="image"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Just Outside Your Door Section (Splide Carousel) */}
      <section className="amenities_section" id="amenities-showcase">
        <div className="wrapper_general basic slider_spec">
          <div className="amenities_heading">
            <h2 className="h2 middle_spec">
              Just <span data-scribble="1" className="scribble-wrap">outside</span>
              <br />
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

          <div className="container only_amenities">
            <div className="splide slider1 second_splide" ref={splideContainerRef}>
              <div className="splide__track">
                <div role="list" className="splide__list">
                  {AMENITY_SHOWCASE.map((item, idx) => (
                    <div key={idx} role="listitem" className="splide__slide amenities_splide">
                      <div className="image_amenities">
                        <div className="overlay_amenities">
                          <div className="heading_text">
                            <h3 className="title_amenities">{item.title}</h3>
                          </div>
                          <div className="bottom_amenities">
                            <div className="desc_amenities">
                              <p className="p_gen">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                        <div className="overlay_color"></div>
                        <ImageWithSkeleton
                          alt={item.title}
                          loading="lazy"
                          src={item.img}
                          className="image"
                          draggable={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <EmiCalculator />

      {/* Frequently Asked Questions Accordion Section */}
      <section className="faqs">
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
                  <a href="/faq" className="button w-inline-block">
                    <div className="icon_box is-left">
                      <div className="arrow_icon">
                        <ArrowIcon />
                      </div>
                    </div>
                    <div className="text_box">
                      <div>Explore FAQ</div>
                    </div>
                    <div className="icon_box is-right">
                      <div className="arrow_icon">
                        <ArrowIcon />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="faq_general">
              <div className="w-dyn-list">
                <div role="list" className="collection_faq w-dyn-items">
                  {APARTMENT_FAQS.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        role="listitem"
                        className={`accordion-item w-dyn-item ${isOpen ? "is-open" : "is-collapsed"}`}
                      >
                        <div
                          className="accordion_head-wrapper"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        >
                          <div className="item_head">
                            <div className="title_wrapper">
                              <div className="item_title">{faq.q}</div>
                              <div className="icon_wrapper"></div>
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

      <Footer />
    </div>
  );
}
