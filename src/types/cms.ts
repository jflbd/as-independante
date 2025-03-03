
export interface Section {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image_url: string;
  quote: string;
  stars: number;
  is_visible: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  is_for_professionals: boolean;
  is_visible: boolean;
  order: number;
}

export interface PricingOption {
  id: string;
  title: string;
  price: string;
  features: string[];
  is_visible: boolean;
  order: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  icon: string;
  is_visible: boolean;
  order: number;
}

export interface SiteContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  about_title: string;
  about_subtitle: string;
  about_content: string;
  services_title: string;
  services_subtitle: string;
  testimonials_title: string;
  testimonials_subtitle: string;
  missions_title: string;
  missions_subtitle: string;
  pricing_title: string;
  pricing_subtitle: string;
  contact_title: string;
  contact_subtitle: string;
}
