/**
 * Configuration pour le service d'email
 */
export const emailConfig = {
  // URL de l'endpoint de la fonction serverless
  // En dev, utilise l'URL de base définie dans .env, sinon utilise le chemin relatif
  sendEmailEndpoint: import.meta.env.VITE_API_BASE_URL 
    ? `${import.meta.env.VITE_API_BASE_URL}/send-email` 
    : '/api/send-email',
    
  // Configuration des templates d'emails
  templates: {
    contact: {
      subject: 'Nouveau message de contact',
    },
    ebookConfirmation: {
      subject: 'Votre ebook est prêt à télécharger',
    },
    notification: {
      subject: 'Notification importante',
    },
  },
  
  // Configuration des délais
  timeouts: {
    sendTimeout: 60000, // 60 secondes (augmenté de 30 à 60 secondes)
  },

  // Messages d'erreur et de succès
  messages: {
    success: 'Votre message a été envoyé avec succès',
    error: 'Une erreur est survenue lors de l\'envoi du message',
    networkError: 'Problème de connexion. Veuillez vérifier votre connexion internet',
    emptyFields: 'Veuillez remplir tous les champs requis',
  },
};