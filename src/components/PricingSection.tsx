
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PricingCard from "./pricing/PricingCard";
import QuoteFormDialog from "./pricing/QuoteFormDialog";
import PayPalPaymentButton from "./pricing/PayPalPaymentButton";
import { supabase } from "@/lib/supabase";
import { PricingOption } from "@/types/cms";

const PricingSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPricingOptions = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing')
          .select('*')
          .eq('is_visible', true)
          .order('order');

        if (error) throw error;
        
        setPricingOptions(data || []);
      } catch (error: any) {
        console.error('Error fetching pricing options:', error.message);
        setError("Impossible de charger les options tarifaires");
      } finally {
        setLoading(false);
      }
    };

    fetchPricingOptions();
  }, []);

  // Fallback pricing options in case no data is available
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

  if (loading) {
    return (
      <section id="pricing" className="py-12 md:py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-12 md:py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center text-red-500 py-10">
            {error}
          </div>
        </div>
      </section>
    );
  }

  // If no pricing options are available from the database, use fallback options
  const displayOptions = pricingOptions.length > 0 
    ? pricingOptions 
    : [
        { 
          id: 'fallback-1', 
          title: 'Particuliers', 
          price: '50€ / heure', 
          features: particularFeatures.map(f => f.text),
          is_visible: true,
          order: 1 
        },
        { 
          id: 'fallback-2', 
          title: 'Professionnels', 
          price: 'Sur devis', 
          features: professionalFeatures.map(f => f.text),
          is_visible: true,
          order: 2 
        }
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
          {displayOptions.map((option, index) => (
            <PricingCard 
              key={option.id}
              title={option.title} 
              price={option.price} 
              features={option.features.map(text => ({ text }))}
              cta={
                option.title.toLowerCase().includes('particulier') ? (
                  <PayPalPaymentButton amount="50.00" description="Consultation d'une heure" />
                ) : (
                  <Dialog>
                    <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                      <button
                        className="btn-primary w-full justify-center py-3 px-6"
                      >
                        Demander un devis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </DialogTrigger>
                  </Dialog>
                )
              }
            />
          ))}
        </div>
      </div>
      
      <QuoteFormDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </section>
  );
};

export default PricingSection;
