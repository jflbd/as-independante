import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLegalModal } from '@/hooks/use-legal-modal';

// Importation des composants légaux
import LegalDefinitions from './LegalDefinitions';
import LegalPresentation from './LegalPresentation';
import LegalTermsOfUse from './LegalTermsOfUse';
import LegalServices from './LegalServices';
import LegalTechnicalLimitations from './LegalTechnicalLimitations';
import LegalIntellectualProperty from './LegalIntellectualProperty';
import LegalLiability from './LegalLiability';
import LegalPersonalData from './LegalPersonalData';
import LegalIncidentNotification from './LegalIncidentNotification';
import LegalCookies from './LegalCookies';
import LegalJurisdiction from './LegalJurisdiction';

const LegalModalContainer: React.FC = () => {
  const { isLegalModalOpen, closeLegalModal, currentLegalSection } = useLegalModal();
  
  // ID unique pour l'accessibilité
  const descriptionId = React.useId();
  
  // Mapping des titres selon la section actuelle
  const getTitleBySection = (): string => {
    switch (currentLegalSection) {
      case 'definitions': return 'Définitions';
      case 'presentation': return 'Présentation du site';
      case 'terms': return 'Conditions générales d\'utilisation';
      case 'services': return 'Services offerts';
      case 'technical': return 'Limitations techniques';
      case 'intellectual': return 'Propriété intellectuelle';
      case 'liability': return 'Responsabilité';
      case 'personal-data': return 'Données personnelles';
      case 'incident': return 'Notification d\'incident';
      case 'cookies': return 'Cookies';
      case 'jurisdiction': return 'Droit applicable et juridiction';
      default: return 'Mentions légales';
    }
  };
  
  // Affichage du contenu selon la section actuelle
  const renderContent = () => {
    switch (currentLegalSection) {
      case 'definitions': return <LegalDefinitions />;
      case 'presentation': return <LegalPresentation />;
      case 'terms': return <LegalTermsOfUse />;
      case 'services': return <LegalServices />;
      case 'technical': return <LegalTechnicalLimitations />;
      case 'intellectual': return <LegalIntellectualProperty />;
      case 'liability': return <LegalLiability />;
      case 'personal-data': return <LegalPersonalData />;
      case 'incident': return <LegalIncidentNotification />;
      case 'cookies': return <LegalCookies />;
      case 'jurisdiction': return <LegalJurisdiction />;
      default: return <LegalDefinitions />;
    }
  };

  return (
    <Dialog open={isLegalModalOpen} onOpenChange={(open) => !open && closeLegalModal()}>
      <DialogContent 
        className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto" 
        aria-describedby={descriptionId}
      >
        <DialogHeader>
          <DialogTitle>{getTitleBySection()}</DialogTitle>
          <DialogDescription id={descriptionId}>
            Informations légales du site
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm max-w-none mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalModalContainer;