# Avis de sécurité - Problèmes de sécurité identifiés

## 1. Vulnérabilité esbuild (Principale)

### Description de la vulnérabilité

Une vulnérabilité de sécurité moyenne (GHSA-67mh-4wv8-2f99) a été identifiée dans esbuild 0.24.2 et versions antérieures, utilisé comme dépendance de Vite dans notre projet. Cette vulnérabilité permet à n'importe quel site web d'envoyer des requêtes au serveur de développement et de lire les réponses en raison des paramètres CORS par défaut.

## 2. Dépendances obsolètes

Lors des mises à jour des outils de développement, les dépendances obsolètes suivantes ont été identifiées :

- glob@7.2.3
- inflight@1.0.6
- uuid@3.3.2

Ces dépendances sont des sous-dépendances de packages principaux et ne présentent pas de risque de sécurité immédiat, mais devraient être mises à jour lorsque possible via la mise à jour des packages parents.

## Impact

Cette vulnérabilité n'affecte que l'environnement de développement et n'a aucun impact sur la version de production déployée sur Vercel.

## Solutions

### Solution adoptée : Risque accepté temporairement

Étant donné que :

1. La vulnérabilité n'affecte que l'environnement de développement local
2. La mise à niveau vers Vite 6.x comporte des changements majeurs pouvant nécessiter une refonte importante
3. Nous avons déjà esbuild@0.25.3 (version corrigée) en dépendance directe

Nous avons décidé d'accepter temporairement ce risque pour l'environnement de développement, avec les mesures d'atténuation suivantes.

### Mesures d'atténuation

1. **Développement local uniquement** : Ne jamais exposer le serveur de développement au-delà de localhost
2. **Sécurité du navigateur** : Éviter d'avoir des onglets ouverts sur des sites web non fiables pendant le développement
3. **Vigilance** : Être attentif à tout comportement suspect pendant le développement
4. **Surveillance régulière** : Exécuter régulièrement le script de vérification de sécurité (voir ci-dessous)

### Script de vérification de sécurité

Nous avons mis en place un script de vérification de sécurité qui permet de surveiller cette vulnérabilité ainsi que d'autres problèmes de sécurité potentiels dans le projet. Pour l'exécuter :

```bash
npm run security-check
```

Ce script vérifie :

- La présence de la vulnérabilité esbuild GHSA-67mh-4wv8-2f99
- Les dépendances obsolètes qui pourraient présenter des risques de sécurité
- Les mises à jour disponibles pour les outils de développement comme Vercel CLI et pnpm

### Plan à long terme

Planifier une migration vers Vite 6.x lors d'une future mise à jour majeure du projet, lorsque du temps pourra être alloué pour traiter les changements incompatibles potentiels.

## Mise à jour des outils de développement

Pour maintenir un environnement de développement sécurisé, il est recommandé de garder à jour les outils suivants :

### Vercel CLI

Pour mettre à jour Vercel CLI vers la dernière version :

```bash
pnpm i -g vercel@latest
```

### pnpm

Pour mettre à jour pnpm vers la dernière version :

```bash
pnpm self-update
```

## Références

- [Détails de la vulnérabilité GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)
- [Documentation de migration Vite 5 à Vite 6](https://vitejs.dev/guide/migration)
- [GitHub Security Advisories](https://github.com/advisories)

## Historique des révisions

- **10 mai 2025** : Mise à jour du document avec l'ajout du script de vérification de sécurité, des informations sur les dépendances obsolètes et des instructions pour la mise à jour des outils de développement.
