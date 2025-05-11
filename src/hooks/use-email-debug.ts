/**
 * Hook utilitaire pour ajouter des informations de débogage aux requêtes d'email
 * À utiliser uniquement en environnement de développement
 */

/**
 * Récupère les informations de configuration d'email depuis le localStorage (en développement)
 * ou depuis les variables d'environnement exposées au client
 */
export function getEmailDebugInfo() {
  // Ne fournir des informations de débogage que si nous sommes en développement
  if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
    // Essayer de récupérer depuis le localStorage d'abord (pour le développement)
    const storedEmailConfig = localStorage.getItem('devEmailConfig');
    
    if (storedEmailConfig) {
      try {
        return JSON.parse(storedEmailConfig);
      } catch (error) {
        console.error('Erreur lors du parsing des informations email du localStorage:', error);
      }
    }
    
    // Sinon, utiliser des informations stockées dans les variables d'environnement publiques
    // Note: seules les variables préfixées par VITE_* sont exposées au client
    return {
      EMAIL_HOST: import.meta.env.VITE_DEV_EMAIL_HOST || 'mail.boosttoncompte.fr',
      EMAIL_PORT: import.meta.env.VITE_DEV_EMAIL_PORT || '587',
      EMAIL_SERVICE: import.meta.env.VITE_DEV_EMAIL_SERVICE || 'smtp',
      EMAIL_USER: import.meta.env.VITE_DEV_EMAIL_USER || 'newsletter@boosttoncompte.fr',
      EMAIL_PASSWORD: import.meta.env.VITE_DEV_EMAIL_PASSWORD || 'xP2$5qSqFk4DrTp',
      EMAIL_RECIPIENT: import.meta.env.VITE_DEV_EMAIL_RECIPIENT || 'newsletter@boosttoncompte.fr'
    };
  }
  
  return null;
}

/**
 * Enrichir les données d'email avec des informations de débogage pour l'environnement de développement
 * @param data Les données d'email
 */
export function enrichEmailDataWithDebugInfo<T>(data: T): T & { _debug_env?: Record<string, string | number> } {
  if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
    const debugInfo = getEmailDebugInfo();
    
    if (debugInfo) {
      return {
        ...data,
        _debug_env: debugInfo
      };
    }
  }
  
  return data;
}
