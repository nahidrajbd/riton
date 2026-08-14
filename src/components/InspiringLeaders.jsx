import { Link } from "react-router-dom";
import { inspiringLeaders, inspiringLeadersSection } from "../data/leaders";

export default function InspiringLeaders() {
  return (
    <section
      id="inspiring-leaders"
      className="inspiring-leaders-section"
      aria-labelledby="inspiring-leaders-heading"
    >
      <div className="container">
        {/* Title + description */}
        <div className="leaders-header">
          <span className="section-label">অনুপ্রেরণা</span>
          <h2 id="inspiring-leaders-heading" className="section-heading">
            {inspiringLeadersSection.heading}
          </h2>
          <div className="divider center" />
          <p className="leaders-intro">{inspiringLeadersSection.description}</p>
        </div>

        {/* Three photos — single row */}
        <div className="leaders-row">
          {inspiringLeaders.map((leader) => (
            <Link
              key={leader.id}
              to={`/leader/${leader.slug}`}
              className="leader-card"
              aria-label={`${leader.name} সম্পর্কে আরও পড়ুন`}
            >
              <div className="leader-photo-wrap">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="leader-photo"
                  loading="lazy"
                />
                <div className="leader-photo-overlay">
                  <span className="leader-read-more">বিস্তারিত পড়ুন →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
