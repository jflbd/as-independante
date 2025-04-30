import { BookOpen, Shield, FileText, Gavel } from "lucide-react";

const ReferentielSection = () => {
  return (
    <section id="referentiel" className="py-12 md:py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Cadre d'intervention
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Référentiel
          </h2>
          <p className="text-gray-600">
            Ce référentiel présente les bases de mon intervention en tant qu'assistante sociale indépendante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <BookOpen className="h-7 w-7 text-primary mr-3" />
              <h3 className="text-xl font-bold text-primary">Législation et Normes</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Mon intervention s'inscrit dans le respect des lois et règlements en vigueur, notamment le Code de l'Action Sociale et des Familles.
            </p>
            <p className="text-gray-700">
              Je maintiens une veille documentaire, juridique et sociale constante afin de rester informée des évolutions législatives et des dispositifs sociaux.           
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <FileText className="h-7 w-7 text-primary mr-3" />
              <h3 className="text-xl font-bold text-primary">Principes Éthiques</h3>
            </div>
            <p className="text-gray-700 mb-2">Mon action est guidée par les principes suivants :</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Respect de la dignité et de la singularité de chaque personne</li>
              <li>Confidentialité des informations partagées</li>
              <li>Non-jugement et écoute active</li>
              <li>Promotion de l'autonomie et du pouvoir d'agir</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center mb-4">
            <Gavel className="h-7 w-7 text-primary mr-3" />
            <h3 className="text-xl font-bold text-primary">Secret Professionnel</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Je suis tenue au secret professionnel, conformément à l'article 226-13 du Code pénal.
          </p>
          <p className="text-gray-700">
            Cela signifie que je ne peux divulguer aucune information concernant les personnes que j'accompagne, sauf dérogation prévue par la loi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary mr-3">
                <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9c0 4.97 4.03 9 9 9C16.97 21 21 16.97 21 12zM9 8h6M9 12h6M9 16h6"></path>
              </svg>
              <h3 className="text-xl font-bold text-primary">Modalités d'Intervention</h3>
            </div>
            <p className="text-gray-700 mb-4">
              J'interviens selon vos besoins et votre situation, en adaptant mes modalités d'accompagnement :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>En présentiel lors de rendez-vous individuels</li>
              <li>À distance par visioconférence (Zoom, Teams, etc.)</li>
              <li>Par téléphone pour un suivi régulier ou des situations urgentes</li>
              <li>Par messagerie instantanée (WhatsApp) pour une communication facilitée</li>
              <li>Par mail pour l'échange de documents et le suivi administratif</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Cette flexibilité permet d'assurer un accompagnement adapté à vos contraintes et à vos préférences.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Shield className="h-7 w-7 text-primary mr-3" />
              <h3 className="text-xl font-bold text-primary">Développement Professionnel</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Formation Continue</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Participation régulière à des formations et des conférences</li>
                  <li>Veille documentaire sur les évolutions du secteur social</li>
                  <li>Échanges avec d'autres professionnels</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Supervision</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Recours à un superviseur pour analyser ma pratique</li>
                  <li>Questionnement éthique et déontologique</li>
                  <li>Amélioration continue de la qualité de mon accompagnement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferentielSection;
