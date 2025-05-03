import React, { createContext, useRef, ReactNode } from 'react';

export interface ScrollPositionContextType {
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
}

export const ScrollPositionContext = createContext<ScrollPositionContextType | undefined>(undefined);

interface ScrollPositionProviderProps {
  children: ReactNode;
}

/**
 * Fournisseur qui gère la sauvegarde et restauration de la position de défilement
 */
export function ScrollPositionProvider({ children }: ScrollPositionProviderProps) {
  // Stockage de la position de défilement
  const scrollPositionRef = useRef<number>(0);
  // Flag pour suivre si une restauration est en cours
  const isRestoringRef = useRef<boolean>(false);

  // Sauvegarde la position actuelle
  const saveScrollPosition = () => {
    if (typeof window !== 'undefined') {
      scrollPositionRef.current = window.scrollY;
      console.log('Position sauvegardée:', scrollPositionRef.current);
    }
  };

  // Restaure la position précédemment sauvegardée
  const restoreScrollPosition = () => {
    if (typeof window !== 'undefined' && scrollPositionRef.current > 0 && !isRestoringRef.current) {
      isRestoringRef.current = true;
      console.log('Restauration position:', scrollPositionRef.current);
      
      // Approche multi-tentatives pour assurer que la restauration fonctionne
      const restore = () => window.scrollTo(0, scrollPositionRef.current);
      
      // Exécuter immédiatement
      restore();
      
      // Et dans plusieurs timeouts pour s'assurer que ça fonctionne même après les animations
      setTimeout(restore, 0);
      setTimeout(restore, 10);
      setTimeout(restore, 50);
      setTimeout(restore, 100);
      setTimeout(() => {
        restore();
        isRestoringRef.current = false;
      }, 200);
    }
  };

  // Valeur du contexte
  const contextValue = {
    saveScrollPosition,
    restoreScrollPosition,
  };

  return (
    <ScrollPositionContext.Provider value={contextValue}>
      {children}
    </ScrollPositionContext.Provider>
  );
}