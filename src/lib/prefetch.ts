/**
 * Intelligent Route Prefetching Engine
 * Automatically pre-fetches route component chunks on link hover or during browser idle time,
 * eliminating network latency and enabling instantaneous 0ms page transitions.
 */

const PREFETCH_MAP: Record<string, () => Promise<unknown>> = {
  "/apartments": () => import("../pages/ApartmentsPage"),
  "/location": () => import("../pages/LocationPage"),
  "/about": () => import("../pages/HowToApplyPage"),
  "/about-us": () => import("../pages/HowToApplyPage"),
  "/how-to-apply": () => import("../pages/HowToApplyPage"),
  "/faq": () => import("../pages/FaqPage"),
  "/faqs": () => import("../pages/FaqPage"),
  "/gallery": () => import("../pages/GalleryPage"),
  "/team": () => import("../pages/TeamPage"),
  "/our-team": () => import("../pages/TeamPage"),
  "/careers": () => import("../pages/CareersPage"),
  "/contact": () => import("../pages/ContactPage"),
  "/404": () => import("../pages/NotFoundPage"),
};

const prefetched = new Set<string>();

export function prefetchRoute(path: string) {
  // Normalize path
  const normalized = path.split("#")[0].split("?")[0] || "/";
  if (prefetched.has(normalized)) return;

  const loader = PREFETCH_MAP[normalized];
  if (loader) {
    prefetched.add(normalized);

    // Schedule prefetch during browser idle time to keep UI 60fps responsive
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          loader().catch(() => {});
        });
      } else {
        setTimeout(() => {
          loader().catch(() => {});
        }, 50);
      }
    }
  }
}

/**
 * Automatically prefetches common next pages when the browser is idle
 */
export function prefetchCommonRoutes() {
  if (typeof window === "undefined") return;

  const idleRunner = () => {
    // Prefetch top 3 most visited destinations
    prefetchRoute("/apartments");
    prefetchRoute("/location");
    prefetchRoute("/gallery");
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(idleRunner, { timeout: 3000 });
  } else {
    setTimeout(idleRunner, 1500);
  }
}
