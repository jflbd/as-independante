
import { ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Assistante Sociale Indépendante | Accompagnement personnalisé</title>
        <meta name="description" content="Accompagnement social personnalisé et professionnel. Assistance dans vos démarches administratives, soutien et conseil par une assistante sociale indépendante." />
      </Helmet>
      <div className="min-h-screen bg-secondary">
        <NavBar />
        
        {/* Hero Section */}
        <header id="accueil" className="pt-20 pb-12 md:pt-32 md:pb-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-in">
                Assistance Sociale Indépendante
              </span>
              <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-serif font-bold leading-tight animate-fade-up">
                Un accompagnement social personnalisé et professionnel
              </h1>
              <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-600 animate-fade-up">
                Je vous accompagne dans vos démarches sociales avec bienveillance et professionnalisme
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

        {/* Services Section */}
        <main>
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
                    className="p-6 bg-secondary rounded-lg hover:shadow-lg transition-shadow animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-xl font-bold mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
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

        <footer className="py-8 bg-secondary">
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

export default Index;
