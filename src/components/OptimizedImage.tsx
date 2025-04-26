import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  objectFit = 'contain',  // Changé de 'cover' à 'contain' par défaut
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Déterminer si l'image est au format WebP
  const isWebP = src.endsWith('.webp');
  
  // Créer une source fallback pour les navigateurs qui ne supportent pas WebP
  const fallbackSrc = isWebP ? src.replace('.webp', '.jpg') || src.replace('.webp', '.png') : src;
  
  // Support pour le chargement progressif
  const blurClass = !isLoaded && !priority ? 'blur-sm transition-all duration-300' : '';
  
  // Calculer l'aspect ratio si largeur et hauteur sont fournies
  const aspectRatio = width && height ? { aspectRatio: `${width} / ${height}` } : {};
  
  useEffect(() => {
    // Précharger l'image si elle est prioritaire
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  return (
    <picture className="overflow-hidden">
      {isWebP && (
        <source srcSet={src} type="image/webp" />
      )}
      <img 
        src={isWebP ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={() => setIsLoaded(true)}
        className={`${blurClass} ${className}`}
        style={{...aspectRatio, objectFit}}
      />
    </picture>
  );
}
