import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { prefetchCommonRoutes } from "../lib/prefetch";

const ROUTE_TITLES: Record<string, string> = {
  "/": "SGMG Luxury Residences • Sushil Gangadhar Mittal Group",
  "/apartments": "Floor Plans & Residences • SGMG",
  "/location": "Neighborhood & Location Showcase • SGMG",
  "/about": "About Us • SGMG Residences",
  "/about-us": "About Us • SGMG Residences",
  "/how-to-apply": "About Us & Application Guide • SGMG",
  "/team": "Our Leadership Team • SGMG",
  "/our-team": "Our Leadership Team • SGMG",
  "/careers": "Careers & Open Positions • SGMG",
  "/faq": "Frequently Asked Questions • SGMG",
  "/faqs": "Frequently Asked Questions • SGMG",
  "/gallery": "Photo Gallery • SGMG Residences",
  "/contact": "Contact Us & Schedule a Tour • SGMG",
  "/404": "404 Not Found • SGMG",
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
      document.title = `${titleCase} • Residence • SGMG`;
    } else {
      document.title = "404 Not Found • SGMG";
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
