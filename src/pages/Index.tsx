import { ArrowRight, Sparkles, Heart, MessageCircle, Shield, Clock, Star, Facebook } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import MissionsSection from "@/components/MissionsSection";
import ReferentielSection from "@/components/ReferentielSection";
import DeontologieSection from "@/components/DeontologieSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useEffect } from "react";
import SafeLink from "@/components/SafeLink";
import OptimizedImage from "@/components/OptimizedImage";

const Index = () => {
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
    
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLegalLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>Rachel Gervais | Assistante Sociale Indépendante en Normandie</title>
        <meta name="description" content="Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie. Plus de 10 ans d'expérience au service de votre bien-être social." />
        <meta name="keywords" content="assistante sociale, Normandie, Rachel Gervais, accompagnement social, démarches administratives, CCAS, aide sociale" />
        <link rel="canonical" href="https://www.as-independante.fr/" />
      </Helmet>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
      </div>
      
      <div className="min-h-screen relative">
        <NavBar />
        
        <header id="accueil" className="pt-20 pb-12 md:pt-32 md:pb-24 relative bg-gradient-to-b from-white to-section-light">
          <div className="absolute top-16 right-10 text-primary/40 animate-pulse-gentle">
            <Sparkles size={40} />
          </div>
          <div className="absolute bottom-8 left-10 text-secondary/40 animate-pulse-gentle" style={{ animationDelay: "1s" }}>
            <Heart size={30} />
          </div>
          
          <div className="container px-4 mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center mx-auto max-w-2xl">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/20 rounded-full mb-4">
                    <Sparkles className="inline mr-1 h-3 w-3" /> Accompagnement professionnel
                  </span>
                  <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-serif font-bold leading-tight animate-fade-up">
                    Un accompagnement social personnalisé et professionnel en Normandie
                  </h1>
                  <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-600 animate-fade-up">
                    Diplômée d'État depuis 2009, je vous accompagne dans vos démarches sociales avec bienveillance et professionnalisme, que vous soyez un particulier ou un professionnel.
                  </p>
                  <SafeLink
                    to="#contact"
                    className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors animate-fade-up shadow-md hover:shadow-lg"
                    aria-label="Me contacter"
                  >
                    Me contacter
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </SafeLink>
                </div>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group relative overflow-hidden border-t-4 border-primary">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -right-4 -bottom-4 text-primary/20 transform rotate-12 group-hover:scale-110 transition-transform">
                    <MessageCircle size={60} />
                  </div>
                  <OptimizedImage 
                    src="/lovable-uploads/4cfe563e-2562-487a-aa53-d89205f63aae.png" 
                    alt="Ecoute et soutien" 
                    className="w-full h-48 object-cover object-center rounded-md mb-4"
                    width={600}
                    height={400}
                  />
                  <div className="flex items-center mb-3">
                    <Heart className="h-5 w-5 mr-2 text-primary" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-primary">Écoute & Soutien</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Une approche bienveillante et sans jugement pour vous aider à surmonter les difficultés.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group relative overflow-hidden border-t-4 border-secondary">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -right-4 -bottom-4 text-secondary/20 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Shield size={60} />
                  </div>
                  <OptimizedImage 
                    src="/lovable-uploads/90dacb22-981f-4faa-a7ee-750d0c921513.png" 
                    alt="Accompagnement personnalisé" 
                    className="w-full h-48 object-cover object-center rounded-md mb-4"
                    width={600}
                    height={400}
                  />
                  <div className="flex items-center mb-3">
                    <Shield className="h-5 w-5 mr-2 text-secondary" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-primary">Accompagnement</h3>
                  </div>
                  <p className="text-gray-600 relative z-10">Un suivi personnalisé et adapté à votre situation spécifique, à votre rythme.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group relative overflow-hidden border-t-4 border-accent">
                  <div className="absolute inset-0 bg-gradient-to-br from-highlight/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -right-4 -bottom-4 text-accent/25 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Star size={60} />
                  </div>
                  <OptimizedImage 
                    src="/lovable-uploads/7b80847b-ef43-4381-909c-728df9b030e5.png" 
                    alt="Solutions concrètes" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                    width={600}
                    height={400}
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
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-section-dark to-transparent"></div>
        </header>

        <main className="relative z-10">
          <AboutSection />
          <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
          
          <MissionsSection />
          <div className="w-full h-4 bg-gradient-to-r from-accent/10 via-secondary/10 to-primary/10"></div>
          
          <TestimonialsSection />
          <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
          
          <ServicesSection />
          <div className="w-full h-4 bg-gradient-to-r from-accent/10 via-secondary/10 to-primary/10"></div>
          
          <ReferentielSection />
          <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
          
          <DeontologieSection />
          <div className="w-full h-4 bg-gradient-to-r from-accent/10 via-secondary/10 to-primary/10"></div>
          
          <PricingSection />
          <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
          
          <ContactSection />
        </main>

        <footer className="py-8 bg-gray-50 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40"></div>
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <p className="text-gray-600">&copy; 2025 AS Indépendante par JFL. Tous droits réservés.</p>
              <SafeLink 
                to="https://www.facebook.com/groups/508874659843806" 
                external={true}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-sm">Rejoignez-moi sur Facebook</span>
              </SafeLink>
            </div>
            <div className="flex justify-center">
              <SafeLink 
                to="/mentions-legales" 
                className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors"
                onClick={handleLegalLinkClick}
              >
                Mentions légales
              </SafeLink>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
