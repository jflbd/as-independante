import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
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
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Structure des sections légales
interface LegalSection {
  id: string;
  title: string;
  component: React.ReactNode;
}

// Liste des sections avec leurs composants
const legalSections: LegalSection[] = [
  { id: 'definitions', title: 'Définitions', component: <LegalDefinitions /> },
  { id: 'presentation', title: 'Présentation du site', component: <LegalPresentation /> },
  { id: 'terms', title: "Conditions générales d'utilisation", component: <LegalTermsOfUse /> },
  { id: 'services', title: 'Services offerts', component: <LegalServices /> },
  { id: 'technical', title: 'Limitations techniques', component: <LegalTechnicalLimitations /> },
  { id: 'intellectual', title: 'Propriété intellectuelle', component: <LegalIntellectualProperty /> },
  { id: 'liability', title: 'Responsabilité', component: <LegalLiability /> },
  { id: 'personal-data', title: 'Données personnelles', component: <LegalPersonalData /> },
  { id: 'incident', title: 'Notification d\'incident', component: <LegalIncidentNotification /> },
  { id: 'cookies', title: 'Cookies', component: <LegalCookies /> },
  { id: 'jurisdiction', title: 'Droit applicable et juridiction', component: <LegalJurisdiction /> },
];

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: string;
}

const LegalModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose, 
  initialSection = 'definitions' 
}) => {
  const [currentSection, setCurrentSection] = useState<string>(initialSection);
  
  // Mettre à jour la section active quand initialSection change
  useEffect(() => {
    if (initialSection) {
      setCurrentSection(initialSection);
    }
  }, [initialSection]);
  
  // Trouver la section actuelle
  const activeSection = legalSections.find(section => section.id === currentSection) || legalSections[0];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mentions légales" size="lg">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6">
        {/* Navigation latérale */}
        <aside className="md:col-span-1 mb-6 md:mb-0">
          <nav className="space-y-1">
            {legalSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                  currentSection === section.id 
                    ? 'bg-primary text-white font-medium' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {currentSection === section.id && (
                  <ChevronRight className="h-4 w-4 mr-1 shrink-0" />
                )}
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-6 border-t pt-4">
            <Link 
              to="/mentions-legales" 
              className="text-primary flex items-center text-sm hover:underline"
              onClick={onClose}
            >
              <span>Version page complète</span>
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </aside>
        
        {/* Contenu de la section */}
        <div className="md:col-span-3 prose prose-sm max-w-none">
          <h3 className="text-xl font-semibold mb-4">{activeSection.title}</h3>
          {activeSection.component}
        </div>
      </div>
    </Modal>
  );
};

export default LegalModal;