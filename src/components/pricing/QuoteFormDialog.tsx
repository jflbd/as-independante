import { ArrowRight, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { siteConfig } from "@/config/siteConfig";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type QuoteFormDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DemandeAccompagnementDialog = ({ isOpen, setIsOpen }: QuoteFormDialogProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });
    
    console.log(`Envoi de demande d'accompagnement à: ${siteConfig.contact.email}`);
    console.log("Données du formulaire:", formData);
    
    try {
      // Configuration pour FormSubmit
      const formElement = e.target as HTMLFormElement;
      
      // Créer un élément caché pour l'email de destination
      const destinationEmail = document.createElement("input");
      destinationEmail.type = "hidden";
      destinationEmail.name = "_to";
      destinationEmail.value = siteConfig.contact.email;
      formElement.appendChild(destinationEmail);
      
      // Élément pour le sujet de l'email
      const subjectField = document.createElement("input");
      subjectField.type = "hidden";
      subjectField.name = "_subject";
      subjectField.value = `Demande d'accompagnement de ${formData.name} - ${formData.company}`;
      formElement.appendChild(subjectField);
      
      // Désactiver le captcha
      const captchaField = document.createElement("input");
      captchaField.type = "hidden";
      captchaField.name = "_captcha";
      captchaField.value = "false";
      formElement.appendChild(captchaField);
      
      // Comportement après envoi
      const redirectField = document.createElement("input");
      redirectField.type = "hidden";
      redirectField.name = "_next";
      redirectField.value = window.location.href;
      formElement.appendChild(redirectField);
      
      // Ajouter les données du formulaire comme champs cachés pour FormSubmit
      Object.entries(formData).forEach(([key, value]) => {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = value;
        formElement.appendChild(hiddenField);
      });
      
      // Définir l'action du formulaire vers FormSubmit
      formElement.action = `https://formsubmit.co/${siteConfig.contact.email}`;
      formElement.method = "POST";
      
      // Soumettre le formulaire via AJAX pour éviter la redirection
      const formDataToSend = new FormData(formElement);
      const response = await fetch(formElement.action, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: "J'ai bien reçu votre demande d'accompagnement ! Je vous contacterai rapidement."
        });
        
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setIsOpen(false);
          
          setFormData({
            name: "",
            company: "",
            email: "",
            phone: "",
            message: ""
          });
          
          // Effacer le message après fermeture
          setTimeout(() => {
            setFormStatus({ type: null, message: '' });
          }, 300);
        }, 3000);
      } else {
        throw new Error("Échec de l'envoi du formulaire");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande:", error);
      setFormStatus({
        type: 'error',
        message: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] z-50">
        {/* Bouton de fermeture */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          type="button"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Fermer</span>
        </button>
        
        {formStatus.type ? (
          <div className={`p-8 rounded-lg flex flex-col items-center justify-center gap-4 text-center
            ${formStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
            {formStatus.type === 'success' ? 
              <CheckCircle2 className="h-12 w-12 text-green-600 flex-shrink-0" /> : 
              <AlertCircle className="h-12 w-12 text-red-600 flex-shrink-0" />
            }
            <h3 className={`text-lg font-bold ${formStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {formStatus.type === 'success' ? 'Demande envoyée' : 'Erreur'}
            </h3>
            <p className={`${formStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {formStatus.message}
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Demande d'accompagnement professionnel</DialogTitle>
              <DialogDescription>
                Remplissez ce formulaire pour recevoir une proposition d'accompagnement personnalisée pour votre entreprise ou organisation.
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Votre besoin d'accompagnement</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  required
                  disabled={isSubmitting}
                  placeholder="Décrivez brièvement votre situation et vos attentes..."
                ></textarea>
              </div>
              
              <div className="text-xs text-gray-500">
                En soumettant ce formulaire, vous serez contacté par {siteConfig.name} avec l'adresse email {siteConfig.contact.email}
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md transition-all duration-300 hover:bg-gray-300 focus:bg-gray-300 focus-visible:outline-none border border-gray-400 shadow-sm"
                  disabled={isSubmitting}
                  style={{ minWidth: "100px" }}
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="bg-[#0d8496] hover:bg-[#065964] text-white font-medium px-6 py-2 rounded-md flex items-center justify-center transition-all duration-300 hover:shadow-md focus-visible:outline-none focus:ring-2 focus:ring-[#0d8496]/50"
                  disabled={isSubmitting}
                  style={{ minWidth: "180px" }}
                >
                  {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-pulse mr-2">
                      <span className="sr-only">Envoi en cours...</span>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <span>Envoi en cours...</span>
                  </div>
                  ) : (
                  <>
                    Envoyer ma demande
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemandeAccompagnementDialog;
