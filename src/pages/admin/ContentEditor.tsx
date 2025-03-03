
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { SiteContent } from '@/types/cms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

const ContentEditor = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .single();
        
        if (error) throw error;
        
        setContent(data);
      } catch (error: any) {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger le contenu du site',
          variant: 'destructive',
        });
        console.error('Erreur lors du chargement du contenu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (content) {
      setContent({
        ...content,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    if (!content) return;
    
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('site_content')
        .update(content)
        .eq('id', content.id);
      
      if (error) throw error;
      
      toast({
        title: 'Succès',
        description: 'Le contenu du site a été mis à jour avec succès',
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le contenu du site',
        variant: 'destructive',
      });
      console.error('Erreur lors de la mise à jour du contenu:', error);
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

  if (!content) {
    return (
      <div className="text-center p-6 bg-red-50 text-red-600 rounded-lg">
        Aucun contenu trouvé. Veuillez initialiser le contenu dans la base de données.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Édition du contenu du site</h1>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-primary hover:bg-primary/90"
        >
          {saving ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="w-full justify-start mb-6 overflow-x-auto whitespace-nowrap">
          <TabsTrigger value="hero">Accueil</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="pricing">Tarifs</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Section d'accueil</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre principal</label>
                <input
                  type="text"
                  name="hero_title"
                  value={content.hero_title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <textarea
                  name="hero_subtitle"
                  value={content.hero_subtitle || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Section À propos</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  name="about_title"
                  value={content.about_title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <input
                  type="text"
                  name="about_subtitle"
                  value={content.about_subtitle || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Contenu</label>
                <textarea
                  name="about_content"
                  value={content.about_content || ''}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Section Services</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  name="services_title"
                  value={content.services_title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <textarea
                  name="services_subtitle"
                  value={content.services_subtitle || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Section Témoignages</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  name="testimonials_title"
                  value={content.testimonials_title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <textarea
                  name="testimonials_subtitle"
                  value={content.testimonials_subtitle || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="missions" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Section Missions</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  name="missions_title"
                  value={content.missions_title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <textarea
                  name="missions_subtitle"
                  value={content.missions_subtitle || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Section Tarifs</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  name="pricing_title"
                  value={content.pricing_title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <textarea
                  name="pricing_subtitle"
                  value={content.pricing_subtitle || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Section Contact</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  name="contact_title"
                  value={content.contact_title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <textarea
                  name="contact_subtitle"
                  value={content.contact_subtitle || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentEditor;
