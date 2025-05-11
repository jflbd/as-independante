import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedLinksProps {
  title?: string;
  links: Array<{
    text: string;
    url: string;
    description?: string;
  }>;
  className?: string;
}

/**
 * Composant pour afficher des liens connexes afin d'améliorer le maillage interne
 * Ce composant est utile pour le SEO en créant des liens internes pertinents
 */
const RelatedLinks: React.FC<RelatedLinksProps> = ({
  title = "Liens connexes",
  links,
  className = ""
}) => {
  if (!links || links.length === 0) return null;
  
  return (
    <div className={`bg-gray-50 rounded-lg p-5 my-6 border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index} className="flex">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <div>
              {link.url.startsWith('http') ? (
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  {link.text}
                </a>
              ) : (
                <Link to={link.url} className="text-primary hover:underline font-medium">
                  {link.text}
                </Link>
              )}
              {link.description && (
                <p className="text-sm text-gray-600 mt-0.5">{link.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedLinks;
