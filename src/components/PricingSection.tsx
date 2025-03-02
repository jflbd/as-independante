
import { ArrowRight } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

const PricingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);
    console.log("Would send email to: rachel.gervais@as-independante.fr");
    
    toast.success("J'ai bien reçu votre demande de devis ! Je vous contacterai rapidement.", {
      duration: 5000,
      style: {
        backgroundColor: "white",
        color: "black",
        border: "1px solid #e2e8f0",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }
    });
    
    setIsDialogOpen(false);
    
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const handlePaymentSuccess = (details: any) => {
    console.log("Transaction completed by " + details.payer.name.given_name);
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
          <p className="text-gray-600">
            Possibilité de prise en charge par votre mutuelle (N° ADELI)
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
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
                <span>Accompagnement pour les démarches administratives et sociales</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Paiement sécurisé via PayPal</span>
              </li>
            </ul>
            
            <div className="mt-6 relative z-10">
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

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold mb-4">Professionnels</h3>
            <div className="text-3xl font-bold text-primary mb-4">Sur devis</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Intervention sur devis, en fonction des besoins</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Possibilité de contrat de prestations de services</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Permanences en entreprise</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <span>Accompagnement des salariés, bailleurs sociaux, collectivités, associations</span>
              </li>
            </ul>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="btn-primary w-full justify-center py-3 px-6"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] z-50">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Demande de devis professionnel</DialogTitle>
                  <DialogDescription>
                    Remplissez ce formulaire pour recevoir un devis personnalisé pour votre entreprise ou organisation.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nom et prénom</label>
                      <input 
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">Entreprise / Organisation</label>
                      <input 
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                      <input 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Votre besoin</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    En soumettant ce formulaire, vous serez contacté par Rachel Gervais à l'adresse email rachel.gervais@as-independante.fr
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button 
                      type="submit"
                      className="btn-primary py-3 px-6"
                    >
                      Envoyer ma demande
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
