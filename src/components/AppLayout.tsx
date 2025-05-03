import React, { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LegalModalProvider } from '@/contexts/LegalModalContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieBanner from './CookieBanner';
import ModalManager from './ui/ModalManager';
import LegalModalContainer from './legal/LegalModalContainer';
import ScrollButtons from './ScrollButtons';
import NavBar from './NavBar';
import { ScrollUnlocker } from './ui/ScrollUnlocker';
import { ScrollPositionProvider } from './ui/ScrollPositionProvider';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <HelmetProvider>
      {/* Ajout du ScrollPositionProvider pour gérer les positions de défilement */}
      <ScrollPositionProvider>
        {/* Réorganisation des providers pour résoudre les problèmes d'accessibilité */}
        <ModalProvider>
          <LegalModalProvider>
            <CookieConsentProvider>
              <div className="app">
                {/* Nous ne rendons pas la NavBar ici pour éviter les doublons,
                    car chaque page l'inclut déjà */}
                {children}
                <CookieBanner />
                <ModalManager />
                <LegalModalContainer />
                <ScrollButtons />
                {/* Composant de sécurité pour garantir le fonctionnement du scroll */}
                <ScrollUnlocker />
              </div>
            </CookieConsentProvider>
          </LegalModalProvider>
        </ModalProvider>
      </ScrollPositionProvider>
    </HelmetProvider>
  );
};

export default AppLayout;