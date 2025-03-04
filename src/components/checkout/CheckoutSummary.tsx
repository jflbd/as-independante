import React from 'react';
import { ebookConfig } from '@/config/ebookConfig';
import { siteConfig } from '@/config/siteConfig';
import { Shield, Clock, SmilePlus } from 'lucide-react';

interface CheckoutSummaryProps {
    customerInfo: {
        email: string;
        firstName: string;
        lastName: string;
    };
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ 
    customerInfo 
}) => {
    return (
        <div className="summary-container">
            <h2>Résumé de votre commande</h2>
            
            <div className="summary-product">
                <div className="product-image">
                    <img src={ebookConfig.coverImage} alt={`Couverture de ${ebookConfig.title}`} />
                </div>
                <div className="product-details">
                    <h3>{ebookConfig.title}</h3>
                    <p className="product-format">Format {ebookConfig.fileFormat} • {ebookConfig.fileSize} • Livraison instantanée</p>
                </div>
            </div>

            <div className="summary-pricing">
                <div className="pricing-row">
                    <span>Prix</span>
                    <span>{ebookConfig.formattedPrice}</span>
                </div>
                <div className="pricing-row total">
                    <span>Total</span>
                    <span>{ebookConfig.formattedPrice}</span>
                </div>
            </div>
            
            {customerInfo.email && (
                <div className="summary-customer">
                    <h3>Vos informations</h3>
                    <p>
                        {customerInfo.firstName} {customerInfo.lastName}<br />
                        {customerInfo.email}
                    </p>
                </div>
            )}
            
            <div className="summary-features">
                <div className="feature">
                    <Shield size={18} className="feature-icon" />
                    <span>Paiement sécurisé</span>
                </div>
                <div className="feature">
                    <Clock size={18} className="feature-icon" />
                    <span>Accès immédiat</span>
                </div>
                <div className="feature">
                    <SmilePlus size={18} className="feature-icon" />
                    <span>{ebookConfig.guarantee.split(' ')[0]} garantie</span>
                </div>
            </div>
            
            <div className="summary-help">
                <p>Besoin d'aide ?</p>
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </div>
        </div>
    );
};

export default CheckoutSummary;