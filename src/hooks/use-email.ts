import { useState } from 'react';
import { emailConfig } from '../config/emailConfig';
import { enrichEmailDataWithDebugInfo } from './use-email-debug';

// Interface pour les détails de transaction
interface TransactionDetails {
  amount?: string | number;
  description?: string;
  date?: string;
  transactionId?: string;
  paymentMethod?: string;
}

// Interface complète et flexible pour les données d'email
interface EmailData {
  name: string;           // Nom de l'expéditeur (obligatoire)
  email: string;          // Email de l'expéditeur (obligatoire)
  message: string;        // Message du contact (obligatoire)
  subject?: string;       // Sujet de l'email (optionnel)
  phone?: string;         // Numéro de téléphone (optionnel)
  company?: string;       // Entreprise ou organisation (optionnel)
  formType?: string;      // Type de formulaire (ex: "Contact général", "Demande de devis")
  transactionDetails?: TransactionDetails; // Détails de la transaction si applicable
  contextSource?: string; // Source du contexte (ex: "paiement_erreur", "ebook_download")
  // Champs supplémentaires génériques pour la flexibilité
  [key: string]: string | number | boolean | TransactionDetails | undefined;
}

interface EmailHookReturn {
  sendEmail: (data: EmailData) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

/**
 * Hook personnalisé pour gérer l'envoi d'emails
 */
export function useEmail(): EmailHookReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const sendEmail = async (data: EmailData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validation des champs obligatoires
      if (!data.name || !data.email || !data.message) {
        setError(emailConfig.messages.emptyFields);
        setLoading(false);
        return { success: false, message: emailConfig.messages.emptyFields };
      }

      // Préparer le sujet par défaut si non fourni
      const emailSubject = data.subject || emailConfig.templates.contact.subject;

      // Préparation des données à envoyer
      const emailData = enrichEmailDataWithDebugInfo({
        ...data,
        subject: emailSubject,
      });

      console.log("Tentative d'envoi d'email vers:", emailConfig.sendEmailEndpoint);
      console.log("Données envoyées:", emailData);

      // Variable pour suivre si la requête a abouti ou non
      let requestSucceeded = false;
      let responseData;

      // Envoi de la requête au serveur avec un timeout
      try {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), emailConfig.timeouts.sendTimeout);
        
        const response = await fetch(emailConfig.sendEmailEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailData),
          signal: abortController.signal
        });
        
        clearTimeout(timeoutId);
        
        // Log de la réponse brute pour le débogage
        const responseText = await response.text();
        console.log("Réponse brute:", responseText);
        
        // Essayer de parser la réponse en JSON, avec une gestion d'erreur spécifique
        try {
          responseData = responseText ? JSON.parse(responseText) : { message: "Aucune réponse du serveur" };
        } catch (parseError) {
          console.error("Erreur de parsing JSON:", parseError);
          
          // Messages d'erreur personnalisés selon le contenu de la réponse
          if (responseText.includes("Internal Server Error")) {
            throw new Error("Le serveur a rencontré une erreur interne. Merci de réessayer plus tard.");
          } else if (responseText.includes("Bad Gateway")) {
            throw new Error("Problème de connexion au serveur d'email. Merci de réessayer plus tard.");
          } else if (responseText.includes("Gateway Timeout")) {
            throw new Error("Délai d'attente dépassé. Le serveur met trop de temps à répondre.");
          } else if (responseText.length === 0) {
            throw new Error("Le serveur n'a pas renvoyé de réponse. Vérifiez votre connexion internet.");
          } else {
            throw new Error(`Erreur inattendue du serveur: ${responseText.substring(0, 100)}`);
          }
        }
        
        // Log détaillé de la réponse pour le débogage
        console.log("Réponse du serveur d'email:", { 
          status: response.status,
          ok: response.ok,
          data: responseData 
        });
        
        if (!response.ok) {
          // Messages d'erreur adaptés selon le code de statut HTTP
          switch (response.status) {
            case 400:
              throw new Error(responseData.message || "Données incorrectes. Vérifiez les informations saisies.");
            case 401:
            case 403:
              throw new Error("Erreur d'authentification avec le serveur d'email.");
            case 404:
              throw new Error("Le service d'envoi d'email est actuellement indisponible.");
            case 429:
              throw new Error("Trop de tentatives d'envoi. Veuillez réessayer dans quelques minutes.");
            case 500:
              throw new Error("Le serveur a rencontré une erreur lors du traitement de votre demande.");
            case 502:
              throw new Error("Le serveur de messagerie est temporairement indisponible.");
            case 503:
            case 504:
              throw new Error("Le service d'envoi d'email est actuellement surchargé. Veuillez réessayer plus tard.");
            default:
              throw new Error(responseData.message || emailConfig.messages.error);
          }
        }
        
        requestSucceeded = true;
        setSuccess(true);
        
        setLoading(false);
        return { 
          success: true, 
          message: responseData.message || emailConfig.messages.success
        };
      } catch (fetchError) {
        // Si l'erreur est une erreur d'abandon (timeout), on retourne un message spécifique
        if (fetchError.name === 'AbortError') {
          console.log("Délai d'attente dépassé pour l'envoi d'email");
          throw new Error("Le serveur met trop de temps à répondre. Veuillez réessayer ultérieurement.");
        } else {
          // Relancer l'erreur pour qu'elle soit traitée par le bloc catch externe
          throw fetchError;
        }
      }
      
    } catch (err) {
      console.error("Erreur détaillée lors de l'envoi d'email:", err);
      
      // Message d'erreur détaillé
      let errorMessage = emailConfig.messages.networkError;
      
      if (err instanceof Error) {
        // Amélioration des messages d'erreur réseau spécifiques
        if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
          errorMessage = "Impossible de se connecter au serveur d'email. Vérifiez votre connexion internet.";
        } else if (err.message.includes("timeout") || err.message.includes("Timeout")) {
          errorMessage = "Le serveur met trop de temps à répondre. Veuillez réessayer ultérieurement.";
        } else {
          errorMessage = err.message; // Utiliser le message d'erreur original s'il est informatif
        }
      }
      
      setError(errorMessage);
      setSuccess(false); // S'assurer que success est à false en cas d'erreur
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  return {
    sendEmail,
    loading,
    error,
    success,
  };
}