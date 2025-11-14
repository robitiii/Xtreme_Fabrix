import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  vehicle?: string;
  rating: number;
  text: string;
}

const TestimonialCard = ({ name, vehicle, rating, text }: TestimonialCardProps) => {
  return (
    <Card className="bg-card border-border h-full">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-primary fill-primary" : "text-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 italic">"{text}"</p>
        <div className="border-t border-border pt-4">
          <p className="font-semibold text-foreground">{name}</p>
          {vehicle && <p className="text-sm text-muted-foreground">{vehicle}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
