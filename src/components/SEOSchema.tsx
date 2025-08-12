import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import { blogArticles } from '@/data/blogArticles';

interface SEOSchemaProps {
  pageType: 'HomePage' | 'ServicePage' | 'AboutPage' | 'ContactPage' | 'ArticlePage' | 'WebPage';
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

const SEOSchema: React.FC<SEOSchemaProps> = ({
  pageType,
  title = siteConfig.title,
  description = siteConfig.description,
  url = siteConfig.url,
  imageUrl = `${siteConfig.url}/og-image.png`,
}) => {
  // Schéma de base pour Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: siteConfig.name,
    url: url,
    logo: `${url}/logo.png`,
    image: imageUrl,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: siteConfig.contact.region,
      addressCountry: siteConfig.contact.country
    },
    sameAs: [
      siteConfig.social.facebook
    ]
  };

  // LocalBusiness schema pour une assistante sociale indépendante
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#localbusiness`,
    name: title,
    image: imageUrl,
    url: url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: siteConfig.contact.region,
      addressCountry: siteConfig.contact.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '49.1829', // Coordonnées approximatives pour la Normandie (Caen)
      longitude: '0.3707'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Caen',
        sameAs: 'https://fr.wikipedia.org/wiki/Caen'
      },
      {
        '@type': 'City',
        name: 'Rouen',
        sameAs: 'https://fr.wikipedia.org/wiki/Rouen'
      },
      {
        '@type': 'City',
        name: 'Le Havre',
        sameAs: 'https://fr.wikipedia.org/wiki/Le_Havre'
      },
      {
        '@type': 'State',
        name: 'Normandie',
        sameAs: 'https://fr.wikipedia.org/wiki/Normandie'
      }
    ],
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      siteConfig.social.facebook
    ]
  };

  // Schéma pour les services proposés
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'Services d\'assistante sociale indépendante',
    serviceType: 'Assistance sociale',
    provider: {
      '@id': `${url}#organization`
    },
    areaServed: {
      '@type': 'State',
      name: 'Normandie',
      sameAs: 'https://fr.wikipedia.org/wiki/Normandie'
    },
    description: 'Accompagnement social personnalisé, démarches administratives, médiation familiale, et aide aux personnes âgées en Normandie.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      highPrice: '150',
      lowPrice: '60',
      offerCount: '5',
      offers: [
        {
          '@type': 'Offer',
          name: 'Consultation initiale',
          description: 'Premier rendez-vous de diagnostic social',
          price: '60',
          priceCurrency: 'EUR'
        },
        {
          '@type': 'Offer',
          name: 'Accompagnement personnalisé',
          description: 'Suivi régulier et personnalisé selon vos besoins',
          price: '150',
          priceCurrency: 'EUR'
        },
        {
          '@type': 'Offer',
          name: 'Intervention à domicile',
          description: 'Déplacement à votre domicile en Normandie',
          price: '85',
          priceCurrency: 'EUR'
        }
      ]
    }
  };

  // FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qu\'est-ce qu\'une assistante sociale libérale/indépendante ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Une assistante sociale libérale (ou indépendante) est une professionnelle diplômée d\'État qui exerce son activité de manière autonome, en dehors des structures traditionnelles comme les CCAS ou les hôpitaux. En tant qu\'assistante sociale indépendante en Normandie, j\'accompagne les particuliers et les professionnels dans leurs démarches sociales avec flexibilité et disponibilité.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quels services propose une assistante sociale indépendante ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En tant qu\'assistante sociale indépendante en Normandie, je propose plusieurs types d\'accompagnements : démarches administratives, conseil et orientation vers les dispositifs adaptés, médiation familiale et soutien aux personnes âgées, aide à l\'accès aux droits (logement, santé, prestations sociales), accompagnement budgétaire et financier, et interventions à domicile sur toute la région normande.'
        }
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous dans toute la Normandie ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, j\'interviens dans l\'ensemble de la région Normandie, notamment dans les principales villes comme Caen, Rouen, Le Havre, mais aussi dans les zones rurales et périurbaines. Je propose des consultations à mon cabinet ainsi que des interventions à domicile en fonction de vos besoins et de votre mobilité.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre une assistante sociale libérale et une assistante sociale du service public ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les principales différences sont : 1) Disponibilité : j\'offre une plus grande flexibilité horaire et une disponibilité accrue. 2) Personnalisation : je peux consacrer davantage de temps à chaque situation et adapter précisément mes interventions à vos besoins. 3) Rémunération : mes services sont payants, contrairement aux services sociaux publics qui sont gratuits. 4) Complémentarité : j\'interviens souvent en complément des services publics pour accélérer les démarches. Toutefois, je reste soumise au même code déontologique et au secret professionnel que mes collègues du service public.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment se déroule un premier rendez-vous avec une assistante sociale indépendante ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le premier rendez-vous est une étape d\'écoute et d\'évaluation qui permet de comprendre précisément votre situation et vos besoins, identifier les problématiques prioritaires, vous présenter les différentes options d\'accompagnement et établir ensemble un plan d\'action adapté. Ce premier contact peut se faire à mon cabinet, à votre domicile ou par visioconférence selon votre préférence et votre situation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment sont fixés les tarifs d\'une assistante sociale indépendante ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mes honoraires sont fixés selon le type d\'intervention, la complexité de la situation et le temps nécessaire à son traitement. Ils vous sont toujours communiqués clairement avant le début de tout accompagnement. Différentes formules sont disponibles : consultation ponctuelle, accompagnement à la démarche, ou suivi global sur plusieurs mois. Je vous invite à consulter la section "Tarifs" pour plus de détails ou à me contacter pour un devis personnalisé.'
        }
      }
    ]
  };

  // Homepage Schema
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url: url,
    name: title,
    isPartOf: {
      '@id': `${url}#website`
    },
    about: {
      '@id': `${url}#organization`
    },
    description: description
  };

  // Créer un schéma différent selon le type de page
  let pageSpecificSchema = null;
  
  if (pageType === 'HomePage') {
    pageSpecificSchema = homePageSchema;
  } else if (pageType === 'ServicePage') {
    pageSpecificSchema = {
      ...homePageSchema,
      '@type': 'WebPage',
      '@id': `${url}#servicepage`,
    };
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url: url,
    name: title,
    description: description,
    publisher: {
      '@id': `${url}#organization`
    }
  };

  // Schéma de fil d'ariane (breadcrumb) dynamique
  const generateBreadcrumbSchema = () => {
    // Déterminer les parties du chemin actuel
    const urlParts = url.replace(/https?:\/\/[^/]+/, '').split('/').filter(Boolean);
    const itemListElement = [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@id': siteConfig.url,
          'name': 'Accueil'
        }
      }
    ];
    
    // Construire le fil d'ariane en fonction du chemin
    let currentPath = '';
    
    urlParts.forEach((part, index) => {
      currentPath += `/${part}`;
      let name = '';
      
      // Conversion des slugs en noms lisibles
      const isBlogArticle = urlParts[index - 1] === 'blog';
      const article = isBlogArticle ? blogArticles.find(a => a.id === part) : null;

      if (article) {
        name = article.title;
      } else {
        switch(part) {
          case 'blog':
            name = 'Blog';
            break;
          case 'ebook':
            name = 'Guide pratique';
            break;
          case 'sitemap':
            name = 'Plan du site';
            break;
          case 'mentions-legales':
            name = 'Mentions légales';
            break;
          default:
            name = part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
      }
      
      itemListElement.push({
        '@type': 'ListItem',
        'position': index + 2,
        'item': {
          '@id': `${siteConfig.url}${currentPath}`,
          'name': name
        }
      });
    });
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': itemListElement
    };
  };
  
  // BreadcrumbList schema
  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(servicesSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      {pageSpecificSchema && (
        <script type="application/ld+json">
          {JSON.stringify(pageSpecificSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOSchema;
