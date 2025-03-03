
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Edit, PlusCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/cms';
import { toast } from '@/hooks/use-toast';

const ServicesList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order');

      if (error) throw error;
      
      setServices(data || []);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du chargement des services: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_visible: !service.is_visible })
        .eq('id', service.id);

      if (error) throw error;
      
      // Update local state
      setServices(prev => 
        prev.map(s => s.id === service.id ? { ...s, is_visible: !s.is_visible } : s)
      );
      
      toast({
        title: 'Succès',
        description: `Service ${!service.is_visible ? 'visible' : 'masqué'} !`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la mise à jour: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const moveService = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === services.length - 1)
    ) {
      return; // Already at the extremity
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetService = services[targetIndex];
    
    // Swap orders
    const newServices = [...services];
    const tempOrder = newServices[currentIndex].order;
    newServices[currentIndex].order = newServices[targetIndex].order;
    newServices[targetIndex].order = tempOrder;
    
    // Swap positions in array for UI update
    [newServices[currentIndex], newServices[targetIndex]] = [newServices[targetIndex], newServices[currentIndex]];
    
    try {
      // Update in database
      const updates = [
        { id: services[currentIndex].id, order: newServices[currentIndex].order },
        { id: targetService.id, order: newServices[targetIndex].order }
      ];
      
      for (const update of updates) {
        const { error } = await supabase
          .from('services')
          .update({ order: update.order })
          .eq('id', update.id);
          
        if (error) throw error;
      }
      
      setServices(newServices);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du déplacement: ${error.message}`,
        variant: 'destructive',
      });
      // Revert the local change on error
      fetchServices();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des services</h1>
        <Link 
          to="/admin/services/new" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Ajouter un service
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Aucun service trouvé.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ordre
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Public
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visible
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span>{service.order}</span>
                      <div className="flex flex-col ml-2">
                        <button
                          onClick={() => moveService(service.id, 'up')}
                          disabled={index === 0}
                          className={`p-0.5 ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary'}`}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveService(service.id, 'down')}
                          disabled={index === services.length - 1}
                          className={`p-0.5 ${index === services.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary'}`}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{service.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {service.is_for_professionals ? 'Professionnels' : 'Particuliers'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleVisibility(service)}
                      className={`p-1 rounded-full ${service.is_visible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                    >
                      {service.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/services/${service.id}`}
                      className="text-primary hover:text-primary/80"
                    >
                      <Edit className="h-5 w-5 inline" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
