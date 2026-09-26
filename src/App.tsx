import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import HomePage from "./pages/HomePage";

// Code-split secondary routes for rapid initial bundle size
const ApartmentsPage = lazy(() => import("./pages/ApartmentsPage"));
const ApartmentDetailPage = lazy(() => import("./pages/ApartmentDetailPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const HowToApplyPage = lazy(() => import("./pages/HowToApplyPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments" element={<ApartmentsPage />} />
          <Route path="/apartments/:slug" element={<ApartmentDetailPage />} />
          <Route path="/apartments-cards/:slug" element={<ApartmentDetailPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/how-to-apply" element={<HowToApplyPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/our-team" element={<TeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
