import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { debugEnvironment } from './utils/debug-env' // Import du script de débogage
import { LegalModalProvider } from './contexts/LegalModalContext'
import { ModalProvider } from './contexts/ModalContext'
import { CookieConsentProvider } from './contexts/CookieConsentContext'

// Exécution du débogage d'environnement
if (import.meta.env.DEV) {
  debugEnvironment()
  console.log('📝 Application démarrée en mode développement')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <CookieConsentProvider>
        <ModalProvider>
          <LegalModalProvider>
            <App />
          </LegalModalProvider>
        </ModalProvider>
      </CookieConsentProvider>
    </BrowserRouter>
  </HelmetProvider>,
)
