import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Desktop only, matching the Webflow production build: Lenis is mounted above
// 992px and torn down below it so touch devices keep their native scrolling.
const DESKTOP_QUERY = "(min-width: 992px)";

export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mq = window.matchMedia(DESKTOP_QUERY);
    let lenis: Lenis | null = null;
    const handleScroll = () => ScrollTrigger.update();

    const mount = () => {
      if (lenis) return;
      try {
        lenis = new Lenis({
          autoRaf: true,
          autoToggle: false,
          anchors: true,
          allowNestedScroll: true,
          naiveDimensions: true,
          stopInertiaOnNavigate: true,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
        });
        (window as any).lenis = lenis;
        lenis.on("scroll", handleScroll);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();
      } catch (err) {
        console.warn("Lenis initialization skipped:", err);
      }
    };

    const unmount = () => {
      if (!lenis) return;
      const y = window.scrollY;
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenis = null;
      delete (window as any).lenis;
      // Lenis restores its own scroll position on destroy, so pin the viewport
      // back where the reader actually was before handing control back.
      window.scrollTo(0, y);
      ScrollTrigger.refresh();
    };

    const sync = () => (mq.matches ? mount() : unmount());

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      unmount();
    };
  }, []);

  // Routes are code-split, so measure again once the new page has painted.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      (window as any).lenis?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
