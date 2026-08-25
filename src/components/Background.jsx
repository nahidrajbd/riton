import { useEffect, useRef } from "react";
import { personalBackground } from "../data/content";

export default function Background() {
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    if (textRef.current) observer.observe(textRef.current);
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

        <div className="background-text reveal-left" ref={textRef}>
          <p>{personalBackground.description}</p>
        </div>
      </div>
    </section>
  );
}
