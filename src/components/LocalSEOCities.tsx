import React from 'react';
import { Link } from 'react-router-dom';
import normandyCities from '@/data/normandyCities';

/**
 * Composant pour afficher les villes d'intervention en Normandie (SEO)
 * Centralisé pour faciliter la maintenance et la cohérence
 */
const LocalSEOCities: React.FC<{
  className?: string;
  titleClassName?: string;
  showAllCities?: boolean;
  maxCities?: number;
}> = ({ 
  className = "", 
  titleClassName = "",
  showAllCities = true,
  maxCities = 15
}) => {
  // Utilisation des données centralisées des villes
  const citiesToDisplay = showAllCities 
    ? normandyCities.slice(0, maxCities) 
    : normandyCities.filter(city => city.isMainCity).slice(0, maxCities);
  
  return (
    <div className={`py-4 mt-2 border-t border-gray-200 ${className}`}>
      <h2 className={`text-sm font-semibold mb-3 text-gray-700 ${titleClassName}`}>
        Zones d'intervention en Normandie
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {citiesToDisplay.map((city) => (
          <Link 
            key={city.name}
            to={city.url} 
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-primary/10 rounded-full text-gray-600 hover:text-primary transition-colors"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LocalSEOCities;
