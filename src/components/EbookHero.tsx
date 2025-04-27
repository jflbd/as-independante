import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, BookOpen } from 'lucide-react';
import { ebookConfig } from '@/config/ebookConfig';

const EbookHero: React.FC = () => {
    const navigate = useNavigate();

    const handleBuyNow = () => {
        navigate('/acheter-ebook');
    };

    return (
        <section id="ebook" className="py-12 md:py-16 bg-white" aria-labelledby="ebook-title">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
                        Guide Exclusif
                    </span>
                    <h2 id="ebook-title" className="text-2xl md:text-4xl font-serif font-bold mb-4">
                        {ebookConfig.title}
                    </h2>
                    <p className="text-gray-600">
                        {ebookConfig.subtitle}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-up max-w-5xl mx-auto overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2 w-full">
                            <h3 className="text-xl md:text-2xl font-serif font-bold mb-4 text-primary">
                                {ebookConfig.accroche}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {ebookConfig.description}
                            </p>

                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">Ce que vous trouverez dans ce guide :</h4>
                                <ul className="space-y-3">
                                    {ebookConfig.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6 space-y-2">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-primary mr-3">{ebookConfig.formattedPrice}</span>
                                    {ebookConfig.formattedPriceAvantPromo && (
                                        <span className="text-gray-500 line-through text-sm">{ebookConfig.formattedPriceAvantPromo}</span>
                                    )}
                                </div>
                                
                                {ebookConfig.guarantee && (
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500 italic">{ebookConfig.guarantee}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <Button 
                                    className="flex items-center gap-2"
                                    onClick={handleBuyNow}
                                >
                                    <Download size={18} />
                                    Obtenir le guide maintenant
                                </Button>
                                {window.location.pathname !== '/ebook' && (
                                    <Button 
                                        variant="outline" 
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                            navigate('/ebook', { replace: true });
                                            setTimeout(() => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }, 100);
                                        }}
                                    >
                                        <BookOpen size={18} />
                                        En savoir plus
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="md:w-1/2 w-full flex justify-center">
                            <div className="relative w-full max-w-[300px] mx-auto">
                                <div className="absolute inset-0 bg-primary/5 rounded-lg transform rotate-3"></div>
                                <img 
                                    src={ebookConfig.coverImage}
                                    alt={ebookConfig.title} 
                                    className="relative z-10 rounded-lg shadow-lg w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
                                    style={{ maxHeight: "450px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EbookHero;