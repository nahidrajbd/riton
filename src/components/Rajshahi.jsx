import { useEffect, useRef } from "react";
import { rajshahi, images } from "../data/content";

export default function Rajshahi() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rajshahi-section" aria-labelledby="rajshahi-heading">
      <div className="container">
        <div className="rajshahi-grid">
          {/* Image */}
          <div className="rajshahi-image-wrapper reveal-left" ref={leftRef}>
            <img
              src={images.rajshahi}
              alt="রাজশাহী শহরের দৃশ্য"
              loading="lazy"
            />
            <div className="rajshahi-location-badge">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              রাজশাহী
            </div>
          </div>

          {/* Text */}
          <div className="rajshahi-text reveal-right" ref={rightRef}>
            <span className="section-label">আমার শহর</span>
            <h2 className="section-heading" id="rajshahi-heading">
              {rajshahi.heading}
            </h2>
            <div className="divider" />
            <p>{rajshahi.description}</p>

            {/* Accent tags */}
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {["রাজশাহী", "পদ্মাপাড়", "সিটি কর্পোরেশন", "রাজনৈতিক কেন্দ্র"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#a2f1a4",
                    color: "#1d2f2d",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
