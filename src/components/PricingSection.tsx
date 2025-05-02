import { ArrowRight, Check, FileText, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useModal } from "@/hooks/use-modal";
import { siteConfig } from "@/config/siteConfig";
import { useState } from "react";
import { OptimizedImage } from "./OptimizedImage";
import FadeInSection from "./animations/FadeInSection";
import PricingCard from "./pricing/PricingCard";
import PayPalPaymentButton from "./pricing/PayPalPaymentButton";
import StripePaymentButton from "./pricing/StripePaymentButton.tsx";
import ContactButton from "./ContactButton";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'paypal' | 'stripe'>('paypal');
  const { openModal } = useModal();

  const particularFeatures = [
    { text: "Évaluation initiale gratuite" },
    { text: "Aide complète aux démarches administratives et sociales" },
    { text: "Paiement sécurisé par PayPal ou carte bancaire" },
    { text: "Autres moyens de paiement : chèque, espèces ou virement" }
  ];

  const professionalFeatures = [
    { text: "Intervention sur devis, en fonction des besoins" },
    { text: "Possibilité de contrat de prestations de services" },
    { text: "Permanences en entreprise" },
    { text: "Accompagnement des salariés, bailleurs sociaux, collectivités, associations" }
  ];

  // Rendu du bouton de paiement en fonction de la méthode sélectionnée
  const renderPaymentButton = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-center mb-2">
          <button 
            className={`px-4 py-2 rounded-l-lg border ${
              selectedPaymentMethod === 'paypal' 
                ? 'bg-[#0070ba] text-white border-[#0070ba]' 
                : 'bg-white text-gray-700 border-gray-300'
            } transition-colors flex items-center`}
            onClick={() => setSelectedPaymentMethod('paypal')}
          >
            <img 
              src={selectedPaymentMethod === 'paypal' 
                ? "/assets/card/paypal-logo-blanc.svg" 
                : "/assets/card/paypal-logo.svg"}
              alt="PayPal"
              className="w-5 h-5 mr-2" 
            />
            PayPal
          </button>
          <button 
            className={`px-4 py-2 rounded-r-lg border ${
              selectedPaymentMethod === 'stripe' 
                ? 'bg-[#6772e5] text-white border-[#6772e5]' 
                : 'bg-white text-gray-700 border-gray-300'
            } transition-colors flex items-center`}
            onClick={() => setSelectedPaymentMethod('stripe')}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Carte
          </button>
        </div>
        
        {selectedPaymentMethod === 'paypal' ? (
          <PayPalPaymentButton amount="50.00" description="Consultation d'une heure" />
        ) : (
          <StripePaymentButton amount={50} description="Consultation d'une heure" />
        )}
      </div>
    );
  };

  return (
    <section id="pricing" className="py-12 md:py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Tarifs
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Des tarifs adaptés à votre situation
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <PricingCard 
            title="Particuliers" 
            price="50€ / heure" 
            features={particularFeatures}
            cta={renderPaymentButton()}
          />

          <PricingCard 
            title="Professionnels" 
            price="Sur devis" 
            features={professionalFeatures}
            cta={
              <ContactButton 
                variant="default"
                size="lg"
                text="Demander un devis"
                iconType="quote"
                modalType="quote"
                context="devis-pro"
                className="w-full"
                hoverAnimation="medium"
                clickAnimation="scale"
              />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
