/**
 * Plugin Vite personnalisé pour remplacer les variables d'environnement au format %VARIABLE%
 * Ce plugin est utilisé pour remplacer les variables dans index.html lors de la build
 * Compatible avec le déploiement Vercel et le développement local
 */

/**
 * Obtient la valeur d'une variable d'environnement
 * @param {string} key - Nom de la variable d'environnement
 * @param {object} env - Objet contenant les variables d'environnement
 * @returns {string} - Valeur de la variable ou chaîne vide
 */
function getEnvValue(key, env) {
  // Vérifier d'abord dans process.env
  if (process.env && process.env[key]) {
    return process.env[key];
  }

  // Puis dans l'objet env passé
  if (env && env[key]) {
    return env[key];
  }

  // Valeurs par défaut pour certaines variables importantes
  const defaults = {
    VITE_APP_TITLE: "Rachel Gervais - Assistante Sociale Indépendante",
    VITE_APP_DESCRIPTION:
      "Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie.",
    VITE_APP_KEYWORDS: "assistante sociale, Normandie, accompagnement social",
    VITE_APP_URL: "https://www.as-independante.fr",
  };

  // Retourner la valeur par défaut ou une chaîne vide
  return defaults[key] || "";
}

/**
 * Plugin principal
 */
export default function envReplace() {
  return {
    name: "vite-plugin-env-replace",

    // Transforme le HTML avant qu'il ne soit traité
    transformIndexHtml(html) {
      console.log(
        "🔄 Remplacement des variables d'environnement dans index.html"
      );

      // Remplace tous les %VARIABLE% par leur valeur correspondante
      return html.replace(/%(\w+)%/g, (match, key) => {
        const value = getEnvValue(key, process.env);

        if (!value && key.startsWith("VITE_")) {
          console.warn(`⚠️ Variable d'environnement manquante: ${key}`);
        }

        return value;
      });
    },
  };
}
