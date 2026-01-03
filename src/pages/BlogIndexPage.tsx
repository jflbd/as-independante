import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Calendar, Clock, Tag, BookOpen, ChevronRight } from 'lucide-react';
import SEOSchema from '@/components/SEOSchema';
import LocalSEOCities from '@/components/LocalSEOCities';
import { OptimizedImage } from '@/components/OptimizedImage';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { stripHtmlTags, truncateHtml } from '@/utils/htmlContent';

// Calcule la base API : VITE_API_URL > origin et mappe le port Vite 5173 vers l'API locale 3000
const resolveApiBase = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window === 'undefined') return '';
  try {
    const url = new URL(window.location.href);
    if (url.port === '5173') {
      return `${url.protocol}//${url.hostname}:3000`;
    }
    return url.origin;
  } catch (e) {
    return '';
  }
};

/**
 * Page d'index du blog avec articles optimisés pour le SEO
 */
const BlogIndexPage: React.FC = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 9;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiBase = resolveApiBase();
        const response = await fetch(`${apiBase}/api/blog`);
        const data = await response.json();
        // tri anti-chronologique (garde par sécurité si l'API ne trie pas)
        setArticles(
          (data || []).slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const haystack = `${article.title} ${article.excerpt || ''} ${(article.content || '')} ${
      article.tags ? article.tags.join(' ') : ''
    }`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const paginatedArticles = filteredArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Blog | {siteConfig.title}</title>
        <meta name="description" content="Articles et ressources sur l'accompagnement social en Normandie. Informations sur les aides sociales, conseils pratiques et actualités du secteur social." />
        <meta name="keywords" content="blog assistante sociale, ressources sociales, aides Normandie, conseils démarches administratives" />
        <meta property="og:title" content={`Blog | ${siteConfig.title}`} />
        <meta property="og:description" content="Articles et ressources sur l'accompagnement social en Normandie. Informations sur les aides sociales, conseils pratiques et actualités du secteur social." />
        <meta property="og:url" content={`${siteConfig.url}/blog`} />
        <link rel="canonical" href={`${siteConfig.url}/blog`} />
      </Helmet>
      
      <SEOSchema 
        pageType="WebPage"
        title={`Blog | ${siteConfig.title}`}
        description="Articles et ressources sur l'accompagnement social en Normandie. Informations sur les aides sociales, conseils pratiques et actualités du secteur social."
        url={`${siteConfig.url}/blog`}
      />
      
      <NavBar />
      
      <div className="flex-grow pt-20 pb-12"> 
        <div className="container mx-auto px-4">
          {/* Fil d'Ariane */}
          <nav className="flex py-3 text-gray-600 text-sm mb-2" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-primary">
                  Accueil
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-gray-500">Blog</span>
                </div>
              </li>
            </ol>
          </nav>
          
          {/* En-tête du blog */}
          <header className="mb-10 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
              Ressources pour vous accompagner
            </h1>
            <p className="text-xl text-gray-600">
              Articles, guides et conseils pratiques pour vous aider dans vos démarches sociales en Normandie
            </p>
          </header>
          
          {/* Barre de recherche */}
          <div className="max-w-xl mx-auto mb-8">
            <input
              type="search"
              placeholder="Rechercher un article (titre, contenu, tags)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Liste des articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-8">Chargement des articles...</div>
            ) : paginatedArticles.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-600">Aucun article disponible pour le moment.</div>
            ) : (
              paginatedArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                <Link to={`/blog/${article.id}`} className="block">
                  <div className="h-40 sm:h-48 md:h-52 bg-gray-200 relative overflow-hidden">
                    {article.image ? (
                      <OptimizedImage
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover object-center"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Image de l'article (à remplacer)
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-5 flex flex-col h-full">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={`/blog/${article.id}`} className="block">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-primary transition-colors">
                      {stripHtmlTags(article.title)}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {truncateHtml(article.excerpt, 200)}
                  </p>
                  
                  <div className="flex justify-between text-gray-600 text-xs pt-2 mt-auto border-t border-gray-100">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(parseISO(article.date), "d MMMM yyyy", { locale: fr })}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredArticles.length > 0 && (
            <div className="mt-10 flex items-center justify-between flex-wrap gap-3">
              <span className="text-sm text-gray-600">
                Page {page} sur {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Précédent
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
          
          {/* Message d'encouragement */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-primary/5 p-6 rounded-lg">
              <BookOpen className="mx-auto h-10 w-10 text-primary mb-3" />
              <h2 className="text-xl font-semibold mb-2">Vous avez une question spécifique ?</h2>
              <p className="text-gray-700 mb-4">
                Ces articles sont régulièrement mis à jour pour vous offrir les informations les plus pertinentes concernant l'accompagnement social en Normandie.
              </p>
              <Link 
                to="/#contact" 
                className="inline-block bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Me contacter
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogIndexPage;
