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
      
      // Toujours afficher les boutons, quelle que soit la hauteur de la page
      setShowButtons(true);
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
  
  // Toujours afficher les boutons
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Bouton d'accueil si demandé */}
      {includeHomeButton && (
        <button 
          onClick={onHomeClick}
          className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary text-white rounded-full shadow-xl transition-all hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Retour à l'accueil"
        >
          <Home size={20} />
        </button>
      )}
      
      {/* Bouton de défilement vers le haut (visible si non au sommet) */}
      {!isAtTop && (
        <button 
          onClick={() => scrollToTop()}
          className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary text-white rounded-full shadow-xl transition-all hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Défiler vers le haut"
        >
          <ArrowUp size={20} />
        </button>
      )}
      
      {/* Bouton de défilement vers le bas (visible si non en bas) */}
      {!isAtBottom && (
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