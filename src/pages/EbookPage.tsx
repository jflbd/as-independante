import React from 'react';
import { Helmet } from 'react-helmet-async'; 
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EbookHero from '@/components/EbookHero';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/siteConfig';
import { ebookConfig } from '@/config/ebookConfig';

const EbookPage: React.FC = () => {
    return (
        <div className="ebook-page">
        <Helmet>
            <title>{ebookConfig.title} | {siteConfig.name}</title>
            <meta name="description" content={`${ebookConfig.subtitle}. Par ${siteConfig.name}, Assistante Sociale Indépendante.`} />
            <meta property="og:title" content={`${ebookConfig.title} | ${siteConfig.name}`} />
            <meta property="og:description" content={ebookConfig.description} />
            <meta property="og:type" content="product" />
            <meta property="og:url" content={`${siteConfig.url}/ebook`} />
            <meta property="og:image" content={`${siteConfig.url}${ebookConfig.coverImage}`} />
            <link rel="canonical" href={`${siteConfig.url}/ebook`} />
        </Helmet>
            
            {/* Bouton de retour vers la landing page */}            
            <div className="back-to-home py-6 px-4 flex justify-left bg-white">
                <Link 
                    to="/" 
                    className="flex items-center text-primary hover:text-primary/80 transition-colors text-lg font-semibold group"
                >
                    <ArrowLeft className="h-6 w-6 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Revenir sur le site
                </Link>
            </div>
            
            {/* Contenu principal */}
            <main className="ebook-main">
                {/* Utilisation du composant EbookHero existant */}
                <EbookHero />
                
                {/* Détails du ebook */}
                <section className="testimonials-section py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-10">Ce que disent mes lecteurs</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    text: "Ce guide m'a vraiment aidé à comprendre les démarches administratives et à structurer mon activité en libéral. Un indispensable !",
                                    author: "Marie L.",
                                    rating: 5,
                                    role: "Mère de famille",
                                    image: "/assets/avisuser/testimonial-3.jpg" // Optionnel
                                },
                                {
                                    text: "Grâce aux conseils pratiques et aux modèles de documents, j'ai pu m'installer en libéral sans stress. Je recommande vivement ce guide.",
                                    author: "Jean D.",
                                    rating: 5,
                                    role: "Fonctionnaire",
                                    image: "/assets/avisuser/testimonial-2.jpg" // Optionnel
                                },
                                {
                                    text: "Les explications sont claires et précises. Ce guide m'a permis de gagner du temps et d'éviter les erreurs courantes lors de l'installation en libéral.",
                                    author: "Sophie M.",
                                    rating: 5,
                                    role: "Étudiante",
                                    image: "/assets/avisuser/testimonial-3.jpg" // Optionnel
                                }
                            ].map((testimonial, index) => (
                                <div 
                                    className="testimonial-card bg-white" style={{ borderRadius: '0.5rem' }}
                                    key={index}
                                >
                                    {/* Guillemet décoratif */}
                                    <div className="absolute -top-3 -left-3 text-4xl text-primary/20">"</div>
                                    
                                    {/* Étoiles */}
                                    <div className="flex mb-4">
                                        {Array(5).fill(0).map((_, i) => (
                                            <svg 
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    
                                    {/* Texte du témoignage */}
                                    <p className="testimonial-text text-gray-700 mb-6 leading-relaxed">
                                        "{testimonial.text}"
                                    </p>
                                    
                                    {/* Auteur */}
                                    <div className="flex items-center">
                                        {testimonial.image ? (
                                            <img 
                                                src={testimonial.image} 
                                                alt={testimonial.author} 
                                                className="w-12 h-12 rounded-full object-cover mr-4"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold mr-4">
                                                {testimonial.author.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold">{testimonial.author}</p>
                                            {testimonial.role && (
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Badge de confiance */}
                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span className="text-sm font-medium">100% des lecteurs satisfaits</span>
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