// Script pour générer toutes les variantes de favicons à partir d'une image source
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

// Chemin vers l'image source (on privilégie SVG puis PNG)
const svgSourcePath = path.join(process.cwd(), "public", "favicon.svg");
const pngSourcePath = path.join(process.cwd(), "public", "favicon.png");

// Détermine le chemin source à utiliser (SVG ou PNG)
let sourceImagePath;
const faviconOutputDir = path.join(process.cwd(), "public", "favicons");

// Configuration des tailles d'icônes Apple à générer
const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180, 192, 512];

// Autres tailles d'icônes standard
const standardSizes = [16, 32, 48, 96];

// Génère une icône de taille spécifique
async function generateIcon(size, outputPath) {
  try {
    console.log(`Génération de l'icône ${size}x${size}px...`);

    await sharp(sourceImagePath)
      .resize(size, size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png({ quality: 90 })
      .toFile(outputPath);

    console.log(`✓ Icône ${size}x${size}px générée avec succès`);
    return true;
  } catch (error) {
    console.error(
      `Erreur lors de la génération de l'icône ${size}x${size}px:`,
      error
    );
    return false;
  }
}

// Génère une icône au format .ico (pour favicon.ico)
async function generateFaviconIco() {
  try {
    console.log("Génération du fichier favicon.ico...");

    // Création des versions 16x16, 32x32 et 48x48 pour le fichier .ico
    const icoSizes = [16, 32, 48];
    const icoBuffers = [];

    for (const size of icoSizes) {
      const buffer = await sharp(sourceImagePath).resize(size, size).toBuffer();
      icoBuffers.push(buffer);
    }

    // Génération du favicon.ico dans le dossier public/favicons
    const faviconIcoPath = path.join(faviconOutputDir, "favicon.ico");
    await sharp(sourceImagePath).resize(32, 32).toFile(faviconIcoPath);

    // Copie du favicon.ico à la racine du dossier public pour la compatibilité
    await fs.copyFile(
      faviconIcoPath,
      path.join(process.cwd(), "public", "favicon.ico")
    );

    console.log("✓ favicon.ico généré avec succès");
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de la génération du fichier favicon.ico:",
      error
    );
    return false;
  }
}

// Fonction principale
async function main() {
  try {
    console.log("Début de la génération des favicons...");

    // Vérifier quelle source image utiliser (priorité au SVG)
    try {
      await fs.access(svgSourcePath);
      sourceImagePath = svgSourcePath;
      console.log("Utilisation du format SVG comme source pour les favicons");
    } catch {
      try {
        await fs.access(pngSourcePath);
        sourceImagePath = pngSourcePath;
        console.log("Utilisation du format PNG comme source pour les favicons");
      } catch {
        throw new Error(
          "Aucune image source (favicon.svg ou favicon.png) n'a été trouvée."
        );
      }
    }

    // Créer le répertoire de sortie s'il n'existe pas
    await fs.mkdir(faviconOutputDir, { recursive: true });

    // Si c'est un SVG, copier directement le SVG dans le répertoire de sortie
    if (sourceImagePath.endsWith(".svg")) {
      await fs.copyFile(
        sourceImagePath,
        path.join(faviconOutputDir, "favicon.svg")
      );

      // Et également à la racine du dossier public
      await fs.copyFile(
        sourceImagePath,
        path.join(process.cwd(), "public", "favicon.svg")
      );
      console.log("✓ favicon.svg copié avec succès");
    }

    // Générer toutes les tailles d'icônes Apple
    for (const size of appleSizes) {
      const outputPath = path.join(
        faviconOutputDir,
        `apple-touch-icon-${size}x${size}.png`
      );
      await generateIcon(size, outputPath);
    }

    // Générer les icônes standard
    for (const size of standardSizes) {
      const outputPath = path.join(
        faviconOutputDir,
        `favicon-${size}x${size}.png`
      );
      await generateIcon(size, outputPath);
    }

    // Générer le favicon.ico
    await generateFaviconIco();

    // Copier l'image source vers le dossier public comme favicon.png
    await fs.copyFile(
      sourceImagePath,
      path.join(process.cwd(), "public", "favicon.png")
    );

    console.log("Génération des favicons terminée avec succès!");
  } catch (error) {
    console.error("Erreur lors de la génération des favicons:", error);
    process.exit(1);
  }
}

main();
