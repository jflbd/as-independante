
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy' 
}: OptimizedImageProps) => {
  
  // Ajouter des paramètres d'optimisation pour les images d'Unsplash
  const optimizedSrc = src.includes('unsplash.com') 
    ? `${src}${src.includes('?') ? '&' : '?'}auto=format&fit=crop&w=${width || 800}&q=75` 
    : src;
  
  return (
    <img 
      src={optimizedSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
};

export default OptimizedImage;
