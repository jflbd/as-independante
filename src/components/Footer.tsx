import React from 'react';
import SafeLink from '@/components/SafeLink';
import { siteConfig } from '@/config/siteConfig';
import { SiFacebook } from '@icons-pack/react-simple-icons';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 bg-gray-50 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40"></div>
        <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                <div>
                    <p className="text-gray-600 mb-2">&copy; {new Date().getFullYear()} {siteConfig.name} - Assistante Sociale Indépendante. Tous droits réservés.</p>
                    <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-500">
                        <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {siteConfig.contact.email}
                        </a>
                        <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary transition-colors flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {siteConfig.contact.phone}
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-2">
                    <SafeLink 
                    to={siteConfig.social.facebook} 
                    external={true}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors group"
                    aria-label="Facebook"
                    >
                    <SiFacebook className="h-5 w-5 text-[#1877F2] transition-transform group-hover:scale-125 group-hover:rotate-12" />
                    <span className="text-sm">Rejoignez-moi sur Facebook</span>
                    </SafeLink>
                    <div className="text-xs text-gray-500">{siteConfig.contact.region}, {siteConfig.contact.country}</div>
                </div>
            </div>
            <div className="flex justify-center">
            <SafeLink 
                to="/mentions-legales" 
                className="text-sm text-gray-500 hover:text-primary hover:underline transition-colors"
            >
                Mentions légales
            </SafeLink>
            </div>
        </div>
        </footer>
    );
};

export default Footer;