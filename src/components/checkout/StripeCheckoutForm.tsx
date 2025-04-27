import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { stripeConfig } from '@/config/stripeConfig';
import { toast } from '@/hooks/use-toast';

interface StripeCheckoutFormProps {
  paymentDetails: {
    amount: number;
    description: string;
  };
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ paymentDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier que les détails de paiement sont valides
    if (!paymentDetails || !paymentDetails.amount) {
      setError("Détails de paiement manquants");
    }
  }, [paymentDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe n'est pas encore chargé
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError("Formulaire de carte non disponible");
      return;
    }
    
    try {
      setLoading(true);
      
      // Mode test : simuler un paiement sans backend
      if (stripeConfig.testMode) {
        // Obtenir les détails de la carte pour identifier les scénarios de test
        const { token, error: tokenError } = await stripe.createToken(cardElement);
        
        if (tokenError) {
          throw tokenError;
        }
        
        // Simuler différents comportements en fonction du numéro de carte
        const cardNumber = token?.card?.last4;
        
        // Carte d'échec: 4000 0000 0000 0002 (last4: 0002)
        if (cardNumber === '0002') {
          throw new Error("Votre carte a été déclinée. Veuillez utiliser une carte différente.");
        }
        
        // Carte nécessitant une authentification: 4000 0025 0000 3155 (last4: 3155)
        if (cardNumber === '3155') {
          // Simuler un délai pour l'authentification
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Stocker les détails pour la redirection
          sessionStorage.setItem('paymentDetails', JSON.stringify({
            ...paymentDetails,
            paymentMethod: 'stripe',
            paymentId: `auth_${Date.now()}`
          }));
          
          // Rediriger vers la page d'authentification (qui n'existe pas, donc simuler un échec)
          sessionStorage.setItem('paymentError', JSON.stringify({
            code: 'authentication_required',
            message: "L'authentification a échoué ou a été annulée par l'utilisateur."
          }));
          
          navigate('/paiement-echec');
          return;
        }
        
        // Pour les autres cartes (comme 4242 4242 4242 4242), simuler un succès
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Stocker les informations de paiement pour la page de confirmation
        sessionStorage.setItem('paymentDetails', JSON.stringify({
          ...paymentDetails,
          paymentMethod: 'stripe',
          paymentId: `pm_${Date.now()}`
        }));
        
        toast({
          title: "Paiement accepté",
          description: "Votre paiement a été traité avec succès.",
        });
        
        // Rediriger vers la page de confirmation
        navigate('/paiement-reussi');
        return;
      }
      
      // Mode production : appel à l'API
      // Note: Cette partie nécessite un backend pour fonctionner
      // Vous devrez implémenter cette API ou utiliser Stripe Checkout à la place
      toast({
        title: "Mode production",
        description: "Cette fonctionnalité nécessite un backend pour créer une intention de paiement.",
        variant: "destructive",
      });
      
      setError("La fonctionnalité de paiement en direct nécessite une configuration backend.");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
      
      toast({
        title: "Erreur de paiement",
        description: err instanceof Error ? err.message : "Une erreur est survenue lors du traitement de votre paiement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#9e2146',
      },
    },
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Paiement par carte bancaire</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Détails de la carte
          </label>
          <div className="p-4 border border-gray-300 rounded-md">
            <CardElement options={cardElementOptions} />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Cartes acceptées : Visa, Mastercard, American Express
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center bg-blue-50 p-3 rounded-md text-sm">
            <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-blue-700">
              Vos données de paiement sont sécurisées et cryptées par Stripe.
            </p>
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={loading || !stripe}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Traitement...
            </>
          ) : (
            `Payer ${paymentDetails?.amount || 0}€`
          )}
        </Button>
        
        {stripeConfig.testMode && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
            <h4 className="text-sm font-medium text-yellow-800">Mode Test</h4>
            <p className="text-xs text-yellow-700 mt-1">
              Utilisez les cartes de test suivantes :
            </p>
            <ul className="text-xs text-yellow-700 mt-1 space-y-1">
              <li>Succès : 4242 4242 4242 4242</li>
              <li>Échec : 4000 0000 0000 0002</li>
              <li>Authentification : 4000 0025 0000 3155</li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default StripeCheckoutForm;