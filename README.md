# Site web Rachel Gervais - Assistante Sociale Indépendante

Ce projet est un site web professionnel pour Rachel Gervais, assistante sociale indépendante basée en Normandie. Le site présente ses services, son parcours professionnel, et permet aux visiteurs de prendre contact ou d'acheter des ressources comme son ebook.

## 📋 Fonctionnalités

- **Design responsive** adapté à tous les appareils (mobile, tablette, desktop)
- **Sections informatives** sur les services et le parcours de l'assistante sociale
- **Témoignages clients** pour renforcer la crédibilité
- **Formulaire de contact** pour faciliter les demandes
- **Système de paiement intégré** via PayPal pour l'achat de l'ebook
- **Mentions légales complètes** et gestion des cookies conforme au RGPD
- **Optimisation automatique des images** avec conversion WebP et compression intelligente
- **Génération automatique des favicons** pour tous les appareils et navigateurs
- **Animations fluides** et transitions pour une expérience utilisateur agréable

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI moderne et performante
- **TypeScript** - Pour un code type-safe et plus robuste
- **Vite** - Build tool rapide pour le développement
- **Tailwind CSS** - Framework CSS utilitaire pour un design sur mesure
- **RadixUI** - Composants accessibles et personnalisables
- **React Router v6** - Gestion des routes et navigation avec support des futures fonctionnalités v7
- **React Hook Form** - Gestion des formulaires
- **PayPal API** - Intégration des paiements sécurisés
- **React Helmet Async** - Gestion du SEO et méta-données compatible avec le Concurrent Mode
- **Sharp** - Optimisation et transformation d'images
- **PostCSS** - Traitement CSS avancé avec support pour le nesting et autres fonctionnalités modernes

## 🚀 Installation et démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou Bun

### Installation

```bash
# Cloner le dépôt
git clone [url-du-dépôt]
cd as-independante

# Installer les dépendances
npm install
# ou avec Bun
bun install
```

### Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
VITE_APP_TITLE="Rachel Gervais - Assistante Sociale Indépendante"
VITE_APP_DESCRIPTION="Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie."
VITE_APP_KEYWORDS="assistante sociale, Normandie, Rachel Gervais, accompagnement social, démarches administratives"
VITE_APP_URL="https://www.as-independante.fr"
VITE_APP_REGION="Normandie"
VITE_APP_COUNTRY="France"
VITE_APP_PHONE="07 63 90 78 45"
VITE_APP_EMAIL="rachel.gervais@as-independante.fr"
VITE_APP_OPENING_HOURS="Mo-Fr 09:00-18:00"
VITE_APP_FACEBOOK="https://www.facebook.com/groups/508874659843806"

# Configuration PayPal (remplacer par votre ID client réel en production)
VITE_PAYPAL_CLIENT_ID="sb"
```

### Démarrage du serveur de développement

```bash
npm run dev
# ou avec Bun
bun run dev
```

Le site sera accessible à l'adresse [http://localhost:5173](http://localhost:5173)

### Build pour la production

```bash
npm run build
# ou avec Bun
bun run build
```

Les fichiers générés seront dans le dossier `dist/` prêts à être déployés.

## 📁 Structure du projet

```
public/               # Fichiers statiques accessibles par le navigateur
  ├── assets/         # Images et ressources visuelles
  ├── favicons/       # Favicons pour différents appareils
  └── ...             # Autres fichiers statiques (robots.txt, sitemap.xml, etc.)
scripts/              # Scripts d'automatisation
  ├── convert-to-webp.js      # Conversion d'images au format WebP
  ├── generate-favicons.js    # Génération des favicons à différentes tailles
  └── optimize-images.js      # Optimisation des images existantes
src/
  ├── components/     # Composants React réutilisables
  │   ├── animations/ # Composants d'animation
  │   ├── ui/         # Composants d'interface utilisateur
  │   ├── checkout/   # Composants pour le processus d'achat
  │   ├── legal/      # Composants pour les mentions légales
  │   └── ...         # Autres composants spécifiques
  ├── config/         # Fichiers de configuration
  ├── contexts/       # Contexts React pour l'état global
  ├── hooks/          # Hooks React personnalisés
  ├── pages/          # Pages principales du site
  └── services/       # Services et intégrations API
```

## 🔧 Personnalisation

Pour modifier le contenu du site :

- Les textes et configurations générales se trouvent dans `src/config/siteConfig.ts`
- La configuration de l'ebook est dans `src/config/ebookConfig.ts`
- Les images peuvent être remplacées dans le dossier `public/assets/`

### Mise à jour des images

Pour remplacer une image existante, placez simplement votre nouveau fichier dans le répertoire correspondant sous `public/assets/`. Lors du prochain build, l'image sera automatiquement optimisée et convertie au format WebP.

### Mise à jour du logo

Le logo principal se trouve dans `public/assets/logo/` et est référencé dans `src/config/siteConfig.ts`. Pour mettre à jour le logo :

1. Placez votre nouveau logo dans le dossier
2. Mettez à jour le chemin dans la configuration si nécessaire
3. Le composant OptimizedImage gère automatiquement le format WebP et les fallbacks

### Mise à jour du favicon

Pour mettre à jour le favicon du site :

1. Remplacez le fichier `public/favicon.png` par votre nouvelle image (idéalement 512x512px)
2. Exécutez `npm run generate-favicons` ou simplement `npm run build` qui inclut cette étape

Le script générera automatiquement toutes les variantes de tailles nécessaires pour différents appareils et navigateurs.

## 📦 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Génère le build de production (incluant l'optimisation des images et la génération des favicons)
- `npm run preview` - Prévisualise le build de production en local
- `npm run lint` - Lance l'analyse du code avec ESLint
- `npm run generate-favicons` - Génère toutes les tailles de favicons à partir de `public/favicon.png`
- `npm run optimize-images` - Optimise toutes les images et génère des versions WebP
- `npm run convert-images` - Convertit uniquement les images en format WebP

## 🔍 Performance et optimisations

Le projet intègre plusieurs optimisations pour une expérience utilisateur optimale :

- **Images optimisées** : Compression intelligente et format WebP avec fallback pour les navigateurs anciens
- **Lazy loading** : Chargement différé des images et composants non critiques
- **Code splitting** : Division du code pour ne charger que ce qui est nécessaire
- **Responsive design** : Adaptation à toutes les tailles d'écran avec des optimisations spécifiques
- **SEO optimisé** : Métadonnées appropriées, schema.org et balises OpenGraph
- **Compatibilité PWA** : Support des applications web progressives avec balises meta appropriées

## 🔄 Mises à jour récentes

- Migration de React Helmet vers React Helmet Async pour améliorer la compatibilité avec le Concurrent Mode
- Activation des fonctionnalités futures de React Router v7 avec le flag `v7_startTransition`
- Optimisation de l'affichage du logo dans la navigation
- Correction des méta-données pour les applications web mobiles

## 📜 Licence

Ce projet est la propriété de JFL et ne peut être utilisé sans autorisation.

## 📞 Contact

Pour toute question concernant ce projet, contactez le développeur à [jflsiteweb@gmail.com].

---

Dernière mise à jour : 25 avril 2025
