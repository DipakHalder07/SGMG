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
                      Your Gateway To An<br />
                      Elevated Lifestyle.
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
                      <img src="/images/sgmg-icon.svg" alt="SGMG Logo Icon" className="image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="fs_bg">
              <img src="/assets/image_cta.avif" alt="SGMG luxury residences lounge" className="image" />
            </div>
          </section>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrapper_footer">
          <div className="flex_f_top">
            <div className="caption_left">
              <Link to="/" onClick={handleScrollToTop} className="footer_logo_link" title="SGMG - Sushil Gangadhar Mittal Group">
                <img
                  src="/images/sgmg-logo-white.png"
                  alt="SGMG - Sushil Gangadhar Mittal Group"
                  className="footer_logo_img"
                />
              </Link>
              <div className="cap_footer">
                Tranquility and <span data-scribble="4" className="scribble-wrap scribble-visible">Living.</span>
              </div>

              {/* Other Ventures */}
              <div className="footer_ventures">
                <div className="title_footer">Other Ventures</div>
                <div className="ventures_logos_wrap">
                  <a
                    href="https://cosmospreschool.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venture_link venture_cosmos"
                    title="Cosmos Global Pre-School"
                  >
                    <img
                      src="/assets/ventures/cosmos-global.png"
                      alt="Cosmos Global Pre-School"
                      className="venture_logo_img venture_logo_cosmos"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://sgmg.in/inox/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venture_link venture_inox"
                    title="INOX Live the Movie"
                  >
                    <img
                      src="/assets/ventures/inox.png"
                      alt="INOX Live the Movie"
                      className="venture_logo_img venture_logo_inox"
                      loading="lazy"
                    />
                  </a>
                </div>
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
                    Residences
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
                    onClick={() => handleNavClick("/team")}
                    onMouseEnter={() => prefetchRoute("/team")}
                    onTouchStart={() => prefetchRoute("/team")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    Our Team
                  </span>
                  <span
                    onClick={() => handleNavClick("/careers")}
                    onMouseEnter={() => prefetchRoute("/careers")}
                    onTouchStart={() => prefetchRoute("/careers")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    Careers
                  </span>
                  <span
                    onClick={() => handleNavClick("/about")}
                    onMouseEnter={() => prefetchRoute("/about")}
                    onTouchStart={() => prefetchRoute("/about")}
                    className="link_f"
                    style={{ cursor: "pointer" }}
                  >
                    About
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
                    onClick={() => handleCopy("2nd Floor, Jeevandeep Tower, Siliguri, West Bengal", "Address Copied!")}
                  >
                    2nd Floor, Jeevandeep Tower<br />Siliguri, West Bengal
                  </div>
                  <div
                    className="link_f"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCopy("+91 97330 02244", "Phone Copied!")}
                  >
                    +91 97330 02244
                  </div>
                  <div
                    className="link_f"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCopy("sales@sgmg.in", "Email Copied!")}
                  >
                    sales@sgmg.in
                  </div>
                  {copyFeedback && (
                    <div style={{ color: "var(--logo-green, #a2cd3a)", fontSize: "11px", fontWeight: 600 }}>
                      ✓ {copyFeedback}
                    </div>
                  )}
                </div>
              </div>

              <div className="box_menu">
                <div className="title_footer">Office Hours</div>
                <div className="links_list">
                  <div className="link_f">Mon - Sat: 10:00 AM - 7:00 PM</div>
                  <div className="link_f">Sunday: 10:00 AM - 5:00 PM</div>
                  <div className="link_f">Site Visits: Available 7 Days</div>
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
              <a aria-label="Our Instagram" href="https://www.instagram.com/sgmgrealestate/" target="_blank" rel="noreferrer" className="social_link w-inline-block">
                <div className="social_icon ig" />
              </a>
              <a aria-label="Our Facebook" href="https://www.facebook.com/SGMGRealEstate" target="_blank" rel="noreferrer" className="social_link w-inline-block">
                <div className="social_icon fb" />
              </a>
            </div>
          </div>
        </div>

        {/* Lamp SVG interactive illustration */}
        <div className="ill_interactive">
          <FooterIllustration />
        </div>

        <div className="last_line ll_fs">
          <div className="last_txt">© Copyright 2026 by Sushil Gangadhar Mittal Group</div>
          <div className="web_dev_by">
            <span className="op_spec">Website by </span>
            <a href="https://digitalgrove.in" target="_blank" rel="noreferrer" className="spec_link">
              Dipak
            </a>
          </div>

        </div>
      </footer>
    </>
  );
}
