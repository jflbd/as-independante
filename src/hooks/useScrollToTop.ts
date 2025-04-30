// filepath: /Users/fiston/Downloads/as-independante/src/hooks/useScrollToTop.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook qui fait automatiquement défiler la page vers le haut lors d'un changement de route
 * @param options Options de configuration
 */
export function useScrollToTop(options = { behavior: 'smooth' as ScrollBehavior }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Pour éviter les problèmes avec les ancres dans l'URL
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: options.behavior,
      });
    }
  }, [pathname, options.behavior]);
}