import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
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

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
