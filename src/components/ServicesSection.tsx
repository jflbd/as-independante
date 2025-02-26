
import { ArrowRight } from "lucide-react";

interface ServiceProps {
  title: string;
  description: string;
  details: string[];
}

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 md:py-16 bg-white" aria-labelledby="services-title">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Mes Missions
          </span>
          <h2 id="services-title" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
            Un accompagnement adapté à vos besoins
          </h2>
          <p className="text-gray-600">
            Je propose un accompagnement social global, basé sur une relation bienveillante et de confiance, avec des champs d'intervention très larges : famille, santé, logement, budget, travail, handicap, accès aux droits.
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

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-gray-600 mb-6">
            Je suis soumise au secret professionnel par le Code de l'Action Sociale et des Familles, garantissant la confidentialité de nos échanges.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Me contacter pour plus d'informations
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
