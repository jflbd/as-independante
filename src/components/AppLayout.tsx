import React, { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LegalModalProvider } from '@/contexts/LegalModalContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieBanner from './CookieBanner';
import ModalManager from './ui/ModalManager';
import NavBar from './NavBar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <CookieConsentProvider>
        <LegalModalProvider>
          <ModalProvider>
            <div className="app">
              {/* Nous ne rendons pas la NavBar ici pour éviter les doublons,
                  car chaque page l'inclut déjà */}
              {children}
              <CookieBanner />
              <ModalManager />
            </div>
          </ModalProvider>
        </LegalModalProvider>
      </CookieConsentProvider>
    </HelmetProvider>
  );
};

export default AppLayout;