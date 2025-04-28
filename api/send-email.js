// API Route Vercel pour l'envoi d'emails
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Configuration des en-têtes CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // Gérer les requêtes OPTIONS (pre-flight CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "Méthode autorisée" });
  }

  // Vérifier la méthode HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // Récupérer les données du corps de la requête
    const {
      name,
      email,
      message,
      subject = "Nouveau message de contact",
    } = req.body;

    // Validation de base
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Informations incomplètes",
        message: "Le nom, l'email et le message sont requis",
      });
    }

    // Vérification des paramètres de configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Configuration des paramètres d'email incomplète");
      return res.status(500).json({
        error: "Configuration du serveur incomplète",
        message:
          "Les paramètres d'email ne sont pas correctement configurés sur le serveur",
        details:
          "Vérifiez que EMAIL_USER et EMAIL_PASSWORD sont définis dans les variables d'environnement",
      });
    }

    // Si Gmail est utilisé comme service, afficher des informations utiles pour le débogage
    if (
      process.env.EMAIL_SERVICE === "gmail" ||
      process.env.EMAIL_HOST?.includes("gmail")
    ) {
      console.log(
        "Configuration Gmail détectée. Assurez-vous d'utiliser un mot de passe d'application."
      );
    }

    // Créer un transporteur avec vos informations SMTP
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Doit être un mot de passe d'application pour Gmail
      },
      debug: true, // Mode débogage pour plus d'informations en cas d'erreur
    });

    // Configuration de l'email
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECIPIENT,
      replyTo: email,
      subject: subject,
      text: `
        Nom: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès:", info.messageId);

    // Retourner une réponse positive
    return res.status(200).json({
      status: "success",
      message: "Votre message a été envoyé avec succès",
      details: {
        messageId: info.messageId,
      },
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);

    // Messages d'erreur personnalisés en fonction du type d'erreur
    let errorMessage = "Erreur lors de l'envoi du message";
    let errorDetails = error.message;
    let statusCode = 500;

    // Personnalisation des messages d'erreur selon les codes d'erreur courants
    if (error.code === "EAUTH") {
      errorMessage = "Erreur d'authentification avec le serveur d'email";
      errorDetails =
        "Les identifiants de connexion ont été rejetés. Si vous utilisez Gmail, vous devez créer un mot de passe d'application.";
      statusCode = 401;
    } else if (error.code === "ESOCKET" || error.code === "ECONNECTION") {
      errorMessage = "Impossible de se connecter au serveur d'email";
      errorDetails =
        "Vérifiez que le serveur SMTP est correctement configuré (hôte, port, etc.).";
      statusCode = 502;
    }

    return res.status(statusCode).json({
      status: "error",
      message: errorMessage,
      details: errorDetails,
      troubleshooting:
        error.code === "EAUTH"
          ? "Pour Gmail, allez sur https://myaccount.google.com/apppasswords pour créer un mot de passe d'application."
          : "Vérifiez les paramètres EMAIL_* dans vos variables d'environnement.",
    });
  }
}
