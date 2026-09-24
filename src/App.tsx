import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ApartmentsPage from "./pages/ApartmentsPage";
import ApartmentDetailPage from "./pages/ApartmentDetailPage";
import LocationPage from "./pages/LocationPage";
import HowToApplyPage from "./pages/HowToApplyPage";
import FaqPage from "./pages/FaqPage";
import GalleryPage from "./pages/GalleryPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/404" element={<NotFoundPage />} />
        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
