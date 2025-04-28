// Ce fichier serait normalement sur un serveur backend ou une fonction serverless
// Exemple avec Vercel API Routes

// Importer la bibliothèque Stripe côté serveur
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Fonction serverless pour créer une intention de paiement Stripe
 *
 * REMARQUE IMPORTANTE : Ceci est un exemple à implémenter sur votre backend.
 * NE PAS inclure la clé secrète Stripe dans votre code front-end.
 * Cette fonction doit être déployée sur un environnement sécurisé (Vercel).
 */
exports.handler = async (event) => {
  // Vérifier que la méthode est POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Analyser le body de la requête
    const { amount, description } = JSON.parse(event.body);

    // Vérifier que le montant est valide
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Montant invalide" }),
      };
    }

    // Créer l'intention de paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe utilise les centimes
      currency: "eur",
      description: description || "Service d'accompagnement social",
      metadata: {
        source: "website",
        service: description || "Service d'accompagnement",
      },
      // Spécifier la méthode de paiement si nécessaire
      payment_method_types: ["card"],
    });

    // Renvoyer le client secret à l'application front-end
    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'intention de paiement:",
      error
    );

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur lors de la création de l'intention de paiement",
        details: error.message,
      }),
    };
  }
};
