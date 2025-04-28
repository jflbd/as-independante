import { useState } from 'react';
import { emailConfig } from '../config/emailConfig';

interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
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

  const sendEmail = async ({ name, email, message, subject }: EmailData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validation des champs
      if (!name || !email || !message) {
        setError(emailConfig.messages.emptyFields);
        setLoading(false);
        return { success: false, message: emailConfig.messages.emptyFields };
      }

      // Configuration du timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), emailConfig.timeouts.sendTimeout);

      // Envoi de la requête à la fonction serverless
      const response = await fetch(emailConfig.sendEmailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          subject: subject || emailConfig.templates.contact.subject,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setLoading(false);
        return { success: true, message: data.message || emailConfig.messages.success };
      } else {
        const errorMessage = data.message || emailConfig.messages.error;
        setError(errorMessage);
        setLoading(false);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      // Gestion des erreurs d'abortController (timeout)
      if (err.name === 'AbortError') {
        const errorMessage = 'Délai d\'envoi dépassé. Veuillez réessayer.';
        setError(errorMessage);
        setLoading(false);
        return { success: false, message: errorMessage };
      }

      // Autres erreurs
      const errorMessage = emailConfig.messages.networkError;
      setError(errorMessage);
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