// Configuration centralisée pour les témoignages du site
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  stars: number;
}

// Témoignages généraux pour la page d'accueil
export const homeTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Mère de famille",
    image: "/assets/avisuser/testimonial-1.webp",
    quote: "Rachel a été d'un soutien incroyable durant une période très difficile. Son professionnalisme et sa bienveillance m'ont aidée à traverser cette épreuve et à retrouver ma stabilité.",
    stars: 5
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "En recherche d'emploi",
    image: "/assets/avisuser/testimonial-2.webp",
    quote: "Grâce à l'accompagnement de Rachel, j'ai pu démêler ma situation administrative complexe et accéder aux aides auxquelles j'avais droit. Son expertise a fait toute la différence.",
    stars: 5
  },
  {
    id: 3,
    name: "Sophie Leroux",
    role: "Assistante RH",
    image: "/assets/avisuser/testimonial-3.webp",
    quote: "En tant que professionnelle, je recommande vivement les services de Rachel. Sa collaboration avec notre équipe RH a permis d'améliorer considérablement notre approche du bien-être au travail.",
    stars: 5
  },
  {
    id: 4,
    name: "Jean Petit",
    role: "Retraité",
    image: "/assets/avisuser/testimonial-2.webp",
    quote: "À 67 ans, je me sentais perdu face aux démarches administratives. Rachel m'a guidé avec patience et efficacité. Aujourd'hui, ma situation est enfin régularisée.",
    stars: 5
  },
];

// Témoignages spécifiques pour la page Ebook
export const ebookTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie L.",
    role: "Assistante sociale",
    image: "/assets/avisuser/testimonial-3.webp",
    quote: "Ce guide m'a vraiment aidé à comprendre les démarches administratives et à structurer mon activité en libéral. Un indispensable !",
    stars: 5
  },
  {
    id: 2,
    name: "Jean D.",
    role: "Assistant social",
    image: "/assets/avisuser/testimonial-2.webp",
    quote: "Grâce aux conseils pratiques et aux modèles de documents, j'ai pu m'installer en libéral sans stress. Je recommande vivement ce guide.",
    stars: 5
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Étudiante en travail social",
    image: "/assets/avisuser/testimonial-3.webp",
    quote: "Les explications sont claires et précises. Ce guide m'a permis de gagner du temps et d'éviter les erreurs courantes lors de l'installation en libéral.",
    stars: 5
  },
  {
    id: 4,
    name: "Luc B.",
    role: "Travailleur social en reconversion",
    image: "/assets/avisuser/testimonial-2.webp",
    quote: "Après 15 ans en institution, ce guide a été ma boussole pour me lancer en indépendant. Toutes les étapes y sont détaillées avec une grande clarté.",
    stars: 5
  },
  {
    id: 5,
    name: "Céline P.",
    role: "Conseillère en économie sociale et familiale",
    image: "/assets/avisuser/testimonial-1.webp",
    quote: "Un guide complet qui aborde tous les aspects de l'installation : juridique, fiscal, déontologique. Exactement ce dont j'avais besoin pour me lancer !",
    stars: 5
  }
];