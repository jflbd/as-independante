
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "@/hooks/use-toast";
import { OrderResponseBody } from "@paypal/paypal-js";

interface PayPalPaymentButtonProps {
  amount: string;
  description: string;
}

const PayPalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({ amount, description }) => {
  const [isPending, setIsPending] = useState(false);
  
  const handlePaymentSuccess = (details: OrderResponseBody) => {
    const givenName = details.payer?.name?.given_name || "Client";
    console.log("Transaction completed by " + givenName);
    toast({
      title: "Paiement réussi !",
      description: `Merci ${givenName} pour votre paiement de ${amount}€.`,
    });
  };

  const handleError = (error: Record<string, unknown>) => {
    console.error("PayPal error:", error);
    toast({
      title: "Erreur de paiement",
      description: "Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.",
      variant: "destructive"
    });
  };

  // Utilisez l'ID client sandbox pour les tests, remplacez par votre ID client réel en production
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb";

  return (
    <PayPalScriptProvider options={{ 
      clientId: clientId, 
      currency: "EUR",
      intent: "capture",
      components: "buttons"
    }}>
      {isPending && (
        <div className="text-center py-2">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <span className="ml-2 text-sm text-gray-600">Chargement de PayPal...</span>
        </div>
      )}
      
      <PayPalButtons
        fundingSource="paypal"
        style={{ 
          layout: "horizontal",
          color: "blue",
          shape: "rect",
          label: "pay"
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "EUR"
                },
                description: description
              }
            ]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then(handlePaymentSuccess);
        }}
        onError={handleError}
        onInit={() => {
          setIsPending(false);
        }}
        onCancel={() => {
          toast({
            title: "Paiement annulé",
            description: "Vous avez annulé le processus de paiement.",
          });
          setIsPending(false);
        }}
        onClick={() => {
          setIsPending(true);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPaymentButton;
