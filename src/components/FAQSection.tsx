import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

// Type pour les questions/réponses
interface FAQItem {
  question: string;
  answer: React.ReactNode;
  keywords?: string[];
}

// Liste des questions fréquentes
const faqItems: FAQItem[] = [
  {
    question: "Qu'est-ce qu'une assistante sociale libérale/indépendante ?",
    answer: (
      <>
        <p>Une assistante sociale libérale (ou indépendante) est une professionnelle diplômée d'État qui exerce son activité de manière autonome, en dehors des structures traditionnelles comme les CCAS ou les hôpitaux.</p>
        <p className="mt-2">En tant qu'assistante sociale indépendante en Normandie, j'accompagne les particuliers et les professionnels dans leurs démarches sociales avec flexibilité et disponibilité, tout en respectant le même code déontologique que mes collègues du service public.</p>
      </>
    ),
    keywords: ["assistante sociale libérale", "assistante sociale indépendante", "Normandie"]
  },
  {
    question: "Quels services propose une assistante sociale indépendante ?",
    answer: (
      <>
        <p>En tant qu'assistante sociale indépendante en Normandie, je propose plusieurs types d'accompagnements :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Accompagnement dans vos démarches administratives</li>
          <li>Conseil et orientation vers les dispositifs adaptés</li>
          <li>Médiation familiale et soutien aux personnes âgées</li>
          <li>Aide à l'accès aux droits (logement, santé, prestations sociales)</li>
          <li>Accompagnement budgétaire et financier</li>
          <li>Interventions à domicile sur toute la région normande</li>
        </ul>
      </>
    ),
    keywords: ["services assistante sociale", "démarches administratives", "aide sociale Normandie", "Caen", "Rouen", "Le Havre"]
  },
  {
    question: "Comment se déroule une consultation avec une assistante sociale indépendante ?",
    answer: (
      <>
        <p>Une consultation avec une assistante sociale indépendante se déroule généralement en plusieurs étapes :</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>Prise de contact initiale par téléphone ou email pour définir vos besoins</li>
          <li>Premier rendez-vous de diagnostic social (à mon cabinet ou à votre domicile en Normandie)</li>
          <li>Élaboration d'un plan d'accompagnement personnalisé</li>
          <li>Suivi régulier selon vos besoins et votre situation</li>
        </ol>
        <p className="mt-2">Chaque consultation est strictement confidentielle et adaptée à votre situation personnelle.</p>
      </>
    ),
    keywords: ["consultation assistante sociale", "rendez-vous assistante sociale", "diagnostic social"]
  },
  {
    question: "Quels sont les tarifs d'une assistante sociale indépendante ?",
    answer: (
      <>
        <p>Les tarifs varient selon le type de prestation et la durée de l'accompagnement nécessaire. En tant qu'assistante sociale libérale en Normandie, je propose :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Des consultations ponctuelles</li>
          <li>Des forfaits d'accompagnement</li>
          <li>Des interventions à domicile (avec frais de déplacement)</li>
        </ul>
        <p className="mt-2">Je vous invite à consulter ma section "Tarifs" pour plus de détails ou à me contacter directement pour obtenir un devis personnalisé adapté à votre situation.</p>
      </>
    ),
    keywords: ["tarif assistante sociale privée", "prix consultations sociales", "devis assistante sociale"]
  },
  {
    question: "Intervenez-vous dans toute la Normandie ?",
    answer: (
      <>
        <p>Oui, j'interviens dans l'ensemble de la région Normandie, notamment dans les principales villes comme Caen, Rouen, Le Havre, mais aussi dans les zones rurales et périurbaines.</p>
        <p className="mt-2">Je propose des consultations à mon cabinet ainsi que des interventions à domicile en fonction de vos besoins et de votre mobilité. Pour les personnes éloignées ou à mobilité réduite, les déplacements à domicile sont particulièrement adaptés.</p>
      </>
    ),
    keywords: ["assistante sociale Normandie", "Caen", "Rouen", "Le Havre", "intervention à domicile"]
  },
  {
    question: "Quelles sont les différences entre une assistante sociale libérale et une assistante sociale en service public ?",
    answer: (
      <>
        <p>Les principales différences sont :</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Disponibilité</strong> : En tant qu'assistante sociale indépendante, j'offre une plus grande flexibilité horaire et une disponibilité accrue</li>
          <li><strong>Personnalisation</strong> : Je peux consacrer davantage de temps à chaque situation et adapter précisément mes interventions à vos besoins</li>
          <li><strong>Rémunération</strong> : Mes services sont payants, contrairement aux services sociaux publics qui sont gratuits</li>
          <li><strong>Complémentarité</strong> : J'interviens souvent en complément des services publics pour accélérer les démarches ou approfondir certains aspects</li>
        </ul>
        <p className="mt-2">Toutefois, je reste soumise au même code déontologique et au secret professionnel que mes collègues du service public.</p>
      </>
    ),
    keywords: ["différence assistante sociale libérale", "assistante sociale service public", "avantages assistante sociale privée"]
  },
];

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // Premier item ouvert par défaut
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index) 
        : [...prev, index]
    );
  };
  
  return (
    <section id="faq" className="py-12 md:py-16 bg-section-light">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Questions Fréquentes"
          subtitle="Tout ce que vous devez savoir sur mes services d'assistante sociale indépendante en Normandie"
          className="mb-10"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  className={`w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    openItems.includes(index) ? "bg-primary/5" : ""
                  }`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItems.includes(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-medium pr-8">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="flex-shrink-0 h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="flex-shrink-0 h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(index) ? "max-h-[1000px] py-4" : "max-h-0 py-0"
                  }`}
                >
                  <div className="prose prose-sm max-w-none text-gray-600">
                    {item.answer}
                  </div>
                  
                  {/* Balises meta pour les termes de recherche associés à cette FAQ */}
                  <span className="sr-only">{item.keywords?.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Vous avez d'autres questions ? N'hésitez pas à me contacter !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
