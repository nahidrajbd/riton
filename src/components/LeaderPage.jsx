import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { inspiringLeaders } from "../data/leaders";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LeaderPage() {
  const { slug } = useParams();
  const leader = inspiringLeaders.find((l) => l.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!leader) {
    return <Navigate to="/" replace />;
  }

  // Determine prev/next for navigation
  const currentIndex = inspiringLeaders.findIndex((l) => l.slug === slug);
  const prevLeader = currentIndex > 0 ? inspiringLeaders[currentIndex - 1] : null;
  const nextLeader =
    currentIndex < inspiringLeaders.length - 1
      ? inspiringLeaders[currentIndex + 1]
      : null;

  return (
    <>
      <Navbar />
      <main className="leader-page">
        {/* Hero banner */}
        <div className="leader-page-hero">
          <div className="leader-page-hero-bg" aria-hidden="true">
            <img
              src={leader.cover}
              alt=""
              className="leader-page-hero-img"
            />
            <div className="leader-page-hero-overlay" />
          </div>

          <div className="container leader-page-hero-content">
            {/* Back link */}
            <Link to="/#inspiring-leaders" className="leader-back-link">
              ← হোমে ফিরুন
            </Link>

            {/* Portrait + title */}
            <div className="leader-page-intro">
              <div className="leader-page-portrait-wrap">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="leader-page-portrait"
                />
                <div className="leader-page-portrait-ring" aria-hidden="true" />
              </div>

              <div className="leader-page-title-block">
                <span className="section-label" style={{ color: "#a2f1a4" }}>
                  আমার অনুপ্রেরণার নেতা
                </span>
                <h1 className="leader-page-name">{leader.name}</h1>
                <p className="leader-page-short-bio">{leader.shortBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="leader-page-body">
          <div className="container leader-page-article">
            <div className="leader-page-divider-wrap">
              <div className="divider" />
            </div>

            {(() => {
                const paras = leader.fullContent;
                const midPoint = Math.ceil(paras.length / 2);
                return paras.map((paragraph, i) => (
                  <>
                    <p key={i} className="leader-page-paragraph">
                      {paragraph}
                    </p>
                    {i === midPoint - 1 && (
                      <figure key="cover-figure" className="leader-article-cover">
                        <img
                          src={leader.cover}
                          alt={leader.name}
                          className="leader-article-cover-img"
                        />
                        <figcaption className="leader-article-cover-caption">
                          {leader.name}
                        </figcaption>
                      </figure>
                    )}
                  </>
                ));
              })()}

          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="leader-page-nav">
          <div className="container leader-page-nav-inner">
            {prevLeader ? (
              <Link
                to={`/leader/${prevLeader.slug}`}
                className="leader-nav-btn leader-nav-prev"
              >
                <img
                  src={prevLeader.image}
                  alt={prevLeader.name}
                  className="leader-nav-thumb"
                />
                <div className="leader-nav-text">
                  <span className="leader-nav-dir">← আগের নেতা</span>
                  <span className="leader-nav-name">{prevLeader.name}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextLeader ? (
              <Link
                to={`/leader/${nextLeader.slug}`}
                className="leader-nav-btn leader-nav-next"
              >
                <div className="leader-nav-text" style={{ textAlign: "right" }}>
                  <span className="leader-nav-dir">পরের নেতা →</span>
                  <span className="leader-nav-name">{nextLeader.name}</span>
                </div>
                <img
                  src={nextLeader.image}
                  alt={nextLeader.name}
                  className="leader-nav-thumb"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
