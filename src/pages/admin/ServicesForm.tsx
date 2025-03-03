
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Trash, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/cms';
import { toast } from '@/hooks/use-toast';

const ServicesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNewService = !id;
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState<Service>({
    id: '',
    title: '',
    description: '',
    icon: 'Lightbulb',
    is_for_professionals: false,
    is_visible: true,
    order: 0
  });

  // Available icons
  const availableIcons = [
    'Lightbulb', 'Users', 'FileText', 'ShieldCheck', 
    'Phone', 'Home', 'MessageSquare', 'Headphones'
  ];

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setService(data);
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du chargement du service: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setService(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (isNewService) {
        // Get max order to place new service at the end
        const { data: maxOrderData } = await supabase
          .from('services')
          .select('order')
          .order('order', { ascending: false })
          .limit(1);

        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order : 0;
        const newService = { ...service, order: maxOrder + 1 };
        
        result = await supabase
          .from('services')
          .insert([newService])
          .select();
      } else {
        result = await supabase
          .from('services')
          .update(service)
          .eq('id', id)
          .select();
      }

      const { error } = result;
      if (error) throw error;

      toast({
        title: 'Succès',
        description: `Service ${isNewService ? 'créé' : 'mis à jour'} avec succès !`,
      });
      navigate('/admin/services');
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
    if (!id || !window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Service supprimé avec succès !',
      });
      navigate('/admin/services');
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
          onClick={() => navigate('/admin/services')}
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour à la liste
        </button>
        <h1 className="text-2xl font-bold">
          {isNewService ? 'Ajouter un service' : 'Modifier le service'}
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
              value={service.title}
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
              value={service.description}
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
              value={service.icon}
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
              id="is_for_professionals"
              name="is_for_professionals"
              type="checkbox"
              checked={service.is_for_professionals}
              onChange={handleCheckboxChange}
              className="h-4 w-4"
            />
            <label htmlFor="is_for_professionals" className="font-medium">
              Service pour professionnels
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_visible"
              name="is_visible"
              type="checkbox"
              checked={service.is_visible}
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
              value={service.order}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {!isNewService && (
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

export default ServicesForm;
