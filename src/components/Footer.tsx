import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-black tracking-tight">
              <span className="text-foreground">XTREME</span>
              <span className="text-primary ml-1">FABRIX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium automotive upholstery and interior restoration experts in Cape Town.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Seat Reupholstery</li>
              <li className="text-sm text-muted-foreground">Leather Restoration</li>
              <li className="text-sm text-muted-foreground">Roof Lining</li>
              <li className="text-sm text-muted-foreground">Soundproofing</li>
              <li className="text-sm text-muted-foreground">Dashboard Repairs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cape Town, South Africa</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+27720366449" className="hover:text-primary transition-colors">
                  +27 72 036 6449
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:xtremefabrix@gmail.com" className="hover:text-primary transition-colors">
                  xtremefabrix@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Mon-Sat: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Xtreme Fabrix Solutions. All rights reserved. Created by{' '}
            <a
              href="https://robq.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-blue-400 transition-colors"
            >
              RobQTech
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
