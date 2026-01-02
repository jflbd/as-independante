import { parse } from "url";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

const jsonHeaders = {
  "Content-Type": "application/json",
};

const authHeaders = {
  ...jsonHeaders,
  apikey: SUPABASE_SERVICE_ROLE_KEY || "",
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY || ""}`,
};

const toSlug = (title = "") =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);

const requireConfig = (res) => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    res
      .status(500)
      .json({ error: "SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant" });
    return false;
  }
  return true;
};

const requireAuth = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Non autorisé" });
    return false;
  }
  return true;
};

const callSupabase = async (path, options = {}) => {
  const url = `${SUPABASE_URL}/rest/v1${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders,
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }
  return { response, data };
};

export default async function handler(req, res) {
  if (!requireConfig(res)) return;

  const { pathname } = parse(req.url, true);
  const id = pathname.replace("/api/blog", "").replace(/^\/+/, "");

  // Si il y a un ID dans le path, gérer les opérations sur cet article
  if (id) {
    // GET one article
    if (req.method === "GET") {
      const { response, data } = await callSupabase(
        `/blog_articles?id=eq.${encodeURIComponent(id)}&select=*`
      );
      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: data || "Erreur lors de la récupération" });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ error: "Article non trouvé" });
      }
      return res.status(200).json(data[0]);
    }

    // PUT/PATCH one article
    if (req.method === "PUT" || req.method === "PATCH") {
      if (!requireAuth(req, res)) return;

      const body = req.body || {};
      const updatePayload = {
        ...(body.title ? { title: body.title } : {}),
        ...(body.excerpt ? { excerpt: body.excerpt } : {}),
        ...(body.content ? { content: body.content } : {}),
        ...(body.image ? { image: body.image } : {}),
        ...(body.tags
          ? {
              tags: Array.isArray(body.tags)
                ? body.tags
                : typeof body.tags === "string"
                ? body.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                : [],
            }
          : {}),
        ...(body.date ? { date: body.date } : {}),
        ...(body.author ? { author: body.author } : {}),
        ...(body.readtime
          ? { readtime: body.readtime }
          : body.content
          ? {
              readtime: `${Math.ceil(
                (body.content || "").split(" ").length / 200
              )} min`,
            }
          : {}),
      };

      const { response, data } = await callSupabase(
        `/blog_articles?id=eq.${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: {
            Prefer: "return=representation",
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: data || "Erreur lors de la modification" });
      }

      return res
        .status(200)
        .json(data && data[0] ? data[0] : { id, ...updatePayload });
    }

    // DELETE one article
    if (req.method === "DELETE") {
      if (!requireAuth(req, res)) return;

      const { response, data } = await callSupabase(
        `/blog_articles?id=eq.${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Prefer: "return=minimal",
          },
        }
      );

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: data || "Erreur lors de la suppression" });
      }

      return res.status(200).json({ message: "Article supprimé" });
    }

    res.setHeader("Allow", "GET,PUT,PATCH,DELETE");
    return res
      .status(405)
      .json({ error: "Méthode non autorisée pour cet article" });
  }

  // Pas d'ID = opérations sur la collection

  if (req.method === "GET") {
    // List all articles
    const { response, data } = await callSupabase(
      "/blog_articles?select=*&order=date.desc"
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data || "Erreur lors de la récupération" });
    }
    return res.status(200).json(data || []);
  }

  if (req.method === "POST") {
    if (!requireAuth(req, res)) return;
    const body = req.body || {};
    const title = body.title || "";
    const idSlug = body.id || toSlug(title);
    const nowDate = new Date().toISOString().split("T")[0];
    const readtime =
      body.readtime ||
      `${Math.ceil((body.content || "").split(" ").length / 200)} min`;

    const payload = {
      id: idSlug,
      title,
      excerpt: body.excerpt || "",
      content: body.content || "",
      image: body.image || null,
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string"
        ? body.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      date: body.date || nowDate,
      author: body.author || "Rachel Gervais",
      readtime,
    };

    const { response, data } = await callSupabase("/blog_articles", {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data || "Erreur lors de la création" });
    }
    return res.status(201).json(data && data[0] ? data[0] : payload);
  }

  res.setHeader("Allow", "GET,POST");
  return res.status(405).json({ error: "Méthode non autorisée" });
}
