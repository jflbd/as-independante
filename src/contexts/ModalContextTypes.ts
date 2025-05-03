import { createContext } from 'react';

// Types pour le contexte des modales
export type ModalType = 'contact' | 'legal' | 'quote' | null;

// Type pour les détails d'erreur de paiement
export interface ErrorDetails {
  code?: string;
  message?: string;
  type?: string;
}

// Type pour les détails de transaction
export interface TransactionDetails {
  description?: string;
  date?: string;
  amount?: number;
  paymentMethod?: string;
  reference?: string;
  status?: string;
  [key: string]: string | number | undefined;
}

export interface ModalData {
  section?: string;
  context?: string;
  errorDetails?: ErrorDetails;
  prefilledMessage?: string;
  transactionDetails?: TransactionDetails;
  [key: string]: unknown;
}

export interface ModalContextType {
  openModal: (modalType: ModalType, initialData?: ModalData | null) => void;
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

// Création du contexte
export const ModalContext = createContext<ModalContextType>(initialModalContext);