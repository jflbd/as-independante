
import { Star, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
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

  const handlePrevious = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Resume auto-play after user inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  return (
    <section id="temoignages" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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
        
        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial cards carousel */}
          <div className="relative px-4 py-10">
            <div 
              className="transition-all duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden transform transition-all duration-500 hover:shadow-xl">
                      {/* Background decoration */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full"></div>
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 rounded-full"></div>
                      
                      {/* Quote icon */}
                      <div className="absolute top-6 right-6 text-primary/20">
                        <Quote className="h-10 w-10" />
                      </div>
                      
                      <div className="flex items-center mb-6 relative z-10">
                        <div className="relative mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
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
                      <p className="text-gray-700 italic relative z-10 text-lg">"{testimonial.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-colors z-20"
              aria-label="Témoignage précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-colors z-20"
              aria-label="Témoignage suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Pagination indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary w-8" : "bg-gray-300"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)} 
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                isAutoPlaying 
                  ? "bg-primary/10 text-primary" 
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {isAutoPlaying ? "Défilement automatique activé" : "Défilement automatique désactivé"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
