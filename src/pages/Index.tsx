
import { ArrowRight, Sparkles, Heart, MessageCircle, Shield, Clock, Star } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import MissionsSection from "@/components/MissionsSection";
import ReferentielSection from "@/components/ReferentielSection";
import DeontologieSection from "@/components/DeontologieSection";
import { useEffect } from "react";
import { Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  
  // Add intersection observer for section animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Rachel Gervais | Assistante Sociale Indépendante en Normandie</title>
        <meta name="description" content="Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie. Plus de 10 ans d'expérience au service de votre bien-être social." />
        <meta name="keywords" content="assistante sociale, Normandie, Rachel Gervais, accompagnement social, démarches administratives, CCAS, aide sociale" />
      </Helmet>
      
      {/* Éléments décoratifs de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative">
        <NavBar />
        
        {/* Hero Section */}
        <header id="accueil" className="pt-20 pb-12 md:pt-32 md:pb-24 relative">
          <div className="absolute top-16 right-10 text-primary/20 animate-pulse-gentle">
            <Sparkles size={40} />
          </div>
          <div className="absolute bottom-8 left-10 text-secondary/20 animate-pulse-gentle" style={{ animationDelay: "1s" }}>
            <Heart size={30} />
          </div>
          
          <div className="container px-4 mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center mx-auto max-w-2xl">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                    <Sparkles className="inline mr-1 h-3 w-3" /> Accompagnement professionnel
                  </span>
                  <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-serif font-bold leading-tight animate-fade-up">
                    Un accompagnement social personnalisé et professionnel en Normandie
                  </h1>
                  <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-600 animate-fade-up">
                    Diplômée d'État depuis 2009, je vous accompagne dans vos démarches sociales avec bienveillance et professionnalisme, que vous soyez un particulier ou un professionnel.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors animate-fade-up shadow-md hover:shadow-lg"
                    aria-label="Me contacter"
                  >
                    Me contacter
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -right-4 -bottom-4 text-primary/10 transform rotate-12 group-hover:scale-110 transition-transform">
                    <MessageCircle size={60} />
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                    alt="Ecoute et soutien" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex items-center mb-3">
                    <Heart className="h-5 w-5 mr-2 text-primary" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-primary">Écoute & Soutien</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Une approche bienveillante et sans jugement pour vous aider à surmonter les difficultés.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -right-4 -bottom-4 text-secondary/10 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Shield size={60} />
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                    alt="Accompagnement personnalisé" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex items-center mb-3">
                    <Shield className="h-5 w-5 mr-2 text-secondary" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-primary">Accompagnement</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Un suivi personnalisé et adapté à votre situation spécifique, à votre rythme.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -right-4 -bottom-4 text-accent/10 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Star size={60} />
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                    alt="Solutions concrètes" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex items-center mb-3">
                    <Star className="h-5 w-5 mr-2 text-accent" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-primary">Solutions</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Des réponses concrètes et des démarches efficaces pour améliorer votre situation.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <AboutSection />
          <MissionsSection />
          <ServicesSection />
          <ReferentielSection />
          <DeontologieSection />
          <PricingSection />
          <ContactSection />
        </main>

        <footer className="py-8 bg-gray-50 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30"></div>
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <p className="text-gray-600">&copy; {new Date().getFullYear()} AS Indépendante. Tous droits réservés. par JFL</p>
              <a 
                href="https://www.facebook.com/groups/508874659843806" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-sm">Rejoignez-moi sur Facebook</span>
              </a>
            </div>
            <div className="flex justify-center">
              <Link 
                to="/mentions-legales" 
                className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;

