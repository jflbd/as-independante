import React from "react";
import { ArrowRight } from "lucide-react";

interface Feature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: Feature[];
  cta: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, cta }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="text-3xl font-bold text-primary mb-4">{price}</div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-6 relative z-10">
        {cta}
      </div>
    </div>
  );
};

export default PricingCard;
