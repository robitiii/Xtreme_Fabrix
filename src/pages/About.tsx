import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Award, Target, Heart, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import  aboutImage from "@/assets/about_image.png";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We use only the finest materials and employ meticulous craftsmanship in every project.",
    },
    {
      icon: Target,
      title: "Precision Work",
      description: "Attention to detail is our hallmark. Every stitch, every seam, perfected.",
    },
    {
      icon: Heart,
      title: "Customer Passion",
      description: "Your satisfaction drives us. We treat every vehicle as if it were our own.",
    },
    {
      icon: Shield,
      title: "Guaranteed Results",
      description: "We stand behind our work with comprehensive warranties and ongoing support.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Xtreme Fabrix Solutions</title>
        <meta name="description" content="Learn about Xtreme Fabrix Solutions, Cape Town's premier automotive upholstery specialists. Our story, values, and commitment to excellence." />
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
                About <span className="text-primary">Xtreme Fabrix</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Cape Town's trusted name in premium automotive upholstery and interior restoration since our founding.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid gap-10 lg:grid-cols-2 items-start">
                  <div>
                    <h2 className="text-4xl font-black mb-8">Our Story</h2>
                    <div className="space-y-6 text-lg text-muted-foreground">
                      <p>
                        Xtreme Fabrix Solutions was born from a passion for automotive excellence and a commitment to transforming vehicle interiors into works of art. Based in the heart of Cape Town, we've built our reputation on precision craftsmanship and unwavering dedication to quality.
                      </p>
                      <p>
                        What started as a small workshop has grown into one of Cape Town's most trusted automotive upholstery specialists. Our team combines traditional upholstery techniques with modern innovation, ensuring every project meets the highest standards of quality and durability.
                      </p>
                      <p>
                        From luxury vehicles to classic restorations, we approach each project with the same level of care and expertise. Our clients trust us not just for our technical skills, but for our genuine passion for automotive interiors and our commitment to exceeding expectations.
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-64 md:h-80 bg-card border border-dashed border-border rounded-xl flex items-center justify-center">
                    <img src={aboutImage} alt="About Us" className="max-h-full rounded-xl" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every project we undertake
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background border-border hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                        <value.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-black mb-8">Why Choose Us?</h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Premium Materials:</strong> We source only the finest fabrics, leathers, and materials from trusted suppliers. Your vehicle deserves nothing less than the best.
                  </p>
                  <p>
                    <strong className="text-foreground">Expert Craftsmanship:</strong> Our team brings years of specialized experience in automotive upholstery. Every project showcases our commitment to perfection.
                  </p>
                  <p>
                    <strong className="text-foreground">Custom Solutions:</strong> Whether it's matching original specifications or creating a completely custom interior, we tailor our services to your vision.
                  </p>
                  <p>
                    <strong className="text-foreground">Client-Focused Service:</strong> From initial consultation to final reveal, we keep you informed and involved. Your satisfaction is our ultimate measure of success.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
