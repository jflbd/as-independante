
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Trash, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Mission } from '@/types/cms';
import { toast } from '@/hooks/use-toast';

const MissionsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNewMission = !id;
  const [isLoading, setIsLoading] = useState(false);
  const [mission, setMission] = useState<Mission>({
    id: '',
    title: '',
    description: '',
    icon: 'MessageSquare',
    is_visible: true,
    order: 0
  });

  // Available icons
  const availableIcons = [
    'MessageSquare', 'Headphones', 'Users', 'Home',
    'Lightbulb', 'ShieldCheck', 'Heart', 'Star'
  ];

  useEffect(() => {
    if (id) {
      fetchMission();
    }
  }, [id]);

  const fetchMission = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setMission(data);
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du chargement de la mission: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMission(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setMission(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (isNewMission) {
        // Get max order to place new mission at the end
        const { data: maxOrderData } = await supabase
          .from('missions')
          .select('order')
          .order('order', { ascending: false })
          .limit(1);

        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order : 0;
        const newMission = { ...mission, order: maxOrder + 1 };
        
        result = await supabase
          .from('missions')
          .insert([newMission])
          .select();
      } else {
        result = await supabase
          .from('missions')
          .update(mission)
          .eq('id', id)
          .select();
      }

      const { error } = result;
      if (error) throw error;

      toast({
        title: 'Succès',
        description: `Mission ${isNewMission ? 'créée' : 'mise à jour'} avec succès !`,
      });
      navigate('/admin/missions');
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors de l'enregistrement: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('missions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Mission supprimée avec succès !',
      });
      navigate('/admin/missions');
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors de la suppression: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/admin/missions')}
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour à la liste
        </button>
        <h1 className="text-2xl font-bold">
          {isNewMission ? 'Ajouter une mission' : 'Modifier la mission'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="title" className="font-medium">
              Titre
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={mission.title}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={mission.description}
              onChange={handleChange}
              required
              rows={4}
              className="border rounded-md p-2"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="icon" className="font-medium">
              Icône
            </label>
            <select
              id="icon"
              name="icon"
              value={mission.icon}
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              {availableIcons.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_visible"
              name="is_visible"
              type="checkbox"
              checked={mission.is_visible}
              onChange={handleCheckboxChange}
              className="h-4 w-4"
            />
            <label htmlFor="is_visible" className="font-medium">
              Visible sur le site
            </label>
          </div>

          <div className="grid gap-2">
            <label htmlFor="order" className="font-medium">
              Ordre d'affichage
            </label>
            <input
              id="order"
              name="order"
              type="number"
              value={mission.order}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {!isNewMission && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
              disabled={isLoading}
            >
              <Trash className="mr-2 h-5 w-5" />
              Supprimer
            </button>
          )}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center ml-auto"
            disabled={isLoading}
          >
            <Check className="mr-2 h-5 w-5" />
            {isLoading ? 'Chargement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MissionsForm;
