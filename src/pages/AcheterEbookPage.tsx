import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from '@/config/ebookConfig';
import { OptimizedImage } from '@/components/OptimizedImage';

const AcheterEbookPage: React.FC = () => {
  const navigate = useNavigate();

  // Préparer les détails du produit pour le paiement
  useEffect(() => {
    // Stocker les détails du paiement dans sessionStorage
    sessionStorage.setItem(
      'paymentDetails',
      JSON.stringify({
        amount: ebookConfig.price,
        description: `${ebookConfig.title} - ${ebookConfig.subtitle}`,
        productType: 'ebook',
        productId: 'ebook-asip-001'
      })
    );

    // Défiler vers le haut de la page
    window.scrollTo(0, 0);
  }, []);

  // Fonction pour continuer vers la page de paiement
  const handleContinueToPayment = () => {
    navigate('/checkout');
  };

  // Fonction pour revenir à la page précédente
  const handleGoBack = () => {
    navigate('/ebook');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Télécharger {ebookConfig.title} | {siteConfig.name}</title>
        <meta name="description" content={`Achetez et téléchargez ${ebookConfig.title}. ${ebookConfig.subtitle}`} />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Fil d'Ariane simplifié */}
          <div className="mb-6">
            <button onClick={handleGoBack} className="text-gray-500 hover:text-primary flex items-center text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour à la présentation de l'ebook
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* En-tête */}
            <div className="bg-primary/5 p-6 border-b border-primary/10">
              <h1 className="text-2xl md:text-3xl font-serif font-bold">Télécharger l'ebook</h1>
              <p className="text-gray-600 mt-2">Vous êtes à quelques clics de recevoir votre ebook</p>
            </div>

            {/* Contenu principal */}
            <div className="p-6 md:p-8">
              {/* Détails du produit */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/3">
                  <OptimizedImage
                    src={ebookConfig.coverImage}
                    alt={ebookConfig.title}
                    className="w-full h-auto rounded-md shadow-lg"
                    width={300}
                    height={450}
                  />
                </div>

                <div className="md:w-2/3">
                  <h2 className="text-xl font-bold mb-2">{ebookConfig.title}</h2>
                  <p className="text-gray-700 mb-4">{ebookConfig.subtitle}</p>

                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">(12 avis)</span>
                  </div>

                  <p className="mb-4">
                    <FileText className="inline h-4 w-4 text-primary mr-1" /> Format PDF, téléchargement immédiat
                  </p>

                  <div className="mt-4">
                    <div className="text-3xl font-bold text-primary">{ebookConfig.formattedPrice}</div>
                    {ebookConfig.formattedPriceAvantPromo && (
                      <div className="text-sm text-gray-500 line-through">{ebookConfig.formattedPriceAvantPromo}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ce que vous obtiendrez */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Ce que vous obtiendrez</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Un guide complet de {ebookConfig.pages || 'plusieurs'} pages au format PDF</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Des modèles de documents prêts à l'emploi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Des ressources complémentaires et liens utiles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Accès aux futures mises à jour gratuitement</span>
                  </li>
                </ul>
              </div>

              {/* Paiement sécurisé */}
              <div className="bg-green-50 p-4 rounded-lg mb-8 flex items-start">
                <Shield className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800">Paiement 100% sécurisé</h4>
                  <p className="text-green-700 text-sm mt-1">
                    Vos informations de paiement sont traitées de manière sécurisée. Nous ne stockons pas les détails de votre carte de crédit.
                  </p>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button
                  variant="outline"
                  className="flex items-center justify-center"
                  onClick={handleGoBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                
                <Button
                  onClick={handleContinueToPayment}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Continuer vers le paiement
                </Button>
              </div>
            </div>
          </div>

          {/* Garantie */}
          <div className="mt-8 text-center">
            <p className="flex items-center justify-center text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span>Garantie satisfait ou remboursé pendant 30 jours</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcheterEbookPage;