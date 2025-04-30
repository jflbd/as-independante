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
  height?: string;
  scrollBehavior?: string;
} = {};

/**
 * Verrouille le défilement du body tout en préservant la position de défilement actuelle
 * sans remonter la page au début
 */
export function lockScroll(): void {
  if (scrollLocked) return;
  
  if (typeof window !== 'undefined') {
    // Sauvegarde des styles originaux avant de les modifier
    const body = document.body;
    const html = document.documentElement;
    
    // Sauvegarde de la position de défilement
    scrollPosition = window.scrollY;
    
    // Calcul de la largeur de la barre de défilement pour éviter un décalage
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
      height: html.style.height,
      scrollBehavior: html.style.scrollBehavior
    };
    
    // Méthode alternative qui préserve la position visuelle sans utiliser position: fixed
    // Cette approche évite que la page remonte en haut
    body.classList.add('scroll-locked');
    body.style.overflow = 'hidden';
    body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';
    
    // Empêcher le scroll du html également (important pour iOS Safari)
    html.style.overflow = 'hidden';
    
    // Solution pour iOS Safari qui peut toujours défiler
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.top = `-${scrollPosition}px`;
    }
    
    // Marquer comme verrouillé
    scrollLocked = true;
    
    // Ajouter un attribut de données pour faciliter la détection
    document.documentElement.setAttribute('data-scroll-locked', 'true');
    
    // S'assurer que la position de défilement reste inchangée
    setTimeout(() => {
      if (window.scrollY !== scrollPosition && !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.scrollTo(0, scrollPosition);
      }
    }, 0);
  }
}

/**
 * Déverrouille le défilement du body et restaure la position de défilement
 */
export function unlockScroll(): void {
  if (!scrollLocked && !document.documentElement.hasAttribute('data-scroll-locked')) return;
  
  if (typeof window !== 'undefined') {
    const body = document.body;
    const html = document.documentElement;
    
    // Restauration des styles originaux
    body.style.overflow = originalStyle.overflow || '';
    body.style.position = originalStyle.position || '';
    body.style.top = originalStyle.top || '';
    body.style.width = originalStyle.width || '';
    body.style.paddingRight = originalStyle.paddingRight || '';
    html.style.height = originalStyle.height || '';
    html.style.overflow = '';
    
    // Enlever la classe
    body.classList.remove('scroll-locked');
    
    // Restaurer la position de défilement
    window.scrollTo(0, scrollPosition);
    
    // Restaurer le comportement de défilement (après un court délai pour assurer que la position est restaurée)
    setTimeout(() => {
      html.style.scrollBehavior = originalStyle.scrollBehavior || '';
    }, 50);
    
    // Marquer comme déverrouillé
    scrollLocked = false;
    
    // Supprimer l'attribut de données
    document.documentElement.removeAttribute('data-scroll-locked');
    
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
    body.style.left = '';
    body.style.right = '';
    body.style.margin = '';
    
    // Nettoyer les styles du HTML également
    html.style.overflow = '';
    html.style.height = '';
    html.style.position = '';
    html.style.top = '';
    html.style.width = '';
    
    // Spécifique pour tarteaucitron
    body.classList.remove('scroll-locked', 'modal-open', 'overflow-hidden', 'tarteaucitron-modal-open');
    
    // Réinitialiser le comportement de défilement
    setTimeout(() => {
      html.style.scrollBehavior = '';
      window.scrollTo(0, window.scrollY || 0);
    }, 50);
    
    // Supprimer les attributs de données
    html.removeAttribute('data-scroll-locked');
    body.removeAttribute('data-scroll-locked');
    
    // Marquer comme déverrouillé
    scrollLocked = false;
    
    // Réinitialiser les variables
    scrollPosition = 0;
    originalStyle = {};
    
    // Restaurer la visibilité des éléments qui peuvent avoir été masqués
    const hiddenElements = document.querySelectorAll('[aria-hidden="true"][data-modal-backdrop]');
    hiddenElements.forEach((el) => {
      el.removeAttribute('aria-hidden');
    });
  }
}
