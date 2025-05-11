import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/siteConfig';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import RelatedLinks from '@/components/RelatedLinks';
import SEOSchema from '@/components/SEOSchema';
import Breadcrumb from '@/components/Breadcrumb';

// Articles de blog disponibles
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
    content: `
## Le métier d'assistante sociale indépendante

Une assistante sociale indépendante, également appelée assistante sociale libérale, est une professionnelle diplômée d'État qui exerce son métier en dehors des structures traditionnelles. Contrairement aux assistantes sociales qui travaillent dans le service public (CCAS, hôpitaux, services départementaux), l'assistante sociale libérale a choisi un mode d'exercice autonome, tout en respectant le même cadre déontologique et éthique.

### Une profession encadrée et réglementée

Avant tout, il est important de préciser que pour exercer en tant qu'assistante sociale indépendante, il faut obligatoirement :

- Être titulaire du Diplôme d'État d'Assistant de Service Social (DEASS)
- Être inscrit·e aux organismes sociaux et fiscaux appropriés
- Respecter le code de déontologie de la profession
- Être soumis·e au secret professionnel (article 226-13 du Code Pénal)

### En quoi consiste mon accompagnement ?

En tant qu'assistante sociale libérale en Normandie, mon intervention s'articule autour de plusieurs axes :

#### 1. L'évaluation globale de votre situation

Lors de nos premiers échanges, je prends le temps de comprendre l'ensemble de votre situation : familiale, professionnelle, financière, administrative, médicale si nécessaire. Cette évaluation me permet d'identifier vos besoins et de vous proposer un accompagnement sur mesure.

#### 2. L'aide aux démarches administratives

- Constitution de dossiers (MDPH, aides sociales, retraite, etc.)
- Rédaction de courriers administratifs
- Demandes d'aides financières
- Accompagnement dans les procédures d'accès aux droits

#### 3. La médiation et le conseil

- Médiation familiale
- Relations avec les institutions
- Conseil budgétaire
- Orientation vers des dispositifs adaptés

#### 4. L'accompagnement spécifique

- Soutien aux personnes âgées et à leurs aidants
- Aide aux personnes en situation de handicap
- Accompagnement des familles en difficulté
- Soutien aux professionnels dans la gestion de situations complexes

## Pourquoi faire appel à une assistante sociale indépendante en Normandie ?

### Une disponibilité accrue

L'un des principaux avantages de faire appel à mes services est la disponibilité. Les services sociaux publics sont souvent surchargés, avec des délais d'attente qui peuvent atteindre plusieurs semaines, voire plusieurs mois. En tant qu'assistante sociale indépendante, je peux vous proposer un rendez-vous rapide (généralement sous 48h) et assurer un suivi régulier.

### Un accompagnement personnalisé

Je consacre le temps nécessaire à chaque situation, sans être limitée par les contraintes institutionnelles. Cette liberté me permet d'adapter précisément mon intervention à vos besoins spécifiques et d'être réactive face aux évolutions de votre situation.

### Une intervention sur toute la Normandie

J'interviens dans l'ensemble de la région normande, notamment dans les grandes agglomérations comme Caen, Rouen et Le Havre, mais également dans les zones rurales où l'accès aux services sociaux peut être plus compliqué. Je me déplace à votre domicile si nécessaire, ce qui est particulièrement adapté pour les personnes à mobilité réduite ou éloignées des services.

### Une confidentialité garantie

Comme tous les assistants sociaux, je suis soumise au secret professionnel. La relation que nous établirons sera basée sur la confiance et le respect mutuel. Vous pouvez vous exprimer librement, sans crainte que vos propos ne soient divulgués.

## Comment se déroule une intervention ?

### Premier contact

Lorsque vous me contactez, nous échangeons brièvement sur votre situation et je vous propose un rendez-vous. Ce premier entretien peut avoir lieu à mon cabinet, à votre domicile, ou par visioconférence selon votre préférence.

### Première rencontre

Lors de notre premier rendez-vous, qui dure généralement entre 1h et 1h30, nous abordons en détail votre situation. Je vous explique également mes modalités d'intervention et mes tarifs.

### Élaboration d'un plan d'action

À l'issue de cette première rencontre, je vous propose un plan d'action adapté à vos besoins. Ce plan peut comprendre plusieurs rendez-vous de suivi, des démarches à effectuer ensemble ou des orientations vers d'autres professionnels si nécessaire.

### Suivi et accompagnement

Selon les situations, l'accompagnement peut être ponctuel (pour une démarche spécifique) ou s'inscrire dans la durée. Dans tous les cas, je reste disponible pour répondre à vos questions et vous accompagner dans l'évolution de votre situation.

## Conclusion

L'assistante sociale indépendante représente une alternative ou un complément précieux aux services sociaux traditionnels. En choisissant de faire appel à mes services en Normandie, vous optez pour un accompagnement personnalisé, réactif et adapté à vos besoins spécifiques.

N'hésitez pas à me contacter pour échanger sur votre situation et voir comment je peux vous aider dans vos démarches sociales.
    `,
    relatedArticles: [
      {
        text: 'Les aides sociales disponibles en Normandie',
        url: '/blog/aides-sociales-normandie',
        description: 'Guide complet des dispositifs d\'aide sociale dans la région normande'
      },
      {
        text: 'Comment se préparer à un rendez-vous avec une assistante sociale',
        url: '/blog/preparer-rendez-vous-assistante-sociale',
        description: 'Conseils pratiques pour optimiser votre entretien avec un travailleur social'
      }
    ],
    relatedLinks: [
      {
        text: 'Mes services d\'accompagnement social',
        url: '/#services',
        description: 'Découvrez l\'ensemble des prestations que je propose en tant qu\'assistante sociale libérale'
      },
      {
        text: 'Prendre rendez-vous',
        url: '/#contact',
        description: 'Contactez-moi pour organiser une première consultation'
      },
      {
        text: 'FAQ - Questions fréquentes',
        url: '/#faq',
        description: 'Réponses aux questions les plus courantes sur mes services'
      }
    ]
  }
];

/**
 * Page d'article de blog individuelle pour présenter des contenus optimisés SEO
 * @returns 
 */
const BlogArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === articleId);
  
  // Utiliser useEffect en dehors de la condition pour éviter les hooks conditionnels
  React.useEffect(() => {
    if (!article) {
      navigate('/404', { replace: true });
    }
  }, [article, navigate]);
  
  if (!article) {
    return null;
  }
  
  // Transformation du contenu Markdown en HTML
  const formatContent = () => {
    let formattedContent = article.content;
    
    // Remplacer les titres
    formattedContent = formattedContent.replace(/## (.*?)$/gm, '<h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">$1</h2>');
    formattedContent = formattedContent.replace(/### (.*?)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">$1</h3>');
    formattedContent = formattedContent.replace(/#### (.*?)$/gm, '<h4 class="text-lg font-semibold mt-5 mb-2 text-gray-800">$1</h4>');
    
    // Remplacer les paragraphes
    formattedContent = formattedContent.replace(/(?<!\n)\n(?!\n)(.*?)(?=\n|$)/gm, '<p class="mb-4 text-gray-700">$1</p>');
    
    // Remplacer les listes
    formattedContent = formattedContent.replace(/- (.*?)$/gm, '<li class="mb-1">$1</li>');
    formattedContent = formattedContent.split('\n\n').map(block => {
      if (block.includes('<li')) {
        return `<ul class="list-disc pl-5 mb-5 space-y-1 text-gray-700">${block}</ul>`;
      }
      return block;
    }).join('\n\n');
    
    return formattedContent;
  };
  
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
                to="/" 
                className="inline-flex items-center text-sm text-primary hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour à l'accueil
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
            
            {/* Image de l'article */}
            <div className="w-full h-[300px] md:h-[400px] bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Image de l'article (à remplacer)
              </div>
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
                <div className="flex items-center">
                  <button className="flex items-center text-sm text-gray-600 hover:text-primary">
                    <Share2 className="h-4 w-4 mr-1" />
                    Partager
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Liens connexes */}
          <div className="max-w-4xl mx-auto mt-8">
            <RelatedLinks title="Articles en lien avec ce sujet" links={article.relatedArticles} />
            <RelatedLinks title="Vous pourriez également être intéressé(e) par" links={article.relatedLinks} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
