import React from 'react';
import { Helmet } from 'react-helmet'; 
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
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
            </Helmet>
            
            {/* Bouton de retour vers la landing page */}
            <div className="back-to-home">
                <Link to="/" className="back-link">
                    <ChevronLeft size={20} />
                    <span>Retour à l'accueil</span>
                </Link>
            </div>
            
            {/* Contenu principal */}
            <main className="ebook-main">
                {/* Utilisation du composant EbookHero existant */}
                <EbookHero />
                
                <div className="container">
                    {/* Détails du ebook */}
                    <div className="testimonials-section">
                        <h2 className="section-title">Ce que disent les lecteurs</h2>
                        <div className="testimonials-grid">
                            <div className="testimonial-card">
                                <p className="testimonial-text">"Ce guide m'a vraiment aidé à comprendre mes droits et à effectuer mes démarches sans stress. Je recommande vivement !"</p>
                                <p className="testimonial-author">— Marie L.</p>
                            </div>
                            <div className="testimonial-card">
                                <p className="testimonial-text">"Grâce aux modèles de courrier, j'ai pu compléter mon dossier rapidement et obtenir mon aide en moins de 2 semaines."</p>
                                <p className="testimonial-author">— Thomas D.</p>
                            </div>
                            <div className="testimonial-card">
                                <p className="testimonial-text">"Les explications sont claires et précises. Un vrai gain de temps quand on ne sait pas par où commencer !"</p>
                                <p className="testimonial-author">— Sophie M.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Section finale d'appel à l'action */}
                    <div className="final-cta-section">
                        <h2>Simplifiez vos démarches administratives dès aujourd'hui</h2>
                        <p>Un investissement unique pour vous faire gagner du temps et éviter le stress des démarches</p>
                        <Button 
                            size="lg"
                            className="purchase-button"
                            onClick={() => window.location.href = '/acheter-ebook'}
                        >
                            Obtenir le guide pour {ebookConfig.formattedPrice}
                        </Button>
                        <p className="guarantee-text">{ebookConfig.guarantee}</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EbookPage;