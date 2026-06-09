import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Compass, 
  Users, 
  Car, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  Info,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";
import SEO from "../components/SEO";
import { sendInquiry, validateForm } from "../utils/emailService";

export default function PlanMyTrip() {
  const routerLocation = useLocation();
  const prefill = routerLocation.state || {};

  // Form State initialized with optional prefilled state
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pickupLocation: prefill.prefilledPickup || "",
    destination: prefill.prefilledDestination || "",
    travelDate: "",
    returnDate: "",
    vehicleType: prefill.prefilledVehicle || "Sedan",
    numberOfTravellers: "1",
    specialRequirements: ""
  });

  // Dynamically update prefilled state if user navigated here with fresh parameters
  useEffect(() => {
    if (routerLocation.state) {
      setFormData(prev => ({
        ...prev,
        pickupLocation: routerLocation.state.prefilledPickup || prev.pickupLocation,
        destination: routerLocation.state.prefilledDestination || prev.destination,
        vehicleType: routerLocation.state.prefilledVehicle || prev.vehicleType,
        specialRequirements: routerLocation.state.selectedService 
          ? `Booking specific service tier: ${routerLocation.state.selectedService}` 
          : prev.specialRequirements
      }));
    }
  }, [routerLocation.state]);

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
    const validationError = validateForm({
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email
    });

    if (validationError) {
      setErrorMsg(validationError);
      setLoading(false);
      return;
    }

    // Comprehensive Travel Date Check
    if (formData.travelDate && new Date(formData.travelDate) < new Date(new Date().setHours(0,0,0,0))) {
      setErrorMsg("Travel date cannot be in the past.");
      setLoading(false);
      return;
    }
    if (formData.returnDate && formData.travelDate && new Date(formData.returnDate) < new Date(formData.travelDate)) {
      setErrorMsg("Return date must be equal or subsequent to your departure date.");
      setLoading(false);
      return;
    }

    try {
      await sendInquiry(formData);
      setSuccess(true);
      // Reset after success
      setFormData({
        name: "",
        mobile: "",
        email: "",
        pickupLocation: "",
        destination: "",
        travelDate: "",
        returnDate: "",
        vehicleType: "Sedan",
        numberOfTravellers: "1",
        specialRequirements: ""
      });
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong during booking submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Plan My Custom Trip | Personalized Route Quotations" 
        description="Configure your custom outstation itinerary. Enter your travel dates, vehicle models (Hatchback/Sedan/SUV), passenger counts, and get instant pricing options." 
      />

      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Custom Itinerary Maker
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2D3436]">
              Plan My Trip Experience
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75 text-base sm:text-lg">
              Set your target routes, specify travel classes, and add special directions. Our operations manager will formulate optimized tariffs and submit detailed estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Form Container (Spans 7 Cols) */}
            <div className="lg:col-span-7">
              <div className="glass-panel rounded-[24px] p-8 md:p-10 relative overflow-hidden">
                
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />

                {/* State: Success Ticket Display */}
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 space-y-6 text-center text-[#2D3436]"
                  >
                    <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Your Custom Itinerary Request Dispatched!</h2>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Inquiry has been directly cataloged under ID <span className="font-mono text-primary font-semibold">#[{Math.floor(1000 + Math.random() * 9000)}]</span>. Our regional dispatch coordinator will contact you shortly on your provided mobile line.
                      </p>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-150 inline-block text-left w-full space-y-3">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Ticket Summary</h3>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <p><span className="text-gray-400">Recipient Desk:</span> <strong className="text-gray-700">cabnix01@gmail.com</strong></p>
                        <p><span className="text-gray-400">Response SLA:</span> <strong className="text-gray-700">&lt; 15 Minutes</strong></p>
                        <p><span className="text-gray-400">Operational Zone:</span> <strong className="text-gray-700">North India Outstation</strong></p>
                        <p><span className="text-gray-400">Priority:</span> <strong className="text-accent-secondary text-primary font-bold">High Express</strong></p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-primary hover:bg-[#154c4c] text-white font-bold py-3.5 px-8 rounded-xl transition shadow"
                    >
                      Plan Another Trip
                    </button>
                  </motion.div>
                ) : (
                  // Trip Planner Form
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Diagnostic Warning Alert if any */}
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2"
                      >
                        <Info className="w-5 h-5 shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    {/* Section 1: Personal Coordinates */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
                        <span>1. Personal Coordinates</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Arnav Roy"
                            className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                          />
                        </div>

                        {/* Mobile */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Mobile Number</label>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., 9718777716"
                            className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., arnav@gmail.com"
                          className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {/* Section 2: Journey Metrics */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
                        <span>2. Journey Metrics</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pickup */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Pickup Address / City</label>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                            <input
                              type="text"
                              name="pickupLocation"
                              value={formData.pickupLocation}
                              onChange={handleInputChange}
                              required
                              placeholder="e.g., New Delhi IGI Terminal 3"
                              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                          </div>
                        </div>

                        {/* Destination */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Destination Address / City</label>
                          <div className="relative">
                            <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                            <input
                              type="text"
                              name="destination"
                              value={formData.destination}
                              onChange={handleInputChange}
                              required
                              placeholder="e.g., Manali, Himachal Pradesh"
                              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                          </div>
                        </div>

                        {/* Travel Date */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Travel Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                            <input
                              type="date"
                              name="travelDate"
                              value={formData.travelDate}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                          </div>
                        </div>

                        {/* Return Date */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Return Date <span className="text-gray-400 text-[10px] font-normal">(Optional for Oneway)</span></label>
                          <div className="relative">
                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                            <input
                              type="date"
                              name="returnDate"
                              value={formData.returnDate}
                              onChange={handleInputChange}
                              placeholder="Leave blank for one way"
                              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                          </div>
                        </div>

                        {/* Vehicle Type */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Vehicle Category Tier</label>
                          <div className="relative">
                            <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                            <select
                              name="vehicleType"
                              value={formData.vehicleType}
                              onChange={handleInputChange}
                              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none cursor-pointer"
                            >
                              <option value="Hatchback">Hatchback (Standard budget commutes)</option>
                              <option value="Sedan">Sedan (Small families, standard commutes - Dzire/Etios)</option>
                              <option value="SUV">SUV (Incredible power, spacious mountain tours)</option>
                            </select>
                          </div>
                        </div>

                        {/* Travellers count */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Number Of Travellers</label>
                          <div className="relative">
                            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                            <select
                              name="numberOfTravellers"
                              value={formData.numberOfTravellers}
                              onChange={handleInputChange}
                              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none cursor-pointer"
                            >
                              <option value="1">1 Passenger</option>
                              <option value="2">2 Passengers</option>
                              <option value="3">3 Passengers</option>
                              <option value="4">4 Passengers</option>
                              <option value="5">5 Passengers</option>
                              <option value="6">6 Passengers</option>
                              <option value="7+">7+ Passengers (Fitted into premium SUVs)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Special Settings */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
                        <span>3. Custom Itinerary Parameters</span>
                      </h3>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-[#2D3436]/60 uppercase tracking-widest pl-1">Special Requirements</label>
                        <textarea
                          name="specialRequirements"
                          value={formData.specialRequirements}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="e.g., intermediate multi-city stops, night pickups, baby infant car seat request, corporate invoice mapping, etc."
                          className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-[#154c4c] disabled:bg-gray-400 text-white font-extrabold text-sm uppercase py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing Travel Estimate...</span>
                        </>
                      ) : (
                        <span>Generate Dispatch Proposal</span>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </div>

            {/* Right Column: Information Highlights (Spans 5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Premium Quality Indicators */}
              <div className="glass-card rounded-[24px] p-8 space-y-6">
                <h3 className="text-lg font-bold text-[#2D3436] tracking-tight border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>Cabnix Elite Guarantee</span>
                </h3>

                <ul className="space-y-4">
                  <li className="flex gap-3 start">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#2D3436]">Professional Navigation</h4>
                      <p className="text-xs text-[#2D3436]/70 leading-relaxed">Our drivers are veteran navigators of steep hill trails of Himachal and Kashmir range, equipped with all-weather defensive driving certificates.</p>
                    </div>
                  </li>

                  <li className="flex gap-3 start">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#2D3436]">Punctuality Shield</h4>
                      <p className="text-xs text-[#2D3436]/70 leading-relaxed">Cab arrives 15 minutes before the scheduled time. Complete trip tracking dashboard is sent to your emergency family contact.</p>
                    </div>
                  </li>

                  <li className="flex gap-3 start">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#2D3436]">Transparent Cost Modeling</h4>
                      <p className="text-xs text-[#2D3436]/70 leading-relaxed">Quotes are all-inclusive of general fuel cost, highway state entry taxes, permit fees, and municipal toll levies.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Operations Brief banner */}
              <div className="bg-[#153e3e]/90 backdrop-blur-xl rounded-[24px] p-8 text-white space-y-4 relative overflow-hidden border border-white/10 border-l-4 border-accent">
                <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
                <h3 className="text-lg font-extrabold tracking-tight">Need immediate changes?</h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Have an emergency, last-minute flight reschedule, or need to book within the next 2 hours? Call our operations room line immediately for prioritized dispatch routing.
                </p>
                <div className="pt-2">
                  <a
                    href="tel:+919718777716"
                    className="inline-flex items-center gap-2 bg-accent text-primary text-xs font-bold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    <span>Call Hotline Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
