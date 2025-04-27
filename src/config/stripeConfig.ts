// Configuration pour l'intégration Stripe

// Vérifier si la clé API est manquante ou utilise la valeur par défaut
const stripeKeyWarning = () => {
  const defaultKey = 'pk_test_dummy_key_for_development';
  const currentKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || defaultKey;
  
  if (currentKey === defaultKey) {
    console.warn(
      "⚠️ ATTENTION : Vous utilisez une clé API Stripe par défaut qui n'est pas valide. " +
      "Veuillez définir votre clé API Stripe réelle dans le fichier .env avec la variable VITE_STRIPE_PUBLISHABLE_KEY. " +
      "Pour le mode test, utilisez votre clé qui commence par pk_test_..."
    );
  }
  return currentKey;
};

export const stripeConfig = {
  publishableKey: stripeKeyWarning(),
  testMode: import.meta.env.MODE !== 'production',
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0D8496',
      colorBackground: '#ffffff',
      colorText: '#1F2937',
      borderRadius: '6px',
    },
    rules: {
      '.Input': {
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      '.Input:focus': {
        border: '1px solid #0D8496',
        boxShadow: '0 0 0 1px #0D8496',
      },
      '.Label': {
        fontSize: '14px',
        color: '#4B5563',
      },
      '.Button': {
        backgroundColor: '#0D8496',
        fontSize: '16px',
        padding: '10px 20px',
      },
      '.Button:hover': {
        backgroundColor: '#065964',
      },
    },
  },
};

// Cartes de test pour Stripe
export const testCards = [
  {
    name: "Succès",
    number: "4242 4242 4242 4242",
    expiry: "Toute date future",
    cvc: "Tout code à 3 chiffres"
  },
  {
    name: "Échec",
    number: "4000 0000 0000 0002",
    expiry: "Toute date future",
    cvc: "Tout code à 3 chiffres"
  },
  {
    name: "Authentification requise",
    number: "4000 0025 0000 3155",
    expiry: "Toute date future",
    cvc: "Tout code à 3 chiffres"
  }
];