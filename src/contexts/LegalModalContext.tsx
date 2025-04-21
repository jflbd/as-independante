import React, { createContext, useContext, useState, ReactNode } from 'react';

type LegalSectionType = 
  | 'definitions'
  | 'presentation'
  | 'terms'
  | 'services'
  | 'technical'
  | 'intellectual'
  | 'liability'
  | 'personal-data'
  | 'incident'
  | 'cookies'
  | 'jurisdiction';

interface LegalModalContextType {
  isLegalModalOpen: boolean;
  openLegalModal: (section?: LegalSectionType) => void;
  closeLegalModal: () => void;
  currentLegalSection: LegalSectionType;
}

const LegalModalContext = createContext<LegalModalContextType | undefined>(undefined);

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
      }}
    >
      {children}
    </LegalModalContext.Provider>
  );
};

export const useLegalModal = (): LegalModalContextType => {
  const context = useContext(LegalModalContext);
  if (context === undefined) {
    throw new Error('useLegalModal must be used within a LegalModalProvider');
  }
  return context;
};