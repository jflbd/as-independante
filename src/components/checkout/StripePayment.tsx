import React, { useState, useEffect } from 'react';
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

// Interface pour les données client
interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
}

// Composant formulaire de carte bancaire
const StripeCardForm = ({ onGoBack, amount, description, onPaymentComplete }: {
  onGoBack?: () => void;
  amount: number;
  description: string;
  onPaymentComplete: (paymentId: string, customerData: CustomerData) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: ''
  });
  const { toast } = useToast();

  // Gestion des changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
  };

  // Créer une intention de paiement au chargement du composant
  useEffect(() => {
    if (amount <= 0) return;
    
    const createPaymentIntent = async () => {
      try {
        // Appeler notre fonction serverless pour créer l'intention de paiement
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            description,
            metadata: {
              service: description,
              customAmount: amount.toString()
            },
            // Nous n'envoyons pas les données client ici car elles ne sont pas encore remplies
            // Elles seront envoyées lors de la confirmation du paiement
          }),
        });

        // Amélioration de la gestion des réponses non-OK
        if (!response.ok) {
          // Lire d'abord la réponse comme texte pour éviter les erreurs de parsing JSON
          const errorText = await response.text();
          let errorData;
          
          try {
            // Essayer de parser le texte en JSON si possible
            errorData = JSON.parse(errorText);
            throw new Error(errorData.error || errorData.message || `Erreur ${response.status}: ${response.statusText}`);
          } catch (parseError) {
            // Si ce n'est pas un JSON valide, utiliser le texte brut ou le statut HTTP
            console.error('Erreur de parsing JSON:', parseError);
            throw new Error(errorText || `Erreur du serveur (${response.status}): ${response.statusText}`);
          }
        }

        // Amélioration de la gestion du parsing JSON réussi
        let data;
        try {
          const responseText = await response.text();
          data = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('Erreur de parsing JSON dans la réponse:', parseError);
          throw new Error('Format de réponse invalide du serveur');
        }

        if (!data || !data.clientSecret) {
          throw new Error('La réponse du serveur ne contient pas les informations nécessaires');
        }

        console.log('PaymentIntent créé avec succès', data.paymentIntentId || 'ID non disponible');
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Erreur complète:', error);
        setError((error as Error).message);
        toast({
          title: "Erreur de configuration",
          description: "Impossible d'initialiser le paiement. Veuillez réessayer ultérieurement.",
          variant: "destructive",
        });
      }
    };

    createPaymentIntent();
  }, [amount, description, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation des champs obligatoires
    if (!customerData.firstName || !customerData.lastName || !customerData.email) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!stripe || !elements || !clientSecret) {
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
    
    try {
      // Confirmer le paiement avec Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerData.firstName} ${customerData.lastName}`,
            email: customerData.email
          }
        }
      });
      
      if (error) {
        if (error.code === 'card_declined' || error.code === 'incorrect_cvc' || error.code === 'expired_card') {
          // Stocker les détails de l'erreur en sessionStorage pour la page d'erreur
          sessionStorage.setItem('paymentError', JSON.stringify({
            code: error.code,
            message: error.message
          }));
          
          // Rediriger vers la page d'échec de paiement
          window.location.href = '/paiement-echec';
          return;
        } else {
          throw error;
        }
      }

      // Si nous arrivons ici, le paiement a réussi
      toast({
        title: "Paiement accepté",
        description: "Votre paiement a été traité avec succès.",
      });

      // Utiliser l'ID de paiement réel de Stripe et transmettre les données client
      onPaymentComplete(paymentIntent.id, customerData);
      
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
        {/* Informations client */}
        <div className="space-y-4">
          <h3 className="text-base font-medium">Vos coordonnées</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={customerData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={customerData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-medium text-gray-700">
            Détails de la carte
          </label>
          <div className="border border-gray-300 rounded-md p-4 mt-2">
            <CardElement options={cardStyle} />
          </div>
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
      
      <div className="flex flex-col md:flex-row justify-center gap-4 pt-2">
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
          disabled={isProcessing || !stripe || !clientSecret}
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
  onPaymentComplete?: (paymentId: string, customerData: CustomerData) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({ onGoBack, paymentDetails, onPaymentComplete }) => {
  // Fonction de gestion du paiement complété
  const handlePaymentComplete = (paymentId: string, customerData: CustomerData) => {
    // Si un gestionnaire de paiement complété est fourni, on l'utilise
    if (onPaymentComplete) {
      onPaymentComplete(paymentId, customerData);
    } else {
      // Sinon, on stocke les informations de paiement pour la page de confirmation
      sessionStorage.setItem(
        'paymentDetails',
        JSON.stringify({
          ...paymentDetails,
          paymentMethod: 'stripe',
          paymentId,
          customer: customerData
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
            description={paymentDetails.description}
            onPaymentComplete={handlePaymentComplete} 
          />
        </Elements>
      </CardContent>
    </Card>
  );
};

export default StripePayment;