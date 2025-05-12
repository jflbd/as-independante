import React, { useState } from 'react';
import { Share2, X, Facebook, Twitter, Linkedin, Mail, Copy, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

interface ShareButtonProps {
  title: string;
  url: string;
  description: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url, description }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fonction pour partager l'article
  const handleShare = () => {
    setShowShareMenu(prev => !prev);
  };
  
  // Partage sur les réseaux sociaux
  const shareOnSocial = (platform: string) => {
    // S'assurer que l'URL est complète avec le domaine et formatée correctement
    // Utiliser toujours l'URL complète fournie pour éviter les problèmes de routage
    const articleUrl = url.startsWith('http') 
      ? url 
      : `${siteConfig.url}${url.startsWith('/') ? url : `/${url}`}`;
    
    console.log('URL de partage:', articleUrl); // Pour le débogage
    
    const articleTitle = encodeURIComponent(title);
    const articleDesc = encodeURIComponent(description);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${articleTitle}&url=${encodeURIComponent(articleUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${articleTitle}&summary=${articleDesc}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${articleTitle}&body=${articleDesc}%0A%0A${encodeURIComponent(articleUrl)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    
    // Fermer le menu après le partage
    setShowShareMenu(false);
  };
  
  // Fonction pour copier le lien dans le presse-papier
  const copyToClipboard = () => {
    // Utiliser le même format d'URL que pour le partage social pour cohérence
    const articleUrl = url.startsWith('http') 
      ? url 
      : `${siteConfig.url}${url.startsWith('/') ? url : `/${url}`}`;
      
    navigator.clipboard.writeText(articleUrl).then(() => {
      setCopied(true);
      console.log('URL copiée:', articleUrl); // Pour le débogage
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowShareMenu(false), 1500);
    });
  };

  return (
    <div className="flex items-center relative">
      <button 
        className="flex items-center text-sm text-gray-600 hover:text-primary bg-gray-50 px-3 py-1.5 rounded-full transition-colors"
        onClick={handleShare}
        aria-label="Partager cet article"
      >
        <Share2 className="h-4 w-4 mr-1.5" />
        Partager
      </button>
      
      {/* Menu de partage */}
      {showShareMenu && (
        <div className="absolute right-0 bottom-10 bg-white shadow-lg rounded-lg p-3 z-10 w-56 border border-gray-100 animate-in fade-in">
          <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-800">Partager l'article</span>
            <button 
              onClick={() => setShowShareMenu(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 my-2">
            <button 
              onClick={() => shareOnSocial('facebook')}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 text-blue-600"
              aria-label="Partager sur Facebook"
            >
              <Facebook className="h-5 w-5" />
              <span className="text-xs mt-1 text-gray-600">Facebook</span>
            </button>
            <button 
              onClick={() => shareOnSocial('twitter')}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 text-blue-400"
              aria-label="Partager sur Twitter"
            >
              <Twitter className="h-5 w-5" />
              <span className="text-xs mt-1 text-gray-600">Twitter</span>
            </button>
            <button 
              onClick={() => shareOnSocial('linkedin')}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 text-blue-800"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-xs mt-1 text-gray-600">LinkedIn</span>
            </button>
            <button 
              onClick={() => shareOnSocial('email')}
              className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-50 text-gray-600"
              aria-label="Partager par email"
            >
              <Mail className="h-5 w-5" />
              <span className="text-xs mt-1 text-gray-600">Email</span>
            </button>
          </div>
          <button 
            onClick={copyToClipboard}
            className="w-full mt-1 py-2 px-3 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
            aria-label="Copier le lien"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Lien copié !</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copier le lien</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
