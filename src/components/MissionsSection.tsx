import { ShieldCheck, Users, Lightbulb, Headphones, MessageSquare, Home } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";
import FadeInSection from "./animations/FadeInSection";
import StaggeredReveal from "./animations/StaggeredReveal";
import ParallaxScroll from "./animations/ParallaxScroll";

const MissionsSection = () => {
  const values = [
    { icon: <MessageSquare className="h-8 w-8 text-primary" />, label: "INFORMATION" },
    { icon: <Headphones className="h-8 w-8 text-primary" />, label: "ECOUTE" },
    { icon: <Users className="h-8 w-8 text-primary" />, label: "SOUTIEN" },
    { icon: <Home className="h-8 w-8 text-primary" />, label: "ACCUEIL" },
    { icon: <Lightbulb className="h-8 w-8 text-primary" />, label: "CONSEIL" },
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, label: "SECRET PROFESSIONNEL" },
  ];

  // Préparer les éléments pour StaggeredReveal
  const valueItems = values.map((value, index) => (
    <div 
      key={index} 
      className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center h-32 sm:h-40" style={{ border: '1px solid #f3f4f6', borderRadius: '0.5rem' }}
    >
      <div className="mb-3 bg-primary/10 p-3 rounded-full">
        {value.icon}
      </div>
      <h3 className="font-bold text-gray-800">{value.label}</h3>
    </div>
  ));

  return (
    <section id="missions" className="py-12 md:py-16 bg-white">
      <div className="container px-4 mx-auto">
        <FadeInSection type="fade" className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Mon approche
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Mes missions
          </h2>
          <p className="text-gray-600 mb-8">
            En fonction de votre situation, je vous propose un accompagnement social global, basé sur une relation bienveillante et de confiance.
          </p>
        </FadeInSection>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto mb-12">
          <FadeInSection type="slide" direction="left">
            <div className="bg-gray-50 p-6 md:p-8 shadow-md" style={{ borderRadius: '0.5rem' }}>
              <p className="text-gray-700 mb-4">
                Mes champs d'intervention sont très larges : la famille, la santé, le logement, le budget, le travail, le handicap, l'accès aux droits…
              </p>
              <p className="text-gray-700 mb-4">
                Mon métier consiste à créer un lien de confiance, à valoriser la personne en mettant l'accent sur l'estime de soi, à mobiliser ses propres ressources mais également sa famille et/ou son réseau de manière globale.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Le but étant d'aider les personnes à réaliser leurs démarches elles-mêmes, en toute autonomie.</strong>
              </p>
              <p className="text-gray-700 mb-4">
                Afin d'atteindre cet objectif, plusieurs leviers peuvent être actionnés tels que l'écoute, le soutien, l'information, l'orientation vers des services compétents le cas échéant…
              </p>
              <p className="text-gray-700">
                Je suis également soumise au secret professionnel, <strong>selon l'article L411-3</strong> du Code de l'Action Sociale et des Familles.
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection type="slide" direction="right" delay={200}>
            <div className="relative flex justify-center items-center">
              <ParallaxScroll strength={0.15} direction="right" className="absolute -top-4 -right-4 w-20 h-20">
                <div className="bg-accent/20 rounded-full w-full h-full z-0"></div>
              </ParallaxScroll>
              <ParallaxScroll strength={0.1} direction="left" className="absolute -bottom-4 -left-4 w-16 h-16">
                <div className="bg-primary/10 rounded-full w-full h-full z-0"></div>
              </ParallaxScroll>
              <div className="aspect-square w-full max-w-md relative z-10 overflow-hidden shadow-lg" style={{ borderRadius: '0.5rem' }}>
                <OptimizedImage 
                  src="/assets/images/section3-missions.png"
                  alt="Accompagnement familial protecteur" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection type="fade" delay={300}>
          <StaggeredReveal 
            staggerDelay={100} 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {valueItems}
          </StaggeredReveal>
        </FadeInSection>
      </div>
    </section>
  );
};

export default MissionsSection;
