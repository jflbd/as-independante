import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import LegalDefinitions from "../components/legal/LegalDefinitions";
import LegalPresentation from "../components/legal/LegalPresentation";
import LegalTermsOfUse from "../components/legal/LegalTermsOfUse";
import LegalServices from "../components/legal/LegalServices";
import LegalTechnicalLimitations from "../components/legal/LegalTechnicalLimitations";
import LegalIntellectualProperty from "../components/legal/LegalIntellectualProperty";
import LegalLiability from "../components/legal/LegalLiability";
import LegalPersonalData from "../components/legal/LegalPersonalData";
import LegalIncidentNotification from "../components/legal/LegalIncidentNotification";
import LegalCookies from "../components/legal/LegalCookies";
import LegalJurisdiction from "../components/legal/LegalJurisdiction";
import { siteConfig } from "@/config/siteConfig";
import { ChevronRight, ArrowUp, Home, ExternalLink, Calendar, ChevronLeft } from "lucide-react";

// Structure des sections légales
interface LegalSection {
  id: string;
  title: string;
  component: React.ReactNode;
  schema?: string; // Ajout d'un type schema optionnel pour la structuration SEO
}

const LegalNotices = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Date dynamique de dernière mise à jour - mis à jour automatiquement lors du build
  const lastUpdated = "25 avril 2025";
  
  // Définition des sections avec leur id, titre, composant et schema SEO
  const legalSections: LegalSection[] = useMemo(() => [
    { 
      id: "definitions", 
      title: "Définitions", 
      component: <LegalDefinitions />,
      schema: "DefinedTerm"
    },
    { 
      id: "presentation", 
      title: "Présentation du site", 
      component: <LegalPresentation />,
      schema: "WebSite"
    },
    { 
      id: "terms", 
      title: "Conditions générales d'utilisation", 
      component: <LegalTermsOfUse />,
      schema: "DigitalDocument"
    },
    { 
      id: "services", 
      title: "Services offerts", 
      component: <LegalServices />,
      schema: "Service"
    },
    { 
      id: "technical", 
      title: "Limitations techniques", 
      component: <LegalTechnicalLimitations /> 
    },
    { 
      id: "intellectual", 
      title: "Propriété intellectuelle", 
      component: <LegalIntellectualProperty />,
      schema: "LegalRights"
    },
    { 
      id: "liability", 
      title: "Responsabilité", 
      component: <LegalLiability /> 
    },
    { 
      id: "personal-data", 
      title: "Données personnelles", 
      component: <LegalPersonalData />,
      schema: "PrivacyPolicy"
    },
    { 
      id: "incident", 
      title: "Notification d'incident", 
      component: <LegalIncidentNotification /> 
    },
    { 
      id: "cookies", 
      title: "Cookies", 
      component: <LegalCookies />,
      schema: "WebSite"
    },
    { 
      id: "jurisdiction", 
      title: "Droit applicable et juridiction", 
      component: <LegalJurisdiction />,
      schema: "GovernmentOrganization" 
    },
  ], []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Vérifier s'il y a un hash dans l'URL pour naviguer vers la section
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }, 100);
      }
    }
  }, []);

  // Gestion du scroll pour mettre en évidence la section active
  useEffect(() => {
    const handleScroll = () => {
      const sections = legalSections.map(section => 
        document.getElementById(section.id)
      );
      
      const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });
      
      if (currentSection !== -1) {
        setActiveSection(legalSections[currentSection].id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [legalSections]);

  // Fonction pour naviguer vers une section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      // Mise à jour de l'URL avec l'ancre
      window.history.pushState({}, "", `#${id}`);
    }
  };

  // Construction du schema.org pour la page complète
  const legalSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `Mentions légales | ${siteConfig.title}`,
    "description": "Mentions légales et conditions d'utilisation du site de Rachel Gervais, Assistante Sociale Indépendante.",
    "provider": {
      "@type": "Person",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "dateModified": lastUpdated,
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "isPartOf": {
        "@id": `${siteConfig.url}/mentions-legales`
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Mentions légales | {siteConfig.title}</title>
        <meta name="description" content="Mentions légales et conditions d'utilisation du site de Rachel Gervais, Assistante Sociale Indépendante." />
        <meta name="robots" content="noindex, follow" />
        {/* Balises canoniques pour éviter le duplicate content */}
        <link rel="canonical" href={`${siteConfig.url}/mentions-legales`} />
        {/* Métadonnées supplémentaires pour le SEO */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Mentions légales | ${siteConfig.title}`} />
        <meta property="og:description" content="Mentions légales et conditions d'utilisation du site de Rachel Gervais, Assistante Sociale Indépendante." />
        <meta property="og:url" content={`${siteConfig.url}/mentions-legales`} />
        {/* Schema.org pour le contenu légal */}
        <script type="application/ld+json">
          {JSON.stringify(legalSchema)}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Fil d'Ariane (Breadcrumb) */}
        <nav className="mb-6 text-sm text-gray-600" aria-label="Fil d'Ariane">
          <ol className="flex items-center flex-wrap">
            <li className="flex items-center">
              <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
            </li>
            <li className="font-medium text-primary" aria-current="page">Mentions légales</li>
          </ol>
        </nav>

        <div className="flex justify-between items-center mb-8">
          {/* Bouton de retour à l'accueil amélioré */}
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary" style={{ borderRadius: '0.5rem' }}
            aria-label="Retour à la page d'accueil"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Retour à l'accueil</span>
          </Link>
          
          {/* Dernière mise à jour avec icône */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Mise à jour : <time dateTime={lastUpdated.replace(/\s/g, '-')}>{lastUpdated}</time></span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar de navigation */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 p-4 shadow-sm" style={{ borderRadius: '0.5rem' }}>
                <h2 className="font-semibold text-lg mb-4 text-gray-800">Table des matières</h2>
                <nav className="space-y-1" aria-label="Navigation des sections légales">
                  {legalSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center text-left px-3 py-2 rounded-md text-sm ${
                        activeSection === section.id 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'hover:bg-gray-100 text-gray-700'
                      } transition-colors`}
                    >
                      {activeSection === section.id && (
                        <ChevronRight className="h-4 w-4 mr-1 shrink-0" />
                      )}
                      <span>{section.title}</span>
                    </button>
                  ))}
                </nav>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-gray-800">{siteConfig.name}</span>
                  </div>
                  <p className="text-xs mt-2 text-gray-500">
                    SIRET: {siteConfig.legal?.siret || "En cours d'immatriculation"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="md:col-span-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">Mentions légales</h1>
            
            <p className="text-gray-600 mb-8 text-lg">
              Ce document détaille les conditions d'utilisation, les mentions légales et les informations relatives à la protection des données personnelles qui s'appliquent lorsque vous consultez ce site web.
            </p>
            
            <div className="prose prose-blue max-w-none">
              {legalSections.map((section, index) => (
                <section 
                  key={section.id} 
                  id={section.id}
                  className={`pb-8 ${index !== 0 ? 'border-t border-gray-200 pt-8 mt-8' : ''}`}
                  // Ajout d'un attribut data-schema pour le SEO
                  data-schema={section.schema || ""}
                >
                  <h2 className="group flex items-center">
                    {section.title}
                    <a href={`#${section.id}`} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-primary">#</span>
                    </a>
                  </h2>
                  {section.component}
                  
                  {/* Ajout de liens contextuels pour certaines sections importantes */}
                  {section.id === "personal-data" && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="flex items-center text-gray-700">
                        <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                        <span>Ressources complémentaires : </span>
                        <a 
                          href="https://www.cnil.fr/fr/rgpd-par-ou-commencer" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="ml-2 text-primary hover:underline"
                        >
                          Guide RGPD de la CNIL
                        </a>
                      </p>
                    </div>
                  )}
                  
                  {section.id === "cookies" && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="flex items-center text-gray-700">
                        <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                        <span>Pour en savoir plus : </span>
                        <a 
                          href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="ml-2 text-primary hover:underline"
                        >
                          Cookies et traceurs : que dit la loi ? (CNIL)
                        </a>
                      </p>
                    </div>
                  )}
                  
                  {/* Navigation entre sections */}
                  <div className="mt-6 flex justify-between text-sm">
                    {index > 0 && (
                      <button
                        onClick={() => scrollToSection(legalSections[index - 1].id)}
                        className="flex items-center text-primary hover:underline"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span>Section précédente</span>
                      </button>
                    )}
                    {index < legalSections.length - 1 && (
                      <button
                        onClick={() => scrollToSection(legalSections[index + 1].id)}
                        className="flex items-center text-primary hover:underline ml-auto"
                      >
                        <span>Section suivante</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Bouton retour en haut et retour accueil */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3">
              <Link 
                to="/" 
                className="p-3 bg-primary/90 text-white rounded-full shadow-lg hover:bg-primary transition-colors"
                aria-label="Retour à la page d'accueil"
              >
                <Home className="h-5 w-5" />
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                aria-label="Retour en haut de page"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotices;
