import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  MapPin, 
  Compass, 
  Calendar, 
  Users, 
  Navigation,
  Car,
  ChevronRight,
  Info,
  Phone
} from "lucide-react";
import SEO from "../components/SEO";
import { sendInquiry, validateForm } from "../utils/emailService";

// Beautiful generated photorealistic destination images
import imgManali from "../assets/images/dest_manali_1780995129043.png";
import imgShimla from "../assets/images/dest_shimla_1780995173406.png";
import imgKasol from "../assets/images/dest_kasol_1780995189614.png";
import imgLadakh from "../assets/images/dest_ladakh_1780995210977.png";
import imgSrinagar from "../assets/images/dest_srinagar_1780995225743.png";
import imgMussoorie from "../assets/images/dest_mussoorie_1780995238603.png";
import imgNainital from "../assets/images/dest_nainital_1780995254561.png";
import imgJaipur from "../assets/images/dest_jaipur_1780995268990.png";
import imgUdaipur from "../assets/images/dest_udaipur_1780995284984.png";

// Vehicle Data
const vehicles = [
  {
    name: "Hatchback",
    tagline: "Swift & Agile",
    desc: "Perfect for budget-friendly commercial travel. Features popular compacts like Maruti Suzuki Swift.",
    image: "/images/hatchback.svg",
    features: ["4 Seats", "1 Large Bag", "Air Conditioned", "Affordable fares"]
  },
  {
    name: "Sedan",
    tagline: "Standard & Comfortable",
    desc: "Reliable choice for small families and standard commutes, featuring classic economy sedans like Maruti Suzuki Dzire and Toyota Etios.",
    image: "/images/sedan.svg",
    features: ["4 Seats", "2 Bags", "Air Conditioned", "Economy Fares"]
  },
  {
    name: "SUV",
    tagline: "Spacious & Premium",
    desc: "Robust utility vehicle ideal for group mountain trips, featuring premium models like Toyota Innova Crysta.",
    image: "/images/suv.svg",
    features: ["6-7 Seats", "3+ Large Bags", "Himalayan Capable", "Premium Suspension"]
  }
];

// Curated 9 Destinations for Home Summary
const topDestinations = [
  { name: "Manali", desc: "Gateway to adventure, high altitude passes, and majestic Solang Valley vistas.", image: imgManali },
  { name: "Shimla", desc: "Unwind on the historic Ridge Mall Road amidst colonial charm and pine woods.", image: imgShimla },
  { name: "Kasol", desc: "A vibrant riverside sanctuary nested in the serene soul of the Parvati Valley.", image: imgKasol },
  { name: "Leh Ladakh", desc: "A mesmerizing desert landscape surrounded by crystal high-altitude lake horizons.", image: imgLadakh },
  { name: "Srinagar", desc: "Glide along the enchanting Dal Lake in custom hand-made cedar houseboats.", image: imgSrinagar },
  { name: "Mussoorie", desc: "Soak in infinite clouds and misty valley roads from the high-altitude Mall Road range.", image: imgMussoorie },
  { name: "Nainital", desc: "Embark on pristine rowing trips within the beautiful emerald pear-shaped mountain lake.", image: imgNainital },
  { name: "Jaipur", desc: "Discover majestic Rajput architecture, terracotta palaces, and rich cultural forts.", image: imgJaipur },
  { name: "Udaipur", desc: "Witness romantic lakeside sunsets reflecting off pristine white marble palaces.", image: imgUdaipur }
];

// Why Choose Cabnix features with premium lucide icons
const features = [
  { icon: ShieldCheck, title: "Verified Drivers", text: "Every pilot goes through multi-level background checks and custom behavior training." },
  { icon: Sparkles, title: "Sanitized Vehicles", text: "Deep sanitization cycles before and after every booking for complete peace of mind." },
  { icon: Clock, title: "24×7 Support", text: "A dedicated operations desk ready to assist with real-time tracking and custom routing." },
  { icon: CheckCircle, title: "Transparent Pricing", text: "Zero surprises. Tolls, fuel, and driver details visible upfront inside clear estimates." },
  { icon: Navigation, title: "GPS Enabled Trips", text: "Continuous satellite tracking and remote distress triggers for passenger safety." },
  { icon: Car, title: "On-Time Pickup", text: "Highly automated dispatch networks ensuring absolute punctuality at your doorstep." },
  { icon: ShieldCheck, title: "No Hidden Charges", text: "The fare you see is the final fare, fully all-inclusive of general state taxes." },
  { icon: Compass, title: "Flexible Travel Plans", text: "Easily modify dates, add multi-city stops, or pivot itineraries on the go." }
];

export default function Home() {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pickupCity: "",
    destination: "",
    travelDate: "",
    numberOfTravellers: "1"
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    // Validation
    const validationError = validateForm(formData);
    if (validationError) {
      setErrorMsg(validationError);
      setLoading(false);
      return;
    }

    try {
      await sendInquiry(formData);
      setSuccess(true);
      // Reset form fields
      setFormData({
        name: "",
        mobile: "",
        email: "",
        pickupCity: "",
        destination: "",
        travelDate: "",
        numberOfTravellers: "1"
      });
    } catch (err) {
      setErrorMsg(err.message || "An issue occurred during transmission.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (destName) => {
    // Navigate with pre-filled destination query state
    navigate("/plan", { state: { prefilledDestination: destName } });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SEO 
        title="Reliable Cab Services Across North India" 
        description="Comfortable, premium intercity rides with Cabnix. Travel with verified drivers in Hatchbacks, Sedans, or SUVs." 
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 bg-gradient-to-b from-[#1F6E6E]/10 via-[#F8F9FA] to-[#F8F9FA] overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[#1F6E6E]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-10%] w-[35%] h-[35%] bg-accent/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>The Premier Travel Choice in North India</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#2D3436] leading-[1.15]">
                Reliable Cab Services <br className="hidden sm:inline" />
                <span className="text-primary relative inline-block">
                  Across North India
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-accent/20 rounded-full" />
                </span>
              </h1>
              
              <p className="text-lg text-[#2D3436]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Travel comfortably with Cabnix. Choose from Hatchback, Sedan, and SUV rides for one-way trips, round trips, airport transfers, and customized journeys.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  to="/plan"
                  className="bg-primary text-white hover:bg-[#154c4c] text-center font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Plan My Trip
                </Link>
                <Link
                  to="/contact"
                  className="bg-white text-[#2D3436] hover:bg-gray-100 border border-gray-200 text-center font-semibold px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>

              {/* Trust Badge Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200/60 max-w-md mx-auto lg:mx-0">
                <div>
                  <h4 className="text-2xl font-bold text-primary">100%</h4>
                  <p className="text-[#2D3436]/65 text-xs">Punctuality Record</p>
                </div>
                <div className="border-x border-gray-200">
                  <h4 className="text-2xl font-bold text-primary">5.0★</h4>
                  <p className="text-[#2D3436]/65 text-xs">Driver Rating Avg</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-primary">Verified</h4>
                  <p className="text-[#2D3436]/65 text-xs">Vehicles & Staff</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Enquiry Form (Replaces Hero Visual Mockup containing the pink box image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-lg mx-auto z-20"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-[32px] transform rotate-2 scale-[1.01] -z-10" />
              <div className="bg-white/95 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-2xl p-6 sm:p-8 border border-gray-200 relative space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest pl-1">
                      Quick Travel Quote
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Active Lead-Desk
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#2D3436] tracking-tight mt-1">
                    Book or Request Callback
                  </h3>
                  <p className="text-xs text-[#2D3436]/65 mt-1">
                    Complete your travel metrics and our team will text or call you back instantly.
                  </p>
                </div>

                {/* State Feedbacks */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 text-xs font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Success! Our dispatch coordinator will call you back right away.</span>
                  </motion.div>
                )}

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2"
                  >
                    <Info className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name field */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Arnav Roy"
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Mobile field */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 9876543210"
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., name@gmail.com"
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Travel Date */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                      />
                    </div>

                    {/* Pickup City */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Pickup Address / City
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="pickupCity"
                          value={formData.pickupCity}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Delhi Airport, Chandigarh"
                          className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-9 pr-3.5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Destination City */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Destination City
                      </label>
                      <div className="relative">
                        <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Manali, Shimla, Jaipur"
                          className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-9 pr-3.5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travelers select */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Number of Travellers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        name="numberOfTravellers"
                        value={formData.numberOfTravellers}
                        onChange={handleInputChange}
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-9 pr-3.5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer appearance-none"
                      >
                        <option value="1">1 Traveler</option>
                        <option value="2">2 Travelers</option>
                        <option value="3">3 Travelers</option>
                        <option value="4">4 Travelers</option>
                        <option value="5">5 Travelers</option>
                        <option value="6">6 Travelers</option>
                        <option value="7+">7+ Travelers (Requires SUV)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-[#154c4c] disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 mt-2 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <span>Request Ride Proposal</span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. OUR FLEET */}
      <section className="bg-white py-24 border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Engineered for Elegance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3436]">
              Choose Your Signature Fleet Class
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75">
              Select from three premium tiers optimized to cater to distinct payload requirements, passenger volume, and long-range comfort standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((v, idx) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card glass-card-hover rounded-[24px] overflow-hidden group flex flex-col h-full"
              >
                {/* Visual */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={v.image}
                    alt={`${v.name} vehicle model`}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                    {v.tagline}
                  </div>
                </div>

                {/* Info and action */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-[#2D3436]">
                      {v.name}
                    </h3>
                    <p className="text-sm text-[#2D3436]/75 leading-relaxed">
                      {v.desc}
                    </p>
                    
                    <div className="border-t border-gray-200/80 pt-4 mt-2">
                      <h4 className="text-xs font-semibold text-[#2D3436]/50 uppercase tracking-widest mb-3">Specifications Included:</h4>
                      <ul className="grid grid-cols-2 gap-y-2 gap-x-1">
                        {v.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-xs text-[#2D3436]/80 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(v.name)}
                    className="w-full bg-white hover:bg-primary hover:text-white text-primary border border-primary/20 text-center font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white"
                  >
                    <span>Instant Ride Proposal</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="bg-[#F8F9FA] py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Explore Without Limits
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3436]">
              Popular Himalayan & Tourist Junctions
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75">
              Secure effortless transfers to these high-traffic tourist destinations from any pickup address. Fully structured for steep terrains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDestinations.map((d, index) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card glass-card-hover rounded-[24px] overflow-hidden flex flex-col group h-full"
              >
                {/* Picture */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={d.image}
                    alt={`Scenic vista of ${d.name}`}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[#2D3436] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>North India Destination</span>
                  </span>
                </div>

                {/* Information */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-[#2D3436]">
                      {d.name}
                    </h3>
                    <p className="text-sm text-[#2D3436]/75 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleBookNow(d.name)}
                    className="w-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group border border-primary/5"
                  >
                    <span>Book Trip Now</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span>View All North India Destinations</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE CABNIX */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Unrivaled Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3436]">
              Engineered with Absolute Core Values
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75">
              Experience the distinctive Cabnix travel quality that sets us apart from standard booking agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 glass-card glass-card-hover rounded-[20px] relative group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D3436] mb-3 group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#2D3436]/75 leading-relaxed">
                    {f.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. QUICK INQUIRY CALL-OUT */}
      <section className="bg-gradient-to-b from-transparent to-[#F8F9FA]/10 py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#153e3e]/90 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-2xl relative border border-white/10 border-t-4 border-accent text-center p-8 sm:p-12">
            
            {/* Visual element highlights */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-accent text-xs font-semibold uppercase tracking-widest bg-white/5 py-1 px-4 rounded-full">
                Active Hotline Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Require a Dedicated Customized Route Plan?
              </h2>
              <p className="text-sm text-gray-300">
                Our operations team is available 24/7. Call our customer hotline or chat with us on WhatsApp to finalize special route requests, wedding events, or customized tour packages instantly!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <a
                  href="tel:+919718777716"
                  className="bg-accent text-primary hover:bg-[#ffcd57] font-extrabold text-sm uppercase px-8 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 97187 77716</span>
                </a>
                <a
                  href="https://wa.me/919718777716"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 text-white hover:bg-white/15 border border-white/20 font-bold text-sm px-8 py-4 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
