import React, { useState, useEffect, useCallback } from 'react';
import { getEmailDebugInfo } from '../hooks/use-email-debug';

/**
 * Composant utilitaire caché qui permet de configurer les paramètres d'email 
 * pour le développement. Ce composant est visible uniquement en mode développement.
 */
const DevEmailConfigHelper: React.FC = () => {
  // Hooks doivent être appelés inconditionnellement au niveau racine
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('devEmailConfig');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        return getEmailDebugInfo();
      }
    }
    return getEmailDebugInfo();
  });

  const toggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const saveConfig = () => {
    localStorage.setItem('devEmailConfig', JSON.stringify(config));
    alert('Configuration d\'email pour développement sauvegardée!');
  };

  useEffect(() => {
    // Ajouter un raccourci clavier Ctrl+Shift+E pour ouvrir le panneau
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        toggleVisibility();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleVisibility]); // Ajout de toggleVisibility comme dépendance

  if (!isVisible) {
    return (
      <div 
        style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          background: '#333', 
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '3px',
          fontSize: '12px',
          opacity: 0.7,
          cursor: 'pointer',
          zIndex: 9999
        }}
        onClick={toggleVisibility}
      >
        📧 Dev Email Config
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#333',
      color: '#fff',
      padding: '15px',
      borderRadius: '5px',
      width: '300px',
      zIndex: 9999,
      boxShadow: '0 0 10px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>Configuration Email Dev</h3>
        <button 
          onClick={toggleVisibility} 
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '3px' }}>
          EMAIL_HOST:
        </label>
        <input
          name="EMAIL_HOST"
          value={config?.EMAIL_HOST || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '3px' }}>
          EMAIL_PORT:
        </label>
        <input
          name="EMAIL_PORT"
          value={config?.EMAIL_PORT || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '3px' }}>
          EMAIL_USER:
        </label>
        <input
          name="EMAIL_USER"
          value={config?.EMAIL_USER || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '3px' }}>
          EMAIL_PASSWORD:
        </label>
        <input
          type="password"
          name="EMAIL_PASSWORD"
          value={config?.EMAIL_PASSWORD || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '3px' }}>
          EMAIL_RECIPIENT:
        </label>
        <input
          name="EMAIL_RECIPIENT"
          value={config?.EMAIL_RECIPIENT || ''}
          onChange={handleChange}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      
      <button
        onClick={saveConfig}
        style={{ 
          width: '100%', 
          padding: '8px', 
          background: '#4CAF50', 
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sauvegarder
      </button>
      
      <p style={{ fontSize: '10px', marginTop: '10px', opacity: 0.7 }}>
        Appuyez sur Ctrl+Shift+E pour afficher/masquer cette fenêtre.
      </p>
    </div>
  );
};

export default DevEmailConfigHelper;
