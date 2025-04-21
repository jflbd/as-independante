import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
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
import { ChevronRight, ArrowUp, Home } from "lucide-react";

// Structure des sections légales
interface LegalSection {
  id: string;
  title: string;
  component: React.ReactNode;
}

const LegalNotices = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Définition des sections avec leur id, titre et composant
  const legalSections: LegalSection[] = [
    { id: "definitions", title: "Définitions", component: <LegalDefinitions /> },
    { id: "presentation", title: "Présentation du site", component: <LegalPresentation /> },
    { id: "terms", title: "Conditions générales d'utilisation", component: <LegalTermsOfUse /> },
    { id: "services", title: "Services offerts", component: <LegalServices /> },
    { id: "technical", title: "Limitations techniques", component: <LegalTechnicalLimitations /> },
    { id: "intellectual", title: "Propriété intellectuelle", component: <LegalIntellectualProperty /> },
    { id: "liability", title: "Responsabilité", component: <LegalLiability /> },
    { id: "personal-data", title: "Données personnelles", component: <LegalPersonalData /> },
    { id: "incident", title: "Notification d'incident", component: <LegalIncidentNotification /> },
    { id: "cookies", title: "Cookies", component: <LegalCookies /> },
    { id: "jurisdiction", title: "Droit applicable et juridiction", component: <LegalJurisdiction /> },
  ];

  // Date de dernière mise à jour - mise à jour avec la date actuelle
  const lastUpdated = "22 avril 2025";

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

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Mentions légales | {siteConfig.title}</title>
        <meta name="description" content="Mentions légales et conditions d'utilisation du site de Rachel Gervais, Assistante Sociale Indépendante." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          {/* Bouton de retour à l'accueil amélioré */}
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-300 group"
            aria-label="Retour à la page d'accueil"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Retour à l'accueil</span>
          </Link>
          
          {/* Logo du site ou nom */}
          <div className="flex items-center">
            <Home className="h-5 w-5 text-primary mr-2" />
            <span className="text-lg font-serif font-medium text-gray-800">{siteConfig.name}</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar de navigation */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold text-lg mb-4 text-gray-800">Table des matières</h2>
                <nav className="space-y-1">
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
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Dernière mise à jour : <br />
                    <span className="font-medium">{lastUpdated}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="md:col-span-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Mentions légales</h1>
            
            <div className="prose prose-blue max-w-none">
              {legalSections.map((section, index) => (
                <section 
                  key={section.id} 
                  id={section.id}
                  className={`pb-8 ${index !== 0 ? 'border-t border-gray-200 pt-8 mt-8' : ''}`}
                >
                  <h2 className="group flex items-center">
                    {section.title}
                    <a href={`#${section.id}`} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-primary">#</span>
                    </a>
                  </h2>
                  {section.component}
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
