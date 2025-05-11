import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Mail, Bell, Home, ChevronRight, Award, Loader2,
  AlertCircle, CheckCircle, Info, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/OptimizedImage';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from '@/config/ebookConfig';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useMailchimp } from '@/hooks/use-mailchimp';

const EbookComingSoonPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { subscribe, loading } = useMailchimp();
  
  // États pour gérer les notifications
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Validation de l'email plus détaillée
  const validateEmail = (email: string): string | null => {
    if (!email || email.trim() === '') {
      return "Veuillez entrer une adresse email";
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Veuillez entrer une adresse email valide";
    }
    
    return null;
  };
  
  // Gestion du changement d'email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidationError(null); // Réinitialiser l'erreur lorsque l'utilisateur modifie l'email
    setNotification({ type: null, message: '' }); // Réinitialiser les notifications
  };
  
  // Enregistrer l'email pour être notifié avec Mailchimp
  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valider l'email
    const error = validateEmail(email);
    if (error) {
      setValidationError(error);
      return;
    }
    
    setIsSubmitting(true);
    setValidationError(null);
    setNotification({ type: null, message: '' });
    
    try {
      const result = await subscribe({
        email,
        source: 'ebook-notification',
        firstName: '', // Optionnel
        lastName: ''   // Optionnel
      });
      
      if (result.success) {
        setNotification({ 
          type: 'success', 
          message: "Merci, vous serez averti(e) dès que mon ebook sera disponible."
        });
        setEmail('');
      } else {
        setNotification({
          type: 'error',
          message: result.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: "Impossible de vous inscrire. Veuillez vérifier votre connexion et réessayer plus tard."
      });
      console.error("Erreur d'inscription:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Helmet>
        <title>Ebook bientôt disponible | {siteConfig.name}</title>
        <meta name="description" content={`Le guide ${ebookConfig.title} sera bientôt disponible ! Inscrivez-vous pour être notifié(e) dès sa sortie.`} />
      </Helmet>
      
      {/* Navigation et fil d'ariane */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* Logo et navigation */}
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <OptimizedImage
                src={siteConfig.ui.logo}
                alt="logo Assistante Sociale indépendante"
                className="h-10 w-auto"
                width={120}
                height={40}
              />
            </Link>
            
            {/* Fil d'Ariane */}
            <nav className="text-sm text-gray-500 flex items-center" aria-label="Fil d'Ariane">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="hover:text-primary transition-colors inline-flex items-center">
                    <Home className="w-3 h-3 mr-1" />
                    <span>Accueil</span>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 mx-1" />
                    <span className="text-gray-800 font-medium">Ebook</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        {/* Section héro avec animation */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  Bientôt disponible
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium mb-6">
                {ebookConfig.title}
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {ebookConfig.description}
              </p>
              
              {/* Animation d'attente */}
              <div className="flex flex-col items-center justify-center gap-6 my-12">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full border-4 border-secondary border-b-transparent animate-spin animate-reverse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-lg text-gray-600 font-medium">
                  Notre ebook est en cours de préparation
                </p>
                <div className="flex items-center justify-center space-x-1 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
              
              {/* Formulaire de notification */}
              <div className="max-w-md mx-auto bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-3 flex items-center justify-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Être notifié(e) dès la sortie
                </h3>
                <form onSubmit={handleNotifyMe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full ${validationError ? 'border-red-500 focus:ring-red-500' : ''}`}
                    disabled={isSubmitting || loading}
                    aria-invalid={validationError ? 'true' : 'false'}
                    aria-describedby={validationError ? "email-error" : undefined}
                  />
                  
                  {validationError && (
                    <div className="text-sm text-red-600 flex items-center mt-1" id="email-error" role="alert">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {validationError}
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                    {(isSubmitting || loading) ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Inscription en cours...
                      </>
                    ) : (
                      "Me notifier"
                    )}
                  </Button>
                </form>
                
                {/* Messages de notification avec fond coloré */}
                {notification.type === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-green-800 text-sm flex-1">
                      {notification.message}
                    </div>
                    <button 
                      onClick={() => setNotification({ type: null, message: ''})}
                      className="text-green-500 hover:text-green-700"
                      aria-label="Fermer la notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {notification.type === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-red-800 text-sm flex-1">
                      {notification.message}
                    </div>
                    <button 
                      onClick={() => setNotification({ type: null, message: ''})}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Fermer la notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {notification.type === 'info' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-blue-800 text-sm flex-1">
                      {notification.message}
                    </div>
                    <button 
                      onClick={() => setNotification({ type: null, message: ''})}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="Fermer la notification"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Informations sur l'ebook */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Ce que vous découvrirez
                  </h3>
                  <ul className="space-y-2">
                    {ebookConfig.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    À propos de ce guide
                  </h3>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Support disponible par email</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{ebookConfig.pages} pages de contenu pratique</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{ebookConfig.guarantee}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EbookComingSoonPage;