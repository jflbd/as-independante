import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";
import { siteConfig } from './src/config/siteConfig';

// Charger les variables d'environnement
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
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
    'process.env': process.env
  },
  // Les variables d'environnement avec préfixe VITE_ sont automatiquement 
  // disponibles dans le code et remplacées dans le HTML
}));
