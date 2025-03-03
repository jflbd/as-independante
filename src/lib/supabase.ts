
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Définition directe des variables d'environnement Supabase
const supabaseUrl = "https://levybizvwzwaszhyjhff.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldnliaXp2d3p3YXN6aHlqaGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDgwNjcsImV4cCI6MjA1NjU4NDA2N30.pZ1jlzLymF4qeDjVWJx2AlmPFdJDOYqAZW-w0EQ1fcI";

// Créer le client Supabase avec les clés codées en dur
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper pour gérer les erreurs de base de données
export const handleDatabaseError = (error: any, fallbackMessage: string) => {
  console.error('Database error:', error);
  toast({
    title: 'Erreur',
    description: error?.message || fallbackMessage,
    variant: 'destructive',
  });
};
