import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function ArrowIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.1255 19.7628C11.0656 19.8708 8.22317 18.9049 5.93495 16.846C4.47939 15.5356 3.386 13.8723 2.76021 12.0164C2.62187 11.6157 2.48585 11.2023 2.44064 10.7747C2.34121 10.0684 3.35659 9.76884 3.65706 10.365C3.84475 10.7374 3.92284 11.2876 4.07246 11.7023C4.58843 13.1699 5.43808 14.4978 6.55443 15.5813C8.45906 17.44 11.0264 18.4623 13.6874 18.4216C16.4386 18.3889 18.929 17.2713 20.8443 15.313C21.9258 14.1223 22.7385 12.8566 23.1727 11.2896C22.6501 11.6705 22.1253 12.0483 21.5983 12.4232C21.2917 12.6426 21.0064 12.8674 20.6642 13.0538C20.3212 13.2407 19.9159 13.0637 19.7399 12.7308C19.6321 12.5269 19.7386 12.1287 19.9234 11.9784C20.2204 11.7367 20.5451 11.5134 20.8618 11.288L22.372 10.2147C23.0189 9.75549 23.6958 9.2389 24.3816 8.84082C24.4655 8.79211 24.7301 8.83579 24.8205 8.87576C25.244 9.06291 25.2366 9.59525 25.3249 9.98057C25.391 10.3075 25.4501 10.6403 25.5132 10.9681L25.9183 13.074C26 13.4993 26.2317 14.3897 26.1173 14.8172C26.031 15.1398 25.4683 15.2925 25.2013 15.1156C25.1247 15.0648 25.0017 15.0014 24.9563 14.9001C24.7186 14.3244 24.6779 13.6405 24.5413 13.0347C24.4666 12.7031 24.4368 12.4232 24.328 12.1029C24.2205 12.3637 24.141 12.6276 24.0213 12.9031C23.5454 14.0084 22.8965 15.0308 22.0988 15.9319C20.0272 18.2869 17.2347 19.5627 14.1255 19.7628Z"
        fill="#292929"
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

interface HeaderProps {
  darkTheme?: boolean;
}

export default function Header({ darkTheme = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string, hash?: string) => {
    setMenuOpen(false);
    if (hash) {
      if (location.pathname === path) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`${path}#${hash}`);
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Apartments", path: "/apartments" },
    { label: "Amenities", path: "/", hash: "amenities" },
    { label: "Location", path: "/location" },
    { label: "How to Apply", path: "/", hash: "how-it-works" },
    { label: "Gallery", path: "/", hash: "gallery" },
    { label: "FAQ", path: "/", hash: "faq" },
  ];

  return (
    <header className={`header ${darkTheme ? "is-dark" : ""}`}>
      <div className="wrapper_header">
        <div className="grid_header">
          {/* Logo */}
          <div className="logo_box">
            <Link to="/" className="logo w-inline-block" onClick={() => window.scrollTo(0, 0)}>
              <div>21OAKS</div>
            </Link>
          </div>

          {/* Fullscreen Drawer Navigation */}
          {menuOpen && (
            <div className="menu_fs" style={{ display: "block" }}>
              <div className="grid_menu_mobile">
                {navLinks.map((item) => (
                  <div
                    key={item.label}
                    onClick={() => handleNavClick(item.path, item.hash)}
                    className="mobile_link w-inline-block"
                    style={{ cursor: "pointer" }}
                  >
                    <div>{item.label}</div>
                  </div>
                ))}
              </div>
              <div
                onClick={() => handleNavClick("/", "contact")}
                className="contact_button w-inline-block"
                style={{ cursor: "pointer" }}
              >
                <div>Contact</div>
              </div>
            </div>
          )}

          {/* Center Menu & Schedule a Tour Button */}
          <div className="menu">
            <div className="flex_menu">
              <div
                className="menu_link"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: "pointer" }}
              >
                <div className="hamburger">
                  <div className="line_one" style={menuOpen ? { transform: "rotate(45deg) translate(2px, 2px)" } : {}}></div>
                  <div className="line_two" style={menuOpen ? { transform: "rotate(-45deg) translate(2px, -2px)" } : {}}></div>
                </div>
                <div className="menu_txt close_txt" style={{ display: menuOpen ? "block" : "none" }}>
                  Close
                </div>
                <div className="menu_txt open_txt" style={{ display: menuOpen ? "none" : "block" }}>
                  Menu
                </div>
              </div>

              <a
                href="https://calendly.com/propertyjs/21-oaks-25"
                target="_blank"
                rel="noreferrer"
                className="header_button w-inline-block"
              >
                <div>Schedule a Tour</div>
              </a>
            </div>
          </div>

          {/* Apply Now Button & Mobile Header Navigation Button */}
          <div className="apply_button">
            <div
              className="mobile_header_toggle only_mobile"
              onClick={() => setMenuOpen(!menuOpen)}
              role="button"
              aria-label="Navigation Menu"
            >
              <div className="hamburger">
                <div className="line_one" style={menuOpen ? { transform: "rotate(45deg) translate(2px, 2px)" } : {}}></div>
                <div className="line_two" style={menuOpen ? { transform: "rotate(-45deg) translate(2px, -2px)" } : {}}></div>
              </div>
              <span className="mobile_header_toggle_txt">{menuOpen ? "Close" : "Menu"}</span>
            </div>

            <WebflowButton
              text="Apply Now"
              href="https://calendly.com/propertyjs/21-oaks-25"
              target="_blank"
              className="webflow-main-apply"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
