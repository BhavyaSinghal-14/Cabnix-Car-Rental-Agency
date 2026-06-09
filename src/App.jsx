import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Services from "./pages/Services";
import RoutesPage from "./pages/Routes";
import Contact from "./pages/Contact";
import PlanMyTrip from "./pages/PlanMyTrip";

// Scroll To Top Utility for Route Transitions
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" // Instant reset for smooth frame transitions
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      {/* Background Decorative Elements for Frosted Glass Theme */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[-150px] w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-50px] right-[-100px] w-[350px] h-[350px] bg-[#F4B942]/15 rounded-full blur-2xl pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />

      <ScrollToTop />
      
      {/* Premium Glassmorphic Header Menu */}
      <Navbar />

      {/* Main Page Swapper Frame with micro animation transitions */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/services" element={<Services />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/plan" element={<PlanMyTrip />} />
              {/* Fallback routing */}
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating high-conversion contact prompt */}
      <WhatsAppButton />

      {/* Premium Dark Brand Footer */}
      <Footer />
    </div>
  );
}
