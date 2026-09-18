import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header, { ArrowIcon, WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import ApartmentLightboxModal from "../components/ApartmentLightboxModal";
import { APARTMENTS_DATA, ApartmentUnit, APARTMENT_FAQS } from "../data/apartmentsData";

export default function ApartmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find apartment by slug/id (or default to D1)
  const unit = APARTMENTS_DATA.find((a) => a.id === slug) || APARTMENTS_DATA[0];

  // Sticky card one-time fees collapse state
  const [feesOpen, setFeesOpen] = useState(true);

  // Amenities tab state
  const [activeAmenityTab, setActiveAmenityTab] = useState<"interior" | "features" | "community">("interior");

  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // FAQ open index state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!unit) {
    return (
      <div className="page-wrapper">
        <Header />
        <div style={{ padding: "120px 20px", textAlign: "center" }}>
          <h2>Apartment not found</h2>
          <Link to="/apartments" className="filter-pill-btn is-active" style={{ display: "inline-block", marginTop: "20px" }}>
            Back to Apartments
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper apartment-detail-view">
      <Header />

      <main className="detail-page-main">
        {/* Top Hero Section */}
        <section className="detail-hero-section">
          {/* Main Large Image */}
          <div
            className="detail-hero-image-wrap"
            onClick={() => setLightboxIndex(0)}
            style={{ cursor: "zoom-in" }}
          >
            <img src={unit.coverImage} alt={unit.name} className="detail-hero-img" />
          </div>

          {/* Overlay Left Content */}
          <div className="detail-hero-left-content">
            <h1 className="detail-hero-title">{unit.name}</h1>
            <div className="detail-hero-specs">
              <span className="spec-badge">
                <img src="/assets/icons/bed-icon.png" alt="" className="spec-icon" />
                {unit.beds}
              </span>
              <span className="spec-badge">
                <img src="/assets/icons/bath-icon.png" alt="" className="spec-icon" />
                {unit.baths}
              </span>
              <span className="spec-badge">
                <img src="/assets/icons/ft-icon.png" alt="" className="spec-icon" />
                {unit.sqft} ft²
              </span>
            </div>

            <div className="detail-hero-about">
              <h4 className="about-label">About the property</h4>
              <p className="about-text">{unit.aboutText}</p>
            </div>
          </div>

          {/* Floating Sticky Action Card (Desktop and Mobile) */}
          <aside className="detail-sticky-action-card">
            <div className="action-card-header">
              <div className="action-card-name-price">
                <span className="card-unit-name">{unit.name}</span>
                <span className="card-unit-price">
                  <span className="curr-sym">$</span> {unit.priceFormatted}
                </span>
              </div>
              <button
                type="button"
                className="fees-toggle-arrow"
                onClick={() => setFeesOpen(!feesOpen)}
                aria-label="Toggle fees breakdown"
              >
                {feesOpen ? "▲" : "▼"}
              </button>
            </div>

            {feesOpen && (
              <div className="action-card-fees-breakdown">
                <div className="fee-row-heading">One time fees</div>
                <div className="fee-row">
                  <span>Application fee per person</span>
                  <span className="fee-val">{unit.fees.application}</span>
                </div>
                <div className="fee-row">
                  <span>Admin fee per person</span>
                  <span className="fee-val">{unit.fees.admin}</span>
                </div>
              </div>
            )}

            <div className="action-card-buttons">
              <a
                href="https://calendly.com/propertyjs/21-oaks-25"
                target="_blank"
                rel="noreferrer"
                className="action-apply-button"
              >
                Apply Now
              </a>
              <a
                href="https://calendly.com/propertyjs/21-oaks-25"
                target="_blank"
                rel="noreferrer"
                className="action-tour-button"
              >
                Schedule a Tour
              </a>
            </div>
          </aside>
        </section>

        {/* Two-Column Split Body */}
        <section className="detail-split-section">
          <div className="detail-split-container">
            {/* Left Column: Details, Narrative, Amenities Tabs */}
            <div className="detail-split-left-col">
              {/* Apartment Details Feature Grid */}
              <div className="detail-features-block">
                <h2 className="detail-section-heading">
                  Apartment<br />
                  Details
                </h2>

                <div className="features-grid-2col">
                  <div className="feature-item">
                    <div className="feature-icon-box">📦</div>
                    <div className="feature-item-text">
                      <div className="feature-title">Furnished & Ready</div>
                      <div className="feature-subtitle">Everything is in place from day one.</div>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon-box">🛌</div>
                    <div className="feature-item-text">
                      <div className="feature-title">Private Bedrooms</div>
                      <div className="feature-subtitle">A quiet space to relax and recharge.</div>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon-box">🎓</div>
                    <div className="feature-item-text">
                      <div className="feature-title">Student-Focused Layouts</div>
                      <div className="feature-subtitle">Designed to balance privacy, comfort, and shared living.</div>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon-box">👥</div>
                    <div className="feature-item-text">
                      <div className="feature-title">Roommate Friendly</div>
                      <div className="feature-subtitle">Designed to make shared living feel easy and comfortable.</div>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon-box">⭐</div>
                    <div className="feature-item-text">
                      <div className="feature-title">Premium Options</div>
                      <div className="feature-subtitle">Enhanced finishes and added comfort.</div>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon-box">🍳</div>
                    <div className="feature-item-text">
                      <div className="feature-title">Kitchen & Laundry</div>
                      <div className="feature-subtitle">Designed for everyday living.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* A Balanced Living Layout Narrative */}
              <div className="detail-story-block">
                <h2 className="detail-section-heading">{unit.storyTitle}</h2>
                <p className="detail-story-text">{unit.storyDesc}</p>
              </div>

              {/* Amenities Section with Tabs */}
              <div className="detail-amenities-block">
                <h2 className="detail-section-heading">Amenities</h2>
                <p className="amenities-subtext">What's Included</p>

                <div className="amenities-tab-row">
                  <button
                    type="button"
                    className={`amenity-tab-btn ${activeAmenityTab === "interior" ? "is-active" : ""}`}
                    onClick={() => setActiveAmenityTab("interior")}
                  >
                    Interior
                  </button>
                  <button
                    type="button"
                    className={`amenity-tab-btn ${activeAmenityTab === "features" ? "is-active" : ""}`}
                    onClick={() => setActiveAmenityTab("features")}
                  >
                    Features
                  </button>
                  <button
                    type="button"
                    className={`amenity-tab-btn ${activeAmenityTab === "community" ? "is-active" : ""}`}
                    onClick={() => setActiveAmenityTab("community")}
                  >
                    Community Spaces
                  </button>
                </div>

                {/* Tab 1: Interior */}
                {activeAmenityTab === "interior" && (
                  <div className="amenity-tab-content">
                    <div className="amenity-category-group">
                      <h4 className="amenity-category-title">Kitchen</h4>
                      <div className="amenity-category-items">
                        {unit.amenities.kitchen.map((item, idx) => (
                          <div key={idx} className="amenity-list-entry">
                            <span className="amenity-entry-icon">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="amenity-category-group">
                      <h4 className="amenity-category-title">Living Room</h4>
                      <div className="amenity-category-items">
                        {unit.amenities.livingRoom.map((item, idx) => (
                          <div key={idx} className="amenity-list-entry">
                            <span className="amenity-entry-icon">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="amenity-category-group">
                      <h4 className="amenity-category-title">Bedroom</h4>
                      <div className="amenity-category-items">
                        {unit.amenities.bedroom.map((item, idx) => (
                          <div key={idx} className="amenity-list-entry">
                            <span className="amenity-entry-icon">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Features */}
                {activeAmenityTab === "features" && (
                  <div className="amenity-tab-content">
                    <div className="amenity-category-group">
                      <h4 className="amenity-category-title">Smart Living & Essentials</h4>
                      <div className="amenity-category-items">
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>High-Speed Fiber Wi-Fi Included</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>Electronic Keyless Entry Locks</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>In-Unit Full Washer & Dryer</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>Central Heating & Air Conditioning</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>Energy-Efficient Double Glazed Windows</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Community Spaces */}
                {activeAmenityTab === "community" && (
                  <div className="amenity-tab-content">
                    <div className="amenity-category-group">
                      <h4 className="amenity-category-title">Shared Community Highlights</h4>
                      <div className="amenity-category-items">
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>Resort-Style Swimming Pool & Sundeck</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>Outdoor Grilling Courtyard & Social Lounge</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>24/7 Modern Fitness & Cardio Center</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>Quiet Study Lounges & Meeting Pods</div>
                        <div className="amenity-list-entry"><span className="amenity-entry-icon">✓</span>Dedicated USC Shuttle Bus Service</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Stacked High-Resolution Photo Gallery */}
            <div className="detail-split-right-col">
              <div className="detail-stacked-gallery">
                {unit.gallery.map((photoUrl, idx) => (
                  <div
                    key={idx}
                    className="detail-gallery-photo-card"
                    onClick={() => setLightboxIndex(idx)}
                    style={{ cursor: "zoom-in" }}
                  >
                    <img src={photoUrl} alt={`${unit.name} interior ${idx + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Just Outside Your Door (Amenities Showcase) */}
        <section className="detail-amenities-showcase-section">
          <div className="amenities-showcase-container">
            <h2 className="showcase-heading">
              Just outside<br />
              <span className="underline-squiggle">your door</span>
            </h2>

            <div className="amenities-cards-row">
              {[
                { title: "Grilling Courtyard", desc: "Host easy evenings with friends in the outdoor social zone.", img: "/assets/amenities/amenity-1.avif" },
                { title: "Resort-Style Pool", desc: "Unwind, cool off, and recharge between classes.", img: "/assets/amenities/amenity-2.avif" },
                { title: "Study Spaces", desc: "Quiet corners built for deep focus and productive days.", img: "/assets/amenities/amenity-3.avif" },
                { title: "Fitness Center", desc: "Train on your schedule with modern cardio and strength equipment.", img: "/assets/amenities/amenity-4.avif" },
                { title: "Campus Shuttle", desc: "Fast, reliable rides that keep your day moving.", img: "/assets/amenities/amenity-5.avif" },
              ].map((item, idx) => (
                <div key={idx} className="amenity-showcase-card">
                  <div className="amenity-card-img-wrap">
                    <img src={item.img} alt={item.title} />
                    <div className="amenity-card-overlay">
                      <h4 className="amenity-card-title">{item.title}</h4>
                      <p className="amenity-card-desc">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pet-Friendly Section */}
        <section className="detail-pets-section">
          <div className="pets-container">
            <div className="pets-text-wrap">
              <h2 className="pets-heading">
                For You.<br />
                <span className="underline-squiggle">For Them.</span>
              </h2>
              <p className="pets-body-text">
                A pet-friendly living environment designed to support everyday life together, where comfort, routine, and space extend naturally to your pet. From quiet moments of rest to daily movement and shared routines, the space remains open, calm, and easy to adapt — allowing both of you to feel completely at home.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="apartments-faq-section">
          <div className="apartments-faq-container">
            <div className="faq-split-left">
              <div className="faq-left-sticky">
                <p className="faq-prompt-text">Didn’t find what you were looking for?</p>
                <div className="faq-explore-btn-row">
                  <a
                    href="https://calendly.com/propertyjs/21-oaks-25"
                    target="_blank"
                    rel="noreferrer"
                    className="faq-explore-btn"
                  >
                    Explore FAQ
                  </a>
                  <a
                    href="https://calendly.com/propertyjs/21-oaks-25"
                    target="_blank"
                    rel="noreferrer"
                    className="faq-arrow-link"
                  >
                    <div className="arrow_icon">
                      <ArrowIcon />
                    </div>
                  </a>
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
                      className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}
                    >
                      <div
                        className="faq-accordion-header"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="faq-question-title">{faq.q}</span>
                        <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                      </div>
                      {isOpen && (
                        <div className="faq-accordion-content">
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <ApartmentLightboxModal
          unit={unit}
          initialPhotoIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
