import { useEffect, useRef } from "react";
import { updates } from "../data/content";

function UpdateCard({ item, delay }) {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <article className="update-card reveal" ref={ref}>
      <div className="update-image-wrapper">
        <img
          src={item.image}
          alt={item.title}
          className="update-image"
          loading="lazy"
        />
      </div>
      <div className="update-body">
        <p className="update-date">{item.date}</p>
        <h3 className="update-title">{item.title}</h3>
        <p className="update-desc">{item.description}</p>
        {/* Placeholder link — replace with actual URL when available */}
        <a href="#updates" className="btn-text" aria-label={`বিস্তারিত পড়ুন: ${item.title}`}>
          বিস্তারিত পড়ুন
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function Updates() {
  return (
    <section id="updates" className="updates-section" aria-labelledby="updates-heading">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label">খবর ও কার্যক্রম</span>
          <h2 className="section-heading" id="updates-heading">
            {updates.heading}
          </h2>
          <div className="divider center" />
        </div>

        <div className="updates-grid">
          {updates.items.map((item, i) => (
            <UpdateCard key={item.id} item={item} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
