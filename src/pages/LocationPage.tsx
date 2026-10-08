import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../location.css";
import Header, { WebflowButton } from "../components/Header";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import {
  ArrowUpRight,
  BusFront,
  GraduationCap,
  Hospital,
  MapPin,
  Plane,
  TrainFront,
  type LucideIcon,
} from "lucide-react";

// The project site. Coordinates are from the Cosmos Prashil listing
// (RERA WBRERA/P/DAR/2023/000769); the old sgmg.in nearby list agrees.
const SGMG_LOCATION = {
  name: "Cosmos Prashil",
  lat: 26.7545,
  lng: 88.41627,
  address: "Devidanga, Champasari, Siliguri, West Bengal 734003",
  shortAddress: "Devidanga, Champasari, Siliguri",
};

const directionsUrl = (lat: number, lng: number, fromSite = false) =>
  `https://www.google.com/maps/dir/?api=1${
    fromSite ? `&origin=${SGMG_LOCATION.lat},${SGMG_LOCATION.lng}` : ""
  }&destination=${lat},${lng}`;

const SGMG_DIRECTIONS_URL = directionsUrl(SGMG_LOCATION.lat, SGMG_LOCATION.lng);

// Distances are by road from the site (OpenStreetMap car routing, Oct 2026).
// Drive times assume ~25 km/h, a typical average in Siliguri traffic, so
// they're estimates; longer trips are rounded up to the next 5 minutes.
const CITY_SPEED_KMH = 25;
const driveMinutes = (km: number) => {
  const minutes = Math.ceil((km / CITY_SPEED_KMH) * 60);
  return minutes > 20 ? Math.ceil(minutes / 5) * 5 : minutes;
};
const formatKm = (km: number) => `${km.toFixed(1)} km`;
const formatDrive = (km: number) => `${driveMinutes(km)} min`;

interface SlideData {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  km: number;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: "city-centre",
    title: "City Centre, Matigara",
    description:
      "One of Siliguri’s biggest malls, in Uttorayon Township, with fashion brands, restaurants, entertainment and open-air plazas.",
    image: "/assets/locations/city-centre.jpg",
    alt: "City Centre mall in Siliguri",
    km: 4.98,
  },
  {
    id: "savin-kingdom",
    title: "Savin Kingdom, Hill Cart Road",
    description:
      "A family amusement and water park with rides, water slides and a fairy-tale castle entrance, the closest big day out from home.",
    image: "/assets/locations/savin-kingdom.jpg",
    alt: "Savin Kingdom amusement and water park in Siliguri",
    km: 4.48,
  },
  {
    id: "cosmos-mall",
    title: "Cosmos Mall, Sevoke Road",
    description:
      "An SGMG-built mall on 2nd Mile, Sevoke Road, with shops, cafés and busy weekends.",
    image: "/assets/locations/cosmos-mall.jpg",
    alt: "Cosmos Mall on Sevoke Road, Siliguri",
    km: 6.42,
  },
];

type PlaceCategory = "shopping" | "transport" | "schools" | "health";

const PLACE_CATEGORIES: { id: PlaceCategory; label: string }[] = [
  { id: "shopping", label: "Shopping & leisure" },
  { id: "transport", label: "Getting around" },
  { id: "schools", label: "Schools" },
  { id: "health", label: "Healthcare" },
];

interface MapPlace {
  id: string;
  name: string;
  category: PlaceCategory;
  kind: string;
  lat: number;
  lng: number;
  km: number;
  // Places without a photo show an icon tile instead
  image?: string;
  icon?: LucideIcon;
}

// Each category is listed nearest first
const MAP_PLACES: MapPlace[] = [
  { id: "savin-kingdom", name: "Savin Kingdom", category: "shopping", kind: "Theme park", lat: 26.73956, lng: 88.40272, km: 4.48, image: "/assets/locations/thumbs/savin-kingdom.jpg" },
  { id: "vega-circle-mall", name: "Vega Circle Mall", category: "shopping", kind: "Mall · by SGMG", lat: 26.75236, lng: 88.43878, km: 4.95, image: "/assets/locations/thumbs/vega-circle-mall.jpg" },
  { id: "city-centre", name: "City Centre", category: "shopping", kind: "Mall", lat: 26.72433, lng: 88.3949, km: 4.98, image: "/assets/locations/thumbs/city-centre.jpg" },
  { id: "hong-kong-market", name: "Hong Kong Market", category: "shopping", kind: "Street market", lat: 26.71543, lng: 88.42568, km: 5.7, image: "/assets/locations/thumbs/hong-kong-market.jpg" },
  { id: "cosmos-mall", name: "Cosmos Mall", category: "shopping", kind: "Mall · by SGMG", lat: 26.73858, lng: 88.43401, km: 6.42, image: "/assets/locations/thumbs/cosmos-mall.jpg" },

  { id: "tenzing-norgay-bus-terminus", name: "Tenzing Norgay Bus Terminus", category: "transport", kind: "Bus terminus", lat: 26.72512, lng: 88.41487, km: 3.93, icon: BusFront },
  { id: "siliguri-junction", name: "Siliguri Junction", category: "transport", kind: "Railway station", lat: 26.72379, lng: 88.41371, km: 4.07, icon: TrainFront },
  { id: "new-jalpaiguri", name: "New Jalpaiguri (NJP)", category: "transport", kind: "Railway junction", lat: 26.68286, lng: 88.44248, km: 12.19, icon: TrainFront },
  { id: "bagdogra-airport", name: "Bagdogra Airport", category: "transport", kind: "Airport", lat: 26.68177, lng: 88.33006, km: 16.11, icon: Plane },

  { id: "don-bosco-school", name: "Don Bosco School", category: "schools", kind: "School", lat: 26.74711, lng: 88.44359, km: 5.23, icon: GraduationCap },
  { id: "delhi-public-school", name: "Delhi Public School Siliguri", category: "schools", kind: "School", lat: 26.74759, lng: 88.39731, km: 5.32, icon: GraduationCap },
  { id: "techno-india-world-school", name: "Techno India Group World School", category: "schools", kind: "School", lat: 26.73295, lng: 88.38613, km: 6.74, icon: GraduationCap },
  { id: "birla-divya-jyoti", name: "Birla Divya Jyoti", category: "schools", kind: "School", lat: 26.74104, lng: 88.39658, km: 6.76, icon: GraduationCap },

  { id: "medica-north-bengal-clinic", name: "Medica North Bengal Clinic", category: "health", kind: "Clinic", lat: 26.72967, lng: 88.41642, km: 3.03, icon: Hospital },
  { id: "greenage-hospitals", name: "Greenage Hospitals", category: "health", kind: "Hospital", lat: 26.74521, lng: 88.40043, km: 4.82, icon: Hospital },
  { id: "neotia-getwel", name: "Neotia Getwel Multispecialty Hospital", category: "health", kind: "Hospital", lat: 26.72549, lng: 88.39367, km: 5.59, icon: Hospital },
  { id: "anandaloke-hospital", name: "Anandaloke Multispeciality Hospital", category: "health", kind: "Hospital", lat: 26.72985, lng: 88.43091, km: 6.91, icon: Hospital },
];

const placesIn = (category: PlaceCategory) =>
  MAP_PLACES.filter((place) => place.category === category);

// Phones get the swipeable card strip over the map instead of the side panel
const MOBILE_QUERY = "(max-width: 767px)";
const isMobileViewport = () =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

// Keeps fitted pins clear of the zoom buttons and of whatever the place
// cards cover: the side panel on desktop, the strip over the map on mobile.
const mapFitPadding = (cardPanel: HTMLElement | null): L.FitBoundsOptions => {
  if (isMobileViewport()) {
    return {
      paddingTopLeft: [32, 72],
      paddingBottomRight: [56, (cardPanel?.offsetHeight ?? 0) + 16],
    };
  }
  if (window.innerWidth > 991) {
    return {
      paddingTopLeft: [(cardPanel?.offsetWidth ?? 0) + 72, 88],
      paddingBottomRight: [88, 56],
    };
  }
  return { paddingTopLeft: [48, 72], paddingBottomRight: [64, 48] };
};

const CAR_ICON_PATH =
  "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z";

function CarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", marginRight: "3px", opacity: 0.75 }}
    >
      <path d={CAR_ICON_PATH} />
    </svg>
  );
}

// Auto-pan keeps popups clear of the zoom buttons in the top-right corner
const POPUP_OPTIONS: L.PopupOptions = {
  autoPan: true,
  autoPanPaddingTopLeft: [16, 16],
  autoPanPaddingBottomRight: [60, 16],
};

const ARROW_UP_RIGHT_SVG = `<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M8 7h9v9"/></svg>`;

const LOCATION_FAQS = [
  {
    q: "How far is Cosmos Prashil from the big malls?",
    a: "City Centre and Vega Circle Mall are both about 5 km by road, roughly 12 minutes by car, and Cosmos Mall is about 6.4 km. Vega Circle and Cosmos Mall are SGMG projects too. For everyday shopping, Devidanga Bazaar is about 200 m from the site.",
  },
  {
    q: "How well connected is Devidanga to trains, buses and the airport?",
    a: "The Tenzing Norgay Central Bus Terminus is 3.9 km away and Siliguri Junction 4.1 km. New Jalpaiguri (NJP) is about 12 km by road and Bagdogra Airport about 16 km, roughly 30 and 40 minutes depending on traffic.",
  },
  {
    q: "Which schools and hospitals are nearby?",
    a: "Sun Rise English Medium School is about 300 m from the site, and Don Bosco School and Delhi Public School Siliguri are about 5 km by road. For healthcare, Medica North Bengal Clinic is 3 km away, Greenage Hospitals 4.8 km and Neotia Getwel Multispecialty Hospital 5.6 km.",
  },
  {
    q: "Is public transport available from Devidanga?",
    a: "Yes. Auto-rickshaws, e-rickshaws (totos) and app-based cabs run across Siliguri, including the Champasari area, and the city’s central bus terminus is under 4 km away.",
  },
  {
    q: "How do I visit the Cosmos Prashil site?",
    a: "Click “Schedule a Tour” to book a walkthrough, or meet our team at the SGMG sales office on the 2nd floor of Jeevandeep Tower, Salugara. The “Directions” link on the map takes you straight to the site.",
  },
  {
    q: "How do I apply for an apartment or reserve a residence?",
    a: "Click “Apply Now,” select your preferred floor plan and move-in timeline, and complete the digital application form. If applying together with family or partners, our dedicated advisors ensure seamless assistance throughout.",
  },
  {
    q: "What amenities does Cosmos Prashil have?",
    a: "Residents get a rooftop swimming pool, a multi-gym with space for aerobics and yoga, an indoor games arena and a community hall, plus 24x7 power back-up, 24x7 filtered water, intercom-ready homes and automatic lifts. Every home is Vaastu-compliant.",
  },
];

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

  // Map Selected Category & Place
  const [activeCategory, setActiveCategory] = useState<PlaceCategory>(PLACE_CATEGORIES[0].id);
  const visiblePlaces = placesIn(activeCategory);
  const [activePlaceId, setActivePlaceId] = useState<string>(visiblePlaces[0].id);
  const activePlaceIdRef = useRef(visiblePlaces[0].id);
  const activeCategoryRef = useRef(activeCategory);
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
    document.title = "Location • Devidanga, Siliguri • SGMG";
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

      const marker = markersRef.current.get(place.id);
      if (fly) {
        map.closePopup();
        // Frame the site and the place together so the route reads end to end
        map.flyToBounds(
          L.latLngBounds([
            [SGMG_LOCATION.lat, SGMG_LOCATION.lng],
            [place.lat, place.lng],
          ]),
          { ...mapFitPadding(mapCardsRef.current), maxZoom: 15, duration: 0.85 }
        );
        // Opening mid-flight would make the popup's auto-pan fight the animation
        if (popup) {
          map.once("moveend", () => {
            if (activePlaceIdRef.current === place.id) marker?.openPopup();
          });
        }
      } else if (popup) {
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

  // Swap the pins and cards to another category, framing all of its places
  const showCategory = useCallback(
    (category: PlaceCategory, { animate = true }: { animate?: boolean } = {}) => {
      const places = placesIn(category);
      activeCategoryRef.current = category;
      setActiveCategory(category);
      cardsScrollTargetRef.current = null;
      cardsScrollRef.current?.scrollTo({ left: 0 });

      const map = mapInstanceRef.current;
      if (!map) return;

      markersRef.current.forEach((marker, id) => {
        if (places.some((place) => place.id === id)) marker.addTo(map);
        else marker.remove();
      });
      map.closePopup();

      const bounds = L.latLngBounds([
        [SGMG_LOCATION.lat, SGMG_LOCATION.lng],
        ...places.map((place): L.LatLngTuple => [place.lat, place.lng]),
      ]);
      const options = { ...mapFitPadding(mapCardsRef.current), maxZoom: 15 };
      if (animate) {
        map.flyToBounds(bounds, { ...options, duration: 0.85 });
      } else {
        map.fitBounds(bounds, options);
      }
      selectPlace(places[0], { fly: false, popup: false });
    },
    [selectPlace]
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
      // Read the category from the ref: this timer can outlive a tab switch
      const places = placesIn(activeCategoryRef.current);
      const step = secondCard.offsetLeft - firstCard.offsetLeft;
      const idx = Math.min(
        places.length - 1,
        Math.max(0, Math.round(strip.scrollLeft / step))
      );
      // A smooth scroll we started (pin or card tap) can pause on the way;
      // its card is already selected, so ignore stops until it arrives.
      if (cardsScrollTargetRef.current !== null) {
        if (idx === cardsScrollTargetRef.current) cardsScrollTargetRef.current = null;
        return;
      }
      const place = places[idx];
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
      // A second tap on the active card opens its details and directions
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
      center: [SGMG_LOCATION.lat, SGMG_LOCATION.lng],
      zoom: 13,
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

    // 3. Project site marker: a named label over a dot, so it's obvious which
    // point every distance is measured from. The zero-size icon lets the
    // label size itself; CSS centres it above the dot.
    const homeIcon = L.divIcon({
      className: "home-marker-wrap",
      html: `
        <div class="home-marker">
          <div class="home-marker-label">
            <span class="home-marker-icon">
              <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <path fill="currentColor" d="M12 3 3 10.2V21h6.5v-6h5v6H21V10.2L12 3z"/>
              </svg>
            </span>
            <span class="home-marker-name">${SGMG_LOCATION.name}</span>
          </div>
          <span class="home-marker-dot"></span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, -50],
    });

    const homePopupContent = `
      <div class="popup-kicker">Project site</div>
      <div class="popup-title">${SGMG_LOCATION.name}</div>
      <div class="popup-address">${SGMG_LOCATION.address}</div>
      <div class="popup-footer">
        <a href="${SGMG_DIRECTIONS_URL}" target="_blank" rel="noopener noreferrer" class="popup-link">
          Directions ${ARROW_UP_RIGHT_SVG}
        </a>
      </div>
    `;

    L.marker([SGMG_LOCATION.lat, SGMG_LOCATION.lng], {
      icon: homeIcon,
      zIndexOffset: 500,
      title: `${SGMG_LOCATION.name}, ${SGMG_LOCATION.shortAddress}`,
    })
      .addTo(map)
      .bindPopup(homePopupContent, POPUP_OPTIONS);

    // 4. POI markers for every category; showCategory() puts one set on the map
    MAP_PLACES.forEach((place) => {
      const idx = placesIn(place.category).indexOf(place);
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
        <div class="popup-kicker">${place.kind}</div>
        <div class="popup-title">${place.name}</div>
        <div class="popup-footer">
          <span class="popup-distance">${formatKm(place.km)} · ${formatDrive(place.km)} drive</span>
          <a href="${directionsUrl(place.lat, place.lng, true)}" target="_blank" rel="noopener noreferrer" class="popup-link">
            Directions ${ARROW_UP_RIGHT_SVG}
          </a>
        </div>
      `;

      const marker = L.marker([place.lat, place.lng], { icon: pinIcon })
        .bindPopup(popupContent, { ...POPUP_OPTIONS, offset: [0, -38] });

      marker.on("click", () => {
        selectPlace(place, { fly: false });
        if (isMobileViewport()) scrollCardIntoView(idx);
      });

      markersRef.current.set(place.id, marker);
    });

    // Open on the first category with all of its places in view and the
    // nearest one's route drawn; details stay in the cards until asked for.
    map.invalidateSize();
    showCategory(activeCategoryRef.current, { animate: false });

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
  }, [selectPlace, scrollCardIntoView, showCategory]);



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
            <h1 className="sr-only">Cosmos Prashil Location, Devidanga, Siliguri • SGMG</h1>

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
                              <MapPin color="#ffffff" strokeWidth={1.5} size="100%" aria-hidden="true" />
                            </div>
                            <div className="caption_location">{formatKm(slide.km)} by road</div>
                          </div>

                          <div className="flex_location">
                            <div className="icon_location">
                              <img src={ICON_DRIVE} loading="lazy" alt="" />
                            </div>
                            <div className="caption_location">{formatDrive(slide.km)} drive</div>
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
            SECTION 2: NEARBY PLACES & INTERACTIVE MAP
            ============================================================== */}
        <section className="on_the_map" data-section="dark">
          <div className="location_on_map">
            <div className="locations_headings">
              <h2 className="h2 white specific_map">
                Quiet{" "}
                <span
                  data-scribble="2"
                  className="scribble-wrap scribble-visible"
                >
                  Devidanga
                </span>
                .<br />Close to Everything.
              </h2>
              <p className="map_address_line">
                {SGMG_LOCATION.name} · {SGMG_LOCATION.shortAddress}
              </p>
            </div>
          </div>

          <div className="map_tabs" role="tablist" aria-label="Nearby places">
            {PLACE_CATEGORIES.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`map_tab ${isActive ? "is-active" : ""}`}
                  onClick={() => !isActive && showCategory(category.id)}
                >
                  {category.label}
                </button>
              );
            })}
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
                {visiblePlaces.map((place, idx) => {
                  const isActive = place.id === activePlaceId;
                  const PlaceIcon = place.icon;
                  return (
                    <div
                      key={place.id}
                      ref={(el) => (cardRefs.current[idx] = el)}
                      className={`map_card ${isActive ? "is-active" : ""}`}
                      onClick={() => handleCardClick(place, idx)}
                    >
                      <div className="wrapper_map_card">
                        <div className={`image_map_card ${place.image ? "" : "is-icon"}`}>
                          {place.image ? (
                            <img alt={place.name} loading="lazy" src={place.image} />
                          ) : (
                            PlaceIcon && (
                              <PlaceIcon size={26} strokeWidth={1.6} aria-hidden="true" />
                            )
                          )}
                          <span className="map_card_num" aria-hidden="true">
                            {idx + 1}
                          </span>
                        </div>
                        <div className="content_info">
                          <div className="sub_box">
                            <span className="subtitle_text">{place.kind}</span>
                            <span className="transit_pill_card">
                              <CarIcon />
                              {formatKm(place.km)} · {formatDrive(place.km)}
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

          <div className="map_footer">
            <a
              className="map_directions_link"
              href={SGMG_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions to {SGMG_LOCATION.name}
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
            <p className="map_note">
              Distances are by road. Drive times are estimates and vary with traffic.
            </p>
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
