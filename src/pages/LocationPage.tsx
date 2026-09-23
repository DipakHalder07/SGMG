import React, { useState, useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../location.css";
import Header, { WebflowButton } from "../components/Header";
import Footer from "../components/Footer";

interface SlideData {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  walk: string;
  bike: string;
  drive: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: "vega-circle-mall",
    title: "Vega Circle Mall, Sevoke Road",
    description:
      "Siliguri’s premier retail, dining, and cinema destination on Sevoke Road, offering top international brands, multiplex entertainment, food courts, and daily excitement.",
    image: "/assets/locations/vega-circle-mall.jpg",
    alt: "Vega Circle Mall on Sevoke Road in Siliguri",
    walk: "2 min walk",
    bike: "1 min bike",
    drive: "1 min drive",
  },
  {
    id: "cosmos-mall",
    title: "Cosmos Mall & Sevoke Road Hub",
    description:
      "A bustling shopping and retail center on 2nd Mile Sevoke Road with hypermarkets, PVR Cinemas, popular cafés, and vibrant weekend gatherings just minutes from SGMG.",
    image: "/assets/locations/cosmos-mall.jpg",
    alt: "Cosmos Mall on Sevoke Road Siliguri",
    walk: "5 min walk",
    bike: "2 min bike",
    drive: "2 min drive",
  },
  {
    id: "city-centre",
    title: "City Centre Mall, Siliguri",
    description:
      "A flagship lifestyle landmark in Uttorayon Matigara with grand open-air plazas, premier fashion retailers, gourmet restaurants, and family entertainment zones.",
    image: "/assets/locations/city-centre.jpg",
    alt: "City Centre Mall in Siliguri",
    walk: "35 min walk",
    bike: "15 min bike",
    drive: "12 min drive",
  },
];

interface MapPlace {
  id: string;
  name: string;
  category: string;
  filterType: "malls" | "dining" | "transit";
  lat: number;
  lng: number;
  address: string;
  hours: string;
  image: string;
  walk: string;
  bike: string;
  drive: string;
}

const MAP_PLACES: MapPlace[] = [
  {
    id: "vega-circle-mall",
    name: "Vega Circle Mall",
    category: "Shopping & Movies",
    filterType: "malls",
    lat: 26.7465,
    lng: 88.4385,
    address: "3rd Mile, Sevoke Road, Siliguri, West Bengal 734008",
    hours: "10:30 AM – 9:30 PM Daily",
    image: "/assets/locations/thumbs/vega-circle-mall.jpg",
    walk: "2 min walk",
    bike: "1 min bike",
    drive: "1 min drive",
  },
  {
    id: "cosmos-mall",
    name: "Cosmos Mall",
    category: "Retail & Dining",
    filterType: "malls",
    lat: 26.7386,
    lng: 88.4339,
    address: "Sevoke Road, 2nd Mile, Siliguri, West Bengal 734001",
    hours: "10:00 AM – 10:00 PM Daily",
    image: "/assets/locations/thumbs/cosmos-mall.jpg",
    walk: "5 min walk",
    bike: "2 min bike",
    drive: "2 min drive",
  },
  {
    id: "city-centre-mall",
    name: "City Centre Siliguri",
    category: "Flagship Mall",
    filterType: "malls",
    lat: 26.7152,
    lng: 88.3887,
    address: "Uttorayon Township, Matigara, Siliguri, West Bengal 734010",
    hours: "11:00 AM – 9:30 PM Daily",
    image: "/assets/locations/thumbs/city-centre.jpg",
    walk: "35 min walk",
    bike: "15 min bike",
    drive: "12 min drive",
  },
  {
    id: "hong-kong-market",
    name: "Hong Kong Market",
    category: "Bazaar & Street Food",
    filterType: "dining",
    lat: 26.7176,
    lng: 88.4285,
    address: "Hill Cart Road / 10th Ward, Siliguri, West Bengal 734001",
    hours: "10:00 AM – 9:00 PM Daily",
    image: "/assets/locations/thumbs/hong-kong-market.jpg",
    walk: "20 min walk",
    bike: "8 min bike",
    drive: "6 min drive",
  },
  {
    id: "savin-kingdom",
    name: "Savin Kingdom Amusement Park",
    category: "Entertainment & Rides",
    filterType: "dining",
    lat: 26.7335,
    lng: 88.4045,
    address: "Dagapur, Siliguri, West Bengal 734003",
    hours: "10:30 AM – 7:30 PM Daily",
    image: "/assets/locations/thumbs/savin-kingdom.jpg",
    walk: "30 min walk",
    bike: "12 min bike",
    drive: "10 min drive",
  },
  {
    id: "nbu-campus",
    name: "North Bengal University",
    category: "University Campus",
    filterType: "transit",
    lat: 26.7093,
    lng: 88.3533,
    address: "Raja Rammohunpur, Siliguri, West Bengal 734013",
    hours: "Campus Grounds Open",
    image: "/assets/locations/thumbs/nbu-campus.jpg",
    walk: "45 min walk",
    bike: "18 min bike",
    drive: "15 min drive",
  },
];

const SGMG_LOCATION = {
  name: "SGMG Residences",
  lat: 26.744,
  lng: 88.4365,
  address: "Sevoke Road, Siliguri, West Bengal 734008, India",
  hours: "Site Office: 9:00 AM – 7:00 PM",
};

const LOCATION_FAQS = [
  {
    q: "How close is SGMG to Vega Circle Mall and Cosmos Mall?",
    a: "Vega Circle Mall is just a 2-minute walk (1-minute drive) along Sevoke Road, and Cosmos Mall is only 5 minutes away. You have world-class shopping, INOX/PVR multiplex cinemas, food courts, and hypermarkets right outside your door.",
  },
  {
    q: "How is the connectivity to NJP Railway Station and Bagdogra Airport?",
    a: "New Jalpaiguri (NJP) Railway Station is approximately 20 minutes away via Sevoke Road / Eastern Bypass, and Bagdogra International Airport (IXB) is easily reachable within 30 minutes via NH-27/NH-31.",
  },
  {
    q: "What healthcare and educational facilities are nearby in Siliguri?",
    a: "Leading hospitals like Medica North Bengal Clinic, Anandaloke Hospital, and Neotia Getwel Healthcare are within a 10–12 minute radius. Top institutions like Delhi Public School, Don Bosco, and North Bengal University are conveniently accessible.",
  },
  {
    q: "Is public transport easily available along Sevoke Road?",
    a: "Yes. Auto-rickshaws, eco e-rickshaws (totos), taxis, and app-based cabs (Uber & Ola) operate continuously along Sevoke Road 24/7, making commuting across Siliguri effortless.",
  },
  {
    q: "How do I schedule a visit to the SGMG site on Sevoke Road?",
    a: "You can click “Schedule a Tour” or contact our Siliguri sales gallery. Our team is available 7 days a week from 9:00 AM to 7:00 PM for private walkthroughs.",
  },
];

const ICON_WALK =
  "https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b47_walk.png";
const ICON_BIKE =
  "https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b48_bike.png";
const ICON_DRIVE =
  "https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b49_drive.png";

export default function LocationPage() {
  // Hero Slideshow State
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const slideIntervalMs = 7000;
  const touchStartXRef = useRef<number | null>(null);

  // Map Filter & Selected Place
  const [filterType, setFilterType] = useState<"all" | "malls" | "dining" | "transit">("all");
  const [activePlaceId, setActivePlaceId] = useState<string>("vega-circle-mall");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const routePolylineRef = useRef<L.Polyline | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Document title
  useEffect(() => {
    document.title = "Locations • Siliguri Mall • SGMG";
  }, []);

  // -------------------------------------------------------------
  // Header Mode Synchronization on Scroll
  // -------------------------------------------------------------
  useEffect(() => {
    // Initial header mode is hero
    document.body.classList.remove("is-light", "is-dark");
    document.body.classList.add("is-hero");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.75;
      if (scrollY > heroThreshold) {
        document.body.classList.remove("is-hero", "is-light");
        document.body.classList.add("is-dark");
      } else {
        document.body.classList.remove("is-dark", "is-light");
        document.body.classList.add("is-hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("is-hero", "is-dark");
    };
  }, []);

  // -------------------------------------------------------------
  // Hero Slideshow Timer & Progress
  // -------------------------------------------------------------
  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
    setSlideProgress(0);
  }, []);

  useEffect(() => {
    const stepMs = 50;
    const progressIncrement = (stepMs / slideIntervalMs) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide((activeSlide + 1) % HERO_SLIDES.length);
      } else {
        goToSlide((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }
    touchStartXRef.current = null;
  };

  // -------------------------------------------------------------
  // Leaflet Map Initialization & Interactive Behavior
  // -------------------------------------------------------------
  const selectPlace = useCallback(
    (place: MapPlace, shouldFly = true) => {
      setActivePlaceId(place.id);

      const map = mapInstanceRef.current;
      if (!map) return;

      // Smooth pan / fly to place coordinates with offset on desktop & mobile
      if (shouldFly) {
        const isDesktop = typeof window !== "undefined" && window.innerWidth > 991;
        const targetLng = isDesktop ? place.lng - 0.007 : place.lng;
        const targetLat = isDesktop ? place.lat : place.lat + 0.013;
        map.flyTo([targetLat, targetLng], isDesktop ? 14.8 : 14.0, {
          duration: 0.85,
          easeLinearity: 0.25,
        });
      }

      // Open Popup
      const marker = markersRef.current.get(place.id);
      if (marker) {
        marker.openPopup();
      }

      // Draw dashed route from SGMG to Destination
      if (routePolylineRef.current) {
        map.removeLayer(routePolylineRef.current);
      }

      const routeLine = L.polyline(
        [
          [SGMG_LOCATION.lat, SGMG_LOCATION.lng],
          [place.lat, place.lng],
        ],
        {
          color: "#9333ea",
          weight: 3.5,
          opacity: 0.85,
          dashArray: "6, 8",
        }
      ).addTo(map);

      routePolylineRef.current = routeLine;
    },
    []
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [SGMG_LOCATION.lat, SGMG_LOCATION.lng + 0.005],
      zoom: 14.5,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Custom Zoom Controls on Top-Right
    L.control.zoom({ position: "topright" }).addTo(map);

    // 1. Esri World Light Gray Base Layer (Clean luxury grayscale with zero watermark)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 16,
      }
    ).addTo(map);

    // 2. Esri World Light Gray Reference Labels Layer
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 16,
        pane: "shadowPane",
      }
    ).addTo(map);

    // 3. Add Home Marker (SGMG Siliguri)
    const homeIcon = L.divIcon({
      className: "home-marker-wrap",
      html: `
        <div class="home-marker-pulse" title="SGMG Residences">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path fill="#121214" d="M12 3.2 3.5 10v10.2h6.2v-5.6h4.6v5.6h6.2V10L12 3.2zm7 15.5h-3.2v-5.6H8.2v5.6H5V10.7l7-5.6 7 5.6v8z"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20],
    });

    const homePopupContent = `
      <div class="popup-title">${SGMG_LOCATION.name}</div>
      <div class="popup-address">${SGMG_LOCATION.address}</div>
      <div class="popup-hours">${SGMG_LOCATION.hours}</div>
    `;

    L.marker([SGMG_LOCATION.lat, SGMG_LOCATION.lng], { icon: homeIcon })
      .addTo(map)
      .bindPopup(homePopupContent, {
        autoPan: true,
        autoPanPadding: [35, 35],
      });

    // 4. Add POI Markers
    MAP_PLACES.forEach((place) => {
      const pinIcon = L.divIcon({
        className: "poi-marker-wrap",
        html: `
          <div class="poi-marker-pin" id="pin-${place.id}">
            <svg viewBox="0 0 27 41" width="27" height="41" aria-hidden="true">
              <defs>
                <radialGradient id="pinShadow-${place.id}" cx="50%" cy="50%" r="50%">
                  <stop offset="10%" stop-color="rgba(0,0,0,0.35)"></stop>
                  <stop offset="100%" stop-color="rgba(0,0,0,0.05)"></stop>
                </radialGradient>
              </defs>
              <ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#pinShadow-${place.id})"></ellipse>
              <path fill="#E8CEFF" stroke="#121214" stroke-width="1.2" fill-rule="evenodd" clip-rule="evenodd"
                d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z M13.5,8A5.5,5.5 0 1,0 13.5,19A5.5,5.5 0 1,0 13.5,8Z">
              </path>
            </svg>
          </div>
        `,
        iconSize: [27, 41],
        iconAnchor: [13.5, 41],
        popupAnchor: [0, -42],
      });

      const popupContent = `
        <div class="popup-title">${place.name}</div>
        <div class="popup-address">${place.address}</div>
        <div class="popup-hours">${place.hours}</div>
        <div class="popup-meta">
          <div class="popup-meta-row">
            <img src="${ICON_WALK}" alt="Walk" />
            <span>${place.walk}</span>
          </div>
          <div class="popup-meta-row">
            <img src="${ICON_BIKE}" alt="Bike" />
            <span>${place.bike}</span>
          </div>
          <div class="popup-meta-row">
            <img src="${ICON_DRIVE}" alt="Drive" />
            <span>${place.drive}</span>
          </div>
        </div>
        <a href="https://www.google.com/maps/dir/?api=1&origin=${SGMG_LOCATION.lat},${SGMG_LOCATION.lng}&destination=${place.lat},${place.lng}"
           target="_blank" rel="noopener noreferrer" class="popup-directions-link">
          Get Directions ↗
        </a>
      `;

      const marker = L.marker([place.lat, place.lng], { icon: pinIcon })
        .addTo(map)
        .bindPopup(popupContent, {
          autoPan: true,
          autoPanPaddingTopLeft: [15, 65],
          autoPanPaddingBottomRight: [15, 15],
          offset: [0, -38],
        });

      marker.on("click", () => {
        selectPlace(place, false);
      });

      markersRef.current.set(place.id, marker);
    });

    // Default select Vega Circle Mall
    const defaultPlace = MAP_PLACES[0];
    selectPlace(defaultPlace, false);

    // Invalidate size after layout completes
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    const handleWindowResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [selectPlace]);

  // Filtered places list
  const filteredPlaces = MAP_PLACES.filter((p) => {
    if (filterType === "all") return true;
    return p.filterType === filterType;
  });

  return (
    <div className="page-wrapper" style={{ backgroundColor: "#121214" }}>
      <Header />

      <main>
        {/* ==============================================================
            SECTION 1: HERO SLIDESHOW
            ============================================================== */}
        <section
          className="locations"
          data-section="hero"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div data-slideshow="wrap" className="wrapper_slider">
            <h1 className="sr-only">Siliguri Mall Location • SGMG</h1>

            {/* Bottom Thumbnail Navigation */}
            <div data-slideshow="nav" className="nav_cms">
              <div className="flex_nav">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`nav_item ${isActive ? "is-active" : ""}`}
                      onClick={() => goToSlide(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Jump to slide: ${slide.title}`}
                    >
                      <div className="nav_wrap">
                        <img src={slide.image} loading="lazy" alt={slide.alt} />
                      </div>
                      <div
                        className="slideshow-thumb-progress"
                        style={{
                          height: isActive ? `${slideProgress}%` : "0%",
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slides List with Cross-fade */}
            <div className="gallery_slider">
              <div className="gallery_slider_list">
                {HERO_SLIDES.map((slide, idx) => {
                  const isCurrent = idx === activeSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`gallery_img_slide ${isCurrent ? "is--current" : ""}`}
                    >
                      <div className="gallery_slide_texts_wrap">
                        <div className="heading_h_carousel">
                          <h2 className="h2 locations_specific">{slide.title}</h2>
                        </div>
                        <div className="loc_description">
                          <p className="p_gen">{slide.description}</p>
                        </div>

                        <div className="list_times">
                          <div className="flex_location">
                            <div className="icon_location">
                              <img src={ICON_WALK} loading="lazy" alt="Walk" />
                            </div>
                            <div className="caption_location">{slide.walk}</div>
                          </div>

                          <div className="flex_location">
                            <div className="icon_location">
                              <img src={ICON_BIKE} loading="lazy" alt="Bike" />
                            </div>
                            <div className="caption_location">{slide.bike}</div>
                          </div>

                          <div className="flex_location">
                            <div className="icon_location">
                              <img src={ICON_DRIVE} loading="lazy" alt="Drive" />
                            </div>
                            <div className="caption_location">{slide.drive}</div>
                          </div>
                        </div>
                      </div>

                      <div className="hero_bg_overlay"></div>
                      <img
                        src={slide.image}
                        loading={idx === 0 ? "eager" : "lazy"}
                        alt={slide.title}
                        className="gallery_img-slide__inner"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 2: NEAR SILIGURI MALL & INTERACTIVE MAP
            ============================================================== */}
        <section className="on_the_map" data-section="dark">
          <div className="location_on_map">
            <div className="locations_headings">
              <h2 className="h2 white specific_map">
                Near{" "}
                <span
                  data-scribble="2"
                  className="scribble-wrap scribble-visible"
                >
                  Siliguri Mall
                </span>
                . Near Everything.
              </h2>
            </div>
          </div>

          <div className="map_sec">
            {/* Left POI Cards Panel */}
            <div className="map_cards">
              {/* Category Filter Tabs */}
              <div className="map_tabs_bar">
                <button
                  type="button"
                  className={`map_tab_btn ${filterType === "all" ? "is-active" : ""}`}
                  onClick={() => setFilterType("all")}
                >
                  All Places
                </button>
                <button
                  type="button"
                  className={`map_tab_btn ${filterType === "malls" ? "is-active" : ""}`}
                  onClick={() => setFilterType("malls")}
                >
                  Malls & Retail
                </button>
                <button
                  type="button"
                  className={`map_tab_btn ${filterType === "dining" ? "is-active" : ""}`}
                  onClick={() => setFilterType("dining")}
                >
                  Dining & Leisure
                </button>
                <button
                  type="button"
                  className={`map_tab_btn ${filterType === "transit" ? "is-active" : ""}`}
                  onClick={() => setFilterType("transit")}
                >
                  Transit & Campus
                </button>
              </div>

              {/* Scrollable Cards List */}
              <div className="cards_list_scroll">
                {filteredPlaces.map((place) => {
                  const isActive = place.id === activePlaceId;
                  return (
                    <div
                      key={place.id}
                      className={`map_card ${isActive ? "is-active" : ""}`}
                      onClick={() => selectPlace(place, true)}
                    >
                      <div className="wrapper_map_card">
                        <div className="image_map_card">
                          <img
                            alt={place.name}
                            loading="lazy"
                            src={place.image}
                          />
                        </div>
                        <div className="content_info">
                          <div className="sub_box">
                            <span className="subtitle_text">{place.category}</span>
                            <span className="transit_pill_card">{place.walk}</span>
                          </div>
                          <h3 className="title_map_card">{place.name}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Leaflet Map Canvas */}
            <div
              id="map"
              className="map_box"
              ref={mapContainerRef}
            ></div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 3: FAQS SECTION (DARK)
            ============================================================== */}
        <section className="faqs black" data-section="dark">
          <div className="wrapper_general basic">
            <div className="faq_heading white_ver">
              <h2 className="h2 smaller">Frequently asked{"\n"}questions</h2>
            </div>
            <div className="sides_faq">
              <div className="short_left">
                <div className="caption_faq white_ver">
                  <div>Everything you might want to know before moving in.</div>
                </div>
                <div className="bottom_faq">
                  <div className="caption_cta white_ver">
                    Didn’t find what you were<br />looking for?
                  </div>
                  <div>
                    <WebflowButton text="Explore FAQ" href="/faq" />
                  </div>
                </div>
              </div>

              <div className="faq_general">
                <div className="w-dyn-list">
                  <div
                    role="list"
                    className="collection_faq white_ver w-dyn-items"
                  >
                    {LOCATION_FAQS.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div
                          key={idx}
                          role="listitem"
                          className={`accordion-item white_ver w-dyn-item ${
                            isOpen ? "is-open" : ""
                          }`}
                        >
                          <div
                            className="accordion_head-wrapper"
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="item_head">
                              <div className="title_wrapper">
                                <div className="item_title">{faq.q}</div>
                                <div className="icon_wrapper white_ver"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="item_content-wrapper"
                            style={{
                              maxHeight: isOpen ? "400px" : "0px",
                              opacity: isOpen ? 1 : 0,
                              transition:
                                "max-height 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.35s ease",
                            }}
                          >
                            <div className="accordion_paragraph">
                              <div
                                className="item_paragraph w-richtext"
                                style={{
                                  transform: isOpen
                                    ? "translate3d(0,0,0)"
                                    : "translate3d(0,20%,0)",
                                  transition:
                                    "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                                }}
                              >
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
    </div>
  );
}
