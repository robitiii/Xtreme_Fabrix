import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bed, Square, Armchair, Sparkles, Building2 } from "lucide-react";
import couchImage from "@/assets/couch.png";
import bedImage from "@/assets/bed-service.jpg";
import carpetImage from "@/assets/mat-service.png";
import aboutImage from "@/assets/about_image.png";
import houseInteriorImage from "@/assets/House_interior.jpg";
import commercialCleaningImage from "@/assets/comercial_cleaning.jpg";
import showerCleaningImage from "@/assets/shower_cleaning.jpg";
import windowCleaningImage from "@/assets/window_cleaning.jpg";
import furnitureCareImage from "@/assets/furniture-care.jpg";
import fabricCleaningImage from "@/assets/fabric_cleaning.jpg";

interface Service {
  title: string;
  description: string;
  icon: any;
  image: string;
  details: string;
  features: string[];
}

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      title: "Couches (Cleaning & Care)",
      description: "Gentle, professional cleaning for fabric and leather couches to refresh and protect your living spaces.",
      icon: Armchair,
      image: couchImage,
      details: "We provide deep cleaning and care for fabric and leather couches, removing dirt, oils, and everyday buildup while protecting the materials and colour of your furniture.",
      features: [
        "Deep cleaning for fabric and leather couches",
        "Targeted stain and spill treatment",
        "Odor neutralisation and freshness",
        "Allergen and dust removal",
        "After-care guidance to keep couches looking new",
      ],
    },
    {
      title: "Beds (Deep Cleaning & Stain Removal)",
      description: "Deep mattress and bed cleaning for a healthier, fresher night's sleep.",
      icon: Bed,
      image: bedImage,
      details: "Our bed cleaning service targets sweat, spills, stains, and allergens in your mattress and base, helping to create a cleaner, more hygienic sleeping environment.",
      features: [
        "Deep mattress cleaning and sanitising",
        "Sweat, spill, and body oil stain removal",
        "Dust-mite and allergen reduction",
        "Deodorising for long-lasting freshness",
        "Suitable for all bed sizes and types",
      ],
    },
    {
      title: "Carpets & Rugs (Wash, Steam Clean, Odor Removal)",
      description: "Professional carpet and rug cleaning, including stain and odor removal.",
      icon: Square,
      image: carpetImage,
      details: "We restore carpets and rugs with deep cleaning methods that lift dirt, revive fibres, and tackle stubborn marks and smells in both homes and commercial spaces.",
      features: [
        "Hot water extraction / steam cleaning options",
        "Spot and stain treatment",
        "Odor and pet smell neutralisation",
        "Suitable for rugs, runners, and wall-to-wall carpets",
        "Flexible scheduling for busy households and offices",
      ],
    },
    {
      title: "Full House Cleaning (Complete Residential Cleaning)",
      description: "Top-to-bottom residential cleaning tailored to your home.",
      icon: Sparkles,
      image: houseInteriorImage,
      details: "A comprehensive cleaning service for your entire home, from living areas and bedrooms to kitchens and bathrooms, designed to leave every room feeling fresh and cared for.",
      features: [
        "Detailed cleaning of all main living areas",
        "Kitchen and bathroom deep cleaning options",
        "Floors vacuumed and mopped throughout",
        "Surfaces dusted and wiped down",
        "Custom schedules for weekly, bi-weekly, or once-off cleans",
      ],
    },
    {
      title: "Commercial Cleaning (Offices, Retail, Business Spaces)",
      description: "Professional cleaning for offices, retail, and shared business spaces.",
      icon: Building2,
      image: commercialCleaningImage,
      details: "We support businesses with discreet, reliable cleaning services that keep workplaces presentable, hygienic, and welcoming for staff and clients.",
      features: [
        "Office, retail, and shared space cleaning",
        "After-hours and scheduled cleaning options",
        "Restrooms and kitchens cleaned and sanitised",
        "Floors, windows, and high-touch areas maintained",
        "Tailored solutions for your specific business needs",
      ],
    },
    {
      title: "Window Cleaning (Interior & Exterior)",
      description: "Crystal-clear windows for homes and commercial properties.",
      icon: Sparkles,
      image: windowCleaningImage,
      details: "Our window cleaning service focuses on streak-free finishes for both interior and exterior glass, improving natural light and overall appearance.",
      features: [
        "Interior and exterior window cleaning",
        "Streak-free, polished finish",
        "Suitable for homes, apartments, and offices",
        "Frames and sills wiped where accessible",
        "Flexible booking for regular maintenance cleans",
      ],
    },
    {
      title: "Headboards (Fabric & Leather Cleaning)",
      description: "Specialised cleaning for upholstered and leather headboards.",
      icon: Bed,
      image: fabricCleaningImage,
      details: "We gently clean and refresh upholstered and leather headboards, removing marks, dust, and buildup while caring for delicate finishes.",
      features: [
        "Fabric and leather headboard cleaning",
        "Spot and stain treatment",
        "Dust and allergen removal",
        "Suitable for fixed and free-standing headboards",
        "Discreet, in-home service",
      ],
    },
    {
      title: "Rubber Flooring (Cleaning, Polishing & Maintenance)",
      description: "Deep cleaning and care for rubber flooring in homes and commercial spaces.",
      icon: Square,
      image: carpetImage,
      details: "Our rubber flooring service cleans, maintains, and helps preserve the look and performance of rubber surfaces in gyms, play areas, and high-traffic spaces.",
      features: [
        "Rubber floor washing and sanitising",
        "Polishing and sheen restoration where appropriate",
        "Helps maintain slip-resistant properties",
        "Ideal for gyms, studios, and high-traffic areas",
        "Tailored maintenance plans available",
      ],
    },
    {
      title: "Antique Furniture Care (Delicate, Specialized Cleaning)",
      description: "Careful cleaning for antique and delicate furniture pieces.",
      icon: Sparkles,
      image: furnitureCareImage,
      details: "We treat antique and delicate furniture with extra care, using suitable techniques to clean surfaces while respecting original finishes and character.",
      features: [
        "Gentle cleaning methods for delicate pieces",
        "Attention to joins, trims, and details",
        "Advice on ongoing care and preservation",
        "Ideal for heirloom and statement furniture",
        "Discreet, on-site service where possible",
      ],
    },
    {
      title: "Shower Cleaning (Deep Lime Scale & Mold Removal)",
      description: "Targeted shower and bathroom cleaning focusing on lime scale and mold.",
      icon: Sparkles,
      image: showerCleaningImage,
      details: "A focused deep clean for showers and wet areas, targeting built-up soap scum, lime scale, and mold to restore a brighter, fresher bathroom.",
      features: [
        "Lime scale and soap scum removal",
        "Mold and mildew treatment on tiles and grout",
        "Glass and chrome polishing",
        "Suitable for residential and commercial bathrooms",
        "Great as part of a wider deep cleaning service",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cleaning & Furniture Care Services | Xtreme Fabrix Solutions</title>
        <meta
          name="description"
          content="Premium home, furniture, and commercial cleaning services in Cape Town. Couches, beds, carpets and rugs, full house and commercial cleaning, windows, headboards, rubber flooring, antique furniture care, and shower deep cleaning."
        />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-card to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Premium home, furniture, and commercial cleaning services tailored to your space.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ServiceCard
                    {...service}
                    onClick={() => setSelectedService(service)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl font-black mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Book a consultation and receive a detailed quote for your project
              </p>
              <Link to="/booking">
                <Button size="lg" variant="cta">
                  Request Free Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Service Details Dialog */}
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black">
                    {selectedService.title}
                  </DialogTitle>
                  <DialogDescription className="text-lg">
                    {selectedService.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-muted-foreground">{selectedService.details}</p>
                  <div>
                    <h4 className="font-bold text-lg mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/booking" onClick={() => setSelectedService(null)}>
                    <Button className="w-full" variant="cta">
                      Request Quote for This Service
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Services;
