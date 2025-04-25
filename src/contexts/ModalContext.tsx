import React, { createContext, useState, ReactNode } from 'react';

export type ModalType = 'contact' | 'legal' | 'quote' | null;

interface ModalData {
  section?: string;
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

  const openModal = (modalType: ModalType, initialData: ModalData | null = null) => {
    setActiveModal(modalType);
    setModalData(initialData);
    document.body.style.overflow = 'hidden'; // Empêcher le scroll du body
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
    document.body.style.overflow = ''; // Restaurer le scroll du body
  };

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};