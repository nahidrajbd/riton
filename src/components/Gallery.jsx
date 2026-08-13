import { useState, useEffect, useCallback } from "react";
import { galleryData } from "../data/content";

function Lightbox({ images, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  const handlePrev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext, onClose]);

  // Prevent scroll on background
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="ছবি বড় করে দেখুন"
      onClick={onClose}
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="বন্ধ করুন"
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        className="lightbox-inner"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lightbox-nav" onClick={handlePrev} aria-label="আগের ছবি">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div style={{ position: "relative" }}>
          <img
            src={images[current].src}
            alt={images[current].caption}
            style={{ display: "block" }}
          />
          <p className="lightbox-caption">{images[current].caption}</p>
        </div>

        <button className="lightbox-nav" onClick={handleNext} aria-label="পরের ছবি">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-heading">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">গ্যালারি</span>
          <h2 className="section-heading" id="gallery-heading">
            {galleryData.heading}
          </h2>
          <div className="divider center" />
        </div>

        <div className="gallery-grid">
          {galleryData.images.map((img, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`ছবি দেখুন: ${img.caption}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setLightboxIndex(i);
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="gallery-caption">{img.caption}</span>
              </div>
              <div className="gallery-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryData.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
