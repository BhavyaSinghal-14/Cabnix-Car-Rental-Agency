import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Search, MapPin, BadgeCheck, Phone, HelpCircle, Car, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";

// Core routes dataset requested by user
const routesData = [
  { from: "Delhi", to: "Manali", distance: "530 km", time: "11-12 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" },
  { from: "Delhi", to: "Shimla", distance: "345 km", time: "7-8 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" },
  { from: "Delhi", to: "Jaipur", distance: "270 km", time: "5 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" },
  { from: "Delhi", to: "Nainital", distance: "300 km", time: "6-7 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" },
  { from: "Delhi", to: "Mussoorie", distance: "290 km", time: "6 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" },
  { from: "Chandigarh", to: "Srinagar", distance: "560 km", time: "13-14 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" },
  
  // Supplemental high popularity route extensions
  { from: "Delhi", to: "Kasol", distance: "510 km", time: "11 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" },
  { from: "Delhi", to: "Leh Ladakh", distance: "950 km", time: "2 Days", Hatchback: "On Request", Sedan: "On Request", SUV: "Available" },
  { from: "Delhi", to: "Udaipur", distance: "660 km", time: "11-12 hrs", Hatchback: "Available", Sedan: "Available", SUV: "Available" }
];

export default function Routes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Sedan"); // Default highlight tier

  const handleRouteBooking = (route) => {
    // Navigates with location pre-filled state
    navigate("/plan", { 
      state: { 
        prefilledPickup: route.from, 
        prefilledDestination: route.to,
        prefilledVehicle: selectedCategory 
      } 
    });
    window.scrollTo(0, 0);
  };

  // Filter routes based on search term
  const filteredRoutes = routesData.filter(r => {
    const term = searchTerm.toLowerCase();
    return r.from.toLowerCase().includes(term) || r.to.toLowerCase().includes(term);
  });

  return (
    <>
      <SEO 
        title="Popular Outstation Routes & Fleet Coverage" 
        description="Check popular outstation cab routes from Delhi and Chandigarh to Manali, Shimla, Jaipur, Nainital, and Srinagar. Fleet options include Hatchback, Sedan, SUV." 
      />

      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Core Operational Loops
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2D3436]">
              Popular Routes & Fleet Coverage
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75 text-base sm:text-lg">
              Explore our core intercity connections. Contact us to receive an immediate custom quote tailored to your timeline.
            </p>
          </div>

          {/* Interactive Control Deck */}
          <div className="glass-panel rounded-[24px] p-6 sm:p-8 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pickup or destination city..."
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Vehicle Class Highlights Toggles */}
            <div className="flex gap-2 bg-[#F8F9FA] p-1.5 rounded-xl border border-gray-200 w-full md:w-auto overflow-x-auto select-none">
              {["Hatchback", "Sedan", "SUV"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>{cat} Fleet</span>
                </button>
              ))}
            </div>
          </div>

          {/* Elegant Table / Grid for mobile */}
          <div className="glass-panel rounded-[24px] overflow-hidden mb-16">
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-primary border-b border-gray-200">
                    <th className="py-5 px-8 text-xs font-bold uppercase tracking-wider">Default Loop Route</th>
                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider">Estimated Metrics</th>
                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider">Hatchback Status</th>
                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider">Sedan Status</th>
                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider">SUV Status</th>
                    <th className="py-5 px-8 text-xs font-bold uppercase tracking-wider text-right">Instant Booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {filteredRoutes.map((route, idx) => (
                    <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                      {/* Route */}
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-[#2D3436] flex items-center gap-2">
                              <span>{route.from}</span>
                              <ArrowRight className="w-4 h-4 text-accent" />
                              <span>{route.to}</span>
                            </span>
                            <span className="text-xs text-[#2D3436]/50">Dedicated intercity outstation</span>
                          </div>
                        </div>
                      </td>

                      {/* Distance & Time */}
                      <td className="py-5 px-6">
                        <div className="text-xs font-medium text-gray-700 space-y-1">
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{route.distance} distance</span>
                          </p>
                          <p className="text-gray-400">~ {route.time} average travel</p>
                        </div>
                      </td>

                      {/* Hatchback Status */}
                      <td className={`py-5 px-6 ${selectedCategory === "Hatchback" ? "bg-primary/5" : ""}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-block w-2 h-2 rounded-full ${route.Hatchback === "Available" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          <span className={`text-sm font-bold ${selectedCategory === "Hatchback" ? "text-primary" : "text-gray-700"}`}>{route.Hatchback}</span>
                        </div>
                      </td>

                      {/* Sedan Status */}
                      <td className={`py-5 px-6 ${selectedCategory === "Sedan" ? "bg-primary/5" : ""}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-block w-2 h-2 rounded-full ${route.Sedan === "Available" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          <span className={`text-sm font-bold ${selectedCategory === "Sedan" ? "text-primary" : "text-gray-700"}`}>{route.Sedan}</span>
                        </div>
                      </td>

                      {/* SUV Status */}
                      <td className={`py-5 px-6 ${selectedCategory === "SUV" ? "bg-primary/5" : ""}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-block w-2 h-2 rounded-full ${route.SUV === "Available" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          <span className={`text-sm font-bold ${selectedCategory === "SUV" ? "text-primary" : "text-gray-700"}`}>{route.SUV}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-8 text-right">
                        <button
                          onClick={() => handleRouteBooking(route)}
                          className="bg-primary hover:bg-[#154c4c] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                        >
                          <span>Reserve Route</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Card Lists */}
            <div className="block lg:hidden divide-y divide-gray-150">
              {filteredRoutes.map((route, idx) => (
                <div key={idx} className="p-6 space-y-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-widest block mb-1">Outstation Hub</span>
                      <h3 className="text-lg font-bold text-[#2D3436] flex items-center gap-2">
                        <span>{route.from}</span>
                        <ArrowRight className="w-4 h-4 text-accent" />
                        <span>{route.to}</span>
                      </h3>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2.5 py-1 rounded-full">
                      {route.distance}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#F8F9FA] p-3 rounded-xl text-center border border-gray-150">
                    <div className={selectedCategory === "Hatchback" ? "border-2 border-primary/20 bg-white rounded-lg p-1.5 flex flex-col justify-center" : "p-1.5 flex flex-col justify-center"}>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold leading-none mb-1">Hatch</span>
                      <strong className={`text-xs font-extrabold leading-none ${route.Hatchback === "Available" ? "text-emerald-600" : "text-amber-600"}`}>{route.Hatchback}</strong>
                    </div>
                    <div className={selectedCategory === "Sedan" ? "border-2 border-primary/20 bg-white rounded-lg p-1.5 flex flex-col justify-center" : "p-1.5 flex flex-col justify-center"}>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold leading-none mb-1">Sedan</span>
                      <strong className={`text-xs font-extrabold leading-none ${route.Sedan === "Available" ? "text-emerald-600" : "text-amber-600"}`}>{route.Sedan}</strong>
                    </div>
                    <div className={selectedCategory === "SUV" ? "border-2 border-primary/20 bg-white rounded-lg p-1.5 flex flex-col justify-center" : "p-1.5 flex flex-col justify-center"}>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold leading-none mb-1">SUV</span>
                      <strong className={`text-xs font-extrabold leading-none ${route.SUV === "Available" ? "text-emerald-600" : "text-amber-600"}`}>{route.SUV}</strong>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Duration ~ {route.time}</span>
                    <button
                      onClick={() => handleRouteBooking(route)}
                      className="bg-primary text-white font-bold py-2.5 px-4 rounded-lg shadow-sm flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredRoutes.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-base font-semibold">No direct route listings match your search query.</p>
                <p className="text-sm text-gray-400 mt-1">Please use our Planner page to request custom quotes for any unlisted address!</p>
              </div>
            )}

          </div>

          {/* Pricing Policy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 glass-card glass-card-hover rounded-2xl flex gap-4 items-start">
              <BadgeCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#2D3436] mb-1">State Taxes & Tolls Included</h4>
                <p className="text-xs text-[#2D3436]/75 leading-relaxed">Your given fare proposal covers basic municipal border check fees, outstation road permits, and common highway toll levies.</p>
              </div>
            </div>
            
            <div className="p-6 glass-card glass-card-hover rounded-2xl flex gap-4 items-start">
              <BadgeCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#2D3436] mb-1">Zero Driver Overnight Costs</h4>
                <p className="text-xs text-[#2D3436]/75 leading-relaxed">No extra charge for driver overnight stay or parking. Prices are simple, transparent, and locked.</p>
              </div>
            </div>

            <div className="p-6 glass-card glass-card-hover rounded-2xl flex gap-4 items-start">
              <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#2D3436] mb-1">Hassle-Free Cancellations</h4>
                <p className="text-xs text-[#2D3436]/75 leading-relaxed">Plans changed? Free modifications up to 24 hours prior to dispatch. Zero hidden penalties or transaction deductions.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
