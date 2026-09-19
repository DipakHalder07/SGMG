import React, { useState, useEffect, useRef, useCallback } from "react";
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
      "Siliguri’s premier shopping, dining & cinema destination located on Sevoke Road, offering top international brands, multiplex entertainment, food courts, and daily excitement.",
    image: "/assets/locations/vega-circle-mall.jpg",
    alt: "Vega Circle Mall on Sevoke Road in Siliguri",
    walk: "5 min walk",
    bike: "2 min bike",
    drive: "1 min drive",
  },
  {
    id: "city-centre",
    title: "City Centre Mall, Siliguri",
    description:
      "A flagship lifestyle landmark in Uttorayon Matigara with grand plazas, premier fashion retailers, gourmet restaurants, and family entertainment zones.",
    image: "/assets/locations/city-centre.jpg",
    alt: "City Centre Mall in Siliguri",
    walk: "35 min walk",
    bike: "15 min bike",
    drive: "12 min drive",
  },
  {
    id: "cosmos-mall",
    title: "Cosmos Mall & Sevoke Road Hub",
    description:
      "A bustling shopping and retail center on 2nd Mile Sevoke Road with hypermarkets, PVR Cinemas, popular cafés, and vibrant weekend gatherings.",
    image: "/assets/locations/cosmos-mall.jpg",
    alt: "Cosmos Mall on Sevoke Road Siliguri",
    walk: "8 min walk",
    bike: "3 min bike",
    drive: "2 min drive",
  },
];

interface MapPlace {
  id: string;
  name: string;
  category: string;
  coords: [number, number]; // [lng, lat]
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
    coords: [88.4385, 26.7465],
    address: "3rd Mile, Sevoke Road, Siliguri, West Bengal 734008",
    hours: "10:30 AM – 9:30 PM",
    image: "/assets/locations/thumbs/vega-circle-mall.jpg",
    walk: "5 min walk",
    bike: "2 min bike",
    drive: "1 min drive",
  },
  {
    id: "cosmos-mall",
    name: "Cosmos Mall",
    category: "Retail & Dining",
    coords: [88.4339, 26.7386],
    address: "Sevoke Road, 2nd Mile, Siliguri, West Bengal 734001",
    hours: "10:00 AM – 10:00 PM",
    image: "/assets/locations/thumbs/cosmos-mall.jpg",
    walk: "8 min walk",
    bike: "3 min bike",
    drive: "2 min drive",
  },
  {
    id: "city-centre-mall",
    name: "City Centre Siliguri",
    category: "Lifestyle Mall",
    coords: [88.3887, 26.7152],
    address: "Uttorayon Township, Matigara, Siliguri, West Bengal 734010",
    hours: "11:00 AM – 9:30 PM",
    image: "/assets/locations/thumbs/city-centre.jpg",
    walk: "35 min walk",
    bike: "15 min bike",
    drive: "12 min drive",
  },
  {
    id: "hong-kong-market",
    name: "Hong Kong Market",
    category: "Bazaar & Street Food",
    coords: [88.4285, 26.7176],
    address: "Hill Cart Road / 10th Ward, Siliguri, West Bengal 734001",
    hours: "10:00 AM – 9:00 PM",
    image: "/assets/locations/thumbs/hong-kong-market.jpg",
    walk: "20 min walk",
    bike: "8 min bike",
    drive: "6 min drive",
  },
  {
    id: "nbu-campus",
    name: "North Bengal University",
    category: "University",
    coords: [88.3533, 26.7093],
    address: "Raja Rammohunpur, Siliguri, West Bengal 734013",
    hours: "Campus grounds open",
    image: "/assets/locations/thumbs/nbu-campus.jpg",
    walk: "45 min walk",
    bike: "18 min bike",
    drive: "15 min drive",
  },
  {
    id: "savin-kingdom",
    name: "Savin Kingdom Amusement Park",
    category: "Entertainment & Rides",
    coords: [88.4045, 26.7335],
    address: "Dagapur, Siliguri, West Bengal 734003",
    hours: "10:30 AM – 7:30 PM",
    image: "/assets/locations/thumbs/savin-kingdom.jpg",
    walk: "30 min walk",
    bike: "12 min bike",
    drive: "10 min drive",
  },
];

const SGMG_LOCATION = {
  name: "SGMG Siliguri",
  coords: [88.4350, 26.7420] as [number, number],
  address: "Sevoke Road, Siliguri, West Bengal 734008, India",
  hours: "Site Office: 9:00 AM – 7:00 PM",
};

const LOCATION_FAQS = [
  {
    q: "How close is SGMG to Vega Circle Mall and Cosmos Mall?",
    a: "Vega Circle Mall is just a 5-minute walk (1-minute drive) along Sevoke Road, and Cosmos Mall is only 8 minutes away. You have world-class shopping, cinemas, restaurants, and hypermarkets practically at your doorstep.",
  },
  {
    q: "How is the connectivity to NJP Railway Station and Bagdogra Airport?",
    a: "New Jalpaiguri (NJP) Railway Station is approximately 20–25 minutes away via Eastern Bypass / Sevoke Road, and Bagdogra International Airport (IXB) is easily reachable within 30–35 minutes via NH-27/NH-31.",
  },
  {
    q: "What healthcare and educational facilities are nearby in Siliguri?",
    a: "Leading hospitals like Medica North Bengal Clinic, Anandaloke Hospital, and Neotia Getwel Healthcare are within a 10–15 minute radius. Renowned schools and universities like Delhi Public School, Don Bosco, and North Bengal University are conveniently accessible.",
  },
  {
    q: "Is public transport easily available along Sevoke Road?",
    a: "Yes. Auto-rickshaws, city e-rickshaws (totos), taxis, and app-based cabs operate continuously along Sevoke Road 24/7, making commuting across Siliguri effortless.",
  },
  {
    q: "How do I schedule a visit to the SGMG site in Siliguri?",
    a: "You can click “Schedule a Tour” on the website or contact our Siliguri site office directly. Our team is available 7 days a week from 9:00 AM to 7:00 PM for private walkthroughs.",
  },
];

const MAPBOX_TOKEN =
  ((import.meta as any).env?.VITE_MAPBOX_TOKEN as string) ||
  (typeof atob !== "undefined"
    ? atob("cGsuZXlKMUlqb2ljM1prYm1WemN5SXNJbUVpT2lKamJUUnBiamxrWnpBd05XeGlNbWx6WW1RMmVYcG5ObUpxSW4wLkl3MG9zTkJIZzBaRk9HdDd1b1ZwRnc=")
    : "");
const MAP_STYLE = "mapbox://styles/svdness/cmo8wd30r001p01qwa1jtgq5a";

// Static map images for instantaneous rendering & fallback
const DESKTOP_STATIC_MAP = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+E8CEFF(88.4385,26.7465),pin-s+E8CEFF(88.4339,26.7386),pin-s+E8CEFF(88.3887,26.7152),pin-s+E8CEFF(88.4285,26.7176),pin-s+E8CEFF(88.3533,26.7093),pin-s+E8CEFF(88.4045,26.7335),pin-l+E8CEFF(88.4350,26.7420)/88.4200,26.7300,12.2,0/1200x900@2x?access_token=${MAPBOX_TOKEN}`;

const MOBILE_STATIC_MAP = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l+E8CEFF(88.4350,26.7420)/88.4350,26.7420,13.5,0/800x1000@2x?access_token=${MAPBOX_TOKEN}`;

const ICON_WALK =
  "https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b47_walk.png";
const ICON_BIKE =
  "https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b48_bike.png";
const ICON_DRIVE =
  "https://cdn.prod.website-files.com/6a31483f3822b51654193a68/6a31483f3822b51654193b49_drive.png";

export default function LocationPage() {
  // --- Hero Slideshow State ---
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const slideIntervalMs = 8000;
  const touchStartXRef = useRef<number | null>(null);

  // --- Map State ---
  const [activePlaceId, setActivePlaceId] = useState<string>("vega-circle-mall");
  const [isLiveMapLoaded, setIsLiveMapLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 991 : false
  );
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersMapRef = useRef<Map<string, any>>(new Map());
  const popupsMapRef = useRef<Map<string, any>>(new Map());
  const activePopupRef = useRef<any>(null);

  // --- FAQ State ---
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Touch Swipe for Hero Slideshow
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe left -> next slide
        goToSlide((activeSlide + 1) % HERO_SLIDES.length);
      } else {
        // Swipe right -> prev slide
        goToSlide((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }
    touchStartXRef.current = null;
  };

  // Test WebGL support
  const isWebGLSupported = useCallback(() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }, []);

  // -------------------------------------------------------------
  // Mapbox GL JS Loader & Initialization
  // -------------------------------------------------------------
  const initMapbox = useCallback(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;
    if (!isWebGLSupported()) {
      console.warn("WebGL not supported in this environment, using static map preview");
      return;
    }

    // Load Mapbox CSS if not present
    if (!document.querySelector('link[data-mapbox-css]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
      link.setAttribute("data-mapbox-css", "true");
      document.head.appendChild(link);
    }

    const startMap = (mapboxgl: any) => {
      if (mapInstanceRef.current) return;
      try {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        const mobileView = window.innerWidth <= 991;
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: MAP_STYLE,
          center: SGMG_LOCATION.coords,
          zoom: mobileView ? 13.8 : 14.5,
          pitch: 0,
          bearing: 0,
          antialias: false,
          fadeDuration: 0,
        });

        mapInstanceRef.current = map;
        map.scrollZoom.disable();

        map.on("load", () => {
          setIsLiveMapLoaded(true);
          map.resize();

          // 1. Home Pin (SGMG Siliguri)
          const homeEl = document.createElement("div");
          homeEl.style.width = "28px";
          homeEl.style.height = "28px";
          homeEl.style.borderRadius = "50%";
          homeEl.style.backgroundColor = "#E8CEFF";
          homeEl.style.border = "2px solid #fff";
          homeEl.style.display = "flex";
          homeEl.style.alignItems = "center";
          homeEl.style.justifyContent = "center";
          homeEl.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
          homeEl.style.cursor = "pointer";
          homeEl.innerHTML =
            '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="#121214" d="M12 3.2 3.5 10v10.2h6.2v-5.6h4.6v5.6h6.2V10L12 3.2zm7 15.5h-3.2v-5.6H8.2v5.6H5V10.7l7-5.6 7 5.6v8z"/></svg>';

          const homePopup = new mapboxgl.Popup({ offset: 20 }).setHTML(
            `<div class="popup-title">${SGMG_LOCATION.name}</div><div class="popup-address">${SGMG_LOCATION.address}</div><div class="popup-hours">${SGMG_LOCATION.hours}</div>`
          );

          new mapboxgl.Marker({ element: homeEl })
            .setLngLat(SGMG_LOCATION.coords)
            .addTo(map);

          homeEl.addEventListener("click", (e) => {
            e.stopPropagation();
            if (activePopupRef.current) activePopupRef.current.remove();
            homePopup.setLngLat(SGMG_LOCATION.coords).addTo(map);
            activePopupRef.current = homePopup;
          });

          // 2. POI Markers
          MAP_PLACES.forEach((place) => {
            const pinEl = document.createElement("div");
            pinEl.style.width = "27px";
            pinEl.style.height = "41px";
            pinEl.style.cursor = "pointer";
            pinEl.innerHTML = `
              <svg viewBox="0 0 27 41" width="27" height="41" aria-hidden="true">
                <defs>
                  <radialGradient id="pinShadow-${place.id}" cx="50%" cy="50%" r="50%">
                    <stop offset="10%" stop-color="rgba(0,0,0,0.35)"></stop>
                    <stop offset="100%" stop-color="rgba(0,0,0,0.05)"></stop>
                  </radialGradient>
                </defs>
                <ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#pinShadow-${place.id})"></ellipse>
                <path fill="#E8CEFF" fill-rule="evenodd" clip-rule="evenodd" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z M13.5,8A5.5,5.5 0 1,0 13.5,19A5.5,5.5 0 1,0 13.5,8Z"></path>
              </svg>
            `;

            const popupHtml = `
              <div class="popup-title">${place.name}</div>
              <div class="popup-address">${place.address}</div>
              <div class="popup-hours">${place.hours}</div>
              <div class="popup-meta">
                <div class="popup-meta-row"><img src="${ICON_WALK}" alt="" /><span>${place.walk}</span></div>
                <div class="popup-meta-row"><img src="${ICON_BIKE}" alt="" /><span>${place.bike}</span></div>
                <div class="popup-meta-row"><img src="${ICON_DRIVE}" alt="" /><span>${place.drive}</span></div>
              </div>
            `;

            const popup = new mapboxgl.Popup({ offset: 18 }).setHTML(popupHtml);

            const marker = new mapboxgl.Marker({ element: pinEl, anchor: "bottom" })
              .setLngLat(place.coords)
              .addTo(map);

            pinEl.addEventListener("click", (e) => {
              e.stopPropagation();
              if (activePopupRef.current) activePopupRef.current.remove();
              popup.setLngLat(place.coords).addTo(map);
              activePopupRef.current = popup;
              setActivePlaceId(place.id);
            });

            popup.on("close", () => {
              if (activePopupRef.current === popup) activePopupRef.current = null;
            });

            markersMapRef.current.set(place.id, marker);
            popupsMapRef.current.set(place.id, popup);
          });

          // Map Click to dismiss active popup
          map.on("click", (e: any) => {
            if (e.originalEvent.target.closest(".mapboxgl-marker")) return;
            if (activePopupRef.current) {
              activePopupRef.current.remove();
              activePopupRef.current = null;
            }
          });

          map.addControl(new mapboxgl.NavigationControl(), "top-right");
        });
      } catch (err) {
        console.warn("Mapbox Map creation failed:", err);
      }
    };

    if ((window as any).mapboxgl) {
      startMap((window as any).mapboxgl);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js";
    script.async = true;
    script.setAttribute("data-mapbox-js", "true");
    script.onload = () => {
      startMap((window as any).mapboxgl);
    };
    script.onerror = (e) => {
      console.warn("Failed to load Mapbox JS:", e);
    };
    document.head.appendChild(script);
  }, [isWebGLSupported]);

  // Handle Card Click -> Pan to Marker & Open Popup
  const handleCardClick = (place: MapPlace) => {
    setActivePlaceId(place.id);

    if (mapInstanceRef.current && isLiveMapLoaded) {
      const map = mapInstanceRef.current;
      map.easeTo({
        center: place.coords,
        zoom: 15.8,
        duration: 800,
      });

      const popup = popupsMapRef.current.get(place.id);
      if (popup) {
        if (activePopupRef.current) activePopupRef.current.remove();
        popup.setLngLat(place.coords).addTo(map);
        activePopupRef.current = popup;
      }
    }
  };

  // Attempt auto initialize Map on Desktop
  useEffect(() => {
    if (!isMobile && isWebGLSupported()) {
      initMapbox();
    }
  }, [isMobile, isWebGLSupported, initMapbox]);

  const handleExploreMapClick = () => {
    if (isWebGLSupported()) {
      initMapbox();
    } else {
      // If WebGL isn't supported, open Google Maps coordinates for Vega Circle Mall / SGMG in a new tab
      window.open("https://www.google.com/maps/search/?api=1&query=Vega+Circle+Mall+Sevoke+Road+Siliguri", "_blank");
    }
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main>
        {/* ==============================================================
            SECTION 1: HERO SLIDESHOW
            ============================================================== */}
        <main
          className="locations"
          data-section="hero"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div data-slideshow="wrap" className="wrapper_slider slideshow--ready">
            <h1 className="sr-only">Location</h1>

            {/* Thumbnail Navigation Row */}
            <div data-slideshow="nav" className="nav_cms">
              <div className="collection-list-wrapper-2 w-dyn-list">
                <div role="list" className="flex_nav w-dyn-items">
                  {HERO_SLIDES.map((slide, idx) => {
                    const isActive = idx === activeSlide;
                    return (
                      <div
                        key={slide.id}
                        data-slide-index={idx + 1}
                        data-slideshow="thumb"
                        role="listitem"
                        className={`nav_item w-dyn-item ${
                          isActive ? "is-active is--current" : ""
                        }`}
                        onClick={() => goToSlide(idx)}
                      >
                        <div className="overlay_active"></div>
                        <div className="nav_wrap">
                          <img
                            src={slide.image}
                            loading="lazy"
                            alt={slide.alt}
                            className="image"
                          />
                        </div>
                        <div
                          className="slideshow-thumb-progress"
                          aria-hidden="true"
                          style={{
                            height: isActive ? `${slideProgress}%` : "0%",
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Slides List */}
            <div className="gallery_slider w-dyn-list">
              <div role="list" className="gallery_slider_list w-dyn-items">
                {HERO_SLIDES.map((slide, idx) => {
                  const isCurrent = idx === activeSlide;
                  return (
                    <div
                      key={slide.id}
                      data-slide-index={idx + 1}
                      data-slideshow="slide"
                      role="listitem"
                      className={`gallery_img_slide w-dyn-item ${
                        isCurrent ? "is--current" : ""
                      }`}
                      data-index={idx}
                    >
                      <div className="gallery_slide_texts_wrap">
                        <div className="heading_h_carousel">
                          <h2 className="h2 locations_specific">{slide.title}</h2>
                        </div>
                        <div className="loc_description">
                          <div className="p_gen">{slide.description}</div>
                        </div>
                        <div className="list_times">
                          <div className="flex_location">
                            <div className="icon_location">
                              <img
                                src={ICON_WALK}
                                loading="lazy"
                                alt="Walk"
                                className="image"
                              />
                            </div>
                            <div className="caption_location">{slide.walk}</div>
                          </div>

                          <div className="flex_location">
                            <div className="icon_location">
                              <img
                                src={ICON_BIKE}
                                loading="lazy"
                                alt="Bike"
                                className="image"
                              />
                            </div>
                            <div className="caption_location">{slide.bike}</div>
                          </div>

                          <div className="flex_location">
                            <div className="icon_location">
                              <img
                                src={ICON_DRIVE}
                                loading="lazy"
                                alt="Drive"
                                className="image"
                              />
                            </div>
                            <div className="caption_location">{slide.drive}</div>
                          </div>
                        </div>
                      </div>
                      <div className="hero_bg_overlay"></div>
                      <img
                        src={slide.image}
                        loading="lazy"
                        data-slideshow="parallax"
                        alt={slide.title}
                        className="gallery_img-slide__inner"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        {/* ==============================================================
            SECTION 2: NEAR CAMPUS. NEAR EVERYTHING & MAP
            ============================================================== */}
        <section className="on_the_map">
          <div className="location_on_map">
            <div className="locations_headings">
              <h2 className="h2 white specific_map">
                Near{" "}
                <span
                  data-scribble="2"
                  className="scribble-wrap scribble-visible"
                >
                  Vega Mall
                </span>
                . Near Everything.
              </h2>
            </div>
          </div>

          <section data-section="dark" className="map_sec">
            {/* Desktop Left POI Cards */}
            <div className="map_cards" style={{ zIndex: 20 }}>
              <div className="w-dyn-list">
                <div role="list" className="cards_list w-dyn-items">
                  {MAP_PLACES.map((place) => {
                    const isActive = place.id === activePlaceId;
                    return (
                      <div
                        key={place.id}
                        data-location-id={place.name}
                        role="listitem"
                        className={`map_card w-dyn-item ${
                          isActive ? "is-active" : ""
                        }`}
                        onClick={() => handleCardClick(place)}
                      >
                        <div className="wrapper_map_card">
                          <div className="image_map_card">
                            <img
                              alt={place.name}
                              loading="lazy"
                              src={place.image}
                              className="image"
                            />
                          </div>
                          <div className="content_info">
                            <div className="sub_box">
                              <div className="subtitle_text">
                                {place.category}
                              </div>
                            </div>
                            <div className="title_map_card">{place.name}</div>
                          </div>
                        </div>
                        <div className="w-embed">
                          <input
                            type="hidden"
                            className="loc-lng"
                            value={place.coords[0]}
                          />
                          <input
                            type="hidden"
                            className="loc-lat"
                            value={place.coords[1]}
                          />
                          <input
                            type="hidden"
                            className="loc-address"
                            value={place.address}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div
              id="map"
              className="map_box"
              ref={mapContainerRef}
              style={{ position: "relative" }}
            >
              {/* Static Map Fallback / Mobile View */}
              {!isLiveMapLoaded && (
                <div className="map_static_wrap">
                  <img
                    className="map_static_img"
                    alt="Map of SGMG and Vega Mall location in Siliguri, West Bengal"
                    width={isMobile ? 800 : 1200}
                    height={isMobile ? 1000 : 900}
                    decoding="async"
                    src={isMobile ? MOBILE_STATIC_MAP : DESKTOP_STATIC_MAP}
                  />
                  {isMobile && (
                    <button
                      type="button"
                      className="map_load_btn"
                      onClick={handleExploreMapClick}
                    >
                      Tap to explore map
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        </section>

        {/* ==============================================================
            SECTION 3: DARK FREQUENTLY ASKED QUESTIONS
            ============================================================== */}
        <section className="faqs black">
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
                  <div className="p_gen black caption_cta white_ver">
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
