import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { OptimizedImage } from "../components/OptimizedImage";
import { ArrowLeft, Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/siteConfig";
import { scrollToSectionWithNavOffset } from "@/utils/scroll-utils";
import ScrollButtons from "@/components/ScrollButtons";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Log l'erreur pour des fins d'analyse
    console.error(
      "404 Error: Tentative d'accès à une route inexistante :",
      location.pathname
    );
  }, [location.pathname]);

  // Fonction pour naviguer vers l'accueil et défiler vers la section contact
  const navigateToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    
    // Après navigation vers l'accueil, faire défiler vers la section contact
    setTimeout(() => {
      const navbarElement = document.querySelector('nav');
      const navbarHeight = navbarElement ? navbarElement.getBoundingClientRect().height : 70;
      
      scrollToSectionWithNavOffset('contact', navbarHeight, 20);
    }, 500); // Délai pour permettre le chargement de la page
  };
  
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            {/* Logo du site */}
            <div className="mb-6 w-32 h-auto">
              <OptimizedImage
                src={siteConfig.ui.logo}
                alt="logo Assistante Sociale indépendante"
                width={180}
                height={60}
                className="w-full h-auto"
              />
            </div>
            
            {/* Animation et illustration */}
            <div className="relative mb-8">
              <div className="text-[120px] md:text-[150px] font-bold text-primary/10 select-none animate-pulse">
                404
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle size={64} className="text-primary opacity-75" />
                </div>
              </div>
            </div>
            
            {/* Message d'erreur */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              Oups ! Page introuvable
            </h1>
            
            <p className="text-gray-600 mb-6 max-w-md">
              La page que vous recherchez n'existe pas ou a été déplacée. 
              Pas d'inquiétude, je peux toujours vous aider à retrouver votre chemin.
            </p>
            
            {/* Suggestions pour l'utilisateur */}
            <div className="text-sm text-gray-500 mb-8 text-left">
              <p className="mb-2">Suggestions :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Vérifiez l'URL saisie pour d'éventuelles fautes de frappe</li>
                <li>Retournez à la page d'accueil pour naviguer vers votre destination</li>
                <li>Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à me contacter</li>
              </ul>
            </div>
            
            {/* Boutons d'action avec les animations du site */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                onClick={goToHome}
                className="flex items-center justify-center gap-2"
                hoverAnimation="medium"
                clickAnimation="bounce"
              >
                <Home size={18} />
                <span>Retour à l'accueil</span>
              </Button>
              
              <Button 
                variant="secondary"
                onClick={navigateToContact}
                className="flex items-center justify-center gap-2"
                hoverAnimation="medium"
                clickAnimation="bounce"
              >
                <AlertCircle size={18} />
                <span>Besoin d'aide?</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ajout du composant ScrollButtons avec forceHide=true pour éviter l'affichage des flèches */}
      <ScrollButtons forceHide={true} includeHomeButton={true} onHomeClick={goToHome} />
    </div>
  );
};

export default NotFound;
