import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { ebookConfig } from '@/config/ebookConfig';
import { siteConfig } from '@/config/siteConfig';

interface CheckoutFormProps {
    onSubmit: (data: { email: string; firstName: string; lastName: string }) => void;
    initialData: { email: string; firstName: string; lastName: string };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, initialData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData
    });

    return (
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <p>J'ai besoin de ces informations pour vous envoyer votre ebook "{ebookConfig.title}".</p>
            
            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                id="email"
                type="email" 
                {...register('email', { 
                    required: 'Email requis',
                    pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                    }
                })}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>
            
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="firstName">Prénom *</label>
                    <input 
                        id="firstName"
                        type="text" 
                        {...register('firstName', { required: 'Prénom requis' })}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input 
                        id="lastName"
                        type="text" 
                        {...register('lastName')}
                    />
                </div>
            </div>
            
            <div className="checkout-privacy-notice">
                <p className="text-sm text-gray-500">
                    En continuant, vous acceptez de recevoir votre ebook à l'adresse email indiquée. 
                    Vos données personnelles sont utilisées uniquement pour traiter votre commande et ne seront jamais partagées.
                </p>
            </div>
            
            <Button type="submit" className="checkout-next-button">
                Continuer vers le paiement
            </Button>
        </form>
    );
};

export default CheckoutForm;