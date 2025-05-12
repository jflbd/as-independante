import { ArrowRight, Sparkles, Heart, MessageCircle, Shield, Clock, Star } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet-async";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import MissionsSection from "@/components/MissionsSection";
import ReferentielSection from "@/components/ReferentielSection";
import DeontologieSection from "@/components/DeontologieSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SEOSchema from "@/components/SEOSchema";
import LocalSEOCitations from "@/components/LocalSEOCitations";
import LocalSEOCities from "@/components/LocalSEOCities";
import { useEffect, useRef, useState } from "react";
import SafeLink from "@/components/SafeLink";
import { OptimizedImage } from "@/components/OptimizedImage";
import EbookHero from "@/components/EbookHero";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/siteConfig";
import FadeInSection from "@/components/animations/FadeInSection";
import StaggeredReveal from "@/components/animations/StaggeredReveal";
import ParallaxScroll from "@/components/animations/ParallaxScroll";
import { useLocation } from "react-router-dom";
import ScrollButtons from "@/components/ScrollButtons";
import { scrollToSectionWithOffset } from "@/utils/scroll-utils";
import { Button } from "@/components/ui/button";

const Index = () => {
  const observerInitialized = useRef(false);
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  // Effet pour mesurer la hauteur de la navbar et ajuster le padding-top de notre page
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navElement = document.querySelector('nav');
      if (navElement) {
        const height = navElement.getBoundingClientRect().height;
        if (height > 0 && height !== navbarHeight) {
          setNavbarHeight(height);
        }
      }
    };
    
    // Mesurer la hauteur au chargement et lors des redimensionnements
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    
    // Utiliser différents délais pour capturer la hauteur après tous les rendus possibles
    const timeouts = [
      setTimeout(updateNavbarHeight, 100),
      setTimeout(updateNavbarHeight, 300),
      setTimeout(updateNavbarHeight, 500)
    ];
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [navbarHeight]);
  
  useEffect(() => {
    if (observerInitialized.current) return;
    observerInitialized.current = true;
    
    if (window.innerWidth <= 768) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    const sections = document.querySelectorAll('section');
    if (window.innerWidth <= 768) {
      sections.forEach(section => {
        section.classList.add('is-visible');
      });
    } else {
      sections.forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
      });
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Gestion du défilement vers les sections via les paramètres d'URL
  useEffect(() => {
    // Extraire le paramètre scrollTo de l'URL
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scrollTo');
    
    if (scrollTarget) {
      setTimeout(() => {
        scrollToSectionWithOffset(scrollTarget);
      }, 500); // Délai pour s'assurer que la page est complètement chargée
    }
    
    // Gestion des ancres dans l'URL
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        scrollToSectionWithOffset(hash.substring(1)); // Enlever le # du début
      }, 500);
    }
  }, [location]);

  // Les éléments de la grille de service pour la section d'accueil
  const serviceCards = [
    {
      title: "Écoute & Soutien",
      description: "Une approche bienveillante et sans jugement pour vous aider à surmonter les difficultés.",
      icon: <Heart className="h-5 w-5 mr-2 text-primary" aria-hidden="true" />,
      image: "/assets/images/section1-ecoutesoutien.png",
      alt: "Ecoute et soutien",
      borderColor: "border-primary",
      gradientFrom: "from-accent/20",
      decorationIcon: <MessageCircle size={60} />,
      decorationColor: "text-primary/20"
    },
    {
      title: "Accompagnement",
      description: "Un suivi personnalisé et adapté à votre situation spécifique, à votre rythme.",
      icon: <Shield className="h-5 w-5 mr-2 text-secondary" aria-hidden="true" />,
      image: "/assets/images/section1-accompagnement.png",
      alt: "Accompagnement personnalisé",
      borderColor: "border-secondary",
      gradientFrom: "from-secondary/20",
      decorationIcon: <Shield size={60} />,
      decorationColor: "text-secondary/20"
    },
    {
      title: "Solutions",
      description: "Des réponses concrètes et des démarches efficaces pour améliorer votre situation.",
      icon: <Star className="h-5 w-5 mr-2 text-accent" aria-hidden="true" />,
      image: "/assets/images/section1-solutions.png",
      alt: "Solutions concrètes",
      borderColor: "border-accent",
      gradientFrom: "from-highlight/25",
      decorationIcon: <Star size={60} />,
      decorationColor: "text-accent/25"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={siteConfig.url} />
        <meta name="keywords" content={siteConfig.keywords} />
        <link rel="canonical" href={siteConfig.url} />
        {/* Style pour résoudre le problème de double padding */}
        <style type="text/css">
          {`
            body {
              padding-top: 0 !important; /* S'assurer que le body n'a pas de padding-top */
            }
          `}
        </style>
      </Helmet>
      
      {/* Ajout des schémas structurés pour le SEO */}
      <SEOSchema pageType="HomePage" />
      
      {/* Ajout des boutons de navigation */}
      <ScrollButtons />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <ParallaxScroll strength={0.05} direction="down" className="absolute top-20 left-10 w-64 h-64">
          <div className="rounded-full bg-primary/10 blur-3xl h-full w-full"></div>
        </ParallaxScroll>
        <ParallaxScroll strength={0.07} direction="up" className="absolute bottom-20 right-10 w-80 h-80">
          <div className="rounded-full bg-secondary/10 blur-3xl h-full w-full"></div>
        </ParallaxScroll>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
      </div>
      
      <div className="min-h-screen relative">
        <NavBar />
        
        {/* Nous utilisons un div avec un style dynamique pour le padding-top */}
        <div style={{ paddingTop: `${navbarHeight}px` }}>
          <header id="accueil" className="pt-5 md:pt-10 pb-12 md:pb-10 relative bg-gradient-to-b from-white to-section-light">
            <ParallaxScroll strength={0.2} direction="right" className="absolute top-16 right-10">
              <div className="text-primary/40 animate-pulse-gentle">
                <Sparkles size={40} />
              </div>
            </ParallaxScroll>
            <ParallaxScroll strength={0.1} direction="left" className="absolute bottom-8 left-10">
              <div className="text-secondary/40 animate-pulse-gentle" style={{ animationDelay: "1s" }}>
                <Heart size={30} />
              </div>
            </ParallaxScroll>
            
            <div className="container px-4 mx-auto">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <FadeInSection type="fade" direction="up" className="flex-1 text-center mx-auto max-w-2xl">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/20 rounded-full mb-4">
                      <Sparkles className="inline mr-1 h-3 w-3" /> Accompagnement professionnel
                    </span>
                    <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-serif font-bold leading-tight">
                      Un accompagnement social personnalisé et professionnel en {siteConfig.contact.region}
                    </h1>
                    <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-600">
                      Diplômée d'État depuis 2009, je vous accompagne dans vos démarches sociales avec bienveillance et professionnalisme, que vous soyez un particulier ou un professionnel.
                    </p>
                    <SafeLink
                      to="#contact"
                    >
                      <Button 
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-6"
                        hoverAnimation="strong"
                        clickAnimation="bounce"
                        onClick={() => scrollToSectionWithOffset('contact')}
                      >
                        Me contacter
                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </Button>
                    </SafeLink>
                  </FadeInSection>
                </div>
                
                <StaggeredReveal staggerDelay={150} initialDelay={300} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {serviceCards.map((card, index) => (
                    <div 
                      key={index} 
                      className={`bg-white p-6 shadow-md hover:shadow-lg transition-all group relative overflow-hidden border-t-4 ${card.borderColor} flex flex-col h-full`} style={{ borderRadius: '0.5rem' }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      <div className={`absolute -right-4 -bottom-4 ${card.decorationColor} transform rotate-12 group-hover:scale-110 transition-transform`}>
                        {card.decorationIcon}
                      </div>
                      <OptimizedImage 
                        src={card.image} 
                        alt={card.alt} 
                        className="w-full h-48 object-cover object-center rounded-md mb-4"
                        width={600}
                        height={400}
                      />
                      <div className="flex items-center mb-3">
                        {card.icon}
                        <h3 className="text-xl font-semibold text-primary">{card.title}</h3>
                      </div>
                      <p className="text-gray-600 relative z-10 flex-grow">{card.description}</p>
                    </div>
                  ))}
                </StaggeredReveal>
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

            {/* <EbookHero />
            <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div> */}
            
            <PricingSection />
            <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
            
            <FAQSection />
            <div className="w-full h-4 bg-gradient-to-r from-accent/10 via-secondary/10 to-primary/10"></div>
            
            {/* Ajout d'une section pour le référencement local */}
            <LocalSEOCitations />
            <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
            
            <ContactSection />
            <div className="w-full h-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
            
            {/* Section des villes d'intervention pour SEO local */}
            <section className="container mx-auto px-4 py-8">
              <LocalSEOCities 
                className="border-t-0" 
                titleClassName="text-center text-lg" 
              />
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
