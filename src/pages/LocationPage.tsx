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
    id: "usc",
    title: "University of South Carolina",
    description:
      "A major public research university known for its vibrant student life, SEC athletics, and nationally recognized academic programs in the heart of Columbia.",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6a3026da06299c7daba7_Slide%201.avif",
    alt: "University of South Carolina campus in Columbia, SC",
    walk: "14 min walk",
    bike: "5 min bike",
    drive: "5 min drive",
  },
  {
    id: "colonial-arena",
    title: "Colonial Life Arena",
    description:
      "Columbia’s premier entertainment venue hosting concerts, basketball games, live events, and major performances throughout the year.",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6ce946f82f1fc4ef6f6e_untitled_Topaz%20Image%20Upscale_2026-07-17_17-56-39%20(1).avif",
    alt: "Colonial Life Arena entertainment and athletics venue",
    walk: "9 min walk",
    bike: "3 min bike",
    drive: "4 min drive",
  },
  {
    id: "sc-museum",
    title: "South Carolina State Museum",
    description:
      "A large multidisciplinary museum featuring South Carolina history, art, science, technology, and immersive planetarium experiences.",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a5a6f0663982887dfcb990d_SCSM%20Museum.avif",
    alt: "South Carolina State Museum Columbia",
    walk: "10 min walk",
    bike: "3 min bike",
    drive: "4 min drive",
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
    id: "soda-city",
    name: "Soda City Market",
    category: "Groceries",
    coords: [-81.0349, 34.0007],
    address: "Main St, Columbia, SC 29201, United States",
    hours: "Saturdays 9am – 1pm",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8a_1%20(1).avif",
    walk: "12 min walk",
    bike: "4 min bike",
    drive: "4 min drive",
  },
  {
    id: "orangetheory",
    name: "Orangetheory Fitness",
    category: "Workouts",
    coords: [-81.0342, 34.0002],
    address: "1230 Main St, Columbia, SC 29201, United States",
    hours: "Open daily",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8b_2%20(1).avif",
    walk: "13 min walk",
    bike: "4 min bike",
    drive: "5 min drive",
  },
  {
    id: "usc-campus",
    name: "University of South Carolina",
    category: "Campus",
    coords: [-81.0286, 33.9987],
    address: "1522 Greene St, Columbia, SC 29208, United States",
    hours: "Campus grounds open",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8c_3%20(1).avif",
    walk: "14 min walk",
    bike: "5 min bike",
    drive: "5 min drive",
  },
  {
    id: "colonial-arena-map",
    name: "Colonial Life Arena",
    category: "Events",
    coords: [-81.036, 33.9948],
    address: "801 Lincoln St, Columbia, SC 29208, United States",
    hours: "Event dependent",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8d_4%20(1).avif",
    walk: "9 min walk",
    bike: "3 min bike",
    drive: "4 min drive",
  },
  {
    id: "dipratos",
    name: "DiPrato's",
    category: "Coffee & Bites",
    coords: [-81.029, 34.0072],
    address: "342 Pickens St, Columbia, SC 29205, United States",
    hours: "10am – 2pm",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8e_5%20(1).avif",
    walk: "16 min walk",
    bike: "6 min bike",
    drive: "6 min drive",
  },
  {
    id: "sc-museum-map",
    name: "South Carolina State Museum",
    category: "Culture",
    coords: [-81.0453, 33.9986],
    address: "301 Gervais St, Columbia, SC 29201, United States",
    hours: "10am – 5pm",
    image:
      "https://cdn.prod.website-files.com/6a31483f3822b51654193a69/6a31483f3822b51654193b8f_6.avif",
    walk: "10 min walk",
    bike: "3 min bike",
    drive: "4 min drive",
  },
];

const OAKS = {
  name: "21Oaks",
  coords: [-81.0373, 34.0008] as [number, number],
  address: "21 National Guard Rd, Columbia, SC 29201, United States",
  hours: "Open 24 hours",
};

const LOCATION_FAQS = [
  {
    q: "How do I apply for an apartment?",
    a: "Click “Apply Now,” choose your lease term and floor plan, and complete the online application. If applying with roommates, make sure everyone selects the same floor plan.",
  },
  {
    q: "What does by-the-bed leasing mean?",
    a: "Each resident signs an individual lease and is only responsible for their portion of the rent.",
  },
  {
    q: "What do I need to apply?",
    a: "To guarantee your bed space, you’ll need a signed lease agreement. Leases are generated once your application is complete and your screening has been approved.",
  },
  {
    q: "Do I need a guarantor?",
    a: "Most applicants require a guarantor to meet the income requirement and ensure monthly installment payments can be made. If you do not have a guarantor, you may self-qualify using your own income or apply through a third-party guarantor service. Contact the onsite team for more information.",
  },
  {
    q: "How long does approval take?",
    a: "Typically 24–48 hours, depending on how quickly your guarantor submits their application.",
  },
  {
    q: "Can I apply if I’m not a student?",
    a: "Yes. All applicants who meet the qualifying criteria are welcome.",
  },
  {
    q: "How is rent paid?",
    a: "Rent is divided into 12 equal installments and is due on the 1st of each month. Additional fees, such as pet rent or parking, are billed separately.",
  },
];

const MAPBOX_TOKEN =
  (import.meta.env.VITE_MAPBOX_TOKEN as string) ||
  (typeof atob !== "undefined"
    ? atob("cGsuZXlKMUlqb2ljM1prYm1WemN5SXNJbUVpT2lKamJUUnBiamxrWnpBd05XeGlNbWx6WW1RMmVYcG5ObUpxSW4wLkl3MG9zTkJIZzBaRk9HdDd1b1ZwRnc=")
    : "");
const MAP_STYLE = "mapbox://styles/svdness/cmo8wd30r001p01qwa1jtgq5a";

// Static map images for instantaneous rendering & fallback
const DESKTOP_STATIC_MAP = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+E8CEFF(-81.0349,34.0007),pin-s+E8CEFF(-81.0342,34.0002),pin-s+E8CEFF(-81.0286,33.9987),pin-s+E8CEFF(-81.036,33.9948),pin-s+E8CEFF(-81.029,34.0072),pin-s+E8CEFF(-81.0453,33.9986),pin-l+E8CEFF(-81.0373,34.0008)/-81.0373,34.0008,14,0/1200x900@2x?access_token=${MAPBOX_TOKEN}`;

const MOBILE_STATIC_MAP = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l+E8CEFF(-81.0373,34.0008)/-81.0373,34.0008,14,0/800x1000@2x?access_token=${MAPBOX_TOKEN}`;

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
  const [activePlaceId, setActivePlaceId] = useState<string>("soda-city");
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
          center: OAKS.coords,
          zoom: mobileView ? 14.4 : 15.2,
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

          // 1. Home Pin (21Oaks)
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
            `<div class="popup-title">${OAKS.name}</div><div class="popup-address">${OAKS.address}</div><div class="popup-hours">${OAKS.hours}</div>`
          );

          new mapboxgl.Marker({ element: homeEl })
            .setLngLat(OAKS.coords)
            .addTo(map);

          homeEl.addEventListener("click", (e) => {
            e.stopPropagation();
            if (activePopupRef.current) activePopupRef.current.remove();
            homePopup.setLngLat(OAKS.coords).addTo(map);
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
      // If WebGL isn't supported, open Google Maps coordinates for 21Oaks in a new tab
      window.open("https://www.google.com/maps/search/?api=1&query=34.0008,-81.0373", "_blank");
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
                  Campus
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
                    alt="Map of 21Oaks location in Columbia, SC"
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
