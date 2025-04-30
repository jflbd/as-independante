import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, Home, HelpCircle, ArrowUpLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { ModalContext, ModalProvider } from '@/contexts/ModalContext';
import ModalManager from '@/components/ui/ModalManager';
import { OptimizedImage } from '@/components/OptimizedImage';

// Interface pour les données contextuelles d'annulation
interface CancelledPaymentContext {
  productType?: string;
  description?: string;
}

const PaiementAnnulePageContent = () => {
  const navigate = useNavigate();
  const [fromEbookPage, setFromEbookPage] = useState<boolean>(false);
  const { openModal } = useContext(ModalContext);
  
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
    console.log("Ouverture de la modale pour paiement annulé");
    openModal("contact", {
      context: "payment_cancelled",
      transactionDetails: {
        description: 'Paiement annulé',
        date: new Date().toLocaleDateString('fr-FR'),
        paymentMethod: 'Non spécifiée'
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Paiement annulé - {siteConfig.name}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      
      {/* Header avec logo */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 mb-6 shadow-sm">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-primary/10 transition-all duration-300 group-hover:shadow-md">
              <OptimizedImage
                src={siteConfig.ui.logo}
                alt={siteConfig.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-3 hidden sm:block">
              <h3 className="text-lg font-serif font-bold text-primary">{siteConfig.name}</h3>
              <p className="text-xs text-gray-500">Votre accompagnement social</p>
            </div>
          </Link>
          
          <div className="flex items-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-primary flex items-center transition-colors">
              <Home size={16} className="mr-1" /> 
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 flex-grow">
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
      
      {/* Footer minimal */}
      <footer className="bg-white border-t border-gray-100 py-4 text-center text-xs text-gray-500 mt-auto">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name} - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

// Composant wrapper qui fournit le contexte de modal
const PaiementAnnulePage = () => {
  return (
    <ModalProvider>
      <PaiementAnnulePageContent />
      <ModalManager />
    </ModalProvider>
  );
};

export default PaiementAnnulePage;