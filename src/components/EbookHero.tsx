import React, { useState } from 'react';
import { Button } from './ui/button';
import { Download, Shield, Check } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { ebookConfig } from '@/config/ebookConfig';
import ContactButton from './ContactButton';
import { Link } from 'react-router-dom';

// Composant pour l'étiquette flottante
const FloatingLabel: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => (
  <div className={`absolute bg-primary text-white font-semibold text-sm py-1 px-3 rounded-full shadow-lg transform -translate-y-1/2 ${className}`}>
    {text}
  </div>
);

const EbookHero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 overflow-hidden w-full">
      {/* Image de fond semi-transparente */}
      <div className="absolute inset-0 opacity-5 pattern-wavy"></div>
      
      <div className="container mx-auto px-4 pt-16 pb-20 max-w-[100vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto px-4 min-h-[50vh]">
          {/* Colonne de gauche - Contenu textuel */}
          <div className="max-w-2xl px-2 relative z-10">
            {/* Étiquette exclusive */}
            <div className="inline-block mb-4 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Guide Exclusif
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
              {ebookConfig.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              {ebookConfig.subtitle}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mt-1 mr-3">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <p className="text-gray-700">Toutes les étapes pour réussir votre installation et votre pratique</p>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mt-1 mr-3">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <p className="text-gray-700">Des conseils pratiques issus de plus de 10 ans d'expérience</p>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mt-1 mr-3">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <p className="text-gray-700">Des modèles de documents prêts à l'emploi pour démarrer rapidement</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-30">
              <Link to="/acheter-ebook" className="relative z-30 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 w-full sm:w-auto relative z-30"
                  hoverAnimation="strong"
                  clickAnimation="bounce"
                >
                  <Download size={18} />
                  Télécharger pour {ebookConfig.formattedPrice}
                </Button>
              </Link>
              <div className="relative z-30 w-full sm:w-auto">
                <ContactButton 
                  variant="outline"
                  size="lg"
                  text="Me contacter"
                  iconType="mail"
                  modalType="contact"
                  context="ebook_page"
                  className="border-primary text-primary hover:bg-primary/5 w-full sm:w-auto relative z-30"
                />
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Download size={14} className="mr-1" />
                <span>Téléchargement immédiat</span>
              </div>
              <div className="flex items-center">
                <Shield size={14} className="mr-1" />
                <span>Garantie satisfait ou remboursé</span>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite - Image de l'ebook */}
          <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md z-10">
            {/* Étiquette promo si applicable */}
            {ebookConfig.priceAvantPromo > ebookConfig.price && (
              <FloatingLabel 
                text={`-${Math.round((1 - ebookConfig.price / ebookConfig.priceAvantPromo) * 100)}%`} 
                className="right-0 top-4 -rotate-3" 
              />
            )}
            
            {/* Conteneur 3D pour l'effet */}
            <div 
              className={`
                relative mx-auto transition-transform duration-500
                ${isHovered ? 'transform scale-105' : ''}
              `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ perspective: '1000px' }}
            >
              {/* Ombre portée */}
              <div 
                className="absolute inset-x-0 bottom-0 h-2/3 opacity-20 blur-xl rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
                  transform: isHovered ? 'translateY(10px) scale(1.05)' : 'translateY(0) scale(1)',
                  transition: 'transform 0.5s ease-out'
                }}
              ></div>
              
              {/* Image de couverture avec effet 3D */}
              <div 
                className="relative rounded-lg overflow-hidden shadow-xl"
                style={{ 
                  transform: isHovered ? 'rotateY(-10deg) rotateX(5deg)' : 'rotateY(0) rotateX(0)',
                  transition: 'transform 0.5s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                <OptimizedImage
                  src={ebookConfig.coverImage}
                  alt={ebookConfig.title}
                  className="w-full h-auto rounded-lg"
                  width={400}
                  height={600}
                  priority
                />
              </div>
            </div>
            
            {/* Badge de prix */}
            <div 
              className="absolute -bottom-4 -right-4 bg-accent text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg transform rotate-12"
              style={{ animation: 'pulse 2s infinite' }}
            >
              <div className="text-xs font-light -mt-1">Seulement</div>
              <div className="font-bold text-lg leading-none">{ebookConfig.formattedPrice}</div>
              <div className="text-xs font-light">TTC</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vague en bas de la section héro */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[20px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39 116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default EbookHero;