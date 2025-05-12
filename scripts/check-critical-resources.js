#!/usr/bin/env node

/**
 * Script de vérification des URLs critiques du site
 * Vérifie l'accessibilité des pages de blog et des favicons SVG
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Fonction pour vérifier l'existence d'un fichier
const checkFileExists = (filePath) => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

console.log("\n===== VÉRIFICATION DES RESSOURCES CRITIQUES =====\n");

// Vérification des images de blog
const blogImageDir = path.join(rootDir, "public", "assets", "images", "blog");
const blogImages = [
  "assistante-sociale-independante-role.svg",
  "aides-sociales-normandie.svg",
  "preparer-rendez-vous-assistante-sociale.svg",
];

console.log("1. Vérification des images de blog:");
let allBlogImagesOK = true;

for (const image of blogImages) {
  const imagePath = path.join(blogImageDir, image);
  const exists = checkFileExists(imagePath);

  console.log(`  - ${image}: ${exists ? "✅ OK" : "❌ MANQUANT"}`);
  if (!exists) {
    allBlogImagesOK = false;
  }
}

// Vérification des favicons
const faviconPaths = [
  path.join(rootDir, "public", "favicon.svg"),
  path.join(rootDir, "public", "favicons", "favicon.svg"),
];

console.log("\n2. Vérification des favicons SVG:");
let allFaviconsOK = true;

for (const faviconPath of faviconPaths) {
  const exists = checkFileExists(faviconPath);
  console.log(
    `  - ${path.basename(faviconPath)} (${path
      .dirname(faviconPath)
      .split("/")
      .pop()}): ${exists ? "✅ OK" : "❌ MANQUANT"}`
  );
  if (!exists) {
    allFaviconsOK = false;
  }
}

// Vérification de l'intégration du composant ShareButton
const shareButtonPath = path.join(
  rootDir,
  "src",
  "components",
  "ShareButton.tsx"
);
const shareButtonExists = checkFileExists(shareButtonPath);

console.log("\n3. Vérification du composant ShareButton:");
console.log(
  `  - ShareButton.tsx: ${shareButtonExists ? "✅ OK" : "❌ MANQUANT"}`
);

// Vérification des routes dans les fichiers de configuration
console.log("\n4. Validation de la configuration des routes:");

// Vérifier que les routes de blog sont incluses dans 404.html
const file404Path = path.join(rootDir, "public", "404.html");
const file404Exists = checkFileExists(file404Path);
let blogRoutesIn404 = false;

if (file404Exists) {
  const file404Content = fs.readFileSync(file404Path, "utf8");
  blogRoutesIn404 = file404Content.includes("/blog");
  console.log(
    `  - Routes de blog dans 404.html: ${
      blogRoutesIn404 ? "✅ OK" : "❌ MANQUANTES"
    }`
  );
} else {
  console.log("  - Fichier 404.html: ❌ MANQUANT");
}

// Vérifier que les routes de blog sont incluses dans vercel.json
const vercelJsonPath = path.join(rootDir, "vercel.json");
const vercelJsonExists = checkFileExists(vercelJsonPath);
let blogRoutesInVercel = false;

if (vercelJsonExists) {
  const vercelJsonContent = fs.readFileSync(vercelJsonPath, "utf8");
  blogRoutesInVercel = vercelJsonContent.includes("/blog/:articleId");
  console.log(
    `  - Routes de blog dans vercel.json: ${
      blogRoutesInVercel ? "✅ OK" : "❌ MANQUANTES"
    }`
  );
} else {
  console.log("  - Fichier vercel.json: ❌ MANQUANT");
}

// Récapitulatif
console.log("\n===== RÉCAPITULATIF =====");
console.log(
  `Images de blog: ${allBlogImagesOK ? "✅ OK" : "❌ Problèmes détectés"}`
);
console.log(
  `Favicons SVG: ${allFaviconsOK ? "✅ OK" : "❌ Problèmes détectés"}`
);
console.log(
  `Composant ShareButton: ${shareButtonExists ? "✅ OK" : "❌ Manquant"}`
);
console.log(
  `Configuration des routes: ${
    blogRoutesIn404 && blogRoutesInVercel ? "✅ OK" : "❌ Problèmes détectés"
  }`
);

// Statut global
const allOK =
  allBlogImagesOK &&
  allFaviconsOK &&
  shareButtonExists &&
  blogRoutesIn404 &&
  blogRoutesInVercel;
console.log(
  `\nStatut global: ${
    allOK
      ? "✅ TOUTES LES VÉRIFICATIONS OK"
      : "❌ CERTAINES VÉRIFICATIONS ONT ÉCHOUÉ"
  }`
);
console.log("\n");
