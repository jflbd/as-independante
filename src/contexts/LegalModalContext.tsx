import React, { useState, ReactNode } from 'react';
import type { LegalSectionType } from '../types/legalModal';
import { LegalModalContext } from './LegalModalContextDef';

interface LegalModalProviderProps {
  children: ReactNode;
}

export const LegalModalProvider: React.FC<LegalModalProviderProps> = ({ children }) => {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [currentLegalSection, setCurrentLegalSection] = useState<LegalSectionType>('definitions');

  const openLegalModal = (section: LegalSectionType = 'definitions') => {
    setCurrentLegalSection(section);
    setIsLegalModalOpen(true);
  };

  const closeLegalModal = () => {
    setIsLegalModalOpen(false);
  };

  return (
    <LegalModalContext.Provider 
      value={{
        isLegalModalOpen,
        openLegalModal,
        closeLegalModal,
        currentLegalSection,
        setCurrentLegalSection,
      }}
    >
      {children}
    </LegalModalContext.Provider>
  );
};