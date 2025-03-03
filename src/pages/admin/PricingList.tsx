
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Edit, PlusCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PricingOption } from '@/types/cms';
import { toast } from '@/hooks/use-toast';

const PricingList = () => {
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPricingOptions();
  }, []);

  const fetchPricingOptions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .order('order');

      if (error) throw error;
      
      setPricingOptions(data || []);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du chargement des tarifs: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = async (option: PricingOption) => {
    try {
      const { error } = await supabase
        .from('pricing')
        .update({ is_visible: !option.is_visible })
        .eq('id', option.id);

      if (error) throw error;
      
      // Update local state
      setPricingOptions(prev => 
        prev.map(p => p.id === option.id ? { ...p, is_visible: !p.is_visible } : p)
      );
      
      toast({
        title: 'Succès',
        description: `Tarif ${!option.is_visible ? 'visible' : 'masqué'} !`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la mise à jour: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const moveOption = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = pricingOptions.findIndex(p => p.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === pricingOptions.length - 1)
    ) {
      return; // Already at the extremity
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetOption = pricingOptions[targetIndex];
    
    // Swap orders
    const newOptions = [...pricingOptions];
    const tempOrder = newOptions[currentIndex].order;
    newOptions[currentIndex].order = newOptions[targetIndex].order;
    newOptions[targetIndex].order = tempOrder;
    
    // Swap positions in array for UI update
    [newOptions[currentIndex], newOptions[targetIndex]] = [newOptions[targetIndex], newOptions[currentIndex]];
    
    try {
      // Update in database
      const updates = [
        { id: pricingOptions[currentIndex].id, order: newOptions[currentIndex].order },
        { id: targetOption.id, order: newOptions[targetIndex].order }
      ];
      
      for (const update of updates) {
        const { error } = await supabase
          .from('pricing')
          .update({ order: update.order })
          .eq('id', update.id);
          
        if (error) throw error;
      }
      
      setPricingOptions(newOptions);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du déplacement: ${error.message}`,
        variant: 'destructive',
      });
      // Revert the local change on error
      fetchPricingOptions();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des tarifs</h1>
        <Link 
          to="/admin/pricing/new" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Ajouter un tarif
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : pricingOptions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Aucun tarif trouvé.</p>
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
                  Prix
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
              {pricingOptions.map((option, index) => (
                <tr key={option.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span>{option.order}</span>
                      <div className="flex flex-col ml-2">
                        <button
                          onClick={() => moveOption(option.id, 'up')}
                          disabled={index === 0}
                          className={`p-0.5 ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary'}`}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveOption(option.id, 'down')}
                          disabled={index === pricingOptions.length - 1}
                          className={`p-0.5 ${index === pricingOptions.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary'}`}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{option.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {option.price}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleVisibility(option)}
                      className={`p-1 rounded-full ${option.is_visible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                    >
                      {option.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/pricing/${option.id}`}
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

export default PricingList;
