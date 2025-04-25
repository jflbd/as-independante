import React, { useContext } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LegalModal from '../legal/LegalModal';
import { useLegalModal } from '@/contexts/LegalModalContext';
import DemandeAccompagnementDialog from '../pricing/QuoteFormDialog';
import { ModalContext } from '@/contexts/ModalContext';
import ContactForm from '../ContactForm';

const ModalManager: React.FC = () => {
  const { activeModal, closeModal, modalData } = useContext(ModalContext);
  const { closeLegalModal } = useLegalModal();
  
  return (
    <>
      {/* Modale de Contact */}
      <Dialog open={activeModal === 'contact'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Contactez-moi</h2>
            <ContactForm onSuccess={closeModal} />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Modale des Mentions Légales */}
      {activeModal === 'legal' && (
        <LegalModal 
          isOpen={true} 
          onClose={closeModal} 
          initialSection={modalData?.section} 
        />
      )}
      
      {/* Modale de Demande de Devis */}
      {activeModal === 'quote' && (
        <DemandeAccompagnementDialog 
          isOpen={true} 
          setIsOpen={(open) => !open && closeModal()} 
        />
      )}
    </>
  );
};

export default ModalManager;