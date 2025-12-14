import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import PictureCarousel, { type PictureCarouselItem } from "@/components/PictureCarousel";
import { Bed, Square, Armchair, Sparkles, Building2, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import bgVideo from "@/assets/bg-video.mp4";
import couchImage from "@/assets/couch.png";
import bedImage from "@/assets/bed-service.jpg";
import carpetImage from "@/assets/mat-service.png";
import aboutImage from "@/assets/about_image.png";
import houseInteriorImage from "@/assets/House_interior.jpg";
import commercialCleaningImage from "@/assets/comercial_cleaning.jpg";
import fabricCleaningImage from "@/assets/fabric_cleaning.jpg";
import furnitureCarImage from "@/assets/furniture-care.jpg";
import showerCleaningImage from "@/assets/shower_cleaning.jpg";
import windowCleaningImage from "@/assets/window_cleaning.jpg";
import upholsteryWorkImage from "@/assets/upholstery-work.jpg";
import leatherRestorationImage from "@/assets/leather-restoration.jpg";
import roofLiningImage from "@/assets/roof-lining.jpg";
import beforeCouchImage from "@/assets/before-couch.png";
import afterCouchImage from "@/assets/after-couch.png";
import beforeCarseatImage from "@/assets/before-carseat.png";
import afterCarseatImage from "@/assets/after-carseat.png";
import beforeOvenImage from "@/assets/before-oven.jpg";
import afterOvenImage from "@/assets/after-oven.jpg";

const Home = () => {
  const services = [
    {
      title: "Couches (Cleaning & Care)",
      description: "Professional cleaning for fabric and leather couches to refresh your living spaces.",
      icon: Armchair,
      image: couchImage,
    },
    {
      title: "Beds (Deep Cleaning)",
      description: "Deep bed and mattress cleaning for a fresher, healthier night's sleep.",
      icon: Bed,
      image: bedImage,
    },
    {
      title: "Carpets & Rugs",
      description: "Wash, steam clean, and odor removal for carpets and rugs in homes and offices.",
      icon: Square,
      image: carpetImage,
    },
    {
      title: "Full House Cleaning",
      description: "Complete residential cleaning tailored to your home and routine.",
      icon: Sparkles,
      image: houseInteriorImage,
    },
    {
      title: "Commercial Cleaning",
      description: "Cleaning for offices, retail stores, and shared business spaces.",
      icon: Building2,
      image: commercialCleaningImage,
    },
  ];

  const pictureCarouselItems: PictureCarouselItem[] = [
    {
      title: "Couch Cleaning Transformation",
      description: "Professional couch cleaning that removes stains and restores fabric to like-new condition.",
      beforeImage: afterCouchImage,
      afterImage: beforeCouchImage,
    },
    {
      title: "Car Seat Cleaning Transformation",
      description: "Professional car seat cleaning that removes dirt and stains from vehicle upholstery.",
      beforeImage: beforeCarseatImage,
      afterImage: afterCarseatImage,
    },
    {
      title: "Oven Cleaning Restoration",
      description: "Professional oven cleaning that removes stubborn grease and burnt-on residue for a like-new finish.",
      beforeImage: afterOvenImage,
      afterImage: beforeOvenImage,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      vehicle: "Residential Client",
      rating: 5,
      text: "Absolutely phenomenal work! They completely refreshed our home. The couches, carpets, and bedrooms look and feel brand new.",
    },
    {
      name: "Michael van der Merwe",
      vehicle: "Office Client",
      rating: 5,
      text: "Reliable, professional, and thorough. Our office space has never looked better and the team works discreetly around our schedule.",
    },
    {
      name: "Jessica Botha",
      vehicle: "Apartment Client",
      rating: 5,
      text: "They took great care with our furniture and soft finishes. The attention to detail and overall freshness of our home is outstanding.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Xtreme Fabrix Solutions | Premium Cleaning & Furniture Care Cape Town</title>
        <meta
          name="description"
          content="Cape Town's premium home, furniture, and commercial cleaning specialists. Couches, beds, carpets and rugs, full house cleaning, commercial spaces, windows, headboards, rubber flooring, antique furniture care, and shower deep cleaning."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight break-words">
              <span className="text-foreground">Xtreme Fabrix Solutions</span>
              <br />
              <span className="text-primary">PURIFICATION ,is HALF OF FAITH </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Premium home, furniture, and commercial cleaning specialists serving Cape Town. Refresh your spaces with professional care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <Button size="lg" variant="hero" className="w-full sm:w-auto">
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional home, furniture, and commercial cleaning services tailored to your space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="cta" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PictureCarousel items={pictureCarouselItems} />

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by homeowners and businesses across Cape Town
            </p>
          </motion.div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <TestimonialCard {...testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button variant="outline" size="lg">
                Read More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to <span className="text-primary">Transform</span> Your Interior?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a free quote today and experience the Xtreme Fabrix difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" variant="cta">
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
