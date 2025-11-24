import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const testimonialSchema = z.object({
  nameFabrixTestimonial: z.string().min(2, "Name must be at least 2 characters").max(100),
  ratingFabrixTestimonial: z.string(),
  testimonialFabrixTestimonial: z.string().min(10, "Testimonial must be at least 10 characters").max(500),
  emailFabrixTestimonial: z.string().email("Invalid email address"),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

const Testimonials = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      nameFabrixTestimonial: "",
      ratingFabrixTestimonial: "5",
      testimonialFabrixTestimonial: "",
      emailFabrixTestimonial: "",
    },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      const webhookUrl = import.meta.env.VITE_MAKE_BOOKING_WEBHOOK_URL;

      if (!webhookUrl) {
        console.error("Missing VITE_MAKE_BOOKING_WEBHOOK_URL env variable");
        throw new Error("Testimonial webhook URL is not configured.");
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Testimonial webhook error", response.status, response.statusText);
        throw new Error("Failed to submit testimonial.");
      }

      console.log("Testimonial submitted:", data);

      toast({
        title: "Thank you for your feedback!",
        description: "Your testimonial has been submitted and will be reviewed shortly.",
      });

      form.reset();
    } catch (error) {
      console.error("Testimonial submission failed:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't submit your testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    {
      name: "David Naidoo",
      vehicle: "VW Golf GTI",
      rating: 5,
      text: "Custom red stitching on my GTI's seats looks incredible. The craftsmanship is top-tier and the service was friendly and efficient.",
    },
    {
      name: "Amanda Daniels",
      vehicle: "Range Rover Sport",
      rating: 5,
      text: "Roof lining replacement was perfect. No sagging, perfect tension, and the color match is spot on. Highly recommend their services.",
    },
    {
      name: "Johan Pretorius",
      vehicle: "Ford Mustang",
      rating: 5,
      text: "Complete interior restoration on my classic Mustang. They understood the vision and delivered beyond expectations. True craftsmen!",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Testimonials | Xtreme Fabrix Solutions</title>
        <meta name="description" content="Read what our satisfied clients say about our automotive upholstery services in Cape Town. Real reviews from real customers." />
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

        {/* Submit Testimonial Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-3xl font-black">Share Your Experience</CardTitle>
                  <CardDescription>
                    We'd love to hear about your experience with Xtreme Fabrix Solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="nameFabrixTestimonial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="emailFabrixTestimonial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ratingFabrixTestimonial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="5">5 Stars - Excellent</SelectItem>
                                <SelectItem value="4">4 Stars - Very Good</SelectItem>
                                <SelectItem value="3">3 Stars - Good</SelectItem>
                                <SelectItem value="2">2 Stars - Fair</SelectItem>
                                <SelectItem value="1">1 Star - Poor</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="testimonialFabrixTestimonial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Testimonial *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share your experience with our services..."
                                className="min-h-32 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" variant="cta" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonials;
