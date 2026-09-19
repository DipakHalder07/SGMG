import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TESTIMONIALS_DATA } from "../data/apartmentsData";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
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

    function hardResetQuotes(targetIndex: number) {
      if (quoteTween) {
        quoteTween.kill();
        quoteTween = null;
      }
      isAnimating = false;
      quotes.forEach((q, i) => {
        gsap.killTweensOf(q);
        q.classList.toggle("is-active", i === targetIndex);
        gsap.set(q, {
          display: i === targetIndex ? "flex" : "none",
          opacity: i === targetIndex ? 1 : 0,
          y: i === targetIndex ? 0 : 12,
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

  return (
    <section ref={sectionRef} data-section="light" className="testimonials" id="testimonials">
      <div className="wrapper_general basic">
        <div className="testimonials_heading">
          <h2 className="h2 bigger">
            <span data-scribble="2" className="scribble-wrap scribble-visible">
              Real
            </span>{" "}
            student
            <br />
            experiences
          </h2>
        </div>

        <div className="cms_testimonials">
          <div className="authors">
            <div className="collection-list-wrapper w-dyn-list">
              <div role="list" className="author_coll w-dyn-items">
                {TESTIMONIALS_DATA.map((item, idx) => (
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
                {TESTIMONIALS_DATA.map((item, idx) => (
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
  );
}
