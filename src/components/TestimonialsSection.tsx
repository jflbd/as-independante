
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Mère de famille",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote: "Rachel a été d'un soutien incroyable durant une période très difficile. Son professionnalisme et sa bienveillance m'ont aidée à traverser cette épreuve et à retrouver ma stabilité.",
      stars: 5
    },
    {
      id: 2,
      name: "Thomas Martin",
      role: "En recherche d'emploi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote: "Grâce à l'accompagnement de Rachel, j'ai pu démêler ma situation administrative complexe et accéder aux aides auxquelles j'avais droit. Son expertise a fait toute la différence.",
      stars: 5
    },
    {
      id: 3,
      name: "Sophie Leroux",
      role: "Assistante RH",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote: "En tant que professionnelle, je recommande vivement les services de Rachel. Sa collaboration avec notre équipe RH a permis d'améliorer considérablement notre approche du bien-être au travail.",
      stars: 5
    },
    {
      id: 4,
      name: "Jean Petit",
      role: "Retraité",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      quote: "À 67 ans, je me sentais perdu face aux démarches administratives. Rachel m'a guidé avec patience et efficacité. Aujourd'hui, ma situation est enfin régularisée.",
      stars: 5
    },
  ];

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="temoignages" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Ils me font confiance
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Témoignages de personnes accompagnées</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours d'expérience de personnes que j'ai eu le plaisir d'accompagner dans leur parcours.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Desktop testimonial slider */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-500 transform ${
                    index === activeIndex || index === (activeIndex + 1) % testimonials.length 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-95 hidden"
                  }`}
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="relative mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                        <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-10 space-x-4">
              <button 
                onClick={handlePrevious}
                className="p-2 rounded-full border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                aria-label="Témoignage précédent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                aria-label="Témoignage suivant"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile testimonial */}
          <div className="md:hidden">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Quote className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center mb-4">
                <div className="relative mr-3">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                    <div className="bg-green-500 w-2.5 h-2.5 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
                  <p className="text-gray-600 text-xs">{testimonials[activeIndex].role}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">"{testimonials[activeIndex].quote}"</p>
              
              <div className="flex justify-between mt-6">
                <button 
                  onClick={handlePrevious}
                  className="p-1.5 rounded-full border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label="Témoignage précédent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex space-x-1">
                  {testimonials.map((_, index) => (
                    <button 
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === activeIndex ? "bg-primary" : "bg-gray-300"
                      }`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Aller au témoignage ${index + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleNext}
                  className="p-1.5 rounded-full border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label="Témoignage suivant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
