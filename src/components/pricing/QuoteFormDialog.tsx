
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const QuoteFormDialog = ({ isOpen, setIsOpen }: QuoteFormDialogProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Envoi de devis à: rachel.gervais@as-independante.fr");
    console.log("Données du formulaire:", formData);
    
    try {
      // Créer l'URL pour le service EmailJS
      const serviceID = "default_service"; // Remplacer par votre ID de service
      const templateID = "template_devis"; // Remplacer par votre ID de template
      const userID = "your_emailjs_user_id"; // Remplacer par votre ID utilisateur EmailJS
      
      const emailData = {
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: {
          to_email: "rachel.gervais@as-independante.fr",
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          subject: `Demande de devis de ${formData.name} - ${formData.company}`
        }
      };
      
      // Simuler l'envoi d'email avec un délai (à remplacer par l'appel API réel)
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Quand vous êtes prêt à implémenter l'envoi réel, utilisez:
      // const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData)
      // });
      
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
      
      setIsOpen(false);
      
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du devis:", error);
      toast.error("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.", {
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <label htmlFor="message" className="text-sm font-medium">Votre besoin</label>
            <textarea 
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          <div className="text-xs text-gray-500">
            En soumettant ce formulaire, vous serez contacté par Rachel Gervais à l'adresse email rachel.gervais@as-independante.fr
          </div>
          
          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              className="btn-primary py-3 px-6 relative"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="opacity-0">Envoyer ma demande</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteFormDialog;
