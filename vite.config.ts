import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";
import { siteConfig } from './src/config/siteConfig';
import replace from '@rollup/plugin-replace';
// @ts-expect-error - Plugin personnalisé local
import envReplace from './vite-plugin-env-replace';

// Charger les variables d'environnement
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Redirection des requêtes API vers les fonctions API locales
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path,
      }
    }
  },
  plugins: [
    react(),
    replace({
      'preventAssignment': true,
      'process.env.VITE_APP_TITLE': JSON.stringify(process.env.VITE_APP_TITLE || 'Rachel Gervais - Assistante Sociale Indépendante'),
      'process.env.VITE_APP_DESCRIPTION': JSON.stringify(process.env.VITE_APP_DESCRIPTION || 'Rachel Gervais, assistante sociale diplômée d\'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie.'),
      'process.env.VITE_APP_KEYWORDS': JSON.stringify(process.env.VITE_APP_KEYWORDS || 'assistante sociale, Normandie, accompagnement social'),
      'process.env.VITE_APP_URL': JSON.stringify(process.env.VITE_APP_URL || 'https://www.as-independante.fr'),
      'process.env.VITE_APP_ENV': JSON.stringify(process.env.VITE_APP_ENV || 'production')
    }),
    envReplace(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Diviser les dépendances en chunks séparés
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'react-router-dom'],
          // Ajouter d'autres chunks personnalisés si nécessaire
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Ajuster la limite de taille des chunks si nécessaire
  },
  define: {
    // Définir explicitement les variables d'environnement pour le remplacement
    // Cette approche garantit que les valeurs sont accessibles à la fois dans le JS et dans le HTML
    'process.env.VITE_APP_TITLE': JSON.stringify(process.env.VITE_APP_TITLE || 'Rachel Gervais - Assistante Sociale Indépendante'),
    'process.env.VITE_APP_DESCRIPTION': JSON.stringify(process.env.VITE_APP_DESCRIPTION || 'Rachel Gervais, assistante sociale diplômée d\'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie.'),
    'process.env.VITE_APP_KEYWORDS': JSON.stringify(process.env.VITE_APP_KEYWORDS || 'assistante sociale, Normandie, accompagnement social'),
    'process.env.VITE_APP_URL': JSON.stringify(process.env.VITE_APP_URL || 'https://www.as-independante.fr'),
    'process.env.VITE_APP_ENV': JSON.stringify(process.env.VITE_APP_ENV || 'production')
  },
}));
