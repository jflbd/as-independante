import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Calendar, Clock, Tag, BookOpen, ChevronRight } from 'lucide-react';
import SEOSchema from '@/components/SEOSchema';

// Articles disponibles
const articles = [
  {
    id: 'role-assistante-sociale-independante',
    title: 'Le rôle d\'une assistante sociale indépendante en Normandie',
    date: '11 mai 2025',
    author: 'Rachel Gervais',
    readTime: '5 min',
    excerpt: 'Découvrez le rôle spécifique d\'une assistante sociale libérale et comment elle peut vous accompagner dans vos démarches sociales en Normandie.',
    image: '/assets/images/blog/assistante-sociale-independante-role.jpg',
    tags: ['assistante sociale libérale', 'Normandie', 'accompagnement social'],
  },
  {
    id: 'aides-sociales-normandie',
    title: 'Guide des aides sociales disponibles en Normandie',
    date: '10 mai 2025',
    author: 'Rachel Gervais',
    readTime: '7 min',
    excerpt: 'Panorama complet des dispositifs d\'aide sociale accessibles en région normande : allocations, subventions, et accompagnements disponibles.',
    image: '/assets/images/blog/aides-sociales-normandie.jpg',
    tags: ['aides sociales', 'Normandie', 'allocations', 'dispositifs'],
  },
  {
    id: 'preparer-rendez-vous-assistante-sociale',
    title: 'Comment se préparer à un rendez-vous avec une assistante sociale',
    date: '9 mai 2025',
    author: 'Rachel Gervais',
    readTime: '4 min',
    excerpt: 'Conseils pratiques pour préparer votre premier rendez-vous avec une assistante sociale et optimiser cette rencontre.',
    image: '/assets/images/blog/preparer-rendez-vous-assistante-sociale.jpg',
    tags: ['rendez-vous', 'préparation', 'consultation sociale'],
  }
];

/**
 * Page d'index du blog avec articles optimisés pour le SEO
 */
const BlogIndexPage: React.FC = () => {
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
          
          {/* Liste des articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/blog/${article.id}`} className="block">
                  <div className="h-52 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Image de l'article (à remplacer)
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={`/blog/${article.id}`} className="block">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex justify-between text-gray-600 text-xs">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
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
