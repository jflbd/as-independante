import React, { useState } from 'react';

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
  const [imageError, setImageError] = useState(false);
  
  // Fonction pour obtenir le chemin de l'image WebP
  const getWebPPath = (imagePath: string) => {
    // Si c'est déjà un WebP, on ne change rien
    if (imagePath.endsWith('.webp')) return imagePath;
    
    // Si c'est une image externe comme Unsplash, on utilise les paramètres d'URL
    if (imagePath.includes('unsplash.com')) {
      return `${imagePath}${imagePath.includes('?') ? '&' : '?'}auto=format&fit=crop&w=${width || 800}&fm=webp&q=80`;
    }
    
    // Pour les images locales, on change l'extension
    const basePath = imagePath.substring(0, imagePath.lastIndexOf('.')) || imagePath;
    return `${basePath}.webp`;
  };
  
  // Traitement spécifique pour Unsplash
  const optimizedSrc = src.includes('unsplash.com') 
    ? `${src}${src.includes('?') ? '&' : '?'}auto=format&fit=crop&w=${width || 800}&q=75` 
    : src;
  
  // Image WebP
  const webpSrc = getWebPPath(src);
  
  // Image de secours en cas d'erreur
  const fallbackSrc = '/placeholder.svg'; // Corrigé pour retirer /public/
  
  const handleError = () => {
    console.error(`Erreur de chargement de l'image: ${src}`);
    setImageError(true);
  };

  // Si l'image a déjà généré une erreur, on utilise le fallback
  if (imageError) {
    return (
      <img 
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    );
  }

  // Utiliser la balise picture pour fournir des alternatives WebP avec fallback
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={optimizedSrc} type="image/jpeg" />
      <img 
        src={optimizedSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        onError={handleError}
      />
    </picture>
  );
};

export default OptimizedImage;
