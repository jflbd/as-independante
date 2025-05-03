import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate une date en format français (ex: "15 avril 2023")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// Variables pour le verrouillage du défilement
let scrollPosition = 0;
let scrollLocked = false;
let originalStyle = {};

/**
 * Verrouille le défilement du body tout en préservant la position de défilement actuelle
 */
export function lockScroll(): void {
  if (scrollLocked) return;
  
  if (typeof window !== 'undefined') {
    const body = document.body;
    const html = document.documentElement;
    
    // Sauvegarde de la position de défilement actuelle
    scrollPosition = window.scrollY;
    
    // Calcul de la largeur de la barre de défilement pour éviter un décalage de mise en page
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Sauvegarde des styles originaux
    originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
      height: html.style.height,
      overflow_html: html.style.overflow
    };
    
    // Approche universelle qui fonctionne sur tous les navigateurs
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbarWidth}px`;
    html.style.overflow = 'hidden';
    
    // Solution spécifique pour iOS qui a un comportement particulier
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      body.style.position = 'fixed';
      body.style.top = `-${scrollPosition}px`;
      body.style.width = '100%';
    }
    
    // Marquer comme verrouillé
    scrollLocked = true;
  }
}

/**
 * Déverrouille le défilement du body et restaure la position de défilement
 */
export function unlockScroll(): void {
  if (!scrollLocked) return;
  
  if (typeof window !== 'undefined') {
    const body = document.body;
    const html = document.documentElement;
    
    // Restauration des styles
    body.style.overflow = originalStyle.overflow || '';
    body.style.paddingRight = originalStyle.paddingRight || '';
    body.style.position = originalStyle.position || '';
    body.style.top = originalStyle.top || '';
    body.style.width = originalStyle.width || '';
    html.style.overflow = originalStyle.overflow_html || '';
    
    // Pour iOS, nous devons restaurer la position de défilement manuellement
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      window.scrollTo(0, scrollPosition);
    }
    
    // Marquer comme déverrouillé
    scrollLocked = false;
    
    // Réinitialiser les variables
    scrollPosition = 0;
    originalStyle = {};
  }
}

/**
 * Force un déverrouillage du défilement dans les situations exceptionnelles
 */
export function forceUnlockScroll(): void {
  if (typeof window !== 'undefined') {
    const body = document.body;
    const html = document.documentElement;
    
    // Nettoyer tous les styles qui pourraient bloquer le défilement
    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.paddingRight = '';
    body.style.height = '';
    body.style.left = '';
    body.style.right = '';
    
    html.style.overflow = '';
    html.style.height = '';
    
    // Suppression des classes qui pourraient affecter le défilement
    body.classList.remove('scroll-locked', 'modal-open', 'overflow-hidden');
    
    // Marquer comme déverrouillé
    scrollLocked = false;
    
    // Réinitialiser les variables
    scrollPosition = 0;
    originalStyle = {};
  }
}
