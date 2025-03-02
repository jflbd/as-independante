
import { ArrowRight, Check } from "lucide-react";

const AboutSection = () => {
  const advantages = [
    "Garantie de la qualité des interventions par une professionnelle diplômée d'État",
    "Souplesse d'intervention",
    "Disponibilité et délais de rendez-vous rapides",
    "Un interlocuteur unique",
    "Proximité et confidentialité",
    "Accompagnement sur mesure, à votre rythme"
  ];

  const background = [
    "Changement de carrière en 2005 pour donner un sens à mon travail",
    "Formation à l'IRTS (Institut Régional des Travailleurs Sociaux)",
    "Expérience en centre médico-social, CMP enfants/adolescents, et accueil de jour pour personnes sans domicile fixe",
    "7 ans d'intervention sociale auprès des personnes en grande précarité",
    "Expérience en tant que responsable du service logement du CCAS de Caen",
    "Démission de la fonction publique en 2018 pour exercer en tant qu'assistante sociale indépendante"
  ];

  const values = [
    "Information et orientation",
    "Écoute et soutien",
    "Accueil et accompagnement personnalisé",
    "Conseil et médiation",
    "Respect du secret professionnel"
  ];

  return (
    <section id="a-propos" className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Qui suis-je ?
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Rachel Gervais, Assistante Sociale Indépendante
          </h2>
          <p className="text-gray-600">
            Assistante sociale diplômée d'État depuis 2009, avec plus de 10 ans d'expérience.
            J'interviens en toute confidentialité auprès des particuliers et professionnels.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent/20 rounded-full z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Assistante sociale en entretien" 
              className="w-full h-full object-cover rounded-lg shadow-lg relative z-10"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4 text-primary">Pourquoi faire appel à mes services ?</h3>
            <ul className="space-y-3">
              {advantages.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-primary">Mon parcours</h3>
            <ul className="space-y-3 mb-6">
              {background.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
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
              <ul className="space-y-2">
                {values.map((value, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-600">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
