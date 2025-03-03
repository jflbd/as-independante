
import { useEffect, useState } from "react";
import { 
  ShieldCheck, Users, Lightbulb, Headphones, 
  MessageSquare, Home, Heart, Star 
} from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { supabase } from "@/lib/supabase";
import { Mission } from "@/types/cms";

const iconComponents: Record<string, React.ElementType> = {
  MessageSquare,
  Headphones,
  Users,
  Home,
  Lightbulb,
  ShieldCheck,
  Heart,
  Star
};

const MissionsSection = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const { data, error } = await supabase
          .from('missions')
          .select('*')
          .eq('is_visible', true)
          .order('order');

        if (error) throw error;
        
        setMissions(data || []);
      } catch (error: any) {
        console.error('Error fetching missions:', error.message);
        setError("Impossible de charger les missions");
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  const values = [
    { icon: <MessageSquare className="h-8 w-8 text-primary" />, label: "INFORMATION" },
    { icon: <Headphones className="h-8 w-8 text-primary" />, label: "ECOUTE" },
    { icon: <Users className="h-8 w-8 text-primary" />, label: "SOUTIEN" },
    { icon: <Home className="h-8 w-8 text-primary" />, label: "ACCUEIL" },
    { icon: <Lightbulb className="h-8 w-8 text-primary" />, label: "CONSEIL" },
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, label: "SECRET PROFESSIONNEL" },
  ];

  if (loading) {
    return (
      <section id="missions" className="py-12 md:py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="missions" className="py-12 md:py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center text-red-500 py-10">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="missions" className="py-12 md:py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Mon approche
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Mes missions
          </h2>
          <p className="text-gray-600 mb-8">
            En fonction de votre situation, je vous propose un accompagnement social global, basé sur une relation bienveillante et de confiance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto mb-12">
          <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md">
            {missions.map((mission) => {
              const IconComponent = iconComponents[mission.icon] || MessageSquare;
              return (
                <div key={mission.id} className="mb-6 last:mb-0">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary/10 p-2 rounded-full">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{mission.title}</h3>
                      <p className="text-gray-700">{mission.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full z-0"></div>
            <div className="aspect-square w-full max-w-md relative z-10 overflow-hidden rounded-lg shadow-lg">
              <OptimizedImage 
                src="/lovable-uploads/76256a4b-071d-489c-8415-c7a0582c6483.png"
                alt="Accompagnement familial protecteur" 
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-3 bg-primary/10 p-3 rounded-full">
                {value.icon}
              </div>
              <h3 className="font-bold text-gray-800">{value.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionsSection;
