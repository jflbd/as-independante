
import { createClient } from '@supabase/supabase-js';

// Créer le client Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase ne sont pas définies');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonctions pour la gestion des sections
export async function getSiteContent() {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateSiteContent(content: Partial<any>) {
  const { data, error } = await supabase
    .from('site_content')
    .update(content)
    .eq('id', 1)
    .select();
  
  if (error) throw error;
  return data;
}

// Fonctions pour la gestion des témoignages
export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('order', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function createTestimonial(testimonial: Partial<any>) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: string, testimonial: Partial<any>) {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Fonctions pour la gestion des services
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function createService(service: Partial<any>) {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateService(id: string, service: Partial<any>) {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Fonctions pour la gestion des tarifs
export async function getPricingOptions() {
  const { data, error } = await supabase
    .from('pricing_options')
    .select('*')
    .order('order', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function createPricingOption(option: Partial<any>) {
  const { data, error } = await supabase
    .from('pricing_options')
    .insert(option)
    .select();
  
  if (error) throw error;
  return data;
}

export async function updatePricingOption(id: string, option: Partial<any>) {
  const { data, error } = await supabase
    .from('pricing_options')
    .update(option)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deletePricingOption(id: string) {
  const { error } = await supabase
    .from('pricing_options')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Fonctions pour la gestion des missions
export async function getMissions() {
  const { data, error } = await supabase
    .from('missions')
    .select('*')
    .order('order', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function createMission(mission: Partial<any>) {
  const { data, error } = await supabase
    .from('missions')
    .insert(mission)
    .select();
  
  if (error) throw error;
  return data;
}

export async function updateMission(id: string, mission: Partial<any>) {
  const { data, error } = await supabase
    .from('missions')
    .update(mission)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
}

export async function deleteMission(id: string) {
  const { error } = await supabase
    .from('missions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
