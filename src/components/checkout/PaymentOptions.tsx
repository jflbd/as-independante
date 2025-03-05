import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { Lock, CheckCircle, AlertCircle, ShieldCheck, CreditCard } from 'lucide-react';
import { ebookConfig } from '@/config/ebookConfig';

// Nous pourrions placer cette clé dans un fichier d'environnement ou de configuration
const stripePromise = loadStripe('pk_test_votre_cle_publique');

interface PaymentOptionsProps {
    onPaymentComplete: (paymentId: string) => void;
    amount: number;
}

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            fontFamily: 'Inter, sans-serif',
            '::placeholder': {
                color: '#aab7c4',
            },
            iconColor: '#6772e5',
        },
        invalid: {
            color: '#e25950',
            iconColor: '#e25950',
        },
    },
    hidePostalCode: true, // Simplifie le formulaire si vous n'avez pas besoin du code postal
};

const PaymentForm: React.FC<{ onPaymentComplete: (id: string) => void; amount: number }> = ({ 
    onPaymentComplete, 
    amount
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [cardComplete, setCardComplete] = useState(false);

    const handleCardChange = (event: StripeCardElementChangeEvent) => {
        setCardComplete(event.complete);
        if (event.error) {
            setErrorMessage(event.error.message);
        } else {
            setErrorMessage('');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            // Dans une vraie application, vous feriez un appel à votre API de backend pour créer une intention de paiement
            // Simulation de paiement réussi pour la démo
            setTimeout(() => {
                setIsProcessing(false);
                onPaymentComplete(`payment_${Date.now()}`);
            }, 1500);
            
            // Code commenté pour un vrai paiement Stripe
            // const cardElement = elements.getElement(CardElement);
            // if (!cardElement) return;
            
            // const { error, paymentMethod } = await stripe.createPaymentMethod({
            //   type: 'card',
            //   card: cardElement,
            //   billing_details: {
            //     name: 'Nom du client',  // Idéalement récupéré depuis le formulaire précédent
            //   },
            // });
            // 
            // if (error) {
            //   throw new Error(error.message || 'Une erreur est survenue lors du paiement');
            // }
            // 
            // const response = await fetch('/api/payment', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ 
            //     paymentMethodId: paymentMethod.id, 
            //     amount,
            //     productName: ebookConfig.title  // Utilisation de ebookConfig
            //   })
            // });
            // 
            // const result = await response.json();
            // if (result.success) {
            //   onPaymentComplete(result.paymentId);
            // } else {
            //   throw new Error(result.message || 'Échec du paiement');
            // }
        } catch (err: unknown) {
            setErrorMessage((err as Error).message || 'Une erreur inattendue est survenue');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form space-y-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Votre paiement</h2>
                <p className="text-gray-600">Complétez votre achat en toute sécurité</p>
            </div>
            
            <div className="card-element-container bg-white border rounded-md p-4 shadow-sm">
                <div className="mb-4 pb-3 border-b flex items-center justify-between">
                    <span className="font-medium">Détails de carte</span>
                    <div className="flex space-x-1">
                        <img src="/assets/card/card-visa.svg" alt="Visa" className="h-6" />
                        <img src="/assets/card/card-mastercard.svg" alt="Mastercard" className="h-6" />
                        <img src="/assets/card/card-amex.svg" alt="American Express" className="h-6" />
                    </div>
                </div>
                
                <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
            </div>
            
            <div className="order-summary bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Résumé de la commande</h3>
                <div className="flex justify-between text-sm mb-2">
                    <span>1x {ebookConfig.title}</span>
                    <span>{amount.toFixed(2)}€</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{amount.toFixed(2)}€</span>
                </div>
            </div>
            
            {errorMessage && (
                <div className="payment-error bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                </div>
            )}
            
            <Button 
                type="submit" 
                disabled={!stripe || isProcessing || !cardComplete} 
                className="payment-button w-full py-3 relative"
            >
                {isProcessing ? (
                    <>
                        <span className="opacity-0">Payer maintenant</span>
                        <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    </>
                ) : `Payer ${amount.toFixed(2)}€ maintenant`}
            </Button>
            
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
        </form>
    );
};

const PaymentOptions: React.FC<PaymentOptionsProps> = (props) => {
    // Memoize le composant Elements pour éviter des re-renders inutiles
    const elements = React.useMemo(
        () => <Elements stripe={stripePromise}><PaymentForm {...props} /></Elements>,
        [props]
    );
    
    return elements;
};

export default PaymentOptions;