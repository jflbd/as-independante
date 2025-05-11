import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppLayout from './components/AppLayout';
import DevEmailConfigHelper from './components/DevEmailConfigHelper';
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
import Sitemap from './pages/Sitemap';
import BlogLinkMainPage from './pages/BlogLinkMainPage';
import { ebookConfig } from './config/ebookConfig';
import { useScrollToTop } from './hooks/useScrollToTop';
import { ScrollUnlocker } from './components/ui/ScrollUnlocker';
import NotFound from './pages/NotFound';

function App() {
  // Active le défilement vers le haut à chaque changement de page pour toutes les routes
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const [shouldShow404, setShouldShow404] = useState(false);
  
  // Intercepter le paramètre notfound de l'URL
  useEffect(() => {
    // Vérifier si on arrive depuis la redirection 404.html
    const urlParams = new URLSearchParams(window.location.search);
    const notfoundPath = urlParams.get('notfound');
    
    // Si on a le paramètre notfound, naviguer vers la page 404
    if (notfoundPath) {
      // On utilise navigate au lieu de window.history.replaceState pour forcer le rendu du composant 404
      navigate('/404', { replace: true, state: { path: notfoundPath } });
      
      // Logging pour le débogage
      console.log(`Page 404 affichée pour: ${notfoundPath}`);
    }
  }, [navigate]);
  
  // Contrôle d'accès à la page Ebook
  const EbookRouteHandler = () => {
    return ebookConfig.isEbookAvailable ? <EbookPage /> : <EbookComingSoonPage />;
  };
  
  // Détecter si on utilise des routes en mode hash (compatibilité pour les redirections de paiement)
  useEffect(() => {
    // Si on arrive avec un hash qui ressemble à une route (e.g. /#/paiement-annule)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      const route = hash.substring(1); // enlever le # du début
      console.log(`Détection de route en mode hash: ${route}`);
      // Rediriger vers la route normale
      navigate(route, { replace: true });
    }
  }, [navigate, location.hash]);
  
  return (
    <>
      {/* Composant de sécurité pour restaurer le défilement en cas de problème */}
      <ScrollUnlocker />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mentions-legales" element={<LegalNotices />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/blog" element={<BlogLinkMainPage />} />
        <Route path="/blog/:articleId" element={<BlogLinkMainPage />} />
        <Route path="/ebook" element={<EbookRouteHandler />} />
        <Route path="/acheter-ebook" element={
          ebookConfig.isEbookAvailable ? <AcheterEbookPage /> : <Navigate to="/ebook" replace />
        } />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/paiement-reussi" element={<PaiementReussiPage />} />
        <Route path="/paiement-echec" element={<PaiementEchecPage />} />
        <Route path="/paiement-annule" element={<PaiementAnnulePage />} />
        <Route path="/telechargement/:token" element={<TelechargementPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function WrappedApp() {
  return (
    <AppLayout>
      <App />
      {/* Outil de configuration d'email pour le développement - visible uniquement en DEV */}
      {process.env.NODE_ENV !== "production" && <DevEmailConfigHelper />}
    </AppLayout>
  )
}
