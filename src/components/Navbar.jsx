import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Services", path: "/services" },
    { name: "Routes", path: "/routes" },
    { name: "Contact", path: "/contact" },
  ];

  const activeStyle = ({ isActive }) =>
    `relative text-sm font-medium transition-colors py-2 ${
      isActive
        ? "text-primary font-semibold"
        : "text-[#2D3436] hover:text-primary"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation Link items */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={activeStyle}>
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transition-all duration-300" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Action Call Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919718777716"
              className="flex items-center gap-2 text-sm font-semibold text-primary px-3 py-2 border border-primary/20 rounded-full hover:bg-primary/5 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 97187 77716</span>
            </a>
            <Link
              to="/plan"
              className="bg-primary text-white hover:bg-opacity-95 text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Plan My Trip
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+919718777716"
              className="p-2 border border-primary/10 rounded-full text-primary hover:bg-primary/5"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-[#2D3436] hover:bg-black/5 hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white text-[#2D3436] p-6 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <Logo showText={true} />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-primary/5 text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium py-2 transition-colors ${
                  isActive ? "text-primary border-l-4 border-primary pl-3 font-semibold" : "text-[#2D3436] hover:text-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="border-t border-gray-100 my-4" />
          <Link
            to="/plan"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-white text-center font-semibold py-4 rounded-xl shadow-md block"
          >
            Plan My Trip
          </Link>
          <a
            href="tel:+919718777716"
            className="flex items-center justify-center gap-2 text-primary font-bold py-3 border border-primary/20 rounded-xl"
          >
            <Phone className="w-4 h-4" />
            <span>+91 97187 77716</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </nav>
  );
}
