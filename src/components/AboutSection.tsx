import { ArrowRight, Check } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";
import { siteConfig } from "@/config/siteConfig";
import FadeInSection from "./animations/FadeInSection";
import StaggeredReveal from "./animations/StaggeredReveal";
import ParallaxScroll from "./animations/ParallaxScroll";

const AboutSection = () => {
  const advantages = [
    "Garantie de la qualité des interventions par une professionnelle diplômée d'État",
    "Assistante sociale libérale interentreprise, j’interviens auprès de salariés, particuliers et structures",
    "Souplesse d'intervention, en présentiel ou à distance",
    "Disponibilité et délais de rendez-vous rapides",
    "Un interlocuteur unique, à l’écoute de vos besoins",
    "Proximité et confidentialité assurées",
    "Accompagnement sur mesure, à votre rythme",
    "Partenaire de plusieurs associations et compagnies d’assurances, j’interviens aussi auprès de leurs publics"
  ];

  const background = [
    "Changement de carrière en 2005 pour donner un sens à mon travail",
    "Formation à l'IRTS (Institut Régional des Travailleurs Sociaux)",
    "Expérience en centre médico-social, CMP enfants/adolescents, et accueil de jour pour personnes sans domicile fixe",
    "7 ans d'intervention sociale auprès des personnes en grande précarité",
    "Expérience en tant que responsable du service communal du logement du CCAS de Caen",
    "Démission de la fonction publique en 2018 pour exercer en tant qu'assistante sociale indépendante"
  ];

  const values = [
    "Information et orientation",
    "Écoute et soutien",
    "Accueil et accompagnement personnalisé",
    "Conseil et médiation",
    "Respect du secret professionnel"
  ];

  // Pour les listes d'éléments
  const advantageItems = advantages.map((item, idx) => (
    <li key={idx} className="flex items-start">
      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
      <span className="text-gray-600">{item}</span>
    </li>
  ));
  
  const backgroundItems = background.map((item, idx) => (
    <li key={idx} className="flex items-start">
      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
      <span className="text-gray-600">{item}</span>
    </li>
  ));

  const valueItems = values.map((value, idx) => (
    <li key={idx} className="flex items-start">
      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
      <span className="text-gray-600">{value}</span>
    </li>
  ));

  return (
    <section id="a-propos" className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <FadeInSection type="fade" direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Mon parcours
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            {siteConfig.name}, Assistante Sociale Indépendante
          </h2>
          <p className="text-gray-600">
            Assistante sociale diplômée d'État depuis 2009 et exerçant en libérale depuis 2019, j'interviens en toute confidentialité auprès des particuliers et professionnels.
          </p>
        </FadeInSection>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <FadeInSection direction="left" type="slide" delay={200}>
            <div className="relative">
              <ParallaxScroll strength={0.1} direction="right" className="absolute -top-4 -left-4 w-24 h-24">
                <div className="bg-primary/10 rounded-full w-full h-full z-0"></div>
              </ParallaxScroll>
              <ParallaxScroll strength={0.15} direction="left" className="absolute -bottom-4 -right-4 w-16 h-16">
                <div className="bg-accent/20 rounded-full w-full h-full z-0"></div>
              </ParallaxScroll>
              <OptimizedImage 
                src="/assets/images/section2-parcours-rachel.webp"
                alt="Rachel Gervais, Assistante sociale indépendante" 
                className="w-full h-auto object-contain rounded-lg shadow-lg relative z-10"
                width={1024}
                height={1536}
              />
            </div>
          </FadeInSection>
          
          <FadeInSection direction="right" type="slide" delay={400}>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-4 text-primary">Pourquoi faire appel à mes services ?</h3>
              <StaggeredReveal staggerDelay={100} initialDelay={200} className="space-y-3">
                {advantageItems}
              </StaggeredReveal>
            </div>
          </FadeInSection>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <FadeInSection type="scale" delay={200}>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-bold mb-4 text-primary">Mon parcours</h3>
              <StaggeredReveal staggerDelay={80} className="space-y-3 mb-6">
                {backgroundItems}
              </StaggeredReveal>
            </div>
          </FadeInSection>
          
          <FadeInSection type="scale" delay={400}>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-bold mb-4 text-primary">Mes missions et valeurs</h3>
              <div className="mb-6">
                <h4 className="font-bold mb-2">Accompagnement social global</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-600">Aide sur des problématiques variées : logement, budget, travail, santé, handicap, accès aux droits</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-600">Intervention basée sur une relation de confiance et de bienveillance</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-600">Objectif : favoriser l'autonomie et la stabilité des personnes</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Mes engagements</h4>
                <StaggeredReveal staggerDelay={80} className="space-y-2">
                  {valueItems}
                </StaggeredReveal>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
