
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Vérifie si les variables d'environnement Supabase sont définies
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Composant qui affiche soit l'application, soit un message d'erreur
const Root = () => {
  if (!supabaseUrl || !supabaseKey) {
    // Affichage d'un message d'erreur si Supabase n'est pas configuré
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration manquante</h1>
          <p className="text-gray-700 mb-6">
            Les variables d'environnement Supabase ne sont pas définies. L'application continuera à fonctionner en mode dégradé.
          </p>
          <p className="text-gray-600 text-sm">
            Pour configurer Supabase, vous devez définir les variables d'environnement <code className="bg-gray-100 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> et <code className="bg-gray-100 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code>.
          </p>
          <button 
            className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={() => window.location.reload()}
          >
            Continuer quand même
          </button>
        </div>
      </div>
    );
  }
  
  // Si les variables sont définies, afficher l'application normalement
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
