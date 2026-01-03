import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Home } from 'lucide-react';
import { scrollToTop, scrollToBottom } from '../utils/scroll-utils';

interface ScrollButtonsProps {
  includeHomeButton?: boolean;
  onHomeClick?: () => void;
  forceHide?: boolean; // Propriété pour forcer la dissimulation des boutons
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({ includeHomeButton = false, onHomeClick, forceHide = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [showButtons, setShowButtons] = useState(false) // On commence par les cacher par défaut
  
  // Seuils pour déterminer si on est en haut, au milieu ou en bas de la page
  const TOP_THRESHOLD = 200; // En pixels depuis le haut
  const BOTTOM_THRESHOLD = 200; // En pixels depuis le bas
  
  useEffect(() => {
    // Fonction pour mettre à jour les dimensions et vérifier le besoin de défilement
    const updateDimensions = () => {
      // Méthode ultra-fiable pour détecter si une page nécessite du défilement
      const hasVerticalScroll = document.documentElement.scrollHeight > window.innerHeight;
      
      // Pour les diagnostics - obtenir la hauteur avec différentes méthodes
      const heightValues = {
        body: document.body.scrollHeight,
        documentElement: document.documentElement.scrollHeight,
        innerHeight: window.innerHeight,
        clientHeight: document.documentElement.clientHeight,
        bodyOffset: document.body.offsetHeight
      };
      
      // Calculer la hauteur du document pour compatibilité avec le reste du code
      const docHeight = document.documentElement.scrollHeight;
      setDocumentHeight(docHeight);
      setViewportHeight(window.innerHeight);
      
      // Détection plus précise avec une marge d'erreur minime
      const needsScrolling = docHeight > window.innerHeight + 5;
      
      setShowButtons(needsScrolling);
    };
    
    // Fonction pour mettre à jour la position de défilement
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Initialiser les dimensions
    updateDimensions();
    updateScrollPosition();
    
    // Effectuer des vérifications supplémentaires après le chargement complet
    // pour s'assurer que tous les éléments sont rendus correctement
    window.addEventListener('load', updateDimensions);
    
    // Vérification différée pour capturer les images et autres ressources chargées
    const timeoutIds = [
      setTimeout(updateDimensions, 100),
      setTimeout(updateDimensions, 500),
      setTimeout(updateDimensions, 1000)
    ];
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    window.addEventListener('resize', updateDimensions, { passive: true });
    
    // Écouter les changements du DOM qui pourraient affecter la hauteur
    const observer = new MutationObserver(() => {
      setTimeout(updateDimensions, 50);
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true 
    });
    
    // Nettoyer les écouteurs d'événements et observer
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('load', updateDimensions);
      timeoutIds.forEach(id => clearTimeout(id));
      observer.disconnect();
    };
  }, [includeHomeButton]);
  
  const isAtTop = scrollPosition < TOP_THRESHOLD;
  // Calcul plus précis pour déterminer si on est en bas de la page
  const isAtBottom = documentHeight - (scrollPosition + viewportHeight) < BOTTOM_THRESHOLD;
  
  // Ne rien afficher si forceHide est vrai ou si showButtons est faux (sauf pour le bouton Accueil)
  if ((forceHide || !showButtons) && !includeHomeButton) {
    return null;
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Bouton d'accueil si demandé - toujours affiché si includeHomeButton est vrai */}
      {includeHomeButton && (
        <button 
          onClick={onHomeClick}
          className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary text-white rounded-full shadow-xl transition-all hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Retour à l'accueil"
        >
          <Home size={20} />
        </button>
      )}
      
      {/* Bouton de défilement vers le haut (visible si page nécessite défilement ET non au sommet) */}
      {showButtons && !isAtTop && (
        <button 
          onClick={() => scrollToTop()}
          className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary text-white rounded-full shadow-xl transition-all hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Défiler vers le haut"
        >
          <ArrowUp size={20} />
        </button>
      )}
      
      {/* Bouton de défilement vers le bas (visible si page nécessite défilement ET non en bas) */}
      {showButtons && !isAtBottom && (
        <button 
          onClick={() => scrollToBottom()}
          className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary text-white rounded-full shadow-xl transition-all hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Défiler vers le bas"
        >
          <ArrowDown size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;