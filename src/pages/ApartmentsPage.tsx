import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header, { ArrowIcon } from "../components/Header";
import Footer from "../components/Footer";
import ApartmentLightboxModal from "../components/ApartmentLightboxModal";
import ApartmentCard from "../components/ApartmentCard";
import PillButton from "../components/PillButton";
import FaqSection from "../components/FaqSection";
import TestimonialsSection from "../components/TestimonialsSection";
import {
  APARTMENTS_DATA,
  ApartmentUnit,
  APARTMENT_FAQS,
} from "../data/apartmentsData";

export default function ApartmentsPage() {
  const navigate = useNavigate();

  // Filters state
  const [selectedType, setSelectedType] = useState<"All" | "General" | "Premium">("All");
  const [selectedBeds, setSelectedBeds] = useState<number | null>(null); // null = all, 2, 3, 4
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(95);
  const [selectedMoveIn, setSelectedMoveIn] = useState<"Now" | "Later" | "All">("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Active Lightbox Modal state
  const [activeModalUnit, setActiveModalUnit] = useState<ApartmentUnit | null>(null);

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

  const isAnyFilterActive =
    selectedType !== "All" ||
    selectedBeds !== null ||
    minPrice > 0 ||
    maxPrice < 95;

  return (
    <div className="page-wrapper apartments-page-view">
      <Header />

      <main className="apartments-page-main" data-section="light">
        {/* Main Section */}
        <section data-section="light">
          <div className="wrapper_general apartments_gen">
          <div className="heading_aparts">
            <div className="heading_aparts_row">
              <h1 className="h1 black spec_amenities">
                Residences<br />
                in <span data-scribble="2" className="scribble-wrap scribble-visible">Siliguri</span>
              </h1>
              <button
                type="button"
                className="heading_filter_btn"
                onClick={() => setMobileFiltersOpen(true)}
                aria-label="Filter apartments"
                title="Filters"
              >
                <div className="icon_filter">
                  <img src="/assets/icons/filter-icon.png" loading="lazy" alt="Filter icon" className="image" />
                </div>
                {isAnyFilterActive && <span className="filter_indicator_dot" />}
              </button>
            </div>
          </div>

          <div className="apartments_sides">
            {/* Filter Sidebar */}
            <div className={`filters ${mobileFiltersOpen ? "is-open" : ""}`}>
              <div className="filter_heading">
                <div>Refine your<br />search</div>
                <div
                  className="close_button"
                  onClick={() => setMobileFiltersOpen(false)}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/assets/icons/close-icon.svg" loading="lazy" alt="Close" className="image" />
                </div>
              </div>

              <div className="filter_form w-form">
                <form className="form_filters" onSubmit={(e) => e.preventDefault()}>
                  <div className="filters_flex">
                    {/* Type */}
                    <div className="filters_box">
                      <div className="filter_title"><div>Type</div></div>
                      <div className="filters_wrap">
                        <button
                          type="button"
                          className={`clear_btn w-inline-block ${selectedType === "All" ? "is-active" : ""}`}
                          onClick={() => setSelectedType("All")}
                        >
                          <div>All</div>
                        </button>
                        <div className="filters_type">
                          {(["General", "Premium"] as const).map((t) => (
                            <label
                              key={t}
                              className={`checkbox w-radio ${selectedType === t ? "is-active" : ""}`}
                              onClick={() => setSelectedType(selectedType === t ? "All" : t)}
                              style={{ cursor: "pointer" }}
                            >
                              <input
                                type="radio"
                                className="radio_circle"
                                checked={selectedType === t}
                                onChange={() => {}}
                              />
                              <span className="radio_txt w-form-label">{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div className="filters_box">
                      <div className="filter_title"><div>Bedrooms</div></div>
                      <div className="filters_wrap">
                        <div className="filters_type">
                          {([2, 3, 4] as const).map((b) => (
                            <label
                              key={b}
                              className={`checkbox ${selectedBeds === b ? "is-active" : ""}`}
                              onClick={() => setSelectedBeds(selectedBeds === b ? null : b)}
                              style={{ cursor: "pointer" }}
                            >
                              <span className="checkbox_txt w-form-label">{b}BR</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="filters_box">
                      <div className="filter_title"><div>Price</div></div>
                      <div className="fs-rangeslider_wrapper helper">
                        <div className="fs-message">
                          <input
                            className="fs-rangeslider_input helper w-input is-list-active"
                            type="text"
                            value={`₹${minPrice.toFixed(2)} L`}
                            placeholder="₹0.00 L"
                            readOnly
                          />
                          <div className="dash_field">-</div>
                          <input
                            className="fs-rangeslider_input helper w-input is-list-active"
                            type="text"
                            value={`₹${maxPrice.toFixed(2)} L`}
                            placeholder="₹95.00 L"
                            readOnly
                          />
                        </div>
                        <div className="fs-rangeslider_track helper" style={{ position: "relative" }}>
                          <div
                            className="fs-rangeslider_fill helper"
                            style={{
                              position: "absolute",
                              left: "0px",
                              width: `${Math.min(100, Math.max(0, (maxPrice / 95) * 100))}%`
                            }}
                          />
                          <input
                            type="range"
                            min="0"
                            max="95"
                            step="1"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="fs-rangeslider_native_range"
                            aria-label="Filter Price"
                          />
                          <div
                            className="fs-rangeslider_handle helper"
                            style={{
                              position: "absolute",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              left: "0px"
                            }}
                          >
                            <div className="fs-rangeslider_handle-value">
                              ₹<span className="fs-rangeslider_handle-span helper">0</span>
                            </div>
                          </div>
                          <div
                            className="fs-rangeslider_handle helper"
                            style={{
                              position: "absolute",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              left: `${Math.min(100, Math.max(0, (maxPrice / 95) * 100))}%`
                            }}
                          >
                            <div className="fs-rangeslider_handle-value">
                              ₹<span className="fs-rangeslider_handle-span helper">{maxPrice}</span> L
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Move-in */}
                    <div className="filters_box last_filter">
                      <div className="filter_title"><div>Move-in</div></div>
                      <div className="filters_wrap">
                        <div className="filters_type">
                          {(["Now", "Later"] as const).map((m) => (
                            <label
                              key={m}
                              className={`checkbox ${selectedMoveIn === m ? "is-active" : ""}`}
                              onClick={() => setSelectedMoveIn(selectedMoveIn === m ? "All" : m)}
                              style={{ cursor: "pointer" }}
                            >
                              <span className="checkbox_txt w-form-label">{m}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="buttons_filters">
                    <button
                      type="button"
                      className="show_variants w-button"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Show Variants
                    </button>
                    <button
                      type="button"
                      className="clear_button w-inline-block"
                      onClick={() => {
                        setSelectedType("All");
                        setSelectedBeds(null);
                        setMinPrice(0);
                        setMaxPrice(95);
                        setSelectedMoveIn("All");
                        setMobileFiltersOpen(false);
                      }}
                    >
                      <div>Reset All</div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Apartments Box & Grid */}
            <div className="apartments_box">
              {filteredApartments.length === 0 ? (
                <div className="no-apartments-found">
                  <h3>No apartments found</h3>
                  <p>Try adjusting your price range or bedroom filters.</p>
                  <button
                    type="button"
                    className="clear_btn is-active"
                    onClick={() => {
                      setSelectedType("All");
                      setSelectedBeds(null);
                      setMinPrice(0);
                      setMaxPrice(865);
                      setSelectedMoveIn("All");
                    }}
                  >
                    <div>Reset Filters</div>
                  </button>
                </div>
              ) : (
                <div className="apartments_grid">
                  {filteredApartments.map((apart) => (
                    <ApartmentCard key={apart.id} apartment={apart} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQS SECTION */}
        <FaqSection
          faqs={APARTMENT_FAQS}
          caption="Everything you might want to know before moving in."
        />
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
