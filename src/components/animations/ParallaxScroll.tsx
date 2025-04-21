import React, { useEffect, useRef } from 'react';

interface ParallaxScrollProps {
  children: React.ReactNode;
  strength?: number; // Force de l'effet de parallaxe (0-1)
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

/**
 * Composant qui applique un effet de parallaxe au défilement
 * Plus adapté pour les images d'arrière-plan et les éléments décoratifs
 */
const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  strength = 0.2,
  direction = 'up',
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const handleScroll = () => {
      if (!element) return;
      
      // Position de l'élément par rapport au viewport
      const rect = element.getBoundingClientRect();
      
      // Vérifier si l'élément est visible
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      
      // Calculer la position de défilement
      const scrollPosition = window.innerHeight - rect.top;
      const scrollPercentage = scrollPosition / window.innerHeight;
      const translateAmount = scrollPercentage * strength * 100;
      
      // Appliquer la transformation en fonction de la direction
      let transform = '';
      switch (direction) {
        case 'up':
          transform = `translateY(-${translateAmount}px)`;
          break;
        case 'down':
          transform = `translateY(${translateAmount}px)`;
          break;
        case 'left':
          transform = `translateX(-${translateAmount}px)`;
          break;
        case 'right':
          transform = `translateX(${translateAmount}px)`;
          break;
      }
      
      element.style.transform = transform;
    };
    
    // Ajouter l'écouteur d'événement avec l'option passive pour améliorer les performances
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Appeler handleScroll une fois pour initialiser
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength, direction]);
  
  return (
    <div 
      ref={elementRef}
      className={`parallax-element will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default ParallaxScroll;