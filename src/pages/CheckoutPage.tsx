import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CheckCircle, ChevronRight, Home } from "lucide-react";
import { Button } from '@/components/ui/button';
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from "@/config/ebookConfig";
import { OptimizedImage } from '@/components/OptimizedImage';

const CheckoutPage: React.FC = () => {
    const [step, setStep] = useState<'form' | 'payment'>('form');
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les informations stockées si elles existent
        const storedInfo = localStorage.getItem('checkout-customer-info');
        if (storedInfo) {
            try {
                const parsedInfo = JSON.parse(storedInfo);
                setCustomerInfo(parsedInfo);
            } catch (e) {
                console.error("Erreur lors de la récupération des informations client:", e);
            }
        }
        
        // Scroll en haut de la page lors du chargement
        window.scrollTo(0, 0);
    }, []);

    const handleFormSubmit = (data: typeof customerInfo) => {
        setCustomerInfo(data);
        // Stocker les infos du client pour une utilisation future
        localStorage.setItem('checkout-customer-info', JSON.stringify(data));
        setStep('payment');
        
        // Scroll en haut de la page pour la prochaine étape
        window.scrollTo(0, 0);
    };

    const handleBackToForm = () => {
        setStep('form');
        // Scroll en haut de la page
        window.scrollTo(0, 0);
    };

    const handlePaymentComplete = (paymentId: string) => {
        // Stocker les infos dans localStorage pour la page de confirmation
        localStorage.setItem('purchaseInfo', JSON.stringify({
            customerInfo,
            paymentId,
            timestamp: new Date().toISOString(),
            product: {
                title: ebookConfig.title,
                price: ebookConfig.price,
                coverImage: ebookConfig.coverImage
            }
        }));
        
        // Rediriger vers la page de téléchargement/merci
        navigate('/telechargement-ebook');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <Helmet>
                <title>Acheter {ebookConfig.title} | {siteConfig.name}</title>
                <meta name="description" content={`Acheter ${ebookConfig.title} - ${ebookConfig.subtitle}`} />
            </Helmet>
            
            {/* Header avec fil d'Ariane */}
            <div className="max-w-5xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    {/* Logo/Retour à l'accueil */}
                    <Link to="/" className="flex items-center mb-4 sm:mb-0">
                        <OptimizedImage
                            src={siteConfig.ui.logo}
                            alt="logo Assistante Sociale indépendante"
                            className="h-10 w-auto"
                            width={120}
                            height={40}
                        />
                    </Link>
                    
                    {/* Fil d'Ariane */}
                    <nav className="text-sm text-gray-500 flex items-center">
                        <Link to="/" className="hover:text-primary flex items-center">
                            <Home className="h-3.5 w-3.5 mr-1" />
                            <span>Accueil</span>
                        </Link>
                        <ChevronRight className="h-3 w-3 mx-2" />
                        <Link to="/ebook" className="hover:text-primary">
                            Ebook
                        </Link>
                        <ChevronRight className="h-3 w-3 mx-2" />
                        <span className="text-gray-800 font-medium">Commande</span>
                    </nav>
                </div>

                {/* Indicateur d'étape */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                    <div className="flex justify-between">
                        <div className={`step-item flex-1 flex flex-col items-center ${step === 'form' ? 'active' : 'completed'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step === 'form' ? 'bg-primary text-white' : 'bg-green-100 text-green-500'
                            }`}>
                                {step === 'form' ? '1' : <CheckCircle className="w-5 h-5" />}
                            </div>
                            <div className="mt-2 text-xs sm:text-sm font-medium">Informations</div>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <div className={`h-1 w-full ${
                                step === 'payment' ? 'bg-primary' : 'bg-gray-200'
                            }`}></div>
                        </div>
                        <div className={`step-item flex-1 flex flex-col items-center ${step === 'payment' ? 'active' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step === 'payment' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                                2
                            </div>
                            <div className="mt-2 text-xs sm:text-sm font-medium">Paiement</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Formulaire ou Options de paiement (en fonction de l'étape) */}
                    <div className="md:col-span-7">
                        {step === 'form' ? (
                            <>
                                <h1 className="text-2xl font-serif font-bold mb-6">Vos informations de commande</h1>
                                <CheckoutForm onSubmit={handleFormSubmit} initialData={customerInfo} />
                                <div className="mt-4 text-sm text-gray-600">
                                    Vous avez déjà un compte ? <Link to="/login" className="text-primary hover:underline">Connectez-vous</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-serif font-bold mb-6">Paiement sécurisé</h1>
                                <PaymentOptions 
                                    onPaymentComplete={handlePaymentComplete} 
                                    onGoBack={handleBackToForm}
                                    amount={ebookConfig.price} 
                                />
                            </>
                        )}
                        
                        {/* Options de navigation */}
                        {step === 'form' && (
                            <div className="mt-8">
                                <Link to="/ebook">
                                    <Button variant="outline" className="flex items-center">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Retour à la description de l'ebook
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Récapitulatif de la commande */}
                    <div className="md:col-span-5">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-serif font-bold mb-4">Récapitulatif</h2>
                            <CheckoutSummary customerInfo={customerInfo} />
                            
                            {/* Garanties et options de contact supplémentaires */}
                            <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                                <h3 className="font-medium mb-3">Besoin d'aide ?</h3>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <span className="text-gray-600">Email :</span>{" "}
                                        <a href={`mailto:${ebookConfig.supportEmail}`} className="text-primary hover:underline">
                                            {ebookConfig.supportEmail}
                                        </a>
                                    </p>
                                    {ebookConfig.supportPhone && (
                                        <p>
                                            <span className="text-gray-600">Téléphone :</span>{" "}
                                            <a href={`tel:${ebookConfig.supportPhone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                                                {ebookConfig.supportPhone}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer simplifié */}
            <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
                </p>
                <div className="mt-2">
                    <Link to="/mentions-legales" className="hover:text-primary mx-2">Mentions légales</Link>
                    <Link to="/confidentialite" className="hover:text-primary mx-2">Politique de confidentialité</Link>
                    <Link to="/cgv" className="hover:text-primary mx-2">CGV</Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;