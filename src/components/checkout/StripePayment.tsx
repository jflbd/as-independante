import React, { useState } from 'react';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { stripeConfig, testCards } from '@/config/stripeConfig';
import { ArrowLeft, ChevronRight, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

// Initialiser Stripe avec la clé publique
const stripePromise = loadStripe(stripeConfig.publishableKey);

// Styles pour le formulaire de carte
const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

// Type d'erreur personnalisé pour les erreurs Stripe
interface StripeError {
  type?: string;
  message: string;
  code?: string;
}

// Composant formulaire de carte bancaire
const StripeCardForm = ({ onGoBack, amount, onPaymentComplete }: {
  onGoBack?: () => void;
  amount: number;
  onPaymentComplete: (paymentId: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Impossible de traiter le paiement");
      setIsProcessing(false);
      return;
    }
    
    // Simulation d'un paiement pour le mode test
    if (stripeConfig.testMode) {
      try {
        // Simuler une requête réseau
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Obtenir les détails de la carte pour vérifier le numéro
        const { token, error: tokenError } = await stripe.createToken(cardElement);
        
        if (tokenError) {
          throw tokenError;
        }
        
        // Vérifier le numéro de carte pour simuler différents comportements
        const cardNumber = token?.card?.last4;
        
        // Carte d'échec: 4000 0000 0000 0002 (last4: 0002)
        if (cardNumber === '0002') {
          // Stocker les détails de l'erreur en sessionStorage pour la page d'erreur
          sessionStorage.setItem('paymentError', JSON.stringify({
            code: 'card_declined',
            message: "Votre carte a été déclinée. Veuillez utiliser une carte différente."
          }));
          
          // Rediriger vers la page d'échec de paiement
          window.location.href = '/paiement-echec';
          return;
        }
        
        // Carte nécessitant une authentification: 4000 0025 0000 3155 (last4: 3155)
        if (cardNumber === '3155') {
          // Simuler une redirection vers une page d'authentification 3D Secure
          toast({
            title: "Authentification requise",
            description: "Cette carte nécessite une authentification supplémentaire. Dans un environnement réel, vous seriez redirigé vers la page d'authentification de votre banque.",
          });
          
          // Stocker les détails de l'erreur d'authentification en sessionStorage
          sessionStorage.setItem('paymentError', JSON.stringify({
            code: 'authentication_required',
            message: "L'authentification a échoué ou a été annulée par l'utilisateur."
          }));
          
          // Rediriger vers la page d'échec de paiement après un court délai (pour simuler le processus d'authentification)
          setTimeout(() => {
            window.location.href = '/paiement-echec';
          }, 2000);
          return;
        }

        // Pour toutes les autres cartes (comme 4242 4242 4242 4242), simuler un succès
        const mockPaymentId = `test_payment_${Date.now()}`;
        
        toast({
          title: "Paiement accepté",
          description: "Votre paiement a été traité avec succès.",
        });

        onPaymentComplete(mockPaymentId);
      } catch (error) {
        const stripeError = error as StripeError;
        console.error('Erreur de paiement:', stripeError);
        setError(stripeError.message || "Erreur lors du traitement de votre paiement. Veuillez réessayer.");
        toast({
          title: "Erreur de paiement",
          description: stripeError.message || "Une erreur est survenue lors du traitement de votre paiement.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // En production, ce code serait utilisé
    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Problème avec le formulaire de carte");
      }

      // Création d'un token de paiement
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw error;
      }

      // Normalement, ici vous enverriez ce paymentMethod.id à votre serveur backend
      // pour finaliser le paiement côté serveur
      
      // Simuler une confirmation de paiement réussie
      toast({
        title: "Paiement accepté",
        description: "Votre paiement a été traité avec succès.",
      });

      onPaymentComplete(paymentMethod.id);
    } catch (error) {
      const stripeError = error as StripeError;
      console.error('Erreur de paiement:', stripeError);
      setError(stripeError.message || "Erreur lors du traitement de votre paiement. Veuillez réessayer.");
      toast({
        title: "Erreur de paiement",
        description: stripeError.message || "Une erreur est survenue lors du traitement de votre paiement.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Détails de la carte
        </label>
        <div className="border border-gray-300 rounded-md p-4">
          <CardElement options={cardStyle} />
        </div>
        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}
        
        {stripeConfig.testMode && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <h4 className="text-sm font-medium text-yellow-800">Mode Test</h4>
            <p className="text-xs text-yellow-700 mt-1">
              Utilisez l'une des cartes de test suivantes :
            </p>
            <ul className="text-xs text-yellow-700 mt-2 space-y-1">
              {testCards.map((card, index) => (
                <li key={index}>
                  <span className="font-medium">{card.name}</span>: {card.number} (Exp: {card.expiry}, CVC: {card.cvc})
                </li>
              ))}
            </ul>
            <p className="text-xs text-yellow-700 mt-2">
              Utiliser les dates d'expiration et CVC indiqués ci-dessus
            </p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-2">
        {onGoBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onGoBack}
            className="flex items-center"
            disabled={isProcessing}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Modifier mes informations
          </Button>
        )}
        <Button 
          type="submit" 
          className="bg-primary hover:bg-primary/90"
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
              Traitement en cours...
            </>
          ) : (
            <>
              <span>Payer {amount.toFixed(2).replace('.', ',')}€</span>
              <Lock className="ml-2 h-4 w-4" />
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

// Composant conteneur
interface StripePaymentProps {
  onGoBack?: () => void;
  paymentDetails: {
    amount: number;
    description: string;
  };
  onPaymentComplete?: (paymentId: string) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({ onGoBack, paymentDetails, onPaymentComplete }) => {
  // Fonction de gestion du paiement complété
  const handlePaymentComplete = (paymentId: string) => {
    // Si un gestionnaire de paiement complété est fourni, on l'utilise
    if (onPaymentComplete) {
      onPaymentComplete(paymentId);
    } else {
      // Sinon, on stocke les informations de paiement pour la page de confirmation
      sessionStorage.setItem(
        'paymentDetails',
        JSON.stringify({
          ...paymentDetails,
          paymentMethod: 'stripe',
          paymentId
        })
      );
      
      // Redirection vers la page de confirmation de paiement
      window.location.href = '/paiement-reussi';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Paiement par carte bancaire</CardTitle>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise}>
          <StripeCardForm 
            onGoBack={onGoBack} 
            amount={paymentDetails.amount} 
            onPaymentComplete={handlePaymentComplete} 
          />
        </Elements>
      </CardContent>
    </Card>
  );
};

export default StripePayment;