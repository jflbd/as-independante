import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const SITE_URL = "https://www.as-independante.fr";
const CURRENT_DATE = new Date().toISOString().split("T")[0];

// --- Data Loading ---
const loadBlogArticles = () => {
  const jsonPath = path.resolve(__dirname, '../public/blog-data.json');
  const fileContent = fs.readFileSync(jsonPath, "utf8");
  return JSON.parse(fileContent);
};

const blogArticles = loadBlogArticles();

// --- Page Definitions ---
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

const blogPages = [
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  ...blogArticles.map(article => ({
    path: `/blog/${article.id}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: new Date(article.date).toISOString().split("T")[0],
    news: {
      title: article.title,
      publicationDate: new Date(article.date).toISOString().split("T")[0],
    },
    image: {
      path: article.image,
      title: article.title,
      caption: article.excerpt,
    },
  })),
];

const utilityPages = [
  { path: "/sitemap", priority: "0.5", changefreq: "monthly" },
  {
    path: "/ebook",
    priority: "0.8",
    changefreq: "weekly",
    image: {
      path: "/assets/images/ebook-cover.webp",
      title: "Guide des démarches administratives - Ebook",
      caption: "Guide complet pour vous accompagner dans votre installation en tant qu'assistant(e) social(e) indépendant(e)",
    },
  },
  { path: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
];

const geoPages = [
  { path: "/#services-caen", priority: "0.8", changefreq: "monthly", hasGeo: true },
  { path: "/#services-rouen", priority: "0.8", changefreq: "monthly", hasGeo: true },
  { path: "/#services-lehavre", priority: "0.8", changefreq: "monthly", hasGeo: true },
  { path: "/#services-normandie", priority: "0.7", changefreq: "monthly", hasGeo: true },
];

// --- XML Generation ---
function generateSitemapXml() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

  const allPages = [...mainSections, ...blogPages, ...utilityPages, ...geoPages];

  allPages.forEach(page => {
    xml += "  <url>\n";
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${page.lastmod || CURRENT_DATE}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;

    if (page.image) {
      xml += "    <image:image>\n";
      xml += `      <image:loc>${SITE_URL}${page.image.path}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(page.image.title)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(page.image.caption)}</image:caption>\n`;
      xml += "    </image:image>\n";
    }
    if (page.news) {
      xml += "    <news:news>\n";
      xml += "      <news:publication>\n";
      xml += "        <news:name>Blog de Rachel Gervais</news:name>\n";
      xml += "        <news:language>fr</news:language>\n";
      xml += "      </news:publication>\n";
      xml += `      <news:publication_date>${page.news.publicationDate}</news:publication_date>\n`;
      xml += `      <news:title>${escapeXml(page.news.title)}</news:title>\n`;
      xml += "    </news:news>\n";
    }
    if (page.hasGeo) {
        xml += "    <geo:geo>\n";
        xml += "      <geo:format>kml</geo:format>\n";
        xml += "    </geo:geo>\n";
    }
    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
}

function escapeXml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
    return c;
  });
}

// --- Execution ---
try {
  const sitemapXml = generateSitemapXml();
  const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outputPath, sitemapXml, "utf8");
  console.log(`✅ Sitemap généré avec succès: ${outputPath}`);
} catch (error) {
  console.error("❌ Erreur lors de la génération du sitemap:", error);
  process.exit(1);
}
