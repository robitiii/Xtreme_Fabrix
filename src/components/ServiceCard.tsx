import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  onClick?: () => void;
}

const ServiceCard = ({ title, description, icon: Icon, image }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden bg-card border-border hover:border-primary/50 transition-colors">
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link to="/contact#contact-form" className="w-full">
            <Button 
              variant="outline" 
              className="w-full hover:bg-primary hover:text-primary-foreground"
            >
              Learn More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
