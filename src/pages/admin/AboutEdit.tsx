
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Section } from '@/types/cms';
import { toast } from '@/hooks/use-toast';

const AboutEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutSections, setAboutSections] = useState<Section[]>([]);

  useEffect(() => {
    fetchAboutSections();
  }, []);

  const fetchAboutSections = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('type', 'about')
        .order('order');

      if (error) throw error;
      
      setAboutSections(data || []);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Erreur lors du chargement des sections: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (id: string, field: keyof Section, value: string | boolean) => {
    setAboutSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update each section one by one
      for (const section of aboutSections) {
        const { error } = await supabase
          .from('sections')
          .update({
            title: section.title,
            subtitle: section.subtitle,
            content: section.content,
            is_visible: section.is_visible
          })
          .eq('id', section.id);

        if (error) throw error;
      }
      
      toast({
        title: 'Succès',
        description: 'Sections À propos mises à jour avec succès !',
      });
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

  if (isLoading && aboutSections.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion de la section À propos</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {aboutSections.map((section) => (
          <div key={section.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{section.title || 'Section sans titre'}</h2>
            
            <div className="grid gap-6">
              <div className="grid gap-2">
                <label htmlFor={`title-${section.id}`} className="font-medium">
                  Titre
                </label>
                <input
                  id={`title-${section.id}`}
                  type="text"
                  value={section.title}
                  onChange={(e) => handleChange(section.id, 'title', e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor={`subtitle-${section.id}`} className="font-medium">
                  Sous-titre
                </label>
                <input
                  id={`subtitle-${section.id}`}
                  type="text"
                  value={section.subtitle}
                  onChange={(e) => handleChange(section.id, 'subtitle', e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor={`content-${section.id}`} className="font-medium">
                  Contenu
                </label>
                <textarea
                  id={`content-${section.id}`}
                  value={section.content}
                  onChange={(e) => handleChange(section.id, 'content', e.target.value)}
                  rows={6}
                  className="border rounded-md p-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id={`visible-${section.id}`}
                  type="checkbox"
                  checked={section.is_visible}
                  onChange={(e) => handleChange(section.id, 'is_visible', e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor={`visible-${section.id}`} className="font-medium">
                  Visible sur le site
                </label>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center"
            disabled={isLoading}
          >
            <Check className="mr-2 h-5 w-5" />
            {isLoading ? 'Chargement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutEdit;
