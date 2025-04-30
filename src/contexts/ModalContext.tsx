import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
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
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Fonction pour déverrouiller le scroll de manière fiable
  const ensureScrollUnlocked = useCallback(() => {
    // Marquer le début du processus de déverrouillage
    setIsUnlocking(true);

    // Déverrouillage principal
    unlockScroll();

    // Double vérification avec un délai
    setTimeout(() => {
      // Si le scroll est toujours bloqué, forcer le déverrouillage
      if (document.body.style.overflow === 'hidden' || 
          document.body.style.position === 'fixed' || 
          document.documentElement.hasAttribute('data-scroll-locked')) {
        console.log("Déverrouillage forcé après délai");
        forceUnlockScroll();
      }
      setIsUnlocking(false);
    }, 300);
  }, []);

  // S'assurer que le défilement est toujours restauré lors du démontage du composant
  useEffect(() => {
    return () => {
      // Si le composant est démonté, s'assurer de libérer le défilement
      ensureScrollUnlocked();
    };
  }, [ensureScrollUnlocked]);

  // Gestion des changements d'état de la modal
  useEffect(() => {
    if (activeModal) {
      // Verrouiller le défilement quand une modale est active
      lockScroll();
    } else if (activeModal === null && !isUnlocking) {
      // Déverrouiller le défilement quand aucune modale n'est active
      ensureScrollUnlocked();
    }
  }, [activeModal, ensureScrollUnlocked, isUnlocking]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  const openModal = (modalType: ModalType, initialData: ModalData | null = null) => {
    setActiveModal(modalType);
    setModalData(initialData);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
    ensureScrollUnlocked();
  };

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};