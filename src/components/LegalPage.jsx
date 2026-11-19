import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setPageMeta, resetHomeMeta } from "../utils/seo";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LegalPage({ title, updated, description, path, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageMeta({
      title: `${title} | মাহফুজুর রহমান রিটন`,
      description:
        description ||
        `${title}: মাহফুজুর রহমান রিটনের অফিসিয়াল ওয়েবসাইট ritonvai.com এর ${title}।`,
      path,
    });
    return () => {
      resetHomeMeta();
    };
  }, [title, description, path]);

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
