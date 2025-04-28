// Configuration pour l'intégration PayPal
// Ce fichier contient les paramètres pour les environnements de test et de production

/**
 * Détermine si l'application fonctionne en mode développement
 * import.meta.env.MODE est automatiquement défini par Vite
 * - 'development' pendant le développement local (npm run dev)
 * - 'production' lors de la build de production (npm run build)
 */
const isDevelopment = import.meta.env.MODE === 'development';

export const paypalConfig = {
  // Mode test activé en développement, désactivé en production
  testMode: isDevelopment,
  
  // ID client PayPal récupéré depuis les variables d'environnement
  // La même variable VITE_PAYPAL_CLIENT_ID aura des valeurs différentes 
  // selon l'environnement (.env.development vs .env.production)
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  
  // Configuration pour le bouton PayPal
  buttonConfig: {
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'pay',
      height: 40,
    },
  },
  
  // Comptes de test PayPal Sandbox (uniquement pour développement)
  testAccounts: {
    business: {
      email: 'sb-ae8bz41008247@business.example.com',
      password: '@n&8F+Jc',
    },
    personal: {
      email: 'sb-cjzgc40987248@personal.example.com',
      password: '6pJt.%.8',
    },
  },
  
  // Instructions pour les développeurs
  instructions: `
    Pour tester PayPal en environnement sandbox :
    
    1. Connectez-vous à votre compte développeur PayPal : https://developer.paypal.com/
    2. Accédez à la section Sandbox > Accounts pour créer/gérer des comptes de test
    3. Utilisez ces comptes pour effectuer des achats de test
    4. Consultez les transactions dans la section Sandbox > Transactions
    
    En mode test, aucun véritable paiement ne sera effectué.
  `,
};