// Script d'optimisation des images existantes (sans conversion en WebP)
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const assetsDir = path.join(publicDir, 'assets');

// Extensions d'images à optimiser
const imageExtensions = ['.png', '.jpg', '.jpeg'];

async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    
    // Si ce n'est pas une image à optimiser, on ignore
    if (!imageExtensions.includes(ext)) {
      return;
    }
    
    // Créer un fichier temporaire
    const tempPath = filePath + '.temp';
    console.log(`Optimisation de ${path.basename(filePath)}...`);
    
    // Optimiser l'image selon son format
    const img = sharp(filePath);
    const metadata = await img.metadata();
    
    if (ext === '.png') {
      await img.png({ quality: 80, compressionLevel: 9 }).toFile(tempPath);
    } else {
      await img.jpeg({ quality: 80, mozjpeg: true }).toFile(tempPath);
    }
    
    // Vérifier si l'image optimisée est plus petite
    const originalStats = await fs.stat(filePath);
    const optimizedStats = await fs.stat(tempPath);
    
    if (optimizedStats.size < originalStats.size) {
      // Remplacer l'original par la version optimisée
      await fs.rename(tempPath, filePath);
      const reduction = ((originalStats.size - optimizedStats.size) / originalStats.size) * 100;
      console.log(`✓ ${path.basename(filePath)} - Réduction: ${reduction.toFixed(2)}% (${(originalStats.size/1024).toFixed(2)}KB → ${(optimizedStats.size/1024).toFixed(2)}KB)`);
    } else {
      // Supprimer le fichier temporaire si l'optimisation n'a pas été efficace
      await fs.unlink(tempPath);
      console.log(`- ${path.basename(filePath)} déjà optimisé`);
    }
    
  } catch (error) {
    console.error(`Erreur lors de l'optimisation de ${filePath}:`, error);
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
      // Optimisation du fichier s'il s'agit d'une image
      await optimizeImage(fullPath);
    }
  }
}

// Fonction principale
async function main() {
  try {
    console.log('Début de l\'optimisation des images existantes...');
    await walkDirectory(assetsDir);
    console.log('Optimisation terminée avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'optimisation des images:', error);
    process.exit(1);
  }
}

main();