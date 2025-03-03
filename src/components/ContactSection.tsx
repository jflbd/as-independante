import { useState } from "react";
import { Mail, Phone, Facebook } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
      // Créer l'URL pour le service EmailJS
      const serviceID = "default_service"; // Remplacer par votre ID de service
      const templateID = "template_contact"; // Remplacer par votre ID de template
      const userID = "your_emailjs_user_id"; // Remplacer par votre ID utilisateur EmailJS
      
      const emailData = {
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: {
          to_email: "rachel.gervais@as-independante.fr",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          subject: `Message de contact de ${formData.name}`
        }
      };
      
      console.log("Envoi d'email à: rachel.gervais@as-independante.fr");
      console.log("Données:", emailData);
      
      // Simuler l'envoi d'email avec un délai (à remplacer par l'appel API réel)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Quand vous êtes prêt à implémenter l'envoi réel, utilisez:
      // const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData)
      // });
      
      // Show success toast
      toast({
        title: "Message envoyé !",
        description: "Votre message a été envoyé avec succès. Je vous répondrai dès que possible.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
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
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="group-hover:font-medium">rachel.gervais@as-independante.fr</span>
              </a>
              <a 
                href="tel:0763907845" 
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all duration-300 group"
              >
                <Phone className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="group-hover:font-medium">07 63 90 78 45</span>
              </a>
              <a 
                href="https://www.facebook.com/groups/508874659843806" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 text-gray-600 hover:text-primary hover:bg-primary/10 py-2 px-4 rounded-md transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="group-hover:font-medium">Rejoignez-moi sur Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
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
            <div>
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
            <div>
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
              className="btn-primary w-full py-3 px-6 relative"
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
      </div>
    </section>
  );
};

export default ContactSection;
