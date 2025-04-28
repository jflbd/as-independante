import { useEffect, useRef, useState, useCallback } from 'react';
import { paypalConfig } from '../../config/paypalConfig';
import { siteConfig } from '../../config/siteConfig';
import { useToast } from '../../hooks/use-toast';
import { 
  PayPalOrderResponseData, 
  PayPalOrderData,
  PayPalActions, 
  PayPalButtonsOptions,
  PayPalButtonsComponent,
  PayPalSDK
} from './types/paypal';

// Props du composant
interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: PayPalOrderResponseData) => void;
  onError?: (error: Error) => void;
  description?: string;
  clientData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  disabled?: boolean;
  className?: string;
}

// Définition globale de l'interface Window pour la SDK PayPal
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPal.ButtonsConfig) => {
        render: (selector: string) => void;
      };
    };
  }
}

export function PayPalButton({
  amount,
  onSuccess,
  onError,
  description = siteConfig.services.defaultDescription,
  clientData,
  disabled = false,
  className = '',
}: PayPalButtonProps) {
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [buttonRendered, setButtonRendered] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Référence pour stocker la dernière valeur du montant
  const lastAmountRef = useRef<number>(amount);

  // Mémoriser les fonctions de rappel pour éviter les redéfinitions inutiles
  const handleSuccess = useCallback((details: PayPalOrderResponseData) => {
    toast({
      title: 'Paiement réussi',
      description: `Merci pour votre paiement. Votre transaction a été complétée.`,
    });
    onSuccess(details);
  }, [onSuccess, toast]);

  const handleError = useCallback((err: Error) => {
    console.error('Erreur PayPal', err);
    toast({
      title: 'Erreur PayPal',
      description: 'Une erreur est survenue avec PayPal. Veuillez réessayer.',
      variant: 'destructive',
    });
    
    if (onError) onError(err);
  }, [onError, toast]);

  // Vérifier la validité du montant dès le chargement du composant
  useEffect(() => {
    if (amount === undefined || amount === null || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Le montant du paiement est invalide ou non spécifié");
    } else {
      setError(null);
      
      // Si le montant a changé, réinitialiser le rendu du bouton
      if (lastAmountRef.current !== amount) {
        lastAmountRef.current = amount;
        setButtonRendered(false);
      }
    }
  }, [amount]);

  // Fonction pour charger le script PayPal
  useEffect(() => {
    if (disabled || error) return;

    // Vérifier si le script PayPal existe déjà
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      // Si le script est déjà chargé, vérifier si PayPal est disponible
      if (window.paypal) {
        setScriptLoaded(true);
        return;
      }
      
      // Si le script existe mais PayPal n'est pas disponible, supprimer le script pour le recharger
      existingScript.remove();
    }

    // Vérifier si la configuration PayPal est valide
    if (!paypalConfig.clientId) {
      setError("La configuration PayPal est incomplète. Veuillez configurer l'identifiant client.");
      return;
    }

    // Créer le script PayPal avec tous les paramètres nécessaires
    const domain = paypalConfig.testMode ? 'sandbox.paypal.com' : 'www.paypal.com';
    const scriptElement = document.createElement('script');
    scriptElement.src = `https://${domain}/sdk/js?client-id=${
      paypalConfig.clientId
    }&currency=EUR&intent=capture&components=buttons`;
    scriptElement.async = true;
    scriptElement.dataset.sdkIntegrationSource = 'button-factory';

    // Définir les gestionnaires d'événements pour le chargement du script
    scriptElement.onload = () => {
      console.log('PayPal SDK chargé avec succès');
      setScriptLoaded(true);
    };
    
    scriptElement.onerror = (event) => {
      console.error('Erreur de chargement du script PayPal', event);
      setError("Impossible de charger PayPal. Veuillez vérifier votre connexion et réessayer.");
      toast({
        title: 'Erreur PayPal',
        description: 'Impossible de charger PayPal. Veuillez réessayer plus tard.',
        variant: 'destructive',
      });
    };

    // Ajouter le script au document
    document.body.appendChild(scriptElement);

    // Nettoyage à la désinstallation du composant
    return () => {
      if (document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [disabled, error, toast]);

  // Fonction pour rendre le bouton PayPal
  useEffect(() => {
    // Ne pas continuer s'il y a des conditions qui ne sont pas remplies
    if (!scriptLoaded || !paypalButtonRef.current || buttonRendered || disabled || error) return;

    // Vider d'abord le conteneur
    if (paypalButtonRef.current) {
      paypalButtonRef.current.innerHTML = '';
    }

    // Attendre un court instant pour s'assurer que le SDK est complètement initialisé
    const timeoutId = setTimeout(() => {
      try {
        if (!window.paypal || typeof window.paypal.Buttons !== 'function') {
          throw new Error("L'API PayPal n'est pas correctement initialisée");
        }

        const amountValue = parseFloat(amount.toString());
        if (isNaN(amountValue) || amountValue <= 0) {
          throw new Error("Le montant du paiement est invalide");
        }

        // Utilisation d'un ID unique pour le conteneur
        const containerId = `paypal-button-container-${Date.now()}`;
        if (paypalButtonRef.current) {
          paypalButtonRef.current.id = containerId;
        }

        const button = window.paypal.Buttons({
          style: paypalConfig.buttonConfig.style,
          createOrder: (_data: unknown, actions: PayPalActions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: description,
                  amount: {
                    currency_code: 'EUR',
                    value: amountValue.toFixed(2),
                  },
                },
              ],
              ...(clientData?.email && {
                payer: {
                  email_address: clientData.email,
                  name: {
                    given_name: clientData.firstName || '',
                    surname: clientData.lastName || '',
                  },
                },
              }),
            });
          },
          onApprove: async (data: {orderID: string}, actions: PayPalActions) => {
            try {
              if (!actions || !actions.order || typeof actions.order.capture !== 'function') {
                throw new Error("L'API PayPal ne permet pas de capturer le paiement");
              }
              const details = await actions.order.capture();
              if (paypalConfig.testMode) {
                console.log('Transaction PayPal (TEST) réussie', details);
              }
              handleSuccess(details);
            } catch (error) {
              console.error('Erreur lors de la capture du paiement PayPal', error);
              const errorToHandle = error instanceof Error ? error : new Error(String(error));
              handleError(errorToHandle);
            }
          },
          onError: (err: Error) => handleError(err),
          onCancel: () => {
            toast({
              title: 'Paiement annulé',
              description: 'Vous avez annulé le processus de paiement.',
            });
          },
        });
        // Suppression de isEligible et .then
        if (paypalButtonRef.current) {
          button.render(`#${containerId}`);
          setButtonRendered(true);
        }
      } catch (error: unknown) {
        console.error('Erreur lors du rendu du bouton PayPal', error);
        const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'initialisation du bouton PayPal";
        setError(errorMessage);
        toast({
          title: 'Erreur PayPal',
          description: 'Impossible d\'initialiser le bouton PayPal. Veuillez réessayer.',
          variant: 'destructive',
        });
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [amount, description, handleSuccess, handleError, clientData, disabled, toast, scriptLoaded, buttonRendered, error]);

  return (
    <div className={className}>
      {paypalConfig.testMode && (
        <div className="p-2 mb-4 text-sm bg-amber-100 border border-amber-300 rounded text-amber-800">
          <p className="font-bold">Mode test PayPal actif</p>
          <p>Utilisez les identifiants sandbox pour tester les paiements.</p>
          <p className="mt-1 text-xs">Email: sb-cjzgc40987248@personal.example.com</p>
        </div>
      )}
      {error && (
        <div className="p-2 mb-4 text-sm bg-red-100 border border-red-300 rounded text-red-800">
          <p className="font-bold">Erreur PayPal</p>
          <p>{error}</p>
        </div>
      )}
      <div ref={paypalButtonRef} id="paypal-button-container" className="min-h-[150px]" />
      {disabled && <div className="text-center text-gray-500 mt-2">Bouton PayPal désactivé</div>}
    </div>
  );
}