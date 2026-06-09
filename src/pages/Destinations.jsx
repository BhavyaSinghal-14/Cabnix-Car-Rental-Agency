import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Calendar, Compass, ArrowRight, ArrowRightCircle } from "lucide-react";
import SEO from "../components/SEO";

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

const destinationsList = [
  {
    name: "Manali",
    desc: "A breathtaking Himalayan gateway nestled in Himachal Pradesh, famous for its majestic snow peaks, cascading rivers, and adventure sports.",
    image: imgManali,
    bestTime: "October to June (Summers are pleasant, winters bring heavy snow)",
    attractions: "Solang Valley, Rohtang Pass, Hadimba Temple, Old Manali Cafes"
  },
  {
    name: "Shimla",
    desc: "The legendary former summer capital of British India, offering gorgeous colonial architectural sights, dense pine forest ridges, and snowy slopes.",
    image: imgShimla,
    bestTime: "March to June (Summer) & November to January (For snowfall)",
    attractions: "Mall Road, Christ Church, Jakhoo Temple, Kufri Ridge"
  },
  {
    name: "Kasol",
    desc: "A picturesque, chill destination along the Parvati River, highly popular for backpacking journeys, lush coniferous forests, and peaceful atmosphere.",
    image: imgKasol,
    bestTime: "September to June (Clear skies & perfect mountain breeze)",
    attractions: "Parvati River Trail, Tosh Village, Kheerganga Trek, Manikaran Gurudwara"
  },
  {
    name: "Leh Ladakh",
    desc: "High-altitude desert wonderland featuring mystical monasteries, steep passes, and pristine cobalt lakes shining brightly in deep valleys.",
    image: imgLadakh,
    bestTime: "May to September (Warm air, pristine clear roads opened for driving)",
    attractions: "Pangong Lake, Nubra Valley, Khardung La Pass, Shanti Stupa"
  },
  {
    name: "Srinagar",
    desc: "The jewel of Kashmir, famous for houseboats resting on Dal Lake, sprawling Mughal gardens, and traditional Kashmiri wooden architectural alleys.",
    image: imgSrinagar,
    bestTime: "April to October (Tulips in spring, pleasant lake cruises in summer)",
    attractions: "Dal Lake Shikara Rides, Shalimar Bagh, Nishat Bagh, Gulmarg Day Tour"
  },
  {
    name: "Mussoorie",
    desc: "The Queen of Hills, boasting sweeping high ridge panoramas of the Doon Valley and magnificent distant snow pinnacles.",
    image: imgMussoorie,
    bestTime: "April to June & September to November",
    attractions: "Kempty Falls, Gun Hill Ropeway, Lal Tibba Viewpoint, Company Garden"
  },
  {
    name: "Nainital",
    desc: "A dynamic lake city set around a gorgeous pear-shaped water body, framed by misty lush hills and legendary high viewpoints.",
    image: imgNainital,
    bestTime: "March to June & October to January",
    attractions: "Naini Lake Boating, Naina Peak, Snow View Point, Cave Gardens"
  },
  {
    name: "Jaipur",
    desc: "The stunning Pink City filled with magnificent terracotta fortress structures, vibrant palaces, and incredible culinary tradition.",
    image: imgJaipur,
    bestTime: "October to March (Pleasantly cool skies for sightseeing)",
    attractions: "Amer Fort, Hawa Mahal Palace, Jantar Mantar, City Palace Museum"
  },
  {
    name: "Udaipur",
    desc: "The breathtaking City of Lakes, featuring floating white marble palaces on Pichola Lake and stunning romantic hills.",
    image: imgUdaipur,
    bestTime: "October to March (Lakes are pristine and breezes are optimal)",
    attractions: "Lake Pichola Cruises, City Place Heights, Jag Mandir, Monsoon Palace"
  }
];

export default function Destinations() {
  const navigate = useNavigate();

  const handleBookRedirect = (destName) => {
    // Passes structural state to prefill PlanMyTrip
    navigate("/plan", { state: { prefilledDestination: destName } });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SEO 
        title="Explore North India Destinations" 
        description="Plan your next mountain or plain vacation with Cabnix. Outstation cab bookings to Manali, Shimla, Kasol, Leh, Kashmir, Jaipur, and Udaipur." 
      />

      {/* Main Container */}
      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Explore Our Territory
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2D3436]">
              Destinations We Serve
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75 text-base sm:text-lg">
              Cabnix offers reliable, point-to-point outstation services to these stunning tourist hubs across Northern India. Travel stress-free in our premium terrain-ready fleet.
            </p>
          </div>

          {/* Grid Layout of Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsList.map((dest, idx) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card glass-card-hover rounded-[24px] overflow-hidden flex flex-col justify-between group h-full"
              >
                
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`Scenic overlook of ${dest.name}`}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-[#2D3436] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>North India Outstation</span>
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436] tracking-tight group-hover:text-primary transition-colors">
                      {dest.name}
                    </h2>
                    <p className="text-sm text-[#2D3436]/75 leading-relaxed">
                      {dest.desc}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      {/* Best Season */}
                      <div className="flex items-start gap-2.5 text-xs">
                        <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#2D3436] font-semibold block">Best Time to Visit:</strong>
                          <span className="text-[#2D3436]/70 leading-relaxed font-normal">{dest.bestTime}</span>
                        </div>
                      </div>

                      {/* Attractions */}
                      <div className="flex items-start gap-2.5 text-xs">
                        <Compass className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#2D3436] font-semibold block">Popular Attractions:</strong>
                          <span className="text-[#2D3436]/70 leading-relaxed font-normal">{dest.attractions}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Link */}
                  <button
                    onClick={() => handleBookRedirect(dest.name)}
                    className="w-full bg-primary text-white hover:bg-[#154c4c] text-center font-bold py-4 rounded-xl shadow-md transition-all duration-300 mt-2 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Book Trip to {dest.name}</span>
                    <ArrowRightCircle className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>

                </div>

              </motion.div>
            ))}
          </div>

          {/* Quick Helpline Indicator */}
          <div className="mt-16 glass-card rounded-[24px] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#2D3436]">Looking for a custom multi-destination route?</h3>
              <p className="text-sm text-[#2D3436]/75">Our dispatch specialists can map custom hill station circuits, corporate pickups, and long-range multi-day plans.</p>
            </div>
            <a
              href="mailto:cabnix01@gmail.com?subject=Custom Tour Inquiry"
              className="bg-primary text-white px-8 py-3.5 rounded-full font-bold shadow-md hover:bg-[#154c4c] transition-all"
            >
              Consult Cabin Staff
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
