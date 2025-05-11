// server.js
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

// Obtenir le chemin du fichier actuel et le dossier parent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement - priorité élevée pour voir les logs
console.log("🔍 Chargement des variables d'environnement...");

// Essayer de charger les fichiers .env dans l'ordre de priorité (local d'abord)
const envFiles = [".env.local", ".env"];
let envLoaded = false;

for (const envFile of envFiles) {
  const envPath = resolve(__dirname, envFile);
  if (fs.existsSync(envPath)) {
    console.log(`✅ Fichier ${envFile} trouvé et chargé`);
    dotenv.config({ path: envPath });
    envLoaded = true;

    // Afficher le contenu du fichier .env pour le débogage (sans les secrets)
    console.log(`📄 Contenu de ${envFile} (variables sensibles masquées):`);
    const envContent = fs.readFileSync(envPath, "utf8");
    const envLines = envContent.split("\n");

    for (let line of envLines) {
      // Ignorer les lignes vides et les commentaires
      if (!line.trim() || line.trim().startsWith("#")) {
        continue;
      }

      // Extraire le nom de la variable
      const match = line.match(/^([^=]+)=(.*)/);
      if (match) {
        const key = match[1].trim();
        // Masquer les valeurs sensibles
        if (
          key.includes("PASSWORD") ||
          key.includes("SECRET") ||
          key.includes("KEY")
        ) {
          console.log(`   ${key}=********** (masqué)`);
        } else {
          console.log(`   ${key}=${match[2]}`);
        }
      }
    }
  } else {
    console.log(`❌ Fichier ${envFile} non trouvé`);
  }
}

if (!envLoaded) {
  console.error("❌ ATTENTION: Aucun fichier .env n'a été chargé!");
  console.error("   Créez un fichier .env.local ou .env à la racine du projet");
}

// Vérification des variables d'email essentielles
console.log("\n📧 Vérification des variables d'email:");
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  console.log("✅ Variables d'email essentielles configurées:");
  console.log(`   - EMAIL_USER: ${process.env.EMAIL_USER}`);
  console.log(`   - EMAIL_PASSWORD: ${"*".repeat(8)} (masqué)`);
  console.log(
    `   - EMAIL_RECIPIENT: ${process.env.EMAIL_RECIPIENT || "⚠️ Non défini"}`
  );
  console.log(`   - EMAIL_HOST: ${process.env.EMAIL_HOST || "⚠️ Non défini"}`);
  console.log(`   - EMAIL_PORT: ${process.env.EMAIL_PORT || "⚠️ Non défini"}`);
} else {
  console.error("❌ Variables d'email manquantes:");
  console.error(`   - EMAIL_USER: ${process.env.EMAIL_USER ? "✓" : "✗"}`);
  console.error(
    `   - EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? "✓" : "✗"}`
  );
}

// Explicitement définir les variables globales pour les fonctions d'API
// Ceci est important car les fonctions d'API peuvent ne pas hériter correctement de l'environnement
global.process = global.process || {};
global.process.env = global.process.env || {};

// S'assurer que les variables d'email sont disponibles globalement
if (process.env.EMAIL_USER)
  global.process.env.EMAIL_USER = process.env.EMAIL_USER;
if (process.env.EMAIL_PASSWORD)
  global.process.env.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
if (process.env.EMAIL_RECIPIENT)
  global.process.env.EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;
if (process.env.EMAIL_HOST)
  global.process.env.EMAIL_HOST = process.env.EMAIL_HOST;
if (process.env.EMAIL_PORT)
  global.process.env.EMAIL_PORT = process.env.EMAIL_PORT;
if (process.env.EMAIL_SERVICE)
  global.process.env.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
if (process.env.EMAIL_SECURE)
  global.process.env.EMAIL_SECURE = process.env.EMAIL_SECURE;

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser le port 3000 pour correspondre au proxy de Vite

// Vérifier si nous sommes dans un environnement Vercel Dev
const isVercelDev =
  process.env.VERCEL_ENV === "development" || process.env.VERCEL_DEV === "1";

// Middlewares
app.use(cors()); // Activer CORS pour toutes les routes
app.use(express.json()); // Parser le JSON

// Importer les fonctions d'API de manière dynamique
let sendEmail;
try {
  // Import dynamique pour les modules ES
  const sendEmailModule = await import("./api/send-email.js");
  sendEmail = sendEmailModule.default;
} catch (e) {
  console.log("Module send-email.js non trouvé ou non compatible: ", e.message);
}

// Routes API
if (sendEmail) {
  app.post("/api/send-email", (req, res) => {
    console.log("✉️ Requête reçue pour envoyer un email");
    console.log("Données reçues:", JSON.stringify(req.body, null, 2));

    sendEmail(
      { method: "POST", body: req.body },
      {
        status: (code) => ({
          json: (data) => {
            console.log(`Réponse de send-email: ${code}`, data);
            return res.status(code).json(data);
          },
        }),
        setHeader: (name, value) => res.setHeader(name, value),
      }
    ).catch((error) => {
      console.error("Erreur lors de l'envoi du message:", error);
      res.status(500).json({
        error: "Erreur lors du traitement de la demande",
        message: error.message,
      });
    });
  });
}

// Route de test pour vérifier que le serveur fonctionne
app.get("/api/test", (req, res) => {
  res.json({
    status: "success",
    message: "Le serveur API fonctionne correctement",
    timestamp: new Date().toISOString(),
    env: {
      isVercelDev,
      nodeEnv: process.env.NODE_ENV,
    },
  });
});

// Ne démarrer le serveur que si nous ne sommes pas dans Vercel Dev
// ou si aucune autre instance n'est en cours d'exécution
const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
    console.log(
      `📧 API d'envoi d'emails disponible sur http://localhost:${PORT}/api/send-email`
    );
    console.log(
      `🧪 Route de test disponible sur http://localhost:${PORT}/api/test`
    );
  });

  // Gestion propre de l'arrêt du serveur
  process.on("SIGINT", () => {
    console.log("Arrêt gracieux du serveur Express");
    server.close(() => {
      console.log("Serveur Express arrêté");
      process.exit(0);
    });
  });
};

// Démarrer le serveur si ce fichier est exécuté directement
startServer();

// Exporter l'application pour les tests ou l'usage comme middleware
export default app;
