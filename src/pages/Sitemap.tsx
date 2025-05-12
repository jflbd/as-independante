import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { ArrowRight, Home, BookOpen, Phone, FileText, Clock, Calendar, CreditCard, HelpCircle, User, Briefcase, MapPin, FileQuestion, BookType } from 'lucide-react';
import SEOSchema from '@/components/SEOSchema';
import LocalSEOCities from '@/components/LocalSEOCities';
import normandyCities from '@/data/normandyCities';

const Sitemap = () => {
  const mainSections = [
    { name: 'Accueil', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'À propos', path: '/#a-propos', icon: <User className="h-4 w-4 mr-2" /> },
    { name: 'Missions', path: '/#missions', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { name: 'Témoignages', path: '/#temoignages', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: 'Services', path: '/#services', icon: <ArrowRight className="h-4 w-4 mr-2" /> },
    { name: 'Référentiel', path: '/#referentiel', icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: 'Déontologie', path: '/#deontologie', icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: 'FAQ', path: '/#faq', icon: <HelpCircle className="h-4 w-4 mr-2" /> },
    { name: 'Tarifs', path: '/#tarifs', icon: <CreditCard className="h-4 w-4 mr-2" /> },
    { name: 'Contact', path: '/#contact', icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  const secondarySections = [
    { name: 'Blog', path: '/blog', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: 'Ebook', path: '/ebook', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: 'Mentions légales', path: '/mentions-legales', icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: 'Plan du site', path: '/sitemap', icon: <MapPin className="h-4 w-4 mr-2" /> },
  ];

  const serviceSections = [
    { name: 'Services pour particuliers', category: 'Particuliers', items: [
      { name: 'Accompagnement dans les démarches administratives', path: '/#services' },
      { name: 'Conseil et orientation vers les dispositifs adaptés', path: '/#services' },
      { name: 'Médiation familiale', path: '/#services' },
      { name: 'Aide à l\'accès aux droits', path: '/#services' },
      { name: 'Accompagnement budgétaire', path: '/#services' },
    ]},
    { name: 'Services pour professionnels', category: 'Professionnels', items: [
      { name: 'Prévention des risques psycho-sociaux', path: '/#services' },
      { name: 'Accompagnement des salariés en difficulté', path: '/#services' },
      { name: 'Médiation en entreprise', path: '/#services' },
      { name: 'Services pour bailleurs et agences immobilières', path: '/#services' },
    ]},
  ];

  // Utiliser la liste des villes principales de notre fichier de configuration centralisé
  const locationPages = [
    { name: 'Normandie', path: '/' },
    ...normandyCities
      .filter(city => city.isMainCity)
      .map(city => ({ name: city.name, path: city.url }))
  ];

  const blogArticles = [
    { 
      name: 'Le rôle d\'une assistante sociale indépendante en Normandie', 
      path: '/blog/role-assistante-sociale-independante', 
      icon: <BookType className="h-4 w-4 mr-2" /> 
    },
    { 
      name: 'Guide des aides sociales disponibles en Normandie', 
      path: '/blog/aides-sociales-normandie', 
      icon: <BookType className="h-4 w-4 mr-2" /> 
    },
    { 
      name: 'Comment se préparer à un rendez-vous avec une assistante sociale', 
      path: '/blog/preparer-rendez-vous-assistante-sociale', 
      icon: <BookType className="h-4 w-4 mr-2" /> 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Plan du site | {siteConfig.title}</title>
        <meta name="description" content={`Plan du site de ${siteConfig.name}, assistante sociale indépendante en Normandie. Retrouvez facilement toutes les pages et sections de notre site.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteConfig.url}/sitemap`} />
      </Helmet>
      
      <SEOSchema pageType="AboutPage" 
        title={`Plan du site | ${siteConfig.title}`}
        description={`Plan du site de ${siteConfig.name}, assistante sociale indépendante en Normandie. Retrouvez facilement toutes les pages et sections de notre site.`}
        url={`${siteConfig.url}/sitemap`}
      />
      
      <NavBar />
      
      <div className="flex-grow pt-10 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">Plan du site</h1>
              <p className="text-gray-600">
                Cette page présente la structure complète du site pour vous permettre de trouver facilement l'information que vous recherchez.
              </p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Colonne de gauche - Pages principales */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-primary">Pages principales</h2>
                <ul className="space-y-3">
                  {mainSections.map((section, index) => (
                    <li key={index}>
                      <Link 
                        to={section.path} 
                        className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-primary transition-colors"
                      >
                        {section.icon}
                        <span>{section.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-xl font-bold mb-4 mt-8 text-primary">Pages additionnelles</h2>
                <ul className="space-y-3">
                  {secondarySections.map((section, index) => (
                    <li key={index}>
                      <Link 
                        to={section.path} 
                        className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-primary transition-colors"
                      >
                        {section.icon}
                        <span>{section.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Colonne de droite - Services et zones géographiques */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-primary">Services</h2>
                {serviceSections.map((serviceGroup, groupIndex) => (
                  <div key={groupIndex} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">{serviceGroup.category}</h3>
                    <ul className="space-y-1 ml-5">
                      {serviceGroup.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="list-disc text-gray-600 hover:text-primary">
                          <Link to={item.path} className="py-1 hover:underline">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <h2 className="text-xl font-bold mb-4 mt-8 text-primary">Articles du Blog</h2>
                <ul className="space-y-3">
                  {blogArticles.map((article, index) => (
                    <li key={index}>
                      <Link 
                        to={article.path} 
                        className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-primary transition-colors"
                      >
                        {article.icon}
                        <span className="text-sm">{article.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-xl font-bold mb-4 mt-8 text-primary">Zones d'intervention</h2>
                {/* Utilisation du composant centralisé pour les villes principales */}
                <LocalSEOCities 
                  className="border-t-0 pt-0 py-0 mt-0" 
                  titleClassName="sr-only" 
                  showAllCities={false}
                  maxCities={6}
                />
              </div>
            </div>
            
            {/* Section SEO avec mots-clés et termes associés */}
            <section className="mt-12 p-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">Services d'assistante sociale en Normandie</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  Assistante sociale libérale diplômée d'État, j'interviens dans toute la Normandie pour vous accompagner dans vos démarches sociales. 
                  Services disponibles à Caen, Rouen, Le Havre et dans l'ensemble de la région normande.
                </p>
                <p>
                  Besoin d'aide pour vos démarches administratives, d'un accompagnement social personnalisé ou d'une assistante sociale à domicile ? 
                  Consultez les différentes sections de notre site pour découvrir l'ensemble des services proposés.
                </p>
              </div>
              
              {/* Utilisation du composant centralisé LocalSEOCities */}
              <div className="mt-6">
                <LocalSEOCities 
                  className="border-t-0 pt-0 pb-0" 
                  titleClassName="text-sm font-medium text-gray-700 mb-2"
                  maxCities={15}
                />
              </div>
              
              <div className="mt-6">
                <h2 className="text-sm font-semibold mb-3 text-gray-700">Types d'accompagnement</h2>
                <div className="flex flex-wrap gap-1 text-xs">
                  <span className="px-2 py-1 bg-gray-100 rounded">Démarches administratives</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Accès aux droits</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Aide budgétaire</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Médiation familiale</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Accompagnement personnes âgées</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Conseil aux entreprises</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Aide à domicile</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sitemap;
