import { useEffect, useRef } from "react";
import { personalBackground } from "../data/content";

export default function Background() {
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
    <section className="section" style={{ background: "#ffffff" }} aria-labelledby="background-heading">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">ব্যক্তিগত তথ্য</span>
          <h2 className="section-heading" id="background-heading">
            {personalBackground.heading}
          </h2>
          <div className="divider center" />
        </div>

        <div className="background-grid">
          {/* Info table */}
          <div className="info-table reveal-left" ref={leftRef}>
            {personalBackground.details.map((row, i) => (
              <div className="info-row" key={i}>
                <span className="info-label">{row.label}</span>
                <span className="info-value">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="background-text reveal-right" ref={rightRef}>
            <p>{personalBackground.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
