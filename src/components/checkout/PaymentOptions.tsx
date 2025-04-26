import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from '../ui/button';
import { Lock, CheckCircle, AlertCircle, ShieldCheck, CreditCard } from 'lucide-react';
import { ebookConfig } from '@/config/ebookConfig';

interface PaymentOptionsProps {
    onPaymentComplete: (paymentId: string) => void;
    amount: number;
}

// Définir une interface pour la réponse PayPal
interface PayPalOrderDetails {
    // L'id est facultatif dans l'interface de PayPal mais nous vérifions sa présence dans handlePaymentSuccess
    id?: string;
    create_time?: string;
    update_time?: string;
    payer?: {
        name?: {
            given_name?: string;
            surname?: string;
        };
        email_address?: string;
    };
    status?: string;
    payment_source?: Record<string, unknown>;
    purchase_units?: Array<Record<string, unknown>>;
    [key: string]: unknown;
}

const PayPalPaymentButton: React.FC<PaymentOptionsProps> = ({ onPaymentComplete, amount }) => {
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [paypalSdkReady, setPaypalSdkReady] = useState(false);
    const [sdkLoaded, setSdkLoaded] = useState(false);

    // Utiliser un ID client sandbox valide par défaut
    // Remarque: En production, il faut absolument utiliser la variable d'env VITE_PAYPAL_CLIENT_ID
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb";

    useEffect(() => {
        // Log de débogage
        console.log("Configuration PayPal :", {
            clientId: clientId === "sb" ? "Utilisation du bac à sable PayPal par défaut" : "Client ID configuré",
            amount: amount.toFixed(2),
            environment: import.meta.env.MODE || "development",
            sdkLoaded: sdkLoaded,
            paypalSdkReady: paypalSdkReady
        });
        
        // Avertissement si nous utilisons l'ID client sandbox par défaut
        if (clientId === "sb") {
            console.warn("⚠️ Utilisation de l'ID client sandbox PayPal par défaut. Pour la production, assurez-vous de définir VITE_PAYPAL_CLIENT_ID dans votre fichier .env");
        }
    }, [amount, clientId, sdkLoaded, paypalSdkReady]);

    const handlePaymentSuccess = (details: PayPalOrderDetails) => {
        try {
            console.log("Transaction réussie:", details);
            
            // Vérifier que l'ID de transaction est présent
            if (!details || !details.id) {
                throw new Error("Réponse PayPal invalide: ID de transaction manquant");
            }
            
            const givenName = details?.payer?.name?.given_name || "Client";
            console.log("Transaction réussie par " + givenName);
            onPaymentComplete(details.id);
        } catch (error) {
            console.error("Erreur lors du traitement du succès de paiement:", error);
            setErrorMessage("Le paiement a été effectué, mais une erreur est survenue lors de la finalisation. Veuillez nous contacter.");
        }
    };

    const handleError = (error: unknown) => {
        console.error("Erreur PayPal:", error);
        
        let message = "Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.";
        
        if (error instanceof Error) {
            console.error("Message d'erreur:", error.message);
            console.error("Stack trace:", error.stack);
            
            // Analyse plus précise des erreurs courantes
            if (error.message.includes("canceled")) {
                message = "Le paiement a été annulé. Vous pouvez réessayer quand vous le souhaitez.";
            } else if (error.message.includes("network")) {
                message = "Problème de connexion internet. Veuillez vérifier votre connexion et réessayer.";
            } else if (error.message.includes("popup")) {
                message = "Le popup de paiement PayPal a été bloqué. Veuillez autoriser les popups pour ce site.";
            }
        }
        
        setErrorMessage(message);
        setIsPending(false);
    };

    return (
        <div>
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>{errorMessage}</p>
                    </div>
                </div>
            )}

            <div className="paypal-container">
                {/* Wrapper de sécurité avec try-catch pour PayPalScriptProvider */}
                <div>
                    <PayPalScriptProvider options={{ 
                        clientId: clientId, 
                        currency: "EUR",
                        intent: "capture",
                        components: "buttons",
                        onInit: () => {
                            console.log("PayPal SDK initialisé avec succès");
                            setSdkLoaded(true);
                            setPaypalSdkReady(true);
                        },
                        onError: (err) => {
                            console.error("Erreur SDK PayPal:", err);
                            setErrorMessage("Impossible de charger PayPal. Veuillez rafraîchir la page ou nous contacter.");
                        }
                    }}>
                        {isPending && (
                            <div className="text-center py-2">
                                <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                <span className="ml-2 text-sm text-gray-600">Chargement de PayPal...</span>
                            </div>
                        )}
                        
                        {/* Error boundary pour les boutons PayPal */}
                        <div>
                            <PayPalButtons
                                fundingSource="paypal"
                                style={{ 
                                    layout: "horizontal",
                                    color: "blue",
                                    shape: "rect",
                                    label: "pay"
                                }}
                                createOrder={(data, actions) => {
                                    console.log("Création de la commande PayPal");
                                    try {
                                        if (!actions.order) {
                                            throw new Error("actions.order n'est pas disponible");
                                        }
                                        
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
                                    } catch (error) {
                                        console.error("Erreur lors de la création de la commande:", error);
                                        handleError(error);
                                        return Promise.reject(error);
                                    }
                                }}
                                onApprove={(data, actions) => {
                                    console.log("Commande approuvée:", data);
                                    if (!actions.order) {
                                        console.error("actions.order est undefined");
                                        setErrorMessage("Une erreur technique est survenue. Veuillez réessayer.");
                                        return Promise.reject("actions.order is undefined");
                                    }
                                    
                                    try {
                                        return actions.order.capture().then(handlePaymentSuccess);
                                    } catch (error) {
                                        console.error("Erreur lors de la capture:", error);
                                        handleError(error);
                                        return Promise.reject(error);
                                    }
                                }}
                                onError={handleError}
                                onInit={() => {
                                    console.log("Boutons PayPal initialisés");
                                    setIsPending(false);
                                }}
                                onCancel={() => {
                                    console.log("Paiement annulé par l'utilisateur");
                                    setIsPending(false);
                                }}
                                onClick={() => {
                                    setIsPending(true);
                                    setErrorMessage('');
                                }}
                            />
                        </div>

                        {!paypalSdkReady && !errorMessage && (
                            <div className="text-center py-4">
                                <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-gray-300 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                <p className="text-gray-500 mt-2">Chargement des options de paiement...</p>
                            </div>
                        )}
                    </PayPalScriptProvider>
                </div>
            </div>
            
            {/* Bouton de secours pour contacter le support */}
            {errorMessage && (
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600 mb-2">Si le problème persiste, vous pouvez nous contacter :</p>
                    <a
                        href={`mailto:${ebookConfig.supportEmail || 'contact@example.com'}?subject=Problème de paiement pour ${ebookConfig.title}`}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Contacter le support
                    </a>
                </div>
            )}
        </div>
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