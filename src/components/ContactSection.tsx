import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import { SiFacebook } from "@icons-pack/react-simple-icons";
import { siteConfig } from "@/config/siteConfig";
import FadeInSection from "./animations/FadeInSection";
import ParallaxScroll from "./animations/ParallaxScroll";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 md:py-16 relative overflow-hidden" aria-labelledby="contact-title">
      {/* Éléments décoratifs avec parallaxe */}
      <ParallaxScroll strength={0.08} direction="up" className="absolute top-20 right-10 md:right-20 w-48 h-48">
        <div className="bg-primary/5 rounded-full w-full h-full blur-3xl"></div>
      </ParallaxScroll>
      
      <ParallaxScroll strength={0.1} direction="down" className="absolute -bottom-10 -left-10 w-64 h-64">
        <div className="bg-secondary/5 rounded-full w-full h-full blur-3xl"></div>
      </ParallaxScroll>
      
      <div className="absolute right-10 top-10 text-primary/10 animate-pulse-gentle">
        <MessageSquare size={120} />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <FadeInSection type="fade" className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Contact
          </span>
          <h2 id="contact-title" className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
            Prenez contact avec moi
          </h2>
          <p className="text-gray-600">
            N'hésitez pas à me contacter pour toute question ou demande d'information
          </p>
        </FadeInSection>

        {/* Coordonnées de contact */}
        <FadeInSection type="slide" direction="up" className="max-w-xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 text-center">Détails de contact</h3>
            <div className="space-y-4">
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="group-hover:font-medium">{siteConfig.contact.email}</span>
              </a>
              <a 
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all duration-300 group"
              >
                <Phone className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="group-hover:font-medium">{siteConfig.contact.phone}</span>
              </a>
              <a 
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all duration-300 group"
              >
                <SiFacebook className="h-5 w-5 text-[#1877F2] transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="group-hover:font-medium">Rejoignez-moi sur Facebook</span>
              </a>
            </div>
          </div>
        </FadeInSection>

        {/* Formulaire de contact */}
        <FadeInSection type="scale" delay={200} className="max-w-xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Formulaire de contact</h3>
            <ContactForm isHomepage={true} />
            
            {/* Note explicative sous le formulaire */}
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Remplissez le formulaire ci-dessus et cliquez sur le bouton "Envoyer" pour me contacter directement.</p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ContactSection;
