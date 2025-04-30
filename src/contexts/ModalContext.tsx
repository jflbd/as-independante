import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { lockScroll, unlockScroll, forceUnlockScroll } from '@/lib/utils';

export type ModalType = 'contact' | 'legal' | 'quote' | null;

// Type pour les détails d'erreur de paiement
interface ErrorDetails {
  code?: string;
  message?: string;
  type?: string;
}

interface ModalData {
  section?: string;
  context?: string; // Pour identifier la source du contact (ex: 'payment_error')
  errorDetails?: ErrorDetails; // Pour les détails d'erreur de paiement
  [key: string]: unknown;
}

export interface ModalContextType {
  openModal: (modalType: ModalType, initialData?: ModalData) => void;
  closeModal: () => void;
  activeModal: ModalType;
  modalData: ModalData | null;
}

const initialModalContext: ModalContextType = {
  openModal: () => {},
  closeModal: () => {},
  activeModal: null,
  modalData: null
};

export const ModalContext = createContext<ModalContextType>(initialModalContext);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  // S'assurer que le défilement est toujours restauré lors du démontage du composant
  useEffect(() => {
    return () => {
      // Si le composant est démonté, s'assurer de libérer le défilement
      forceUnlockScroll();
    };
  }, []);

  // Gestion des changements d'état de la modal
  useEffect(() => {
    if (activeModal) {
      // Verrouiller le défilement quand une modale est active
      lockScroll();
    } else if (activeModal === null) {
      // Déverrouiller le défilement avec un délai pour permettre aux animations de se terminer
      setTimeout(() => {
        unlockScroll();
      }, 100);
    }
  }, [activeModal]);

  const openModal = (modalType: ModalType, initialData: ModalData | null = null) => {
    setActiveModal(modalType);
    setModalData(initialData);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
    
    // S'assurer que le défilement est restauré après la fermeture avec un délai supplémentaire
    setTimeout(() => {
      // Double vérification du déverrouillage pour les cas où la fermeture se passe mal
      unlockScroll();
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};