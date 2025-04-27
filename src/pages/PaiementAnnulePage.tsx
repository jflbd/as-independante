import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';

const PaiementAnnulePage = () => {
  const navigate = useNavigate();
  
  // Fonction pour naviguer vers une page avec défilement vers une ancre
  const navigateWithScroll = (path: string, hash: string) => {
    // Naviguer vers la page
    navigate(path);
    
    // Après navigation, faire défiler vers l'ancre
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // Délai pour laisser la page se charger
  };
  
  useEffect(() => {
    // Défiler vers le haut de la page
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Paiement annulé - {siteConfig.name}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
            <XCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-3">Paiement annulé</h1>
          <p className="text-gray-600">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg mb-8">
          <h2 className="font-semibold text-lg mb-3">Que souhaitez-vous faire ?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ArrowLeft className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Retourner à la page précédente pour réessayer</span>
            </li>
            <li className="flex items-start">
              <Home className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Revenir à la page d'accueil</span>
            </li>
            <li className="flex items-start">
              <HelpCircle className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Me contacter pour obtenir de l'aide</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 p-5 rounded-lg mb-8">
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800">Besoin d'aide ?</h3>
              <p className="text-yellow-700 mt-1">
                Si vous avez rencontré des difficultés lors du paiement ou si vous avez des questions,
                n'hésitez pas à me contacter. Je suis là pour vous aider.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a href="javascript:history.back()">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </a>
          
          <Link to="/">
            <Button variant="outline" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Button>
          </Link>
          
          <Button 
            onClick={() => navigateWithScroll('/', 'contact')}
            className="bg-primary hover:bg-primary/90 flex items-center"
          >
            Obtenir de l'aide
            <HelpCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaiementAnnulePage;