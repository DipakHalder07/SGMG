import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ApartmentsPage from "./pages/ApartmentsPage";
import ApartmentDetailPage from "./pages/ApartmentDetailPage";
import LocationPage from "./pages/LocationPage";
import HowToApplyPage from "./pages/HowToApplyPage";
import FaqPage from "./pages/FaqPage";

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
        {/* Fallback to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
