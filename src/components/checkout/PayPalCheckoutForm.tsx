import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { siteConfig } from '@/config/siteConfig';

interface PayPalCheckoutFormProps {
  paymentDetails: {
    amount: string;
    description: string;
  };
}

const PayPalCheckoutForm: React.FC<PayPalCheckoutFormProps> = ({ paymentDetails }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPayPalScriptLoaded, setIsPayPalScriptLoaded] = useState(false);

  // Chargement du script PayPal
  useEffect(() => {
    const loadPayPalScript = async () => {
      try {
        // Vérifie si le script PayPal est déjà chargé
        if (window.paypal) {
          setIsPayPalScriptLoaded(true);
          return;
        }

        const script = document.createElement('script');
        // Remplacer par votre client ID PayPal
        const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'votre_client_id_paypal';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&locale=fr_FR`;
        script.async = true;
        
        script.onload = () => {
          setIsPayPalScriptLoaded(true);
        };
        
        document.body.appendChild(script);
        
        return () => {
          // Nettoyage si nécessaire
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      } catch (error) {
        console.error('Erreur lors du chargement du script PayPal:', error);
      }
    };
    
    loadPayPalScript();
  }, []);

  // Initialisation du bouton PayPal après chargement du script
  useEffect(() => {
    const renderPayPalButton = () => {
      if (!isPayPalScriptLoaded || !window.paypal || !paymentDetails) return;
      
      // Nettoyer le conteneur pour éviter des rendus multiples
      const paypalContainer = document.getElementById('paypal-button-container');
      if (paypalContainer) {
        paypalContainer.innerHTML = '';
        
        try {
          window.paypal.Buttons({
            style: {
              color: 'blue',
              shape: 'rect',
              label: 'pay',
              height: 45
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: paymentDetails.amount,
                    currency_code: 'EUR'
                  },
                  description: paymentDetails.description
                }]
              });
            },
            onApprove: async (data, actions) => {
              setIsLoading(true);
              
              try {
                // Capture l'ordre (la transaction)
                const orderDetails = await actions.order.capture();
                
                // Enregistrement des détails de la transaction dans sessionStorage
                sessionStorage.setItem(
                  'paymentDetails',
                  JSON.stringify({
                    ...paymentDetails,
                    paymentMethod: 'paypal',
                    paymentId: orderDetails.id || data.orderID,
                    payerName: orderDetails.payer?.name?.given_name || ''
                  })
                );
                
                toast({
                  title: "Paiement réussi !",
                  description: "Votre transaction a été approuvée.",
                  variant: "default",
                });
                
                // Redirection vers la page de confirmation
                navigate('/paiement-reussi');
              } catch (error) {
                console.error('Erreur lors de la capture du paiement:', error);
                toast({
                  title: "Erreur de paiement",
                  description: "Un problème est survenu lors du traitement de votre paiement.",
                  variant: "destructive",
                });
              } finally {
                setIsLoading(false);
              }
            },
            onCancel: () => {
              toast({
                title: "Paiement annulé",
                description: "Vous avez annulé le processus de paiement.",
                variant: "default",
              });
            },
            onError: (err) => {
              console.error('Erreur PayPal:', err);
              toast({
                title: "Erreur de paiement",
                description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
                variant: "destructive",
              });
            }
          }).render('#paypal-button-container');
        } catch (error) {
          console.error('Erreur lors du rendu du bouton PayPal:', error);
        }
      }
    };
    
    renderPayPalButton();
  }, [isPayPalScriptLoaded, paymentDetails, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Paiement via PayPal</h2>
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin h-10 w-10 text-primary" />
        </div>
      ) : (
        <>
          <div id="paypal-button-container" className="mb-6">
            {!isPayPalScriptLoaded && (
              <div className="flex justify-center p-8">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-600 mb-4 text-center">
            PayPal vous permet de payer avec votre compte PayPal ou par carte bancaire sans avoir à créer de compte.
          </div>
          
          <div className="flex items-center bg-blue-50 p-3 rounded-md text-sm">
            <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-blue-700">
              Vos données de paiement sont sécurisées et protégées par PayPal.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PayPalCheckoutForm;