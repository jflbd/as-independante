import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Index from './pages/Index';
import LegalNotices from './pages/LegalNotices';
import EbookPage from './pages/EbookPage';
import EbookComingSoonPage from './pages/EbookComingSoonPage';
import AcheterEbookPage from './pages/AcheterEbookPage';
import CheckoutPage from './pages/CheckoutPage';
import PaiementReussiPage from './pages/PaiementReussiPage';
import PaiementEchecPage from './pages/PaiementEchecPage';
import PaiementAnnulePage from './pages/PaiementAnnulePage';
import TelechargementPage from './pages/TelechargementPage';
import { ebookConfig } from './config/ebookConfig';
import { useScrollToTop } from './hooks/useScrollToTop';
import { ScrollUnlocker } from './components/ui/ScrollUnlocker';
import NotFound from './pages/NotFound';

function App() {
  // Active le défilement vers le haut à chaque changement de page pour toutes les routes
  useScrollToTop();
  
  // Contrôle d'accès à la page Ebook
  const EbookRouteHandler = () => {
    return ebookConfig.isEbookAvailable ? <EbookPage /> : <EbookComingSoonPage />;
  };
  
  return (
    <>
      {/* Composant de sécurité pour restaurer le défilement en cas de problème */}
      <ScrollUnlocker />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mentions-legales" element={<LegalNotices />} />
        <Route path="/ebook" element={<EbookRouteHandler />} />
        <Route path="/acheter-ebook" element={
          ebookConfig.isEbookAvailable ? <AcheterEbookPage /> : <Navigate to="/ebook" replace />
        } />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/paiement-reussi" element={<PaiementReussiPage />} />
        <Route path="/paiement-echec" element={<PaiementEchecPage />} />
        <Route path="/paiement-annule" element={<PaiementAnnulePage />} />
        <Route path="/telechargement/:token" element={<TelechargementPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function WrappedApp() {
  return (
    <AppLayout>
      <App />
    </AppLayout>
  )
}
