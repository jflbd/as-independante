import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SafeLink from '@/components/SafeLink';
import { siteConfig } from '@/config/siteConfig';
import { SiFacebook } from '@icons-pack/react-simple-icons';
import { Book, Lock, FileText } from 'lucide-react';
import { scrollToTop, scrollToSectionWithNavOffset, navigateToLegalSection } from '@/utils/scroll-utils';

const FooterSchemaOrgScript: React.FC = () => (
  <script 
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "description": "Assistante Sociale Indépendante",
        "url": siteConfig.url,
        "logo": `${siteConfig.url}${siteConfig.ui.logo}`,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": siteConfig.contact.region,
          "addressCountry": siteConfig.contact.country
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": siteConfig.contact.phone,
          "email": siteConfig.contact.email,
          "contactType": "customer service"
        },
        "sameAs": [
          siteConfig.social.facebook
        ]
      })
    }}
  />
);

// Composant pour gérer le défilement vers les sections depuis n'importe quelle page
const SmoothScrollLink: React.FC<{
  to: string;
  className: string;
  id?: string;
  children: React.ReactNode;
}> = ({ to, className, id, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Extraire le chemin de base et l'ancre de l'URL de destination
  let basePath = to;
  let anchor = '';
  
  if (to.includes('#')) {
    const parts = to.split('#');
    basePath = parts[0] || currentPath; // Si basePath est vide, utiliser le chemin actuel
    anchor = parts[1];
  }
  
  // Vérifier si nous sommes sur la même page que la destination
  const isSamePage = (basePath === '' || basePath === '/') && currentPath === '/' || 
                     basePath !== '' && basePath !== '/' && currentPath === basePath;
  
  // Déterminer si le lien pointe vers la page des mentions légales
  const isLegalLink = basePath === '/mentions-legales' || basePath === 'mentions-legales';
  
  // Si nous sommes sur la même page et qu'il y a une ancre
  if (isSamePage && anchor) {
    return (
      <a 
        href={`#${anchor}`} 
        className={`${className} ${isScrolling ? 'pointer-events-none opacity-75' : ''}`}
        id={id}
        onClick={(e) => {
          e.preventDefault();
          if (isScrolling) return;
          
          setIsScrolling(true);
          
          // Fermer tous les menus ouverts potentiels (utile si footer visible sur mobile)
          document.body.click();
          
          // Obtenir la hauteur actuelle de la navbar
          const navbarElement = document.querySelector('nav');
          const navbarHeight = navbarElement ? navbarElement.getBoundingClientRect().height : 70;
          
          // Utiliser la fonction de défilement de scroll-utils
          scrollToSectionWithNavOffset(anchor, navbarHeight, 20, () => {
            setIsScrolling(false);
          });
        }}
      >
        {children}
      </a>
    );
  }
  
  // Gestion spéciale pour le lien "Accueil" - défilement vers le haut de la page d'accueil
  if (to === "/" || to === "") {
    return (
      <Link 
        to="/" 
        className={`${className} ${isScrolling ? 'pointer-events-none opacity-75' : ''}`}
        id={id}
        onClick={(e) => {
          if (isScrolling) return;
          
          setIsScrolling(true);
          
          // Si nous sommes déjà sur la page d'accueil, défiler vers le haut immédiatement
          if (currentPath === "/") {
            e.preventDefault();
            scrollToTop();
            setTimeout(() => setIsScrolling(false), 500);
          }
          // Sinon, la navigation se fait via le Link et le hook useScrollToTop s'en occupera
        }}
        state={{ scrollToTop: true }}
      >
        {children}
      </Link>
    );
  }
  
  // Si le lien pointe vers une page des mentions légales avec une ancre
  if (isLegalLink && anchor) {
    return (
      <a
        href={`/mentions-legales#${anchor}`}
        className={`${className} ${isScrolling ? 'pointer-events-none opacity-75' : ''}`}
        id={id}
        onClick={(e) => {
          e.preventDefault();
          if (isScrolling) return;
          
          setIsScrolling(true);
          
          // Si nous sommes déjà sur la page des mentions légales, faire défiler vers l'ancre
          if (currentPath === '/mentions-legales') {
            // Utiliser la fonction dédiée pour la navigation dans les mentions légales
            // en forçant un petit délai pour s'assurer que tout est prêt
            setTimeout(() => {
              navigateToLegalSection(anchor);
              setIsScrolling(false);
            }, 50);
          } else {
            // Sinon, naviguer vers la page des mentions légales avec l'ancre
            navigate(`/mentions-legales#${anchor}`);
          }
        }}
      >
        {children}
      </a>
    );
  }
  
  // Si nous devons naviguer vers une autre page avec une ancre
  if (!isSamePage && anchor && !isLegalLink) {
    // Construire l'URL complète avec l'ancre
    const fullPath = basePath + (basePath.endsWith('/') ? '' : '/') + `#${anchor}`;
    return (
      <Link 
        to={fullPath} 
        className={`${className} ${isScrolling ? 'pointer-events-none opacity-75' : ''}`} 
        id={id}
        onClick={() => {
          if (isScrolling) return;
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 100);
        }}
      >
        {children}
      </Link>
    );
  }
  
  // Si c'est une URL normale sans ancre ou une URL externe
  if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
    return <SafeLink to={to} className={className} id={id} external={to.startsWith('http')}>{children}</SafeLink>;
  }
  
  // URL interne normale
  return <Link to={to} className={className} id={id}>{children}</Link>;
};

const Footer: React.FC = () => {
    const location = useLocation();
    const currentYear = new Date().getFullYear();
    const startYear = 2019; // Année de création du site
    const copyrightYears = startYear === currentYear 
      ? currentYear 
      : `${startYear} - ${currentYear}`;
    
    // Déterminer si nous sommes sur la page d'accueil ou une autre page
    const isHomePage = location.pathname === '/';
    const isLegalPage = location.pathname === '/mentions-legales';
    
    // Données structurées pour les liens de navigation du footer
    const footerNavLinks = [
      { 
        name: "Accueil", 
        url: "/", 
        id: "footer-home" 
      },
      { 
        name: "Services", 
        url: isHomePage ? "#services" : "/#services", 
        id: "footer-services" 
      },
      { 
        name: "Témoignages", 
        url: isHomePage ? "#temoignages" : "/#temoignages", 
        id: "footer-testimonials" 
      },
      { 
        name: "Contact", 
        url: isHomePage ? "#contact" : "/#contact", 
        id: "footer-contact" 
      },
      { 
        name: "Ebook", 
        url: location.pathname === '/ebook' ? "#" : "/ebook", 
        id: "footer-ebook", 
        highlight: true, 
        icon: <Book className="h-4 w-4 mr-1" /> 
      },
    ];

    // Liens vers les informations légales (maintenant avec des liens directs vers les ancres)
    const legalLinks = [
      { name: "Mentions légales", url: "/mentions-legales#presentation", icon: <FileText className="h-4 w-4 mr-1" /> },
      { name: "Données personnelles", url: "/mentions-legales#personal-data", icon: <Lock className="h-4 w-4 mr-1" /> },
      { name: "Conditions d'utilisation", url: "/mentions-legales#terms", icon: <Book className="h-4 w-4 mr-1" /> },
    ];
    
    return (
        <footer className="py-8 bg-gray-50 relative" itemScope itemType="https://schema.org/WPFooter">
          <FooterSchemaOrgScript />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40"></div>
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Colonne 1: À propos */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">À propos</h2>
                <p className="text-gray-600 mb-2">
                  <span itemProp="name">{siteConfig.name}</span>
                  <meta itemProp="description" content={`Assistante Sociale Indépendante proposant un accompagnement social personnalisé en ${siteConfig.contact.region}`} />
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Assistante Sociale diplômée d'État depuis 2009, j'offre un accompagnement personnalisé dans vos démarches sociales en {siteConfig.contact.region}.
                </p>
                <div className="text-xs text-gray-500">
                  <span>SIRET: {siteConfig.legal?.siret || "En cours"}</span>
                </div>
              </div>
              
              {/* Colonne 2: Navigation */}
              <div>
                <h2 className="text-lg font-semibold mb-4 text-primary">Plan du site</h2>
                <nav aria-label="Navigation du pied de page">
                  <ul className="space-y-2 mb-4">
                    {footerNavLinks.map((link) => (
                      <li key={link.id}>
                        <SmoothScrollLink 
                          to={link.url} 
                          className={`text-sm ${link.highlight 
                            ? 'text-primary font-semibold hover:text-accent' 
                            : 'text-gray-600 hover:text-primary'} transition-colors hover:underline flex items-center`}
                          id={link.id}
                        >
                          {link.icon && link.icon}
                          {link.name}
                        </SmoothScrollLink>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Liens légaux avec des liens directs vers les sections */}
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">Informations légales</h3>
                  <ul className="space-y-2">
                    {legalLinks.map((link, index) => (
                      <li key={`legal-${index}`}>
                        <SmoothScrollLink 
                          to={link.url} 
                          className="text-sm text-gray-600 hover:text-primary transition-colors hover:underline flex items-center"
                        >
                          {link.icon}
                          {link.name}
                        </SmoothScrollLink>
                      </li>
                    ))}
                    <li>
                      <SmoothScrollLink 
                        to="/mentions-legales" 
                        className="text-sm text-gray-600 hover:text-primary transition-colors hover:underline flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Version complète
                      </SmoothScrollLink>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Colonne 3: Contact */}
              <div itemScope itemType="https://schema.org/Organization">
                <h2 className="text-lg font-semibold mb-4 text-primary">Contact</h2>
                <div className="space-y-3">
                  <div>
                    <a 
                      href={`mailto:${siteConfig.contact.email}`} 
                      className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                      itemProp="email"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{siteConfig.contact.email}</span>
                    </a>
                  </div>
                  <div>
                    <a 
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} 
                      className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                      itemProp="telephone"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{siteConfig.contact.phone}</span>
                    </a>
                  </div>
                  <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        <span itemProp="addressRegion">{siteConfig.contact.region}</span>, 
                        <span itemProp="addressCountry">{siteConfig.contact.country}</span>
                      </span>
                    </p>
                  </div>
                  <div>
                    <SafeLink 
                      to={siteConfig.social.facebook} 
                      external={true}
                      className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                      aria-label="Rejoignez-moi sur Facebook"
                    >
                      <SiFacebook className="h-5 w-5 text-[#1877F2] transition-transform group-hover:scale-110" />
                      <span className="text-sm">Facebook</span>
                    </SafeLink>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright et mentions légales */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                  &copy; {copyrightYears} <span itemProp="copyrightHolder">{siteConfig.name}</span>. Tous droits réservés.
                </div>
                <div className="text-xs text-gray-400">
                  Site réalisé avec <span className="text-red-400">♥</span> par {siteConfig.freelance}
                </div>
              </div>
            </div>
          </div>
        </footer>
    );
};

export default Footer;