import { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { SiFacebook } from "@icons-pack/react-simple-icons";
import { toast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/siteConfig";
import FadeInSection from "./animations/FadeInSection";
import ParallaxScroll from "./animations/ParallaxScroll";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Configuration pour FormSubmit
      const formElement = e.target as HTMLFormElement;
      
      // Créer un élément caché pour l'email de destination
      const destinationEmail = document.createElement("input");
      destinationEmail.type = "hidden";
      destinationEmail.name = "_to";
      destinationEmail.value = siteConfig.contact.email;
      formElement.appendChild(destinationEmail);
      
      // Élément pour le sujet de l'email
      const subjectField = document.createElement("input");
      subjectField.type = "hidden";
      subjectField.name = "_subject";
      subjectField.value = `Message de contact de ${formData.name}`;
      formElement.appendChild(subjectField);
      
      // Ne pas rediriger après soumission, simplement afficher un toast
      const redirectField = document.createElement("input");
      redirectField.type = "hidden";
      redirectField.name = "_captcha";
      redirectField.value = "false";
      formElement.appendChild(redirectField);
      
      // Ajouter également _next pour empêcher la redirection
      const nextField = document.createElement("input");
      nextField.type = "hidden";
      nextField.name = "_next";
      nextField.value = "false";
      formElement.appendChild(nextField);
      
      // Log les données avant envoi
      console.log(`Envoi d'email à: ${siteConfig.contact.email}`);
      console.log("Données:", formData);
      
      // Définir l'action du formulaire vers FormSubmit
      formElement.action = `https://formsubmit.co/${siteConfig.contact.email}`;
      formElement.method = "POST";
      
      // Soumettre le formulaire via AJAX pour éviter la redirection
      const formDataToSend = new FormData(formElement);
      await fetch(formElement.action, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Afficher un toast de succès
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error) {
      // Show error toast
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive"
      });
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
                  placeholder="Votre nom"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
                  placeholder="votre@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-300"
                  rows={4}
                  placeholder="Votre message"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3 px-6 relative hover:scale-[1.02] active:scale-[0.98] transition-transform"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="opacity-0">Envoyer</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  </>
                ) : "Envoyer"}
              </button>
            </form>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ContactSection;
