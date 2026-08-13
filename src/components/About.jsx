import { useEffect, useRef } from "react";
import { about, images } from "../data/content";

export default function About() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section" style={{ background: "#ffffff" }}>
      <div className="container">
        <div className="about-grid">
          {/* Portrait */}
          <div className="portrait-wrapper reveal-left" ref={leftRef}>
            <div className="portrait-frame">
              <img
                src={images.portrait}
                alt="মাহফুজুর রহমান রিটন — প্রশাসক, রাজশাহী সিটি কর্পোরেশন"
                loading="lazy"
              />
              <div className="portrait-badge">
                প্রশাসক, রাজশাহী সিটি কর্পোরেশন
              </div>
            </div>
            <div className="portrait-accent" aria-hidden="true" />
          </div>

          {/* Text */}
          <div className="about-text reveal-right" ref={rightRef}>
            <span className="section-label">পরিচিতি</span>
            <h2 className="section-heading">{about.heading}</h2>
            <div className="divider" />
            {about.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
