import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/as-independante",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
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
  }
}));
