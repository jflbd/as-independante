import { useEffect, useCallback, useRef } from 'react';
import { forceUnlockScroll } from '@/lib/utils';

/**
 * Composant de sécurité qui restaure le défilement de la page si nécessaire
 * Détecte automatiquement si le défilement est bloqué incorrectement et le restaure
 */
export const ScrollUnlocker = () => {
  // Référence pour suivre si des vérifications sont en cours
  const isCheckingRef = useRef(false);
  
  // Fonction optimisée pour vérifier et corriger le verrouillage du scroll
  const checkAndFixScrollLock = useCallback(() => {
    if (isCheckingRef.current || typeof window === 'undefined') return;
    
    isCheckingRef.current = true;
    
    try {
      const body = document.body;
      const html = document.documentElement;
      
      // 1. Vérifier si une modale est actuellement ouverte
      const hasOpenModal = 
        document.querySelector('[data-state="open"]') || // Dialog de Radix UI
        document.querySelector('[role="dialog"][aria-modal="true"]') || // Dialogue standard
        document.getElementById('tarteaucitronAlertBig')?.style.display === 'block'; // TarteAuCitron
      
      // 2. Vérifier si le défilement semble bloqué
      const hasScrollLock = 
        body.style.overflow === 'hidden' || 
        body.style.position === 'fixed' ||
        body.classList.contains('scroll-locked') ||
        body.classList.contains('modal-open') ||
        html.style.overflow === 'hidden' ||
        html.getAttribute('data-scroll-locked') === 'true';
      
      // 3. Si le défilement est bloqué mais qu'aucune modale n'est ouverte, débloquer
      if (hasScrollLock && !hasOpenModal) {
        console.log('ScrollUnlocker: Déverrouillage du défilement bloqué incorrectement');
        forceUnlockScroll();
      }
    } finally {
      isCheckingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Exécuter la vérification à l'initialisation
    checkAndFixScrollLock();
    
    // Vérifications périodiques et sur des événements clés
    const checkWithDelay = () => setTimeout(checkAndFixScrollLock, 300);
    
    // Événements susceptibles d'affecter le défilement
    window.addEventListener('resize', checkWithDelay);
    window.addEventListener('orientationchange', checkWithDelay);
    window.addEventListener('popstate', checkWithDelay);
    window.addEventListener('pageshow', checkWithDelay);
    
    // Vérification lors d'un clic (potentielle fermeture de modale)
    document.addEventListener('click', checkWithDelay);
    
    // Vérification lors de l'appui sur Echap
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') checkWithDelay();
    });
    
    // Vérification périodique en arrière-plan (toutes les 3 secondes)
    const interval = setInterval(checkAndFixScrollLock, 3000);
    
    // Observer les changements aux attributs style/class de body et html
    const observer = new MutationObserver(checkWithDelay);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style', 'class']
    });
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });
    
    return () => {
      // Nettoyage
      window.removeEventListener('resize', checkWithDelay);
      window.removeEventListener('orientationchange', checkWithDelay);
      window.removeEventListener('popstate', checkWithDelay);
      window.removeEventListener('pageshow', checkWithDelay);
      document.removeEventListener('click', checkWithDelay);
      
      clearInterval(interval);
      observer.disconnect();
      
      // Force un déverrouillage au démontage
      forceUnlockScroll();
    };
  }, [checkAndFixScrollLock]);
  
  // Ce composant ne rend rien visuellement
  return null;
};