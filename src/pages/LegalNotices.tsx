import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
import { ChevronRight, ExternalLink, Calendar, ChevronLeft, ChevronUp, Home, FileText, Shield, Scale, BookOpen } from "lucide-react";
import ScrollButtons from "@/components/ScrollButtons";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/OptimizedImage";
import { navigateToLegalSection, scrollToTop } from "@/utils/scroll-utils";

// Structure des sections légales
interface LegalSection {
  id: string;
  title: string;
  component: React.ReactNode;
  schema?: string; // Ajout d'un type schema optionnel pour la structuration SEO
}

const LegalNotices = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Date dynamique de dernière mise à jour - mis à jour automatiquement lors du build
  const lastUpdated = "30 avril 2025";
  
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

  // Scroll to top when component mounts and handle direct anchor navigation
  useEffect(() => {
    // Extraire l'ancre de l'URL
    const hash = location.hash;
    
    if (hash) {
      // Si une ancre est présente, scroller vers cette section
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      
      if (element) {
        // Petit délai pour permettre au DOM de se rendre complètement
        setTimeout(() => {
          navigateToLegalSection(id, false);
          setActiveSection(id);
        }, 300);
      } else {
        // Si l'ancre est invalide, scroller au début
        scrollToTop();
      }
    } else {
      // Sinon, scroller au début de la page après un délai pour s'assurer que le rendu est complet
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }

    // Force le positionnement au bon endroit après le chargement complet de la page
    window.addEventListener('load', () => {
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          navigateToLegalSection(id, false);
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }
    });
  }, [location]);

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
        // Mise à jour de l'URL avec l'ancre sans recharger la page
        const newHash = `#${legalSections[currentSection].id}`;
        if (location.hash !== newHash) {
          window.history.replaceState(null, '', newHash);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [legalSections, location.hash]);

  // Fonction pour naviguer vers une section
  const scrollToSection = (id: string) => {
    navigateToLegalSection(id);
    setActiveSection(id);
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
        <style type="text/css">
          {`
            @keyframes highlight-fade {
              0% { background-color: rgba(var(--color-primary), 0.1); }
              100% { background-color: transparent; }
            }
            .highlight-section {
              animation: highlight-fade 1.5s ease-out forwards;
              scroll-margin-top: 100px;
            }
            section {
              scroll-margin-top: 100px;
            }
            body {
              padding-top: 0 !important;
              margin-top: 0 !important;
            }
          `}
        </style>
      </Helmet>
      
      {/* Header spécifique aux mentions légales - Remplace NavBar standard */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-lg py-2" style={{ fontFamily: 'var(--font-primary)', top: 0 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo avec lien vers l'accueil */}
            <Link to="/" className="flex items-center gap-2" aria-label="Retour à l'accueil">
              <div className="flex items-center justify-center">
                <div className="w-auto h-auto relative rounded-md p-1 my-0">
                  <OptimizedImage
                    src={siteConfig.ui.logo}
                    alt="logo Assistante Sociale indépendante"
                    className="w-auto h-auto object-contain max-h-[35px] md:max-h-[45px] opacity-100"
                    width={160}
                    height={50}
                    priority
                  />
                </div>
              </div>
              <span className="font-medium text-primary hidden md:inline">
                {siteConfig.name}
              </span>
            </Link>
            
            {/* Titre de la page en version desktop */}
            <div className="hidden md:flex items-center rounded-full bg-primary/5 px-6 py-2">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-primary font-semibold">Mentions légales</h2>
            </div>
            
            {/* Boutons de navigation */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
                aria-label="Retour à l'accueil"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Accueil</span>
              </Link>
              <button
                onClick={() => scrollToTop()}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                aria-label="Retour en haut de page"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* En-tête de la page avec bannière thématique - Ajout de padding-top pour compenser le header fixe */}
      <div className="pt-24 bg-gradient-to-r from-primary/5 to-gray-50" style={{ scrollMarginTop: '60px' }}>
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Mentions légales
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Informations juridiques, conditions d'utilisation et politique de confidentialité du site de {siteConfig.name}, Assistante Sociale Indépendante.
              </p>
              
              {/* Fil d'Ariane (Breadcrumb) */}
              <nav className="mt-4 text-sm text-gray-600" aria-label="Fil d'Ariane">
                <ol className="flex items-center flex-wrap">
                  <li className="flex items-center">
                    <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                  </li>
                  <li className="font-medium text-primary" aria-current="page">Mentions légales</li>
                </ol>
              </nav>
            </div>
            
            <div className="flex flex-shrink-0 gap-5 items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-8 w-8 text-primary mb-1" />
                <span className="text-xs font-medium">Protection<br/>des données</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Scale className="h-8 w-8 text-primary mb-1" />
                <span className="text-xs font-medium">Conformité<br/>RGPD</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <BookOpen className="h-8 w-8 text-primary mb-1" />
                <span className="text-xs font-medium">Conditions<br/>d'utilisation</span>
              </div>
            </div>
          </div>
          
          {/* Dernière mise à jour */}
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1.5" />
            <span>Dernière mise à jour : <time dateTime={lastUpdated.replace(/\s/g, '-')}>{lastUpdated}</time></span>
          </div>
        </div>
      </div>
      
      {/* Ajout du composant ScrollButtons avec le bouton Home pour revenir à l'accueil */}
      <ScrollButtons includeHomeButton={true} onHomeClick={() => navigate('/')} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar de navigation */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
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
                  <Link to="/" className="flex items-center hover:text-primary transition-colors">
                    <Home className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-gray-800">{siteConfig.name}</span>
                  </Link>
                  <p className="text-xs mt-2 text-gray-500">
                    SIRET: {siteConfig.legal?.siret || "En cours d'immatriculation"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="md:col-span-3">
            <div className="prose prose-blue max-w-none">
              {legalSections.map((section, index) => (
                <section 
                  key={section.id} 
                  id={section.id}
                  className={`p-4 pb-8 ${index !== 0 ? 'border-t border-gray-200 pt-8 mt-8' : ''}`}
                  // Ajout d'un attribut data-schema pour le SEO
                  data-schema={section.schema || ""}
                >
                  <h2 className="group flex items-center text-2xl font-serif font-bold mb-4">
                    {section.title}
                    <a href={`#${section.id}`} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-primary">#</span>
                    </a>
                  </h2>
                  <div className="legal-content">
                    {section.component}
                  </div>
                  
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
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ajout du Footer */}
      <Footer />
    </div>
  );
};

export default LegalNotices;
