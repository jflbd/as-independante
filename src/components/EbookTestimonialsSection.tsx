import { Star, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import FadeInSection from "./animations/FadeInSection";
import ParallaxScroll from "./animations/ParallaxScroll";
import { ebookTestimonials } from "@/config/testimonialsConfig";

const EbookTestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials = ebookTestimonials;

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-section-light overflow-hidden" id="ebook-testimonials">
      <ParallaxScroll strength={0.05} direction="right" className="absolute right-0 top-1/4 w-48 h-48">
        <div className="bg-primary/5 rounded-full w-full h-full blur-2xl"></div>
      </ParallaxScroll>
      
      <ParallaxScroll strength={0.08} direction="left" className="absolute left-0 bottom-1/4 w-64 h-64">
        <div className="bg-accent/5 rounded-full w-full h-full blur-2xl"></div>
      </ParallaxScroll>
      
      <div className="container px-4 mx-auto">
        <FadeInSection type="fade" className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Ils ont déjà acheté le guide
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ce qu'en disent les lecteurs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours d'expérience de travailleurs sociaux qui ont utilisé ce guide pour réussir leur installation en libéral.
          </p>
        </FadeInSection>
        
        <FadeInSection type="scale" className="max-w-5xl mx-auto relative">
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
                        <div className="relative mr-4 group">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 transition-transform duration-300 group-hover:scale-105"
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
                      <p className="text-gray-700 italic relative z-10 text-lg leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-colors z-20 hover:scale-110 active:scale-95 duration-200"
              aria-label="Témoignage précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-colors z-20 hover:scale-110 active:scale-95 duration-200"
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
                  index === activeIndex ? "bg-primary w-8" : "bg-gray-300 hover:bg-primary/40"
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
              } hover:bg-primary/20`}
            >
              {isAutoPlaying ? "Défilement automatique activé" : "Défilement automatique désactivé"}
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default EbookTestimonialsSection;