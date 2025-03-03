
import { useState, useEffect } from "react";
import { 
  Lightbulb, Users, FileText, ShieldCheck, 
  Phone, Home, MessageSquare, Headphones 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/cms";

const iconComponents: Record<string, React.ElementType> = {
  Lightbulb,
  Users,
  FileText,
  ShieldCheck,
  Phone,
  Home,
  MessageSquare,
  Headphones
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_visible', true)
          .order('order');

        if (error) throw error;
        
        setServices(data || []);
      } catch (error: any) {
        console.error('Error fetching services:', error.message);
        setError("Impossible de charger les services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Separate services into two categories
  const individualServices = services.filter(service => !service.is_for_professionals);
  const professionalServices = services.filter(service => service.is_for_professionals);

  const renderService = (service: Service) => {
    const IconComponent = iconComponents[service.icon] || Lightbulb;
    
    return (
      <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 animate-fade-up">
        <div className="bg-primary/10 p-3 w-16 h-16 flex items-center justify-center rounded-full mb-4">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="services" className="py-12 md:py-16 bg-gray-50">
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
      <section id="services" className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center text-red-500 py-10">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            Services
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4">
            Mes services
          </h2>
          <p className="text-gray-600">
            Je propose un accompagnement social personnalisé, adapté à vos besoins et à votre situation.
          </p>
        </div>

        {individualServices.length > 0 && (
          <>
            <h3 className="text-xl font-bold mb-6 text-center">Pour les particuliers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {individualServices.map(renderService)}
            </div>
          </>
        )}

        {professionalServices.length > 0 && (
          <>
            <h3 className="text-xl font-bold mb-6 text-center">Pour les professionnels</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {professionalServices.map(renderService)}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
