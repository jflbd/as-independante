import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wkyojjkpvkipygjqvvzs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL not configured');
}

// Utiliser une clé anon pour les uploads côté client
// Si VITE_SUPABASE_ANON_KEY n'existe pas, on utilisera la stratégie RLS/policies de Supabase
const client = supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(supabaseUrl, 'anon-key-not-needed-for-rls');

export default client;
