
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
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <NavBar />
        
        {/* Hero Section */}
        <header id="accueil" className="pt-20 pb-12 md:pt-32 md:pb-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center mx-auto max-w-2xl">
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
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                    alt="Ecoute et soutien" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-primary">Écoute & Soutien</h3>
                  <p className="text-gray-600">Une approche bienveillante et sans jugement pour vous aider à surmonter les difficultés.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                    alt="Accompagnement personnalisé" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-primary">Accompagnement</h3>
                  <p className="text-gray-600">Un suivi personnalisé et adapté à votre situation spécifique, à votre rythme.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <img 
                    src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                    alt="Solutions concrètes" 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-primary">Solutions</h3>
                  <p className="text-gray-600">Des réponses concrètes et des démarches efficaces pour améliorer votre situation.</p>
                </div>
              </div>
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
