import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header, { ArrowIcon, WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import ApartmentLightboxModal from "../components/ApartmentLightboxModal";
import ApartmentCardSlider from "../components/ApartmentCardSlider";
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
  const [selectedBeds, setSelectedBeds] = useState<number | null>(null); // null = all, 3, 4
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(865);
  const [selectedMoveIn, setSelectedMoveIn] = useState<"Now" | "Later" | "All">("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Active Lightbox Modal state
  const [activeModalUnit, setActiveModalUnit] = useState<ApartmentUnit | null>(null);

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


  return (
    <div className="page-wrapper apartments-page-view">
      <Header />

      <main className="apartments-page-main">
        {/* Main Section */}
        <div className="wrapper_general apartments_gen">
          <div className="heading_aparts">
            <h1 className="h1 black spec_amenities">
              Apartments<br />
              near <span data-scribble="2" className="scribble-wrap scribble-visible">USC</span>
            </h1>
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
                          className="clear_btn w-inline-block"
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
                          {([3, 4] as const).map((b) => (
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
                            value={minPrice.toFixed(2)}
                            placeholder="$0.00"
                            readOnly
                          />
                          <div className="dash_field">-</div>
                          <input
                            className="fs-rangeslider_input helper w-input is-list-active"
                            type="text"
                            value={maxPrice.toFixed(2)}
                            placeholder="$865.00"
                            readOnly
                          />
                        </div>
                        <div className="fs-rangeslider_track helper" style={{ position: "relative" }}>
                          <div
                            className="fs-rangeslider_fill helper"
                            style={{
                              position: "absolute",
                              left: "0px",
                              width: `${Math.min(100, Math.max(0, (maxPrice / 865) * 100))}%`
                            }}
                          />
                          <input
                            type="range"
                            min="0"
                            max="865"
                            step="5"
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
                              $<span className="fs-rangeslider_handle-span helper">0</span>
                            </div>
                          </div>
                          <div
                            className="fs-rangeslider_handle helper"
                            style={{
                              position: "absolute",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              left: `${Math.min(100, Math.max(0, (maxPrice / 865) * 100))}%`
                            }}
                          >
                            <div className="fs-rangeslider_handle-value">
                              $<span className="fs-rangeslider_handle-span helper">{maxPrice}</span>
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
                        setMaxPrice(865);
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
                  {filteredApartments.map((apart) => {
                    const photos = apart.gallery && apart.gallery.length > 0 ? apart.gallery : [apart.coverImage];

                    return (
                      <div role="listitem" className="apartment_item w-dyn-item" key={apart.id}>
                        <ApartmentCardSlider
                          photos={photos}
                          apartId={apart.id}
                          apartName={apart.name}
                          status={apart.status}
                          beds={apart.beds}
                          baths={apart.baths}
                          sqft={apart.sqft}
                        />

                        {/* Content Below Image */}
                        <div className="content_apart">
                          <div className="apart_title_line">
                            <div className="apartment_title">
                              <Link to={`/apartments-cards/${apart.id}`} className="apart_title">
                                {apart.name}
                              </Link>
                            </div>
                            <div className="price_box">
                              <div className="icon_price">
                                <img src="/assets/icons/price-icon.png" alt="$" className="image" />
                              </div>
                              <div className="price_txt">{apart.priceFormatted}</div>
                              <div className="mnth_txt">/month</div>
                            </div>
                          </div>

                          <div className="explore_button">
                            <Link to={`/apartments-cards/${apart.id}`} className="button w-inline-block">
                              <div className="icon_box is-left">
                                <div className="arrow_icon">
                                  <div className="arrow-icon w-embed">
                                    <ArrowIcon />
                                  </div>
                                </div>
                              </div>
                              <div className="text_box apartments_button">
                                <div>Explore Details</div>
                              </div>
                              <div className="icon_box is-right">
                                <div className="arrow_icon">
                                  <div className="arrow-icon w-embed">
                                    <ArrowIcon />
                                  </div>
                                </div>
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

          {/* Mobile Sticky Floating Filter Button */}
          <div className="fix_filter">
            <button
              type="button"
              className="filter_button"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <div className="icon_filter">
                <img src="/assets/icons/filter-icon.png" loading="lazy" alt="Filter icon" className="image" />
              </div>
              <div>All Filters</div>
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQS SECTION */}
        <section data-section="light" className="faqs" id="faq">
          <div className="wrapper_general basic">
            <div className="faq_heading">
              <h2 className="h2 smaller">
                Frequently asked<br />questions
              </h2>
            </div>

            <div className="sides_faq">
              <div className="short_left">
                <div className="caption_faq">
                  <div>Everything you might want to know before moving in.</div>
                </div>
                <div className="bottom_faq">
                  <div className="p_gen black caption_cta">
                    Didn’t find what you were<br />looking for?
                  </div>
                  <div>
                    <WebflowButton
                      text="Explore FAQ"
                      href="/faq"
                    />
                  </div>
                </div>
              </div>

              <div className="faq_general">
                <div className="collection_faq w-dyn-list">
                  <div role="list" className="w-dyn-items">
                    {APARTMENT_FAQS.map((faq, index) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div
                          role="listitem"
                          key={faq.q}
                          className={`accordion-item w-dyn-item ${isOpen ? "is-open" : ""}`}
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        >
                          <div className="accordion_head-wrapper">
                            <div className="item_head">
                              <div className="title_wrapper">
                                <div className="item_title">{faq.q}</div>
                                <div className="icon_wrapper" />
                              </div>
                            </div>
                          </div>

                          <div className="item_content-wrapper">
                            <div className="accordion_paragraph">
                              <div className="item_paragraph w-richtext">
                                <p>{faq.a}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
