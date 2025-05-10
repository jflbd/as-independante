#!/bin/bash
# security-check.sh - Script de vérification de sécurité pour les dépendances

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo ""
echo "====================================="
echo -e "${YELLOW}Vérification de sécurité du projet${NC}"
echo "====================================="

# Vérifier la version actuelle d'esbuild dans le projet
echo -e "\n${YELLOW}Versions d'esbuild installées :${NC}"
npm list esbuild

# Vérifier si des vulnérabilités sont présentes
echo -e "\n${YELLOW}Audit des dépendances npm :${NC}"
npm audit

# Vérifier les dépendances obsolètes
echo -e "\n${YELLOW}Vérification des dépendances obsolètes :${NC}"
DEPRECATED_DEPS=$(npm list --all --json | grep -B 1 '"deprecated":' | grep '"name":' | cut -d'"' -f4)

if [[ -n "$DEPRECATED_DEPS" ]]; then
  echo -e "${YELLOW}Dépendances obsolètes détectées :${NC}"
  echo "$DEPRECATED_DEPS" | while read -r dep; do
    if [[ -n "$dep" ]]; then
      echo -e "- ${YELLOW}$dep${NC}"
    fi
  done
  echo -e "${YELLOW}Ces dépendances obsolètes pourraient présenter des problèmes de sécurité ou de compatibilité à l'avenir.${NC}"
else
  echo -e "${GREEN}✅ Aucune dépendance obsolète détectée via npm list.${NC}"
fi

# Vérifier spécifiquement les dépendances connues comme obsolètes
echo -e "\n${YELLOW}Vérification des dépendances spécifiques connues comme obsolètes :${NC}"
KNOWN_DEPRECATED=(
  "glob@7.2.3"
  "inflight@1.0.6"
  "uuid@3.3.2"
)

FOUND_DEPRECATED=false
for dep in "${KNOWN_DEPRECATED[@]}"; do
  dep_name=$(echo "$dep" | cut -d'@' -f1)
  dep_version=$(echo "$dep" | cut -d'@' -f2)
  
  if npm list "$dep_name" 2>/dev/null | grep -q "$dep_version"; then
    echo -e "- ${YELLOW}$dep${NC} : Présent dans le projet"
    FOUND_DEPRECATED=true
  fi
done

if [[ "$FOUND_DEPRECATED" = false ]]; then
  echo -e "${GREEN}✅ Aucune des dépendances connues comme obsolètes n'a été trouvée.${NC}"
else
  echo -e "${YELLOW}⚠️ Note: Ces dépendances obsolètes sont généralement des sous-dépendances.${NC}"
  echo -e "${YELLOW}Elles ne peuvent pas toujours être mises à jour directement et peuvent nécessiter la mise à jour des packages parents.${NC}"
fi

# Vérifier spécifiquement la vulnérabilité esbuild
echo -e "\n${YELLOW}Vérification de la vulnérabilité GHSA-67mh-4wv8-2f99 (esbuild) :${NC}"
ESBUILD_VERSION=$(npm list esbuild | grep esbuild@ | head -1 | sed 's/.*esbuild@//')
VITE_ESBUILD_VERSION=$(npm list --depth=2 | grep -A 2 vite@ | grep esbuild@ | sed 's/.*esbuild@//')

echo "Version principale d'esbuild : $ESBUILD_VERSION"
echo "Version d'esbuild dans Vite : $VITE_ESBUILD_VERSION"

if [[ -z "$VITE_ESBUILD_VERSION" ]]; then
  echo -e "${YELLOW}Impossible de déterminer la version d'esbuild utilisée par Vite${NC}"
else
  # Selon l'avis de sécurité, les versions ≤0.24.2 sont vulnérables
  # Version major.minor.patch
  MAJOR=$(echo "$VITE_ESBUILD_VERSION" | cut -d'.' -f1)
  MINOR=$(echo "$VITE_ESBUILD_VERSION" | cut -d'.' -f2)
  PATCH=$(echo "$VITE_ESBUILD_VERSION" | cut -d'.' -f3)

  if [ "$MAJOR" -eq 0 ] && ([ "$MINOR" -lt 24 ] || ([ "$MINOR" -eq 24 ] && [ "$PATCH" -le 2 ])); then
    echo -e "${RED}⚠️ VULNÉRABLE : La version d'esbuild utilisée par Vite ($VITE_ESBUILD_VERSION) est affectée par GHSA-67mh-4wv8-2f99${NC}"
    echo -e "${YELLOW}Cette vulnérabilité n'affecte que le serveur de développement, pas la production.${NC}"
    echo -e "Pour plus d'informations, consultez le fichier SECURITY.md"
  else
    echo -e "${GREEN}✅ La version d'esbuild utilisée par Vite n'est pas vulnérable.${NC}"
  fi
fi

if [[ $(echo "$ESBUILD_VERSION" | cut -d'.' -f1) -lt 1 ]] && \
   [[ $(echo "$ESBUILD_VERSION" | cut -d'.' -f2) -le 24 ]] && \
   [[ $(echo "$ESBUILD_VERSION" | cut -d'.' -f3) -le 2 ]]; then
  echo -e "${RED}⚠️ VULNÉRABLE : La version principale d'esbuild est affectée par GHSA-67mh-4wv8-2f99${NC}"
else
  echo -e "${GREEN}✅ La version principale d'esbuild n'est pas vulnérable.${NC}"
fi

# Vérifier les versions des outils de développement
echo -e "\n${YELLOW}Vérification des outils de développement :${NC}"

# Vérifier la version de Vercel CLI
echo -e "\n${YELLOW}Vérification de la version de Vercel CLI :${NC}"
if command -v vercel &> /dev/null; then
  VERCEL_VERSION=$(vercel --version 2>&1 | head -n 1)
  echo "Version installée : $VERCEL_VERSION"
  
  # Vérifier la dernière version disponible (nécessite une connexion internet)
  echo -e "${YELLOW}Vérification des mises à jour disponibles pour Vercel CLI :${NC}"
  LATEST_VERCEL=$(npm show vercel version 2>/dev/null)
  # Extraire seulement la version numérique de Vercel CLI (supprime le texte "Vercel CLI ")
  VERCEL_VERSION_CLEAN=$(echo "$VERCEL_VERSION" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -n 1)
  
  if [[ -n "$LATEST_VERCEL" && "$LATEST_VERCEL" != "$VERCEL_VERSION_CLEAN" ]]; then
    echo -e "${YELLOW}Une mise à jour est disponible : $LATEST_VERCEL (version actuelle : $VERCEL_VERSION_CLEAN)${NC}"
    echo -e "Pour mettre à jour, exécutez : ${GREEN}npm install -g vercel@latest${NC}"
  else
    echo -e "${GREEN}✅ Vercel CLI est à jour ($VERCEL_VERSION_CLEAN).${NC}"
  fi
else
  echo -e "${YELLOW}Vercel CLI n'est pas installé ou n'est pas dans le PATH.${NC}"
fi

# Vérifier la version de pnpm
echo -e "\n${YELLOW}Vérification de la version de pnpm :${NC}"
if command -v pnpm &> /dev/null; then
  PNPM_VERSION=$(pnpm --version 2>&1)
  echo "Version installée : $PNPM_VERSION"
  
  # Vérifier s'il y a une mise à jour disponible
  echo -e "${YELLOW}Vérification des mises à jour disponibles pour pnpm :${NC}"
  LATEST_PNPM=$(npm show pnpm version 2>/dev/null)
  
  if [[ -n "$LATEST_PNPM" && "$LATEST_PNPM" != "$PNPM_VERSION" ]]; then
    echo -e "${YELLOW}Une mise à jour est disponible : $LATEST_PNPM${NC}"
    echo -e "Pour mettre à jour, exécutez : ${GREEN}npm install -g pnpm@latest${NC} ou ${GREEN}pnpm self-update${NC}"
  else
    echo -e "${GREEN}✅ pnpm est à jour.${NC}"
  fi
else
  echo -e "${YELLOW}pnpm n'est pas installé ou n'est pas dans le PATH.${NC}"
fi

echo -e "\n${YELLOW}Recommandations :${NC}"
echo "1. Exécutez 'npm run security-check' régulièrement pour surveiller cette vulnérabilité"
echo "2. Suivez les recommandations du fichier SECURITY.md"
echo "3. Planifiez une migration vers Vite 6.x lorsque cela sera possible" 
echo "4. Mettez à jour régulièrement Vercel CLI et les autres outils de développement"

echo -e "\n${YELLOW}Environnements concernés :${NC}"
echo "✅ Production : Non affecté (la vulnérabilité n'affecte que le serveur de développement)"
echo "⚠️ Développement : Vulnérable si vous visitez des sites web malveillants pendant le développement"

echo ""
echo "====================================="
echo -e "${YELLOW}Fin de la vérification de sécurité${NC}"
echo "====================================="
echo ""
