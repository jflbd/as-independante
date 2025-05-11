import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { MapPin } from 'lucide-react';

// Interface pour les villes principales de la région
interface LocalCitation {
  city: string;
  description: string;
}

// Liste des villes principales de Normandie avec descriptions SEO
const localCitations: LocalCitation[] = [
  {
    city: 'Caen',
    description: 'Accompagnement social personnalisé et démarches administratives à Caen. Intervention à domicile possible pour les personnes à mobilité réduite.'
  },
  {
    city: 'Rouen',
    description: 'Services d\'assistante sociale indépendante à Rouen. Aide aux démarches administratives, médiation familiale et accompagnement social.'
  },
  {
    city: 'Le Havre',
    description: 'Assistance sociale professionnelle au Havre. Conseil, orientation et accompagnement pour vos démarches sociales et administratives.'
  },
  {
    city: 'Bayeux',
    description: 'Assistante sociale libérale intervenant à Bayeux et ses environs. Accompagnement personnalisé pour les particuliers et les professionnels.'
  },
  {
    city: 'Lisieux',
    description: 'Services d\'accompagnement social à Lisieux. Soutien pour l\'accès aux droits et les démarches administratives complexes.'
  },
  {
    city: 'Deauville',
    description: 'Assistance sociale personnalisée à Deauville. Aide aux personnes âgées, aux familles et aux professionnels.'
  }
];

/**
 * Composant pour afficher des citations locales optimisées pour le SEO
 * Ce composant améliore le référencement local en citant des villes spécifiques
 */
const LocalSEOCitations: React.FC = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">Services d'assistante sociale en Normandie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {localCitations.map((location, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Assistante Sociale à {location.city}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {location.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            {siteConfig.name}, assistante sociale indépendante diplômée d'État, intervient dans toute la région Normandie.
            Contactez-moi pour un rendez-vous à mon cabinet ou une intervention à votre domicile.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocalSEOCitations;
