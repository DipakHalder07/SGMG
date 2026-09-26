import React, { useEffect, useState, useCallback } from "react";
import { ApartmentUnit } from "../data/apartmentsData";
import { Link } from "react-router-dom";

interface ApartmentLightboxModalProps {
  unit: ApartmentUnit | null;
  initialPhotoIndex?: number;
  onClose: () => void;
}

export default function ApartmentLightboxModal({
  unit,
  initialPhotoIndex = 0,
  onClose,
}: ApartmentLightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);

  useEffect(() => {
    setCurrentIndex(initialPhotoIndex);
  }, [initialPhotoIndex, unit]);

  const photos = unit ? unit.gallery : [];

  const handlePrev = useCallback(() => {
    if (!photos.length) return;
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    if (!photos.length) return;
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (unit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [unit]);

  if (!unit || !photos.length) return null;

  return (
    <div className="apartment-lightbox-overlay" onClick={onClose}>
      <div className="apartment-lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Header Bar */}
        <div className="apartment-lightbox-header">
          <div className="apartment-lightbox-title-wrap">
            <h3 className="apartment-lightbox-unit-title">{unit.name}</h3>
            <span className="apartment-lightbox-unit-specs">
              {unit.beds} • {unit.baths} • {unit.sqft} ft² • ₹{unit.priceFormatted}/mo
            </span>
          </div>

          <div className="apartment-lightbox-actions">
            <Link
              to={`/apartments-cards/${unit.id}`}
              className="apartment-lightbox-view-page-btn"
              onClick={onClose}
            >
              Full Details
            </Link>
            <a
              href="https://calendly.com/dipakh810/30min"
              target="_blank"
              rel="noreferrer"
              className="apartment-lightbox-apply-btn"
            >
              Apply Now
            </a>
            <button
              className="apartment-lightbox-close-btn"
              onClick={onClose}
              aria-label="Close details modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Stage Image with Navigation Chevrons */}
        <div className="apartment-lightbox-stage">
          <button
            className="apartment-lightbox-nav-arrow is-prev"
            onClick={handlePrev}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div className="apartment-lightbox-main-img-wrap">
            <img
              key={currentIndex}
              src={photos[currentIndex]}
              alt={`${unit.name} photo ${currentIndex + 1}`}
              className="apartment-lightbox-main-img"
            />
            <div className="apartment-lightbox-counter">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>

          <button
            className="apartment-lightbox-nav-arrow is-next"
            onClick={handleNext}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>

        {/* Bottom Horizontal Thumbnail Strip */}
        <div className="apartment-lightbox-thumb-strip">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className={`apartment-lightbox-thumb ${idx === currentIndex ? "is-active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img src={photo} alt={`Thumbnail ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
