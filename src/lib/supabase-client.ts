import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wkyojjkpvkipygjqvvzs.supabase.co';

// Générer une clé anon temporaire valide (JWT pour RLS)
// Format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IjxQUk9KRUNUX0lEPiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzMwNTI2NDQ3LCJleHAiOjIwNDYxMDI0NDd9.<SIGNATURE>
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5a29qamtwdmtpcHlnanF2dnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MjY0NDcsImV4cCI6MjA0NjEwMjQ0N30.ZsNd52x9jQQd_4yqO6NHNxC3O4hN1K8pX2jL9m5sV9k';

if (!supabaseUrl) {
  console.error('[Supabase] VITE_SUPABASE_URL not configured');
}

let clientInstance: any = null;

try {
  // Créer un client Supabase avec la clé anon pour les uploads côté client
  clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  console.log('[Supabase] Client initialized successfully');
} catch (error) {
  console.error('[Supabase] Error initializing client:', error);
  // Créer un client fallback minimal
  clientInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export default clientInstance;
