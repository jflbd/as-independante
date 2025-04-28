import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import AppLayout from './components/AppLayout.tsx'
import './index.css'

// Utilisation de createBrowserRouter avec les future flags pour résoudre les avertissements
const router = createBrowserRouter(
  [
    {
      path: '*',
      element: (
        <AppLayout>
          <App />
        </AppLayout>
      ),
    },
  ],
  {
    // Future flags pour React Router v7
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
