import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import gsap from "gsap";
import "../gallery.css";

const GALLERY_IMAGES = [
  { id: 1, src: "/images/gallery/1.avif", alt: "Residence Living Lounge 001" },
  { id: 2, src: "/images/gallery/2.avif", alt: "Designer Kitchen & Bar 002" },
  { id: 3, src: "/images/gallery/3.avif", alt: "Executive Study & Clubroom 003" },
  { id: 4, src: "/images/gallery/4.avif", alt: "Private Entryway & Foyer 004" },
  { id: 5, src: "/images/gallery/5.avif", alt: "Resort Pool & Aerial Grounds 005" },
  { id: 6, src: "/images/gallery/6.avif", alt: "Primary Luxury Suite 006" },
  { id: 7, src: "/images/gallery/7.avif", alt: "Dedicated Workstation 007" },
  { id: 8, src: "/images/gallery/8.avif", alt: "Study Corner & Bookshelf 008" },
  { id: 9, src: "/images/gallery/9.avif", alt: "Sunlit Pool & Cabanas 009" },
  { id: 10, src: "/images/gallery/10.avif", alt: "Spacious Suite Bedroom 010" },
  { id: 11, src: "/images/gallery/11.avif", alt: "Community Aerial Panorama 011" },
  { id: 12, src: "/images/gallery/12.avif", alt: "Fitness & Wellness Center 012" },
  { id: 13, src: "/images/gallery/13.avif", alt: "Resident Clubhouse & Game Lounge 013" },
];

function formatNum(num: number): string {
  return String(num).padStart(3, "0");
}

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingDir, setAnimatingDir] = useState<number>(1);
  const illImgRef = useRef<HTMLImageElement>(null);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef<boolean>(false);

  const totalCount = GALLERY_IMAGES.length;

  useEffect(() => {
    document.title = "Gallery • SGMG Luxury Residences Siliguri";
  }, []);

  const goToSlide = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    const dir = newIndex > currentIndex ? 1 : -1;
    setAnimatingDir(dir);
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % totalCount;
    setAnimatingDir(1);
    setCurrentIndex(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (currentIndex - 1 + totalCount) % totalCount;
    setAnimatingDir(-1);
    setCurrentIndex(prevIdx);
  };

  // Playful GSAP bounce animation on room illustration on index change
  useEffect(() => {
    if (!illImgRef.current) return;
    gsap.killTweensOf(illImgRef.current);
    gsap
      .timeline()
      .to(illImgRef.current, {
        scale: 1.04,
        rotate: animatingDir > 0 ? 1.4 : -1.4,
        y: -4,
        duration: 0.18,
        ease: "power2.out",
      })
      .to(illImgRef.current, {
        scale: 1,
        rotate: 0,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });
  }, [currentIndex, animatingDir]);

  // Center active thumbnail in viewport
  useEffect(() => {
    if (!thumbsContainerRef.current) return;
    const activeThumb = thumbsContainerRef.current.children[currentIndex] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Mouse wheel navigation on gallery
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
      wheelLockRef.current = true;
      if (e.deltaY > 0 || e.deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 350);
    }
  };

  const currNumStr = formatNum(currentIndex + 1);

  return (
    <>
      <Header />

      <main className="gallery" onWheel={handleWheel}>
        <div className="gallery_wrapper">
          {/* Top Half: Meta, Counter, Sketch Room Illustration & Big Visual */}
          <div className="top_side">
            <h1 className="sr-only">SGMG Gallery</h1>

            {/* Left Column: Number, Center Illustration, Caption */}
            <div className="left_ill">
              <div className="number_active">
                <div className="num_roll">
                  {currNumStr.split("").map((digit, i) => (
                    <span key={i} className="digit">
                      <span className="digit_curr">{digit}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Hand-Drawn Room Sketch Illustration with interactive physics */}
              <div className="ill_middle">
                <img
                  ref={illImgRef}
                  src="/images/gallery/gallery-ill.svg"
                  alt="SGMG Residence Room Sketch Illustration"
                  className="image"
                />
              </div>

              {/* Bottom Meta */}
              <div className="bottom_active">
                <div className="numbers_small">
                  <div className="active_small">
                    <div>{currNumStr}</div>
                  </div>
                  <div className="all_small">
                    <div>- {formatNum(totalCount)}</div>
                  </div>
                </div>

                <div className="gallery_caption">
                  <div>Gallery</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res Large Stage Image */}
            <div className="right_fs">
              <div className="gallery_parent w-dyn-list">
                <div role="list" className="gallery_list w-dyn-items">
                  {GALLERY_IMAGES.map((img, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <div
                        key={img.id}
                        role="listitem"
                        className={`gallery_item w-dyn-item ${isActive ? "is-active" : ""}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="image main_visual"
                          loading={idx === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Half: Interactive Thumbnail Strip */}
          <div className="bottom_side">
            <div className="thumbs_gallery">
              <div className="list_thumbs">
                <div ref={thumbsContainerRef} className="list_thumbs_inner">
                  {GALLERY_IMAGES.map((img, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <div
                        key={img.id}
                        className={`thumb_item ${isActive ? "is-active" : ""}`}
                        onClick={() => goToSlide(idx)}
                      >
                        <img
                          src={img.src}
                          alt={`Thumbnail ${formatNum(idx + 1)}`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
