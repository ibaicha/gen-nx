#!/bin/bash

# Script pour automatiser git add, commit, pull et push sur main avec horodatage

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function error_exit {
    echo -e "${RED}[ERREUR] $1${NC}" >&2
    exit 1
}

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    error_exit "Vous n'êtes pas dans un dossier Git!"
fi

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

echo -e "${GREEN}Début de l'automatisation Git...${NC}"

git add . || error_exit "Échec de git add"

# Commit horodaté automatique
timestamp=$(date "+%Y-%m-%d %H:%M:%S")
commit_message="update commit – $timestamp"
git commit -m "$commit_message" || error_exit "Échec du commit"

git pull origin main || error_exit "Échec du pull"
git push origin main || error_exit "Échec du push"

echo -e "${GREEN}Opérations Git terminées avec succès!${NC}"
