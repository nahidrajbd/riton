import { useEffect, useState } from "react";
import { hero, images } from "../data/content";

// All images used in the slider — portrait first for immediate load
const sliderImages = [
  "/images/Mahafujur-Rahman-Riton-portrait.jpg",
  "/images/Mahafujur-Rahman-Riton-2.jpg",
  "/images/Mahafujur-Rahman-Riton-3.jpg",
  "/images/Mahafujur-Rahman-Riton-4.jpg",
  "/images/Mahafujur-Rahman-Riton-5.jpg",
  "/images/Mahafujur-Rahman-Riton.jpg",
];

const SLIDE_INTERVAL = 4500; // ms between transitions
const FADE_DURATION = 1000;  // ms for the CSS fade (must match CSS)

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (current + 1) % sliderImages.length;
      setPrev(current);
      setCurrent(next);
      setFading(true);
      // Clear the "prev" layer after fade completes
      setTimeout(() => {
        setPrev(null);
        setFading(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [current]);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section" aria-label="হিরো ব্যানার">
      {/* Slider backgrounds — stacked, fade between them */}
      <div className="hero-slider" aria-hidden="true">
        {sliderImages.map((src, i) => (
          <div
            key={src}
            className="hero-slide"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 2 : i === prev ? 1 : 0,
              transition: i === current
                ? `opacity ${FADE_DURATION}ms ease-in-out`
                : "none",
            }}
          />
        ))}
      </div>

      {/* Dark overlay on top of slider */}
      <div className="hero-overlay" />

      {/* Dot indicators */}
      <div className="hero-dots" aria-hidden="true">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? " active" : ""}`}
            onClick={() => {
              setPrev(current);
              setCurrent(i);
              setFading(true);
              setTimeout(() => { setPrev(null); setFading(false); }, FADE_DURATION);
            }}
            aria-label={`স্লাইড ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">{hero.title}</h1>
        <p className="hero-subtitle">{hero.subtitle}</p>
        <p className="hero-description">{hero.description}</p>
        <div className="hero-buttons">
          <a
            href={hero.ctaPrimary.href}
            className="btn-primary"
            onClick={(e) => handleScroll(e, hero.ctaPrimary.href)}
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="btn-outline"
            onClick={(e) => handleScroll(e, hero.ctaSecondary.href)}
          >
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
