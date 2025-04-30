import React from "react";
import { Mail, FileText, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface ContactButtonProps {
  variant?: "default" | "outline" | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
  text?: string;
  iconType?: "mail" | "quote";
  modalType?: "contact" | "quote";
  context?: string;
  hoverAnimation?: "subtle" | "medium" | "strong" | "none";
  clickAnimation?: "bounce" | "scale" | "glow" | "none";
}

const ContactButton: React.FC<ContactButtonProps> = ({ 
  variant = "outline", 
  size = "default",
  className = "",
  text = "Me contacter",
  iconType = "mail",
  modalType = "contact",
  context = "",
  hoverAnimation = "medium",
  clickAnimation = "bounce"
}) => {
  const { openModal } = useModal();
  
  const handleClick = () => {
    // Si un contexte est fourni, le passer à la fonction d'ouverture de la modale
    if (context) {
      console.log(`ContactButton: ouverture modale avec contexte="${context}"`);
      openModal(modalType, { context: context });
    } else {
      openModal(modalType);
    }
  };
  
  // Sélection de l'icône en fonction de iconType
  const Icon: LucideIcon = iconType === "quote" ? FileText : Mail;
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`flex items-center gap-2 ${className}`}
      hoverAnimation={hoverAnimation}
      clickAnimation={clickAnimation}
    >
      <Icon size={16} />
      {text}
    </Button>
  );
};

export default ContactButton;