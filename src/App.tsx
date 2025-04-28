import { Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import LegalNotices from './pages/LegalNotices';
import EbookPage from './pages/EbookPage';
import EbookComingSoonPage from './pages/EbookComingSoonPage';
import AcheterEbookPage from './pages/AcheterEbookPage';
import CheckoutPage from './pages/CheckoutPage';
import PaiementReussiPage from './pages/PaiementReussiPage';
import PaiementAnnulePage from './pages/PaiementAnnulePage';
import PaiementEchecPage from './pages/PaiementEchecPage';
import TelechargementPage from './pages/TelechargementPage';
import TestCheckoutPage from './pages/TestCheckoutPage';
import NotFound from './pages/NotFound';
import { ebookConfig } from './config/ebookConfig';
import './App.css';

function App() {
  // Contrôle d'accès à la page Ebook
  const EbookRouteHandler = () => {
    return ebookConfig.isEbookAvailable ? <EbookPage /> : <EbookComingSoonPage />;
  };
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/mentions-legales" element={<LegalNotices />} />
      <Route path="/ebook" element={<EbookRouteHandler />} />
      <Route path="/acheter-ebook" element={
        ebookConfig.isEbookAvailable ? <AcheterEbookPage /> : <Navigate to="/ebook" replace />
      } />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/paiement-reussi" element={<PaiementReussiPage />} />
      <Route path="/paiement-annule" element={<PaiementAnnulePage />} />
      <Route path="/paiement-echec" element={<PaiementEchecPage />} />
      <Route path="/telechargement-ebook" element={<TelechargementPage />} />
      <Route path="/test-checkout" element={<TestCheckoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
