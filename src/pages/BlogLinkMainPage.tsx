import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import SEOSchema from '@/components/SEOSchema';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';

/**
 * Page d'accueil du blog optimisée pour le SEO
 */
const BlogLinkMainPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blog | {siteConfig.title}</title>
        <meta name="description" content="Ressources et articles sur l'accompagnement social en Normandie par Rachel Gervais, assistante sociale indépendante. Conseils pratiques, informations sur les aides et dispositifs sociaux." />
        <meta name="keywords" content="blog assistante sociale, ressources sociales, aides normandie, démarches administratives, conseils sociaux" />
        <link rel="canonical" href={`${siteConfig.url}/blog`} />
      </Helmet>

      <SEOSchema
        pageType="AboutPage"
        title="Blog | Rachel Gervais - Assistante Sociale Indépendante"
        description="Ressources et articles sur l'accompagnement social en Normandie par Rachel Gervais, assistante sociale indépendante. Conseils pratiques, informations sur les aides et dispositifs sociaux."
        url={`${siteConfig.url}/blog`}
      />

      <NavBar />

      <main className="flex-grow 0 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Blog en cours de lancement
              </h1>
              
              <p className="text-lg text-gray-700 mb-6">
                Un espace dédié aux ressources et informations sur l'accompagnement social en Normandie sera bientôt disponible à cette adresse.
              </p>
              
              <p className="text-lg text-gray-700 mb-6">
                Vous y trouverez des articles détaillés sur :
              </p>
              
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Les aides sociales disponibles en Normandie</li>
                <li>Comment préparer vos démarches administratives</li>
                <li>Le rôle d'une assistante sociale indépendante</li>
                <li>Des conseils pour les situations sociales complexes</li>
                <li>Des informations sur les droits et dispositifs d'aide</li>
              </ul>
              
              <p className="text-lg text-gray-700 mb-8">
                En attendant, n'hésitez pas à consulter les autres sections du site pour découvrir mes services et modalités d'accompagnement.
              </p>
              
              <div className="mt-8">
                <Link 
                  to="/#contact"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Me contacter
                </Link>
                
                <Link 
                  to="/"
                  className="inline-block ml-4 px-6 py-3 text-primary hover:underline"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Prochains sujets du blog</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800">Le rôle d'une assistante sociale indépendante</h3>
                <p className="text-sm text-gray-600 mt-1">Découvrez comment un accompagnement personnalisé peut vous aider dans vos démarches</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800">Guide des aides sociales en Normandie</h3>
                <p className="text-sm text-gray-600 mt-1">Panorama des dispositifs d'aide disponibles dans la région normande</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800">Préparer un rendez-vous avec une assistante sociale</h3>
                <p className="text-sm text-gray-600 mt-1">Conseils pratiques pour optimiser votre entretien</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-800">Médiation familiale : principes et bénéfices</h3>
                <p className="text-sm text-gray-600 mt-1">Comment la médiation peut aider à résoudre les conflits familiaux</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogLinkMainPage;
