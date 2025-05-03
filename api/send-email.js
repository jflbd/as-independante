// API Route Vercel pour l'envoi d'emails
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Configuration des en-têtes CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // Vérifier si le mode debug est activé
  const isDebugMode =
    process.env.DEBUG === "true" || process.env.VITE_APP_DEBUG === "true";

  if (isDebugMode) {
    console.log("🛠️ MODE DEBUG ACTIVÉ - Logs détaillés activés");
    console.log(
      "📝 Headers de la requête:",
      JSON.stringify(req.headers, null, 2)
    );
  }

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
      phone,
      company,
      formType,
      contextSource,
      transactionDetails,
    } = req.body;

    if (isDebugMode) {
      console.log("📩 Données de la requête reçues:", {
        name,
        email,
        subject,
        messageLength: message ? message.length : 0,
        formType,
        contextSource,
        hasTransactionDetails: !!transactionDetails,
      });
    }

    // Récupérer l'URL de référence (referer) pour déterminer d'où vient la demande
    const referer = req.headers.referer || "";
    console.log("URL d'origine de la requête:", referer);

    // Déterminer le type de formulaire en fonction du contexte ou de l'URL de référence
    let finalFormType = formType;

    // Si le message provient de la page Ebook, forcer le type à "Contact Ebook"
    if (
      contextSource === "ebook_page" ||
      referer.includes("/ebook") ||
      referer.includes("ebook-page")
    ) {
      console.log(
        "Détecté comme provenant de la page Ebook, définition de formType='Contact Ebook'"
      );
      finalFormType = "Contact Ebook";
    }

    // Validation de base
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Informations incomplètes",
        message: "Le nom, l'email et le message sont requis",
      });
    }

    // Log de debug pour voir les variables d'environnement disponibles
    console.log("📧 Variables d'environnement d'email détectées:");
    console.log(`   - EMAIL_USER: ${process.env.EMAIL_USER ? "✓" : "✗"}`);
    console.log(
      `   - EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? "✓" : "✗"}`
    );
    console.log(
      `   - EMAIL_RECIPIENT: ${process.env.EMAIL_RECIPIENT || "Non défini"}`
    );
    console.log(`   - EMAIL_HOST: ${process.env.EMAIL_HOST || "Non défini"}`);
    console.log(`   - EMAIL_PORT: ${process.env.EMAIL_PORT || "Non défini"}`);
    console.log(
      `   - EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || "Non défini"}`
    );

    // Log de toutes les variables d'environnement en mode debug
    if (isDebugMode) {
      console.log("🔍 Variables d'environnement disponibles:");
      const envVars = Object.keys(process.env)
        .filter(
          (key) =>
            !key.includes("PASSWORD") &&
            !key.includes("SECRET") &&
            !key.includes("KEY")
        )
        .reduce((obj, key) => {
          obj[key] = process.env[key];
          return obj;
        }, {});
      console.log(JSON.stringify(envVars, null, 2));
    }

    // Vérification des paramètres de configuration et définition de valeurs par défaut si nécessaire
    let emailUser = process.env.EMAIL_USER;
    let emailPassword = process.env.EMAIL_PASSWORD;
    const emailRecipient =
      process.env.EMAIL_RECIPIENT || "leblondjul@hotmail.com"; // Utiliser une valeur par défaut si non définie

    // Vérifier et nettoyer les variables sensibles
    if (!emailUser || !emailPassword) {
      console.error("Configuration des paramètres d'email incomplète");

      // Si nous sommes en développement et que nous avons détecté les variables dans le corps de la requête .env.local
      // (ceci est utile pour le débogage uniquement)
      if (req.body._debug_env && process.env.NODE_ENV !== "production") {
        console.log(
          "⚠️ Utilisation des variables de débogage (NON SÉCURISÉ, à utiliser uniquement en développement)"
        );
        emailUser = req.body._debug_env.EMAIL_USER || emailUser;
        emailPassword = req.body._debug_env.EMAIL_PASSWORD || emailPassword;
      }

      // Si toujours pas de variables, retourner une erreur
      if (!emailUser || !emailPassword) {
        return res.status(500).json({
          error: "Configuration du serveur incomplète",
          message:
            "Les paramètres d'email ne sont pas correctement configurés sur le serveur",
          details:
            "Vérifiez que EMAIL_USER et EMAIL_PASSWORD sont définis dans les variables d'environnement",
          debug: isDebugMode
            ? {
                availableEnvVars: Object.keys(process.env),
                referer,
              }
            : undefined,
        });
      }
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

    // Nettoyer le mot de passe des guillemets éventuels
    if (emailPassword) {
      if (emailPassword.startsWith('"') && emailPassword.endsWith('"')) {
        emailPassword = emailPassword.slice(1, -1);
        console.log("📝 Guillemets autour du mot de passe détectés et retirés");
      }

      // Retirer aussi les guillemets simples
      if (emailPassword.startsWith("'") && emailPassword.endsWith("'")) {
        emailPassword = emailPassword.slice(1, -1);
        console.log(
          "📝 Guillemets simples autour du mot de passe détectés et retirés"
        );
      }

      // Afficher le début du mot de passe pour vérification (sécurité partielle)
      console.log(
        `📝 Début du mot de passe (premiers caractères): ${emailPassword.slice(
          0,
          2
        )}***`
      );
    }

    // Créer un transporteur avec vos informations SMTP
    const transporterConfig = {
      service: process.env.EMAIL_SERVICE || undefined, // undefined si non spécifié (utilisation de host/port)
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: emailUser,
        pass: emailPassword, // Utiliser le mot de passe nettoyé
      },
      // Configuration spécifique pour Office 365
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      debug: isDebugMode || process.env.NODE_ENV !== "production", // Mode débogage activé explicitement
      logger: isDebugMode, // Activer le logger nodemailer en mode debug
    };

    if (isDebugMode) {
      console.log("📧 Configuration du transporteur SMTP détaillée:", {
        ...transporterConfig,
        auth: { user: transporterConfig.auth.user, pass: "********" },
      });
    } else {
      console.log("📧 Configuration du transporteur SMTP:", {
        service: transporterConfig.service,
        host: transporterConfig.host,
        port: transporterConfig.port,
        secure: transporterConfig.secure,
        auth: { user: transporterConfig.auth.user, pass: "********" },
      });
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    // Configuration de l'email
    const mailOptions = {
      from: `"${name}" <${emailUser}>`, // Utiliser emailUser comme expéditeur réel
      to: emailRecipient,
      replyTo: email, // L'email du contact pour la réponse
      subject: subject,
      text: formatEmailText(req.body),
      html: formatEmailHtml(req.body),
    };

    // Vérifier la connexion au serveur SMTP avant d'envoyer
    console.log("🔄 Vérification de la connexion au serveur SMTP...");
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.error("❌ Échec de la vérification du serveur SMTP:", error);
          if (isDebugMode) {
            console.error("Détails complets de l'erreur de vérification:", {
              message: error.message,
              code: error.code,
              command: error.command,
              responseCode: error.responseCode,
              response: error.response,
            });
          }
          reject(error);
        } else {
          console.log("✅ Serveur SMTP prêt à accepter des messages");
          resolve(success);
        }
      });
    });

    // Envoyer l'email
    console.log("🔄 Envoi de l'email en cours...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé avec succès:", info.messageId);

    if (isDebugMode) {
      console.log("📧 Informations complètes de l'envoi:", {
        messageId: info.messageId,
        envelope: info.envelope,
        accepted: info.accepted,
        response: info.response,
      });
    }

    // Retourner une réponse positive
    return res.status(200).json({
      status: "success",
      message: "Votre message a été envoyé avec succès",
      details: {
        messageId: info.messageId,
      },
    });
  } catch (error) {
    console.error("❌ Erreur d'envoi d'email:", error);
    // Afficher plus de détails pour faciliter le débogage
    console.error(
      "Détails complets de l'erreur:",
      JSON.stringify(
        {
          message: error.message,
          code: error.code,
          command: error.command,
          stack: error.stack,
        },
        null,
        2
      )
    );

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

    const errorResponse = {
      status: "error",
      message: errorMessage,
      details: errorDetails,
      errorCode: error.code || "UNKNOWN",
      troubleshooting:
        error.code === "EAUTH"
          ? "Pour Gmail, allez sur https://myaccount.google.com/apppasswords pour créer un mot de passe d'application."
          : "Vérifiez les paramètres EMAIL_* dans vos variables d'environnement.",
    };

    // Ajouter des informations de debug supplémentaires si le mode debug est activé
    if (isDebugMode) {
      errorResponse.debug = {
        stack: error.stack,
        command: error.command,
        responseCode: error.responseCode,
        response: error.response,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        service: process.env.EMAIL_SERVICE,
        secure: process.env.EMAIL_SECURE === "true",
        isVercelEnvironment: !!process.env.VERCEL,
        nodeEnv: process.env.NODE_ENV,
      };
    }

    return res.status(statusCode).json(errorResponse);
  }
}

// Fonction pour formater le contenu texte de l'email selon le format standardisé
function formatEmailText(data) {
  const {
    name,
    email,
    phone,
    company,
    message,
    formType,
    contextSource,
    transactionDetails,
  } = data;

  // Définir le titre du message
  const messageTitle = formType || "Nouveau message de contact";

  let emailContent = `${messageTitle}\n\n`;

  // Ajouter l'information sur la source si disponible
  if (contextSource === "ebook_page") {
    emailContent += "📖 CONTACT DEPUIS LA PAGE EBOOK\n\n";
  }

  if (contextSource === "devis-pro") {
    emailContent += "🤝 DEMANDE DE DEVIS PROFESSIONNEL\n\n";
  }

  if (contextSource === "home") {
    emailContent += "🏠 CONTACT DEPUIS LA PAGE D'ACCUEIL\n\n";
  }

  // Informations de contact
  emailContent += `Nom: ${name}\n`;
  emailContent += `Email: ${email}\n`;

  if (phone) {
    emailContent += `Téléphone: ${phone}\n`;
  }

  if (company) {
    emailContent += `Entreprise/Organisation: ${company}\n`;
  }

  // Détails de transaction si présents
  if (transactionDetails) {
    emailContent += "\n--- Détails de la transaction ---\n";
    if (transactionDetails.amount) {
      emailContent += `Montant: ${
        typeof transactionDetails.amount === "number"
          ? `${transactionDetails.amount.toFixed(2)}€`
          : `${transactionDetails.amount}€`
      }\n`;
    }
    if (transactionDetails.description) {
      emailContent += `Description: ${transactionDetails.description}\n`;
    }
    if (transactionDetails.date) {
      emailContent += `Date: ${transactionDetails.date}\n`;
    }
    if (transactionDetails.transactionId) {
      emailContent += `N° de transaction: ${transactionDetails.transactionId}\n`;
    }
    if (transactionDetails.paymentMethod) {
      emailContent += `Méthode: ${transactionDetails.paymentMethod}\n`;
    }
  }

  // Message
  emailContent += "\nMessage:\n";
  emailContent += message;

  return emailContent;
}

// Fonction pour formater le contenu HTML de l'email selon le format standardisé
function formatEmailHtml(data) {
  const {
    name,
    email,
    phone,
    company,
    message,
    formType,
    contextSource,
    transactionDetails,
  } = data;

  // Définir le titre du message
  const messageTitle = formType || "Nouveau message de contact";

  let htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0D8496; border-bottom: 2px solid #0D8496; padding-bottom: 8px; margin-bottom: 20px;">
        ${messageTitle}
      </h2>
      
      ${
        contextSource === "ebook_page"
          ? `<div style="margin-bottom: 20px; padding: 10px; background-color: #f0f7fa; border-left: 4px solid #0D8496; border-radius: 4px;">
          <p style="margin: 0; color: #0D8496; font-weight: bold;">📖 CONTACT DEPUIS LA PAGE EBOOK</p>
        </div>`
          : ""
      }
      
      ${
        contextSource === "home"
          ? `<div style="margin-bottom: 20px; padding: 10px; background-color: #f0f7fa; border-left: 4px solid #0D8496; border-radius: 4px;">
          <p style="margin: 0; color: #0D8496; font-weight: bold;">🏠 CONTACT DEPUIS LA PAGE D'ACCUEIL</p>
        </div>`
          : ""
      }
      
      ${
        contextSource === "devis-pro" || contextSource === "quote"
          ? `<div style="margin-bottom: 20px; padding: 10px; background-color: #f0f7fa; border-left: 4px solid #0D8496; border-radius: 4px;">
          <p style="margin: 0; color: #0D8496; font-weight: bold;">🤝 DEMANDE DE DEVIS PROFESSIONNEL</p>
        </div>`
          : ""
      }
      
      ${
        contextSource === "payment_error"
          ? `<div style="margin-bottom: 20px; padding: 10px; background-color: #fde8e8; border-left: 4px solid #e02424; border-radius: 4px;">
          <p style="margin: 0; color: #e02424; font-weight: bold;">⚠️ CONTACT SUITE À UNE ERREUR DE PAIEMENT</p>
        </div>`
          : ""
      }
      
      ${
        contextSource === "successful_payment"
          ? `<div style="margin-bottom: 20px; padding: 10px; background-color: #ecfdf5; border-left: 4px solid #047857; border-radius: 4px;">
          <p style="margin: 0; color: #047857; font-weight: bold;">✅ CONTACT APRÈS UN PAIEMENT RÉUSSI</p>
        </div>`
          : ""
      }
      
      ${
        contextSource &&
        ![
          "ebook_page",
          "home",
          "devis-pro",
          "quote",
          "payment_error",
          "successful_payment",
        ].includes(contextSource)
          ? `<div style="margin-bottom: 20px; padding: 10px; background-color: #f0f7fa; border-left: 4px solid #0D8496; border-radius: 4px;">
          <p style="margin: 0; color: #0D8496; font-weight: bold;">📝 CONTEXTE: ${contextSource.toUpperCase()}</p>
        </div>`
          : ""
      }
      
      <div style="margin-bottom: 25px;">
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #0D8496;">${email}</a></p>
  `;

  if (phone) {
    htmlContent += `<p><strong>Téléphone:</strong> ${phone}</p>`;
  }

  if (company) {
    htmlContent += `<p><strong>Entreprise/Organisation:</strong> ${company}</p>`;
  }

  // Détails de transaction si présents
  if (transactionDetails) {
    htmlContent += `
      <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0D8496; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #0D8496;">Détails de la transaction</h3>
    `;

    if (transactionDetails.amount) {
      const formattedAmount =
        typeof transactionDetails.amount === "number"
          ? `${transactionDetails.amount.toFixed(2)}€`
          : `${transactionDetails.amount}€`;
      htmlContent += `<p><strong>Montant:</strong> ${formattedAmount}</p>`;
    }

    if (transactionDetails.description) {
      htmlContent += `<p><strong>Description:</strong> ${transactionDetails.description}</p>`;
    }

    if (transactionDetails.date) {
      htmlContent += `<p><strong>Date:</strong> ${transactionDetails.date}</p>`;
    }

    if (transactionDetails.transactionId) {
      htmlContent += `<p><strong>N° de transaction:</strong> ${transactionDetails.transactionId}</p>`;
    }

    if (transactionDetails.paymentMethod) {
      htmlContent += `<p><strong>Méthode:</strong> ${transactionDetails.paymentMethod}</p>`;
    }

    htmlContent += `</div>`;
  }

  // Message
  htmlContent += `
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <h3 style="color: #444;">Message:</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
      </div>
    </div>
  `;

  return htmlContent;
}
