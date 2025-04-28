import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { siteConfig } from '@/config/siteConfig';
import { paypalConfig } from '@/config/paypalConfig';
import { RefreshCw } from 'lucide-react';

// Types précis pour l'API PayPal
interface PayPalOrderActions {
  create: (orderData: {
    purchase_units: Array<{
      amount: {
        value: string;
        currency_code: string;
      };
      description: string;
    }>;
  }) => Promise<string>;
}

interface PayPalOrderCapture {
  id?: string;
  status?: string;
  payer?: {
    name?: {
      given_name?: string;
      surname?: string;
    };
    email_address?: string;
  };
}

interface PayPalCaptureActions {
  order: {
    capture: () => Promise<PayPalOrderCapture>;
  };
}

interface PayPalOrderData {
  orderID: string;
  [key: string]: unknown;
}

interface PayPalButtonsOptions {
  style?: {
    color?: string;
    shape?: string;
    label?: string;
    height?: number;
  };
  createOrder?: (data: unknown, actions: PayPalOrderActions) => Promise<string>;
  onApprove?: (data: PayPalOrderData, actions: PayPalCaptureActions) => Promise<void>;
  onCancel?: () => void;
  onError?: (err: Error) => void;
}

interface PayPalButtons {
  render: (selector: string) => void;
}

// Correction de la déclaration globale pour éviter les conflits
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPal.ButtonsConfig) => {
        render: (selector: string) => void;
      };
    };
  }
}

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
  const [scriptError, setScriptError] = useState<string | null>(null);
  const paypalScriptRef = useRef<HTMLScriptElement | null>(null);
  const paymentAttemptCountRef = useRef<number>(0);

  // Fonction pour logger les informations de débogage
  const logDebugInfo = () => {
    console.log("Debug PayPal - Config:", {
      clientId: paypalConfig.clientId,
      testMode: paypalConfig.testMode,
      clientIdTest: paypalConfig.clientId,
      hasEnvVar: !!import.meta.env.VITE_PAYPAL_CLIENT_ID
    });
  };

  // Chargement du script PayPal
  useEffect(() => {
    const loadPayPalScript = async () => {
      try {
        // Logger les infos pour le débogage
        logDebugInfo();
        
        // Réinitialiser les erreurs précédentes
        setScriptError(null);
        
        // Incrémenter le compteur de tentatives
        paymentAttemptCountRef.current += 1;
        
        // Force un rechargement du script PayPal si c'est une nouvelle tentative après échec
        if (paypalScriptRef.current) {
          document.body.removeChild(paypalScriptRef.current);
          paypalScriptRef.current = null;
          setIsPayPalScriptLoaded(false);
          
          // Supprimer l'instance PayPal de window pour forcer un rechargement complet
          if (window.paypal) {
            delete window.paypal;
          }
        }

        const script = document.createElement('script');
        
        // Utiliser l'ID client depuis la configuration mise à jour
        const clientId = paypalConfig.clientId;
        
        if (!clientId || clientId === 'votre_paypal_client_id_production') {
          throw new Error("Client ID PayPal invalide ou manquant.");
        }
        
        // Ajouter les paramètres adaptés à l'environnement
        const parameters = new URLSearchParams({
          'client-id': clientId,
          'currency': 'EUR',
          'locale': 'fr_FR'
        });
        
        // Ajouter un paramètre unique pour éviter la mise en cache
        parameters.append('v', `${paymentAttemptCountRef.current}-${Date.now()}`);

        // Utiliser les paramètres dans l'URL
        console.log(`Mode: ${import.meta.env.MODE}, Client ID: ${clientId.substring(0, 10)}...`);
        script.src = `https://www.paypal.com/sdk/js?${parameters.toString()}`;
        script.async = true;
        
        script.onload = () => {
          console.log("PayPal script loaded successfully");
          setIsPayPalScriptLoaded(true);
        };
        
        script.onerror = (error) => {
          console.error("Error loading PayPal script:", error);
          setScriptError("Impossible de charger le service PayPal. Veuillez réessayer plus tard.");
        };
        
        document.body.appendChild(script);
        paypalScriptRef.current = script;
        
        return () => {
          if (paypalScriptRef.current && document.body.contains(paypalScriptRef.current)) {
            document.body.removeChild(paypalScriptRef.current);
            paypalScriptRef.current = null;
          }
        };
      } catch (error) {
        console.error('Erreur lors du chargement du script PayPal:', error);
        setScriptError((error as Error).message || "Une erreur est survenue lors du chargement de PayPal.");
      }
    };
    
    loadPayPalScript();
  }, [paymentDetails]); // Recharger quand les détails de paiement changent

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
    
    // Court délai pour s'assurer que PayPal est complètement chargé
    const timer = setTimeout(() => {
      renderPayPalButton();
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
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
          {scriptError ? (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Erreur de chargement</h3>
                  <p className="text-sm text-red-700 mt-1">
                    {scriptError}
                  </p>
                  <Button 
                    className="mt-3 text-xs bg-red-100 text-red-800 hover:bg-red-200"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Réessayer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div id="paypal-button-container" className="mb-6">
              {!isPayPalScriptLoaded && (
                <div className="flex justify-center p-8">
                  <Loader2 className="animate-spin h-8 w-8 text-primary" />
                </div>
              )}
            </div>
          )}
          
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