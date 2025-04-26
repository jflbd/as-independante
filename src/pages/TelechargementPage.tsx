import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, FileText, ArrowLeft, Share2, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from '@/config/ebookConfig';
import { OptimizedImage } from '@/components/OptimizedImage';
import { formatDate } from '@/lib/utils';

interface PurchaseInfo {
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
  };
  paymentId: string;
  timestamp: string;
  product: {
    title: string;
    price: number;
    coverImage: string;
  };
}

const TelechargementPage: React.FC = () => {
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll en haut de la page
    window.scrollTo(0, 0);
    
    // Récupérer les infos d'achat
    const storedInfo = localStorage.getItem('purchaseInfo');
    
    if (storedInfo) {
      try {
        const parsedInfo = JSON.parse(storedInfo);
        setPurchaseInfo(parsedInfo);
      } catch (e) {
        console.error("Erreur lors de la récupération des informations d'achat:", e);
      }
    } else {
      // Si aucune info d'achat n'est trouvée, rediriger vers la page de l'ebook
      navigate('/ebook');
    }

    // Enregistrement de l'événement d'achat (intégration potentielle avec Google Analytics, Facebook Pixel, etc.)
    if (typeof window !== 'undefined') {
      // Exemple d'intégration avec Google Analytics
      // if (window.gtag) {
      //   window.gtag('event', 'purchase', {
      //     transaction_id: parsedInfo.paymentId,
      //     value: parsedInfo.product.price,
      //     currency: 'EUR',
      //     items: [{ id: 'ebook', name: parsedInfo.product.title, price: parsedInfo.product.price }]
      //   });
      // }
    }
  }, [navigate]);

  const handleDownload = () => {
    // Logique pour télécharger le fichier
    // Dans une application réelle, vous pourriez générer un lien signé ou faire une requête à l'API
    
    // Simuler le téléchargement en ouvrant dans un nouvel onglet
    window.open(ebookConfig.downloadUrl, '_blank');
    
    // Logique de suivi de téléchargement (analytics)
    // if (window.gtag) {
    //   window.gtag('event', 'file_download', {
    //     file_name: ebookConfig.title,
    //     file_extension: 'pdf'
    //   });
    // }
  };

  // Générer un lien de partage
  const shareUrl = `mailto:?subject=Découvrez cet ebook: ${ebookConfig.title}&body=Bonjour,%0A%0AJe pense que cet ebook pourrait vous intéresser: ${ebookConfig.title}%0A%0A${window.location.origin}/ebook%0A%0ACordialement`;

  if (!purchaseInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Chargement des informations de votre achat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <Helmet>
        <title>Téléchargement de votre ebook | {siteConfig.name}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header avec fil d'Ariane */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          {/* Logo/Retour à l'accueil */}
          <Link to="/" className="flex items-center mb-4 sm:mb-0">
            <OptimizedImage
              src="/assets/logo/logo-rachel-gervais.png"
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
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto">
        {/* Carte de confirmation */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          {/* Bandeau de succès */}
          <div className="bg-green-50 p-4 flex items-center border-b border-green-100">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
            <h1 className="text-xl font-serif font-bold text-green-800">
              Merci pour votre achat !
            </h1>
          </div>

          <div className="p-6">
            <p className="mb-6 text-gray-600">
              Votre commande a bien été enregistrée et votre ebook est maintenant disponible au téléchargement.
              Nous avons également envoyé un email de confirmation à <strong>{purchaseInfo.customerInfo.email}</strong>.
            </p>
            
            {/* Récapitulatif de commande */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="font-medium mb-3">Récapitulatif de votre commande</h2>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <OptimizedImage
                    src={purchaseInfo.product.coverImage || ebookConfig.coverImage}
                    alt={purchaseInfo.product.title || ebookConfig.title}
                    className="w-16 h-auto rounded shadow-sm"
                    width={64}
                    height={96}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{purchaseInfo.product.title || ebookConfig.title}</h3>
                  <p className="text-sm text-gray-500">{formatDate(new Date(purchaseInfo.timestamp))}</p>
                  <p className="text-primary font-medium mt-1">
                    {purchaseInfo.product.price ? `${purchaseInfo.product.price.toFixed(2).replace('.', ',')}€` : ebookConfig.formattedPrice}
                  </p>
                </div>
              </div>
              <div className="text-sm">
                <p><span className="text-gray-500">N° de commande :</span> {purchaseInfo.paymentId}</p>
                <p>
                  <span className="text-gray-500">Client :</span>{" "}
                  {purchaseInfo.customerInfo.firstName} {purchaseInfo.customerInfo.lastName}
                </p>
              </div>
            </div>

            {/* Bouton de téléchargement */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center mb-6">
              <FileText className="h-12 w-12 mx-auto mb-2 text-primary" />
              <h2 className="text-xl font-medium mb-2">{ebookConfig.title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                Format {ebookConfig.fileFormat} • {ebookConfig.fileSize}
              </p>
              <Button 
                onClick={handleDownload} 
                className="bg-primary hover:bg-primary/90 text-white flex items-center px-8 py-6 h-auto mx-auto"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                <span className="text-base">Télécharger votre ebook</span>
              </Button>
            </div>

            {/* Conseils & prochaines étapes */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Et maintenant ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium mb-1">Des questions ?</h3>
                  <p className="text-sm text-gray-600">
                    N'hésitez pas à me contacter si vous avez des questions sur le contenu de l'ebook.
                  </p>
                  <a 
                    href={`mailto:${ebookConfig.supportEmail}`}
                    className="text-primary text-sm flex items-center mt-2 hover:underline"
                  >
                    Contactez-moi
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </a>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium mb-1">Partagez</h3>
                  <p className="text-sm text-gray-600">
                    Vous connaissez quelqu'un qui pourrait être intéressé par cet ebook ?
                  </p>
                  <a 
                    href={shareUrl}
                    className="text-primary text-sm flex items-center mt-2 hover:underline"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Partager par email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Options de navigation */}
        <div className="text-center my-8">
          <Link to="/">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retourner à l'accueil
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Footer simplifié */}
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
        <div className="mt-2">
          <Link to="/mentions-legales" className="hover:text-primary mx-2">Mentions légales</Link>
          <Link to="/confidentialite" className="hover:text-primary mx-2">Politique de confidentialité</Link>
        </div>
      </div>
    </div>
  );
};

export default TelechargementPage;