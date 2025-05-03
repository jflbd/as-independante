// Script de conversion des images en format WebP
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const assetsDir = path.join(publicDir, "assets");

// Extensions d'images à convertir
const imageExtensions = [".png", ".jpg", ".jpeg"];

async function convertToWebP(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // Si ce n'est pas une image ou c'est déjà un fichier WebP, on ignore
    if (!imageExtensions.includes(ext)) {
      return;
    }

    const webpPath = filePath.substring(0, filePath.lastIndexOf(".")) + ".webp";
    console.log(`Conversion de ${filePath} vers ${webpPath}...`);

    // Conversion vers WebP avec une qualité augmentée à 90%
    await sharp(filePath)
      .webp({ quality: 90, lossless: false, effort: 4 })
      .toFile(webpPath);

    console.log(`✓ Converti: ${path.basename(webpPath)}`);
  } catch (error) {
    console.error(`Erreur lors de la conversion de ${filePath}:`, error);
  }
}

async function walkDirectory(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Récursion pour les sous-répertoires
      await walkDirectory(fullPath);
    } else if (entry.isFile()) {
      // Conversion du fichier s'il s'agit d'une image
      await convertToWebP(fullPath);
    }
  }
}

// Fonction principale
async function main() {
  try {
    console.log("Début de la conversion des images en WebP...");
    await walkDirectory(assetsDir);
    console.log("Conversion terminée avec succès!");
  } catch (error) {
    console.error("Erreur lors de la conversion des images:", error);
    process.exit(1);
  }
}

main();
