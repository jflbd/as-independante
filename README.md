# Site web Rachel Gervais - Assistante Sociale Indépendante

Ce projet est un site web professionnel pour Rachel Gervais, assistante sociale indépendante basée en Normandie. Le site présente ses services, son parcours professionnel, et permet aux visiteurs de prendre contact ou d'effectuer des paiements en ligne.

## 📋 Fonctionnalités

- **Design responsive** adapté à tous les appareils (mobile, tablette, desktop)
- **Sections informatives** sur les services et le parcours de l'assistante sociale
- **Témoignages clients** pour renforcer la crédibilité
- **Formulaire de contact** pour faciliter les demandes
- **Système de paiement intégré** avec Stripe et PayPal pour les prestations et dons
- **Paiement personnalisable** permettant aux utilisateurs de définir leur propre montant
- **Vente d'e-book** avec téléchargement automatique après paiement
- **Prise de rendez-vous en ligne** avec confirmation par email
- **Mentions légales complètes** et gestion des cookies conforme au RGPD
- **Infrastructure serverless** pour le traitement sécurisé des paiements
- **Optimisation automatique des images** avec conversion WebP et compression intelligente
- **Génération automatique des favicons** pour tous les appareils et navigateurs
- **Animations fluides** et transitions pour une expérience utilisateur agréable

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI moderne et performante
- **TypeScript** - Pour un code type-safe et plus robuste
- **Vite** - Build tool rapide pour le développement
- **Tailwind CSS** - Framework CSS utilitaire pour un design sur mesure
- **shadcn/ui** - Composants accessibles et personnalisables basés sur Radix UI
- **React Router v6** - Gestion des routes et navigation
- **React Hook Form** - Gestion des formulaires
- **Stripe API** - Traitement sécurisé des paiements par carte bancaire
- **PayPal API** - Intégration des paiements alternatifs
- **Vercel API Routes** - Architecture serverless pour le backend
- **React Helmet Async** - Gestion du SEO et méta-données compatible avec le Concurrent Mode
- **Sharp** - Optimisation et transformation d'images
- **PostCSS** - Traitement CSS avancé avec support pour le nesting et autres fonctionnalités modernes
- **TarteAuCitron** - Gestion des cookies conforme au RGPD

## 🚀 Installation et démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm
- Vercel CLI (`npm install -g vercel`)

### Installation

```bash
# Cloner le dépôt
git clone [url-du-dépôt]
cd as-independante

# Installer les dépendances
npm install
```

### Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
# Configuration pour les méta-données
VITE_APP_TITLE=Rachel Gervais - Assistante Sociale Indépendante
VITE_APP_DESCRIPTION=Rachel Gervais, assistante sociale diplômée d'État depuis 2009, vous accompagne dans vos démarches sociales en Normandie. Plus de 10 ans d'expérience au service de votre bien-être social.
VITE_APP_KEYWORDS=assistante sociale, Normandie, Rachel Gervais, accompagnement social, démarches administratives
VITE_APP_URL=https://www.as-independante.fr

# Configuration Stripe (remplacer par vos clés réelles)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# Configuration PayPal (remplacer par votre ID client réel en production)
VITE_PAYPAL_CLIENT_ID="votre_id_client"
```

### Démarrage du serveur de développement

Pour un développement complet avec fonctions API serverless (formulaire de contact, paiements, etc.) :

```bash
# Configuration initiale de Vercel (à faire une seule fois)
vercel link

# Démarrage du serveur de développement avec Vercel
vercel dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

> **Important**: Utilisez toujours `vercel dev` pour le développement local si vous avez besoin des fonctions API (envoi d'email, paiement Stripe, etc.). La commande `npm run dev` ne permet pas d'accéder aux fonctions serverless.

### Build pour la production

```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist/` prêts à être déployés.

### Déploiement

```bash
# Déployer vers Vercel
vercel deploy
```

## 📁 Structure du projet

```
api/                # Fonctions API pour Vercel serverless
  ├── create-payment-intent.js
  ├── mailchimp-subscribe.js
  └── send-email.js
public/               # Fichiers statiques accessibles par le navigateur
  ├── assets/         # Images et ressources visuelles
  │   ├── avisuser/   # Images pour les témoignages clients
  │   ├── card/       # Images pour les cartes de paiement
  │   ├── images/     # Images générales du site
  │   └── logo/       # Logo et variantes
  ├── favicons/       # Favicons pour différents appareils
  ├── ebooks/         # Documents téléchargeables
  └── ...             # Autres fichiers statiques (robots.txt, sitemap.xml, etc.)
scripts/              # Scripts d'automatisation
  ├── convert-to-webp.js      # Conversion d'images au format WebP
  ├── generate-favicons.js    # Génération des favicons à différentes tailles
  └── optimize-images.js      # Optimisation des images existantes
src/
  ├── components/     # Composants React réutilisables
  │   ├── animations/ # Composants d'animation
  │   ├── checkout/   # Composants pour le processus d'achat et paiement
  │   ├── legal/      # Composants pour les mentions légales
  │   ├── pricing/    # Composants pour l'affichage des tarifs
  │   ├── ui/         # Composants d'interface utilisateur
  │   └── ...         # Autres composants spécifiques
  ├── config/         # Fichiers de configuration
  │   ├── ebookConfig.ts      # Configuration des e-books
  │   ├── paypalConfig.ts     # Configuration PayPal
  │   ├── siteConfig.ts       # Configuration générale du site
  │   ├── stripeConfig.ts     # Configuration Stripe
  │   └── testimonialsConfig.ts # Configuration des témoignages
  ├── contexts/       # Contexts React pour l'état global
  ├── hooks/          # Hooks React personnalisés
  ├── pages/          # Pages principales du site
  │   ├── CheckoutPage.tsx    # Page de paiement avec choix du montant
  │   ├── EbookPage.tsx       # Page de présentation des e-books
  │   ├── BookingPage.tsx     # Page de prise de rendez-vous
  │   └── ...                 # Autres pages du site
  └── api/            # Fonctions d'API pour le frontend
```

## 💰 Système de paiement

Le site intègre deux solutions de paiement complémentaires :

### Stripe

- Paiement par carte bancaire
- Support du 3D Secure et de l'authentification forte
- Traitement sécurisé des paiements via des fonctions serverless
- Cartes de test disponibles en mode développement
- Support des montants personnalisables par l'utilisateur
- Gestion sécurisée des webhook pour la confirmation des paiements

### PayPal

- Alternative au paiement par carte
- Support des comptes PayPal et des cartes bancaires
- Intégration SmartButton pour une expérience optimisée
- Mode sandbox pour les tests
- Paiement express pour une meilleure conversion

## 📚 Vente d'e-books

Le site propose la vente d'e-books sur le thème de l'accompagnement social :

- Téléchargement automatique après confirmation du paiement
- Protection contre les téléchargements non autorisés
- Page de présentation détaillée avec extraits
- Témoignages spécifiques aux e-books
- Statistiques de téléchargement

## 🔧 Personnalisation

Pour modifier le contenu du site :

- Les textes et configurations générales se trouvent dans `src/config/siteConfig.ts`
- La configuration Stripe est dans `src/config/stripeConfig.ts`
- La configuration PayPal est dans `src/config/paypalConfig.ts`
- La configuration Mailchimp est dans `src/config/mailchimpConfig.ts`
- Les témoignages sont configurés dans `src/config/testimonialsConfig.ts`
- Les e-books sont configurés dans `src/config/ebookConfig.ts`
- Les images peuvent être remplacées dans le dossier `public/assets/`

### Mise à jour des images

Pour remplacer une image existante, placez simplement votre nouveau fichier dans le répertoire correspondant sous `public/assets/`. Lors du prochain build, l'image sera automatiquement optimisée et convertie au format WebP.

### Configuration des paiements

Pour passer du mode test au mode production :

#### Stripe

1. Remplacez les clés API de test Stripe (pk*test*... et sk*test*...) par vos clés de production (pk*live*... et sk*live*...)
2. Déployez les nouvelles variables d'environnement sur votre projet Vercel

#### PayPal

1. Dans le fichier `src/config/paypalConfig.ts`, modifiez la valeur de `testMode` à `false` pour activer le mode production
2. Assurez-vous que votre `productionClientId` contient votre véritable ID client PayPal de production
3. Redéployez l'application pour appliquer les changements

## 📦 Scripts disponibles

- `vercel dev` - Lance le serveur de développement complet avec support des API routes
- `npm run dev` - Lance le serveur de développement frontend uniquement (sans API fonctionnelles)
- `npm run build` - Génère le build de production (incluant l'optimisation des images et la génération des favicons)
- `npm run preview` - Prévisualise le build de production en local
- `npm run lint` - Lance l'analyse du code avec ESLint
- `npm run generate-favicons` - Génère toutes les tailles de favicons à partir de `public/favicon.png`
- `npm run optimize-images` - Optimise toutes les images et génère des versions WebP

## 🔍 Performance et optimisations

Le projet intègre plusieurs optimisations pour une expérience utilisateur optimale :

- **Images optimisées** : Compression intelligente et format WebP avec fallback pour les navigateurs anciens
- **Lazy loading** : Chargement différé des images et composants non critiques
- **Code splitting** : Division du code pour ne charger que ce qui est nécessaire
- **Responsive design** : Adaptation à toutes les tailles d'écran avec des optimisations spécifiques
- **SEO optimisé** : Métadonnées appropriées, schema.org et balises OpenGraph
- **Architecture serverless** : Traitement backend sans serveur dédié pour une meilleure scalabilité
- **Préchargement intelligent** : Préchargement des ressources critiques pour une navigation fluide

## 🔒 Sécurité

Le projet met l'accent sur la sécurité à plusieurs niveaux :

- **Paiements sécurisés** : Intégration sécurisée de Stripe et PayPal pour les transactions
- **Protection RGPD** : Conformité complète avec la réglementation européenne sur les données
- **HTTPS obligatoire** : Toutes les communications sont chiffrées
- **Dépendances surveillées** : Contrôle régulier des vulnérabilités dans les dépendances
- **Documentation de sécurité** : Voir le fichier [SECURITY.md](./SECURITY.md) pour les détails sur les vulnérabilités connues et les mesures d'atténuation

## 🔄 Mises à jour récentes

- Migration de Netlify vers Vercel pour améliorer les performances et la fiabilité
- Intégration complète de PayPal avec support du passage en production
- Ajout d'un système de vente d'e-books avec téléchargement sécurisé
- Implémentation d'un système de prise de rendez-vous en ligne
- Amélioration de la gestion des cookies avec TarteAuCitron
- Optimisation mobile de l'expérience de paiement PayPal et Stripe
- Correction de bugs mineurs dans le processus de checkout
- Ajout d'un document SECURITY.md concernant une vulnérabilité de esbuild dans l'environnement de développement

## 📜 Licence

Ce projet est la propriété de JFL et ne peut être utilisé sans autorisation.

## 📞 Contact

Pour toute question concernant ce projet, contactez l'administrateur à [jfl-web@outlook.fr].

## 🔍 SEO et Indexation

Le projet intègre des outils d'optimisation pour les moteurs de recherche :

### Génération automatique du sitemap et robots.txt

Un système automatisé permet de générer et maintenir à jour le sitemap.xml et le fichier robots.txt :

```bash
# Générer/mettre à jour le sitemap.xml et vérifier le robots.txt
./scripts/optimize-seo.sh
```

### Caractéristiques SEO

- **Sitemap XML dynamique** : Généré automatiquement avec toutes les pages et sections importantes
- **Robots.txt optimisé** : Instructions précises pour les robots d'indexation
- **Données structurées** : Implémentation des schémas Schema.org pour une meilleure visibilité
- **Balises méta dynamiques** : Titres et descriptions optimisés pour chaque page
- **SEO local** : Optimisation pour le référencement local en Normandie (Caen, Rouen, Le Havre)
- **URLs propres** : Structure d'URL claire et descriptive
- **Images optimisées** : Balises alt, attributs title et compression pour le chargement rapide

### Soumettre à Google Search Console

Après la mise à jour du sitemap :

1. Accédez à [Google Search Console](https://search.google.com/search-console)
2. Sélectionnez votre propriété `https://www.as-independante.fr/`
3. Dans le menu latéral, cliquez sur "Sitemaps"
4. Entrez `sitemap.xml` et cliquez sur "Envoyer"

---

Dernière mise à jour : 11 mai 2025
