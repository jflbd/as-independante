import { useEffect } from 'react';
import { useCookieConsent } from '../contexts/CookieConsentContext';

type TarteAuCitronOptions = {
  privacyUrl: string;
  hashtag: string;
  cookieName: string;
  orientation: string;
  groupServices: boolean;
  showAlertSmall: boolean;
  cookieslist: boolean;
  closePopup: boolean;
  showIcon: boolean;
  iconPosition: string;
  adblocker: boolean;
  DenyAllCta: boolean;
  AcceptAllCta: boolean;
  highPrivacy: boolean;
  handleBrowserDNTRequest: boolean;
  removeCredit: boolean;
  moreInfoLink: boolean;
  useExternalCss: boolean;
  readmoreLink: string;
  mandatory: boolean;
  mandatoryCta: boolean;
};

interface TarteAuCitronService {
  userCallback?: (consent: boolean) => void;
  [key: string]: unknown;
}

declare global {
  interface Window {
    tarteaucitron: {
      init: (options: TarteAuCitronOptions) => void;
      job: string[];
      user: {
        bypass: () => void;
      };
      userInterface: {
        openPanel: () => void;
        closePanel: () => void;
      };
      services: Record<string, TarteAuCitronService>;
    };
  }
}

export default function TarteAuCitron() {
  const { setConsent } = useCookieConsent();

  useEffect(() => {
    // Charger la feuille de style personnalisée
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/lib/tarteaucitron/tarteaucitron-custom.css';
    document.head.appendChild(linkElement);
    
    // Charger le script tarteaucitron
    const script = document.createElement('script');
    script.src = '/lib/tarteaucitron/tarteaucitron.js';
    script.async = true;
    
    script.onload = () => {
      // Initialiser tarteaucitron une fois le script chargé
      if (window.tarteaucitron) {
        window.tarteaucitron.init({
          "privacyUrl": "/mentions-legales", // URL de la page de politique de confidentialité
          "hashtag": "#tarteaucitron", // Hashtag pour ouvrir le panneau
          "cookieName": "tarteaucitron", // Nom du cookie
          "orientation": "middle", // Position du panneau: top, bottom, middle
          "groupServices": false, // Grouper les services par catégorie
          "showAlertSmall": false, // Afficher la petite bannière en bas à droite
          "cookieslist": true, // Afficher la liste des cookies
          "closePopup": false, // Afficher un bouton X sur la bannière
          "showIcon": true, // Afficher l'icône tarteaucitron
          "iconPosition": "BottomRight", // Position de l'icône: BottomRight, BottomLeft, TopRight, TopLeft
          "adblocker": false, // Afficher un message si un bloqueur de publicités est détecté
          "DenyAllCta": true, // Afficher le bouton "Tout refuser"
          "AcceptAllCta": true, // Afficher le bouton "Accepter tout"
          "highPrivacy": true, // Désactiver le consentement automatique
          "handleBrowserDNTRequest": false, // Respecter le paramètre DoNotTrack du navigateur
          "removeCredit": true, // Supprimer le lien vers tarteaucitron
          "moreInfoLink": true, // Afficher le lien "En savoir plus"
          "useExternalCss": true, // Utiliser une feuille de style externe
          "readmoreLink": "/mentions-legales", // Lien "En savoir plus" personnalisé
          "mandatory": true, // Afficher un message sur les cookies obligatoires
          "mandatoryCta": true, // Afficher un bouton de fermeture pour le message sur les cookies obligatoires
        });

        // Mise à jour du contexte de consentement global lorsque le statut de consentement change
        const originalUserCallback = window.tarteaucitron.services.gtag?.userCallback;
        window.tarteaucitron.services.gtag = window.tarteaucitron.services.gtag || {};
        window.tarteaucitron.services.gtag.userCallback = function(consent: boolean) {
          if (typeof originalUserCallback === 'function') {
            originalUserCallback(consent);
          }
          setConsent(consent ? "accepted" : "rejected");
        };
      }
    };
    
    document.head.appendChild(script);
    
    // Nettoyage lors du démontage du composant
    return () => {
      if (linkElement.parentNode) {
        linkElement.parentNode.removeChild(linkElement);
      }
      // Le script ne peut pas être supprimé car tarteaucitron doit continuer à fonctionner
    };
  }, [setConsent]);

  // Méthode pour ouvrir le panneau manuellement (peut être exportée)
  const openTACPanel = () => {
    if (window.tarteaucitron && window.tarteaucitron.userInterface) {
      window.tarteaucitron.userInterface.openPanel();
    }
  };

  return null; // Ce composant ne rend rien visuellement
}