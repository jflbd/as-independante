import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/siteConfig";
import { Send, CheckCircle2, AlertCircle, Loader2, Clock, Info, RefreshCw, ArrowRight } from "lucide-react";
import { useEmail } from "@/hooks/use-email";
import { Button } from "@/components/ui/button";

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
type ContextSource = 'payment_error' | 'ebook_download' | 'successful_payment' | 'payment_cancelled' | 'ebook_page' | 'quote' | 'devis-pro' | 'home' | string;

// Type pour les détails contextuels selon la source
type ContextDetails = ErrorDetails | Record<string, unknown> | null;

interface ContactFormProps {
  onSuccess?: () => void;
  contextSource?: ContextSource;
  contextDetails?: ContextDetails;
  prefilledMessage?: string; // Message prérempli
  transactionDetails?: TransactionDetails; // Détails de transaction à ajouter automatiquement
  inModal?: boolean; // Indique si le formulaire est dans une modale
  formType?: 'contact' | 'quote'; // Type de formulaire : contact ou devis
  isHomepage?: boolean; // Indique si le formulaire est sur la page d'accueil et affiche un message alternatif avec compteur
}

const ContactForm = ({ 
  onSuccess, 
  contextSource = '', 
  contextDetails = null,
  prefilledMessage = '',
  transactionDetails = null,
  inModal = true, // Par défaut, on suppose que c'est dans une modale
  formType = 'contact', // Par défaut, on utilise le formulaire de contact standard
  isHomepage = false, // Par défaut, on suppose que ce n'est pas sur la page d'accueil
}: ContactFormProps) => {
  
  // Déterminer si on utilise le formulaire de devis basé sur le formType OU le contextSource
  const isQuoteForm = formType === 'quote' || contextSource === 'devis-pro';
  
  // État du formulaire avec champs conditionnels pour le devis
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: prefilledMessage, // Initialiser avec le message prérempli s'il existe
    phone: "",    // Toujours initialiser à chaîne vide, qu'importe le type de formulaire
    company: ""   // Toujours initialiser à chaîne vide, qu'importe le type de formulaire
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'success_pending' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(5); // Compteur pour la fermeture automatique
  
  // Référence au conteneur du formulaire pour le scroll
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  // Utilisation du hook d'envoi d'emails personnalisé
  const { sendEmail, loading } = useEmail();

  // Mettre à jour le message si prefilledMessage change
  useEffect(() => {
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  // Gestionnaire pour réinitialiser le formulaire après une erreur
  const handleResetForm = useCallback(() => {
    setFormStatus('idle');
    setErrorMessage("");
    // On garde les données du formulaire pour permettre à l'utilisateur de corriger
  }, []);
  
  // Effet pour gérer les statuts du formulaire
  useEffect(() => {
    let successTimeout: number;
    let errorTimeout: number;
    
    if (formStatus === 'success' || formStatus === 'success_pending') {
      // Réinitialiser le compteur lorsque le message de succès s'affiche
      setCountdown(8);
      
      // Si dans une modale, appeler onSuccess qui fermera la modale après un délai
      if (onSuccess && inModal) {
        successTimeout = window.setTimeout(() => {
          onSuccess();
        }, 10000); // 10 secondes pour être en sync avec le compteur
      } else {
        // Sinon, réinitialiser simplement le statut après un délai
        successTimeout = window.setTimeout(() => {
          setFormStatus('idle');
        }, 10000);
      }
    } else if (formStatus === 'error') {
      // Réinitialiser le compteur lorsque le message d'erreur s'affiche
      setCountdown(8);
      
      // Réinitialiser le formulaire après 10 secondes en cas d'erreur
      errorTimeout = window.setTimeout(() => {
        handleResetForm();
      }, 10000);
    }
    
    return () => {
      if (successTimeout) clearTimeout(successTimeout);
      if (errorTimeout) clearTimeout(errorTimeout);
    };
  }, [formStatus, onSuccess, inModal, handleResetForm]);
  
  // Effet pour gérer le compteur de décompte
  useEffect(() => {
    let countdownInterval: number;
    
    if (formStatus === 'success' || formStatus === 'success_pending' || formStatus === 'error') {
      // Démarrer le compteur de décompte
      countdownInterval = window.setInterval(() => {
        setCountdown(currentCount => {
          if (currentCount <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return currentCount - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [formStatus]);

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
      setErrorMessage("");
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
    
    // Validation des champs obligatoires selon le type de formulaire
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      setFormStatus('error');
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    // Validation supplémentaire pour le formulaire de devis
    if (isQuoteForm && (!formData.phone || !formData.company)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      setFormStatus('error');
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);
    setFormStatus('idle');
    setErrorMessage("");
    
    try {
      // Déterminer le type de message et le sujet en fonction du contexte
      const messageType = isQuoteForm ? "Devis pro" : "Contact";
      let pageContext = "";
      
      // Déterminer la page ou le contexte spécifique
      if (contextSource && contextSource !== 'quote' && contextSource !== 'devis-pro') {
        pageContext = `[${contextSource}]`;
      }
      
      // Construire le sujet du mail standardisé
      const subject = isQuoteForm 
        ? `Demande de devis de ${formData.name} - ${formData.company}`
        : `Message de contact de ${formData.name} ${pageContext}`;
      
      // Construire le corps du message standardisé sans préfixe (celui-ci sera géré côté backend)
      let messageBody = formData.message;
      
      // Ajouter les détails de transaction si disponibles
      if (transactionDetails) {
        messageBody += formatTransactionDetails();
      }
      
      // Définir l'interface pour les données d'email standardisées
      interface EmailData {
        name: string;
        email: string;
        message: string;
        subject: string;
        messageType: string;
        contextSource?: string;
        pageContext?: string;
        phone?: string;
        company?: string;
        transactionDetails?: TransactionDetails;
        [key: string]: unknown;
      }
      
      // Créer un objet EmailData structuré selon l'interface standardisée
      const emailData: EmailData = {
        name: formData.name,
        email: formData.email,
        message: messageBody,
        subject: subject,
        messageType: messageType,
        contextSource: contextSource || undefined,
        pageContext: pageContext || undefined,
      };
      
      // Ajouter les champs spécifiques au devis si nécessaire
      if (isQuoteForm && formData.phone && formData.company) {
        emailData.phone = formData.phone;
        emailData.company = formData.company;
      }
      
      // Ajouter les détails de transaction si disponibles
      if (transactionDetails) {
        emailData.transactionDetails = transactionDetails;
      }
      
      // Utilisation de notre système d'envoi d'email personnalisé
      
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
      setFormData({
        name: "",
        email: "",
        message: "",
        phone: isQuoteForm ? "" : "",
        company: isQuoteForm ? "" : ""
      });
      
      // Faire défiler vers le haut pour montrer le message de succès si nécessaire
      if (formContainerRef.current) {
        formContainerRef.current.scrollTop = 0;
      }
    } catch (error) {
      // Afficher des informations détaillées sur l'erreur
      console.error("Erreur détaillée lors de l'envoi:", error);
      
      // Mise à jour du statut et affichage d'un toast d'erreur
      setFormStatus('error');
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
  
  // Rendu des messages de statut en plein écran pour les modales
  const renderFullScreenMessage = () => {
    if (!inModal) return null; // Ne pas afficher en plein écran si pas dans une modale
    
    if (formStatus === 'success') {
      return (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e0f7e6] z-10 px-6 py-8 text-center rounded-t-lg">
            <div className="bg-[#c1f8d2] rounded-full p-6 mb-6">
              <div className="h-24 w-24 rounded-full bg-[#23a54c]/20 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-[#23a54c]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#166534] mb-3">Demande envoyée avec succès !</h3>
            <p className="text-[#166534] text-lg mb-5">Je vous répondrai dans les plus brefs délais.</p>
            
            <p className="text-[#15803d] mb-6">
              {inModal ? 
                `Cette fenêtre se fermera automatiquement dans ${countdown} secondes...` : 
                `Ce message disparaîtra dans ${countdown} secondes...`
              }
            </p>
          </div>
          
          {onSuccess && (
            <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-white py-4 border-t border-gray-200 rounded-b-lg">
              <Button
                type="button"
                onClick={() => {
                  if (onSuccess) onSuccess();
                }}
                className="bg-[#0d8496] hover:bg-[#065964] text-white px-8 py-3 rounded-md text-base font-medium"
              >
                Fermer maintenant
              </Button>
            </div>
          )}
        </>
      );
    }
    
    // Garder le même style pour success_pending
    if (formStatus === 'success_pending') {
      return (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-yellow-50 z-10 px-6 py-8 text-center rounded-t-lg">
            <div className="bg-yellow-200 rounded-full p-6 mb-4">
              <Clock className="h-16 w-16 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Message en cours de traitement</h3>
            <p className="text-yellow-700 mb-4">Votre message est en cours d'envoi et sera traité dès que possible.</p>
            <p className="text-yellow-600 text-sm mb-6">
              {inModal ? 
                `Cette fenêtre se fermera automatiquement dans ${countdown} secondes...` : 
                `Ce message disparaîtra dans ${countdown} secondes...`
              }
            </p>
          </div>
          
          {onSuccess && (
            <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-white py-4 border-t border-gray-200 rounded-b-lg">
              <Button
                type="button"
                onClick={() => {
                  if (onSuccess) onSuccess();
                }}
                className="bg-[#0d8496] hover:bg-[#065964] text-white px-8 py-3 rounded-md text-base font-medium"
              >
                Fermer maintenant
              </Button>
            </div>
          )}
        </>
      );
    }
    
    if (formStatus === 'error') {
      return (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 z-10 px-6 py-8 text-center rounded-t-lg">
            <div className="bg-red-200 rounded-full p-6 mb-4">
              <AlertCircle className="h-16 w-16 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Erreur lors de l'envoi</h3>
            <p className="text-red-700 mb-4">{errorMessage}</p>
            <p className="text-red-600 text-sm mb-6">
              {inModal ? 
                `Le formulaire sera réinitialisé dans ${countdown} secondes...` : 
                `Ce message disparaîtra dans ${countdown} secondes...`
              }
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-white py-4 border-t border-gray-200 rounded-b-lg">
            <Button
              onClick={handleResetForm}
              className="bg-red-600 hover:bg-red-700 text-white px-8 flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Réessayer maintenant
            </Button>
          </div>
        </>
      );
    }
    
    return null;
  };

  // Messages de statut standards (pour quand on n'est pas en mode plein écran)
  const renderStandardMessages = () => {
    if (inModal) return null; // Ne pas afficher les messages standards si dans une modale
    
    return (
      <>
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
                <p className="text-green-800 font-medium">{isQuoteForm ? "Demande envoyée avec succès !" : "Message envoyé avec succès !"}</p>
                <p className="text-green-700 text-sm">Je vous répondrai dans les plus brefs délais.</p>
              </div>
            </div>
          </div>
        )}
        
        {formStatus === 'success_pending' && (
          <div 
            className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-4 rounded-md shadow-md"
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
      </>
    );
  };

  // Affichage du formulaire de contact standard
  const renderStandardContactForm = () => {
    return (
      <>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Nom et prénom <span className="text-red-500">*</span></label>
          <input 
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            required
            disabled={isSubmitting}
            placeholder="Votre nom complet"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
          <input 
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            required
            disabled={isSubmitting}
            placeholder="votre.email@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">Message <span className="text-red-500">*</span></label>
          <textarea 
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            required
            disabled={isSubmitting}
            placeholder="Votre message..."
          ></textarea>
        </div>
      </>
    );
  };

  // Affichage du formulaire de devis (formaté selon la capture d'écran)
  const renderQuoteForm = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Nom et prénom</label>
            <input 
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm sm:text-base"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Entreprise / Organisation</label>
            <input 
              id="company"
              name="company"
              type="text"
              value={formData.company || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm sm:text-base"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm sm:text-base"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Téléphone</label>
            <input 
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm sm:text-base"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="mt-4 md:mt-6">
          <label htmlFor="message" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Votre besoin d'accompagnement</label>
          <textarea 
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none text-sm sm:text-base"
            required
            disabled={isSubmitting}
            placeholder="Décrivez brièvement votre situation et vos attentes..."
          ></textarea>
        </div>
      </>
    );
  };

  return (
    <div ref={formContainerRef} className="relative">
      {/* Message en plein écran si applicable */}
      {renderFullScreenMessage()}
      
      {/* Formulaire - masqué si un message en plein écran est affiché dans une modale */}
      <form 
        onSubmit={handleSubmit}
        className={`space-y-4 ${(formStatus !== 'idle' && inModal) ? 'opacity-0 pointer-events-none' : ''}`}
      >
        {/* Messages de statut standards (pour quand on n'est pas en mode plein écran) */}
        {renderStandardMessages()}
        
        {/* Affichage conditionnel du formulaire selon le type */}
        {isQuoteForm ? renderQuoteForm() : renderStandardContactForm()}
        
        <div className="text-xs text-gray-500 mt-4">
          {isQuoteForm ? (
            <p>
              En soumettant ce formulaire, vous serez contacté par {siteConfig.name} avec l'adresse email {siteConfig.contact.email}
            </p>
          ) : (
            <>
              <p>Les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires.</p>
              <p className="mt-1">En soumettant ce formulaire, vous serez contacté par {siteConfig.name} avec l'adresse email {siteConfig.contact.email}</p>
            </>
          )}
        </div>
        
        <div className={`flex ${isQuoteForm ? 'justify-between' : 'justify-end'} mt-4`}>
          {isQuoteForm && (
            <Button
              type="button"
              onClick={onSuccess}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-2 rounded-md"
            >
              Annuler
            </Button>
          )}
          
          <Button
            type="submit"
            className={`${isQuoteForm 
              ? 'bg-[#4A99A7] hover:bg-[#3a7a86] text-white px-8 py-2 rounded-md flex items-center' 
              : 'bg-[#0d8496] hover:bg-[#065964] text-white px-8 flex items-center gap-2'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-1" />
                Envoi en cours...
              </>
            ) : (
              <>
                {isQuoteForm ? (
                  <>
                    Envoyer ma demande
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-1" />
                    Envoyer mon message
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </form>
      
      {/* Bouton placé en dehors de la div rouge pour l'affichage des erreurs */}
      {formStatus === 'error' && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <Button
            onClick={handleResetForm}
            className="bg-red-600 hover:bg-red-700 text-white px-8 flex items-center gap-2 shadow-lg"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer maintenant
          </Button>
        </div>
      )}
      
      {/* Bouton placé en dehors de la div verte pour le cas de succès */}
      {formStatus === 'success' && onSuccess && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <Button
            type="button"
            onClick={() => {
              if (onSuccess) onSuccess();
            }}
            className="bg-[#0d8496] hover:bg-[#065964] text-white px-8 py-3 rounded-md text-base font-medium shadow-lg"
          >
            Fermer maintenant
          </Button>
        </div>
      )}
      
      {/* Bouton placé en dehors de la div jaune pour le cas de succès en attente */}
      {formStatus === 'success_pending' && onSuccess && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <Button
            type="button"
            onClick={() => {
              if (onSuccess) onSuccess();
            }}
            className="bg-[#0d8496] hover:bg-[#065964] text-white px-8 shadow-lg"
          >
            Fermer maintenant
          </Button>
        </div>
      )}
    </div>
  );
}

export default ContactForm;