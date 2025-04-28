import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/siteConfig";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useEmail } from "@/hooks/use-email";

// Interface pour les détails d'erreur de paiement
interface ErrorDetails {
  code?: string;
  message?: string;
  type?: string;
}

// Type pour les différents contextes possibles
type ContextSource = 'payment_error' | 'ebook_download' | string;

// Type pour les détails contextuels selon la source
type ContextDetails = ErrorDetails | Record<string, unknown> | null;

interface ContactFormProps {
  onSuccess?: () => void;
  contextSource?: ContextSource;
  contextDetails?: ContextDetails;
}

const ContactForm = ({ onSuccess, contextSource = '', contextDetails = null }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  // Utilisation du hook d'envoi d'emails personnalisé
  const { sendEmail, loading } = useEmail();

  // Ajouter les styles d'animation globale via useEffect
  useEffect(() => {
    // Créer une feuille de style pour les animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes formFadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    // Ajouter au head et nettoyer lors du démontage
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Réinitialiser le statut du formulaire lors de modifications après un envoi
    if (formStatus !== 'idle') {
      setFormStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive"
      });
      setFormStatus('error');
      setErrorMessage("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    setIsSubmitting(true);
    setFormStatus('idle');
    setErrorMessage("");
    
    try {
      // Préparer le sujet et le message en fonction du contexte
      let subject = `Message de contact de ${formData.name}`;
      let messageContent = formData.message;
      
      // Ajouter des informations contextuelles au message si disponibles
      if (contextSource) {
        // Personnaliser le sujet en fonction de la source
        switch (contextSource) {
          case 'payment_error':
            subject = `[Assistance Paiement] Message de ${formData.name}`;
            break;
          case 'ebook_download':
            subject = `[Assistance Ebook] Message de ${formData.name}`;
            break;
          default:
            // Garder le sujet par défaut
            break;
        }
        
        // Ajouter des informations supplémentaires au message
        let contextInfo = `\n\n---\nInformations contextuelles:`;
        contextInfo += `\nSource de contact: ${contextSource === 'payment_error' ? 'Page d\'erreur de paiement' : contextSource}`;
        
        // Ajouter les détails de l'erreur si disponibles
        if (contextSource === 'payment_error' && contextDetails) {
          contextInfo += `\nCode d'erreur: ${contextDetails.code || 'Non disponible'}`;
          contextInfo += `\nMessage d'erreur: ${contextDetails.message || 'Non disponible'}`;
          contextInfo += `\nType d'erreur: ${contextDetails.type || 'Non disponible'}`;
        }
        
        // Ajouter les informations contextuelles au message
        messageContent += contextInfo;
      }
      
      // Utilisation de notre système d'envoi d'email personnalisé
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        message: messageContent,
        subject: subject,
      });
      
      if (result.success) {
        // Mise à jour du statut et affichage d'un toast de succès
        setFormStatus('success');
        toast({
          title: "Message envoyé",
          description: "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.",
        });
        
        // Réinitialiser le formulaire
        setFormData({ name: "", email: "", message: "" });
        
        // Appeler le callback onSuccess si fourni
        if (onSuccess) {
          onSuccess();
        }
        
        // Réinitialiser le statut après 5 secondes
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      // Mise à jour du statut et affichage d'un toast d'erreur
      setFormStatus('error');
      const errorMsg = error instanceof Error ? error.message : "Une erreur inconnue est survenue";
      setErrorMessage("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive"
      });
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Message de statut avec des styles renforcés */}
      {formStatus === 'success' && (
        <div 
          className="bg-green-100 border-l-4 border-green-500 p-4 mb-4 rounded-md shadow-md"
          style={{ 
            backgroundColor: '#dcfce7', 
            transition: 'all 0.3s ease-in',
            animation: 'formFadeIn 0.5s' 
          }}
        >
          <div className="flex items-center">
            <CheckCircle2 className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="text-green-800 font-medium">Message envoyé avec succès !</p>
              <p className="text-green-700 text-sm">Je vous répondrai dans les plus brefs délais.</p>
            </div>
          </div>
        </div>
      )}
      
      {formStatus === 'error' && (
        <div 
          className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded-md shadow-md"
          style={{ 
            backgroundColor: '#fee2e2', 
            transition: 'all 0.3s ease-in',
            animation: 'formFadeIn 0.5s'
          }}
        >
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <p className="text-red-800 font-medium">Erreur lors de l'envoi</p>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="transition-all duration-300 hover:translate-y-[-2px]">
        <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
          placeholder="Votre nom"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="transition-all duration-300 hover:translate-y-[-2px]">
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
          placeholder="votre@email.com"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="transition-all duration-300 hover:translate-y-[-2px]">
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
          rows={4}
          placeholder="Votre message"
          required
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#0d8496] hover:bg-[#065964] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center relative hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            <span>Envoyer</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;