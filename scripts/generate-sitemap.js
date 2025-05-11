/**
 * Script de génération automatique du sitemap.xml
 *
 * Ce script génère un sitemap.xml optimisé pour Google Search Console
 * en se basant sur la structure du site AS-Independante.fr
 *
 * Usage: node scripts/generate-sitemap.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration du site
const SITE_URL = "https://www.as-independante.fr";
const CURRENT_DATE = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

// Définition des sections principales
const mainSections = [
  { path: "/", priority: "1.0", changefreq: "weekly", hasImage: true },
  { path: "/#a-propos", priority: "0.8", changefreq: "monthly" },
  { path: "/#missions", priority: "0.8", changefreq: "monthly" },
  { path: "/#temoignages", priority: "0.7", changefreq: "monthly" },
  { path: "/#services", priority: "0.9", changefreq: "monthly" },
  { path: "/#referentiel", priority: "0.7", changefreq: "monthly" },
  { path: "/#deontologie", priority: "0.7", changefreq: "monthly" },
  { path: "/#pricing", priority: "0.8", changefreq: "weekly" },
  { path: "/#contact", priority: "0.9", changefreq: "monthly", hasGeo: true },
];

// Pages du blog
const blogPages = [
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  {
    path: "/blog/role-assistante-sociale-independante",
    priority: "0.8",
    changefreq: "monthly",
    news: {
      title: "Le rôle d'une assistante sociale indépendante en Normandie",
      publicationDate: "2025-05-11",
    },
    image: {
      path: "/assets/images/blog/assistante-sociale-independante-role.jpg",
      title: "Le rôle d'une assistante sociale indépendante en Normandie",
      caption:
        "Découvrez le rôle spécifique d'une assistante sociale libérale et comment elle peut vous accompagner dans vos démarches sociales en Normandie.",
    },
  },
  {
    path: "/blog/aides-sociales-normandie",
    priority: "0.8",
    changefreq: "monthly",
    news: {
      title: "Guide des aides sociales disponibles en Normandie",
      publicationDate: "2025-05-10",
    },
    image: {
      path: "/assets/images/blog/aides-sociales-normandie.jpg",
      title: "Guide des aides sociales disponibles en Normandie",
      caption:
        "Panorama complet des dispositifs d'aide sociale accessibles en région normande : allocations, subventions, et accompagnements disponibles.",
    },
  },
  {
    path: "/blog/preparer-rendez-vous-assistante-sociale",
    priority: "0.8",
    changefreq: "monthly",
    news: {
      title: "Comment se préparer à un rendez-vous avec une assistante sociale",
      publicationDate: "2025-05-09",
    },
    image: {
      path: "/assets/images/blog/preparer-rendez-vous-assistante-sociale.jpg",
      title: "Comment se préparer à un rendez-vous avec une assistante sociale",
      caption:
        "Conseils pratiques pour préparer votre premier rendez-vous avec une assistante sociale et optimiser cette rencontre.",
    },
  },
];

// Pages utilitaires
const utilityPages = [
  { path: "/sitemap", priority: "0.5", changefreq: "monthly" },
  {
    path: "/ebook",
    priority: "0.8",
    changefreq: "weekly",
    image: {
      path: "/assets/images/ebook-cover.jpg",
      title: "Guide des démarches administratives - Ebook",
      caption:
        "Guide complet pour vous accompagner dans votre installation en tant qu'assistant(e) social(e) indépendant(e)",
    },
  },
  { path: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
  {
    path: "/mentions-legales#definitions",
    priority: "0.2",
    changefreq: "yearly",
  },
  {
    path: "/mentions-legales#personal-data",
    priority: "0.2",
    changefreq: "yearly",
  },
  { path: "/mentions-legales#cookies", priority: "0.2", changefreq: "yearly" },
];

// Pages géographiques pour le référencement local
const geoPages = [
  {
    path: "/#services-caen",
    priority: "0.8",
    changefreq: "monthly",
    hasGeo: true,
  },
  {
    path: "/#services-rouen",
    priority: "0.8",
    changefreq: "monthly",
    hasGeo: true,
  },
  {
    path: "/#services-lehavre",
    priority: "0.8",
    changefreq: "monthly",
    hasGeo: true,
  },
  {
    path: "/#services-normandie",
    priority: "0.7",
    changefreq: "monthly",
    hasGeo: true,
  },
];

// Génération du fichier XML
function generateSitemapXml() {
  // Début du document XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml +=
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml +=
    '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml +=
    '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n';
  xml += '        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">\n';

  // Métadonnées du sitemap
  xml += "        \n";
  xml += "  <!-- Métadonnées du sitemap -->\n";
  xml += `  <!-- Généré le ${CURRENT_DATE} pour AS-Independante.fr -->\n`;
  xml += "  <!-- Version: 2.1 -->\n";
  xml += "  \n";

  // Fonctions pour générer les entrées URL
  const generateUrlEntry = (page) => {
    let entry = "  <url>\n";
    entry += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    entry += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
    entry += `    <changefreq>${page.changefreq}</changefreq>\n`;
    entry += `    <priority>${page.priority}</priority>\n`;

    // Ajouter des informations d'image si spécifié
    if (page.hasImage || page.image) {
      const imagePath =
        page.image?.path ||
        "/assets/images/rachel-gervais-assistante-sociale-independante.jpg";
      const imageTitle =
        page.image?.title ||
        "Rachel Gervais - Assistante Sociale Indépendante en Normandie";
      const imageCaption =
        page.image?.caption ||
        "Rachel Gervais, assistante sociale libérale diplômée d'État, propose ses services en Normandie";

      entry += "    <image:image>\n";
      entry += `      <image:loc>${SITE_URL}${imagePath}</image:loc>\n`;
      entry += `      <image:title>${imageTitle}</image:title>\n`;
      entry += `      <image:caption>${imageCaption}</image:caption>\n`;
      entry += "    </image:image>\n";
    }

    // Ajouter des informations de news si spécifié
    if (page.news) {
      entry += "    <news:news>\n";
      entry += "      <news:publication>\n";
      entry += "        <news:name>Blog de Rachel Gervais</news:name>\n";
      entry += "        <news:language>fr</news:language>\n";
      entry += "      </news:publication>\n";
      entry += `      <news:publication_date>${page.news.publicationDate}</news:publication_date>\n`;
      entry += `      <news:title>${page.news.title}</news:title>\n`;
      entry += "    </news:news>\n";
    }

    // Ajouter des informations géographiques si spécifiées
    if (page.hasGeo) {
      entry += "    <geo:geo>\n";
      entry += "      <geo:format>kml</geo:format>\n";
      entry += "    </geo:geo>\n";
    }

    entry += "  </url>\n";
    return entry;
  };

  // Générer les entrées pour chaque section du site
  xml += "  <!-- ================= PAGE D'ACCUEIL ================= -->\n";
  xml += generateUrlEntry(mainSections[0]);

  xml +=
    "  \n  <!-- ================= SECTIONS PRINCIPALES ================= -->\n";
  xml +=
    "  <!-- Les sections principales de la page d'accueil sont référencées avec des ancres -->\n";
  mainSections.slice(1).forEach((section) => {
    xml += generateUrlEntry(section);
  });

  xml += "  \n  <!-- ================= BLOG ================= -->\n";
  xml += "  <!-- Page index du blog -->\n";
  xml += generateUrlEntry(blogPages[0]);

  xml += "  \n  <!-- Articles de blog -->\n";
  blogPages.slice(1).forEach((article) => {
    xml += generateUrlEntry(article);
  });

  xml +=
    "  \n  <!-- ================= PAGES UTILITAIRES ================= -->\n";
  utilityPages.forEach((page) => {
    xml += generateUrlEntry(page);
  });

  xml +=
    "  \n  <!-- ================= PAGES GÉOGRAPHIQUES ================= -->\n";
  xml += "  <!-- Pages virtuelles pour le référencement local -->\n";
  geoPages.forEach((page) => {
    xml += generateUrlEntry(page);
  });

  // Fin du document XML
  xml += "</urlset>";

  return xml;
}

// Écrire le fichier sitemap.xml
const sitemapXml = generateSitemapXml();
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");

fs.writeFileSync(outputPath, sitemapXml, "utf8");
console.log(`✅ Sitemap généré avec succès: ${outputPath}`);
