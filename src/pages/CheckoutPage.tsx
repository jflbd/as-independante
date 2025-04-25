import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingBag, CheckCircle, ChevronRight } from "lucide-react";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from "@/config/ebookConfig";

const CheckoutPage: React.FC = () => {
    const [step, setStep] = useState<'form' | 'payment'>('form');
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });
    const navigate = useNavigate();

    const handleFormSubmit = (data: typeof customerInfo) => {
        setCustomerInfo(data);
        setStep('payment');
    };

    const handlePaymentComplete = (paymentId: string) => {
        // Stocker les infos dans localStorage ou state global
        localStorage.setItem('purchaseInfo', JSON.stringify({
            customerInfo,
            paymentId,
            timestamp: new Date().toISOString()
        }));
        
        // Rediriger vers la page de téléchargement/merci
        navigate('/telechargement-ebook');
    };

    return (
        <>
            <Helmet>
                <title>Acheter {ebookConfig.title} | {siteConfig.name}</title>
                <meta name="description" content={`Acheter ${ebookConfig.title} - ${ebookConfig.subtitle}`} />
            </Helmet>
            
            <div className="checkout-container">
                <div className="checkout-steps">
                    <div className={`step ${step === 'form' ? 'active' : 'completed'}`}>1. Vos informations</div>
                    <div className={`step ${step === 'payment' ? 'active' : ''}`}>2. Paiement</div>
                </div>
                
                <div className="checkout-content">
                    <div className="checkout-form-container">
                    {step === 'form' ? (
                        <CheckoutForm onSubmit={handleFormSubmit} initialData={customerInfo} />
                    ) : (
                        <PaymentOptions onPaymentComplete={handlePaymentComplete} amount={ebookConfig.price} />
                    )}
                    </div>
                    
                    <div className="checkout-summary-container">
                    <CheckoutSummary 
                        customerInfo={customerInfo}
                    />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;