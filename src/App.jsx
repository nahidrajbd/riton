import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import InspiringLeaders from "./components/InspiringLeaders";
import CurrentPosition from "./components/CurrentPosition";
import Timeline from "./components/Timeline";
import Background from "./components/Background";
import Movement from "./components/Movement";
import Rajshahi from "./components/Rajshahi";
import Gallery from "./components/Gallery";
import Updates from "./components/Updates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LeaderPage from "./components/LeaderPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Complaint from "./components/Complaint";
import NotFound from "./components/NotFound";
import { resetHomeMeta } from "./utils/seo";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    resetHomeMeta();
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InspiringLeaders />
        <About />
        <CurrentPosition />
        <Timeline />
        <Background />
        <Movement />
        <Rajshahi />
        <Gallery />
        <Updates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/leader/:slug" element={<LeaderPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/complaint" element={<Complaint />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
