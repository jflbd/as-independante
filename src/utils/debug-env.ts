/**
 * Script de débogage pour afficher les variables d'environnement
 * 
 * Ce script permet d'afficher toutes les variables d'environnement importantes
 * de l'application dans la console pour faciliter le débogage.
 */

export function logEnvironmentVariables() {
  // Styles pour la console
  const headerStyle = 'font-weight: bold; font-size: 14px; color: #2d3748; padding: 4px 0;';
  const groupStyle = 'font-weight: bold; color: #3182ce; padding: 2px 0;';
  const keyStyle = 'background: #4a5568; color: white; padding: 2px 4px; border-radius: 2px;';
  const valueStyle = 'color: #2c5282; font-weight: bold;';
  const errorStyle = 'color: #c53030; font-weight: bold;';
  
  // Afficher l'en-tête
  console.log('%c🛠️ Mode débogage activé', 'background: #234E52; color: white; padding: 4px 8px; font-size: 12px; border-radius: 2px;');
  
  // Groupe principal
  console.group('Variables d\'environnement de l\'application');
  
  // Informations sur l'environnement
  console.log('Environnement:', import.meta.env.MODE || 'non défini');
  console.log('VITE_APP_ENV:', import.meta.env.VITE_APP_ENV || 'non défini');
  console.log('Développement:', import.meta.env.DEV ? 'Oui' : 'Non');
  console.log('Production:', import.meta.env.PROD ? 'Oui' : 'Non');
  console.log('Debug:', import.meta.env.VITE_DEBUG === 'true' ? 'Activé' : 'Désactivé');
  
  // PayPal
  console.group('Configuration PayPal');
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  if (paypalClientId) {
    console.log(
      'Client ID:',
      `${paypalClientId.substring(0, 10)}...${paypalClientId.substring(paypalClientId.length - 5)}`
    );
    // Utiliser la même logique que dans paypalConfig.ts
    console.log('Mode test:', import.meta.env.VITE_APP_ENV !== 'production' ? 'Activé' : 'Désactivé');
  } else {
    console.log('Client ID: NON DÉFINI - Vérifiez vos fichiers .env');
  }
  console.groupEnd();
  
  // Stripe
  console.group('Configuration Stripe');
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (stripeKey) {
    console.log(
      'Clé publique:',
      `${stripeKey.substring(0, 10)}...${stripeKey.substring(stripeKey.length - 5)}`
    );
    const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
    if (stripeSecretKey) {
      console.log(
        'Clé secrète:',
        `${stripeSecretKey.substring(0, 10)}...${stripeSecretKey.substring(stripeSecretKey.length - 5)}`
      );
    } else {
      console.log('Clé secrète: NON DÉFINIE - Vérifiez vos fichiers .env');
    }
    // Ajouter l'affichage du mode test pour Stripe
    console.log('Mode test:', import.meta.env.VITE_APP_ENV !== 'production' ? 'Activé' : 'Désactivé');
  } else {
    console.log('Clé publique: NON DÉFINIE - Vérifiez vos fichiers .env');
  }
  console.groupEnd();
  
  // API
  console.group('Configuration API');
  console.log('URL de base:', import.meta.env.VITE_API_BASE_URL || 'non définie');
  console.groupEnd();
  
  console.groupEnd(); // Fin du groupe principal
}

// Fonction pour débogage avec JSON.stringify formaté
export function debugObject(title: string, obj: unknown): void {
  console.group(`🔍 ${title}`);
  console.log(JSON.stringify(obj, null, 2));
  console.groupEnd();
}

// Export d'une fonction qui exécute le log immédiatement
export function debugEnvironment(): void {
  logEnvironmentVariables();
}

// Log automatique en développement si VITE_DEBUG est actif
if (import.meta.env.DEV && import.meta.env.VITE_DEBUG === 'true') {
  // Exécution différée pour s'assurer que l'application est chargée
  setTimeout(() => {
    logEnvironmentVariables();
  }, 100);
}