/**
 * Configuration pour l'intégration Mailchimp
 */
export const mailchimpConfig = {
  apiKey: process.env.MAILCHIMP_API_KEY || '',
  serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || 'us1', // Préfixe du serveur (us1, us2, etc.)
  audienceId: process.env.MAILCHIMP_AUDIENCE_ID || '', // ID de la liste
  subscribePath: '/api/mailchimp-subscribe',
  subscribeEndpoint: `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
  subscribeMethod: 'POST',
  subscribeHeaders: {
    'Content-Type': 'application/json',
    Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
  },
  subscribeBody: {
    email_address: '',
    status: 'subscribed',
    merge_fields: {
      FNAME: '',
      LNAME: '',
    },
  },
  subscribeSuccessMessage: 'Inscription réussie !',
  subscribeErrorMessage: 'Une erreur est survenue lors de l\'inscription',
  subscribeLoadingMessage: 'Chargement...',
  subscribeError: 'Erreur de connexion au serveur',
  subscribeSuccess: 'Inscription réussie !',
};