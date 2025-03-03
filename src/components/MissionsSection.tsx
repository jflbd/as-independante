
import { ShieldCheck, Users, Lightbulb, Headphones, MessageSquare, Home } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

const MissionsSection = () => {
  const values = [
    { icon: <MessageSquare className="h-8 w-8 text-primary" />, label: "INFORMATION" },
    { icon: <Headphones className="h-8 w-8 text-primary" />, label: "ECOUTE" },
    { icon: <Users className="h-8 w-8 text-primary" />, label: "SOUTIEN" },
    { icon: <Home className="h-8 w-8 text-primary" />, label: "ACCUEIL" },
    { icon: <Lightbulb className="h-8 w-8 text-primary" />, label: "CONSEIL" },
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, label: "SECRET PROFESSIONNEL" },
  ];

  return (
    <section id="missions" className="py-12 md:py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Mon approche
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Mes missions
          </h2>
          <p className="text-gray-600 mb-8">
            En fonction de votre situation, je vous propose un accompagnement social global, basé sur une relation bienveillante et de confiance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto mb-12">
          <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              Mes champs d'intervention sont très larges : la famille, la santé, le logement, le budget, le travail, le handicap, l'accès aux droits…
            </p>
            <p className="text-gray-700 mb-4">
              Mon métier consiste à créer un lien de confiance, à valoriser la personne en mettant l'accent sur l'estime de soi, à mobiliser ses propres ressources mais également sa famille et/ou son réseau de manière globale.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Le but étant de la rendre autonome.</strong>
            </p>
            <p className="text-gray-700 mb-4">
              Afin d'atteindre cet objectif, plusieurs leviers peuvent être actionnés tels que l'écoute, le soutien, l'information, l'orientation vers des services compétents le cas échéant…
            </p>
            <p className="text-gray-700 font-semibold">
              Je suis également soumise au secret professionnel par le Code de l'Action Sociale et des Familles.
            </p>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full z-0"></div>
            <div className="aspect-square w-full max-w-md relative z-10 overflow-hidden rounded-lg shadow-lg">
              <OptimizedImage 
                src="/lovable-uploads/76256a4b-071d-489c-8415-c7a0582c6483.png"
                alt="Accompagnement familial protecteur" 
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-3 bg-primary/10 p-3 rounded-full">
                {value.icon}
              </div>
              <h3 className="font-bold text-gray-800">{value.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionsSection;
