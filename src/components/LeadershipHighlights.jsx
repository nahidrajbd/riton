import { useEffect, useRef } from "react";
import { leadershipHighlights } from "../data/content";

const icons = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  ),
};

function HighlightCard({ item, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), delay);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div className="highlight-card reveal" ref={ref}>
      <div className="highlight-icon" aria-hidden="true">
        {icons[item.icon]}
      </div>
      <p className="highlight-stat">{item.stat}</p>
      <p className="highlight-label">{item.label}</p>
    </div>
  );
}

export default function LeadershipHighlights() {
  return (
    <section id="leadership" className="section" style={{ background: "#f8fffe" }} aria-labelledby="leadership-heading">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">নেতৃত্ব</span>
          <h2 className="section-heading" id="leadership-heading">
            পরিচিতির সংক্ষেপ
          </h2>
          <div className="divider center" />
        </div>
        <div className="highlights-grid">
          {leadershipHighlights.map((item, i) => (
            <HighlightCard key={i} item={item} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
