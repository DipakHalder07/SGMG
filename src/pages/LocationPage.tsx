import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../location.css";
import Header, { WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import PillButton from "../components/PillButton";

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
    image: "/assets/locations/modern-commercial-complex.jpg",
    alt: "Modern Commercial Retail & Shopping Complex on Sevoke Road in Siliguri",
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
    lat: 26.7465,
    lng: 88.4385,
    address: "3rd Mile, Sevoke Road, Siliguri, West Bengal 734008",
    hours: "10:30 AM – 9:30 PM Daily",
    image: "/assets/locations/thumbs/modern-commercial-complex.jpg",
    walk: "2 min walk",
    bike: "1 min bike",
    drive: "1 min drive",
  },
  {
    id: "cosmos-mall",
    name: "Cosmos Mall",
    category: "Retail & Dining",
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
    name: "Savin Kingdom",
    category: "Leisure & Nature Park",
    lat: 26.7328,
    lng: 88.4065,
    address: "Dagapur, Siliguri, West Bengal 734010",
    hours: "10:30 AM – 7:30 PM Daily",
    image: "/assets/locations/thumbs/savin-kingdom.jpg",
    walk: "40 min walk",
    bike: "18 min bike",
    drive: "12 min drive",
  },
];

const SGMG_LOCATION = {
  name: "SGMG Residences",
  lat: 26.744,
  lng: 88.4365,
  address: "Sevoke Road, Siliguri, West Bengal 734008, India",
  shortAddress: "Sevoke Road, Siliguri",
  hours: "Site Office: 9:00 AM – 7:00 PM",
};

const SGMG_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SGMG_LOCATION.lat},${SGMG_LOCATION.lng}`;

// Phones get the swipeable card strip over the map instead of the side panel
const MOBILE_QUERY = "(max-width: 767px)";
const isMobileViewport = () =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

// Keeps pins clear of the zoom buttons (top right) and the card strip that
// sits over the bottom of the map on mobile.
const mobileMapPadding = (cardStrip: HTMLElement | null): L.FitBoundsOptions => ({
  paddingTopLeft: [32, 64],
  paddingBottomRight: [56, (cardStrip?.offsetHeight ?? 0) + 16],
});

// Mobile cards only have room for one travel time: the walk when it's a
// short stroll, otherwise the drive.
const WALKABLE_MINUTES = 10;
const isWalkable = (place: MapPlace) => parseInt(place.walk, 10) <= WALKABLE_MINUTES;

const WALK_ICON_PATH =
  "M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7";
const CAR_ICON_PATH =
  "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z";

function TransitIcon({ path }: { path: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", marginRight: "3px", opacity: 0.75 }}
    >
      <path d={path} />
    </svg>
  );
}

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
  {
    q: "How do I apply for an apartment or reserve a residence?",
    a: "Click “Apply Now,” select your preferred floor plan and move-in timeline, and complete the digital application form. If applying together with family or partners, our dedicated advisors ensure seamless assistance throughout.",
  },
  {
    q: "What lifestyle amenities are included with residency at SGMG?",
    a: "Residents enjoy full access to our rooftop infinity swimming pool, fully equipped modern gymnasium, indoor games arena, landscaped party lawn, multi-purpose community hall, 24/7 power backup, and gated security.",
  },
];

const ICON_WALK = "/assets/location/walk.png";
const ICON_BIKE = "/assets/location/bike.png";
const ICON_DRIVE = "/assets/location/drive.png";

export default function LocationPage() {
  // Hero Slideshow Refs & State
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartXRef = useRef<number | null>(null);

  // Map Selected Place
  const [activePlaceId, setActivePlaceId] = useState<string>("vega-circle-mall");
  const activePlaceIdRef = useRef("vega-circle-mall");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const mapCardsRef = useRef<HTMLDivElement | null>(null);
  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardsScrollTargetRef = useRef<number | null>(null);

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
  // GSAP Hero Slideshow: Parallax Slide Transition
  // -------------------------------------------------------------
  const startSlideTimer = useCallback((slideIndex: number) => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    if (progressTweenRef.current) {
      progressTweenRef.current.kill();
      progressTweenRef.current = null;
    }

    // Reset progress heights
    progressRefs.current.forEach((bar, i) => {
      if (bar) gsap.set(bar, { height: "0%" });
    });

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;
    const autoplaySec = isMobile ? 7 : 10;
    const activeBar = progressRefs.current[slideIndex];

    if (activeBar) {
      progressTweenRef.current = gsap.fromTo(
        activeBar,
        { height: "0%" },
        {
          height: "100%",
          duration: autoplaySec,
          ease: "none",
        }
      );
    }

    autoplayTimerRef.current = setTimeout(() => {
      const nextIdx = (activeSlideRef.current + 1) % HERO_SLIDES.length;
      navigateToSlide(nextIdx, 1);
    }, autoplaySec * 1000);
  }, []);

  const navigateToSlide = useCallback(
    (nextIndex: number, direction: number = 1) => {
      if (isAnimatingRef.current) return;
      const current = activeSlideRef.current;
      if (nextIndex === current) return;

      isAnimatingRef.current = true;

      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      if (progressTweenRef.current) {
        progressTweenRef.current.kill();
        progressTweenRef.current = null;
      }
      progressRefs.current.forEach((bar) => {
        if (bar) gsap.set(bar, { height: "0%" });
      });

      const currentSlide = slideRefs.current[current];
      const upcomingSlide = slideRefs.current[nextIndex];
      const currentInner = innerRefs.current[current];
      const upcomingInner = innerRefs.current[nextIndex];

      if (!currentSlide || !upcomingSlide || !currentInner || !upcomingInner) {
        isAnimatingRef.current = false;
        setActiveSlide(nextIndex);
        activeSlideRef.current = nextIndex;
        startSlideTimer(nextIndex);
        return;
      }

      const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;
      const animDuration = isMobile ? 0.38 : 0.65;

      gsap.set(upcomingSlide, {
        zIndex: 10,
        visibility: "visible",
        opacity: 1,
        xPercent: direction * 100,
      });
      gsap.set(upcomingInner, {
        xPercent: -direction * 50,
      });
      gsap.set(currentSlide, {
        zIndex: 9,
        visibility: "visible",
        opacity: 1,
      });

      setActiveSlide(nextIndex);
      activeSlideRef.current = nextIndex;

      const tl = gsap.timeline({
        defaults: {
          duration: animDuration,
          ease: "power2.inOut",
        },
        onComplete: () => {
          gsap.set(currentSlide, {
            visibility: "hidden",
            opacity: 0,
            zIndex: 1,
            xPercent: 0,
          });
          gsap.set(upcomingSlide, {
            zIndex: 2,
            xPercent: 0,
          });
          gsap.set([currentInner, upcomingInner], {
            xPercent: 0,
          });

          isAnimatingRef.current = false;
          startSlideTimer(nextIndex);
        },
      });

      tl.to(currentSlide, { xPercent: -direction * 100 }, 0)
        .to(currentInner, { xPercent: direction * 50 }, 0)
        .to(upcomingSlide, { xPercent: 0 }, 0)
        .to(upcomingInner, { xPercent: 0 }, 0);
    },
    [startSlideTimer]
  );

  useEffect(() => {
    slideRefs.current.forEach((slide, i) => {
      if (slide) {
        gsap.set(slide, {
          visibility: i === 0 ? "visible" : "hidden",
          opacity: i === 0 ? 1 : 0,
          zIndex: i === 0 ? 2 : 1,
          xPercent: 0,
        });
      }
    });
    innerRefs.current.forEach((inner) => {
      if (inner) {
        gsap.set(inner, { xPercent: 0 });
      }
    });

    startSlideTimer(0);

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (progressTweenRef.current) progressTweenRef.current.kill();
    };
  }, [startSlideTimer]);

  const handleThumbClick = (idx: number) => {
    if (isAnimatingRef.current || idx === activeSlideRef.current) return;
    const dir = idx > activeSlideRef.current ? 1 : -1;
    navigateToSlide(idx, dir);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        const nextIdx = (activeSlideRef.current + 1) % HERO_SLIDES.length;
        navigateToSlide(nextIdx, 1);
      } else {
        const prevIdx =
          (activeSlideRef.current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
        navigateToSlide(prevIdx, -1);
      }
    }
    touchStartXRef.current = null;
  };

  // -------------------------------------------------------------
  // Leaflet Map Initialization & Interactive Behavior
  // -------------------------------------------------------------
  const selectPlace = useCallback(
    (
      place: MapPlace,
      { fly = true, popup = true }: { fly?: boolean; popup?: boolean } = {}
    ) => {
      setActivePlaceId(place.id);
      activePlaceIdRef.current = place.id;

      const map = mapInstanceRef.current;
      if (!map) return;

      markersRef.current.forEach((marker, id) => {
        const isActive = id === place.id;
        marker.getElement()?.querySelector(".poi-marker-pin")?.classList.toggle("is-active", isActive);
        marker.setZIndexOffset(isActive ? 1000 : 0);
      });

      // Smooth pan / fly to place coordinates with offset on desktop & mobile
      if (fly) {
        if (isMobileViewport()) {
          // Frame home and destination together so the route reads end to end
          map.flyToBounds(
            L.latLngBounds([
              [SGMG_LOCATION.lat, SGMG_LOCATION.lng],
              [place.lat, place.lng],
            ]),
            { ...mobileMapPadding(mapCardsRef.current), maxZoom: 15, duration: 0.85 }
          );
        } else {
          const isDesktop = window.innerWidth > 991;
          const targetLng = isDesktop ? place.lng - 0.007 : place.lng;
          const targetLat = isDesktop ? place.lat : place.lat + 0.013;
          map.flyTo([targetLat, targetLng], isDesktop ? 14.8 : 14.0, {
            duration: 0.85,
            easeLinearity: 0.25,
          });
        }
      }

      const marker = markersRef.current.get(place.id);
      if (popup) {
        marker?.openPopup();
      } else {
        map.closePopup();
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
          color: "#2391cf",
          weight: 3.5,
          opacity: 0.85,
          dashArray: "6, 8",
        }
      ).addTo(map);

      routePolylineRef.current = routeLine;
    },
    []
  );

  // -------------------------------------------------------------
  // Mobile Card Strip ↔ Map Sync
  // -------------------------------------------------------------
  const scrollCardIntoView = useCallback((idx: number) => {
    const strip = cardsScrollRef.current;
    const card = cardRefs.current[idx];
    const firstCard = cardRefs.current[0];
    if (!strip || !card || !firstCard) return;
    const left = card.offsetLeft - firstCard.offsetLeft;
    const maxLeft = strip.scrollWidth - strip.clientWidth;
    if (Math.abs(Math.min(left, maxLeft) - strip.scrollLeft) < 1) return;
    cardsScrollTargetRef.current = idx;
    strip.scrollTo({ left, behavior: "smooth" });
  }, []);

  // Select whichever card the strip comes to rest on after a swipe
  const handleCardsScroll = () => {
    if (!isMobileViewport()) return;
    if (cardsSettleTimerRef.current) clearTimeout(cardsSettleTimerRef.current);
    cardsSettleTimerRef.current = setTimeout(() => {
      const strip = cardsScrollRef.current;
      const [firstCard, secondCard] = cardRefs.current;
      if (!strip || !firstCard || !secondCard) return;
      const step = secondCard.offsetLeft - firstCard.offsetLeft;
      const idx = Math.min(
        MAP_PLACES.length - 1,
        Math.max(0, Math.round(strip.scrollLeft / step))
      );
      // A smooth scroll we started (pin or card tap) can pause on the way;
      // its card is already selected, so ignore stops until it arrives.
      if (cardsScrollTargetRef.current !== null) {
        if (idx === cardsScrollTargetRef.current) cardsScrollTargetRef.current = null;
        return;
      }
      const place = MAP_PLACES[idx];
      if (place.id !== activePlaceIdRef.current) {
        selectPlace(place, { popup: false });
      }
    }, 120);
  };

  const handleCardClick = (place: MapPlace, idx: number) => {
    if (!isMobileViewport()) {
      selectPlace(place);
      return;
    }
    if (place.id === activePlaceIdRef.current) {
      // A second tap on the active card opens its address, hours and directions
      markersRef.current.get(place.id)?.openPopup();
      return;
    }
    selectPlace(place, { popup: false });
    scrollCardIntoView(idx);
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [SGMG_LOCATION.lat, SGMG_LOCATION.lng + 0.005],
      zoom: 14.5,
      scrollWheelZoom: false,
      // A one-finger drag on a touch screen should scroll the page, not get
      // trapped panning the map. Pinch and the zoom buttons still work.
      dragging: !window.matchMedia("(pointer: coarse)").matches,
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
    MAP_PLACES.forEach((place, idx) => {
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
              <path fill="#2391cf" stroke="#121214" stroke-width="1.2" fill-rule="evenodd" clip-rule="evenodd"
                d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z M13.5,8A5.5,5.5 0 1,0 13.5,19A5.5,5.5 0 1,0 13.5,8Z">
              </path>
            </svg>
            <span class="poi-marker-num">${idx + 1}</span>
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
        selectPlace(place, { fly: false });
        if (isMobileViewport()) scrollCardIntoView(idx);
      });

      markersRef.current.set(place.id, marker);
    });

    // Default select Vega Circle Mall. On mobile, open on every place at once
    // with its route drawn, and leave the details to the card strip.
    if (isMobileViewport()) {
      map.invalidateSize();
      map.fitBounds(
        L.latLngBounds([
          [SGMG_LOCATION.lat, SGMG_LOCATION.lng],
          ...MAP_PLACES.map((p): L.LatLngTuple => [p.lat, p.lng]),
        ]),
        mobileMapPadding(mapCardsRef.current)
      );
      selectPlace(MAP_PLACES[0], { fly: false, popup: false });
    } else {
      selectPlace(MAP_PLACES[0], { fly: false });
    }

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
      if (cardsSettleTimerRef.current) clearTimeout(cardsSettleTimerRef.current);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [selectPlace, scrollCardIntoView]);



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
                      onClick={() => handleThumbClick(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Jump to slide: ${slide.title}`}
                    >
                      <div className="nav_wrap">
                        <img src={slide.image} loading="lazy" alt={slide.alt} />
                      </div>
                      <div
                        className="slideshow-thumb-progress"
                        ref={(el) => (progressRefs.current[idx] = el)}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slides List with GSAP 1:1 Counter-Parallax Wipe */}
            <div className="gallery_slider">
              <div className="gallery_slider_list">
                {HERO_SLIDES.map((slide, idx) => {
                  const isCurrent = idx === activeSlide;
                  return (
                    <div
                      key={slide.id}
                      data-slideshow="slide"
                      data-index={idx}
                      ref={(el) => (slideRefs.current[idx] = el)}
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
                        ref={(el) => (innerRefs.current[idx] = el)}
                        data-slideshow="parallax"
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
                .<br />Near Everything.
              </h2>
              <p className="map_address_line">{SGMG_LOCATION.shortAddress}</p>
            </div>
          </div>

          <div className="map_sec">
            {/* Left POI Cards Panel (a swipeable strip over the map on mobile) */}
            <div className="map_cards" ref={mapCardsRef}>
              <div
                className="cards_list_scroll"
                ref={cardsScrollRef}
                onScroll={handleCardsScroll}
                onTouchStart={() => (cardsScrollTargetRef.current = null)}
              >
                {MAP_PLACES.map((place, idx) => {
                  const isActive = place.id === activePlaceId;
                  const walkable = isWalkable(place);
                  return (
                    <div
                      key={place.id}
                      ref={(el) => (cardRefs.current[idx] = el)}
                      className={`map_card ${isActive ? "is-active" : ""}`}
                      onClick={() => handleCardClick(place, idx)}
                    >
                      <div className="wrapper_map_card">
                        <div className="image_map_card">
                          <img
                            alt={place.name}
                            loading="lazy"
                            src={place.image}
                          />
                          <span className="map_card_num" aria-hidden="true">
                            {idx + 1}
                          </span>
                        </div>
                        <div className="content_info">
                          <div className="sub_box">
                            <span className="subtitle_text">{place.category}</span>
                            <span className="transit_pill_card">
                              <TransitIcon path={WALK_ICON_PATH} />
                              {place.walk}
                            </span>
                            <span className="transit_pill_card is-mobile">
                              <TransitIcon path={walkable ? WALK_ICON_PATH : CAR_ICON_PATH} />
                              {walkable ? place.walk : place.drive}
                            </span>
                          </div>
                          <div className="title_map_card">{place.name}</div>
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

          <div className="map_directions">
            <PillButton
              text="Get directions to SGMG"
              href={SGMG_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </section>

        {/* ==============================================================
            SECTION 3: FAQS SECTION (DARK THEME)
            ============================================================== */}
        <FaqSection
          className="black"
          faqs={LOCATION_FAQS}
          caption="Everything you might want to know before moving in."
        />
      </main>

      <Footer hidePreFooterCta={true} />
    </div>
  );
}
