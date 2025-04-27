import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
          <DialogHeader>
            <DialogTitle>Contactez-moi</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            {/* Ne pas fermer immédiatement la modal après envoi pour permettre l'affichage du message de succès */}
            <ContactForm onSuccess={() => {
              // Retarder la fermeture pour permettre d'afficher le message de succès pendant quelques secondes
              setTimeout(() => {
                closeModal();
              }, 5000);
            }} />
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