# Instructions Husky

Ce dossier contient les hooks Git configurés avec Husky pour le projet.

## Format des hooks

À partir de la version 10.0.0 de Husky, le format des hooks a changé. Les lignes suivantes sont désormais obsolètes et ne doivent plus être utilisées :

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
```

Nous utilisons maintenant un format plus simple :

```bash
#!/usr/bin/env bash
# Le hook commence directement ici sans charger de fichier externe
```

## Hooks disponibles

- **pre-commit** : Exécute la vérification de sécurité et le linting avant chaque commit
- Autres hooks peuvent être ajoutés au besoin

## Configuration

Pour ajouter un nouveau hook, utilisez la commande :

```bash
npx husky add .husky/nom-du-hook "commande-à-exécuter"
```

## Notes importantes

- Tous les hooks doivent être rendus exécutables avec `chmod +x .husky/nom-du-hook`
- En cas d'erreurs dans les hooks, il est possible de les contourner avec `git commit --no-verify`
