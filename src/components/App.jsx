import {useState} from "preact/hooks";
import GrainOverlay from "./layout/GrainOverlay.jsx";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import Team from "./sections/Team.jsx";
import Services from "./sections/Services.jsx";
import Contact from "./sections/Contact.jsx";

export default function App() {
    const [adminOpen, setAdminOpen] = useState(false);
  return (
    <>
        <GrainOverlay />
        <Header />
        <Hero />
        <Team />
        <Services />
        <Contact />
        <Footer onOpenAdmin={() => setAdminOpen(true)} />
    </>
  )
}
