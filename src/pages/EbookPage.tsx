import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, FileText, Download, 
  BookOpen, List, ShieldCheck, 
  Calendar, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import EbookHero from '@/components/EbookHero';
import EbookTestimonialsSection from '@/components/EbookTestimonialsSection';
import Footer from '@/components/Footer';
import { OptimizedImage } from '@/components/OptimizedImage';
import ContactButton from '@/components/ContactButton';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from '@/config/ebookConfig';
import ScrollButtons from '@/components/ScrollButtons';
import ModalManager from '@/components/ui/ModalManager';

const EbookPage: React.FC = () => {
    const navigate = useNavigate();
    const navbarRef = useRef<HTMLDivElement>(null);
    const presentationRef = useRef<HTMLElement>(null);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Supprimer tout padding-top du body
        document.body.style.paddingTop = '0';
        document.body.style.margin = '0';
        
        // Observer pour détecter quand la section de présentation est hors de vue
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (navbarRef.current) {
                    // Quand la section présentation n'est plus visible, afficher la navbar
                    navbarRef.current.style.position = entry.isIntersecting ? 'absolute' : 'fixed';
                    navbarRef.current.style.top = entry.isIntersecting ? '-100px' : '0';
                    navbarRef.current.style.opacity = entry.isIntersecting ? '0' : '1';
                    navbarRef.current.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto'; // Désactiver les interactions quand masquée
                    navbarRef.current.style.zIndex = entry.isIntersecting ? '-1' : '20'; // Réduire z-index quand invisible
                }
            },
            { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
        );
        
        const currentRef = presentationRef.current;
        
        if (currentRef) {
            observer.observe(currentRef);
        }
        
        // Nettoyer les effets lors du démontage du composant
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            // Restaurer les valeurs par défaut du body si nécessaire
            // document.body.style.paddingTop = '';
        };
    }, []);

    // Table des matières de l'ebook
    const tableOfContents = [
        "Introduction à l'exercice en libéral",
        "Cadre législatif et réglementaire",
        "Démarches administratives et statuts juridiques",
        "Gestion financière et comptable",
        "Développer son activité et sa clientèle",
        "Travailler en collaboration avec les institutions",
        "Conseils pratiques pour démarrer sereinement",
        "Modèles de documents et ressources utiles"
    ];

    // Bénéfices de l'ebook
    const benefits = [
        {
            icon: <FileText className="h-6 w-6 text-primary" />,
            title: "Guide complet",
            description: "Un document exhaustif couvrant tous les aspects de l'installation en libéral"
        },
        {
            icon: <BookOpen className="h-6 w-6 text-primary" />,
            title: "Facile à lire",
            description: "Écrit dans un langage clair et accessible, sans jargon technique inutile"
        },
        {
            icon: <List className="h-6 w-6 text-primary" />,
            title: "Ressources pratiques",
            description: "Modèles de documents, check-lists et liens utiles inclus"
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-primary" />,
            title: "Conseils d'experte",
            description: "Basé sur plus de 10 ans d'expérience professionnelle"
        },
        {
            icon: <Clock className="h-6 w-6 text-primary" />,
            title: "Gain de temps",
            description: "Évitez des mois de recherches et démarrez rapidement votre activité"
        },
        {
            icon: <Calendar className="h-6 w-6 text-primary" />,
            title: "Mises à jour régulières",
            description: "Contenu mis à jour selon les évolutions légales et réglementaires"
        }
    ];

    // FAQ concernant l'ebook
    const faqItems = [
        {
            question: "Quel format de fichier vais-je recevoir ?",
            answer: "Vous recevrez un fichier PDF de haute qualité, optimisé pour une lecture à l'écran et l'impression."
        },
        {
            question: "Comment accéder à mon ebook après l'achat ?",
            answer: "Après votre achat, vous recevrez immédiatement un lien de téléchargement par email, et vous pourrez aussi télécharger l'ebook directement sur notre site."
        },
        {
            question: "Puis-je obtenir un remboursement si je ne suis pas satisfait ?",
            answer: "Oui, nous offrons une garantie satisfait ou remboursé de 30 jours. Contactez-nous simplement si l'ebook ne répond pas à vos attentes."
        },
        {
            question: "L'ebook est-il mis à jour régulièrement ?",
            answer: "Oui, le contenu est régulièrement mis à jour pour refléter les changements législatifs et réglementaires. Les mises à jour sont gratuites pour les acheteurs."
        },
        {
            question: "Puis-je partager cet ebook avec mes collègues ?",
            answer: "L'ebook est destiné à un usage personnel. Si vos collègues souhaitent en bénéficier également, nous proposons des licences multi-utilisateurs à tarif avantageux."
        },
        {
            question: "Y a-t-il une version imprimée disponible ?",
            answer: "Actuellement, l'ebook est disponible uniquement en version numérique (PDF), mais vous pouvez l'imprimer vous-même si vous préférez une version papier."
        }
    ];

    // Structure du JSON-LD pour le SEO - Enrichie avec plus d'informations
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": ebookConfig.title,
        "description": ebookConfig.description,
        "image": `${siteConfig.url}${ebookConfig.coverImage}`,
        "sku": "EBOOK001",
        "offers": {
            "@type": "Offer",
            "url": `${siteConfig.url}/ebook`,
            "priceCurrency": "EUR",
            "price": ebookConfig.price,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Person",
                "name": siteConfig.name
            },
            "priceValidUntil": "2026-04-29" // Date mise à jour
        },
        "author": {
            "@type": "Person",
            "name": siteConfig.name,
            "jobTitle": "Assistante Sociale Indépendante",
            "description": "Plus de 10 ans d'expérience dans le domaine social"
        },
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteConfig.url}${siteConfig.ui.logo}`
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "12",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Marie L."
                },
                "reviewBody": "Ce guide m'a vraiment aidé à comprendre les démarches administratives et à structurer mon activité en libéral. Un indispensable !"
            },
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Jean D."
                },
                "reviewBody": "Grâce aux conseils pratiques et aux modèles de documents, j'ai pu m'installer en libéral sans stress. Je recommande vivement ce guide."
            }
        ],
        "about": {
            "@type": "Thing",
            "name": "Installation en libéral pour assistants sociaux",
            "description": "Guide complet sur les démarches administratives, juridiques et pratiques pour s'installer en tant qu'assistant social indépendant"
        },
        "audience": {
            "@type": "Audience",
            "audienceType": "Assistants sociaux, travailleurs sociaux"
        }
    };
    
    return (
        <div className="ebook-page bg-gray-50 m-0 p-0 overflow-x-hidden">
            <Helmet>
                <title>{ebookConfig.title} | {siteConfig.name}</title>
                <meta name="description" content={`${ebookConfig.subtitle}. Guide complet par ${siteConfig.name}, Assistante Sociale Indépendante avec plus de 10 ans d'expérience.`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                <meta name="keywords" content="ebook assistant social, installation libéral, guide assistante sociale, travail social indépendant, démarches administratives, création activité sociale, indépendant, libéral, URSSAF" />
                <meta property="og:title" content={`${ebookConfig.title} | ${siteConfig.name}`} />
                <meta property="og:description" content={`${ebookConfig.subtitle}. Guide complet pour vous accompagner dans votre installation.`} />
                <meta property="og:type" content="product" />
                <meta property="og:url" content={`${siteConfig.url}/ebook`} />
                <meta property="og:image" content={`${siteConfig.url}${ebookConfig.coverImage}`} />
                <meta property="og:price:amount" content={ebookConfig.price.toString()} />
                <meta property="og:price:currency" content="EUR" />
                <meta property="product:price:amount" content={ebookConfig.price.toString()} />
                <meta property="product:price:currency" content="EUR" />
                <meta property="product:availability" content="in stock" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${ebookConfig.title} | ${siteConfig.name}`} />
                <meta name="twitter:description" content={`${ebookConfig.subtitle}. Guide complet pour vous accompagner dans votre installation.`} />
                <meta name="twitter:image" content={`${siteConfig.url}${ebookConfig.coverImage}`} />
                <meta name="author" content={siteConfig.name} />
                <meta name="date" content="2025-04-29" />
                <link rel="canonical" href={`${siteConfig.url}/ebook`} />
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
                <style type="text/css">{`
                    body {
                        padding-top: 0 !important;
                        margin-top: 0 !important;
                    }
                    html, body {
                        overflow-x: hidden;
                    }
                `}</style>
            </Helmet>
            
            {/* Flèches de navigation flottantes */}
            <ScrollButtons includeHomeButton={true} onHomeClick={() => navigate('/')} />
            
            {/* Section héro avec présentation de l'ebook - Inclut déjà le header avec logo */}
            <section id="presentation" className="scroll-mt-16" ref={presentationRef}>
                <EbookHero />
            </section>
            
            {/* Barre de navigation ancrée */}
            <div 
                ref={navbarRef} 
                className="w-full sticky top-0 z-20 bg-white shadow-md border-b border-gray-100 transition-transform"
                style={{ width: '100%', left: 0, right: 0 }}
            >
                <div className="container mx-auto">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center py-2">
                            <Link to="/" className="flex items-center gap-1 mr-2">
                                <img 
                                    src={siteConfig.ui.logo} 
                                    alt={siteConfig.name}
                                    className="w-7 h-7 rounded-full object-contain"
                                />
                                <span className="font-medium text-primary text-sm hidden md:inline">{siteConfig.name}</span>
                            </Link>
                            
                            <nav className="overflow-x-auto whitespace-nowrap py-2 text-sm mr-1">
                                <a href="#presentation" className="px-1.5 py-1.5 text-gray-800 hover:text-primary transition-colors">Présentation</a>
                                <a href="#contenu" className="px-1.5 py-1.5 text-gray-800 hover:text-primary transition-colors">Contenu</a>
                                <a href="#temoignages" className="px-1.5 py-1.5 text-gray-800 hover:text-primary transition-colors">Témoignages</a>
                                <a href="#faq" className="px-1.5 py-1.5 text-gray-800 hover:text-primary transition-colors">FAQ</a>
                            </nav>
                        </div>
                        
                        <div className="flex-shrink-0">
                            <a 
                                href="#achat" 
                                className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
                                style={{ width: "auto", minWidth: "fit-content" }}
                            >
                                Acheter ({ebookConfig.formattedPrice})
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Contenu principal */}
            <main className="pb-16">
                {/* Section contenu et table des matières avec transition améliorée */}
                <section id="contenu" className="relative bg-white scroll-mt-16">
                    {/* Transition visuelle élégante */}
                    <div className="relative w-full overflow-hidden" style={{ height: '120px', marginTop: '-60px' }}>
                        {/* Cercles décoratifs */}
                        <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-white opacity-60 blur-md"></div>
                        <div className="absolute right-1/4 top-1/3 transform translate-x-1/4 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-tl from-accent/20 to-white opacity-50 blur-md"></div>
                    </div>
                    
                    <div className="container mx-auto px-4">
                        <div className="relative">
                            {/* Badge ornement */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2.5 rounded-full shadow-lg">
                                <div className="bg-gradient-to-br from-primary to-accent w-12 h-12 rounded-full flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            
                            {/* Titre élégant avec ligne décorative */}
                            <div className="text-center pt-12 pb-8">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold inline-block px-6 relative">
                                    Découvrez le contenu complet
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                                </h2>
                                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                                    Un guide pratique et complet pour réussir votre installation en tant qu'assistant(e) social(e) indépendant(e)
                                </p>
                            </div>
                            
                            {/* Contenu principal avec nouvelle mise en page */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-6">
                                {/* Contenu principal - occupe 8 colonnes sur les écrans moyens et larges */}
                                <div className="md:col-span-8">
                                    <div className="prose prose-lg max-w-none">
                                        <div className="bg-gradient-to-r from-primary/5 to-white p-6 rounded-lg border-l-4 border-primary mb-8">
                                            <p className="lead-paragraph text-lg text-gray-700 italic">
                                                "Après avoir accompagné de nombreux professionnels dans leur transition vers le libéral, j'ai condensé dans ce guide toute mon expertise pour vous éviter les erreurs courantes et vous permettre de démarrer sereinement."
                                            </p>
                                        </div>
                                        
                                        <p>
                                            Ce guide complet de <strong className="text-primary">plus de 200 pages</strong> est le fruit de mon expérience de plus de 10 ans en tant qu'assistante sociale. Il vous accompagnera pas à pas dans toutes les étapes de votre installation en libéral, en vous fournissant des conseils pratiques, des modèles de documents et des ressources essentielles.
                                        </p>
                                        
                                        <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2">
                                            <span className="inline-block p-1.5 rounded-full bg-primary/10">
                                                <CheckCircle className="h-5 w-5 text-primary" />
                                            </span>
                                            Pour qui est fait ce guide ?
                                        </h3>
                                        
                                        <ul className="space-y-3 mt-6 grid md:grid-cols-2 gap-4">
                                            <li className="flex items-start bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-lg transform transition-all hover:translate-x-1.5 hover:shadow-sm">
                                                <div className="bg-primary/10 text-primary p-1.5 rounded-full mt-0.5 mr-3 flex-shrink-0">
                                                    <CheckCircle className="h-4 w-4" />
                                                </div>
                                                <span>Les assistant(e)s social(e)s souhaitant s'installer en libéral</span>
                                            </li>
                                            <li className="flex items-start bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-lg transform transition-all hover:translate-x-1.5 hover:shadow-sm">
                                                <div className="bg-primary/10 text-primary p-1.5 rounded-full mt-0.5 mr-3 flex-shrink-0">
                                                    <CheckCircle className="h-4 w-4" />
                                                </div>
                                                <span>Les travailleurs sociaux en reconversion professionnelle</span>
                                            </li>
                                            <li className="flex items-start bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-lg transform transition-all hover:translate-x-1.5 hover:shadow-sm">
                                                <div className="bg-primary/10 text-primary p-1.5 rounded-full mt-0.5 mr-3 flex-shrink-0">
                                                    <CheckCircle className="h-4 w-4" />
                                                </div>
                                                <span>Les professionnels cherchant à comprendre les aspects administratifs</span>
                                            </li>
                                            <li className="flex items-start bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-lg transform transition-all hover:translate-x-1.5 hover:shadow-sm">
                                                <div className="bg-primary/10 text-primary p-1.5 rounded-full mt-0.5 mr-3 flex-shrink-0">
                                                    <CheckCircle className="h-4 w-4" />
                                                </div>
                                                <span>Les étudiants préparant leur futur projet professionnel</span>
                                            </li>
                                        </ul>
                                        
                                        <h3 className="text-xl font-bold mt-12 mb-4 flex items-center gap-2">
                                            <span className="inline-block p-1.5 rounded-full bg-primary/10">
                                                <FileText className="h-5 w-5 text-primary" />
                                            </span>
                                            Aperçu des chapitres clés
                                        </h3>
                                        
                                        <div className="space-y-6 mt-6">
                                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                                                <h4 className="text-lg font-semibold text-primary">Introduction à l'exercice en libéral</h4>
                                                <p className="text-gray-600 mt-2">Comprendre les enjeux, les avantages et les défis de l'exercice en tant qu'assistant(e) social(e) indépendant(e). Définir votre projet professionnel et votre positionnement.</p>
                                            </div>
                                            
                                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                                                <h4 className="text-lg font-semibold text-primary">Cadre législatif et réglementaire</h4>
                                                <p className="text-gray-600 mt-2">Analyse détaillée du cadre juridique, des restrictions légales et des obligations déontologiques spécifiques au travail social indépendant.</p>
                                            </div>
                                            
                                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all">
                                                <h4 className="text-lg font-semibold text-primary">Démarches administratives et statuts juridiques</h4>
                                                <p className="text-gray-600 mt-2">Guide complet des différents statuts possibles (micro-entrepreneur, EIRL, SASU, etc.), avec leurs avantages, inconvénients et procédures d'immatriculation.</p>
                                            </div>
                                            
                                            <div className="hidden md:block text-center py-3">
                                                <span className="text-gray-400 text-sm">Et bien plus encore...</span>
                                            </div>
                                        </div>
                                    
                                        <div className="my-10 flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-white to-accent/5 rounded-lg border border-primary/10 shadow-sm">
                                            <div className="flex-shrink-0 w-48 max-w-full relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg transform rotate-3 scale-105 opacity-60 blur-sm"></div>
                                                <OptimizedImage
                                                    src={ebookConfig.coverImage}
                                                    alt={ebookConfig.title}
                                                    className="w-full h-auto rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 relative z-10 object-contain max-h-[300px]"
                                                    width={200}
                                                    height={300}
                                                    priority
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{ebookConfig.title}</h3>
                                                <p className="text-gray-600 mb-4">{ebookConfig.subtitle}</p>
                                                <div className="flex items-center mb-4">
                                                    <div className="text-2xl font-bold text-primary mr-3">{ebookConfig.formattedPrice}</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Format PDF</span>
                                                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Téléchargement immédiat</span>
                                                    </div>
                                                </div>
                                                <a href="#achat" aria-label="Acheter l'ebook maintenant">
                                                    <Button 
                                                        className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                                                        hoverAnimation="strong"
                                                        clickAnimation="bounce"
                                                    >
                                                        <Download size={18} />
                                                        Acheter maintenant
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            
                                {/* Sidebar avec table des matières - occupe 4 colonnes sur les écrans moyens et larges */}
                                <div className="md:col-span-4 mb-6">
                                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg sticky top-24 border border-gray-100 shadow-sm">
                                        <h3 className="text-lg font-semibold mb-6 flex items-center">
                                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                                                <List className="h-4 w-4 text-primary" aria-hidden="true" />
                                            </div>
                                            Table des matières complète
                                        </h3>
                                        
                                        <ol className="ml-6 space-y-3 relative">
                                            {/* Ligne verticale */}
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/20 to-transparent"></div>
                                            
                                            {tableOfContents.map((item, index) => (
                                                <li key={index} className="text-gray-700 relative pl-5 group">
                                                    <div className="absolute left-0 top-1.5 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 group-hover:scale-150 group-hover:bg-accent transition-all"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ol>
                                        
                                        <div className="mt-8 pt-4 border-t border-gray-200">
                                            <div className="flex items-center text-primary">
                                                <div className="bg-primary/5 p-1.5 rounded-full mr-3">
                                                    <FileText className="h-4 w-4" aria-hidden="true" />
                                                </div>
                                                <span className="font-medium">Format PDF optimisé</span>
                                            </div>
                                            <div className="flex items-center mt-3 text-primary">
                                                <div className="bg-primary/5 p-1.5 rounded-full mr-3">
                                                    <Download className="h-4 w-4" aria-hidden="true" />
                                                </div>
                                                <span className="font-medium">Téléchargement immédiat</span>
                                            </div>
                                        </div>
                                        
                                        {/* Badge de promotion limité */}
                                        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                                            <div className="text-yellow-800 font-medium text-sm">Offre spéciale printemps</div>
                                            <div className="text-black font-bold">30 avril 2025</div>
                                            <div className="text-xs text-gray-600 mt-1">Derniers jours à ce tarif</div>
                                        </div>
                                        
                                        <div className="mt-6 text-center">
                                            <a href="#achat" aria-label="Obtenir l'ebook">
                                                <Button 
                                                    className="w-full bg-primary hover:bg-primary/90 text-white"
                                                    hoverAnimation="strong" 
                                                    clickAnimation="bounce"
                                                >
                                                    Obtenir l'ebook ({ebookConfig.formattedPrice})
                                                </Button>
                                            </a>
                                        </div>
                                        
                                        {/* Badge de sécurité */}
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex justify-center">
                                                <div className="bg-green-50 border border-green-200 rounded-full px-3 py-2 inline-flex items-center">
                                                    <ShieldCheck className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
                                                    <span className="text-xs text-green-800">Paiement 100% sécurisé</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bénéfices de l'ebook - occupe toute la largeur */}                                
                                <div className="md:col-span-12 my-6">
                                    <div className="bg-gradient-to-r from-primary/5 to-transparent p-5 rounded-lg mb-6">
                                        <h3 className="text-xl font-semibold mb-2">Ce que vous allez maîtriser grâce à ce guide</h3>
                                        <p className="text-gray-600">Des connaissances pratiques et immédiatement applicables pour votre projet professionnel</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                                <div className="mr-4 mt-1 bg-gradient-to-br from-primary/10 to-accent/10 p-2.5 rounded-full" aria-hidden="true">
                                                    {React.cloneElement(benefit.icon as React.ReactElement, { className: "h-6 w-6 text-primary" })}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg">{benefit.title}</h4>
                                                    <p className="text-gray-600">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Nouvelle section de témoignage prioritaire */}
                                    <div className="mt-12 bg-white border-2 border-primary/20 rounded-xl p-6 relative">
                                        <div className="absolute -top-4 left-8 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Témoignage prioritaire
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-6 items-center">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10 flex-shrink-0">
                                                <OptimizedImage
                                                    src="/assets/avisuser/profile-user2.jpg"
                                                    alt="Photo de Marie L."
                                                    className="w-full h-full object-cover"
                                                    width={96}
                                                    height={96}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <blockquote className="text-lg italic text-gray-700 mb-3">
                                                    "J'ai économisé des mois de recherches et évité de nombreuses erreurs grâce à ce guide. Les modèles de documents fournis m'ont fait gagner un temps précieux. Je recommande vivement à tout travailleur social qui souhaite se lancer !"
                                                </blockquote>
                                                <div className="font-bold">Marie L.</div>
                                                <div className="text-sm text-gray-600">Assistante sociale indépendante depuis 2024</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Section témoignages - Remplacée par notre nouveau composant */}
                <section id="temoignages" className="scroll-mt-16">
                    <EbookTestimonialsSection />
                </section>
                
                {/* FAQ Section */}
                <section id="faq" className="py-16 bg-white scroll-mt-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-10">Questions fréquentes</h2>
                        
                        <div className="max-w-3xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {faqItems.map((item, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                                        <p className="text-gray-700">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-10 text-center">
                                <p className="mb-6 text-gray-700">
                                    Vous avez d'autres questions ? N'hésitez pas à me contacter.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <ContactButton 
                                        variant="outline"
                                        text="Me contacter" 
                                        iconType="mail" 
                                        modalType="contact"
                                        context="ebook_page"
                                    />
                                    <a href="#achat" aria-label="Acheter l'ebook maintenant">
                                        <Button 
                                            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                                            hoverAnimation="medium"
                                            clickAnimation="bounce"
                                        >
                                            <Download size={16} />
                                            Acheter maintenant
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* CTA final */}
                <section id="achat" className="py-16 bg-primary/10 scroll-mt-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="p-8 text-center">
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                                        Prêt(e) à vous lancer dans l'aventure du libéral ?
                                    </h2>
                                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                                        Cet ebook contient toutes les informations dont vous avez besoin pour réussir votre installation en tant qu'assistant(e) social(e) indépendant(e).
                                    </p>
                                    
                                    <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-lg mx-auto">
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="w-32 shrink-0">
                                                <OptimizedImage
                                                    src={ebookConfig.coverImage}
                                                    alt={ebookConfig.title}
                                                    className="w-full h-auto rounded-md shadow-lg"
                                                    width={128}
                                                    height={192}
                                                />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-xl font-bold">{ebookConfig.title}</h3>
                                                <div className="flex items-center mt-2 mb-1">
                                                    <div className="flex mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="ml-1 text-sm text-gray-500">(12 avis)</span>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="text-3xl font-bold text-primary">{ebookConfig.formattedPrice}</div>
                                                    {ebookConfig.formattedPriceAvantPromo && (
                                                        <div className="text-sm text-gray-500 line-through mt-1">{ebookConfig.formattedPriceAvantPromo}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Link to="/acheter-ebook">
                                        <Button 
                                            size="lg" 
                                            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                                            hoverAnimation="strong"
                                            clickAnimation="scale"
                                        >
                                            Télécharger l'ebook maintenant
                                        </Button>
                                    </Link>
                                    
                                    <div className="mt-6 flex flex-wrap justify-center gap-6">
                                        <div className="flex items-center">
                                            <Download className="h-5 w-5 text-gray-500 mr-2" aria-hidden="true" />
                                            <span className="text-sm text-gray-600">Téléchargement immédiat</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-gray-500 mr-2" aria-hidden="true" />
                                            <span className="text-sm text-gray-600">Format PDF</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-gray-500 mr-2" aria-hidden="true" />
                                            <span className="text-sm text-gray-600">Garantie 30 jours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            
            {/* Ajout du gestionnaire de modales pour permettre l'affichage des modales */}
            <ModalManager />
        </div>
    );
};

export default EbookPage;