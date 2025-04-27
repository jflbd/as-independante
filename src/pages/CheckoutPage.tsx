import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import StripePayment from '@/components/checkout/StripePayment';
import PayPalCheckoutForm from '@/components/checkout/PayPalCheckoutForm';
import { stripeConfig } from '@/config/stripeConfig';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';

// Type pour les détails de paiement
interface PaymentDetails {
  amount: string | number;
  description: string;
  paymentMethod?: 'stripe' | 'paypal';
}

// Initialisation de Stripe
const stripePromise = loadStripe(stripeConfig.publishableKey);

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('paypal');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

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
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de paiement:", error);
      }
    }
    
    // Défiler vers le haut de la page
    window.scrollTo(0, 0);
  }, [location]);

  // Mettre à jour sessionStorage quand la méthode de paiement change
  useEffect(() => {
    if (paymentDetails) {
      sessionStorage.setItem(
        'paymentDetails',
        JSON.stringify({
          ...paymentDetails,
          paymentMethod
        })
      );
    }
  }, [paymentMethod, paymentDetails]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Helmet>
        <title>Paiement - {siteConfig.name}</title>
        <meta name="description" content="Finalisez votre paiement en toute sécurité" />
      </Helmet>
      
      <h1 className="text-3xl font-serif font-bold mb-6 text-center">Finaliser votre paiement</h1>
      
      {paymentDetails ? (
        <div className="mb-8 text-center">
          <p className="text-xl font-medium">Montant : {paymentDetails.amount}€</p>
          <p className="text-gray-600">{paymentDetails.description}</p>
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
                amount: typeof paymentDetails.amount === 'string' 
                  ? parseFloat(paymentDetails.amount) 
                  : paymentDetails.amount,
                description: paymentDetails.description
              }} />
            </Elements>
          ) : (
            <PayPalCheckoutForm paymentDetails={{
              amount: paymentDetails.amount.toString(),
              description: paymentDetails.description
            }} />
          )}

          {/* Bouton d'annulation */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir annuler votre paiement ?")) {
                  // Optionnellement, effacer les détails de paiement
                  sessionStorage.removeItem('paymentDetails');
                  // Rediriger vers la page d'accueil ou une page d'annulation
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
            nous contacter à {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;