import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Car, Armchair, Sparkles, Volume2, Wrench, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import bgVideo from "@/assets/bg-video.mp4";
import upholsteryImage from "@/assets/upholstery-work.jpg";
import leatherImage from "@/assets/leather-restoration.jpg";
import roofImage from "@/assets/roof-lining.jpg";
import engineImage from "@/assets/engine-image.png";
import dashboardImage from "@/assets/dashboard-repair.png";

const Home = () => {
  const services = [
    {
      title: "Seat Reupholstery",
      description: "Custom car seat upholstery with premium fabrics and leather. Transform your interior with expert craftsmanship.",
      icon: Armchair,
      image: upholsteryImage,
    },
    {
      title: "Leather Restoration",
      description: "Professional leather repair and conditioning. Bring back the luxury feel to your vehicle's interior.",
      icon: Sparkles,
      image: leatherImage,
    },
    {
      title: "Car Roof restorations",
      description: "Expert headliner installation and repair. Say goodbye to sagging or damaged roof linings.",
      icon: Car,
      image: roofImage,
    },
    {
      title: "Engine bay detailing",
      description: "Professional engine bay detailing. Clean, safe, and efficient. Get your car looking its best.",
      icon: Volume2,
      image: engineImage,
    },
    {
      title: "Dashboard Repairs",
      description: "Precision dashboard and door panel restoration. Attention to every detail of your interior.",
      icon: Wrench,
      image: dashboardImage,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      vehicle: "BMW 3 Series",
      rating: 5,
      text: "Absolutely phenomenal work! They completely transformed my BMW's interior. The leather work is flawless and the attention to detail is exceptional.",
    },
    {
      name: "Michael van der Merwe",
      vehicle: "Mercedes C-Class",
      rating: 5,
      text: "Best upholstery shop in Cape Town, hands down. Professional service, quality materials, and the results exceeded my expectations.",
    },
    {
      name: "Jessica Botha",
      vehicle: "Audi A4",
      rating: 5,
      text: "They restored my leather seats to better than new condition. The team is skilled, professional, and truly passionate about their craft.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Xtreme Fabrix Solutions | Premium Automotive Upholstery Cape Town</title>
        <meta name="description" content="Cape Town's leading automotive upholstery experts. Custom seat reupholstery, leather restoration, roof lining, and interior upgrades. Professional craftsmanship guaranteed." />
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
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="text-foreground">Precision Upholstery.</span>
              <br />
              <span className="text-primary">Premium Finish.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Custom automotive upholstery and interior restoration experts serving Cape Town. Transform your vehicle with professional craftsmanship.
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
              Expert automotive interior solutions tailored to your vehicle's needs
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
              Trusted by car enthusiasts across Cape Town
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
