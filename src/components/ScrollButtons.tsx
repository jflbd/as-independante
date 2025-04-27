import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Home } from 'lucide-react';

interface ScrollButtonsProps {
  includeHomeButton?: boolean;
  onHomeClick?: () => void;
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({ includeHomeButton = false, onHomeClick }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Seuils pour déterminer si on est en haut, au milieu ou en bas de la page
  const TOP_THRESHOLD = 200; // En pixels depuis le haut
  const BOTTOM_THRESHOLD = 200; // En pixels depuis le bas
  
  useEffect(() => {
    // Fonction pour mettre à jour les dimensions
    const updateDimensions = () => {
      setDocumentHeight(Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ));
      setViewportHeight(window.innerHeight);
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
  }, []);
  
  const isAtTop = scrollPosition < TOP_THRESHOLD;
  const isAtBottom = documentHeight - (scrollPosition + viewportHeight) < BOTTOM_THRESHOLD;
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const scrollToBottom = () => {
    window.scrollTo({
      top: documentHeight,
      behavior: 'smooth'
    });
  };
  
  // Ne pas afficher les boutons de défilement si la hauteur du document est inférieure à 2 fois la hauteur de la fenêtre
  if (documentHeight < viewportHeight * 1.5) {
    return includeHomeButton ? (
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={onHomeClick}
          className="flex items-center justify-center w-12 h-12 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Retour à l'accueil"
        >
          <Home size={20} />
        </button>
      </div>
    ) : null;
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      {/* Bouton d'accueil si demandé */}
      {includeHomeButton && (
        <button 
          onClick={onHomeClick}
          className="flex items-center justify-center w-12 h-12 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Retour à l'accueil"
        >
          <Home size={20} />
        </button>
      )}
      
      {/* Afficher uniquement au milieu ou en bas de la page */}
      {!isAtTop && (
        <button 
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Défiler vers le haut"
        >
          <ArrowUp size={20} />
        </button>
      )}
      
      {/* Afficher uniquement en haut ou au milieu de la page */}
      {!isAtBottom && (
        <button 
          onClick={scrollToBottom}
          className="flex items-center justify-center w-12 h-12 bg-primary/70 hover:bg-primary text-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Défiler vers le bas"
        >
          <ArrowDown size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;