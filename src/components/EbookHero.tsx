import React, { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, BookOpen, X } from 'lucide-react';
import { ebookConfig } from '@/config/ebookConfig';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CheckoutForm from './checkout/CheckoutForm';
import PaymentOptions from './checkout/PaymentOptions';

const EbookHero: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState<'form' | 'payment'>('form');
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setStep('form');
    };

    const handleFormSubmit = (data: typeof customerInfo) => {
        setCustomerInfo(data);
        setStep('payment');
    };

    const handleBackToForm = () => {
        if (step === 'payment') {
            setStep('form');
        }
    };

    const handlePaymentComplete = (paymentId: string) => {
        // Stocker les infos dans localStorage ou state global
        localStorage.setItem('purchaseInfo', JSON.stringify({
            customerInfo,
            paymentId,
            timestamp: new Date().toISOString()
        }));
        
        // Fermer la modal
        setIsModalOpen(false);
        
        // Rediriger vers la page de téléchargement
        navigate('/telechargement-ebook');
    };

    return (
        <>
            <section id="ebook" className="py-12 md:py-16 bg-white" aria-labelledby="ebook-title">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
                        <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
                            Guide Exclusif
                        </span>
                        <h2 id="ebook-title" className="text-2xl md:text-4xl font-serif font-bold mb-4">
                            {ebookConfig.title}
                        </h2>
                        <p className="text-gray-600">
                            {ebookConfig.subtitle}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up max-w-5xl mx-auto overflow-hidden">
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2 w-full">
                                <h3 className="text-xl md:text-2xl font-serif font-bold mb-4 text-primary">
                                    {ebookConfig.accroche}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {ebookConfig.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Ce que vous trouverez dans ce guide :</h4>
                                    <ul className="space-y-3">
                                        {ebookConfig.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6 space-y-2">
                                    <div className="flex items-center">
                                        <span className="text-2xl font-bold text-primary mr-3">{ebookConfig.formattedPrice}</span>
                                        {ebookConfig.formattedPriceAvantPromo && (
                                            <span className="text-gray-500 line-through text-sm">{ebookConfig.formattedPriceAvantPromo}</span>
                                        )}
                                    </div>
                                    
                                    {ebookConfig.guarantee && (
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-500 italic">{ebookConfig.guarantee}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                    <Button 
                                        className="flex items-center gap-2"
                                        onClick={handleOpenModal}
                                    >
                                        <Download size={18} />
                                        Obtenir le guide maintenant
                                    </Button>
                                    {window.location.pathname !== '/ebook' && (
                                        <Button 
                                            variant="outline" 
                                            className="flex items-center gap-2"
                                            onClick={() => {
                                                navigate('/ebook', { replace: true });
                                                setTimeout(() => {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }, 100);
                                            }}
                                        >
                                            <BookOpen size={18} />
                                            En savoir plus
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="md:w-1/2 w-full flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/5 rounded-lg transform rotate-3"></div>
                                    <img 
                                        src={ebookConfig.coverImage}
                                        alt={ebookConfig.title} 
                                        className="relative z-10 rounded-lg shadow-lg max-w-full h-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Modal d'achat */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 sm:pt-0 pt-0">
                    <div className="flex justify-between items-center border-b pb-4 pt-4 mb-4 sticky top-0 bg-white z-10">
                        <h2 className="text-lg sm:text-xl font-semibold">
                            Achat du ebook
                        </h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    <div className="purchase-modal-content">
                        <div className="flex border-b mb-4 sm:mb-6 sticky top-14 bg-white z-10 pb-2">
                            <div 
                                className={`relative px-2 sm:px-4 py-2 sm:py-3 flex-1 text-center transition-colors ${
                                    step === 'form' 
                                    ? 'text-primary font-medium' 
                                    : 'text-primary/80 font-medium'
                                } ${
                                    step === 'payment' ? 'cursor-pointer hover:bg-gray-50' : ''
                                }`}
                                onClick={handleBackToForm}
                                role={step === 'payment' ? 'button' : undefined}
                                title={step === 'payment' ? 'Revenir aux informations' : undefined}
                            >
                                <span className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full mr-1 sm:mr-2 ${
                                    step === 'form' 
                                    ? 'bg-primary text-white' 
                                    : 'bg-primary/20 text-primary'
                                }`}>1</span>
                                <span className="hidden sm:inline">Informations</span>
                                <span className="sm:hidden">Infos</span>
                                {step === 'form' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                                )}
                            </div>
                            <div className={`relative px-2 sm:px-4 py-2 sm:py-3 flex-1 text-center transition-colors ${
                                step === 'payment' 
                                ? 'text-primary font-medium' 
                                : 'text-gray-400'
                            }`}>
                                <span className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full mr-1 sm:mr-2 ${
                                    step === 'payment' 
                                    ? 'bg-primary text-white' 
                                    : 'bg-gray-100 text-gray-400'
                                }`}>2</span>
                                Paiement
                                {step === 'payment' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                                )}
                            </div>
                        </div>
                        
                        <div className="purchase-content grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Sur mobile, afficher d'abord le résumé puis le formulaire */}
                            <div className="purchase-summary lg:hidden bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <img 
                                        src={ebookConfig.coverImage} 
                                        alt={ebookConfig.title} 
                                        className="w-16 h-auto rounded-md shadow-sm"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-sm">{ebookConfig.title}</h3>
                                        <div className="text-xs text-gray-600">
                                            Format {ebookConfig.fileFormat} • {ebookConfig.fileSize}
                                        </div>
                                        {step === 'form' && (
                                            <div className="font-medium text-sm mt-1">
                                                <span>{ebookConfig.formattedPrice}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-2">
                                {step === 'form' ? (
                                    <CheckoutForm onSubmit={handleFormSubmit} initialData={customerInfo} />
                                ) : (
                                    <PaymentOptions onPaymentComplete={handlePaymentComplete} amount={ebookConfig.price} />
                                )}
                            </div>
                            
                            {/* Version bureau du résumé */}
                            <div className="purchase-summary hidden lg:block bg-gray-50 p-4 rounded-lg">
                                <div className="mb-3">
                                    <img 
                                        src={ebookConfig.coverImage} 
                                        alt={ebookConfig.title} 
                                        className="max-w-full rounded-md shadow-sm"
                                    />
                                </div>
                                <h3 className="font-semibold mb-1">{ebookConfig.title}</h3>
                                <div className="text-sm text-gray-600 mb-3">
                                    Format {ebookConfig.fileFormat} • {ebookConfig.fileSize}
                                </div>
                                {step === 'form' && (
                                    <div className="flex justify-between items-center font-medium mb-4">
                                        <span>Prix:</span>
                                        <span>{ebookConfig.formattedPrice}</span>
                                    </div>
                                )}
            
                                {/* Indicateur de paiement sécurisé SSL */}
                                {step === 'form' && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-center text-sm text-gray-600">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-4 w-4 text-green-600 mr-1" 
                                                viewBox="0 0 20 20" 
                                                fill="currentColor"
                                            >
                                                <path 
                                                    fillRule="evenodd" 
                                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                                                    clipRule="evenodd" 
                                                />
                                            </svg>
                                            <span>Paiement sécurisé SSL</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EbookHero;