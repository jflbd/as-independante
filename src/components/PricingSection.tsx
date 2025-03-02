
import { ArrowRight } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PricingSection = () => {
  const handlePaymentSuccess = (details: any) => {
    console.log("Transaction completed by " + details.payer.name.given_name);
  };

  return (
    <section id="tarifs" className="py-12 md:py-16 bg-white">
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Particuliers</h3>
            <div className="text-3xl font-bold text-primary mb-4">50€ / heure</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Premier rendez-vous d'évaluation gratuit</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Prise en charge possible par votre mutuelle</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Paiement sécurisé via PayPal</span>
              </li>
            </ul>
            
            {/* PayPal Button */}
            <div className="mt-6">
              <PayPalScriptProvider options={{ 
                clientId: "test", 
                currency: "EUR" 
              }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            value: "50.00",
                            currency_code: "EUR"
                          },
                          description: "Consultation d'une heure"
                        }
                      ]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(handlePaymentSuccess);
                  }}
                  style={{ layout: "horizontal" }}
                />
              </PayPalScriptProvider>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Professionnels</h3>
            <div className="text-3xl font-bold text-primary mb-4">Sur devis</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Permanences en entreprise</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Interventions ponctuelles</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Solutions personnalisées</span>
              </li>
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors w-full justify-center"
            >
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
