
import { BookOpen, Shield, FileText, Gavel } from "lucide-react";

const DeontologieSection = () => {
  return (
    <section id="deontologie" className="py-12 md:py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Éthique Professionnelle
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Code Déontologie de l'ANAS
          </h2>
          <p className="text-gray-600">
            Il a été adopté à l'assemblée Générale de l'ANAS le 28 novembre 1994. C'est un outil essentiel pour l'exercice de la profession d'assistant de service social.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <BookOpen className="h-7 w-7 text-primary mr-3" />
              <h3 className="text-xl font-bold text-primary">Fondements du Code</h3>
            </div>
            <p className="text-gray-700 mb-4">
              L'A.N.A.S., en tant qu'association professionnelle, mène depuis sa création en 1945, une réflexion constante sur la Déontologie, concrétisée par la parution de deux codes : en 1949 et en 1981. Le Service Social, en tant qu'activité professionnelle distincte et spécifique, est à la fois né du changement et lié aux changements de plus en plus rapides et foisonnants de la Société.
            </p>
            <p className="text-gray-700">
              Le Code tient compte de ces évolutions et des valeurs fondamentales qui sous-tendent la profession. Il s'appuie sur la Déclaration Universelle des Droits de l'Homme, sur les conventions internationales et sur les textes législatifs en vigueur en France qui mettent en évidence les droits des usagers et le respect du droit à la vie privée.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <FileText className="h-7 w-7 text-primary mr-3" />
              <h3 className="text-xl font-bold text-primary">Textes de Référence</h3>
            </div>
            <p className="text-gray-700 mb-2">Ce code s'appuie sur de nombreux textes, dont :</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>la Déclaration Universelle des Droits de l'Homme (1948)</li>
              <li>la Convention de Sauvegarde des Droits de l'Homme (1965)</li>
              <li>la Charte Sociale Européenne (1965)</li>
              <li>la Convention des Nations Unies relative aux Droits de l'Enfant (1989)</li>
              <li>le Code de la Famille et de l'Aide Sociale</li>
              <li>le Code Pénal sur le respect du secret professionnel</li>
              <li>le Code Civil sur le respect de la vie privée</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center mb-4">
            <Gavel className="h-7 w-7 text-primary mr-3" />
            <h3 className="text-xl font-bold text-primary">La Profession d'Assistant de Service Social</h3>
          </div>
          <p className="text-gray-700 mb-4">
            L'Assistant de Service Social est au service de la Personne Humaine dans la Société. Son intervention vise :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
            <li>à l'épanouissement et à l'autonomie des personnes, groupes ou communautés</li>
            <li>au développement des potentialités de chacun en le rendant acteur de son propre changement</li>
            <li>à l'adaptation réciproque Individus/Société en évolution</li>
          </ul>
          <p className="text-gray-700">
            L'Assistant de Service Social participe au développement social en apportant son concours à toute action susceptible de prévenir les difficultés sociales et d'améliorer la qualité de la vie.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <Shield className="h-7 w-7 text-primary mr-3" />
            <h3 className="text-xl font-bold text-primary">Principes Fondamentaux</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Dignité et Confidentialité</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Respect de la personne en toute circonstance</li>
                <li>Non-discrimination quels que soient race, couleur, sexe, situation, nationalité, religion, opinion</li>
                <li>Confidentialité et secret professionnel</li>
                <li>Protection des données personnelles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Autonomie et Compétence</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Indépendance et liberté dans l'exercice professionnel</li>
                <li>Obligation de compétence et formation continue</li>
                <li>Recherche de l'adhésion des personnes à tout projet les concernant</li>
                <li>Information transparente sur les possibilités et limites des interventions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeontologieSection;
