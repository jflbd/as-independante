import { ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
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
          <ServicesSection />
          <PricingSection />
          <ContactSection />
        </main>

        <footer className="py-8 bg-gray-50">
          <div className="container px-4 mx-auto text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} AS Indépendante. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
