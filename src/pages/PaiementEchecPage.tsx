import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';

interface ErrorDetails {
  code?: string;
  message: string;
  type?: string;
}

const PaiementEchecPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null);
  
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
    
    // Récupérer les détails de l'erreur s'ils existent
    try {
      const errorData = sessionStorage.getItem('paymentError');
      if (errorData) {
        setErrorDetails(JSON.parse(errorData));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails d'erreur:", error);
    }
  }, []);
  
  // Message en fonction du type d'erreur
  const getErrorMessage = () => {
    if (!errorDetails) {
      return "Une erreur est survenue lors du traitement de votre paiement.";
    }
    
    // Vérifier si c'est une erreur d'authentification
    if (errorDetails.code === 'authentication_required' || 
        errorDetails.message.toLowerCase().includes('authentification')) {
      return "L'authentification nécessaire pour valider votre paiement a échoué ou a été annulée.";
    }
    
    // Vérifier si c'est une carte déclinée
    if (errorDetails.code === 'card_declined' || 
        errorDetails.message.toLowerCase().includes('déclinée')) {
      return "Votre carte a été déclinée par votre banque. Veuillez vérifier vos informations ou utiliser une autre carte.";
    }
    
    // Erreur générique
    return errorDetails.message || "Une erreur est survenue lors du traitement de votre paiement.";
  };
  
  // Suggestion en fonction du type d'erreur
  const getErrorSuggestion = () => {
    if (!errorDetails) {
      return "Veuillez réessayer ou utiliser une autre méthode de paiement.";
    }
    
    // Vérifier si c'est une erreur d'authentification
    if (errorDetails.code === 'authentication_required' || 
        errorDetails.message.toLowerCase().includes('authentification')) {
      return "Veuillez vous assurer que vous avez complété le processus d'authentification requis par votre banque.";
    }
    
    // Vérifier si c'est une carte déclinée
    if (errorDetails.code === 'card_declined' || 
        errorDetails.message.toLowerCase().includes('déclinée')) {
      return "Vérifiez les fonds disponibles sur votre compte ou contactez votre banque pour plus d'informations.";
    }
    
    // Erreur générique
    return "Veuillez vérifier vos informations de paiement et réessayer.";
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Erreur de paiement - {siteConfig.name}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-3">Erreur de paiement</h1>
          <p className="text-gray-600">
            {getErrorMessage()}
          </p>
          <p className="text-gray-600 mt-2">
            {getErrorSuggestion()}
          </p>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg mb-8">
          <h2 className="font-semibold text-lg mb-3">Que souhaitez-vous faire ?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <RefreshCw className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Réessayer le paiement</span>
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
                Si vous avez rencontré des difficultés lors du paiement ou si vous avez des questions sur les alternatives de paiement,
                n'hésitez pas à me contacter. Je suis là pour vous aider.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/checkout">
            <Button variant="outline" className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              Réessayer le paiement
            </Button>
          </Link>
          
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

export default PaiementEchecPage;