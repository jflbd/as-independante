import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface QuoteButtonProps {
  variant?: "default" | "outline" | "link" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

const QuoteButton: React.FC<QuoteButtonProps> = ({ 
  variant = "default", 
  size = "default",
  className = ""
}) => {
  const { openModal } = useModal();
  
  const handleClick = () => {
    openModal("quote");
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <FileText size={16} />
      Demander un devis
    </Button>
  );
};

export default QuoteButton;