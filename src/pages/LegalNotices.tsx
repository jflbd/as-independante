
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import LegalDefinitions from "../components/legal/LegalDefinitions";
import LegalPresentation from "../components/legal/LegalPresentation";
import LegalTermsOfUse from "../components/legal/LegalTermsOfUse";
import LegalServices from "../components/legal/LegalServices";
import LegalTechnicalLimitations from "../components/legal/LegalTechnicalLimitations";
import LegalIntellectualProperty from "../components/legal/LegalIntellectualProperty";
import LegalLiability from "../components/legal/LegalLiability";
import LegalPersonalData from "../components/legal/LegalPersonalData";
import LegalIncidentNotification from "../components/legal/LegalIncidentNotification";
import LegalCookies from "../components/legal/LegalCookies";
import LegalJurisdiction from "../components/legal/LegalJurisdiction";
import { siteConfig } from "@/config/siteConfig";

const LegalNotices = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Mentions légales | {siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="back-to-home mb-8">
          <Link 
            to="/" 
            className="flex items-center text-primary hover:text-primary/80 transition-colors text-lg font-semibold group"
          >
            <ArrowLeft className="h-6 w-6 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Retour à l'accueil
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Mentions légales</h1>
          
          <div className="prose prose-blue max-w-none">
            <LegalDefinitions />
            <LegalPresentation />
            <LegalTermsOfUse />
            <LegalServices />
            <LegalTechnicalLimitations />
            <LegalIntellectualProperty />
            <LegalLiability />
            <LegalPersonalData />
            <LegalIncidentNotification />
            <LegalCookies />
            <LegalJurisdiction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotices;
