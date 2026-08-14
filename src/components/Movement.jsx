import { useEffect, useRef } from "react";
import { movement, images } from "../data/content";
import sobarAgeBdImg from "../assets/sobar_age_bd.png";

export default function Movement() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) {
      ref.current
        .querySelectorAll(".reveal, .reveal-left, .reveal-right")
        .forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="movement-section" aria-labelledby="movement-heading">
      {/* Background image */}
      <div
        className="movement-bg"
        style={{ backgroundImage: `url(${images.movement})` }}
        role="img"
        aria-label="আন্দোলন ও সংগ্রামের পটভূমি"
      />
      <div className="movement-overlay" />

      <div className="container">
        <div className="movement-grid" ref={ref}>
          {/* Column 1: Text */}
          <div className="movement-content reveal-left">
            <span className="section-label" style={{ color: "#a2f1a4" }}>
              সংগ্রামের ইতিহাস
            </span>
            <h2
              className="section-heading"
              id="movement-heading"
              style={{ color: "#ffffff", marginBottom: "1.5rem" }}
            >
              {movement.heading}
            </h2>
            <div className="divider" />
            <p>{movement.description}</p>
          </div>

          {/* Column 2: Image */}
          <div className="movement-image-wrap reveal-right">
            <img
              src={sobarAgeBdImg}
              alt="সবার আগে বাংলাদেশ"
              className="movement-floating-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
