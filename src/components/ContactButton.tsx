import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface ContactButtonProps {
  variant?: "default" | "outline" | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ 
  variant = "outline", 
  size = "default",
  className = ""
}) => {
  const { openModal } = useModal();
  
  const handleClick = () => {
    openModal("contact");
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <Mail size={16} />
      Me contacter
    </Button>
  );
};

export default ContactButton;