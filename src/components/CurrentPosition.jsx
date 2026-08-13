import { useEffect, useRef } from "react";
import { currentPosition } from "../data/content";

export default function CurrentPosition() {
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
    <section className="position-section" aria-labelledby="position-heading">
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div className="reveal" ref={ref} style={{ textAlign: "center" }}>
          <div className="position-badge">{currentPosition.sectionHeading}</div>
          <p
            id="position-heading"
            className="position-title"
            aria-label={`${currentPosition.title} — ${currentPosition.subtitle}`}
          >
            {currentPosition.title}
          </p>
          <p className="position-subtitle">{currentPosition.subtitle}</p>
          <p className="position-desc">{currentPosition.description}</p>
        </div>
      </div>
    </section>
  );
}
