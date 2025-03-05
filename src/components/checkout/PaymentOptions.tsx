import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from '../ui/button';
import { Lock, CheckCircle, AlertCircle, ShieldCheck, CreditCard } from 'lucide-react';
import { ebookConfig } from '@/config/ebookConfig';

interface PaymentOptionsProps {
    onPaymentComplete: (paymentId: string) => void;
    amount: number;
}

const PayPalPaymentButton: React.FC<PaymentOptionsProps> = ({ onPaymentComplete, amount }) => {
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePaymentSuccess = (details: { id: string; payer: { name: { given_name: string } } }) => {
        const givenName = details.payer.name.given_name || "Client";
        console.log("Transaction completed by " + givenName);
        onPaymentComplete(details.id);
    };

    const handleError = (error: unknown) => {
        console.error("PayPal error:", error);
        setErrorMessage("Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.");
        setIsPending(false);
    };

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
                                    value: amount.toFixed(2),
                                    currency_code: "EUR"
                                },
                                description: ebookConfig.title
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
                    setIsPending(false);
                }}
                onClick={() => {
                    setIsPending(true);
                }}
            />
        </PayPalScriptProvider>
    );
};

const PaymentOptions: React.FC<PaymentOptionsProps> = (props) => {
    return (
        <div className="payment-options">
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Votre paiement</h2>
                <p className="text-gray-600">Complétez votre achat en toute sécurité</p>
            </div>
            <div className="purchase-summary bg-gray-50 p-4 rounded-lg mb-4">
                
                <div className="order-summary bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Résumé de la commande</h3>
                    <div className="flex justify-between text-sm mb-2">
                        <span>1x {ebookConfig.title}</span>
                        <span>{props.amount.toFixed(2)}€</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>{props.amount.toFixed(2)}€</span>
                    </div>
                </div>
            </div>

            <PayPalPaymentButton {...props} />
            
            <div className="payment-badges flex flex-wrap items-center justify-center gap-4 mt-4">

                {/* Badge SSL */}
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded border">
                    <Lock className="h-4 w-4 text-green-600 mr-1.5" />
                    <span className="text-xs font-medium">Connexion SSL sécurisée</span>
                </div>

                {/* Badge de paiement sécurisé */}
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded border">
                    <ShieldCheck className="h-4 w-4 text-green-600 mr-1.5" />
                    <span className="text-xs font-medium">Paiement sécurisé</span>
                </div>
                
                {/* Badges des méthodes de paiement */}
                <div className="flex items-center space-x-1.5 bg-gray-50 px-3 py-1.5 rounded border">
                    <CreditCard className="h-4 w-4 text-blue-600 mr-1.5" />
                    <span className="text-xs font-medium">Cartes acceptées</span>
                </div>

                {/* Badge de satisfaction garantie */}
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded border">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-1.5" />
                    <span className="text-xs font-medium">Satisfaction garantie</span>
                </div>

                {/* Badge de support client */}
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded border">
                    <AlertCircle className="h-4 w-4 text-green-600 mr-1.5" />
                    <span className="text-xs font-medium">Support 24/7</span>
                </div>
            </div>
            
            <div className="text-center text-xs text-gray-500 mt-2">
                {ebookConfig.guarantee}
            </div>
        </div>
    );
};

export default PaymentOptions;