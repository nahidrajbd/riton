import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import InspiringLeaders from "./components/InspiringLeaders";
import CurrentPosition from "./components/CurrentPosition";
import Timeline from "./components/Timeline";
import LeadershipHighlights from "./components/LeadershipHighlights";
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

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InspiringLeaders />
        <About />
        <CurrentPosition />
        <Timeline />
        <LeadershipHighlights />
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leader/:slug" element={<LeaderPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  );
}
