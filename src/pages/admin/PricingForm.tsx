
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Trash, ArrowLeft, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PricingOption } from '@/types/cms';
import { toast } from '@/hooks/use-toast';

const PricingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNewPricing = !id;
  const [isLoading, setIsLoading] = useState(false);
  const [pricing, setPricing] = useState<PricingOption>({
    id: '',
    title: '',
    price: '',
    features: [],
    is_visible: true,
    order: 0
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (id) {
      fetchPricing();
    }
  }, [id]);

  const fetchPricing = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setPricing(data);
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du chargement du tarif: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPricing(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPricing(prev => ({ ...prev, [name]: checked }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setPricing(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setPricing(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (isNewPricing) {
        // Get max order to place new pricing at the end
        const { data: maxOrderData } = await supabase
          .from('pricing')
          .select('order')
          .order('order', { ascending: false })
          .limit(1);

        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order : 0;
        const newPricing = { ...pricing, order: maxOrder + 1 };
        
        result = await supabase
          .from('pricing')
          .insert([newPricing])
          .select();
      } else {
        result = await supabase
          .from('pricing')
          .update(pricing)
          .eq('id', id)
          .select();
      }

      const { error } = result;
      if (error) throw error;

      toast({
        title: 'Succès',
        description: `Tarif ${isNewPricing ? 'créé' : 'mis à jour'} avec succès !`,
      });
      navigate('/admin/pricing');
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
    if (!id || !window.confirm('Êtes-vous sûr de vouloir supprimer ce tarif ?')) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('pricing')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Tarif supprimé avec succès !',
      });
      navigate('/admin/pricing');
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
          onClick={() => navigate('/admin/pricing')}
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour à la liste
        </button>
        <h1 className="text-2xl font-bold">
          {isNewPricing ? 'Ajouter un tarif' : 'Modifier le tarif'}
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
              value={pricing.title}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="price" className="font-medium">
              Prix
            </label>
            <input
              id="price"
              name="price"
              type="text"
              value={pricing.price}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
              placeholder="ex: 50€ / heure, Sur devis, etc."
            />
          </div>

          <div className="grid gap-2">
            <label className="font-medium">Caractéristiques</label>
            <div className="flex flex-col gap-2">
              {pricing.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...pricing.features];
                      newFeatures[index] = e.target.value;
                      setPricing(prev => ({ ...prev, features: newFeatures }));
                    }}
                    className="border rounded-md p-2 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Ajouter une caractéristique"
                  className="border rounded-md p-2 flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_visible"
              name="is_visible"
              type="checkbox"
              checked={pricing.is_visible}
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
              value={pricing.order}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {!isNewPricing && (
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

export default PricingForm;
