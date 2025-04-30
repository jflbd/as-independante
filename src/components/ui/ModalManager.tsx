import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import DemandeAccompagnementDialog from '../pricing/QuoteFormDialog';
import { ModalContext } from '@/contexts/ModalContext';
import ContactForm from '../ContactForm';

const ModalManager: React.FC = () => {
  const { activeModal, closeModal, modalData } = useContext(ModalContext);
  
  // Utilisé pour générer un ID unique pour chaque dialog
  const contactFormDescId = React.useId();
  
  return (
    <>
      {/* Modale de Contact */}
      <Dialog open={activeModal === 'contact'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent 
          className="sm:max-w-[500px]" 
          aria-describedby={contactFormDescId}
        >
          <DialogHeader>
            <DialogTitle>Contactez-moi</DialogTitle>
            <DialogDescription id={contactFormDescId}>
              Remplissez le formulaire ci-dessous pour m'envoyer un message.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            {/* Transmettre le contexte, les détails et le message prérempli si disponibles */}
            <ContactForm 
              onSuccess={() => {
                // Retarder la fermeture pour permettre d'afficher le message de succès pendant quelques secondes
                setTimeout(() => {
                  closeModal();
                }, 5000);
              }}
              contextSource={modalData?.context || ''}
              contextDetails={modalData?.errorDetails || null}
              prefilledMessage={typeof modalData?.prefilledMessage === 'string' ? modalData.prefilledMessage : ''}
              transactionDetails={modalData?.transactionDetails || null}
            />
          </div>
        </DialogContent>
      </Dialog>
      
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