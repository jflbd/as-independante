// Configuration PayPal pour l'application
export const paypalConfig = {
  // Récupère le client ID depuis les variables d'environnement
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AZLVmuBjvzf8X1Tn33Hw0fz5m4PpBYqAoXmWsCDAVZdwd3F_KWLv4ojfHshrogmeLhhTl2Z4uzbvr8aY',
  
  // Mode test activé uniquement si nous sommes explicitement en développement
  // La condition est modifiée pour éviter les problèmes sur Vercel
  testMode: import.meta.env.VITE_APP_ENV !== 'production',
  
  // Options de style pour les boutons PayPal
  styles: {
    standard: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'pay'
    },
    checkout: {
      layout: 'vertical', 
      color: 'blue',
      shape: 'rect',
      label: 'pay'
    }
  },
  
  // Configuration des boutons (utilisée par PayPalButton.tsx)
  buttonConfig: {
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'pay'
    }
  },
  
  // Options de debug pour les Smart Payment Buttons
  debug: import.meta.env.VITE_APP_ENV !== 'production',
  
  // Configuration des options pour le SDK PayPal
  sdkOptions: {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "EUR",
    intent: "capture",
    debug: import.meta.env.VITE_APP_ENV !== 'production',
    components: "buttons,marks"
  },
  
  // Informations de test sandbox
  sandboxAccount: {
    email: "sb-cjzgc40987248@personal.example.com",
    password: "6pJt.%.8",
    cardnumber: "4020023101630580",
    expDate: "05/2030",
    cvc: "123"
  }
};