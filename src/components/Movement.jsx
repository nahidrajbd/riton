import { useEffect, useRef } from "react";
import { movement, images } from "../data/content";

export default function Movement() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
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
        <div className="movement-content reveal" ref={ref}>
          <span className="section-label" style={{ color: "#a2f1a4" }}>
            সংগ্রামের ইতিহাস
          </span>
          <h2 className="section-heading" id="movement-heading" style={{ color: "#ffffff", marginBottom: "1.5rem" }}>
            {movement.heading}
          </h2>
          <div className="divider" />
          <p>{movement.description}</p>
        </div>
      </div>
    </section>
  );
}
