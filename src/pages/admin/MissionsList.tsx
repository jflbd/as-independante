
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Edit, PlusCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Mission } from '@/types/cms';
import { toast } from '@/hooks/use-toast';

const MissionsList = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .order('order');

      if (error) throw error;
      
      setMissions(data || []);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du chargement des missions: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = async (mission: Mission) => {
    try {
      const { error } = await supabase
        .from('missions')
        .update({ is_visible: !mission.is_visible })
        .eq('id', mission.id);

      if (error) throw error;
      
      // Update local state
      setMissions(prev => 
        prev.map(m => m.id === mission.id ? { ...m, is_visible: !m.is_visible } : m)
      );
      
      toast({
        title: 'Succès',
        description: `Mission ${!mission.is_visible ? 'visible' : 'masquée'} !`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la mise à jour: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const moveMission = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = missions.findIndex(m => m.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === missions.length - 1)
    ) {
      return; // Already at the extremity
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetMission = missions[targetIndex];
    
    // Swap orders
    const newMissions = [...missions];
    const tempOrder = newMissions[currentIndex].order;
    newMissions[currentIndex].order = newMissions[targetIndex].order;
    newMissions[targetIndex].order = tempOrder;
    
    // Swap positions in array for UI update
    [newMissions[currentIndex], newMissions[targetIndex]] = [newMissions[targetIndex], newMissions[currentIndex]];
    
    try {
      // Update in database
      const updates = [
        { id: missions[currentIndex].id, order: newMissions[currentIndex].order },
        { id: targetMission.id, order: newMissions[targetIndex].order }
      ];
      
      for (const update of updates) {
        const { error } = await supabase
          .from('missions')
          .update({ order: update.order })
          .eq('id', update.id);
          
        if (error) throw error;
      }
      
      setMissions(newMissions);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du déplacement: ${error.message}`,
        variant: 'destructive',
      });
      // Revert the local change on error
      fetchMissions();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des missions</h1>
        <Link 
          to="/admin/missions/new" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Ajouter une mission
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : missions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Aucune mission trouvée.</p>
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
                  Visible
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {missions.map((mission, index) => (
                <tr key={mission.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span>{mission.order}</span>
                      <div className="flex flex-col ml-2">
                        <button
                          onClick={() => moveMission(mission.id, 'up')}
                          disabled={index === 0}
                          className={`p-0.5 ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary'}`}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveMission(mission.id, 'down')}
                          disabled={index === missions.length - 1}
                          className={`p-0.5 ${index === missions.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-primary'}`}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{mission.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleVisibility(mission)}
                      className={`p-1 rounded-full ${mission.is_visible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                    >
                      {mission.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/missions/${mission.id}`}
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

export default MissionsList;
