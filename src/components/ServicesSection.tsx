import { ArrowRight, Check } from "lucide-react";
import FadeInSection from "./animations/FadeInSection";
import StaggeredReveal from "./animations/StaggeredReveal";
import ParallaxScroll from "./animations/ParallaxScroll";
import ContactButton from "./ContactButton";
import { services } from "../data/services";

const ServicesSection = () => {
  const referentiel = [
    {
      title: "Les missions d'un assistant social",
      items: [
        "Accueil et écoute : instaurer une relation de confiance",
        "Évaluation, conseil et orientation : accompagner la personne dans son parcours",
        "Accompagnement individuel et collectif : mobiliser les ressources nécessaires",
        "Contribution au développement des politiques sociales et territoriales"
      ]
    },
    {
      title: "Code Déontologie de l'ANAS",
      items: [
        "Respect de la dignité humaine et de la confidentialité",
        "Secret professionnel et protection des données",
        "Intervention dans l'intérêt des personnes, sans discrimination",
        "Indépendance et engagement pour une pratique éthique"
      ]
    }
  ];

  // Créer les éléments pour le StaggeredReveal
  const particulierScenarios = services[0].scenarios.map((scenario, idx) => (
    <div key={idx} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors hover:shadow-sm">
      <scenario.icon className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
      <span className="text-gray-700">{scenario.text}</span>
    </div>
  ));

  const professionalHighlights = services[1].highlights.map((highlight, idx) => (
    <div key={idx} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors hover:shadow-sm">
      <h5 className="font-semibold mb-2 text-gray-900">{highlight.title}</h5>
      <p className="text-gray-700">{highlight.description}</p>
    </div>
  ));

  const companyTypes = services[1].companies.map((company, idx) => (
    <div key={idx} className="border-l-4 border-primary pl-4 hover:bg-gray-50 p-2 rounded-r-lg transition-colors">
      <h4 className="text-lg font-semibold mb-2">{company.type}</h4>
      <p className="text-gray-700">{company.description}</p>
    </div>
  ));

  return (
    <>
      <section id="services" className="py-12 md:py-16 bg-white relative" aria-labelledby="services-title">
        <ParallaxScroll strength={0.06} direction="right" className="absolute top-32 right-10 w-56 h-56">
          <div className="rounded-full bg-primary/5 blur-2xl h-full w-full"></div>
        </ParallaxScroll>
        
        <div className="container px-4 mx-auto">
          <FadeInSection type="fade" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              Mes Services
            </span>
            <h2 id="services-title" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
              Un accompagnement adapté à vos besoins
            </h2>
            <p className="text-gray-600">
              Je propose un accompagnement social global, basé sur une relation bienveillante et de confiance.
            </p>
          </FadeInSection>

          {/* Particuliers */}
          <div className="mb-16">
            <FadeInSection type="scale" className="max-w-5xl mx-auto">
              <article className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-5xl mx-auto">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-primary">{services[0].title}</h3>
                  <p className="text-gray-600 mb-6 md:mb-8">{services[0].description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">Vous rencontrez l'une de ces situations ?</h4>
                    <StaggeredReveal staggerDelay={50} initialDelay={100} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                      {particulierScenarios}
                    </StaggeredReveal>
                  </div>
                  
                  <FadeInSection type="slide" direction="up" delay={200}>
                    <div className="bg-primary/5 p-4 md:p-6 rounded-lg mb-6">
                      {services[0].details.map((detail, idx) => (
                        <p key={idx} className="mb-3 text-gray-700">{detail}</p>
                      ))}
                    </div>
                  </FadeInSection>
                  
                  <FadeInSection type="fade" delay={300}>
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Comment se déroule mon intervention ?</h4>
                      <ul className="space-y-3">
                        {services[0].interventions.map((intervention, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                            <span className="text-gray-700">{intervention}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeInSection>
                </div>
              </article>
            </FadeInSection>
          </div>

          {/* Professionnels */}
          <div>
            <FadeInSection type="scale" delay={200} className="max-w-5xl mx-auto">
              <article className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-5xl mx-auto">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-primary">{services[1].title}</h3>
                  
                  <div className="mb-8">
                    <StaggeredReveal staggerDelay={80} className="grid gap-4 md:grid-cols-2 mb-6">
                      {professionalHighlights}
                    </StaggeredReveal>
                  </div>
                  
                  <FadeInSection type="fade" delay={300} className="space-y-8 mb-6">
                    {companyTypes}
                  </FadeInSection>
                  
                  <FadeInSection type="slide" direction="up" delay={400}>
                    <div className="bg-primary/10 p-4 md:p-6 rounded-lg text-center">
                      <p className="font-bold text-lg">{services[1].interventions[0]}</p>
                      <p className="mt-2 text-gray-700">{services[1].description}</p>
                      <div className="mt-6 flex justify-center">
                        <ContactButton 
                          variant="outline" 
                          size="lg" 
                          className="shadow-md hover:shadow-lg" 
                          text="Demander un devis" 
                          iconType="quote" 
                          modalType="quote"
                        />
                      </div>
                    </div>
                  </FadeInSection>
                </div>
              </article>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Section Référentiel */}
      <section id="referentiel-preview" className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
        <ParallaxScroll strength={0.08} direction="left" className="absolute bottom-10 left-10 w-64 h-64">
          <div className="rounded-full bg-accent/5 blur-3xl h-full w-full"></div>
        </ParallaxScroll>
        
        <div className="container px-4 mx-auto relative z-10">
          <FadeInSection type="fade" className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              Le métier d'assistant social
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
              Le métier d'assistant social
            </h2>
            <p className="text-gray-600">
              Le métier d'assistant de service social comprend des activités très larges et variées, encadrées par un code de déontologie strict.
            </p>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {referentiel.map((section, index) => (
              <FadeInSection 
                key={index} 
                type="slide" 
                direction={index % 2 === 0 ? "left" : "right"}
                delay={200 + index * 100}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg h-full hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-4 text-primary">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
