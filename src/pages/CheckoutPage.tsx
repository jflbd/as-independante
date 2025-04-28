import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Euro } from "lucide-react";
import StripePayment from '@/components/checkout/StripePayment';
import PayPalCheckoutForm from '@/components/checkout/PayPalCheckoutForm';
import { stripeConfig } from '@/config/stripeConfig';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Type pour les détails de paiement
interface PaymentDetails {
  amount: string | number;
  description: string;
  paymentMethod?: 'stripe' | 'paypal';
  customAmount?: boolean;
  productType?: string; // Ajout du type de produit
}

// Initialisation de Stripe
const stripePromise = loadStripe(stripeConfig.publishableKey);

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('paypal');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [isEbookPurchase, setIsEbookPurchase] = useState<boolean>(false); // État pour suivre si c'est un achat d'ebook

  useEffect(() => {
    // Récupérer la méthode de paiement depuis l'URL
    const params = new URLSearchParams(location.search);
    const method = params.get('method');
    if (method === 'stripe') {
      setPaymentMethod('stripe');
    } else {
      setPaymentMethod('paypal');
    }

    // Récupérer les détails du paiement depuis sessionStorage
    const details = sessionStorage.getItem('paymentDetails');
    if (details) {
      try {
        const parsedDetails = JSON.parse(details);
        
        // Assurons-nous que le montant est au format correct selon le mode de paiement
        setPaymentDetails({
          ...parsedDetails,
          // Pour PayPal, le montant doit être une chaîne
          amount: parsedDetails.amount?.toString() || '0'
        });
        
        // Initialiser le montant personnalisé avec le montant actuel
        setCustomAmount(parsedDetails.amount?.toString() || '0');
        
        // Vérifier si l'option montant personnalisé était activée
        // Ne pas activer cette option si c'est un achat d'ebook
        const isEbookProduct = parsedDetails.productType === 'ebook';
        setIsEbookPurchase(isEbookProduct);
        
        // Si c'est un ebook, on force à false l'option de montant personnalisé
        setIsCustomAmount(isEbookProduct ? false : (parsedDetails.customAmount || false));
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de paiement:", error);
      }
    }
    
    // Défiler vers le haut de la page
    window.scrollTo(0, 0);
  }, [location]);

  // Mettre à jour sessionStorage quand les détails changent
  useEffect(() => {
    if (paymentDetails) {
      const updatedDetails = {
        ...paymentDetails,
        paymentMethod,
        // Si c'est un ebook, on utilise toujours le montant original
        amount: isEbookPurchase ? paymentDetails.amount : (isCustomAmount ? customAmount : paymentDetails.amount),
        // Ne pas permettre de montant personnalisé pour les ebooks
        customAmount: isEbookPurchase ? false : isCustomAmount
      };
      
      sessionStorage.setItem('paymentDetails', JSON.stringify(updatedDetails));
    }
  }, [paymentMethod, paymentDetails, customAmount, isCustomAmount, isEbookPurchase]);
  
  // Gérer le changement de montant
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // N'autoriser que les nombres avec au maximum 2 décimales
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
    }
  };
  
  // Toggle pour activer/désactiver le montant personnalisé
  const toggleCustomAmount = () => {
    // Empêcher la modification si c'est un achat d'ebook
    if (!isEbookPurchase) {
      setIsCustomAmount(!isCustomAmount);
    }
  };
  
  // Calculer le montant final à utiliser
  const finalAmount = isEbookPurchase ? paymentDetails?.amount : (isCustomAmount ? customAmount : (paymentDetails?.amount || 0));

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Helmet>
        <title>Paiement - {siteConfig.name}</title>
        <meta name="description" content="Finalisez votre paiement en toute sécurité" />
      </Helmet>
      
      <h1 className="text-3xl font-serif font-bold mb-6 text-center">Finaliser votre paiement</h1>
      
      {paymentDetails ? (
        <div className="mb-8 text-center">
          {!isCustomAmount ? (
            <>
              <p className="text-xl font-medium">Montant : {paymentDetails.amount}€</p>
              {/* Ne pas afficher le bouton de modification pour les ebooks */}
              {!isEbookPurchase && (
                <button 
                  onClick={toggleCustomAmount}
                  className="text-primary hover:text-primary/80 text-sm underline mt-1"
                >
                  Modifier le montant
                </button>
              )}
            </>
          ) : (
            <div className="max-w-xs mx-auto">
              <Label htmlFor="custom-amount" className="text-lg font-medium mb-2 block">
                Montant personnalisé
              </Label>
              <div className="relative">
                <Input
                  id="custom-amount"
                  type="text"
                  value={customAmount}
                  onChange={handleAmountChange}
                  className="pl-8 text-lg font-medium"
                  placeholder="0.00"
                />
                <Euro className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <button 
                onClick={toggleCustomAmount}
                className="text-gray-500 hover:text-gray-700 text-sm underline mt-2"
              >
                Revenir au montant initial
              </button>
            </div>
          )}
          <p className="text-gray-600 mt-2">{paymentDetails.description}</p>
        </div>
      ) : (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Détails de paiement manquants</AlertTitle>
          <AlertDescription>
            Aucun détail de paiement trouvé. Veuillez retourner à la page d'accueil et réessayer.
          </AlertDescription>
        </Alert>
      )}

      {paymentDetails && (
        <>
          <div className="flex justify-center mb-8 gap-4">
            <button
              className={`px-6 py-3 rounded-lg transition-all flex items-center ${
                paymentMethod === 'paypal' 
                  ? 'bg-[#0070ba] text-white font-medium shadow-md' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setPaymentMethod('paypal')}
            >
              <img 
                src="/assets/card/paypal-logo.svg" 
                alt="PayPal" 
                className={`h-5 mr-2 ${paymentMethod !== 'paypal' ? 'opacity-80' : ''}`} 
              />
              Payer avec PayPal
            </button>
            <button
              className={`px-6 py-3 rounded-lg transition-all ${
                paymentMethod === 'stripe' 
                  ? 'bg-[#6772e5] text-white font-medium shadow-md' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setPaymentMethod('stripe')}
            >
              Payer par carte
            </button>
          </div>

          {paymentMethod === 'stripe' ? (
            <Elements stripe={stripePromise} options={{
              appearance: stripeConfig.appearance,
              locale: 'fr',
            }}>
              <StripePayment paymentDetails={{
                amount: typeof finalAmount === 'string' 
                  ? parseFloat(finalAmount) || 0
                  : finalAmount,
                description: paymentDetails.description
              }} />
            </Elements>
          ) : (
            <PayPalCheckoutForm paymentDetails={{
              amount: finalAmount.toString(),
              description: paymentDetails.description
            }} />
          )}

          {/* Bouton d'annulation */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir annuler votre paiement ?")) {
                  // Sauvegarder les informations sur le type de produit pour la page d'annulation
                  if (paymentDetails && paymentDetails.productType) {
                    // Conserver seulement les informations nécessaires pour le retour contextuel
                    const contextInfo = {
                      productType: paymentDetails.productType,
                      description: paymentDetails.description
                    };
                    sessionStorage.setItem('cancelledPaymentContext', JSON.stringify(contextInfo));
                  }
                  // Rediriger vers la page d'annulation
                  window.location.href = '/paiement-annule';
                }
              }}
              className="text-gray-600 hover:text-red-600 underline text-sm font-medium transition-colors"
            >
              Annuler mon paiement
            </button>
          </div>
        </>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600 text-center">
          <p>En procédant au paiement, vous acceptez nos conditions générales de vente.</p>
          <p className="mt-2">
            Pour toute question concernant votre paiement, vous pouvez 
            me contacter à {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;