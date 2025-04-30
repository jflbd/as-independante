import { ArrowRight, Check, Heart, Home, FileText, DollarSign, Users, User, Briefcase, BookOpen } from "lucide-react";
import FadeInSection from "./animations/FadeInSection";
import StaggeredReveal from "./animations/StaggeredReveal";
import ParallaxScroll from "./animations/ParallaxScroll";
import ContactButton from "./ContactButton";

export const services = [
  {
    title: "Vous êtes un Particulier",
    description: "Vous avez une demande ponctuelle, un besoin de conseil, d'écoute, de soutien, ou d'un accompagnement plus approfondi dans la durée, je suis là pour vous !",
    scenarios: [
      { icon: Home, text: "Mes enfants ont quitté le domicile, je souhaite obtenir un logement plus petit." },
      { icon: FileText, text: "Je ne sais pas comment remplir ma déclaration d'impôts." },
      { icon: FileText, text: "J'ai besoin d'aide pour remplir mon dossier de demande de retraite." },
      { icon: DollarSign, text: "J'ai des problèmes dans la gestion de mon budget." },
      { icon: User, text: "Je me sens seul(e), isolé(e)..." },
      { icon: FileText, text: "Je suis perdue dans les démarches administratives." },
      { icon: DollarSign, text: "J'ai trop de dettes, je ne m'en sors plus." },
      { icon: Briefcase, text: "Suite à un accident de travail je me retrouve en invalidité, mon entreprise ne peut pas me reclasser. Comment-faire ?" },
      { icon: Heart, text: "Parfois mon conjoint me fait peur et ne me respecte pas. Je pense à le quitter, mais je l'aime. J'ai besoin de conseils." },
      { icon: Users, text: "Ma sœur dépense son argent n'importe comment, elle est vulnérable et influençable. On m'a parlé d'une tutelle, qu'est ce que c'est ?" },
      { icon: Users, text: "Mes parents vieillissent et ne sont plus en sécurité chez eux, comment les aider ?" },
      { icon: Heart, text: "Je ne peux plus passer une journée sans boire d'alcool, cela a des conséquences sur ma vie sociale." },
    ],
    details: [
      "Il s'agit d'une prestation de service, qui vous est directement adressée, sans intermédiaire.",
      "Il est important de savoir que mon métier est répertorié à l'Agence Régional de Santé dans le secteur d'activité médico-social.",
    ],
    interventions: [
      "Mon intervention débute par un premier entretien d'évaluation et de diagnostic",
      "En fonction de la problématique et de la demande, l'aide pourra s'étaler dans le temps pour devenir un véritable accompagnement social global.",
      "Dans le cadre de cette mission, je suis amenée à constituer divers dossiers : dossier DALO (Droit au Logement Opposable), surendettement, ACS (Aide Complémentaire Santé), CSS (Complémentaire Santé Solidaire), demande de retraite, dossier MDPH (Maison Départementale des Personnes Handicapées), demande de mise sous protection, demande de logement, renouvellement et/ou demandes de titre de séjour…"
    ]
  },
  {
    title: "Vous êtes un Professionnel",
    description: "PEU IMPORTE VOTRE SECTEUR D'ACTIVITE, JE M'ADAPTE A VOS BESOINS ET AUX BESOINS DE VOS SALARIES.",
    highlights: [
      { title: "VOUS ÊTES SOUCIEUX DU BIEN ÊTRE DE VOS SALARIÉS", description: "Vous souhaitez prévenir les risques psycho-sociaux." },
      { title: "VOUS ÊTES SENSIBLE AUX TAUX D'ABSENTÉISME DE VOS SALARIÉS", description: "Vous êtes conscient qu'une situation personnelle difficile peut avoir un impact sur la situation professionnelle et l'activité au sein de l'entreprise." },
      { title: "VOUS SOUHAITEZ TRAVAILLER AU SEIN D'UNE AMBIANCE BIENVEILLANTE", description: "Vous avez besoin de médiation afin de faciliter le dialogue avec vos employés." },
      { title: "VOUS ÊTES UN BAILLEUR OU UNE AGENCE IMMOBILIÈRE", description: "Vous souhaitez prévenir les expulsions locatives." },
      { title: "VOUS ÊTES UNE ASSOCIATION D'AIDE À DOMICILE", description: "Vos salariés ont besoin d'un appui pour répondre aux différentes questions des bénéficiaires et de leurs familles." },
      { title: "VOUS ÊTES UNE COLLECTIVITÉ", description: "Vous souhaitez apporter un service de qualité à vos agents." },
    ],
    companies: [
      {
        type: "Vous êtes une entreprise :",
        description: "Je viens en aide à vos salariés et vos agents et je représente un soutien à votre service RH. Avant d'être salariée, une personne est un individu à part entière avec une famille, un réseau, un environnement. Chaque personne salariée peut rencontrer à un moment donné des difficultés de différents ordres : problèmes financiers, de santé, familiaux, de logement, d'addiction, professionnels… Mon rôle est de réaliser un accompagnement social global par la mise en œuvre de différentes actions : soutien, écoute, orientation, constitution de dossiers divers (surendettement, demande de mutuelle, demande de logement…), aide à la gestion budgétaire, lien avec les professionnels de santé, médiation…"
      },
      {
        type: "Vous êtes une collectivité :",
        description: "Mon but est d'offrir des conditions de travail optimales à vos agents en agissant sur leur confort personnel et professionnel. L'intérêt pour la collectivité est d'améliorer le service rendu à l'usager, d'avoir des agents épanouis et opérationnels dans le respect des grands principes de leurs missions de service public tels que la mutabilité et la continuité par exemple. Il s'agit de leur offrir un lieu d'écoute et de soutien et un accompagnement social adapté à leur situation en cas d'absence de service social du personnel. Mon intervention est basée sur le plan personnel mais aussi sur le plan professionnel en abordant le déroulement de carrière des agents, les évolutions possibles, le passage de concours, la possibilité de mobilité interne en lien avec le service RH… afin d'optimiser les différents services publics."
      },
      {
        type: "Vous êtes un bailleur social ou une agence immobilière :",
        description: "J'interviens auprès de vos locataires. De nombreuses personnes font l'objet d'expulsions locatives et j'ai pu observer que beaucoup de leurs difficultés auraient pu être évitées, ou amoindries, si un travail de prévention avait été fait en amont. Cette démarche est indispensable pour connaître l'origine du non paiement des loyers, et pouvoir venir en aide aux personnes en trouvant des solutions avant la mise en place d'une procédure. Il s'agit de travailler sur le parcours logement des personnes et d'actionner les différentes aides existantes : mise en place d'un plan d'apurement, dossier FSL maintien (Fond Solidarité Logement), dossier Action Logement, travail autour de la gestion budgétaire, demande d'une mutation de bail…"
      },
      {
        type: "Vous êtes une maison de retraite :",
        description: "Mon intervention se fait par le biais d'entretiens psycho-sociaux afin d'apporter une écoute, un soutien et des conseils. Cette mission repose également sur des Interventions Sociales d'Intérêt Collectif (ISIC), par la mise en place d'animations, de temps d'échange, de recueil des souhaits des résidents par des groupes de parole… Il s'agit aussi de faire remonter les besoins et d'effectuer, si besoin, de la médiation."
      },
      {
        type: "Vous êtes une association d'aide à domicile :",
        description: "Mes missions ont pour but de rompre l'isolement et favoriser le lien social en mobilisant l'environnement global de la personne (territoire,famille, amis, réseau de professionnels, associations…). L'objectif est aussi de représenter un soutien à vos salariés, n'ayant pas toujours les réponses aux questions des personnes ou de leur famille. Ma mission est aussi de préparer la personne à une éventuelle entrée en maison de retraite et de soutenir sa famille par la constitution des démarches administratives (dossiers de demande d'entrée en maison de retraite, EHPA ou EHPAD, demande de mise sous protection…)"
      }
    ],
    interventions: [
      "JE VOUS PROPOSE DE TRAVAILLER EN COLLABORATION ET DE FORMALISER NOTRE ENGAGEMENT MUTUEL PAR LE BIAIS D'UN CONTRAT DE PRESTATIONS DE SERVICES."
    ]
  }
];

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
