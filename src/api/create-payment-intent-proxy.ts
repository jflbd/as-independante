import Stripe from "stripe";
import { stripeConfig } from "@/config/stripeConfig";

// Utilisation d'une constante pour le statement descriptor basé sur le nom du site
const STATEMENT_DESCRIPTOR = "RACHEL GERVAIS AS";

// Récupérer la clé secrète depuis les variables d'environnement
const STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;

// Vérifier si nous sommes en mode développement
const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

// Vérifier la présence de la clé Stripe avec un message d'erreur plus détaillé
if (!STRIPE_SECRET_KEY) {
  console.error(
    "❌ ERREUR CRITIQUE : Clé secrète Stripe manquante. \n" +
    "Pour résoudre ce problème :\n" +
    "1. Créez un fichier .env.local à la racine du projet\n" +
    "2. Ajoutez votre clé secrète : VITE_STRIPE_SECRET_KEY=sk_test_votreVraieClé\n" +
    "3. Redémarrez le serveur de développement\n" +
    "La clé doit commencer par sk_test_ pour l'environnement de test."
  );
  throw new Error("Stripe Secret Key is missing. Check .env.local file.");
}

// Initialiser Stripe avec la clé secrète
let stripe: Stripe;
try {
  stripe = new Stripe(STRIPE_SECRET_KEY);
  console.log("✅ Connexion à l'API Stripe établie avec succès");
} catch (error) {
  console.error("❌ Échec de l'initialisation de Stripe:", error);
  throw new Error("Failed to initialize Stripe client");
}

/**
 * Crée une intention de paiement Stripe
 * Cette fonction est utilisée directement en mode développement
 */
export const createPaymentIntent = async (data: {
  amount: number;
  description: string;
  metadata?: Record<string, string>;
}) => {
  console.log("API Dev: Création intention de paiement:", data);
  
  try {
    // Vérifier que le montant est valide
    if (!data.amount || data.amount <= 0) {
      throw new Error("Montant invalide");
    }

    // Convertir le montant en centimes
    const amountInCents = Math.round(data.amount * 100);
    
    // Créer l'intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      description: data.description || "Service d'accompagnement social",
      statement_descriptor: STATEMENT_DESCRIPTOR,
      metadata: {
        ...data.metadata,
        source: "website",
        mode: import.meta.env.MODE,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    console.log("API Dev: PaymentIntent créé:", paymentIntent.id);
    
    // Retourner le clientSecret
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error: unknown) {
    console.error("API Dev: Erreur de création de PaymentIntent:", error);
    
    let errorMessage = "Erreur lors du traitement du paiement";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};