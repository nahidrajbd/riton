import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setPageMeta, resetHomeMeta } from "../utils/seo";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setPageMeta({
      title: "পেজ পাওয়া যায়নি | মাহফুজুর রহমান রিটন",
      description:
        "দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। মাহফুজুর রহমান রিটনের অফিসিয়াল ওয়েবসাইটের হোম পেজে ফিরে যান।",
      path: "/404",
    });
    return () => {
      resetHomeMeta();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container legal-page-inner">
          <h1 className="legal-page-title">পেজ পাওয়া যায়নি</h1>
          <p className="legal-page-updated">404</p>
          <div className="divider" />
          <div className="legal-page-content">
            <p>
              দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। লিংকটি ভুল হতে
              পারে অথবা পেজটি সরানো হয়েছে।
            </p>
            <p>
              <Link to="/">হোম পেজে ফিরে যান</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
