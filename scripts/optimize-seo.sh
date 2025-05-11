#!/bin/bash

# Script pour générer et vérifier les fichiers SEO (sitemap.xml et robots.txt)
# Auteur: GitHub Copilot
# Date: 11-05-2025

# Codes couleur pour la sortie
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Outil d'optimisation SEO pour AS-Independante.fr ===${NC}"
echo -e "${BLUE}=================================================${NC}"
echo ""

# Vérifier si nous sommes à la racine du projet
if [ ! -f "package.json" ]; then
    echo -e "${RED}Erreur: Ce script doit être exécuté depuis la racine du projet AS-Independante${NC}"
    exit 1
fi

# 1. Générer le sitemap.xml
echo -e "${YELLOW}1. Génération du sitemap.xml...${NC}"
node scripts/generate-sitemap.js

if [ $? -ne 0 ]; then
    echo -e "${RED}⛔️ Erreur lors de la génération du sitemap.xml${NC}"
    exit 1
fi

# 2. Vérifier le robots.txt
echo ""
echo -e "${YELLOW}2. Vérification du fichier robots.txt...${NC}"

if [ -f "public/robots.txt" ]; then
    echo -e "${GREEN}✓ Le fichier robots.txt existe${NC}"
    
    # Vérifier si le robots.txt contient un lien vers le sitemap
    if grep -q "Sitemap:" "public/robots.txt"; then
        echo -e "${GREEN}✓ Le fichier robots.txt contient bien une référence au sitemap${NC}"
    else
        echo -e "${RED}⚠️ Le fichier robots.txt ne contient pas de référence au sitemap.${NC}"
        echo -e "${YELLOW}Ajout de la référence au sitemap...${NC}"
        echo "" >> public/robots.txt
        echo "# Lien vers le sitemap pour une meilleure indexation" >> public/robots.txt
        echo "Sitemap: https://www.as-independante.fr/sitemap.xml" >> public/robots.txt
        echo -e "${GREEN}✓ Référence au sitemap ajoutée${NC}"
    fi
else
    echo -e "${RED}⚠️ Le fichier robots.txt n'existe pas.${NC}"
    echo -e "${YELLOW}Création d'un fichier robots.txt de base...${NC}"
    
    # Créer un fichier robots.txt de base
    cat > public/robots.txt << EOF
# Robots.txt optimisé pour Google Search Console - www.as-independante.fr
# Last updated: $(date +"%d-%m-%Y")

# Instructions pour tous les robots
User-agent: *
Allow: /

# Instructions spécifiques pour Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Interdictions globales - Répertoires et fichiers techniques
Disallow: /api/
Disallow: /scripts/
Disallow: /src/
Disallow: /*?*
Disallow: /checkout
Disallow: /paiement-*
Disallow: /telechargement/*

# Autorisation explicite des sections importantes
Allow: /sitemap
Allow: /ebook
Allow: /blog/
Allow: /mentions-legales

# Liens vers les sitemaps
Sitemap: https://www.as-independante.fr/sitemap.xml
EOF
    
    echo -e "${GREEN}✓ Fichier robots.txt créé avec succès${NC}"
fi

# 3. Vérification des URL dans le sitemap
echo ""
echo -e "${YELLOW}3. Vérification des URL dans le sitemap.xml...${NC}"

URL_COUNT=$(grep -o "<loc>" public/sitemap.xml | wc -l)
echo -e "${GREEN}✓ ${URL_COUNT} URL trouvées dans le sitemap${NC}"

# 4. Résumé
echo ""
echo -e "${BLUE}=== Résumé de l'optimisation SEO ===${NC}"
echo -e "${GREEN}✓ Sitemap.xml généré avec succès${NC}"
echo -e "${GREEN}✓ Robots.txt vérifié/créé avec succès${NC}"
echo -e "${GREEN}✓ ${URL_COUNT} URL référencées dans le sitemap${NC}"
echo ""
echo -e "${YELLOW}Pour soumettre votre sitemap à Google Search Console:${NC}"
echo "1. Connectez-vous à https://search.google.com/search-console"
echo "2. Sélectionnez votre propriété 'https://www.as-independante.fr/'"
echo "3. Dans le menu, cliquez sur 'Sitemaps'"
echo "4. Entrez 'sitemap.xml' et cliquez sur 'Envoyer'"
echo ""
echo -e "${BLUE}Optimisation SEO terminée avec succès !${NC}"
