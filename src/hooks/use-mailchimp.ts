import { useState } from 'react';
import { mailchimpConfig } from '../config/mailchimpConfig';

interface MailchimpSubscribeData {
  email: string;
  firstName?: string;
  lastName?: string;
  source: string;
}

interface MailchimpHookReturn {
  subscribe: (data: MailchimpSubscribeData) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

/**
 * Hook personnalisé pour gérer les inscriptions Mailchimp
 */
export function useMailchimp(): MailchimpHookReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const subscribe = async ({ email, firstName, lastName, source }: MailchimpSubscribeData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Utiliser l'API Route Vercel pour gérer l'inscription à Mailchimp
      const response = await fetch(mailchimpConfig.subscribePath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          source,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setLoading(false);
        return { success: true, message: data.message || 'Inscription réussie!' };
      } else {
        // Gérer les erreurs de l'API
        const errorMessage = data.message || 'Une erreur est survenue lors de l\'inscription';
        setError(errorMessage);
        setLoading(false);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      const errorMessage = 'Erreur de connexion au serveur';
      setError(errorMessage);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  return {
    subscribe,
    loading,
    error,
    success,
  };
}