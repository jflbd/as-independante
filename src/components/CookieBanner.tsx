
import { useState } from "react";
import { X, Cookie, Info } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CookieBanner = () => {
  const { consent, setConsent, showBanner, setShowBanner } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-primary/5 border-t border-primary/20 shadow-lg animate-fade-up">
      <div className="container mx-auto">
        <div className="relative flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white rounded-lg shadow-md border border-primary/10">
          <button 
            onClick={() => setShowBanner(false)} 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Fermer la bannière"
          >
            <X size={20} />
          </button>
          
          <div className="flex-shrink-0 bg-primary/20 p-3 rounded-full">
            <Cookie className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Ce site utilise des cookies</h3>
            <p className="text-sm text-gray-600 mb-2">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez accepter ou refuser les cookies non-essentiels.
            </p>
            
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogTrigger asChild>
                <button className="text-sm text-primary hover:underline flex items-center mb-3">
                  <Info className="h-4 w-4 mr-1" />
                  En savoir plus sur notre politique de cookies
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Politique de cookies</DialogTitle>
                  <DialogDescription>
                    Informations détaillées sur notre utilisation des cookies
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <h4 className="font-semibold">Que sont les cookies ?</h4>
                  <p>
                    Les cookies sont de petits fichiers texte qui sont stockés sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Ils permettent au site de mémoriser vos actions et préférences pendant une période déterminée, afin que vous n'ayez pas à les saisir à nouveau à chaque fois que vous revenez sur le site ou naviguez d'une page à une autre.
                  </p>
                  
                  <h4 className="font-semibold">Comment utilisons-nous les cookies ?</h4>
                  <p>
                    Notre site web utilise des cookies pour diverses raisons, notamment pour améliorer votre expérience de navigation, analyser comment vous utilisez notre site, et personnaliser le contenu pour vous. Nous utilisons à la fois des cookies de session, qui expirent lorsque vous fermez votre navigateur, et des cookies persistants, qui restent sur votre appareil jusqu'à ce qu'ils expirent ou que vous les supprimiez.
                  </p>
                  
                  <h4 className="font-semibold">Types de cookies que nous utilisons</h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      <span className="font-medium">Cookies essentiels :</span> Ces cookies sont nécessaires au fonctionnement de notre site web et ne peuvent pas être désactivés. Ils sont généralement établis en réponse à des actions que vous effectuez, comme définir vos préférences de confidentialité, vous connecter ou remplir des formulaires.
                    </li>
                    <li>
                      <span className="font-medium">Cookies analytiques :</span> Ces cookies nous permettent de compter les visites et les sources de trafic afin que nous puissions mesurer et améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et à voir comment les visiteurs se déplacent sur le site.
                    </li>
                    <li>
                      <span className="font-medium">Cookies de fonctionnalité :</span> Ces cookies permettent au site de fournir une fonctionnalité et une personnalisation améliorées. Ils peuvent être définis par nous ou par des fournisseurs tiers dont nous avons ajouté les services à nos pages.
                    </li>
                  </ul>
                  
                  <h4 className="font-semibold">Comment gérer vos cookies</h4>
                  <p>
                    Vous pouvez paramétrer votre navigateur pour qu'il refuse tous les cookies ou pour qu'il vous avertisse lorsqu'un cookie est envoyé. Cependant, si vous n'acceptez pas les cookies, il se peut que certaines parties du site ne fonctionnent pas correctement.
                  </p>
                  
                  <h4 className="font-semibold">Vos choix concernant les cookies</h4>
                  <p>
                    Vous pouvez choisir d'accepter ou de refuser les cookies non essentiels. Les cookies essentiels, qui sont nécessaires au fonctionnement de base du site, seront placés sur votre appareil quoi qu'il arrive. Mais vous avez le contrôle sur les autres types de cookies.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setConsent("accepted")}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Accepter les cookies
              </button>
              <button
                onClick={() => setConsent("rejected")}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Refuser les cookies non-essentiels
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
