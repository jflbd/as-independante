import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CheckCircle, Home, Bug } from "lucide-react";
import { Button } from '@/components/ui/button';
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from "@/config/ebookConfig";
import { OptimizedImage } from '@/components/OptimizedImage';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const TestCheckoutPage: React.FC = () => {
    const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
    const [customerInfo, setCustomerInfo] = useState({
        email: 'test@example.com',
        firstName: 'Prénom',
        lastName: 'Nom'
    });
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const navigate = useNavigate();

    // Gestion du formulaire client
    const handleFormSubmit = (data: typeof customerInfo) => {
        setCustomerInfo(data);
        setStep('payment');
    };

    // Retour au formulaire client
    const handleBackToForm = () => {
        setStep('form');
    };

    // Gestion du paiement réussi
    const handlePaymentComplete = (paymentId: string) => {
        setPaymentId(paymentId);
        setStep('success');
        
        // En production, on redirigerait vers la page de téléchargement
        // navigate('/telechargement-ebook');
    };
    
    // Définir des prix de test
    const testPrices = [
        {label: 'Prix normal (24,99€)', value: 24.99},
        {label: 'Prix réduit (9,99€)', value: 9.99},
        {label: 'Prix élevé (99,99€)', value: 99.99},
        {label: 'Prix gratuit (0€)', value: 0}
    ];
    
    const [selectedPrice, setSelectedPrice] = useState(testPrices[0]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Helmet>
                <title>Test du Tunnel de Vente | {siteConfig.name}</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header avec navigation */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                        <Link to="/" className="flex items-center mb-4 sm:mb-0">
                            <OptimizedImage
                                src={siteConfig.ui.logo}
                                alt="logo"
                                className="h-10 w-auto"
                                width={120}
                                height={40}
                            />
                        </Link>
                        <div className="flex items-center gap-4">
                            <Bug className="text-amber-500" />
                            <span className="font-bold text-amber-600">Mode Test</span>
                        </div>
                    </div>
                    
                    <Card className="mb-8 border-amber-200 bg-amber-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bug className="h-5 w-5" />
                                Mode Test du Tunnel de Vente
                            </CardTitle>
                            <CardDescription>
                                Cette page vous permet de tester votre tunnel de vente avec Stripe en mode sandbox sans effectuer de vrais paiements.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <span className="font-medium">Étape actuelle :</span>
                                <div className="flex gap-1">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${step === 'form' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        1. Informations client
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${step === 'payment' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        2. Paiement
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        3. Confirmation
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Prix de test</label>
                                <Tabs defaultValue={selectedPrice.value.toString()} onValueChange={(value) => {
                                    const price = testPrices.find(p => p.value.toString() === value);
                                    if (price) setSelectedPrice(price);
                                }}>
                                    <TabsList>
                                        {testPrices.map((price, idx) => (
                                            <TabsTrigger key={idx} value={price.value.toString()}>
                                                {price.label}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </Tabs>
                            </div>
                            
                            <div className="flex gap-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setStep('form')}
                                    disabled={step === 'form'}
                                >
                                    Étape 1: Informations
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setStep('payment')}
                                    disabled={step === 'payment'}
                                >
                                    Étape 2: Paiement
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setStep('success')}
                                >
                                    Tester Succès
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* Contenu principal selon l'étape */}
                    <Card>
                        <CardContent className="pt-6">
                            {step === 'form' && (
                                <>
                                    <h1 className="text-2xl font-serif font-bold mb-6">Vos informations</h1>
                                    <CheckoutForm onSubmit={handleFormSubmit} initialData={customerInfo} />
                                </>
                            )}
                            
                            {step === 'payment' && (
                                <>
                                    <h1 className="text-2xl font-serif font-bold mb-6">Paiement sécurisé</h1>
                                    <PaymentOptions 
                                        onPaymentComplete={handlePaymentComplete} 
                                        onGoBack={handleBackToForm}
                                        amount={selectedPrice.value} 
                                    />
                                </>
                            )}
                            
                            {step === 'success' && (
                                <div className="text-center py-8">
                                    <div className="mb-6">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle className="w-10 h-10 text-green-600" />
                                        </div>
                                    </div>
                                    <h1 className="text-2xl font-serif font-bold mb-4">Paiement réussi !</h1>
                                    <p className="text-gray-600 mb-6">
                                        Votre paiement de <span className="font-medium">{selectedPrice.value.toFixed(2).replace('.', ',')}€</span> a été traité avec succès.
                                    </p>
                                    {paymentId && (
                                        <div className="bg-gray-50 p-4 rounded-lg inline-block mb-6">
                                            <p className="text-sm font-mono">{paymentId}</p>
                                            <p className="text-xs text-gray-500 mt-1">ID de transaction</p>
                                        </div>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button onClick={() => setStep('form')} variant="outline">
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Recommencer le test
                                        </Button>
                                        <Button onClick={() => navigate('/')}>
                                            <Home className="mr-2 h-4 w-4" />
                                            Retour à l'accueil
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    
                    {/* Résumé de la commande */}
                    {(step === 'form' || step === 'payment') && (
                        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                            <h3 className="font-medium mb-3 flex items-center">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Résumé de votre commande
                            </h3>
                            <div className="flex items-start gap-4">
                                <img 
                                    src={ebookConfig.coverImage} 
                                    alt={ebookConfig.title} 
                                    className="w-16 h-auto rounded shadow-sm" 
                                />
                                <div>
                                    <h4 className="font-medium">{ebookConfig.title}</h4>
                                    <p className="text-sm text-gray-600">{ebookConfig.subtitle}</p>
                                    <div className="flex gap-2 items-center mt-1">
                                        <span className="text-primary font-medium">{selectedPrice.value.toFixed(2).replace('.', ',')}€</span>
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                            Prix de test
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestCheckoutPage;