import { useEffect, useCallback } from 'react';
import { forceUnlockScroll } from '@/lib/utils';

/**
 * Composant de sécurité qui restaure le défilement de la page dans tous les cas.
 * Il détecte lorsque le défilement est bloqué de manière incorrecte et le restaure.
 */
export const ScrollUnlocker = () => {
  // Fonction optimisée pour vérifier et corriger le verrouillage du scroll
  const checkAndFixScrollLock = useCallback(() => {
    if (typeof window !== 'undefined' && document) {
      const body = document.body;
      const html = document.documentElement;
      
      // Vérifier si une modale de Radix UI ou autre composant modal est actuellement ouverte
      const isRadixModalOpen = document.querySelector('[data-state="open"]');
      const isDialogOpen = document.querySelector('[role="dialog"][aria-modal="true"]');
      const isTarteAuCitronOpen = document.getElementById('tarteaucitron')?.style.display === 'block' || 
                                 document.getElementById('tarteaucitronAlertBig')?.style.display === 'block';
      
      // Signes que le défilement pourrait être bloqué incorrectement
      const isScrollLocked = 
        body.style.overflow === 'hidden' || 
        body.style.position === 'fixed' ||
        body.classList.contains('scroll-locked') ||
        body.classList.contains('modal-open') ||
        html.style.overflow === 'hidden' ||
        html.style.position === 'fixed' ||
        html.hasAttribute('data-scroll-locked') ||
        body.hasAttribute('data-scroll-locked');
      
      // Test fonctionnel de la capacité de défilement
      const canScroll = document.documentElement.scrollHeight > window.innerHeight && 
                       !isRadixModalOpen && 
                       !isDialogOpen &&
                       !isTarteAuCitronOpen;
      
      // Si le défilement semble bloqué mais qu'aucune modale n'est ouverte, débloquer
      if (isScrollLocked && canScroll) {
        console.log('ScrollUnlocker: Déverrouillage forcé du défilement');
        forceUnlockScroll();
        
        // Tentative de restauration supplémentaire des propriétés
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.paddingRight = '';
        body.style.height = '';
        html.style.overflow = '';
        html.style.height = '';
        html.style.position = '';
        
        // Restaurer le corps en cas de classe tarteaucitron
        body.classList.remove('tarteaucitron-modal-open');
        
        // Essayer de rétablir le comportement normal de défilement
        setTimeout(() => {
          window.scrollTo(0, window.scrollY || 0);
        }, 10);
      }
    }
  }, []);

  useEffect(() => {
    // Fonction qui vérifie l'état avec une série de délais croissants
    const checkWithDelays = () => {
      // Exécuter immédiatement
      checkAndFixScrollLock();
      
      // Puis avec des délais progressifs pour capturer différents timings de fermeture
      setTimeout(checkAndFixScrollLock, 100);
      setTimeout(checkAndFixScrollLock, 300);
      setTimeout(checkAndFixScrollLock, 800);
    };
    
    // Vérifier au chargement initial
    checkWithDelays();
    
    // Capturer les événements qui pourraient indiquer une fermeture de modal
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        checkWithDelays();
      }
    };
    
    // Délégation d'événements pour capturer les clics sur des boutons de fermeture
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Vérifier si le clic est sur un bouton de fermeture potentiel
      if (target.closest('[aria-label*="close" i], [aria-label*="fermer" i], .close-button, .close, [data-close], #tarteaucitronClosePanel, #tarteaucitronCloseCross, .tarteaucitronDeny')) {
        checkWithDelays();
      } else {
        // Pour tout autre clic, vérifier avec un léger délai
        setTimeout(checkAndFixScrollLock, 300);
      }
    };
    
    // Observer les changements dans le DOM qui pourraient indiquer qu'une modal a été fermée
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // Si des nœuds sont supprimés, cela pourrait être une modal qui se ferme
        if (mutation.removedNodes.length > 0) {
          checkWithDelays();
          break;
        }
        
        // Si des attributs de style ou de classe changent sur body ou html
        if (mutation.type === 'attributes' && 
            (mutation.target === document.body || mutation.target === document.documentElement)) {
          checkWithDelays();
          break;
        }
        
        // Si l'affichage de tarteaucitron change
        if (mutation.type === 'attributes' && 
            (mutation.target as HTMLElement).id === 'tarteaucitron' && 
            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
          checkWithDelays();
          break;
        }
      }
    });
    
    // Observer le body et le html pour les changements d'attributs
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    
    // Observer le document pour les changements de structure qui pourraient indiquer une modal fermée
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Observer spécifiquement tarteaucitron
    const tarteaucitronElem = document.getElementById('tarteaucitron');
    if (tarteaucitronElem) {
      observer.observe(tarteaucitronElem, { attributes: true });
    }
    
    // Écouter les événements tarteaucitron
    window.addEventListener('tac.close_panel', checkWithDelays);
    window.addEventListener('tac.close_alert', checkWithDelays);
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', checkAndFixScrollLock);
    window.addEventListener('popstate', checkWithDelays);
    window.addEventListener('hashchange', checkWithDelays);
    window.addEventListener('pagehide', forceUnlockScroll);
    window.addEventListener('pageshow', checkWithDelays);
    
    // Vérification périodique pour les cas persistants
    const interval = setInterval(checkAndFixScrollLock, 3000);
    
    return () => {
      // Nettoyage
      window.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', checkAndFixScrollLock);
      window.removeEventListener('popstate', checkWithDelays);
      window.removeEventListener('hashchange', checkWithDelays);
      window.removeEventListener('pagehide', forceUnlockScroll);
      window.removeEventListener('pageshow', checkWithDelays);
      window.removeEventListener('tac.close_panel', checkWithDelays);
      window.removeEventListener('tac.close_alert', checkWithDelays);
      observer.disconnect();
      clearInterval(interval);
      forceUnlockScroll();
    };
  }, [checkAndFixScrollLock]);
  
  return null; // Ce composant ne rend rien visuellement
};