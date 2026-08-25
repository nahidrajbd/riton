import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LegalPage({ title, updated, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container legal-page-inner">
          <Link to="/" className="leader-back-link">
            ← হোমে ফিরুন
          </Link>
          <h1 className="legal-page-title">{title}</h1>
          <p className="legal-page-updated">সর্বশেষ হালনাগাদ: {updated}</p>
          <div className="divider" />
          <div className="legal-page-content">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
