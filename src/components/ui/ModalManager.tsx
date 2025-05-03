import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ModalContext } from '@/contexts/ModalContextTypes';
import ContactForm from '../ContactForm';

const ModalManager: React.FC = () => {
  const { activeModal, closeModal, modalData } = useContext(ModalContext);
  
  // Utilisé pour générer un ID unique pour chaque dialog
  const contactFormDescId = React.useId();
  const quoteFormDescId = React.useId();

  // La fonction directe qui fermera immédiatement la modale
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      {/* Modale de Contact */}
      <Dialog open={activeModal === 'contact'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent 
          className="sm:max-w-[500px] w-[calc(100%-1rem)] p-4 sm:p-6 mx-auto" 
          aria-describedby={contactFormDescId}
        >
          <DialogHeader className="mb-2 sm:mb-4">
            <DialogTitle className="text-lg sm:text-xl">Contactez-moi</DialogTitle>
            <DialogDescription id={contactFormDescId} className="text-sm">
              Remplissez le formulaire ci-dessous pour m'envoyer un message.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            {/* Transmettre le contexte, les détails et le message prérempli si disponibles */}
            <ContactForm 
              onSuccess={handleCloseModal}
              contextSource={modalData?.context || ''}
              contextDetails={modalData?.errorDetails || null}
              prefilledMessage={typeof modalData?.prefilledMessage === 'string' ? modalData.prefilledMessage : ''}
              transactionDetails={modalData?.transactionDetails || null}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Modale de Demande de Devis - Utilise aussi ContactForm mais avec formType="quote" */}
      <Dialog open={activeModal === 'quote'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent 
          className="sm:max-w-[550px] w-[calc(100%-1rem)] p-4 sm:p-6 mx-auto" 
          aria-describedby={quoteFormDescId}
        >
          <DialogHeader className="mb-2 sm:mb-4">
            <DialogTitle className="text-lg sm:text-xl">Demande de devis</DialogTitle>
            <DialogDescription id={quoteFormDescId} className="text-sm">
              Complétez ce formulaire pour recevoir un devis personnalisé.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <ContactForm 
              onSuccess={handleCloseModal}
              contextSource={modalData?.context || 'quote'}
              prefilledMessage=""
              formType="quote"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalManager;