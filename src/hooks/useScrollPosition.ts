import { useContext } from 'react';
import { ScrollPositionContext, ScrollPositionContextType } from '@/components/ui/ScrollPositionProvider';

/**
 * Hook pour utiliser le contexte de position de défilement
 */
export function useScrollPosition() {
  const context = useContext(ScrollPositionContext);
  if (!context) {
    throw new Error('useScrollPosition doit être utilisé à l\'intérieur d\'un ScrollPositionProvider');
  }
  return context;
}