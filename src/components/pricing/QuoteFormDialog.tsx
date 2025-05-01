import { ArrowRight, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/siteConfig";
import { useEmail } from "@/hooks/use-email";
import { emailConfig } from "@/config/emailConfig";
import { forceUnlockScroll } from "@/lib/utils";

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
  
  // Utilisation du hook personnalisé pour l'envoi d'emails
  const { sendEmail, loading } = useEmail();
  
  // Gestionnaire de fermeture sécurisé
  const handleCloseModal = useCallback(() => {
    // S'assurer que le défilement est déverrouillé
    setTimeout(() => {
      forceUnlockScroll();
    }, 100);
    
    setIsOpen(false);
  }, [setIsOpen]);
  
  // Quand la modale s'ouvre, débloquer le défilement du contenu de la modale
  useEffect(() => {
    if (isOpen) {
      // On délai légèrement pour laisser la modale s'afficher
      setTimeout(() => {
        const dialogContent = document.querySelector('[role="dialog"] .dialog-content');
        if (dialogContent) {
          dialogContent.scrollTop = 0;
        }
      }, 100);
    }
  }, [isOpen]);

  // S'assurer que le déverrouillage du scroll se produit toujours lors du démontage
  useEffect(() => {
    return () => {
      // Déverrouillage forcé lors du démontage du composant
      forceUnlockScroll();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });
    
    console.log(`Envoi de demande d'accompagnement à: ${process.env.EMAIL_RECIPIENT}`);
    
    try {
      // Validation des champs obligatoires
      if (!formData.name || !formData.email || !formData.message || !formData.company || !formData.phone) {
        setFormStatus({
          type: 'error',
          message: "Veuillez remplir tous les champs obligatoires."
        });
        setIsSubmitting(false);
        return;
      }
      
      // Création d'un objet EmailData standardisé selon l'interface définie
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        formType: "Demande d'accompagnement professionnel",
        subject: `Demande d'accompagnement de ${formData.name} - ${formData.company}`,
        contextSource: "professional_quote"
      };
      
      // Utilisation de notre service d'email personnalisé avec le nouveau format
      const result = await sendEmail(emailData);
      
      if (result.success) {
        setFormStatus({
          type: 'success',
          message: "J'ai bien reçu votre demande d'accompagnement ! Je vous contacterai rapidement."
        });
        
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          handleCloseModal(); // Utiliser la fonction sécurisée
          
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
        }, 6000);
      } else {
        throw new Error(result.message || "Échec de l'envoi du formulaire");
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
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleCloseModal(); // Utiliser notre fonction sécurisée lors de la fermeture
      } else {
        setIsOpen(true);
      }
    }}>
      <DialogContent 
        className="sm:max-w-[500px] z-50 max-h-[90vh] overflow-hidden dialog-content" 
        aria-describedby="quote-form-description"
        hideCloseButton={true} // Utiliser notre nouvelle prop pour masquer le bouton par défaut
      >
        {/* Bouton de fermeture personnalisé */}
        <Button
          onClick={handleCloseModal} 
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full"
          type="button"
          hoverAnimation="none"
          clickAnimation="scale"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Fermer</span>
        </Button>
        
        <DialogHeader className="mb-2">
          <DialogTitle>Demande de devis</DialogTitle>
          <DialogDescription id="quote-form-description">
            Complétez ce formulaire pour recevoir un devis personnalisé.
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto pr-1 max-h-[calc(90vh-120px)] pb-2">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    rows={3}
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
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={handleCloseModal} // Utiliser la fonction sécurisée
                    variant="outline"
                    className="min-w-[100px] bg-gray-100"
                    disabled={isSubmitting}
                    hoverAnimation="medium"
                    clickAnimation="scale"
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit"
                    className="min-w-[180px] bg-[#0d8496] hover:bg-[#065964] text-white"
                    disabled={isSubmitting}
                    hoverAnimation="strong" 
                    clickAnimation="bounce"
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
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemandeAccompagnementDialog;
