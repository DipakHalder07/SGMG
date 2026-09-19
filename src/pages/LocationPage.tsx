import React, { useState } from "react";
import Header, { ArrowIcon, WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import { LOCATION_HERO_SLIDES, LOCATION_PLACES, APARTMENT_FAQS } from "../data/apartmentsData";

export default function LocationPage() {
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [activePlaceId, setActivePlaceId] = useState<string>("soda-city");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const heroSlide = LOCATION_HERO_SLIDES[activeHeroIdx];
  const activePlace = LOCATION_PLACES.find((p) => p.id === activePlaceId) || LOCATION_PLACES[0];

  // Map pin coordinates percentage mapping relative to viewport
  const pinCoordinates: Record<string, { top: string; left: string; color: string }> = {
    "soda-city": { top: "28%", left: "48%", color: "#e07a5f" },
    "orangetheory": { top: "42%", left: "62%", color: "#f4a261" },
    "usc-campus": { top: "54%", left: "50%", color: "#e76f51" },
    "colonial-arena": { top: "46%", left: "36%", color: "#9c89b8" },
    "dipratos": { top: "68%", left: "74%", color: "#a8dadc" },
    "sc-museum": { top: "34%", left: "22%", color: "#457b9d" },
  };

  return (
    <div className="page-wrapper location-page-view">
      <Header />

      <main className="location-page-main">
        {/* Full-Bleed Interactive Hero Section */}
        <section className="location-hero-section">
          {/* Background image */}
          <div className="location-hero-bg">
            <img
              key={heroSlide.id}
              src={heroSlide.image}
              alt={heroSlide.name}
              className="location-hero-bg-img"
            />
            <div className="location-hero-gradient-overlay" />
          </div>

          {/* Hero Content Overlay */}
          <div className="location-hero-content-wrap">
            <div className="location-hero-text">
              <h1 className="location-hero-title">{heroSlide.name}</h1>
              <p className="location-hero-desc">{heroSlide.description}</p>

              {/* Commute Indicators */}
              <div className="location-hero-commute-row">
                <div className="commute-pill">
                  <img
                    src="https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b47_walk.png"
                    alt="Walk"
                    className="commute-icon"
                  />
                  <span>{heroSlide.commute.walk}</span>
                </div>

                <div className="commute-pill">
                  <img
                    src="https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b48_bike.png"
                    alt="Bike"
                    className="commute-icon"
                  />
                  <span>{heroSlide.commute.bike}</span>
                </div>

                <div className="commute-pill">
                  <img
                    src="https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b49_drive.png"
                    alt="Drive"
                    className="commute-icon"
                  />
                  <span>{heroSlide.commute.drive}</span>
                </div>
              </div>
            </div>

            {/* Bottom 3-item Thumbnail Picker */}
            <div className="location-hero-thumb-picker">
              {LOCATION_HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`location-thumb-item ${idx === activeHeroIdx ? "is-active" : ""}`}
                  onClick={() => setActiveHeroIdx(idx)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={slide.thumb} alt={slide.name} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section: Near Campus. Near Everything. */}
        <section className="location-map-section">
          <div className="map-section-heading-wrap">
            <h2 className="location-map-title">
              Near Campus.<br />
              <span className="underline-squiggle">Near Everything.</span>
            </h2>
          </div>

          <div className="map-interactive-container">
            {/* Left POI Cards Column */}
            <div className="map-poi-list-col">
              {LOCATION_PLACES.map((place) => {
                const isActive = place.id === activePlaceId;
                return (
                  <div
                    key={place.id}
                    className={`poi-place-card ${isActive ? "is-active" : ""}`}
                    onClick={() => setActivePlaceId(place.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="poi-place-thumb">
                      <img src={place.image} alt={place.name} />
                    </div>
                    <div className="poi-place-info">
                      <span className="poi-category">{place.category}</span>
                      <h4 className="poi-name">{place.name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Map Canvas Column */}
            <div className="map-display-col">
              <div
                className="map-surface"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: "transform 0.3s ease",
                }}
              >
                {/* Dark Carto/Street Map graphic background */}
                <div className="map-graphic-base">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 700"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="map-roads-svg"
                  >
                    {/* Dark Slate Base */}
                    <rect width="1000" height="700" fill="#20242c" />

                    {/* Parks & River Blocks */}
                    <path d="M 0 350 Q 250 320, 450 480 T 1000 520 L 1000 700 L 0 700 Z" fill="#263339" opacity="0.4" />
                    <rect x="420" y="140" width="160" height="120" rx="10" fill="#263b2f" opacity="0.6" />
                    <rect x="680" y="440" width="120" height="90" rx="8" fill="#263b2f" opacity="0.6" />
                    <rect x="180" y="320" width="90" height="70" rx="6" fill="#263b2f" opacity="0.6" />

                    {/* Major Arterial Roads & Streets */}
                    <path d="M 0 220 L 1000 220" stroke="#373e4a" strokeWidth="26" />
                    <path d="M 0 340 L 1000 340" stroke="#373e4a" strokeWidth="32" />
                    <path d="M 0 460 L 1000 460" stroke="#373e4a" strokeWidth="28" />
                    <path d="M 0 580 L 1000 580" stroke="#313742" strokeWidth="20" />

                    {/* Vertical Avenues */}
                    <path d="M 180 0 L 180 700" stroke="#373e4a" strokeWidth="22" />
                    <path d="M 320 0 L 320 700" stroke="#373e4a" strokeWidth="24" />
                    <path d="M 480 0 L 480 700" stroke="#373e4a" strokeWidth="36" />
                    <path d="M 640 0 L 640 700" stroke="#373e4a" strokeWidth="26" />
                    <path d="M 780 0 L 780 700" stroke="#373e4a" strokeWidth="20" />
                    <path d="M 910 0 L 910 700" stroke="#313742" strokeWidth="18" />

                    {/* Secondary Intersections */}
                    <path d="M 100 0 L 380 700" stroke="#2c333e" strokeWidth="12" />
                    <path d="M 400 0 L 750 700" stroke="#2c333e" strokeWidth="14" />
                    <path d="M 0 420 L 1000 280" stroke="#2c333e" strokeWidth="12" />

                    {/* Street Labels */}
                    <text x="24" y="215" fill="#697586" fontSize="13" fontWeight="600" letterSpacing="2">TAYLOR ST</text>
                    <text x="24" y="335" fill="#697586" fontSize="13" fontWeight="600" letterSpacing="2">HAMPTON ST</text>
                    <text x="24" y="455" fill="#697586" fontSize="13" fontWeight="600" letterSpacing="2">LADY ST</text>
                    <text x="24" y="575" fill="#697586" fontSize="13" fontWeight="600" letterSpacing="2">GERVAIS ST</text>

                    <text x="495" y="60" fill="#697586" fontSize="12" fontWeight="600" letterSpacing="2" transform="rotate(90, 495, 60)">MAIN ST</text>
                    <text x="655" y="60" fill="#697586" fontSize="12" fontWeight="600" letterSpacing="2" transform="rotate(90, 655, 60)">ASSEMBLY ST</text>

                    {/* 21OAKS Home Marker Anchor */}
                    <circle cx="560" cy="410" r="16" fill="#8f4df0" fillOpacity="0.3" />
                    <circle cx="560" cy="410" r="10" fill="#a46cf7" />
                    <circle cx="560" cy="410" r="5" fill="#ffffff" />
                    <rect x="520" y="375" width="80" height="22" rx="4" fill="#8f4df0" />
                    <text x="532" y="390" fill="#ffffff" fontSize="11" fontWeight="bold">21OAKS</text>
                  </svg>
                </div>

                {/* Custom Interactive Pins */}
                {LOCATION_PLACES.map((place) => {
                  const coords = pinCoordinates[place.id] || { top: "50%", left: "50%", color: "#9c89b8" };
                  const isActive = place.id === activePlaceId;

                  return (
                    <div
                      key={place.id}
                      className={`map-custom-pin ${isActive ? "is-active" : ""}`}
                      style={{
                        top: coords.top,
                        left: coords.left,
                      }}
                      onClick={() => setActivePlaceId(place.id)}
                    >
                      {/* Pulsing ring */}
                      {isActive && <div className="pin-pulse-ring" />}

                      {/* Pin Head */}
                      <div className="pin-marker-body" style={{ borderColor: coords.color }}>
                        <img src={place.image} alt={place.name} className="pin-thumb-img" />
                      </div>

                      {/* Tooltip Popup on active or hover */}
                      {isActive && (
                        <div className="pin-tooltip-bubble">
                          <span className="tooltip-cat">{place.category}</span>
                          <span className="tooltip-name">{place.name}</span>
                          <span className="tooltip-distance">{place.distance} • {place.note}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Map Zoom Controls */}
              <div className="map-controls-overlay">
                <button
                  type="button"
                  className="map-control-btn"
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2))}
                  aria-label="Zoom in map"
                >
                  +
                </button>
                <button
                  type="button"
                  className="map-control-btn"
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                  aria-label="Zoom out map"
                >
                  −
                </button>
                <button
                  type="button"
                  className="map-control-btn"
                  onClick={() => setZoomLevel(1)}
                  aria-label="Reset map zoom"
                  title="Reset zoom"
                >
                  ⊙
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dark FAQs Accordion */}
        <section className="apartments-faq-section is-dark-theme">
          <div className="apartments-faq-container">
            <div className="faq-split-left">
              <div className="faq-left-sticky">
                <h2 className="faq-main-heading white">
                  Frequently asked<br />
                  <span className="underline-squiggle">questions</span>
                </h2>
                <p className="faq-prompt-text light">Everything you might want to know before moving in.</p>
                <div style={{ marginTop: "1.25em" }}>
                  <WebflowButton
                    text="Explore FAQ"
                    href="https://calendly.com/propertyjs/21-oaks-25"
                    target="_blank"
                    className="black"
                  />
                </div>
              </div>
            </div>

            <div className="faq-split-right">
              <div className="faq-items-list">
                {APARTMENT_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`faq-accordion-item is-dark ${isOpen ? "is-open" : ""}`}
                    >
                      <div
                        className="faq-accordion-header"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="faq-question-title white">{faq.q}</span>
                        <span className="faq-toggle-icon white">{isOpen ? "−" : "+"}</span>
                      </div>
                      {isOpen && (
                        <div className="faq-accordion-content light-text">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
