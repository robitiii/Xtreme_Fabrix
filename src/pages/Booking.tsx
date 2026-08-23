import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";

const bookingSchema = z.object({
  fullNameFabrix: z.string().min(2, "Name must be at least 2 characters").max(100),
  emailFabrix: z.string().email("Invalid email address"),
  phoneFabrix: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceTypeFabrix: z.string().min(1, "Please select a service type"),
  bookingDateFabrix: z.string().min(1, "Please select a booking date"),
  addressFabrix: z.string().min(5, "Address must be at least 5 characters").max(200),
  suburbFabrix: z.string().min(2, "Suburb must be at least 2 characters").max(100),
  notesFabrix: z.string().max(500).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Booking = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullNameFabrix: "",
      emailFabrix: "",
      phoneFabrix: "",
      serviceTypeFabrix: "",
      bookingDateFabrix: "",
      addressFabrix: "",
      suburbFabrix: "",
      notesFabrix: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_BOOKING_URL;

      if (!webhookUrl) {
        throw new Error("Booking Apps Script URL is not configured.");
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: new URLSearchParams(data),
      });

      if (!response.ok) {
        console.error("Booking webhook error", response.status, response.statusText);
        throw new Error("Failed to submit booking request.");
      }

      console.log("Booking submitted:", data);

      toast({
        title: "Xtreme Fabrix received your request",
        description: "Our team will review your details and contact you shortly to confirm your appointment.",
      });

      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Booking submission failed:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't submit your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Couches (Cleaning & Care)",
    "Beds (Deep Cleaning & Stain Removal)",
    "Carpets & Rugs (Wash, Steam Clean, Odor Removal)",
    "Full House Cleaning (Complete Residential Cleaning)",
    "Commercial Cleaning (Offices, Retail, Business Spaces)",
    "Window Cleaning (Interior & Exterior)",
    "Headboards (Fabric & Leather Cleaning)",
    "Rubber Flooring (Cleaning, Polishing & Maintenance)",
    "Antique Furniture Care (Delicate, Specialized Cleaning)",
    "Shower Cleaning (Deep Lime Scale & Mold Removal)",
    "Custom / Other Service",
  ];

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Booking Confirmed | Xtreme Fabrix Solutions</title>
        </Helmet>
        <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto px-4 text-center"
          >
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-4">Request Received!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for choosing Xtreme Fabrix Solutions. We'll contact you within 24 hours to confirm your appointment and provide a detailed quote.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="cta">
              Book Another Appointment
            </Button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment | Xtreme Fabrix Solutions</title>
        <meta
          name="description"
          content="Book your professional cleaning appointment online. Request a free quote for couches, beds, carpets &amp; rugs, full house and commercial cleaning services."
        />
      </Helmet>

      <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Book Your <span className="text-primary">Appointment</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Request a free consultation and quote for your vehicle
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-background border-border">
                <CardContent className="pt-6 text-center">
                  <CalendarIcon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Flexible Scheduling</h3>
                  <p className="text-sm text-muted-foreground">Monday - Sunday, times vary by appointment</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardContent className="pt-6 text-center">
                  <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">24-hour confirmation</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Free Quote</h3>
                  <p className="text-sm text-muted-foreground">Detailed estimate provided</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-3xl font-black">Request Appointment</CardTitle>
                <CardDescription>
                  Fill in your details and we'll get back to you with a confirmation and quote
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullNameFabrix"
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
                        name="phoneFabrix"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+27 72 123 4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="emailFabrix"
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
                      name="serviceTypeFabrix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the service you need" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="bookingDateFabrix"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Booking Date *</FormLabel>
                            <FormControl>
                              <Input type="date" min={getToday()} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="suburbFabrix"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Suburb *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your suburb" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="addressFabrix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notesFabrix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes / Comments (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific requirements, color preferences, or questions..."
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg" variant="cta" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting Request..." : "Request Free Quote"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <p className="text-center text-muted-foreground mt-8 text-sm">
              Need immediate assistance? Call us at{" "}
              <a href="tel:+27720366449" className="text-primary hover:underline font-semibold">
                +27 72 036 6449
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Booking;
