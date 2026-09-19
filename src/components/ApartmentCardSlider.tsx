import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

interface ApartmentCardSliderProps {
  photos: string[];
  apartId: string;
  apartName: string;
  status: string;
  beds: string;
  baths: string;
  sqft: string;
}

export default function ApartmentCardSlider({
  photos,
  apartId,
  apartName,
  status,
  beds,
  baths,
  sqft,
}: ApartmentCardSliderProps) {
  const realItems = photos && photos.length > 0 ? photos : ["/assets/hero-1.avif"];
  const count = realItems.length;

  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveringDots, setIsHoveringDots] = useState(false);

  // Drag / swipe states
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const hasMovedRef = useRef(false);
  const busyRef = useRef(false);
  const dotsRef = useRef<HTMLDivElement>(null);

  // Determine logical active dot index (0 to count - 1)
  let logicalIndex = 0;
  if (count > 1) {
    if (trackIndex === 0) {
      logicalIndex = count - 1;
    } else if (trackIndex === count + 1) {
      logicalIndex = 0;
    } else {
      logicalIndex = trackIndex - 1;
    }
  }

  // Handle transition end for infinite wrapping
  const handleTransitionEnd = useCallback(() => {
    busyRef.current = false;
    if (count <= 1) return;

    if (trackIndex === 0) {
      setIsTransitioning(false);
      setTrackIndex(count);
    } else if (trackIndex === count + 1) {
      setIsTransitioning(false);
      setTrackIndex(1);
    }
  }, [count, trackIndex]);

  // Turn transition back on after silent wrap
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const go = useCallback(
    (delta: number) => {
      if (busyRef.current || count <= 1) return;
      busyRef.current = true;
      setIsTransitioning(true);
      setTrackIndex((prev) => prev + delta);
    },
    [count]
  );

  const goTo = useCallback(
    (targetIndex: number) => {
      if (busyRef.current || count <= 1) return;
      if (targetIndex === logicalIndex) return;

      if (logicalIndex === count - 1 && targetIndex === 0) {
        go(1);
        return;
      }
      if (logicalIndex === 0 && targetIndex === count - 1) {
        go(-1);
        return;
      }

      busyRef.current = true;
      setIsTransitioning(true);
      setTrackIndex(targetIndex + 1);
    },
    [count, logicalIndex, go]
  );

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (count <= 1 || busyRef.current) return;
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    isHorizontalSwipeRef.current = null;
    hasMovedRef.current = false;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || count <= 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startXRef.current;
    const diffY = currentY - startYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
        isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      hasMovedRef.current = true;
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (isHorizontalSwipeRef.current && hasMovedRef.current) {
      if (dragOffset < -40) {
        go(1);
      } else if (dragOffset > 40) {
        go(-1);
      }
    }
    setDragOffset(0);
    isHorizontalSwipeRef.current = null;
    hasMovedRef.current = false;
  };

  // Render list items with clones for infinite loop
  const renderItems = () => {
    if (count === 1) {
      return (
        <div className="carousel_item w-dyn-item w-dyn-repeater-item">
          <Link to={`/apartments-cards/${apartId}`} className="carousel_apartments w-inline-block">
            <img src={realItems[0]} alt={apartName} className="image_carousel" loading="eager" />
          </Link>
        </div>
      );
    }

    const items = [];

    // Prepend clone of last item
    items.push(
      <div
        key="clone-last"
        role="listitem"
        className="carousel_item w-dyn-item w-dyn-repeater-item"
        data-carousel-clone="1"
        aria-hidden="true"
      >
        <Link to={`/apartments-cards/${apartId}`} className="carousel_apartments w-inline-block" tabIndex={-1}>
          <img src={realItems[count - 1]} alt={apartName} className="image_carousel" loading="lazy" />
        </Link>
      </div>
    );

    // Real items
    realItems.forEach((photo, idx) => {
      items.push(
        <div key={idx} role="listitem" className="carousel_item w-dyn-item w-dyn-repeater-item">
          <Link
            to={`/apartments-cards/${apartId}`}
            className="carousel_apartments w-inline-block"
            onClick={(e) => {
              if (hasMovedRef.current) {
                e.preventDefault();
              }
            }}
          >
            <img src={photo} alt={apartName} className="image_carousel" loading={idx === 0 ? "eager" : "lazy"} />
          </Link>
        </div>
      );
    });

    // Append clone of first item
    items.push(
      <div
        key="clone-first"
        role="listitem"
        className="carousel_item w-dyn-item w-dyn-repeater-item"
        data-carousel-clone="1"
        aria-hidden="true"
      >
        <Link to={`/apartments-cards/${apartId}`} className="carousel_apartments w-inline-block" tabIndex={-1}>
          <img src={realItems[0]} alt={apartName} className="image_carousel" loading="lazy" />
        </Link>
      </div>
    );

    return items;
  };

  // Dots calculation (matching live 21oaks sliding window)
  const isCompact = count <= 5;
  const winStart = !isCompact ? Math.max(0, Math.min(logicalIndex - 2, count - 5)) : 0;

  // Show arrows when card is hovered, unless hovering directly over dots
  const showArrowsClass = isHovered && !isHoveringDots ? "is-arrows-visible" : "";

  return (
    <div
      className={`apart_image grid_apartments ${showArrowsClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsHoveringDots(false);
      }}
    >
      {/* Overlay Tags */}
      <div className="overlay_tags">
        <div className="tag_available">
          <div className="dot_available" />
          <div className="txt_available">{status}</div>
        </div>
        <div className="tags_info">
          <div className="tag_info">
            <div className="icon_tag">
              <img src="/assets/icons/bed-icon.png" loading="lazy" alt="Bed" className="image" />
            </div>
            <div>{beds}</div>
          </div>
          <div className="tag_info">
            <div className="icon_tag">
              <img src="/assets/icons/bath-icon.png" loading="lazy" alt="Bath" className="image" />
            </div>
            <div>{baths}</div>
          </div>
          <div className="tag_info">
            <div className="icon_tag">
              <img src="/assets/icons/ft-icon.png" loading="lazy" alt="Area" className="image" />
            </div>
            <div>{sqft}</div>
            <div>ft<sup>2</sup></div>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="carousel_parent_apartments has-carousel-js"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel_list"
          style={{
            transform: isDragging
              ? `translateX(calc(-${trackIndex * 100}% + ${dragOffset}px))`
              : `translateX(-${count > 1 ? trackIndex * 100 : 0}%)`,
            transition: isTransitioning && !isDragging ? "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {renderItems()}
        </div>

        {/* Carousel Prev/Next & Dots UI */}
        {count > 1 && (
          <div className="apartments-grid-carousel-ui">
            <button
              type="button"
              className="carousel-prev"
              aria-label="Previous photo"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-next"
              aria-label="Next photo"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              }}
            >
              ›
            </button>

            <div
              ref={dotsRef}
              className={`carousel-dots ${isCompact ? "is-compact" : ""}`}
              onMouseEnter={() => setIsHoveringDots(true)}
              onMouseLeave={() => setIsHoveringDots(false)}
            >
              <div
                className="carousel-dots-track"
                style={{
                  transform: !isCompact ? `translateX(calc(${-winStart} * var(--carousel-dot-slot)))` : "translateX(0)",
                }}
              >
                {realItems.map((_, dotIdx) => (
                  <div className="carousel-dots-slot" key={dotIdx}>
                    <button
                      type="button"
                      className={`carousel-dot ${dotIdx === logicalIndex ? "is-active" : ""}`}
                      aria-label={`Photo ${dotIdx + 1}`}
                      aria-current={dotIdx === logicalIndex ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goTo(dotIdx);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
