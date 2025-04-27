import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, FileText, Download, 
  CheckCheck, BookOpen, List, ShieldCheck, Award,
  Mail, Share2, ChevronRight, Home, Calendar, Clock
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
import { ebookTestimonials } from '@/config/testimonialsConfig';

const EbookPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Effet pour défiler vers le haut quand la page se charge
    useEffect(() => {
        window.scrollTo(0, 0);
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

    // Structure du JSON-LD pour le SEO
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
            "priceValidUntil": "2026-04-26"
        },
        "author": {
            "@type": "Person",
            "name": siteConfig.name
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
        ]
    };
    
    return (
        <div className="ebook-page bg-gray-50">
            <Helmet>
                <title>{ebookConfig.title} | {siteConfig.name}</title>
                <meta name="description" content={`${ebookConfig.subtitle}. Guide complet par ${siteConfig.name}, Assistante Sociale Indépendante avec plus de 10 ans d'expérience.`} />
                <meta name="keywords" content="ebook assistant social, installation libéral, guide assistante sociale, travail social indépendant, démarches administratives, création activité sociale" />
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
                <link rel="canonical" href={`${siteConfig.url}/ebook`} />
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
            </Helmet>
            
            {/* Flèches de navigation */}
            <ScrollButtons includeHomeButton={true} onHomeClick={() => navigate('/')} />
            
            {/* Navigation et fil d'ariane */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    {/* Fil d'ariane */}
                    <nav className="py-4 flex items-center text-sm text-gray-500" aria-label="Fil d'Ariane">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3" itemScope itemType="https://schema.org/BreadcrumbList">
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="inline-flex items-center">
                                <Link to="/" className="hover:text-primary transition-colors inline-flex items-center" itemProp="item">
                                    <Home className="w-3 h-3 mr-1" />
                                    <span itemProp="name">Accueil</span>
                                </Link>
                                <meta itemProp="position" content="1" />
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 mx-1" />
                                    <span className="text-gray-800 font-medium" itemProp="name">Ebook</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            
            {/* Contenu principal */}
            <main className="pb-16">
                {/* Section héro avec présentation de l'ebook */}
                <section id="presentation">
                    <EbookHero />
                </section>
                
                {/* Barre de navigation ancrée */}
                <div className="sticky top-0 z-20 bg-white shadow-md border-b border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center md:justify-start space-x-1 sm:space-x-4 overflow-x-auto py-2 text-sm whitespace-nowrap">
                            <a href="#presentation" className="px-3 py-1.5 text-gray-800 hover:text-primary transition-colors">Présentation</a>
                            <a href="#contenu" className="px-3 py-1.5 text-gray-800 hover:text-primary transition-colors">Contenu</a>
                            <a href="#temoignages" className="px-3 py-1.5 text-gray-800 hover:text-primary transition-colors">Témoignages</a>
                            <a href="#faq" className="px-3 py-1.5 text-gray-800 hover:text-primary transition-colors">FAQ</a>
                            <a href="#achat" className="px-3 py-1.5 text-primary font-medium">Acheter</a>
                        </div>
                    </div>
                </div>
                
                {/* Section contenu et table des matières */}
                <section id="contenu" className="py-16 bg-white scroll-mt-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-2">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">À propos de cet ebook</h2>
                                
                                <div className="prose prose-lg max-w-none">
                                    <p>
                                        Dans ce guide complet, je partage mon expertise et mon expérience de plus de 10 ans en tant qu'assistante sociale pour vous aider à réussir votre installation en libéral. Que vous soyez déjà professionnel ou en reconversion, ce guide vous accompagne pas à pas dans toutes les étapes nécessaires.
                                    </p>
                                    
                                    <p>
                                        <strong>Ce guide est fait pour vous si :</strong>
                                    </p>
                                    
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-2 shrink-0" />
                                            <span>Vous êtes assistant(e) social(e) et souhaitez vous installer en libéral</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-2 shrink-0" />
                                            <span>Vous cherchez à comprendre les aspects administratifs et juridiques</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-2 shrink-0" />
                                            <span>Vous avez besoin de conseils pratiques et d'exemples concrets</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-2 shrink-0" />
                                            <span>Vous désirez des modèles de documents pour démarrer rapidement</span>
                                        </li>
                                    </ul>
                                    
                                    <div className="my-8 flex flex-col sm:flex-row items-center gap-6 p-6 bg-primary/5 rounded-lg border border-primary/10">
                                        <div className="flex-shrink-0 w-48 max-w-full">
                                            <OptimizedImage
                                                src={ebookConfig.coverImage}
                                                alt={ebookConfig.title}
                                                className="w-full h-auto rounded-md shadow-lg hover:shadow-xl transition-shadow object-contain max-h-[300px]"
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
                                                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Format PDF</span>
                                                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Téléchargement immédiat</span>
                                                </div>
                                            </div>
                                            <a href="#achat">
                                                <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
                                                    <Download size={18} />
                                                    Acheter maintenant
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Bénéfices de l'ebook */}
                                <div className="mt-12">
                                    <h3 className="text-xl font-semibold mb-6">Ce que vous obtiendrez</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all hover:bg-gray-50/80">
                                                <div className="mr-4 mt-1">{benefit.icon}</div>
                                                <div>
                                                    <h4 className="font-semibold text-lg">{benefit.title}</h4>
                                                    <p className="text-gray-600">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Sidebar avec table des matières */}
                            <div className="md:col-span-1">
                                <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                                        <List className="h-5 w-5 mr-2 text-primary" />
                                        Table des matières
                                    </h3>
                                    <ol className="list-decimal ml-5 space-y-2">
                                        {tableOfContents.map((item, index) => (
                                            <li key={index} className="text-gray-700">{item}</li>
                                        ))}
                                    </ol>
                                    
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="flex items-center text-primary">
                                            <FileText className="h-5 w-5 mr-2" />
                                            <span className="font-medium">Format PDF</span>
                                        </div>
                                        <div className="flex items-center mt-2 text-primary">
                                            <Download className="h-5 w-5 mr-2" />
                                            <span className="font-medium">Téléchargement immédiat</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 text-center">
                                        <a href="#achat">
                                            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                                                Obtenir l'ebook ({ebookConfig.formattedPrice})
                                            </Button>
                                        </a>
                                    </div>
                                    
                                    {/* Badge de sécurité */}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex justify-center">
                                            <div className="bg-green-50 border border-green-200 rounded-md px-3 py-2 inline-flex items-center">
                                                <ShieldCheck className="h-4 w-4 text-green-600 mr-1" />
                                                <span className="text-xs text-green-800">Paiement sécurisé</span>
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
                                    <ContactButton />
                                    <a href="#achat">
                                        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
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
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
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
                                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                                            Télécharger l'ebook maintenant
                                        </Button>
                                    </Link>
                                    
                                    <div className="mt-6 flex flex-wrap justify-center gap-6">
                                        <div className="flex items-center">
                                            <Download className="h-5 w-5 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-600">Téléchargement immédiat</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-600">Format PDF</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
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
        </div>
    );
};

export default EbookPage;