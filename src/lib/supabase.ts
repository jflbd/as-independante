
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Récupérer les variables d'environnement Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérifier si les variables d'environnement sont définies
if (!supabaseUrl || !supabaseKey) {
  console.error('Les variables d\'environnement Supabase ne sont pas définies');
  // Au lieu de lancer une erreur, nous allons créer un client factice
  // qui n'interférera pas avec le rendu de l'application
}

// Créer le client Supabase
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : createClient(
      'https://placeholder-url.supabase.co',
      'placeholder-key', 
      { 
        auth: { 
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        } 
      }
    );

// Helper pour gérer les erreurs de base de données
export const handleDatabaseError = (error: any, fallbackMessage: string) => {
  console.error('Database error:', error);
  toast({
    title: 'Erreur',
    description: error?.message || fallbackMessage,
    variant: 'destructive',
  });
};
