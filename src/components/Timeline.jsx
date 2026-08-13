import { useEffect, useRef } from "react";
import { timeline } from "../data/content";

function TimelineItem({ item, index }) {
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

  // even → year left, card right | odd → card left, year right
  const isLeft = index % 2 === 0;

  return (
    <div className="timeline-item reveal" ref={ref}>
      {/* LEFT column — hidden on mobile */}
      <div className="timeline-left">
        {isLeft ? (
          <span className="timeline-year-badge">{item.year}</span>
        ) : (
          <div className="timeline-card">
            <p>{item.description}</p>
          </div>
        )}
      </div>

      {/* CENTER dot */}
      <div className="timeline-center">
        <div className="timeline-dot" aria-hidden="true" />
      </div>

      {/*
        RIGHT column — always visible.
        On desktop: shows the card (isLeft) or year badge (!isLeft).
        On mobile:  shows BOTH year badge + card stacked so nothing is lost.
      */}
      <div className="timeline-right">
        {/* Year badge: always rendered in right column for mobile fallback */}
        <span
          className="timeline-year-badge"
          style={
            // On desktop, hide the badge in right column when it's already in left
            isLeft ? { display: "var(--year-right-display, none)" } : {}
          }
        >
          {item.year}
        </span>

        {/* Card: shown in right column only when isLeft (desktop); always shown on mobile */}
        {isLeft ? (
          <div className="timeline-card">
            <p>{item.description}</p>
          </div>
        ) : (
          /* On desktop odd items: card is in LEFT. On mobile: also show it in RIGHT */
          <div className="timeline-card timeline-card-mobile-only">
            <p>{item.description}</p>
          </div>
        )}
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
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
