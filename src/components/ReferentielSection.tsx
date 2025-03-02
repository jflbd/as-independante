
import { BookOpen, UserCheck, Users, ArrowRight, FileText, Calendar } from "lucide-react";

const ReferentielSection = () => {
  const activities = [
    {
      title: "Accueil et Écoute des personnes",
      icon: UserCheck,
      items: [
        "Accueillir les personnes dans le respect de la confidentialité.",
        "Instaurer une relation de confiance avec la personne.",
        "Recueillir l'expression des personnes en utilisant des techniques d'entretien.",
        "Analyser les demandes des personnes pour comprendre la situation."
      ]
    },
    {
      title: "Évaluation, Conseil et Orientation",
      icon: FileText,
      items: [
        "Evaluer la situation des personnes en tenant compte de leurs potentialités et de leur environnement.",
        "Informer les personnes sur leurs droits et les dispositifs ou services adaptés à leur situation.",
        "Conseiller les personnes sur les actions ou démarches à entreprendre pour améliorer leur situation.",
        "Orienter les personnes vers les interlocuteurs ou les services appropriés."
      ]
    },
    {
      title: "Accompagnement Social Individuel",
      icon: UserCheck,
      description: "L'assistant de service social construit avec les personnes un projet d'accompagnement social s'inscrivant dans la durée et visant à favoriser leur autonomie. Dans ses propositions, il prend en compte les potentialités des personnes et celles de leur entourage, ainsi que les moyens d'intervention des diverses institutions. Il recherche l'adhésion des personnes pour la mobilisation des ressources à disposition. Tout au long de l'accompagnement, il évalue avec les personnes l'évolution de leur situation pour ajuster les actions engagées. Dans l'intérêt des personnes et dans le respect du droit et de la réglementation en vigueur, il transmet des éléments d'information relatifs à la situation et nécessaires au déroulement de l'accompagnement.",
      subTitle: "Cela ce traduit par ces activités :",
      items: [
        "Apporter un soutien en mobilisant les ressources propres de la personne et celles de son environnement.",
        "Elaborer avec la personne un plan d'actions pour mener l'accompagnement social individuel.",
        "Mobiliser les réseaux de partenaires appropriés.",
        "Assurer un rôle d'interface entre les personnes et les acteurs concernés par les situations.",
        "Mettre en œuvre le plan d'actions en évaluant en continu avec la personne l'évolution de sa situation.",
        "Ajuster avec la personne le plan d'actions.",
        "Communiquer et transmettre les informations strictement nécessaires à l'évolution de la situation."
      ]
    },
    {
      title: "Accompagnement Social Collectif",
      icon: Users,
      description: "L'assistant de service social impulse des projets et soutient des initiatives collectives en faveur des personnes souhaitant s'inscrire dans une dynamique de partage autour de préoccupations communes. Il réalise un diagnostic partagé avec les personnes ou les partenaires pour définir le projet et mobilise différentes méthodologies d'intervention collective en les adaptant au contexte des situations rencontrées et aux territoires. L'accompagnement social collectif vise à la promotion et à l'autonomie des personnes dans leur environnement et sur leur territoire.",
      subTitle: "Activités de la fonction :",
      items: [
        "Elaborer avec les personnes les projets d'accompagnement social collectif.",
        "Mettre en œuvre avec les personnes les projets d'accompagnement social collectif en les évaluant en continu.",
        "Mobiliser les ressources des personnes.",
        "Mobiliser les réseaux de partenaires appropriés sur le territoire.",
        "Assurer le lien entre les personnes et les acteurs concernés par les situations.",
        "Ajuster les projets d'accompagnement social collectif avec les personnes.",
        "Communiquer et informer sur les projets d'accompagnement social collectif."
      ]
    },
    {
      title: "Conseil au Développement des Politiques Sociales et Territoriales",
      icon: Calendar,
      description: "L'assistant de service social propose son expertise à partir de ses connaissances des problématiques sociales, des politiques sociales et territoriales et de leur application. Il est force de propositions auprès des instances locales afin de développer des actions spécifiques et innovantes liées à son domaine d'intervention. Il s'appuie sur un réseau pluriprofessionnel et pluridisciplinaire pour élaborer ses contributions.",
      subTitle: "Activités de la fonction :",
      items: [
        "Mettre en place une démarche de veille professionnelle documentaire législative et réglementaire en matière de problématiques sociales et de politiques publiques.",
        "Contribuer à la réalisation de diagnostics sociaux au niveau d'une institution ou d'un territoire.",
        "Apporter un appui spécifique à l'intervention de divers partenaires ou des professionnels du champ éducatif, social ou médico-social."
      ]
    }
  ];

  return (
    <section id="referentiel" className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Référentiel Professionnel
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Référentiel d'Activités des Assistants Sociaux
          </h2>
          <p className="text-gray-600">
            Le métier d'assistant de service social comprend des activités très larges et variées.
          </p>
        </div>

        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <activity.icon className="h-7 w-7 text-primary mr-3" />
                <h3 className="text-xl font-bold text-primary">{activity.title}</h3>
              </div>
              
              {activity.description && (
                <div className="mb-4">
                  <p className="text-gray-700">{activity.description}</p>
                </div>
              )}
              
              {activity.subTitle && (
                <h4 className="font-semibold mb-2 text-gray-800">{activity.subTitle}</h4>
              )}
              
              <ul className="space-y-3">
                {activity.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferentielSection;
