import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    // { to: "/gallery", label: "Gallery" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-90 transition-opacity">
            <img 
              src="/xtreme-fabrix-logo.png" 
              alt="Xtreme Fabrix Solutions" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-lg sm:text-xl font-black tracking-tight">
                <span className="text-foreground">XTREME</span>
                <span className="text-primary ml-1">FABRIX</span>
              </div>
              <div className="text-xs text-foreground font-medium tracking-wide">
                SOLUTIONS
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.to) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <a href="tel:+27720366449" className="hidden xl:flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+27 72 036 6449</span>
            </a>
            <Link to="/booking">
              <Button variant="default" size="sm">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-border"
            >
              <div className="py-4 space-y-3 px-4 sm:px-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 text-base font-medium transition-colors hover:text-primary hover:bg-accent rounded-md ${
                      isActive(link.to) ? "text-primary bg-accent/50" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border pt-4 space-y-3">
                  <a href="tel:+27720366449" className="flex items-center space-x-3 py-3 px-4 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+27 72 036 6449</span>
                  </a>
                  <Link to="/booking" onClick={() => setIsOpen(false)}>
                    <Button variant="default" size="lg" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
