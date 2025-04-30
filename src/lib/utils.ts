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
let originalStyle: {
  overflow?: string;
  position?: string;
  top?: string;
  width?: string;
  paddingRight?: string;
} = {};

/**
 * Verrouille le défilement du body tout en préservant la position de défilement actuelle
 */
export function lockScroll(): void {
  if (scrollLocked) return;
  
  if (typeof window !== 'undefined') {
    // Sauvegarde des styles originaux avant de les modifier
    const body = document.body;
    originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight
    };
    
    // Sauvegarde de la position de défilement
    scrollPosition = window.scrollY;
    
    // Calcul de la largeur de la barre de défilement pour éviter un décalage
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Application des styles qui verrouillent le défilement mais maintiennent la position visuelle
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
    
    // Ajouter un padding pour compenser la barre de défilement disparue
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    // Marquer comme verrouillé
    scrollLocked = true;
    
    // Ajouter une classe pour d'autres effets CSS potentiels
    body.classList.add('scroll-locked');
    
    // Correction pour iOS Safari
    document.documentElement.style.scrollBehavior = 'auto';
  }
}

/**
 * Déverrouille le défilement du body et restaure la position de défilement
 */
export function unlockScroll(): void {
  if (!scrollLocked) return;
  
  if (typeof window !== 'undefined') {
    const body = document.body;
    
    // Restauration des styles originaux
    body.style.overflow = originalStyle.overflow || '';
    body.style.position = originalStyle.position || '';
    body.style.top = originalStyle.top || '';
    body.style.width = originalStyle.width || '';
    body.style.paddingRight = originalStyle.paddingRight || '';
    
    // Enlever la classe
    body.classList.remove('scroll-locked');
    
    // Restaurer la position de défilement
    window.scrollTo(0, scrollPosition);
    
    // Restaurer le comportement de défilement
    document.documentElement.style.scrollBehavior = '';
    
    // Marquer comme déverrouillé
    scrollLocked = false;
    
    // Réinitialiser les variables
    scrollPosition = 0;
    originalStyle = {};
  }
}

/**
 * Force un déverrouillage du défilement dans les situations exceptionnelles
 * Par exemple, lorsqu'une modale se ferme sans appeler correctement unlockScroll
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
    body.style.overflow = '';
    
    // Enlever toutes les classes qui pourraient être liées au verrouillage
    body.classList.remove('scroll-locked', 'modal-open', 'overflow-hidden');
    
    // Réinitialiser les styles HTML également
    html.style.overflow = '';
    html.style.height = '';
    html.style.scrollBehavior = '';
    
    // Marquer comme déverrouillé
    scrollLocked = false;
    
    // Réinitialiser les variables
    scrollPosition = 0;
    originalStyle = {};
  }
}
