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
import { blogArticles } from '@/data/blogArticles';

/**
 * Page d'article de blog individuelle pour présenter des contenus optimisés SEO
 */
function BlogArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const article = blogArticles.find(a => a.id === articleId);
  
  // Utiliser useEffect en dehors de la condition pour éviter les hooks conditionnels
  useEffect(() => {
    if (!article) {
      navigate('/404', { replace: true });
    }
  }, [article, navigate]);
  
  if (!article) {
    return null;
  }
  
  // Transformation du contenu Markdown en HTML
  const formatContent = () => {
    if (!article.content) return '';
    
    let formattedContent = article.content;
    
    // Remplacer les titres - traitement dans l'ordre de spécificité (du + au - spécifique)
    // Convertir d'abord les H4 (####), puis H3 (###), puis H2 (##) pour éviter les conflits
    formattedContent = formattedContent.replace(/#### ([^\n]+)/g, '<h4 class="text-lg font-semibold mt-5 mb-2 text-gray-800">$1</h4>');
    formattedContent = formattedContent.replace(/### ([^\n]+)/g, '<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">$1</h3>');
    formattedContent = formattedContent.replace(/## ([^\n]+)/g, '<h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">$1</h2>');
    
    // Remplacer les paragraphes (mais pas ceux qui sont déjà dans des balises HTML)
    formattedContent = formattedContent.replace(/(?<!>)(?<!\n)\n(?!\n)([^<\n][^\n]*?)(?=\n|$)/gm, '<p class="mb-4 text-gray-700">$1</p>');
    
    // Remplacer les listes (amélioration du traitement des listes à puces)
    // Identifier les groupes de lignes commençant par des tirets
    let inList = false;
    const lines = formattedContent.split('\n');
    const processedLines = [];
    let currentListItems = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.trim().startsWith('- ')) {
        // C'est un item de liste
        inList = true;
        const itemText = line.trim().substring(2);
        currentListItems.push(`<li class="mb-1">${itemText}</li>`);
      } else {
        // Ce n'est pas un item de liste
        if (inList) {
          // Nous venons de terminer une liste, ajoutons-la aux lignes traitées
          processedLines.push(`<ul class="list-disc pl-5 mb-5 space-y-1 text-gray-700">${currentListItems.join('')}</ul>`);
          currentListItems = [];
          inList = false;
        }
        processedLines.push(line);
      }
    }
    
    // S'il reste une liste en cours, ajoutons-la
    if (inList) {
      processedLines.push(`<ul class="list-disc pl-5 mb-5 space-y-1 text-gray-700">${currentListItems.join('')}</ul>`);
    }
    
    formattedContent = processedLines.join('\n');
    
    return formattedContent;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{article.title} | {siteConfig.title}</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        
        {/* OpenGraph amélioré pour les partages sur les réseaux sociaux */}
        <meta property="og:title" content={`${article.title} | ${siteConfig.title}`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteConfig.url}/blog/${article.id}`} />
        <meta property="og:site_name" content={siteConfig.name} />
        {article.image && <meta property="og:image" content={article.image.startsWith('http') ? article.image : `${siteConfig.url}${article.image}`} />}
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter Cards améliorées */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${article.title} | ${siteConfig.title}`} />
        <meta name="twitter:description" content={article.excerpt} />
        {article.image && <meta name="twitter:image" content={article.image.startsWith('http') ? article.image : `${siteConfig.url}${article.image}`} />}
        
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
                  {article.date}
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
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image de l'article (à remplacer)
                </div>
              )}
            </div>
            
            {/* Contenu de l'article */}
            <div className="p-6 md:p-8">
              <article 
                className="prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: formatContent() }} 
              />
              
              {/* Meta-données pour SEO */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span>Dernière mise à jour : {article.date}</span>
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

export default BlogArticlePage;
