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
import BlogIndexPage from './pages/BlogIndexPage';
import BlogArticlePage from './pages/BlogArticlePage.jsx';
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
  
  // Intercepter le paramètre notfound de l'URL et gérer les routes partagées
  useEffect(() => {
    // Vérifier si on arrive depuis la redirection 404.html
    const urlParams = new URLSearchParams(window.location.search);
    const notfoundPath = urlParams.get('notfound');
    
    // Si on a le paramètre notfound, naviguer vers la page 404
    if (notfoundPath) {
      // Avant d'afficher 404, vérifier si c'est une route d'article de blog
      const blogArticleMatch = notfoundPath.match(/^\/blog\/([\w-]+)\/?$/i);
      
      if (blogArticleMatch) {
        // C'est un article de blog, essayons de naviguer vers l'article correct
        const articleId = blogArticleMatch[1];
        console.log(`Tentative de redirection vers article de blog: ${articleId}`);
        navigate(`/blog/${articleId}`, { replace: true });
      } else {
        // Sinon, afficher la page 404 comme avant
        navigate('/404', { replace: true, state: { path: notfoundPath } });
        console.log(`Page 404 affichée pour: ${notfoundPath}`);
      }
    }
  }, [navigate]);
  
  // Contrôle d'accès à la page Ebook
  const EbookRouteHandler = () => {
    return ebookConfig.isEbookAvailable ? <EbookPage /> : <EbookComingSoonPage />;
  };
  
  // Détecter si on utilise des routes en mode hash (compatibilité pour les redirections de paiement et actualisations blog)
  useEffect(() => {
    // Si on arrive avec un hash qui ressemble à une route (e.g. /#/paiement-annule ou /#/blog/article-id)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      const route = hash.substring(1); // enlever le # du début
      console.log(`Détection de route en mode hash: ${route}`);
      
      // Vérifier si c'est une route d'article de blog
      const isBlogArticle = route.startsWith('blog/') && route.split('/').length >= 2;
      
      if (isBlogArticle) {
        console.log(`Détection d'un article de blog via hash: ${route}`);
        // Petit délai pour s'assurer que le routeur React est prêt
        setTimeout(() => {
          // Pour les articles de blog, naviguer avec replace: true pour éviter des problèmes d'historique
          navigate(route, { replace: true });
        }, 50);
      } else {
        // Pour les autres routes, navigation normale
        navigate(route, { replace: true });
      }
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
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:articleId" element={<BlogArticlePage />} />
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
