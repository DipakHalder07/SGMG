import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { prefetchRoute } from "../lib/prefetch";

export function ArrowIcon({ fill = "#ffffff" }: { fill?: string } = {}) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.1255 19.7628C11.0656 19.8708 8.22317 18.9049 5.93495 16.846C4.47939 15.5356 3.386 13.8723 2.76021 12.0164C2.62187 11.6157 2.48585 11.2023 2.44064 10.7747C2.34121 10.0684 3.35659 9.76884 3.65706 10.365C3.84475 10.7374 3.92284 11.2876 4.07246 11.7023C4.58843 13.1699 5.43808 14.4978 6.55443 15.5813C8.45906 17.44 11.0264 18.4623 13.6874 18.4216C16.4386 18.3889 18.929 17.2713 20.8443 15.313C21.9258 14.1223 22.7385 12.8566 23.1727 11.2896C22.6501 11.6705 22.1253 12.0483 21.5983 12.4232C21.2917 12.6426 21.0064 12.8674 20.6642 13.0538C20.3212 13.2407 19.9159 13.0637 19.7399 12.7308C19.6321 12.5269 19.7386 12.1287 19.9234 11.9784C20.2204 11.7367 20.5451 11.5134 20.8618 11.288L22.372 10.2147C23.0189 9.75549 23.6958 9.2389 24.3816 8.84082C24.4655 8.79211 24.7301 8.83579 24.8205 8.87576C25.244 9.06291 25.2366 9.59525 25.3249 9.98057C25.391 10.3075 25.4501 10.6403 25.5132 10.9681L25.9183 13.074C26 13.4993 26.2317 14.3897 26.1173 14.8172C26.031 15.1398 25.4683 15.2925 25.2013 15.1156C25.1247 15.0648 25.0017 15.0014 24.9563 14.9001C24.7186 14.3244 24.6779 13.6405 24.5413 13.0347C24.4666 12.7031 24.4368 12.4232 24.328 12.1029C24.2205 12.3637 24.141 12.6276 24.0213 12.9031C23.5454 14.0084 22.8965 15.0308 22.0988 15.9319C20.0272 18.2869 17.2347 19.5627 14.1255 19.7628Z"
        fill={fill}
      />
    </svg>
  );
}

export function WebflowButton({
  text,
  href,
  onClick,
  className = "",
  target,
}: {
  text: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  target?: string;
}) {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={`button ${className} w-inline-block`}
    >
      <div className={`icon_box is-left ${className}`}>
        <div className="arrow_icon">
          <div className="arrow-icon w-embed">
            <ArrowIcon />
          </div>
        </div>
      </div>
      <div className={`text_box ${className}`}>
        <div>{text}</div>
      </div>
      <div className={`icon_box is-right ${className}`}>
        <div className="arrow_icon">
          <div className="arrow-icon w-embed">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </a>
  );
}

export function HeaderApplyButton({
  href = "/contact",
  text = "Apply Now",
  onClick,
  onMouseEnter,
  onTouchStart,
}: {
  href?: string;
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: () => void;
  onTouchStart?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      className="button header_cta w-inline-block"
      aria-label={text}
    >
      <div className="icon_box is-left">
        <div className="arrow_icon">
          <div className="arrow-icon w-embed">
            <ArrowIcon />
          </div>
        </div>
      </div>
      <div className="text_box header_btn">
        <div>{text}</div>
      </div>
      <div className="icon_box is-right">
        <div className="arrow_icon">
          <div className="arrow-icon w-embed">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </a>
  );
}

interface HeaderProps {
  darkTheme?: boolean;
}

export default function Header({ darkTheme = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close drawer on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!menuOpen) return;
      const target = e.target as HTMLElement;
      const menuEl = headerRef.current?.querySelector(".menu");
      const menuFs = headerRef.current?.querySelector(".menu_fs");
      if (menuEl?.contains(target) || menuFs?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  // Dynamic Header theme with data-section detector
  useEffect(() => {
    // If navigating to a known light page, immediately set is-light to prevent flash
    const path = location.pathname.replace(/\/$/, "");
    const isHeroRoute = path === "" || path === "/location" || (path.startsWith("/apartments/") && path !== "/apartments");
    if (!isHeroRoute) {
      document.body.classList.remove("is-hero", "is-dark");
      document.body.classList.add("is-light");
    }

    const updateHeaderTheme = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-section="hero"], [data-section="light"], [data-section="dark"]'
        )
      );
      if (!sections.length) {
        if (!isHeroRoute) {
          document.body.classList.remove("is-hero", "is-dark");
          document.body.classList.add("is-light");
        }
        return;
      }

      const header = headerRef.current;
      const headerH = header ? header.offsetHeight : 64;
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

      // If hero mode, verify the logo actually overlaps a hero element
      if (mode === "hero") {
        const logo = document.querySelector<HTMLElement>(".logo");
        const heroEl = document.querySelector<HTMLElement>(
          '.fs_template, .apartments_f1, .scroll_stage, [data-section="hero"]'
        );
        if (logo && heroEl) {
          const logoR = logo.getBoundingClientRect();
          const heroR = heroEl.getBoundingClientRect();
          const overlaps = !(
            logoR.right < heroR.left ||
            logoR.left > heroR.right ||
            logoR.bottom < heroR.top ||
            logoR.top > heroR.bottom
          );
          if (!overlaps) {
            mode = "light";
          }
        }
      }

      const isContact = path === "/contact";
      const mapSec = document.querySelector<HTMLElement>(".map_sec");
      const isMobile = window.matchMedia("(max-width: 991px)").matches;
      const preMap = isContact && isMobile && mapSec && mapSec.getBoundingClientRect().top > headerH;
      document.body.classList.toggle("is-contact-premap", !!preMap);

      document.body.classList.toggle("is-hero", mode === "hero");
      document.body.classList.toggle("is-light", mode === "light");
      document.body.classList.toggle("is-dark", mode === "dark");
    };

    updateHeaderTheme();
    const rafId = requestAnimationFrame(updateHeaderTheme);
    window.addEventListener("scroll", updateHeaderTheme, { passive: true });
    window.addEventListener("resize", updateHeaderTheme);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateHeaderTheme);
      window.removeEventListener("resize", updateHeaderTheme);
    };
  }, [location.pathname]);

  const handleNavClick = (path: string, hash?: string) => {
    setMenuOpen(false);
    if (hash) {
      if (location.pathname === path) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(path + "#" + hash);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header ref={headerRef} className={"header" + (darkTheme ? " is-dark" : "")}>
      <div className="wrapper_header">
        <div className="grid_header">
          {/* Logo */}
          <div id="w-node-ad93d22d-cd7e-431b-047e-2560671c8e8e-671c8e8b" className="logo_box">
            <Link
              to="/"
              aria-current="page"
              className="logo w-inline-block w--current"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="SGMG - Sushil Gangadhar Mittal Group"
            >
              <img
                src="/images/sgmg-logo.png"
                alt="SGMG - Sushil Gangadhar Mittal Group"
                className="logo_img logo_img_dark"
              />
              <img
                src="/images/sgmg-logo-white.png"
                alt="SGMG - Sushil Gangadhar Mittal Group"
                className="logo_img logo_img_white"
              />
            </Link>
          </div>

          {/* Dropdown Menu Drawer (Grid Area Row 2, Col 2 on Desktop / Floating on Mobile) */}
          <div
            id="w-node-_4a311b66-9aad-414b-99d1-0b895b530122-671c8e8b"
            className={`menu_fs ${menuOpen ? "is-open" : ""}`}
          >
            <div className="grid_menu_mobile">
              <a
                href="/"
                aria-current={location.pathname === "/" ? "page" : undefined}
                className={`mobile_link w-inline-block ${location.pathname === "/" ? "w--current" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/");
                }}
              >
                <div>Home</div>
              </a>
              <a
                href="/apartments"
                className={`mobile_link w-inline-block ${location.pathname === "/apartments" ? "w--current" : ""}`}
                onMouseEnter={() => prefetchRoute("/apartments")}
                onTouchStart={() => prefetchRoute("/apartments")}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/apartments");
                }}
              >
                <div>Residences</div>
              </a>

              <a
                href="/about"
                className={`mobile_link w-inline-block ${location.pathname === "/about" || location.pathname === "/how-to-apply" ? "w--current" : ""}`}
                onMouseEnter={() => prefetchRoute("/about")}
                onTouchStart={() => prefetchRoute("/about")}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/about");
                }}
              >
                <div>About</div>
              </a>
              <a
                href="/gallery"
                className="mobile_link w-inline-block"
                onMouseEnter={() => prefetchRoute("/gallery")}
                onTouchStart={() => prefetchRoute("/gallery")}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/gallery");
                }}
              >
                <div>Gallery</div>
              </a>
              <a
                href="/team"
                className={`mobile_link w-inline-block ${location.pathname === "/team" ? "w--current" : ""}`}
                onMouseEnter={() => prefetchRoute("/team")}
                onTouchStart={() => prefetchRoute("/team")}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/team");
                }}
              >
                <div>Our Team</div>
              </a>
              <a
                href="/careers"
                className={`mobile_link w-inline-block ${location.pathname === "/careers" ? "w--current" : ""}`}
                onMouseEnter={() => prefetchRoute("/careers")}
                onTouchStart={() => prefetchRoute("/careers")}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/careers");
                }}
              >
                <div>Careers</div>
              </a>
              <a
                id="w-node-_1fc5a60c-db18-5e47-1cc7-6d822ad20c80-671c8e8b"
                href="/faq"
                className="mobile_link w-inline-block"
                onMouseEnter={() => prefetchRoute("/faq")}
                onTouchStart={() => prefetchRoute("/faq")}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/faq");
                }}
              >
                <div>FAQ</div>
              </a>
            </div>
            <a
              href="/contact"
              className="contact_button w-inline-block"
              onMouseEnter={() => prefetchRoute("/contact")}
              onTouchStart={() => prefetchRoute("/contact")}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/contact");
              }}
            >
              <div>Contact</div>
            </a>
          </div>

          {/* Center Pill (Desktop) / Bottom Floating Dock (Mobile) */}
          <div
            id="w-node-ad93d22d-cd7e-431b-047e-2560671c8e92-671c8e8b"
            className={`menu ${menuOpen ? "is-open" : ""}`}
          >
            <div className="flex_menu">
              <div
                data-w-id="ad93d22d-cd7e-431b-047e-2560671c8e94"
                className="menu_link"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
              >
                <div className="hamburger">
                  <div className="line_one" />
                  <div className="line_two" />
                </div>
                <div className="menu_txt close_txt">Close</div>
                <div className="menu_txt open_txt">Menu</div>
              </div>

              <a
                href="https://calendly.com/dipakh810/30min"
                target="_blank"
                rel="noreferrer"
                className="header_button w-inline-block"
              >
                <div>Schedule a Tour</div>
              </a>
            </div>
          </div>

          {/* Right Apply Button */}
          <div className="apply_button">
            <HeaderApplyButton
              href="/contact"
              onMouseEnter={() => prefetchRoute("/contact")}
              onTouchStart={() => prefetchRoute("/contact")}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/contact");
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
