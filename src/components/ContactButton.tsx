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
  onClick?: (e: React.MouseEvent) => void; // Nouvelle prop pour permettre des actions supplémentaires au clic
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
  clickAnimation = "bounce",
  onClick
}) => {
  const { openModal } = useModal();
  
  const handleClick = (e: React.MouseEvent) => {
    // Empêcher le comportement par défaut qui peut causer un défilement vers le haut
    e.preventDefault();
    
    // Si un contexte est fourni, le passer à la fonction d'ouverture de la modale
    if (context) {
      console.log(`ContactButton: ouverture modale avec contexte="${context}"`);
      openModal(modalType, { context: context });
    } else {
      openModal(modalType);
    }
    
    // Si un gestionnaire onClick personnalisé est fourni, l'appeler aussi
    if (onClick) {
      onClick(e);
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