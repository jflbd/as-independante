import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/siteConfig";
import { Send, CheckCircle2, AlertCircle, Loader2, Clock, Info } from "lucide-react";
import { useEmail } from "@/hooks/use-email";

// Interface pour les détails d'erreur de paiement
interface ErrorDetails {
  code?: string;
  message?: string;
  type?: string;
}

// Interface pour les détails de transaction
interface TransactionDetails {
  amount?: string | number;
  description?: string;
  date?: string;
  transactionId?: string;
  paymentMethod?: string;
}

// Type pour les différents contextes possibles
type ContextSource = 'payment_error' | 'ebook_download' | 'successful_payment' | 'payment_cancelled' | 'ebook_page' | string;

// Type pour les détails contextuels selon la source
type ContextDetails = ErrorDetails | Record<string, unknown> | null;

interface ContactFormProps {
  onSuccess?: () => void;
  contextSource?: ContextSource;
  contextDetails?: ContextDetails;
  prefilledMessage?: string; // Message prérempli
  transactionDetails?: TransactionDetails; // Détails de transaction à ajouter automatiquement
}

const ContactForm = ({ 
  onSuccess, 
  contextSource = '', 
  contextDetails = null,
  prefilledMessage = '',
  transactionDetails = null
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: prefilledMessage // Initialiser avec le message prérempli s'il existe
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'success_pending' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  // Utilisation du hook d'envoi d'emails personnalisé
  const { sendEmail, loading } = useEmail();

  // Message de débogage pour afficher la valeur de contextSource
  console.log("ContactForm initialisé avec contextSource:", contextSource);

  // Mettre à jour le message si prefilledMessage change
  useEffect(() => {
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

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

  // Formater les détails de transaction pour l'ajout au message
  const formatTransactionDetails = () => {
    if (!transactionDetails) return '';
    
    const { amount, description, date, transactionId, paymentMethod } = transactionDetails;
    const formattedDate = date || new Date().toLocaleDateString('fr-FR');
    
    return `

----- Référence de la transaction -----
Montant: ${amount ? (typeof amount === 'number' ? `${amount.toFixed(2)}€` : `${amount}€`) : 'Non spécifié'}
Description: ${description || 'Non spécifiée'}
Date: ${formattedDate}
N° de transaction: ${transactionId || 'Non spécifié'}
Méthode: ${paymentMethod || 'Non spécifiée'}
`;
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
      // Debug: Afficher les données qui vont être envoyées
      console.log("Tentative d'envoi avec données:", {
        name: formData.name,
        email: formData.email,
        messageLength: formData.message.length
      });
      
      // Préparer le sujet et le message en fonction du contexte
      let subject = `Message de contact de ${formData.name}`;
      const messageContent = formData.message;
      
      // Déterminer le type de formulaire en fonction du contexte
      let formType = "Contact général";
      if (contextSource) {
        switch (contextSource) {
          case 'payment_error':
            formType = "Assistance après erreur de paiement";
            subject = `[Assistance Paiement] Message de ${formData.name}`;
            break;
          case 'ebook_download':
            formType = "Assistance ebook";
            subject = `[Assistance Ebook] Message de ${formData.name}`;
            break;
          case 'ebook_page':
            formType = "Contact Ebook";
            subject = `[Contact Page Ebook] Message de ${formData.name}`;
            break;
          case 'successful_payment':
            formType = "Contact après paiement réussi";
            subject = `[Transaction Réussie] Message de ${formData.name}`;
            break;
          case 'payment_cancelled':
            formType = "Contact après annulation de paiement";
            subject = `[Transaction Annulée] Message de ${formData.name}`;
            break;
          default:
            formType = `Contact: ${contextSource}`;
            break;
        }
      }
      
      // Définir l'interface pour les données d'email
      interface EmailData {
        name: string;
        email: string;
        message: string;
        subject: string;
        formType: string;
        contextSource?: string;
        transactionDetails?: TransactionDetails;
        [key: string]: unknown;  // Permet des propriétés supplémentaires requises par useEmail
      }
      
      // Créer un objet EmailData structuré selon l'interface standardisée
      const emailData: EmailData = {
        name: formData.name,
        email: formData.email,
        message: messageContent,
        subject: subject,
        formType: formType,
        contextSource: contextSource || undefined,
      };
      
      // Ajouter les détails de transaction si disponibles
      if (transactionDetails) {
        emailData.transactionDetails = transactionDetails;
      }
      
      // Utilisation de notre système d'envoi d'email personnalisé
      console.log("Appel du hook d'envoi d'email...");
      console.log("Données complètes envoyées:", {
        ...emailData,
        contextSource: contextSource  // Vérifier spécifiquement cette valeur
      });
      const result = await sendEmail(emailData);
      
      console.log("Résultat de l'envoi:", result);
      
      // Vérifier si l'envoi a réussi
      if (!result.success) {
        // L'envoi a échoué, afficher l'erreur
        setFormStatus('error');
        setErrorMessage(result.message || "Erreur d'authentification avec le serveur d'email. Veuillez réessayer plus tard.");
        
        toast({
          title: "Erreur",
          description: result.message || "Erreur d'authentification avec le serveur d'email",
          variant: "destructive"
        });
        return;
      }
      
      // L'envoi a réussi, continuer avec le traitement du succès
      // Déterminer le type de succès (immédiat ou en attente) basé sur le message de retour
      const isPending = result.message.includes("sera traité dès que possible");
      
      // Définir le statut approprié
      setFormStatus(isPending ? 'success_pending' : 'success');
      
      // Message adapté selon le cas de figure
      const successMessage = isPending 
        ? "Votre message est en cours de traitement et sera transmis dès que possible. Je vous répondrai après réception."
        : "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.";
      
      toast({
        title: isPending ? "Message en cours d'envoi" : "Message envoyé",
        description: successMessage,
      });
      
      // Réinitialiser le formulaire
      setFormData({ name: "", email: "", message: "" });
      
      // Appeler le callback onSuccess si fourni
      if (onSuccess) {
        onSuccess();
      }
      
      // Réinitialiser le statut après 8 secondes (délai plus long pour l'état "pending")
      setTimeout(() => {
        setFormStatus('idle');
      }, isPending ? 8000 : 5000);
    } catch (error) {
      // Afficher des informations détaillées sur l'erreur
      console.error("Erreur détaillée lors de l'envoi:", error);
      const errorObj = error instanceof Error ? 
        { message: error.message, stack: error.stack, name: error.name } : 
        { message: "Erreur inconnue", error };
      console.log("Détails de l'erreur:", errorObj);
      
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
      
      {formStatus === 'success_pending' && (
        <div 
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-md shadow-md"
          style={{ 
            backgroundColor: '#fefce8', 
            transition: 'all 0.3s ease-in',
            animation: 'formFadeIn 0.5s' 
          }}
        >
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <p className="text-yellow-800 font-medium">Message en cours de traitement</p>
              <p className="text-yellow-700 text-sm">Votre message est en cours d'envoi et sera traité dès que possible.</p>
              <p className="text-yellow-700 text-xs mt-1">Vous pouvez quitter cette page, l'envoi se poursuit en arrière-plan.</p>
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
      
      {/* Affichage des détails de transaction en lecture seule si disponibles */}
      {transactionDetails && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">Les détails de votre transaction ci-dessous seront automatiquement joints à votre message :</p>
              <div className="mt-2 text-sm text-gray-600 font-mono p-3 bg-gray-100 rounded">
                <p className="font-medium">Montant: {transactionDetails.amount ? (typeof transactionDetails.amount === 'number' ? `${transactionDetails.amount.toFixed(2)}€` : `${transactionDetails.amount}€`) : 'Non spécifié'}</p>
                <p>Description: {transactionDetails.description || 'Non spécifiée'}</p>
                <p>Date: {transactionDetails.date || new Date().toLocaleDateString('fr-FR')}</p>
                <p>N° de transaction: {transactionDetails.transactionId || 'Non spécifié'}</p>
                <p>Méthode: {transactionDetails.paymentMethod || 'Non spécifiée'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
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