// API Route Vercel pour créer une intention de paiement Stripe
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Utilisation d'une constante pour le statement descriptor basé sur le nom du site
// Respecter la limite de 22 caractères de Stripe
const STATEMENT_DESCRIPTOR = "RACHEL GERVAIS AS";

export default async function handler(req, res) {
  // Activer CORS pour permettre les requêtes depuis votre frontend
  res.setHeader("Access-Control-Allow-Origin", "*"); // En production, limitez cela à votre domaine
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // Gérer les requêtes OPTIONS (pre-flight)
  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "CORS activé" });
  }

  // Vérifier que la méthode est POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // Analyser le corps de la requête
    const { amount, description, metadata = {}, customerData } = req.body;

    // Vérifier que le montant est valide
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: "Montant invalide" });
    }

    // Convertir en centimes pour Stripe (Stripe utilise les centimes)
    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Préparer les données clients pour Stripe
    const customerMetadata = customerData
      ? {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
        }
      : {};

    // Créer l'intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      description: description || "Service d'accompagnement social",
      statement_descriptor: STATEMENT_DESCRIPTOR,
      metadata: {
        ...metadata,
        ...customerMetadata,
        source: "website",
        mode:
          process.env.NODE_ENV === "production" ? "production" : "development",
      },
      // Si nous avons l'email client, on peut l'ajouter directement au receipt_email
      receipt_email: customerData?.email,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Retourner le client secret au front-end
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    return res.status(500).json({
      error: "Erreur lors du traitement du paiement",
      message: error.message,
    });
  }
}
