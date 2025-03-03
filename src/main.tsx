
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// On n'a plus besoin de vérifier les variables d'environnement Supabase
// car elles sont maintenant codées directement dans supabase.ts

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
