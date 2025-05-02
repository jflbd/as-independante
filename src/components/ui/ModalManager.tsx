import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ModalContext } from '@/contexts/ModalContext';
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
              onSuccess={handleCloseModal} // On utilise maintenant la fonction directe
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
          className="sm:max-w-[500px]" 
          aria-describedby={quoteFormDescId}
        >
          <DialogHeader>
            <DialogTitle>Demande de devis</DialogTitle>
            <DialogDescription id={quoteFormDescId}>
              Complétez ce formulaire pour recevoir un devis personnalisé.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <ContactForm 
              onSuccess={handleCloseModal} // On utilise maintenant la fonction directe
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