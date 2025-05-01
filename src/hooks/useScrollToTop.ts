import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook qui fait automatiquement défiler la page vers le haut lors d'un changement de route
 * @param options Options de configuration
 */
export function useScrollToTop(options = { behavior: 'auto' as ScrollBehavior, delay: 0 }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Ne pas défiler si l'URL contient une ancre (pour permettre la navigation par ancre)
    if (hash) {
      return;
    }

    // Défiler vers le haut après un bref délai pour assurer le bon fonctionnement
    const timeoutId = setTimeout(() => {
      // Défiler en douceur vers le haut
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: options.behavior,
      });
      
      // Solution de secours pour s'assurer que le défilement fonctionne correctement
      setTimeout(() => {
        // Force un second défilement si nécessaire
        if (window.scrollY > 0) {
          window.scrollTo(0, 0);
        }
        
        // Réinitialiser les styles qui pourraient interférer
        document.body.style.paddingTop = '';
        document.body.style.marginTop = '';
      }, 100);
    }, options.delay);

    return () => clearTimeout(timeoutId);
  }, [pathname, hash, options.behavior, options.delay]);
}