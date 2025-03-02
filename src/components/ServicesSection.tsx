
import { ArrowRight, Check } from "lucide-react";

export const services = [
  {
    title: "Vous êtes un Particulier",
    description: "Je vous accompagne dans toutes vos démarches personnelles et administratives, avec une approche globale et bienveillante.",
    details: [
      "Des démarches administratives complexes",
      "La gestion de votre budget et de vos dettes",
      "L'accès à un logement adapté à votre situation",
      "Un accompagnement dans votre demande de retraite, MDPH, CMU, surendettement",
      "Un soutien face à des difficultés familiales, sociales ou professionnelles",
      "Une situation de vulnérabilité ou d'isolement"
    ],
    interventions: [
      "Premier entretien d'évaluation et de diagnostic",
      "Accompagnement personnalisé en fonction de vos besoins",
      "Aide à la constitution de dossiers (DALO, SYPLO, retraite, MDPH, logement, surendettement…)",
      "Possibilité de prise en charge par votre mutuelle"
    ]
  },
  {
    title: "Vous êtes un Professionnel",
    description: "Un accompagnement social professionnel adapté à vos besoins spécifiques.",
    details: [
      "Entreprises : soutien aux salariés en difficulté, prévention des risques psychosociaux",
      "Collectivités : amélioration des conditions de travail et service social aux agents",
      "Bailleurs sociaux & agences immobilières : prévention des expulsions locatives",
      "Associations d'aide à domicile : accompagnement des bénéficiaires et de leurs familles",
      "Maisons de retraite : écoute, soutien et médiation"
    ],
    interventions: [
      "Contrat de prestations de services sur mesure",
      "Permanences régulières ou interventions ponctuelles",
      "Travail en partenariat avec les acteurs locaux et les services RH"
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

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 md:mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Vous avez besoin d'aide pour :</h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">
                      {service.title === "Vous êtes un Particulier" ? "Comment se déroule mon intervention ?" : "Un service adapté à vos besoins"}
                    </h4>
                    <ul className="space-y-2">
                      {service.interventions.map((intervention, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                          <span className="text-gray-600">{intervention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
              Le métier d'assistant social
            </h2>
            <p className="text-gray-600">
              Le métier d'assistant de service social comprend des activités très larges et variées, encadrées par un code de déontologie strict.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
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
