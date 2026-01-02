import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Edit2 } from 'lucide-react';

// Utilise l'origine du site si VITE_API_URL n'est pas fourni (évite localhost en prod)
const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? window.location.origin : '');
const DATA_URL = '/blog-data.json';

export const BlogAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  // Récupérer les articles (lecture en statique pour afficher la liste même sans API)
  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles();
    }
  }, [isAuthenticated]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(DATA_URL);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication - in production, use proper JWT
    if (password) {
      setIsAuthenticated(true);
      setPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `${API_URL}/api/blog/${editingId}`
        : `${API_URL}/api/blog`;

      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      await fetchArticles();
      setFormData({ title: '', excerpt: '', content: '', image: '', tags: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      tags: article.tags.join(', ')
    });
    setEditingId(article.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article?')) return;

    try {
      const response = await fetch(`${API_URL}/api/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      await fetchArticles();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Admin Blog</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Mot de passe admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Connexion</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestion des articles</h1>
          <Button onClick={() => setIsAuthenticated(false)}>Déconnexion</Button>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Modifier l\'article' : 'Nouvel article'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Titre"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <Input
              placeholder="Extrait"
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              required
            />
            <textarea
              placeholder="Contenu (Markdown)"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
              className="w-full p-3 border rounded-lg h-48"
            />
            <Input
              placeholder="URL de l'image"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <Input
              placeholder="Tags (séparés par des virgules)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Créer'}
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', excerpt: '', content: '', image: '', tags: '' });
                  }}
                >
                  Annuler
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Liste des articles */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Titre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Tags</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{article.title}</td>
                  <td className="px-6 py-3">{article.date}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {article.tags.map(tag => (
                        <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(article)}
                      className="flex items-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" /> Éditer
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
