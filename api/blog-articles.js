import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "../public/blog-data.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

const router = express.Router();

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Non autorisé" });
  }
  next();
};

// Lire tous les articles
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const articles = JSON.parse(data);
    res.json(articles);
  } catch (error) {
    console.error("Erreur lors de la lecture des articles:", error);
    res.status(500).json({ error: "Erreur lors de la lecture des articles" });
  }
});

// Récupérer un article spécifique
router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const articles = JSON.parse(data);
    const article = articles.find((a) => a.id === req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }
    res.json(article);
  } catch (error) {
    console.error("Erreur lors de la lecture de l'article:", error);
    res.status(500).json({ error: "Erreur lors de la lecture" });
  }
});

// Créer un nouvel article (protégé)
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, excerpt, content, image, tags } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    const data = await fs.readFile(DATA_FILE, "utf-8");
    const articles = JSON.parse(data);

    // Générer un ID unique
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newArticle = {
      id,
      title,
      date: new Date().toISOString().split("T")[0],
      author: "Rachel Gervais",
      readTime: `${Math.ceil(content.split(" ").length / 200)} min`,
      excerpt,
      image: image || "/assets/images/blog/default.svg",
      tags: tags || [],
      content,
      relatedArticles: [],
    };

    articles.push(newArticle);
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2));

    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    res.status(500).json({ error: "Erreur lors de la création" });
  }
});

// Modifier un article (protégé)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { title, excerpt, content, image, tags } = req.body;
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const articles = JSON.parse(data);

    const articleIndex = articles.findIndex((a) => a.id === req.params.id);
    if (articleIndex === -1) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    const updatedArticle = {
      ...articles[articleIndex],
      title: title || articles[articleIndex].title,
      excerpt: excerpt || articles[articleIndex].excerpt,
      content: content || articles[articleIndex].content,
      image: image || articles[articleIndex].image,
      tags: tags || articles[articleIndex].tags,
      readTime: content
        ? `${Math.ceil(content.split(" ").length / 200)} min`
        : articles[articleIndex].readTime,
    };

    articles[articleIndex] = updatedArticle;
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2));

    res.json(updatedArticle);
  } catch (error) {
    console.error("Erreur lors de la modification de l'article:", error);
    res.status(500).json({ error: "Erreur lors de la modification" });
  }
});

// Supprimer un article (protégé)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    let articles = JSON.parse(data);

    const articleIndex = articles.findIndex((a) => a.id === req.params.id);
    if (articleIndex === -1) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    const deletedArticle = articles[articleIndex];
    articles = articles.filter((a) => a.id !== req.params.id);
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2));

    res.json({
      message: "Article supprimé avec succès",
      article: deletedArticle,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;
