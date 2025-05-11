import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
  isLast: boolean;
}

/**
 * Composant de fil d'Ariane pour l'amélioration de la navigation et du SEO
 * Génère un fil d'Ariane basé sur l'URL actuelle
 */
const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  // Ne pas afficher le fil d'Ariane sur la page d'accueil
  if (location.pathname === '/') {
    return null;
  }
  
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '');
  
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Accueil', path: '/', isLast: pathSegments.length === 0 }
  ];
  
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    let name = '';
    
    // Conversion des segments d'URL en noms lisibles
    switch(segment) {
      case 'blog':
        name = 'Blog';
        break;
      case 'ebook':
        name = 'Guide pratique';
        break;
      case 'sitemap':
        name = 'Plan du site';
        break;
      case 'mentions-legales':
        name = 'Mentions légales';
        break;
      case 'role-assistante-sociale-independante':
        name = 'Rôle assistante sociale indépendante';
        break;
      case 'aides-sociales-normandie':
        name = 'Aides sociales en Normandie';
        break;
      case 'preparer-rendez-vous-assistante-sociale':
        name = 'Préparer un rendez-vous';
        break;
      default:
        name = segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    breadcrumbItems.push({
      name,
      path: currentPath,
      isLast: index === pathSegments.length - 1
    });
  });
  
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 mb-2">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            )}
            
            {item.isLast ? (
              <span className="text-gray-800 font-medium">{item.name}</span>
            ) : (
              <Link
                to={item.path}
                className="text-primary hover:underline"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
