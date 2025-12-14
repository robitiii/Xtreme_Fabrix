import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCard";

const Testimonials = () => {

  const testimonials = [
    {
      name: "Sarah Thompson",
      vehicle: "Residential Cleaning Client",
      rating: 5,
      text: "Our couches, carpets, and mattresses look and feel brand new. Xtreme Fabrix took great care in every room and the whole house smells fresh again.",
    },
    {
      name: "Michael van der Merwe",
      vehicle: "Office & Commercial Client",
      rating: 5,
      text: "They handle our office cleaning and carpet care on a regular schedule. Professional, reliable, and the workspace always looks presentable for clients.",
    },
    {
      name: "Jessica Botha",
      vehicle: "Apartment Deep Clean",
      rating: 5,
      text: "I booked a full apartment deep clean including couches, beds, and windows. The team was friendly, efficient, and left everything spotless.",
    },
    {
      name: "David Naidoo",
      vehicle: "Carpets & Rugs Service",
      rating: 5,
      text: "Our lounge rugs and high-traffic carpets were badly stained. After their steam clean and odor treatment, the colours popped again and the smells were gone.",
    },
    {
      name: "Amanda Daniels",
      vehicle: "Full House & Window Cleaning",
      rating: 5,
      text: "From bedrooms to bathrooms and windows, they did an incredible job. You can see and feel the difference when you walk through the house.",
    },
    {
      name: "Johan Pretorius",
      vehicle: "Shower & Bathroom Deep Clean",
      rating: 5,
      text: "Years of lime scale and mold in our showers were completely removed. Tiles, glass, and fixtures now look bright again. Highly recommended for deep cleaning.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Testimonials | Xtreme Fabrix Solutions</title>
        <meta
          name="description"
          content="Read what our clients say about our home, furniture, and commercial cleaning services in Cape Town. Real reviews from residential and business customers."
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
                Client <span className="text-primary">Testimonials</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Hear from our satisfied customers across Cape Town
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonials;
