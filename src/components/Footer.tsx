import React from 'react';
import SafeLink from '@/components/SafeLink';
import { siteConfig } from '@/config/siteConfig';
import { SiFacebook } from '@icons-pack/react-simple-icons';
import { useLegalModal } from '@/contexts/LegalModalContext';
import { Book, Lock, FileText } from 'lucide-react';

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

const Footer: React.FC = () => {
    const { openLegalModal } = useLegalModal();
    const currentYear = new Date().getFullYear();
    const startYear = 2023; // Année de création du site
    const copyrightYears = startYear === currentYear 
      ? currentYear 
      : `${startYear} - ${currentYear}`;
    
    // Données structurées pour les liens de navigation du footer
    const footerNavLinks = [
      { name: "Accueil", url: "#accueil", id: "footer-home" },
      { name: "Services", url: "#services", id: "footer-services" },
      { name: "Témoignages", url: "#temoignages", id: "footer-testimonials" },
      { name: "Contact", url: "#contact", id: "footer-contact" },
      { 
        name: "Ebook", 
        url: "/ebook", 
        id: "footer-ebook", 
        highlight: true, 
        icon: <Book className="h-4 w-4 mr-1" /> 
      },
    ];

    // Liens vers les informations légales dans les modales
    const legalLinks = [
      { name: "Mentions légales", section: "presentation", icon: <FileText className="h-4 w-4 mr-1" /> },
      { name: "Données personnelles", section: "personal-data", icon: <Lock className="h-4 w-4 mr-1" /> },
      { name: "Conditions d'utilisation", section: "terms", icon: <Book className="h-4 w-4 mr-1" /> },
    ] as const;
    
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
                        <SafeLink 
                          to={link.url} 
                          className={`text-sm ${link.highlight 
                            ? 'text-primary font-semibold hover:text-accent' 
                            : 'text-gray-600 hover:text-primary'} transition-colors hover:underline flex items-center`}
                          id={link.id}
                        >
                          {link.icon && link.icon}
                          {link.name}
                        </SafeLink>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Liens légaux avec modales */}
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">Informations légales</h3>
                  <ul className="space-y-2">
                    {legalLinks.map((link, index) => (
                      <li key={`legal-${index}`}>
                        <button 
                          onClick={() => openLegalModal(link.section)}
                          className="text-sm text-gray-600 hover:text-primary transition-colors hover:underline flex items-center"
                        >
                          {link.icon}
                          {link.name}
                        </button>
                      </li>
                    ))}
                    <li>
                      <SafeLink 
                        to="/mentions-legales" 
                        className="text-sm text-gray-600 hover:text-primary transition-colors hover:underline flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Version complète
                      </SafeLink>
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