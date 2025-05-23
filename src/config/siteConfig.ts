// Utilisation des variables d'environnement pour la configuration du site
export const siteConfig = {
    // Informations de base du site
    name: "Rachel Gervais",
    title: import.meta.env.VITE_APP_TITLE || "Rachel Gervais - Assistante Sociale Indépendante",
    description: import.meta.env.VITE_APP_DESCRIPTION || "Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie. Plus de 10 ans d'expérience au service de votre bien-être social. Accompagnement social personnalisé et professionnel. Assistance dans vos démarches administratives, soutien et conseil.",
    url: import.meta.env.VITE_APP_URL || "https://www.as-independante.fr",
    keywords: import.meta.env.VITE_APP_KEYWORDS || "assistante sociale, Normandie, Rachel Gervais, accompagnement social, démarches administratives, CCAS, aide sociale, aide financière, aide juridique, aide administrative, aide sociale, aide à domicile, aide aux personnes âgées, aide aux personnes handicapées, aide aux personnes en difficulté, aide aux personnes en situation de handicap, aide aux personnes en situation de précarité, aide aux personnes en situation de vulnérabilité",
    freelance: "JFL",
    
    // UI configuration
    ui: {
        font: "Inter, Arial, sans-serif",
        logo: "/assets/logo/logo-rachel-gervais-removebg.png",
        colors: {
            primary: "#0D8496", // Couleur de la bannière turquoise du logo
            secondary: "#065964", // Version plus foncée pour les accents
            accent: "#30B4C8", // Version plus claire pour les accents
            text: "#333333",
            background: "#ffffff"
        }
    },
    
    // Coordonnées de contact
    contact: {
        email: import.meta.env.VITE_CONTACT_EMAIL || "rachel.gervais@as-independante.fr",
        phone: import.meta.env.VITE_CONTACT_PHONE || "07 63 90 78 45",
        region: "Normandie",
        country: "France"
    },
    
    // Réseaux sociaux
    social: {
        facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || "https://www.facebook.com/groups/508874659843806"
    },
    
    // Heures d'ouverture
    openingHours: "Mo-Fr 09:00-18:00",

    // Siret et autres informations légales
    legal: {
        siret: import.meta.env.VITE_LEGAL_SIRET || "En cours d'immatriculation",
    },
    
    // Descriptions des services pour les systèmes de paiement PayPal
    services: {
        defaultDescription: "Service d'accompagnement social"
    }
};