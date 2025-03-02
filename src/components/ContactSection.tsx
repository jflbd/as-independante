
import { Mail, Phone, Facebook } from "lucide-react";

const ContactSection = () => {
  return (
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

        {/* Coordonnées de contact */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 text-center">Détails de contact</h3>
            <div className="space-y-4">
              <a 
                href="mailto:rachel.gervais@as-independante.fr" 
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary transition-colors group"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>rachel.gervais@as-independante.fr</span>
              </a>
              <a 
                href="tel:0763907845" 
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary transition-colors group"
              >
                <Phone className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>07 63 90 78 45</span>
              </a>
              <a 
                href="https://www.facebook.com/groups/508874659843806" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary transition-colors group"
              >
                <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Rejoignez-moi sur Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
          <form className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
                rows={4}
                placeholder="Votre message"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full py-3 px-6"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
