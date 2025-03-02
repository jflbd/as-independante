
import { ArrowRight } from "lucide-react";
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
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <NavBar />
        
        {/* Hero Section */}
        <header id="accueil" className="pt-20 pb-12 md:pt-32 md:pb-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-in">
                Rachel Gervais - Assistante Sociale Indépendante
              </span>
              <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-serif font-bold leading-tight animate-fade-up">
                Un accompagnement social personnalisé et professionnel en Normandie
              </h1>
              <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-600 animate-fade-up">
                Diplômée d'État depuis 2009, je vous accompagne dans vos démarches sociales avec bienveillance et professionnalisme, que vous soyez un particulier ou un professionnel.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors animate-fade-up"
                aria-label="Me contacter"
              >
                Me contacter
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>

        <main>
          <AboutSection />
          <MissionsSection />
          <ServicesSection />
          <ReferentielSection />
          <DeontologieSection />
          <PricingSection />
          <ContactSection />
        </main>

        <footer className="py-8 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600">&copy; {new Date().getFullYear()} AS Indépendante. Tous droits réservés.</p>
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
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
