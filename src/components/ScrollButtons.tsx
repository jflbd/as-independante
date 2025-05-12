import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Home } from 'lucide-react';
import { scrollToTop, scrollToBottom } from '../utils/scroll-utils';

interface ScrollButtonsProps {
  includeHomeButton?: boolean;
  onHomeClick?: () => void;
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({ includeHomeButton = false, onHomeClick }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [showButtons, setShowButtons] = useState(true); // On commence par les afficher par défaut
  
  // Seuils pour déterminer si on est en haut, au milieu ou en bas de la page
  const TOP_THRESHOLD = 200; // En pixels depuis le haut
  const BOTTOM_THRESHOLD = 200; // En pixels depuis le bas
  
  useEffect(() => {
    // Fonction pour mettre à jour les dimensions
    const updateDimensions = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setDocumentHeight(docHeight);
      setViewportHeight(window.innerHeight);
      
      // N'afficher les boutons que si la page nécessite du défilement
      // (comparer la hauteur du document à la hauteur de la fenêtre)
      const needsScrolling = docHeight > window.innerHeight + 50; // ajout d'une marge de 50px
      console.log(`ScrollButtons: Document height: ${docHeight}, Viewport height: ${window.innerHeight}, Needs scrolling: ${needsScrolling}`);
      setShowButtons(needsScrolling);
    };
    
    // Fonction pour mettre à jour la position de défilement
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Initialiser les dimensions
    updateDimensions();
    updateScrollPosition();
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    window.addEventListener('resize', updateDimensions, { passive: true });
    
    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [includeHomeButton]);
  
  const isAtTop = scrollPosition < TOP_THRESHOLD;
  const isAtBottom = documentHeight - (scrollPosition + viewportHeight) < BOTTOM_THRESHOLD;
  
  // Ne rien afficher si showButtons est faux, sauf éventuellement le bouton Accueil
  if (!showButtons && !includeHomeButton) {
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