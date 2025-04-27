import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { OptimizedImage } from "../components/OptimizedImage";
import { ArrowLeft, Home, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log l'erreur pour des fins d'analyse
    console.error(
      "404 Error: Tentative d'accès à une route inexistante :",
      location.pathname
    );
  }, [location.pathname]);

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
            
            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                to="/" 
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-secondary transition-colors duration-300"
              >
                <Home size={18} />
                <span>Page d'accueil</span>
              </Link>
              
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-300"
              >
                <ArrowLeft size={18} />
                <span>Retour</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bande de contact en bas */}
        <div className="p-4 bg-gradient-to-r from-primary via-accent to-secondary text-white text-center">
          <p>Besoin d'aide pour retrouver votre chemin ? <Link to="/" onClick={(e) => {
            // Naviguer vers la page d'accueil, puis faire défiler jusqu'à la section contact
            setTimeout(() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }} className="font-medium underline hover:text-white/80">Contactez-moi</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
