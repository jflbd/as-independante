import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from '@/config/ebookConfig';

interface PurchaseInfo {
    customerInfo: {
        email: string;
        firstName: string;
        lastName: string;
    };
    paymentId: string;
    timestamp: string;
}

const DownloadPage: React.FC = () => {
    const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);
    const [hasDownloaded, setHasDownloaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les informations d'achat depuis localStorage
        const storedInfo = localStorage.getItem('purchaseInfo');
        
        if (storedInfo) {
            setPurchaseInfo(JSON.parse(storedInfo));
        } else {
            // Rediriger si aucun achat n'a été effectué
            navigate('/acheter-ebook');
        }
    }, [navigate]);

    const handleDownload = () => {
        // Dans une vraie application, vous pourriez générer un lien signé
        // ou vérifier l'accès via une API
        
        // Utiliser l'URL du fichier depuis ebookConfig ou une URL par défaut
        const ebookUrl = ebookConfig.downloadUrl;
        
        // Créer un lien temporaire pour télécharger le fichier
        const link = document.createElement('a');
        link.href = ebookUrl;
        link.download = `${ebookConfig.title.toLowerCase().replace(/\s+/g, '-')}.${ebookConfig.fileFormat.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setHasDownloaded(true);
    };

    if (!purchaseInfo) {
        return <div className="download-loading">Chargement...</div>;
    }

    return (
        <div className="download-container">
            <div className="download-card">
                <div className="download-success">
                    <CheckCircle className="success-icon" size={60} />
                    <h1>Merci pour votre achat!</h1>
                    <p className="success-message">
                        Votre ebook est prêt à être téléchargé. Un email de confirmation a été envoyé à{' '}
                        <strong>{purchaseInfo.customerInfo.email}</strong>.
                    </p>
                </div>

                <div className="download-details">
                    <h2>Votre achat</h2>
                    <div className="ebook-preview">
                        <img src={ebookConfig.coverImage} alt={`Couverture de ${ebookConfig.title}`} />
                        <div className="ebook-info">
                            <h3>{ebookConfig.title}</h3>
                            <p>Format {ebookConfig.fileFormat} • {ebookConfig.fileSize} • Accessible immédiatement</p>
                        </div>
                    </div>
                    
                    <Button 
                        onClick={handleDownload} 
                        className={`download-button ${hasDownloaded ? 'downloaded' : ''}`}
                    >
                        {hasDownloaded ? 'Télécharger à nouveau' : 'Télécharger maintenant'}
                    </Button>
                    
                    {hasDownloaded && (
                        <p className="download-note">
                            Si vous rencontrez des problèmes avec le téléchargement, 
                            vérifiez votre boîte de réception, je vous ai également envoyé un lien de téléchargement.
                        </p>
                    )}
                </div>

                <div className="next-steps">
                    <h2>Et maintenant?</h2>
                    <ul>
                        <li>
                            <strong>Consultez votre email</strong> - Je vous ai envoyé une copie de l'ebook et votre reçu.
                        </li>
                        <li>
                            <strong>Besoin d'aide?</strong> - N'hésitez pas à me contacter à <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> ou par téléphone au <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>{siteConfig.contact.phone}</a>
                        </li>
                    </ul>
                </div>
                
                <div className="newsletter-signup">
                    <h3>Restez informé(e)</h3>
                    <p>Recevez des conseils exclusifs et soyez informé(e) de mes prochaines publications.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Votre email" defaultValue={purchaseInfo.customerInfo.email} />
                        <Button variant="outline">S'abonner</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadPage;