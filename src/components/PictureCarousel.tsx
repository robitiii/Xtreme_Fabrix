import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export interface PictureCarouselItem {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

interface PictureCarouselProps {
  items: PictureCarouselItem[];
  title?: string;
  subtitle?: string;
}

const PictureCarousel = ({
  items,
  title = "Check Our Work",
  subtitle = "See the real transformations our team delivers.",
}: PictureCarouselProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </motion.div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="relative">
                    <BeforeAfterSlider
                      beforeImage={item.beforeImage}
                      afterImage={item.afterImage}
                      title={item.title}
                      description={item.description}
                    />
                    <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground border-transparent z-10">
                      Before & After
                    </Badge>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PictureCarousel;
