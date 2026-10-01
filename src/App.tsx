import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";
import PageLoader from "./components/PageLoader";
import HomePage from "./pages/HomePage";

// Code-split secondary routes for rapid initial bundle size
const ApartmentsPage = lazy(() => import("./pages/ApartmentsPage"));
const ApartmentDetailPage = lazy(() => import("./pages/ApartmentDetailPage"));
const AmenitiesPage = lazy(() => import("./pages/AmenitiesPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const HowToApplyPage = lazy(() => import("./pages/HowToApplyPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Old template path: forward to /apartments/:slug, which then resolves
// legacy ids (d1-premium) to their name URL (green-view).
function ApartmentsCardsRedirect() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <Navigate to={`/apartments/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments" element={<ApartmentsPage />} />
          <Route path="/apartments/:slug" element={<ApartmentDetailPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/about" element={<HowToApplyPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/404" element={<NotFoundPage />} />

          {/* One address per page: old and alternate paths redirect. */}
          <Route path="/apartments-cards/:slug" element={<ApartmentsCardsRedirect />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/how-to-apply" element={<Navigate to="/about" replace />} />
          <Route path="/faqs" element={<Navigate to="/faq" replace />} />
          <Route path="/our-team" element={<Navigate to="/team" replace />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
