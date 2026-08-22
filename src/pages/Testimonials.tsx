import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import { fetchReviews, type Review } from "@/lib/reviews";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const reviewsUrl = import.meta.env.VITE_GOOGLE_REVIEWS_CSV_URL;
    if (!reviewsUrl) {
      setIsLoading(false);
      return;
    }

    fetchReviews(reviewsUrl)
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setIsLoading(false));
  }, []);

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
              {isLoading ? <p className="col-span-full text-center text-muted-foreground">Loading reviews...</p> : null}
              {!isLoading && testimonials.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">Reviews will appear here soon.</p>
              ) : null}
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
