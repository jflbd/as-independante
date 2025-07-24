import { useContext } from 'react';
import { LegalModalContext } from '../contexts/LegalModalContextDef';
import type { LegalModalContextType } from '../types/legalModal';

export const useLegalModal = (): LegalModalContextType => {
  const context = useContext(LegalModalContext);
  if (context === undefined) {
    throw new Error('useLegalModal must be used within a LegalModalProvider');
  }
  return context;
};
