import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, Home, HelpCircle, ArrowUpLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { useModal } from '@/hooks/use-modal';

// Interface pour les données contextuelles d'annulation
interface CancelledPaymentContext {
  productType?: string;
  description?: string;
}

const PaiementAnnulePage = () => {
  const navigate = useNavigate();
  const [fromEbookPage, setFromEbookPage] = useState<boolean>(false);
  const { openModal } = useModal();
  
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
    
    try {
      // D'abord essayer de récupérer les informations d'annulation
      const cancelContext = sessionStorage.getItem('cancelledPaymentContext');
      if (cancelContext) {
        const details = JSON.parse(cancelContext) as CancelledPaymentContext;
        setFromEbookPage(details.productType === 'ebook');
        // Nettoyer après utilisation
        sessionStorage.removeItem('cancelledPaymentContext');
        return;
      }
      
      // Si pas d'informations d'annulation, essayer les détails de paiement normaux
      const paymentDetails = sessionStorage.getItem('paymentDetails');
      if (paymentDetails) {
        const details = JSON.parse(paymentDetails);
        setFromEbookPage(details.productType === 'ebook');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails:", error);
    }
  }, []);
  
  // Fonction pour gérer le retour intelligent
  const handleGoBack = () => {
    if (fromEbookPage) {
      navigate('/ebook');
    } else {
      navigate('/');
    }
  };
  
  // Fonction pour ouvrir la modal de contact
  const handleOpenContactModal = () => {
    openModal("contact", {
      context: "payment_cancelled", // Contexte pour identifier la source du contact
    });
  };
  
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
              <ArrowUpLeft className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Retourner à {fromEbookPage ? "la présentation de l'ebook" : "la page d'accueil"}</span>
            </li>
            <li className="flex items-start">
              <Home className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <span>Aller à la page d'accueil</span>
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
        
        <div className="flex flex-wrap gap-2 justify-center mt-8 mx-auto max-w-lg">
          <Button 
            variant="outline" 
            className="flex items-center text-sm"
            onClick={handleGoBack}
          >
            <ArrowUpLeft className="mr-1 h-4 w-4" />
            {fromEbookPage ? "Retour à l'ebook" : "Retour"}
          </Button>
          
          <Link to="/">
            <Button variant="outline" className="flex items-center text-sm">
              <Home className="mr-1 h-4 w-4" />
              Accueil
            </Button>
          </Link>
          
          <Button 
            onClick={handleOpenContactModal}
            className="bg-primary hover:bg-primary/90 flex items-center text-sm"
          >
            <HelpCircle className="mr-1 h-4 w-4" />
            Aide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaiementAnnulePage;