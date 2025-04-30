import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { paypalConfig } from '@/config/paypalConfig';

interface PayPalTransactionDetails {
  id?: string; // Make id optional to match PayPal's response structure
  create_time?: string;
  update_time?: string;
  payer?: {
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  // Add other properties as needed
}

interface PayPalCheckoutFormProps {
  paymentDetails: {
    amount: string;
    description: string;
  };
}

const PayPalCheckoutForm: React.FC<PayPalCheckoutFormProps> = ({ paymentDetails }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  
  // Options de configuration PayPal complètes pour assurer le bon chargement
  const paypalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
    currency: "EUR",
    intent: "capture",
    components: "buttons",
    debug: import.meta.env.DEV === true,
  };

  // Vérifier la validité des paramètres avant de tenter le rendu
  useEffect(() => {
    // Vérifier si le montant est valide
    const numericAmount = parseFloat(paymentDetails.amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError(`Montant invalide : ${paymentDetails.amount}`);
      return;
    }

    // Vérifier si l'ID client est configuré
    if (!import.meta.env.VITE_PAYPAL_CLIENT_ID) {
      setError("ID client PayPal non configuré");
      return;
    }

    // Effacer les erreurs si tout est valide
    setError(null);
    
    // Vérification périodique de la disponibilité de l'API PayPal
    const checkInterval = setInterval(() => {
      if (window.paypal) {
        console.log("PayPal script détecté ✅");
        setScriptLoaded(true);
        clearInterval(checkInterval);
      } else {
        console.log("En attente du script PayPal...");
      }
    }, 500);
    
    return () => {
      clearInterval(checkInterval);
    };
  }, [paymentDetails.amount]);

  // Fonction pour gérer le succès du paiement
  const handlePaymentSuccess = (details: PayPalTransactionDetails) => {
    try {
      console.log("Paiement réussi:", details);
      const paymentInfo = {
        amount: paymentDetails.amount,
        description: paymentDetails.description,
        paymentMethod: 'paypal',
        paymentId: details.id || 'unknown',
        payerName: details.payer?.name?.given_name 
          ? `${details.payer.name.given_name} ${details.payer.name.surname || ''}`
          : undefined,
        status: 'success',
        timestamp: new Date().toISOString()
      };
      
      // Stocker les informations de paiement dans sessionStorage
      sessionStorage.setItem('paymentDetails', JSON.stringify(paymentInfo));
      console.log("Redirection vers la page de succès...");
      
      // Redirection vers la page de succès avec délai réduit
      setTimeout(() => {
        // Force la navigation par programmation vers la page de succès
        window.location.href = '/paiement-reussi';
      }, 100);
    } catch (err) {
      console.error("Erreur lors du traitement post-paiement:", err);
      setError("Une erreur s'est produite lors de la finalisation de votre paiement.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Payer avec PayPal ou une carte bancaire</h3>
      
      {/* Informations Sandbox pour les tests - Affichées uniquement en mode développement */}
      {import.meta.env.DEV && (
        <div className="mb-6 mx-auto p-4 border border-amber-300 bg-amber-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info size={20} className="text-amber-600" />
            <h2 className="font-semibold text-amber-800">Compte PayPal Sandbox pour les tests</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-3 rounded border border-amber-200">
              <p className="font-medium text-amber-800">Compte PayPal :</p>
              <p className="font-mono mt-1">{paypalConfig.sandboxAccount.email}</p>
              <p className="font-mono">{paypalConfig.sandboxAccount.password}</p>
            </div>
            <div className="bg-white p-3 rounded border border-amber-200">
              <p className="font-medium text-amber-800">Carte de test :</p>
              <p className="font-mono mt-1">{paypalConfig.sandboxAccount.cardnumber}</p>
              <p className="font-mono">Exp: {paypalConfig.sandboxAccount.expDate} - CVV: {paypalConfig.sandboxAccount.cvc}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-amber-700">Ces informations n'apparaissent qu'en mode développement et vous permettent de tester les paiements PayPal sans utiliser un vrai compte.</p>
        </div>
      )}
      
      {loading && (
        <div className="py-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Traitement de votre paiement...</p>
        </div>
      )}
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
          <div className="mt-4">
            <Button 
              onClick={() => {
                setError(null);
                window.location.reload();
              }}
              variant="outline"
              className="w-full"
            >
              Réessayer
            </Button>
          </div>
        </Alert>
      )}
      
      {/* Debug info - à supprimer en production */}
      {import.meta.env.DEV && (
        <div className="mb-4 text-xs text-gray-500 border p-2 border-gray-200 rounded">
          <p>Mode: {import.meta.env.DEV ? "Développement" : "Production"}</p>
          <p>Montant: {paymentDetails.amount}€</p>
          <p>Description: {paymentDetails.description}</p>
          <p>Client ID: {import.meta.env.VITE_PAYPAL_CLIENT_ID ? import.meta.env.VITE_PAYPAL_CLIENT_ID.substring(0, 10) + "..." : "Non défini"}</p>
          <p>API PayPal chargée: {typeof window !== "undefined" && window.paypal ? "Oui" : "Non"}</p>
          <p>Script chargé: {scriptLoaded ? "Oui" : "Non"}</p>
        </div>
      )}
      
      <PayPalScriptProvider options={paypalOptions}>
        <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
          {scriptLoaded ? (
            <PayPalButtons
              style={{ layout: "vertical", color: "blue", shape: "rect", height: 45 }}
              disabled={loading}
              forceReRender={[paymentDetails.amount, paymentDetails.description]}
              createOrder={(data, actions) => {
                console.log("Création de la commande PayPal");
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: paymentDetails.description,
                      amount: {
                        currency_code: "EUR",
                        value: paymentDetails.amount,
                      },
                    },
                  ],
                  application_context: {
                    shipping_preference: "NO_SHIPPING",
                    user_action: "PAY_NOW",
                    return_url: window.location.origin + "/paiement-reussi",
                    cancel_url: window.location.origin + "/paiement-annule",
                  }
                });
              }}
              onApprove={(data, actions) => {
                setLoading(true);
                console.log("Paiement approuvé, capture en cours...", data);
                
                if (!actions.order) {
                  console.error("Actions order object is undefined");
                  setError("Une erreur technique est survenue. Veuillez réessayer.");
                  setLoading(false);
                  return Promise.resolve();
                }
                
                return actions.order
                  .capture()
                  .then(details => {
                    console.log("Capture réussie, détails:", details);
                    handlePaymentSuccess(details);
                    
                    // Double sécurité en cas de non-redirection automatique
                    setTimeout(() => {
                      if (document.location.pathname !== '/paiement-reussi') {
                        console.log("Redirection forcée après délai...");
                        window.location.href = '/paiement-reussi';
                      }
                    }, 2000);
                  })
                  .catch(err => {
                    console.error("Erreur lors de la capture du paiement:", err);
                    setError("Une erreur s'est produite lors de la capture du paiement. Veuillez réessayer.");
                    setLoading(false);
                  });
              }}
              onCancel={() => {
                console.log("Paiement annulé par l'utilisateur");
                // Stocker le contexte d'annulation
                const contextInfo = {
                  description: paymentDetails.description
                };
                sessionStorage.setItem('cancelledPaymentContext', JSON.stringify(contextInfo));
                
                // Rediriger vers la page d'annulation
                window.location.href = '/paiement-annule';
              }}
              onError={(err) => {
                console.error("Erreur PayPal:", err);
                setError("Une erreur s'est produite lors du traitement de votre paiement. Veuillez réessayer.");
              }}
            />
          ) : (
            <div className="py-6 text-center border border-dashed border-gray-300 rounded-md">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
              <p className="text-sm text-gray-600">Chargement de PayPal...</p>
            </div>
          )}
        </div>
      </PayPalScriptProvider>
      
      <p className="text-center text-xs text-gray-500 mt-4">
        En procédant au paiement, vous acceptez nos conditions générales de vente.
        Vos informations de paiement sont sécurisées par PayPal.
      </p>
    </div>
  );
};

export default PayPalCheckoutForm;