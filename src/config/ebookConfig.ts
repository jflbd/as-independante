export const ebookConfig = {
    // Variable pour contrôler l'accès à l'ebook
    isEbookAvailable: false, // Mettre à true pour activer l'accès, false pour afficher la page d'attente
    
    title: "Le guide essentiel pour devenir travailleur social en libéral",
    subtitle: "Toutes les étapes pour réussir votre installation et votre pratique",
    downloadUrl: "/ebooks/guide-assistante-sociale-independante.pdf",
    price: 19.99,
    formattedPrice: "19,99€",
    priceAvantPromo: 29.99,
    formattedPriceAvantPromo: "29,99€",
    coverImage: "/assets/images/ebook-cover.png",
    accroche: "Votre compagnon indispensable pour réussir en libéral",
    description: "Un guide complet pour vous accompagner dans votre parcours de travailleur social en libéral, de l'installation à la pratique quotidienne.",
    pages: 65, // Nombre de pages du guide
    benefits: [
        "Étapes détaillées pour s'installer en libéral",
        "Modèles de documents et outils pratiques",
        "Conseils d'experts pour une pratique réussie"
    ],
    fileFormat: "PDF",
    fileSize: "2.4 Mo",
    guarantee: "Satisfaction garantie ou remboursé pendant 30 jours",
    // Utilisation des variables d'environnement pour les coordonnées de contact
    supportEmail: import.meta.env.VITE_CONTACT_EMAIL || "rachel.gervais@as-independante.fr",
    supportPhone: import.meta.env.VITE_CONTACT_PHONE || "07 63 90 78 45",
};