import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Services", path: "/services" },
    { name: "Routes", path: "/routes" },
    { name: "Contact Us", path: "/contact" },
    { name: "Plan My Trip", path: "/plan" },
  ];

  const categories = [
    { name: "One Way Trip", path: "/services" },
    { name: "Round Trip", path: "/services" },
    { name: "Airport Transports", path: "/services" },
    { name: "Multi-Day Rental", path: "/services" },
    { name: "Corporate Travel", path: "/services" },
    { name: "Custom Travel Plan", path: "/services" },
  ];

  return (
    <footer className="bg-[#153e3e]/95 backdrop-blur-xl text-[#F8F9FA] pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Introduction */}
          <div className="space-y-6">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-block">
              <Logo light={true} />
            </Link>
            <p className="text-white/75 text-sm leading-relaxed max-w-xs">
              Travel comfortably and securely across North India with Cabnix. Premium Hatchback, Sedan, and SUV rides tailored to your schedule.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-accent hover:text-black rounded-full transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-accent hover:text-black rounded-full transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-accent hover:text-black rounded-full transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-accent hover:text-black rounded-full transition-all" aria-label="Linkedin">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-accent font-semibold text-lg tracking-wide mb-6">Quick Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-white/80 hover:text-accent text-sm flex items-center gap-1 group transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-0.5 group-hover:-translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Portfolio */}
          <div>
            <h3 className="text-accent font-semibold text-lg tracking-wide mb-6">Our Services</h3>
            <ul className="space-y-3">
              {categories.map((serv, idx) => (
                <li key={idx}>
                  <Link
                    to={serv.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-white/80 hover:text-accent text-sm flex items-center gap-1 group transition-colors"
                  >
                    <span>{serv.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-0.5 group-hover:-translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Contacts */}
          <div>
            <h3 className="text-accent font-semibold text-lg tracking-wide mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm leading-relaxed">
                  Delhi NCR & major cities across North India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+919718777716" className="text-white/80 hover:text-accent text-sm font-medium transition-colors">
                  +91 97187 77716
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:cabnix01@gmail.com" className="text-white/80 hover:text-accent text-sm font-medium transition-colors">
                  cabnix01@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-white/50 text-xs gap-4">
          <p>© {new Date().getFullYear()} Cabnix Car Rental. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cancellation Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
