import React, { useState, ReactNode, useEffect, useCallback, useRef } from 'react';
import { lockScroll, unlockScroll, forceUnlockScroll } from '@/lib/utils';
import { ModalContext, ModalType, ModalData } from './ModalContextTypes';

// Export du contexte pour l'utiliser dans d'autres composants
export { ModalContext };

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  
  // Référence pour la position de défilement
  const scrollPositionRef = useRef<number>(0);

  // Fonction pour s'assurer que le déverrouillage est complet
  const ensureScrollUnlocked = useCallback(() => {
    if (isUnlocking) return;
    
    setIsUnlocking(true);
    unlockScroll();
    
    // Double vérification après un court délai
    setTimeout(() => {
      if (document.body.style.overflow === 'hidden' || 
          document.body.style.position === 'fixed') {
        forceUnlockScroll();
      }
      setIsUnlocking(false);
    }, 100);
  }, [isUnlocking]);

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => ensureScrollUnlocked();
  }, [ensureScrollUnlocked]);

  // Gestion des changements d'état de la modale
  useEffect(() => {
    if (activeModal) {
      // Mémoriser la position actuelle avant de verrouiller
      scrollPositionRef.current = window.scrollY;
      lockScroll();
    } else if (!isUnlocking) {
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  const openModal = (modalType: ModalType, initialData: ModalData | null = null) => {
    // Enregistrer la position actuelle de défilement
    scrollPositionRef.current = window.scrollY;
    
    // Mettre à jour l'état - délai minimal pour éviter les problèmes de rendu
    setTimeout(() => {
      setActiveModal(modalType);
      setModalData(initialData);
    }, 10);
  };

  const closeModal = () => {
    // Réinitialiser l'état des modales
    setActiveModal(null);
    setModalData(null);
    
    // Déverrouillage progressif
    setIsUnlocking(true);
    unlockScroll();
    
    // Restauration de la position avec temporisation
    const savedPosition = scrollPositionRef.current;
    setTimeout(() => {
      // Restaurer la position de défilement
      if (savedPosition > 0) {
        window.scrollTo(0, savedPosition);
      }
      
      // Vérification finale
      setTimeout(() => {
        if (document.body.style.overflow === 'hidden' || 
            document.body.style.position === 'fixed') {
          forceUnlockScroll();
        }
        setIsUnlocking(false);
      }, 50);
    }, 20);
  };

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};