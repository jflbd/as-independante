import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import RelatedLinks from '@/components/RelatedLinks';
import SEOSchema from '@/components/SEOSchema';
import Breadcrumb from '@/components/Breadcrumb';
import ShareButton from '@/components/ShareButton';
import { OptimizedImage } from '@/components/OptimizedImage';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { HtmlContent } from '@/utils/htmlContent';

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
 * Page d'article de blog individuelle pour présenter des contenus optimisés SEO
 */
export default function BlogArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Utiliser useEffect en dehors de la condition pour éviter les hooks conditionnels
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;
      try {
        const apiBase = resolveApiBase();
        const response = await fetch(`${apiBase}/api/blog-id?id=${encodeURIComponent(articleId)}`);
        if (!response.ok) {
          throw new Error('Article introuvable');
        }
        const data = await response.json();
        setArticle(data);
        setError('');
      } catch (e: any) {
        setError(e?.message || 'Erreur de chargement');
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, navigate]);
  
  if (loading) {
    return null;
  }

  if (!article) {
    return null;
  }
  
  // Le contenu est maintenant en HTML (depuis l'éditeur Quill)
  // Plus besoin de formatContent() pour convertir Markdown en HTML
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{article.title} | {siteConfig.title}</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <meta property="og:title" content={`${article.title} | ${siteConfig.title}`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteConfig.url}/blog/${article.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${siteConfig.url}/blog/${article.id}`} />
      </Helmet>
      
      <SEOSchema 
        pageType="ArticlePage"
        title={`${article.title} | ${siteConfig.title}`}
        description={article.excerpt}
        url={`${siteConfig.url}/blog/${article.id}`}
      />
      
      <NavBar />
      
      <div className="flex-grow pt-20 pb-12"> 
        <div className="container mx-auto px-4">
          {/* Fil d'Ariane */}
          <Breadcrumb />
          
          {/* Article principal */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* En-tête de l'article */}
            <div className="p-6 md:p-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-sm text-primary hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour au blog
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(parseISO(article.date), "d MMMM yyyy", { locale: fr })}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime} de lecture
                </span>
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {article.author}
                </span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-lg text-gray-700 mb-8 font-medium leading-relaxed">
                {article.excerpt}
              </p>
            </div>
            
            {/* Image de l'article - Améliorée pour la responsivité mobile */}
            <div className="w-full h-[200px] sm:h-[250px] md:h-[400px] bg-gray-200 relative overflow-hidden">
              {article.image ? (
                <OptimizedImage
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover object-center"
                  priority={true}
                  objectFit="cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image de l'article (à remplacer)
                </div>
              )}
            </div>
            
            {/* Contenu de l'article */}
            <div className="p-6 md:p-8">
              <HtmlContent html={article.content} className="prose-lg" />
              
              {/* Meta-données pour SEO */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span>Dernière mise à jour : {format(parseISO(article.date), "d MMMM yyyy", { locale: fr })}</span>
                </div>
                <ShareButton 
                  title={article.title}
                  url={`${siteConfig.url}/blog/${article.id}`}
                  description={article.excerpt}
                />
              </div>
            </div>
          </div>
          
          {/* Liens connexes */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8">
              <RelatedLinks 
                title="Articles en lien avec ce sujet" 
                links={article.relatedArticles.map(item => ({ text: item.title, url: item.url, description: item.description }))} 
              />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
