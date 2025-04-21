import React from 'react';
import { useLegalModal } from '@/contexts/LegalModalContext';
import LegalModal from './LegalModal';

const LegalModalContainer: React.FC = () => {
  const { isLegalModalOpen, closeLegalModal, currentLegalSection } = useLegalModal();

  return (
    <LegalModal
      isOpen={isLegalModalOpen}
      onClose={closeLegalModal}
      initialSection={currentLegalSection}
    />
  );
};

export default LegalModalContainer;