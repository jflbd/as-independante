
import { ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <NavBar />
      
      {/* Hero Section */}
      <section id="accueil" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-in">
              Assistance Sociale Indépendante
            </span>
            <h1 className="mb-6 text-4xl md:text-5xl font-serif font-bold leading-tight animate-fade-up">
              Un accompagnement social personnalisé et professionnel
            </h1>
            <p className="mb-8 text-lg text-gray-600 animate-fade-up">
              Je vous accompagne dans vos démarches sociales avec bienveillance et professionnalisme
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors animate-fade-up"
            >
              Me contacter
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              Mes Services
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Un accompagnement adapté à vos besoins
            </h2>
            <p className="text-gray-600">
              Je propose différents services pour vous aider dans vos démarches sociales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-secondary rounded-lg hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Prenez contact avec moi
            </h2>
            <p className="text-gray-600">
              N'hésitez pas à me contacter pour toute question ou demande d'information
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  placeholder="Votre message"
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
    </div>
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
