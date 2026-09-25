import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FooterIllustration from "./FooterIllustration";
import { WebflowButton } from "./Header";
import { prefetchRoute } from "../lib/prefetch";

interface FooterProps {
  hidePreFooterCta?: boolean;
}

export default function Footer({ hidePreFooterCta = false }: FooterProps) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopy = (text: string, msg: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(msg);
      setTimeout(() => setCopyFeedback(null), 2500);
    });
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (path: string, hash?: string) => {
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

  return (
    <>
      {/* PRE-FOOTER CTA SECTION */}
      {!hidePreFooterCta && (
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
        </section>
      )}

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
                  <span
                    onClick={() => handleNavClick("/apartments")}
                    onMouseEnter={() => prefetchRoute("/apartments")}
                    onTouchStart={() => prefetchRoute("/apartments")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    Apartments
                  </span>
                  <span onClick={() => handleNavClick("/", "amenities")} className="link_f" style={{ cursor: "pointer" }}>
                    Amenities
                  </span>
                  <span
                    onClick={() => handleNavClick("/location")}
                    onMouseEnter={() => prefetchRoute("/location")}
                    onTouchStart={() => prefetchRoute("/location")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    Location
                  </span>
                  <span
                    onClick={() => handleNavClick("/gallery")}
                    onMouseEnter={() => prefetchRoute("/gallery")}
                    onTouchStart={() => prefetchRoute("/gallery")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    Gallery
                  </span>
                  <span
                    onClick={() => handleNavClick("/how-to-apply")}
                    onMouseEnter={() => prefetchRoute("/how-to-apply")}
                    onTouchStart={() => prefetchRoute("/how-to-apply")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    How to apply
                  </span>
                  <span
                    onClick={() => handleNavClick("/faq")}
                    onMouseEnter={() => prefetchRoute("/faq")}
                    onTouchStart={() => prefetchRoute("/faq")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    FAQ
                  </span>
                  <span
                    onClick={() => handleNavClick("/contact")}
                    onMouseEnter={() => prefetchRoute("/contact")}
                    onTouchStart={() => prefetchRoute("/contact")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    Contact
                  </span>
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
    </>
  );
}
