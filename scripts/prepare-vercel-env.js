#!/usr/bin/env node

/**
 * Script de préparation pour le déploiement Vercel
 * Ce script génère un fichier .env.production temporaire avec les valeurs par défaut
 * si les variables d'environnement ne sont pas définies sur Vercel
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Liste des variables d'environnement requises avec leurs valeurs par défaut
const defaultEnvVars = {
  VITE_APP_TITLE: "Rachel Gervais - Assistante Sociale Indépendante",
  VITE_APP_DESCRIPTION:
    "Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie.",
  VITE_APP_KEYWORDS:
    "assistante sociale, Normandie, accompagnement social, démarches administratives",
  VITE_APP_URL: "https://www.as-independante.fr",
  VITE_APP_ENV: "production",
};

// Fonction pour lire les variables d'environnement existantes
function getEnvValue(key, defaultValue) {
  return process.env[key] || defaultValue;
}

// Générer le contenu du fichier .env.production
let envContent =
  "# Fichier .env.production généré automatiquement pour le déploiement Vercel\n";
envContent += "# Ne pas modifier directement\n\n";

for (const [key, defaultValue] of Object.entries(defaultEnvVars)) {
  const value = getEnvValue(key, defaultValue);
  envContent += `${key}=${value}\n`;
}

// Écrire dans le fichier .env.production
try {
  fs.writeFileSync(path.resolve(process.cwd(), ".env.production"), envContent);
  console.log("✅ Fichier .env.production créé avec succès");

  // Afficher les valeurs utilisées
  console.log("\nVariables d'environnement pour le déploiement :");
  for (const key of Object.keys(defaultEnvVars)) {
    const value = getEnvValue(key, defaultEnvVars[key]);
    const displayValue =
      value.length > 30 ? value.substring(0, 30) + "..." : value;
    console.log(`${key}=${displayValue}`);
  }
} catch (error) {
  console.error(
    "❌ Erreur lors de la création du fichier .env.production :",
    error
  );
  process.exit(1);
}
