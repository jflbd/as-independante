
import { ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rachel Gervais | Assistante Sociale Indépendante en Normandie</title>
        <meta name="description" content="Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie. Plus de 10 ans d'expérience au service de votre bien-être social." />
        <meta name="keywords" content="assistante sociale, Normandie, Rachel Gervais, accompagnement social, démarches administratives, CCAS, aide sociale" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <NavBar />
        
        {/* Hero Section */}
        <header id="accueil" className="pt-20 pb-12 md:pt-32 md:pb-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-in">
                Rachel Gervais - Assistante Sociale Indépendante
              </span>
              <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-serif font-bold leading-tight animate-fade-up">
                Un accompagnement social personnalisé et professionnel en Normandie
              </h1>
              <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-600 animate-fade-up">
                Diplômée d'État depuis 2009, je vous accompagne dans vos démarches sociales avec bienveillance et professionnalisme, que vous soyez un particulier ou un professionnel.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors animate-fade-up"
                aria-label="Me contacter"
              >
                Me contacter
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>

        <main>
          {/* Présentation Section */}
          <section id="presentation" className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50" aria-labelledby="presentation-title">
            <div className="container px-4 mx-auto">
              <div className="max-w-5xl mx-auto">
                <div className="grid gap-8 md:grid-cols-2 items-center mb-12">
                  <div className="order-2 md:order-1">
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
                      Qui suis-je ?
                    </span>
                    <h2 id="presentation-title" className="text-2xl md:text-4xl font-serif font-bold mb-4">
                      Rachel Gervais, votre assistante sociale indépendante
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Assistante sociale diplômée d'État depuis 2009, je mets mon expertise de plus de 10 ans au service des particuliers et des professionnels. Soumise au secret professionnel et respectant le code de déontologie de mon métier, j'accompagne mes clients avec bienveillance et professionnalisme.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Mon expertise s'étend sur toute la Normandie, soutenue par un réseau partenarial solide développé au fil de ma carrière.
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Me contacter
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative mx-auto max-w-sm">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 transform rotate-6 rounded-2xl"></div>
                      <img
                        src="/lovable-uploads/4258ae87-906e-4c86-a270-5c8ab3711e89.png"
                        alt="Rachel Gervais - Assistante sociale indépendante en Normandie"
                        className="relative rounded-2xl shadow-lg w-full h-auto object-cover aspect-[3/4]"
                      />
                    </div>
                  </div>
                </div>

                {/* Parcours et Formation */}
                <div className="max-w-4xl mx-auto mt-12">
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-6">
                    Mon parcours professionnel
                  </h3>
                  <div className="prose prose-lg mx-auto text-gray-600">
                    <h4 className="text-lg font-semibold mb-4">Formation et reconversion</h4>
                    <p className="mb-4">
                      Après un BTS Action Commerciale et dix années d'expérience dans le secteur privé, j'ai entrepris une reconversion professionnelle à 28 ans. Suite à un bilan de compétences approfondi, j'ai intégré l'IRTS d'Hérouville-Saint-Clair pour une formation de trois ans, couronnée par l'obtention de mon Diplôme d'État d'Assistante de Service Social en 2009.
                    </p>
                    
                    <h4 className="text-lg font-semibold mb-4">Une expérience riche et diversifiée</h4>
                    <p className="mb-4">
                      Ma carrière a débuté à La Boussole, centre d'accueil de jour pour personnes sans domicile fixe du CCAS de Caen, où j'ai exercé pendant 7 ans. Cette expérience m'a permis de développer une expertise dans la gestion de situations complexes et variées.
                    </p>
                    <p className="mb-4">
                      J'ai ensuite évolué vers un poste de responsable du service communal du logement au CCAS de Caen, où j'ai développé des compétences en gestion administrative et coordination partenariale.
                    </p>
                  </div>
                </div>

                {/* Pourquoi une AS indépendante */}
                <div className="max-w-4xl mx-auto mt-12">
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-6 text-center">
                    Pourquoi choisir une assistante sociale indépendante ?
                  </h3>
                  <div className="prose prose-lg mx-auto text-gray-600">
                    <p className="mb-4">
                      Mon expérience m'a permis d'identifier plusieurs problématiques dans le système social actuel :
                    </p>
                    <ul className="space-y-3 list-disc pl-6 mb-6">
                      <li>La sectorisation qui limite l'accès aux services sociaux selon le lieu de résidence</li>
                      <li>Les délais de rendez-vous souvent trop longs face à l'urgence des situations</li>
                      <li>La multiplicité des intervenants qui peut créer de la confusion</li>
                      <li>Les changements de référents qui peuvent être vécus comme des abandons</li>
                      <li>La stigmatisation parfois ressentie lors du recours aux services sociaux</li>
                      <li>Le manque d'accès aux droits par méconnaissance</li>
                      <li>Le temps limité des rendez-vous qui ne permet pas toujours d'instaurer une relation de confiance</li>
                      <li>L'orientation parfois inadaptée entre les différents services</li>
                    </ul>
                    <p className="mb-4">
                      Face à ces constats, j'ai choisi d'exercer en tant qu'assistante sociale indépendante pour offrir :
                    </p>
                    <ul className="space-y-3 list-disc pl-6">
                      <li>Un accompagnement personnalisé sans contrainte géographique sur toute la Normandie</li>
                      <li>Une disponibilité adaptée à l'urgence de votre situation</li>
                      <li>Un suivi unique et continu pour établir une véritable relation de confiance</li>
                      <li>Le temps nécessaire pour comprendre et traiter votre situation</li>
                      <li>Une approche bienveillante et non stigmatisante</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
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
                  Je propose différents services pour vous aider dans vos démarches sociales
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {services.map((service, index) => (
                  <article
                    key={index}
                    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-xl font-bold mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Prix Section */}
          <section id="prix" className="py-12 md:py-16 bg-gradient-to-b from-accent/10 to-white" aria-labelledby="prix-title">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-accent bg-accent/10 rounded-full">
                  Tarifs
                </span>
                <h2 id="prix-title" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
                  Des tarifs adaptés à vos besoins
                </h2>
                <p className="text-gray-600">
                  Une tarification transparente et adaptée à votre situation
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {pricingPlans.map((plan, index) => (
                  <article
                    key={index}
                    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                    <p className="text-3xl font-bold mb-4 text-primary">{plan.price}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600 flex items-center">
                          <span className="mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Avis Clients Section */}
          <section id="avis" className="py-12 md:py-16 bg-gradient-to-b from-white to-highlight/10" aria-labelledby="avis-title">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-secondary bg-secondary/10 rounded-full">
                  Témoignages
                </span>
                <h2 id="avis-title" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
                  Ce qu'en disent mes clients
                </h2>
                <p className="text-gray-600">
                  Découvrez les retours d'expérience de personnes que j'ai accompagnées
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <article
                    key={index}
                    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-12 md:py-16" aria-labelledby="contact-title">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
                  Contact
                </span>
                <h2 id="contact-title" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
                  Prenez contact avec moi
                </h2>
                <p className="text-gray-600">
                  N'hésitez pas à me contacter pour toute question ou demande d'information
                </p>
              </div>

              <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={4}
                      placeholder="Votre message"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-8 bg-gray-50">
          <div className="container px-4 mx-auto text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} AS Indépendante. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

const services = [
  {
    title: "Accompagnement administratif",
    description: "Je vous aide dans vos démarches administratives et l'accès à vos droits.",
  },
  {
    title: "Soutien personnalisé",
    description: "Un accompagnement adapté à votre situation et vos besoins spécifiques.",
  },
  {
    title: "Conseil et orientation",
    description: "Je vous guide vers les services et dispositifs adaptés à votre situation.",
  },
];

const pricingPlans = [
  {
    title: "Consultation initiale",
    price: "Gratuit",
    features: [
      "Premier rendez-vous découverte",
      "Évaluation de vos besoins",
      "Présentation des solutions adaptées",
      "Sans engagement"
    ]
  },
  {
    title: "Accompagnement ponctuel",
    price: "60€/heure",
    features: [
      "Aide aux démarches administratives",
      "Conseil personnalisé",
      "Suivi individuel",
      "Flexibilité des horaires"
    ]
  },
  {
    title: "Suivi régulier",
    price: "Sur devis",
    features: [
      "Accompagnement personnalisé",
      "Suivi à long terme",
      "Tarif adapté à votre situation",
      "Planning sur mesure"
    ]
  }
];

const testimonials = [
  {
    name: "Marie L.",
    date: "Mars 2024",
    comment: "Un accompagnement professionnel et bienveillant qui m'a permis de retrouver confiance en moi et de débloquer ma situation."
  },
  {
    name: "Thomas D.",
    date: "Février 2024",
    comment: "Grâce à son expertise et sa patience, j'ai pu comprendre et effectuer mes démarches administratives sereinement."
  },
  {
    name: "Sophie M.",
    date: "Janvier 2024",
    comment: "Une aide précieuse dans des moments difficiles. Je recommande vivement ses services pour leur qualité et son professionnalisme."
  }
];

export default Index;
