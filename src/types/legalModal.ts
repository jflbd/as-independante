export type LegalSectionType = 
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

export interface LegalModalContextType {
  isLegalModalOpen: boolean;
  openLegalModal: (section?: LegalSectionType) => void;
  closeLegalModal: () => void;
  currentLegalSection: LegalSectionType;
  setCurrentLegalSection: (section: LegalSectionType) => void;
}
