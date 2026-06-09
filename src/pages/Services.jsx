import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowRightLeft, 
  RefreshCw, 
  Plane, 
  CalendarDays, 
  Briefcase, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  Sliders,
  BadgeCheck
} from "lucide-react";
import SEO from "../components/SEO";

const servicesList = [
  {
    icon: ArrowRightLeft,
    title: "One Way Trip",
    desc: "Seamless point-to-point transfers across all cities. Pay only for the distance traveled one way, without any return-carriage fare penalties or hidden distance margins.",
    cta: "Book One-Way Ride"
  },
  {
    icon: RefreshCw,
    title: "Round Trip",
    desc: "Plan multi-stop travel itineraries with absolute peace of mind. Your vehicle stays with you for comfortable detours, scenic stops, and hassle-free returns.",
    cta: "Schedule Round Trip"
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop",
    desc: "Guaranteed punctual transfers to and from IGI Delhi and domestic terminals. Includes real-time flight tracking, toll inclusion, and driver greet-and-assist.",
    cta: "Reserve Airport Ride"
  },
  {
    icon: CalendarDays,
    title: "Multi-Day Rental",
    desc: "Reserve a dedicated car and driver for your holiday or extended travels. Tailor-made for regional family events, corporate tours, and heavy vacation loops.",
    cta: "Hire Multi-Day Car"
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    desc: "Dependable commutes optimized for corporate staff and business travel. Standard clean sedans, priority dispatch, premium billing logs, and highly professional service.",
    cta: "Contact Corporate Desk"
  },
  {
    icon: Sparkles,
    title: "Custom Travel Plan",
    desc: "Design your optimal road trip across the hill stations and tourist circuits. Modify intermediate routes and set flexible durations in consultation with our staff.",
    cta: "Request Custom Route"
  }
];

export default function Services() {
  const navigate = useNavigate();

  const handleCtaClick = (serviceTitle) => {
    navigate("/plan", { state: { selectedService: serviceTitle } });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SEO 
        title="Premium Cab Services & Fleet Portfolios" 
        description="Select from One-Way drop rides, scheduled round trips, terminal airport transfers, corporate contracts, and custom tour packages with Cabnix." 
      />

      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
              Tailored Travel Portfolios
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2D3436]">
              Exclusive Cab Services
            </h1>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-[#2D3436]/75 text-base sm:text-lg">
              We focus entirely on providing pristine, dedicated automobile rentals. Explore our specialized services built around security, speed, and premium cabin comfort.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {servicesList.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card glass-card-hover rounded-[24px] p-8 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-6">
                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Headline and text */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold tracking-tight text-[#2D3436] group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-sm text-[#2D3436]/75 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <button
                    onClick={() => handleCtaClick(service.title)}
                    className="w-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold py-3.5 px-4 rounded-xl mt-8 flex items-center justify-center gap-2 group border border-primary/5 cursor-pointer"
                  >
                    <span>{service.cta}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Safety & Standards Section */}
          <div className="glass-panel rounded-[32px] overflow-hidden p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-primary font-bold tracking-widest text-xs uppercase bg-[#1F6E6E]/5 px-4 py-1.5 rounded-full">
                  Service Standards
                </span>
                <h2 className="text-3xl font-extrabold text-[#2D3436] tracking-tight">
                  Premium Experience Guaranteed On Every Journey
                </h2>
                <p className="text-sm text-[#2D3436]/75 leading-relaxed">
                  We are specialized strictly in superior passenger relocation, guaranteeing optimized travel layouts, structural safety checks, clean interiors, and premium amenities in every vehicle class.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex gap-3 items-start">
                    <BadgeCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-[#2D3436]/80 font-medium">Pre-routed safety checks</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <BadgeCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-[#2D3436]/80 font-medium">Free Wi-Fi & device chargers</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <BadgeCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-[#2D3436]/80 font-medium">Complimentary water bottles</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <BadgeCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-[#2D3436]/80 font-medium">GPS tracked panic features</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-[#1F6E6E]/5 rounded-[24px] transform -rotate-2 scale-[1.02]" />
                <img
                  src="/images/road_scenery.svg"
                  alt="Scenic mountain road scenery with premium car"
                  className="rounded-[20px] shadow-lg relative z-10 w-full h-[280px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
