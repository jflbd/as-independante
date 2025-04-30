// API Route Vercel pour gérer les inscriptions à Mailchimp
import fetch from "node-fetch";
import crypto from "crypto";

// Dictionnaire pour traduire les messages d'erreur courants de Mailchimp
const mailchimpErrorTranslations = {
  "Member Exists": "Cette adresse email est déjà inscrite à notre newsletter.",
  "Invalid Resource": "Adresse email invalide. Veuillez vérifier votre saisie.",
  "Forgotten Email Not Subscribed": "Cette adresse email a été désabonnée précédemment. Veuillez utiliser une autre adresse ou nous contacter pour la réactiver.",
  "Member In Compliance State": "Cette adresse email ne peut pas être inscrite actuellement pour des raisons de conformité.",
  "Too Many Recent Signup Attempts": "Trop de tentatives d'inscription récentes. Veuillez réessayer plus tard.",
  "Contact Exists": "Ce contact existe déjà dans notre base de données.",
  "RSS Not Synced": "Le flux RSS n'est pas synchronisé.",
  "List Already Subscribed To": "Déjà inscrit à cette liste.",
  "Invalid Parameters": "Paramètres invalides.",
  "Compliance State": "État de conformité qui empêche l'inscription.",
};

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
      
      // Vérifier si nous avons une traduction pour ce message d'erreur
      let errorMessage = responseData.title || "Erreur lors de l'inscription";
      const translatedMessage = mailchimpErrorTranslations[responseData.title];
      
      if (translatedMessage) {
        errorMessage = translatedMessage;
      } else if (responseData.detail) {
        // Dans certains cas, le détail contient des informations plus utiles à traduire
        // Par exemple, "this email address has been cleaned from the list" peut apparaître dans detail
        const cleanedDetail = responseData.detail.toLowerCase();
        if (cleanedDetail.includes("cleaned")) {
          errorMessage = "Cette adresse email a été nettoyée de notre liste. Veuillez utiliser une autre adresse ou nous contacter.";
        } else if (cleanedDetail.includes("compliance")) {
          errorMessage = "Cette adresse email ne peut pas être inscrite pour des raisons de conformité RGPD.";
        }
      }
      
      return res.status(response.status).json({
        status: "error",
        message: errorMessage,
        originalError: responseData.title, // Conserver l'erreur originale pour le débogage
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
