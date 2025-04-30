import { useEffect } from 'react';
import { forceUnlockScroll } from '@/lib/utils';

/**
 * Composant de sécurité qui restaure le défilement de la page dans tous les cas.
 * Il détecte lorsque le défilement est bloqué de manière incorrecte et le restaure.
 */
export const ScrollUnlocker = () => {
  useEffect(() => {
    // Vérifier les symptômes d'un défilement bloqué
    const checkScrollLock = () => {
      if (typeof window !== 'undefined' && document) {
        const body = document.body;
        const html = document.documentElement;
        
        // Signes que le défilement pourrait être bloqué incorrectement
        const isScrollLocked = 
          body.style.overflow === 'hidden' || 
          body.style.position === 'fixed' ||
          body.classList.contains('scroll-locked') ||
          body.classList.contains('modal-open') ||
          html.style.overflow === 'hidden';
          
        // Vérifier si une modale de Radix UI est actuellement ouverte
        const isRadixModalOpen = document.querySelector('[data-state="open"]');
        
        // Si le défilement semble bloqué mais qu'aucune modale n'est ouverte, débloquer
        if (isScrollLocked && !isRadixModalOpen) {
          console.log('ScrollUnlocker: Déverrouillage forcé du défilement');
          forceUnlockScroll();
        }
      }
    };
    
    // Vérifier au chargement initial
    checkScrollLock();
    
    // Ajouter un écouteur pour la touche Échap qui pourrait être utilisée pour fermer des modales
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Lorsque l'utilisateur appuie sur Échap, vérifier si le défilement doit être restauré
        setTimeout(checkScrollLock, 500);
      }
    };
    
    // Ajouter des écouteurs pour détecter les changements d'état potentiels
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('click', () => setTimeout(checkScrollLock, 500));
    
    // Vérification périodique pour les cas persistants
    const interval = setInterval(checkScrollLock, 2000);
    
    return () => {
      // Nettoyage
      window.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('click', () => setTimeout(checkScrollLock, 500));
      clearInterval(interval);
      forceUnlockScroll();
    };
  }, []);
  
  return null; // Ce composant ne rend rien visuellement
};