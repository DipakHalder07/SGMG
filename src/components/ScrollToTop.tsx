import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { prefetchCommonRoutes } from "../lib/prefetch";

const ROUTE_TITLES: Record<string, string> = {
  "/": "21Oaks Student Apartments • USC & Williams-Brice",
  "/apartments": "Floor Plans & Apartments • 21Oaks",
  "/location": "Neighborhood & Location Showcase • Siliguri Mall",
  "/how-to-apply": "How to Apply • 21Oaks",
  "/faq": "Frequently Asked Questions • 21Oaks",
  "/faqs": "Frequently Asked Questions • 21Oaks",
  "/gallery": "Photo Gallery • 21Oaks",
  "/contact": "Contact Us & Schedule a Tour • 21Oaks",
  "/404": "404 Not Found • 21Oaks",
};

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Prime top route chunks during browser idle
    prefetchCommonRoutes();
  }, []);

  useEffect(() => {
    // Dynamic page title per route
    if (ROUTE_TITLES[pathname]) {
      document.title = ROUTE_TITLES[pathname];
    } else if (pathname.startsWith("/apartments/") || pathname.startsWith("/apartments-cards/")) {
      const slug = pathname.split("/").pop()?.replace(/-/g, " ") || "Floor Plan";
      const titleCase = slug.replace(/\b\w/g, (c) => c.toUpperCase());
      document.title = `${titleCase} • Floor Plan • 21Oaks`;
    } else {
      document.title = "404 Not Found • 21Oaks";
    }

    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}
