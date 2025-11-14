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
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  vehicleMake: z.string().min(2, "Please enter your vehicle make"),
  vehicleModel: z.string().min(2, "Please enter your vehicle model"),
  serviceType: z.string().min(1, "Please select a service type"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  notes: z.string().max(500).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      serviceType: "",
      preferredDate: "",
      notes: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call - In production, this would send to backend
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Booking submitted:", data);
    
    toast({
      title: "Booking Request Received!",
      description: "We'll contact you shortly to confirm your appointment.",
    });
    
    setIsSuccess(true);
    form.reset();
    setIsSubmitting(false);
  };

  const services = [
    "Car Seat Reupholstery",
    "Leather Repair & Restoration",
    "Roof Lining Replacement",
    "Soundproofing & Interior Upgrades",
    "Dashboard & Door Panel Repairs",
    "Custom Interior Project",
    "General Consultation",
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
        <meta name="description" content="Book your automotive upholstery appointment online. Request a free quote for seat reupholstery, leather restoration, or custom interior work." />
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
                  <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Flexible Scheduling</h3>
                  <p className="text-sm text-muted-foreground">Mon-Sat, 8:00 AM - 6:00 PM</p>
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
                        name="fullName"
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
                        name="phone"
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
                      name="email"
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="vehicleMake"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Make *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., BMW, Mercedes, VW" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="vehicleModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Model *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 3 Series, C-Class, Golf" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="serviceType"
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

                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
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
