
import { ArrowRight } from "lucide-react";

export const services = [
  {
    title: "Accompagnement des particuliers",
    description: "Je vous accompagne dans toutes vos démarches personnelles et administratives, avec une approche globale et bienveillante.",
    details: [
      "Accès aux droits et démarches administratives",
      "Gestion budgétaire et surendettement",
      "Accompagnement familial et social",
      "Logement et habitat",
      "Santé et handicap",
      "Protection des personnes vulnérables",
      "Retraite et vieillissement"
    ]
  },
  {
    title: "Services aux entreprises",
    description: "Un accompagnement social professionnel pour vos salariés, en soutien à votre service RH.",
    details: [
      "Prévention des risques psycho-sociaux",
      "Réduction de l'absentéisme",
      "Médiation et dialogue social",
      "Accompagnement personnalisé des salariés",
      "Soutien aux services RH",
      "Aide à la gestion des situations complexes"
    ]
  },
  {
    title: "Services aux collectivités",
    description: "Un accompagnement adapté pour optimiser le bien-être de vos agents et la qualité du service public.",
    details: [
      "Accompagnement social des agents",
      "Soutien au développement professionnel",
      "Médiation et résolution de conflits",
      "Aide à la mobilité interne",
      "Conseil en évolution de carrière"
    ]
  },
  {
    title: "Bailleurs sociaux et agences immobilières",
    description: "Prévention et gestion des situations locatives complexes.",
    details: [
      "Prévention des expulsions locatives",
      "Médiation locataire-bailleur",
      "Accompagnement budgétaire",
      "Aide aux démarches administratives",
      "Mobilisation des aides au logement"
    ]
  }
];

const ServicesSection = () => {
  const referentiel = [
    {
      title: "Accueil et Écoute des personnes",
      items: [
        "Accueillir les personnes dans le respect de la confidentialité",
        "Instaurer une relation de confiance avec la personne",
        "Recueillir l'expression des personnes",
        "Analyser les demandes des personnes"
      ]
    },
    {
      title: "Évaluation, Conseil et Orientation",
      items: [
        "Évaluer la situation globale des personnes",
        "Informer sur les droits et dispositifs",
        "Conseiller sur les actions à entreprendre",
        "Orienter vers les services appropriés"
      ]
    },
    {
      title: "Accompagnement Social Individuel",
      items: [
        "Construction d'un projet personnalisé",
        "Mobilisation des ressources disponibles",
        "Soutien et suivi continu",
        "Évaluation régulière de l'évolution"
      ]
    },
    {
      title: "Accompagnement Social Collectif",
      items: [
        "Développement de projets collectifs",
        "Animation de groupes",
        "Mobilisation des partenaires",
        "Évaluation des actions menées"
      ]
    }
  ];

  return (
    <>
      <section id="services" className="py-12 md:py-16 bg-white" aria-labelledby="services-title">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              Mes Services
            </span>
            <h2 id="services-title" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
              Un accompagnement adapté à vos besoins
            </h2>
            <p className="text-gray-600">
              Je propose un accompagnement social global, basé sur une relation bienveillante et de confiance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 md:gap-8">
            {services.map((service, index) => (
              <article
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-3 md:mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Référentiel d'activités */}
      <section id="referentiel" className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              Référentiel d'activités
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
              Les missions de l'assistant social
            </h2>
            <p className="text-gray-600">
              Le métier d'assistant de service social comprend des activités très larges et variées, encadrées par un code de déontologie strict.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {referentiel.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
