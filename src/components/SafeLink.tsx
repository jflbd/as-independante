import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { scrollToSectionWithOffset } from '@/utils/scroll-utils';

interface SafeLinkProps extends RouterLinkProps {
  external?: boolean;
}

const SafeLink: React.FC<SafeLinkProps> = ({ 
  to, 
  children, 
  external = false,
  onClick,
  ...props 
}) => {
  // Vérifier si c'est un lien externe
  const isExternal = external || (typeof to === 'string' && (to.startsWith('http') || to.startsWith('mailto:')));

  // Vérifier si c'est un lien avec ancre
  const isAnchor = typeof to === 'string' && to.startsWith('#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Pour les liens d'ancrage, implémenter un défilement fluide avec offset
    if (isAnchor) {
      e.preventDefault();
      const targetId = to.substring(1);
      scrollToSectionWithOffset(targetId);
    }
    
    // Appeler le onClick d'origine s'il existe
    if (onClick) {
      onClick(e);
    }
  };

  // Pour les liens externes
  if (isExternal) {
    return (
      <a 
        href={to.toString()} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Pour les liens d'ancrage
  if (isAnchor) {
    return (
      <a 
        href={to} 
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Pour les liens internes de l'application
  return (
    <RouterLink 
      to={to} 
      onClick={onClick}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default SafeLink;
