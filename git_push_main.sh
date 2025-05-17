#!/bin/bash

# Script pour automatiser git add, commit, pull et push sur main

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher un message d'erreur et quitter
function error_exit {
    echo -e "${RED}[ERREUR] $1${NC}" >&2
    exit 1
}

# Vérifie qu'on est dans un dépôt Git
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    error_exit "Vous n'êtes pas dans un dossier Git!"
fi

# Vérifie la branche actuelle
current_branch=$(git symbolic-ref --short HEAD)
if [ "$current_branch" != "main" ]; then
    echo -e "${YELLOW}Attention: Vous n'êtes pas sur la branche main (vous êtes sur $current_branch).${NC}"
    read -p "Voulez-vous basculer sur main? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout main || error_exit "Échec du changement de branche"
    else
        error_exit "Opération annulée"
    fi
fi

# Exécute les commandes Git
echo -e "${GREEN}Début de l'automatisation Git...${NC}"

git add . || error_exit "Échec de git add"
git commit -m "update commit" || error_exit "Échec du commit"
git pull origin main || error_exit "Échec du pull"
git push origin main || error_exit "Échec du push"

echo -e "${GREEN}Opérations Git terminées avec succès!${NC}"#!/bin/bash

# Script pour automatiser git add, commit, pull et push sur main

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher un message d'erreur et quitter
function error_exit {
    echo -e "${RED}[ERREUR] $1${NC}" >&2
    exit 1
}

# Vérifie qu'on est dans un dépôt Git
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    error_exit "Vous n'êtes pas dans un dossier Git!"
fi

# Vérifie la branche actuelle
current_branch=$(git symbolic-ref --short HEAD)
if [ "$current_branch" != "main" ]; then
    echo -e "${YELLOW}Attention: Vous n'êtes pas sur la branche main (vous êtes sur $current_branch).${NC}"
    read -p "Voulez-vous basculer sur main? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout main || error_exit "Échec du changement de branche"
    else
        error_exit "Opération annulée"
    fi
fi

# Exécute les commandes Git
echo -e "${GREEN}Début de l'automatisation Git...${NC}"

# Ajoute tous les fichiers modifiés
git add . || error_exit "Échec de git add"

# Demande le message de commit
read -p "Entrez le message de commit : " commit_message

# Effectue le commit
git commit -m "$commit_message" || error_exit "Échec du commit"

# Récupère les dernières modifications
git pull origin main || error_exit "Échec du pull"

# Envoie les modifications
git push origin main || error_exit "Échec du push"

echo -e "${GREEN}Opérations Git terminées avec succès!${NC}"