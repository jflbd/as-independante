import Stripe from "stripe";
import { stripeConfig } from "@/config/stripeConfig";

// Utilisation d'une constante pour le statement descriptor basé sur le nom du site
const STATEMENT_DESCRIPTOR = "RACHEL GERVAIS AS";

// En développement, on utilise une clé secrète de test hardcodée (à remplacer par votre propre clé de test)
// En production, cette valeur devrait être définie via les variables d'environnement du serveur
const STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY || "sk_test_votreclésecrete";

// Vérifier si nous sommes en mode développement
const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

// Afficher un avertissement si la clé n'est pas définie
if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === "sk_test_votreclésecrete") {
  console.warn(
    "⚠️ ATTENTION : Vous utilisez une clé API Stripe de secours qui n'est pas valide. " +
    "Définissez votre clé secrète Stripe dans le fichier .env.local avec VITE_STRIPE_SECRET_KEY."
  );
}

// Initialiser Stripe avec la clé secrète
const stripe = new Stripe(STRIPE_SECRET_KEY);

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