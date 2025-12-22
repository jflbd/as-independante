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
  const [imgFallbackIndex, setImgFallbackIndex] = useState(0);
  const isWebP = src.endsWith('.webp');
  const fallbackCandidates = ['.jpeg', '.jpg', '.png'];
  const basePath = isWebP ? src.slice(0, -5) : src;
  const currentFallback = isWebP ? `${basePath}${fallbackCandidates[Math.min(imgFallbackIndex, fallbackCandidates.length - 1)]}` : src;
  const blurClass = !isLoaded && !priority ? 'blur-sm transition-all duration-300' : '';
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
        src={currentFallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // Avancer sur les fallback si le fichier n'existe pas
          if (isWebP && imgFallbackIndex < fallbackCandidates.length - 1) {
            setImgFallbackIndex((i) => i + 1);
          }
        }}
        className={`${blurClass} ${className}`}
        style={{...aspectRatio, objectFit}}
      />
    </picture>
  );
}
