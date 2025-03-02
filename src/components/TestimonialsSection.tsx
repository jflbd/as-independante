
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Durand",
    role: "Accompagnée pendant 6 mois",
    content: "Rachel m'a apporté un soutien incroyable dans mes démarches administratives après mon divorce. Grâce à son aide, j'ai pu obtenir toutes les aides auxquelles j'avais droit et reconstruire ma vie sereinement.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 2,
    name: "Thomas Leroy",
    role: "Accompagné pour une situation d'handicap",
    content: "J'étais perdu dans les démarches pour faire reconnaître mon handicap. Rachel a su m'orienter avec patience et professionnalisme. Je ne peux que la recommander pour son expertise et sa bienveillance.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 3,
    name: "Sophie Martin",
    role: "Accompagnée pour l'accès au logement",
    content: "Sans l'aide de Rachel, je n'aurais jamais réussi à trouver un logement adapté à ma situation. Elle a su m'écouter et m'accompagner tout au long du processus. Un grand merci pour sa disponibilité et son efficacité.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 4,
    name: "Jean Petit",
    role: "Accompagné pour une aide financière d'urgence",
    content: "Dans une situation critique financièrement, j'ai pu compter sur Rachel qui a su mobiliser rapidement les bons dispositifs. Son professionnalisme et sa connaissance du système social m'ont véritablement sauvé.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
];

const TestimonialsSection = () => {
  return (
    <section id="temoignages" className="py-16 bg-highlight/20 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30"></div>
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ce que disent mes clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences des personnes que j'ai accompagnées et comment mon intervention a pu les aider dans leurs démarches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 relative group"
            >
              <div className="absolute -top-4 -right-4 text-primary/10 transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity">
                <Quote size={60} />
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "h-4 w-4", 
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        )} 
                      />
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg text-primary">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{testimonial.role}</p>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
