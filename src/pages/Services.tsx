import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bed, Car, Square, Armchair, Baby, Wrench } from "lucide-react";
import upholsteryImage from "@/assets/upholstery-work.jpg";
import leatherImage from "@/assets/leather-restoration.jpg";
import roofImage from "@/assets/roof-lining.jpg";
import soundproofImage from "@/assets/soundproofing.jpg";
import dashboardImage from "@/assets/dashboard-repair.jpg";

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
      title: "Beds",
      description: "Since its founding, Xtreme Fabrix Solutions has been one of the most trusted names in the industry. Hire us for this service and learn how we cater to the needs, sleep at ease!",
      icon: Bed,
      image: upholsteryImage,
      details: "Since its founding, Xtreme Fabrix Solutions has been one of the most trusted names in the industry. Hire us for this service and learn how we cater to the needs, sleep at ease!",
      features: [
        "Professional bed cleaning and restoration",
        "Deep cleaning of mattresses and bed frames",
        "Stain removal and odor treatment",
        "Fabric protection and care",
        "Expert attention to detail",
      ],
    },
    {
      title: "Car Interior",
      description: "We have the experience and skills necessary to tackle just about every type of job that comes our way. With Xtreme Fabrix Solutions, clients know exactly what to expect - professionalism, efficiency and exceptional results.",
      icon: Car,
      image: dashboardImage,
      details: "We have the experience and skills necessary to tackle just about every type of job that comes our way. With Xtreme Fabrix Solutions, clients know exactly what to expect - professionalism, efficiency and exceptional results.",
      features: [
        "Complete interior deep cleaning",
        "Seat and upholstery restoration",
        "Dashboard and console cleaning",
        "Door panel and trim care",
        "Professional-grade results",
      ],
    },
    {
      title: "Carpet & Rugs",
      description: "Xtreme Fabrix Solutions is committed to getting the job done, especially when it comes to this service. You can count on us to be professional, timely, efficient and make sure you're satisfied every step of the way.",
      icon: Square,
      image: roofImage,
      details: "Xtreme Fabrix Solutions is committed to getting the job done, especially when it comes to this service. You can count on us to be professional, timely, efficient and make sure you're satisfied every step of the way.",
      features: [
        "Deep carpet cleaning and extraction",
        "Rug restoration and care",
        "Stain removal and treatment",
        "Odor elimination",
        "Professional service guarantee",
      ],
    },
    {
      title: "Fabric Couches & Leather Care",
      description: "Since its founding, Xtreme Fabrix Solutions has been one of the most trusted names in the industry. Hire us for this service and learn how we cater to the needs of each client, ensuring the results you need and deserve.",
      icon: Armchair,
      image: leatherImage,
      details: "Since its founding, Xtreme Fabrix Solutions has been one of the most trusted names in the industry. Hire us for this service and learn how we cater to the needs of each client, ensuring the results you need and deserve.",
      features: [
        "Fabric couch deep cleaning",
        "Leather conditioning and restoration",
        "Stain and spot treatment",
        "Color restoration",
        "Protective treatment application",
      ],
    },
    {
      title: "Baby Car Seats & Strollers",
      description: "We have the experience and skills necessary to tackle just about every type of job that comes our way. With Xtreme Fabrix Solutions, clients know exactly what to expect - professionalism, efficiency and exceptional results.",
      icon: Baby,
      image: soundproofImage,
      details: "We have the experience and skills necessary to tackle just about every type of job that comes our way. With Xtreme Fabrix Solutions, clients know exactly what to expect - professionalism, efficiency and exceptional results.",
      features: [
        "Safe, child-friendly cleaning products",
        "Deep cleaning of car seats",
        "Stroller fabric restoration",
        "Stain and odor removal",
        "Thorough sanitization",
      ],
    },
    {
      title: "Engine Bay Detailing",
      description: "Xtreme Fabrix Solutions is committed to getting the job done, especially when it comes to this service. You can count on us to be professional, timely, efficient and make sure you're satisfied every step of the way.",
      icon: Wrench,
      image: dashboardImage,
      details: "Xtreme Fabrix Solutions is committed to getting the job done, especially when it comes to this service. You can count on us to be professional, timely, efficient and make sure you're satisfied every step of the way.",
      features: [
        "Complete engine bay cleaning",
        "Degreasing and detailing",
        "Plastic and rubber restoration",
        "Protective coating application",
        "Show-quality finish",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Xtreme Fabrix Solutions</title>
        <meta name="description" content="Professional automotive upholstery services in Cape Town. Seat reupholstery, leather restoration, roof lining, soundproofing, and custom interiors." />
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
                Professional fabric cleaning and restoration services for your home and vehicle
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
