// API Route Vercel pour créer une intention de paiement Stripe
import Stripe from "stripe";

// Utilisation d'une constante pour le statement descriptor basé sur le nom du site
const STATEMENT_DESCRIPTOR = "RACHEL GERVAIS AS";

// Ajout de logs détaillés pour le débogage
console.log("Chargement de l'API create-payment-intent");
console.log("Variables d'environnement disponibles:", Object.keys(process.env).filter(key => !key.includes('SECRET')).join(', '));

// Vérification de la clé API Stripe
let stripe;
try {
  // Utilisation d'une clé de test fixe si nous sommes en développement local et que la clé n'est pas fournie
  // Cela permet un développement local même si la variable d'environnement est absente
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  console.log("Initialisation de Stripe avec une clé", stripeKey ? "valide (premiers caractères: " + stripeKey.substring(0, 7) + "...)" : "invalide");
  stripe = new Stripe(stripeKey);
} catch (initError) {
  console.error("Erreur d'initialisation Stripe:", initError);
}

export default async function handler(req, res) {
  console.log("API: Nouvelle requête reçue", req.method);
  
  // Autoriser les requêtes cross-origin (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  
  // Gérer les requêtes OPTIONS (pre-flight)
  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "CORS activé" });
  }

  // Vérifier que la méthode est POST
  if (req.method !== "POST") {
    console.log("API: Méthode incorrecte:", req.method);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  // Vérifier que Stripe est correctement initialisé
  if (!stripe) {
    console.error("API: Stripe n'a pas été initialisé correctement");
    return res.status(500).json({
      error: "Configuration de paiement incorrecte",
      message: "Le service de paiement n'est pas disponible",
    });
  }

  try {
    // Analyser les données de la requête
    console.log("API: Body de la requête:", JSON.stringify(req.body));
    const { amount, description, customerData } = req.body;
    console.log("API: Données extraites:", { amount, description });

    // Vérifier que le montant est valide
    if (!amount || amount <= 0) {
      console.log("API: Montant invalide:", amount);
      return res.status(400).json({ error: "Montant invalide" });
    }

    // Convertir le montant en centimes pour Stripe
    const amountInCents = Math.round(amount * 100);
    console.log("API: Montant en centimes:", amountInCents);

    // Créer l'intention de paiement
    console.log("API: Création de l'intention de paiement");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      description: description || "Service d'accompagnement social",
      statement_descriptor: STATEMENT_DESCRIPTOR,
      metadata: {
        source: "website",
        description: description || "Service d'accompagnement social",
        mode: process.env.NODE_ENV === "production" ? "production" : "development",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("API: PaymentIntent créé avec succès, ID:", paymentIntent.id);
    
    // Retourner le client secret au front-end
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("API: Erreur Stripe complète:", error);
    return res.status(500).json({
      error: "Erreur lors du traitement du paiement",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
