import { useState } from 'react';
import { emailConfig } from '../config/emailConfig';

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
  contextSource?: string; // Source du contexte (ex: "payment_error", "ebook_download")
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
      const emailData = {
        ...data,
        subject: emailSubject,
      };

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
        responseData = await response.json();
        
        // Log détaillé de la réponse pour le débogage
        console.log("Réponse du serveur d'email:", { 
          status: response.status,
          ok: response.ok,
          data: responseData 
        });
        
        if (!response.ok) {
          throw new Error(responseData.message || emailConfig.messages.error);
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
          throw new Error("Le serveur met trop de temps à répondre. Veuillez réessayer.");
        } else {
          // Relancer l'erreur pour qu'elle soit traitée par le bloc catch externe
          throw fetchError;
        }
      }
      
    } catch (err) {
      console.error("Erreur lors de l'envoi d'email:", err);
      
      // Message d'erreur détaillé
      const errorMessage = err instanceof Error ? err.message : emailConfig.messages.networkError;
      
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