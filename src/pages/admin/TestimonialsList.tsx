
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { Testimonial } from '@/types/cms';
import { Edit, Trash, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) throw error;
      
      setTestimonials(data || []);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les témoignages',
        variant: 'destructive',
      });
      console.error('Erreur lors du chargement des témoignages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setTestimonials(testimonials.filter(item => item.id !== id));
      
      toast({
        title: 'Succès',
        description: 'Le témoignage a été supprimé avec succès',
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le témoignage',
        variant: 'destructive',
      });
      console.error('Erreur lors de la suppression du témoignage:', error);
    }
  };

  const toggleVisibility = async (testimonial: Testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_visible: !testimonial.is_visible })
        .eq('id', testimonial.id);
      
      if (error) throw error;
      
      setTestimonials(testimonials.map(item => 
        item.id === testimonial.id 
          ? { ...item, is_visible: !item.is_visible } 
          : item
      ));
      
      toast({
        title: 'Succès',
        description: `Le témoignage est maintenant ${!testimonial.is_visible ? 'visible' : 'masqué'}`,
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier la visibilité du témoignage',
        variant: 'destructive',
      });
      console.error('Erreur lors de la modification de la visibilité:', error);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des témoignages</h1>
        <Link to="/admin/testimonials/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un témoignage
          </Button>
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-lg">
          <p className="text-gray-600 mb-4">Aucun témoignage trouvé</p>
          <Link to="/admin/testimonials/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter votre premier témoignage
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Ordre</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="w-[120px]">Étoiles</TableHead>
                <TableHead className="w-[100px]">Statut</TableHead>
                <TableHead className="text-right w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>{testimonial.order}</TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleVisibility(testimonial)}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        testimonial.is_visible 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {testimonial.is_visible ? 'Visible' : 'Masqué'}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/admin/testimonials/${testimonial.id}`}>
                        <button className="p-1 rounded hover:bg-gray-100">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </button>
                      </Link>
                      <button 
                        className="p-1 rounded hover:bg-gray-100"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TestimonialsList;
