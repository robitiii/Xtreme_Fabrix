import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export interface VideoShowcaseItem {
  title: string;
  description: string;
  video: string;
}

interface VideoShowcaseProps {
  items: VideoShowcaseItem[];
  title?: string;
  subtitle?: string;
}

const VideoShowcase = ({
  items,
  title = "Let our work speak for itself",
  subtitle = "See the real before-and-after transformations our team delivers.",
}: VideoShowcaseProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry || !video) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            video
              .play()
              .catch(() => {
                // Ignore autoplay errors
              });
          } else {
            video.pause();
          }
        },
        {
          threshold: [0, 0.5, 1],
        },
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

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
                  <Card className="bg-background border-border overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative bg-black">
                        <video
                          src={item.video}
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          controls
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover max-h-[360px]"
                        />
                        <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground border-transparent">
                          Before & After
                        </Badge>
                      </div>

                      <div className="p-6">
                        <p className="text-sm font-semibold text-primary mb-1">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
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

export default VideoShowcase;
