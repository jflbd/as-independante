
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { DialogTrigger } from "@/components/ui/dialog";
import PricingCard from "./pricing/PricingCard";
import QuoteFormDialog from "./pricing/QuoteFormDialog";
import PayPalPaymentButton from "./pricing/PayPalPaymentButton";

const PricingSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const particularFeatures = [
    { text: "Premier rendez-vous d'évaluation gratuit" },
    { text: "Prise en charge possible par votre mutuelle" },
    { text: "Accompagnement pour les démarches administratives et sociales" },
    { text: "Paiement sécurisé via PayPal" }
  ];

  const professionalFeatures = [
    { text: "Intervention sur devis, en fonction des besoins" },
    { text: "Possibilité de contrat de prestations de services" },
    { text: "Permanences en entreprise" },
    { text: "Accompagnement des salariés, bailleurs sociaux, collectivités, associations" }
  ];

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
          <p className="text-gray-600">
            Possibilité de prise en charge par votre mutuelle (N° ADELI)
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <PricingCard 
            title="Particuliers" 
            price="50€ / heure" 
            features={particularFeatures}
            cta={<PayPalPaymentButton amount="50.00" description="Consultation d'une heure" />}
          />

          <PricingCard 
            title="Professionnels" 
            price="Sur devis" 
            features={professionalFeatures}
            cta={
              <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                <button
                  className="btn-primary w-full justify-center py-3 px-6"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </DialogTrigger>
            }
          />
        </div>
      </div>
      
      <QuoteFormDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </section>
  );
};

export default PricingSection;
