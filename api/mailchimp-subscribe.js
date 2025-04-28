// API Route Vercel pour gérer les inscriptions à Mailchimp
import fetch from "node-fetch";
import crypto from "crypto";

export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // Récupérer les données du corps de la requête
    const { email, source, firstName = "", lastName = "" } = req.body;

    // Validation de base
    if (!email || !source) {
      return res.status(400).json({
        error: "L'adresse email et la source sont requises",
      });
    }

    // Récupérer les variables d'environnement
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const serverId = process.env.MAILCHIMP_SERVER_ID;
    const listId = process.env.MAILCHIMP_LIST_ID;

    // Vérifier que les clés d'API sont présentes
    if (!apiKey || !serverId || !listId) {
      console.error(
        "Les variables d'environnement Mailchimp ne sont pas configurées"
      );
      return res
        .status(500)
        .json({ error: "Configuration du serveur incomplète" });
    }

    // Créer un identifiant MD5 pour l'abonné (utilisé par Mailchimp)
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    // Préparer les tags basés sur la source
    const tags = [source];

    // Préparer les données pour Mailchimp
    const data = {
      email_address: email,
      status: "pending", // 'pending' pour double opt-in, 'subscribed' pour inscription directe
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
      tags: tags,
    };

    // Construire l'URL de l'API Mailchimp
    const url = `https://${serverId}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;

    // Envoyer la requête à Mailchimp
    const response = await fetch(url, {
      method: "PUT", // PUT pour mettre à jour ou créer
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString(
          "base64"
        )}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      return res.status(200).json({
        status: "success",
        message: "Inscription en cours, veuillez vérifier votre boîte mail",
      });
    } else {
      console.error("Erreur Mailchimp:", responseData);
      return res.status(response.status).json({
        status: "error",
        message: responseData.title || "Erreur lors de l'inscription",
      });
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({
      status: "error",
      message: "Erreur interne du serveur",
    });
  }
}
