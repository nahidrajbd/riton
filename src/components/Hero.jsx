import { hero, images } from "../data/content";

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section" aria-label="হিরো ব্যানার">
      {/* Background */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${images.hero})` }}
        role="img"
        aria-label="মাহফুজুর রহমান রিটন — পটভূমি"
      />
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge">রাজশাহী সিটি কর্পোরেশন</div>
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
