#!/usr/bin/env node

/**
 * Script de vérification des variables d'environnement
 * Ce script vérifie que toutes les variables d'environnement nécessaires sont définies
 * avant le déploiement ou la construction
 */

const requiredEnvVars = [
  'VITE_APP_TITLE',
  'VITE_APP_DESCRIPTION',
  'VITE_APP_KEYWORDS',
  'VITE_APP_URL',
];

const optionalEnvVars = [
  'VITE_CONTACT_EMAIL',
  'VITE_CONTACT_PHONE',
  'VITE_SOCIAL_FACEBOOK',
  'VITE_LEGAL_SIRET',
  'VITE_PAYPAL_CLIENT_ID',
  'VITE_STRIPE_PUBLISHABLE_KEY',
  'VITE_APP_ENV',
];

// Vérification des variables d'environnement requises
const missingVars = [];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    missingVars.push(envVar);
  }
}

// Affichage des résultats
if (missingVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Variables d\'environnement manquantes :');
  console.error('\x1b[33m%s\x1b[0m', missingVars.join('\n'));
  
  console.log('\x1b[36m%s\x1b[0m', `
Pour les déploiements Vercel, vous pouvez configurer ces variables de deux façons :

1. Dans l'interface Vercel :
   - Allez dans votre tableau de bord Vercel
   - Sélectionnez votre projet
   - Cliquez sur "Settings" > "Environment Variables"
   - Ajoutez chaque variable manquante

2. Dans votre fichier vercel.json :
   - Ajoutez une section "env" avec les variables nécessaires
   - Exemple :
     "env": {
       "VITE_APP_TITLE": "Votre titre",
       "VITE_APP_DESCRIPTION": "Votre description"
     }

Note: La méthode 1 est préférable pour les informations sensibles.
`);
  
  // Sortie avec un code d'erreur si nous ne sommes pas en CI
  if (!process.env.CI) {
    process.exit(1);
  }
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ Toutes les variables d\'environnement requises sont définies');
}

// Vérification des variables optionnelles
const missingOptionalVars = [];
for (const envVar of optionalEnvVars) {
  if (!process.env[envVar]) {
    missingOptionalVars.push(envVar);
  }
}

if (missingOptionalVars.length > 0) {
  console.log('\x1b[33m%s\x1b[0m', `⚠️ Variables d'environnement optionnelles non définies :`);
  console.log('\x1b[33m%s\x1b[0m', missingOptionalVars.join('\n'));
  console.log('\x1b[36m%s\x1b[0m', 'Ces variables sont optionnelles mais recommandées pour une configuration complète.');
}
