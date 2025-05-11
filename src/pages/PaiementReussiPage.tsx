import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ModalContext } from '@/contexts/ModalContextTypes';
import { ModalProvider } from '@/contexts/ModalContext';
import ModalManager from '@/components/ui/ModalManager';

// Définition du type pour canvas-confetti
interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

type ConfettiFunction = (options: ConfettiOptions) => void;

declare const window: Window & typeof globalThis & {
  confetti?: ConfettiFunction;
};

interface PaymentDetails {
  amount: string | number;
  description: string;
  paymentMethod?: 'stripe' | 'paypal';
  paymentId?: string;
  payerName?: string;
}

const PaiementReussiPageContent = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [transactionId, setTransactionId] = useState<string>('');
  const navigate = useNavigate();
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
    // Vérifier que window est défini (pour éviter les erreurs SSR)
    if (typeof window === 'undefined') return;
    
    // Récupérer les détails du paiement depuis sessionStorage
    try {
      const details = sessionStorage.getItem('paymentDetails');
      if (details) {
        const parsedDetails = JSON.parse(details);
        setPaymentDetails(parsedDetails);
        
        // Si nous avons un ID de paiement, l'utiliser comme ID de transaction
        if (parsedDetails.paymentId) {
          setTransactionId(parsedDetails.paymentId);
        } else {
          // Sinon générer un ID aléatoire
          const generateTransactionId = () => {
            const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
            const datePart = new Date().getTime().toString().slice(-6);
            return `TRX-${randomPart}-${datePart}`;
          };
          
          setTransactionId(generateTransactionId());
        }
      } else {
        console.warn("Aucun détail de paiement trouvé en session storage");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de paiement:", error);
    }
    
    // Charger dynamiquement canvas-confetti
    const loadConfetti = async () => {
      try {
        // Si confetti est déjà présent dans window, l'utiliser
        if (window.confetti) {
          window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0D8496', '#30B4C8', '#065964', '#EAE5C7']
          });
          return;
        }
        
        // Sinon, charger le script dynamiquement
        const confettiModule = await import('canvas-confetti');
        const confetti = confettiModule.default;
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0D8496', '#30B4C8', '#065964', '#EAE5C7']
        });
      } catch (error) {
        console.error("Erreur lors du lancement des confettis:", error);
        // La fonctionnalité de confettis n'est pas essentielle, on continue sans elle
      }
    };
    
    // Petit délai pour laisser la page se charger avant de lancer les confettis
    const timer = setTimeout(() => {
      loadConfetti();
    }, 300);
    
    // Défiler vers le haut de la page
    window.scrollTo(0, 0);
    
    // Nettoyage du timer au démontage du composant
    return () => clearTimeout(timer);
  }, []);
  
  // Formatage du montant pour l'affichage
  const formatAmount = (amount: string | number | undefined) => {
    if (amount === undefined || amount === null) return '--';
    
    // Si c'est une chaîne qui contient un nombre
    if (typeof amount === 'string') {
      try {
        const num = parseFloat(amount);
        return !isNaN(num) ? `${num.toFixed(2)}` : amount;
      } catch {
        return amount;
      }
    }
    
    // Si c'est déjà un nombre
    if (typeof amount === 'number') {
      return amount.toFixed(2);
    }
    
    return String(amount);
  };
  
  // Fonction pour ouvrir la modale de contact avec les détails de la transaction
  const handleContactClick = () => {
    // Conversion du montant en nombre si c'est une chaîne
    const amountAsNumber = typeof paymentDetails?.amount === 'string' 
      ? parseFloat(paymentDetails.amount) || 0 
      : paymentDetails?.amount || 0;
    
    // Utilisation de la nouvelle propriété transactionDetails plutôt que prefilledMessage
    openModal('contact', {
      context: 'paiement_réussi',
      transactionDetails: {
        amount: amountAsNumber,
        description: paymentDetails?.description || 'Non spécifiée',
        date: new Date().toLocaleDateString('fr-FR'),
        transactionId: transactionId,
        paymentMethod: paymentDetails?.paymentMethod || 'Non spécifiée'
      }
    });
    
    console.log("Ouverture de la modale de contact avec détails de transaction");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Paiement confirmé - {siteConfig.name}</title>
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
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-3">Paiement confirmé !</h1>
            <p className="text-gray-600">
              Merci pour votre paiement. Votre transaction a bien été enregistrée.
            </p>
          </div>
        
          <div className="bg-gray-50 p-5 rounded-lg mb-8">
            <h2 className="font-semibold text-lg mb-3">Détails de la transaction</h2>
            <dl className="space-y-2">
              <div className="flex justify-between py-1">
                <dt className="text-gray-600">Montant</dt>
                <dd className="font-medium">{formatAmount(paymentDetails?.amount)} €</dd>
              </div>
              <div className="flex justify-between py-1 border-t border-gray-200">
                <dt className="text-gray-600">Description</dt>
                <dd>{paymentDetails?.description || '--'}</dd>
              </div>
              <div className="flex justify-between py-1 border-t border-gray-200">
                <dt className="text-gray-600">Date</dt>
                <dd>{new Date().toLocaleDateString('fr-FR')}</dd>
              </div>
              <div className="flex justify-between py-1 border-t border-gray-200">
                <dt className="text-gray-600">N° de transaction</dt>
                <dd className="font-mono text-sm">{transactionId}</dd>
              </div>
              <div className="flex justify-between py-1 border-t border-gray-200">
                <dt className="text-gray-600">Méthode de paiement</dt>
                <dd className="capitalize">{paymentDetails?.paymentMethod || '--'}</dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg mb-8">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800">Prochaines étapes</h3>
                <p className="text-blue-700 mt-1">
                  Vous allez recevoir un email de confirmation dans les prochaines minutes.
                  {paymentDetails?.description?.toLowerCase().includes('consultation') && 
                    " Je vous contacterai prochainement pour planifier notre rendez-vous."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/">
              <Button variant="outline" className="flex items-center w-full sm:w-auto justify-center">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <Button 
              onClick={handleContactClick}
              className="bg-primary hover:bg-primary/90 flex items-center w-full sm:w-auto justify-center"
            >
              Me contacter
              <ArrowRight className="ml-2 h-4 w-4" />
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
const PaiementReussiPage = () => {
  return (
    <ModalProvider>
      <PaiementReussiPageContent />
      <ModalManager />
    </ModalProvider>
  );
};

export default PaiementReussiPage;