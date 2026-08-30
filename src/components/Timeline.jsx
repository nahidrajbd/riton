import { useEffect, useRef } from "react";
import { timeline } from "../data/content";

function TimelineItem({ item }) {
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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-item reveal" ref={ref}>
      <div className="timeline-center">
        <div className="timeline-dot" aria-hidden="true" />
      </div>
      <div className="timeline-content">
        <span className="timeline-year">{item.year}</span>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="timeline-section" aria-labelledby="timeline-heading">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label">রাজনৈতিক ইতিহাস</span>
          <h2 className="section-heading" id="timeline-heading">
            {timeline.heading}
          </h2>
          <div className="divider center" />
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-line" aria-hidden="true" />
          {timeline.items.map((item, i) => (
            <TimelineItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
