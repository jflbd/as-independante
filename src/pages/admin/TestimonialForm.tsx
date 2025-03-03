
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { Testimonial } from '@/types/cms';
import { Button } from '@/components/ui/button';
import { Star, Save, ArrowLeft, UploadCloud } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const TestimonialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    image_url: '',
    quote: '',
    stars: 5,
    is_visible: true,
    order: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      fetchTestimonial();
    } else {
      // Pour un nouveau témoignage, obtenir le prochain ordre
      getNextOrder();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      setFormData(data);
      
      if (data.image_url) {
        setImagePreview(data.image_url);
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger le témoignage',
        variant: 'destructive',
      });
      console.error('Erreur lors du chargement du témoignage:', error);
      navigate('/admin/testimonials');
    } finally {
      setLoading(false);
    }
  };

  const getNextOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('order')
        .order('order', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      const nextOrder = data.length > 0 ? data[0].order + 1 : 1;
      setFormData(prev => ({ ...prev, order: nextOrder }));
    } catch (error) {
      console.error('Erreur lors de la récupération du prochain ordre:', error);
      // Fallback to order 1 if there's an error
      setFormData(prev => ({ ...prev, order: 1 }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      is_visible: checked,
    });
  };

  const handleStarClick = (rating: number) => {
    setFormData({
      ...formData,
      stars: rating,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileName = `testimonial-${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage
      .from('testimonials')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from('testimonials')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      // Validate form data
      if (!formData.name || !formData.role || !formData.quote) {
        toast({
          title: 'Erreur',
          description: 'Veuillez remplir tous les champs obligatoires',
          variant: 'destructive',
        });
        return;
      }
      
      // Upload image if it exists
      let finalImageUrl = formData.image_url;
      
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }
      
      const testimonialData = {
        ...formData,
        image_url: finalImageUrl,
      };
      
      let response;
      
      if (isEditing) {
        // Update existing testimonial
        response = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', id)
          .select();
      } else {
        // Create new testimonial
        response = await supabase
          .from('testimonials')
          .insert(testimonialData)
          .select();
      }
      
      if (response.error) throw response.error;
      
      toast({
        title: 'Succès',
        description: isEditing 
          ? 'Le témoignage a été mis à jour avec succès' 
          : 'Le témoignage a été créé avec succès',
      });
      
      navigate('/admin/testimonials');
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue',
        variant: 'destructive',
      });
      console.error('Erreur lors de l\'enregistrement du témoignage:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/testimonials')}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nom *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="role">
              Rôle / Description *
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="quote">
            Témoignage *
          </label>
          <textarea
            id="quote"
            name="quote"
            value={formData.quote || ''}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Photo
            </label>
            <div className="flex items-center">
              {imagePreview && (
                <div className="mr-4">
                  <img 
                    src={imagePreview} 
                    alt="Aperçu" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud className="h-6 w-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Cliquez pour uploader une image</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Évaluation (nombre d'étoiles)
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleStarClick(rating)}
                  className="p-1 focus:outline-none"
                >
                  <Star 
                    className={`h-6 w-6 ${
                      rating <= (formData.stars || 5)
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="order">
              Ordre d'affichage
            </label>
            <input
              id="order"
              name="order"
              type="number"
              min="1"
              value={formData.order || 1}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Détermine l'ordre d'affichage. Les valeurs plus basses apparaissent en premier.
            </p>
          </div>
          
          <div>
            <label className="flex items-center space-x-2 mb-1 cursor-pointer">
              <Switch 
                checked={formData.is_visible} 
                onCheckedChange={handleSwitchChange} 
              />
              <span className="text-sm font-medium">
                {formData.is_visible ? 'Visible' : 'Masqué'}
              </span>
            </label>
            <p className="text-xs text-gray-500">
              Détermine si ce témoignage est visible sur le site.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/admin/testimonials')}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Mettre à jour' : 'Créer le témoignage'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
