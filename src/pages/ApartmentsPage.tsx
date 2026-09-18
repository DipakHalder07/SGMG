import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header, { ArrowIcon } from "../components/Header";
import Footer from "../components/Footer";
import ApartmentLightboxModal from "../components/ApartmentLightboxModal";
import {
  APARTMENTS_DATA,
  ApartmentUnit,
  TESTIMONIALS_DATA,
  APARTMENT_FAQS,
} from "../data/apartmentsData";

export default function ApartmentsPage() {
  const navigate = useNavigate();

  // Filters state
  const [selectedType, setSelectedType] = useState<"All" | "General" | "Premium">("All");
  const [selectedBeds, setSelectedBeds] = useState<number | null>(null); // null = all, 3, 4
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(865);
  const [selectedMoveIn, setSelectedMoveIn] = useState<"Now" | "Later" | "All">("All");

  // Active Lightbox Modal state
  const [activeModalUnit, setActiveModalUnit] = useState<ApartmentUnit | null>(null);

  // Card slide indices for multiple photos in card
  const [cardPhotoIndices, setCardPhotoIndices] = useState<Record<string, number>>({});

  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ open index state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter logic
  const filteredApartments = useMemo(() => {
    return APARTMENTS_DATA.filter((apt) => {
      // Type filter
      if (selectedType !== "All" && apt.type !== selectedType) {
        return false;
      }
      // Bedrooms filter
      if (selectedBeds !== null && apt.bedrooms !== selectedBeds) {
        return false;
      }
      // Price range
      if (apt.price < minPrice || apt.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [selectedType, selectedBeds, minPrice, maxPrice]);

  const handleCardPrevPhoto = (aptId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => {
      const cur = prev[aptId] || 0;
      return { ...prev, [aptId]: cur === 0 ? total - 1 : cur - 1 };
    });
  };

  const handleCardNextPhoto = (aptId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => {
      const cur = prev[aptId] || 0;
      return { ...prev, [aptId]: cur === total - 1 ? 0 : cur + 1 };
    });
  };

  return (
    <div className="page-wrapper apartments-page-view">
      <Header />

      <main className="apartments-page-main">
        {/* Title Section */}
        <section className="apartments-header-section">
          <div className="apartments-title-container">
            <h1 className="apartments-main-heading">
              Apartments<br />
              near <span className="underline-squiggle">USC</span>
            </h1>
          </div>
        </section>

        {/* Content Section: Sidebar Filters + Cards Grid */}
        <section className="apartments-content-section">
          <div className="apartments-layout-grid">
            {/* Filter Sidebar */}
            <aside className="apartments-filter-sidebar">
              {/* Type Filter */}
              <div className="filter-group">
                <label className="filter-label">Type</label>
                <div className="filter-button-row">
                  {(["All", "General", "Premium"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`filter-pill-btn ${selectedType === type ? "is-active" : ""}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div className="filter-group">
                <label className="filter-label">Bedrooms</label>
                <div className="filter-button-row">
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedBeds === null ? "is-active" : ""}`}
                    onClick={() => setSelectedBeds(null)}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedBeds === 3 ? "is-active" : ""}`}
                    onClick={() => setSelectedBeds(3)}
                  >
                    3BR
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedBeds === 4 ? "is-active" : ""}`}
                    onClick={() => setSelectedBeds(4)}
                  >
                    4BR
                  </button>
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <label className="filter-label">Price</label>
                <div className="filter-price-inputs">
                  <div className="price-input-box">
                    <span className="price-currency">$</span>
                    <input
                      type="number"
                      value={minPrice}
                      min={0}
                      max={maxPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="price-input"
                    />
                  </div>
                  <span className="price-separator">-</span>
                  <div className="price-input-box">
                    <span className="price-currency">$</span>
                    <input
                      type="number"
                      value={maxPrice}
                      min={minPrice}
                      max={1200}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="price-input"
                    />
                  </div>
                </div>

                <div className="filter-range-wrap">
                  <input
                    type="range"
                    min={0}
                    max={865}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="filter-slider"
                  />
                  <div className="filter-range-labels">
                    <span>$0</span>
                    <span>$865</span>
                  </div>
                </div>
              </div>

              {/* Move-in Filter */}
              <div className="filter-group">
                <label className="filter-label">Move-in</label>
                <div className="filter-button-row">
                  {(["All", "Now", "Later"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`filter-pill-btn ${selectedMoveIn === m ? "is-active" : ""}`}
                      onClick={() => setSelectedMoveIn(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Apartments Grid */}
            <div className="apartments-grid-container">
              {filteredApartments.length === 0 ? (
                <div className="no-apartments-found">
                  <h3>No apartments found</h3>
                  <p>Try adjusting your price range or bedroom filters.</p>
                  <button
                    className="filter-pill-btn is-active"
                    onClick={() => {
                      setSelectedType("All");
                      setSelectedBeds(null);
                      setMinPrice(0);
                      setMaxPrice(865);
                      setSelectedMoveIn("All");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="apartments-cards-grid">
                  {filteredApartments.map((apart) => {
                    const photos = apart.gallery.slice(0, 5);
                    const photoIdx = cardPhotoIndices[apart.id] || 0;
                    const currentImg = photos[photoIdx] || apart.coverImage;

                    return (
                      <div className="apartment-listing-card" key={apart.id}>
                        {/* Image Carousel */}
                        <div
                          className="apartment-card-image-wrap"
                          onClick={() => navigate(`/apartments-cards/${apart.id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          {/* Availability Badge */}
                          <div className="card-badge-available">
                            <span className="badge-green-dot" />
                            <span>{apart.status}</span>
                          </div>

                          {/* Spec Pills Bottom Left */}
                          <div className="card-specs-overlay">
                            <div className="spec-pill">
                              <img src="/assets/icons/bed-icon.png" alt="" className="spec-icon" />
                              <span>{apart.beds}</span>
                            </div>
                            <div className="spec-pill">
                              <img src="/assets/icons/bath-icon.png" alt="" className="spec-icon" />
                              <span>{apart.baths}</span>
                            </div>
                            <div className="spec-pill">
                              <img src="/assets/icons/ft-icon.png" alt="" className="spec-icon" />
                              <span>{apart.sqft} ft²</span>
                            </div>
                          </div>

                          {/* Photo Carousel Dots */}
                          {photos.length > 1 && (
                            <div className="card-dots-overlay">
                              {photos.map((_, dotIdx) => (
                                <span
                                  key={dotIdx}
                                  className={`card-dot ${dotIdx === photoIdx ? "is-active" : ""}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCardPhotoIndices((prev) => ({ ...prev, [apart.id]: dotIdx }));
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          {/* Hover Nav Chevrons */}
                          {photos.length > 1 && (
                            <>
                              <button
                                className="card-nav-arrow is-prev"
                                onClick={(e) => handleCardPrevPhoto(apart.id, photos.length, e)}
                                aria-label="Previous photo"
                              >
                                ‹
                              </button>
                              <button
                                className="card-nav-arrow is-next"
                                onClick={(e) => handleCardNextPhoto(apart.id, photos.length, e)}
                                aria-label="Next photo"
                              >
                                ›
                              </button>
                            </>
                          )}

                          <img
                            src={currentImg}
                            alt={apart.name}
                            className="apartment-card-img"
                            loading="lazy"
                          />
                        </div>

                        {/* Card Info */}
                        <div className="apartment-card-content">
                          <div className="apartment-card-header-row">
                            <Link to={`/apartments-cards/${apart.id}`} className="apartment-card-title">
                              {apart.name}
                            </Link>
                            <div className="apartment-card-price-wrap">
                              <span className="price-currency-icon">$</span>
                              <span className="price-amount">{apart.priceFormatted}</span>
                              <span className="price-period">/month</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="apartment-card-buttons-row">
                            <button
                              type="button"
                              className="explore-details-button"
                              onClick={() => setActiveModalUnit(apart)}
                            >
                              Explore Details
                            </button>

                            <Link
                              to={`/apartments-cards/${apart.id}`}
                              className="apartment-card-arrow-link"
                              aria-label={`View full details of ${apart.name}`}
                            >
                              <div className="arrow_icon">
                                <ArrowIcon />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="apartments-testimonials-section">
          <div className="testimonials-container">
            <h2 className="testimonials-heading">
              Real student<br />
              <span className="underline-squiggle-testimonials">experiences</span>
            </h2>

            <div className="testimonials-content-wrap">
              {/* Left Avatars Column */}
              <div className="testimonials-avatars-col">
                {TESTIMONIALS_DATA.map((item, idx) => (
                  <div
                    key={item.author}
                    className={`testimonial-avatar-item ${idx === activeTestimonial ? "is-active" : ""}`}
                    onClick={() => setActiveTestimonial(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={item.photo} alt={item.author} className="avatar-img" />
                    {idx === activeTestimonial && <span className="avatar-name">{item.author}</span>}
                  </div>
                ))}
              </div>

              {/* Right Quote Column */}
              <div className="testimonials-quote-col">
                <blockquote className="testimonial-quote-text">
                  {TESTIMONIALS_DATA[activeTestimonial].quote}
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
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
      <ApartmentLightboxModal
        unit={activeModalUnit}
        onClose={() => setActiveModalUnit(null)}
      />
    </div>
  );
}
