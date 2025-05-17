#!/bin/bash

# === Couleurs ===
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RESET='\033[0m'

# === 0. Identification du projet Nx ===
PROJECT_NAME=$(basename "$PWD")
echo -e "${YELLOW}📁 Projet Nx détecté : ${PROJECT_NAME}${RESET}"

# === 1. Vérifie si Docker est lancé ===
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}❌ Docker ne semble pas démarré. Veuillez lancer Docker Desktop puis réessayer.${RESET}"
  exit 1
fi

# === 2. Charger les variables d'environnement depuis .env ===
ENV_FILE="./apps/api/.env"
if [ -f "$ENV_FILE" ]; then
  echo -e "${YELLOW}📄 Chargement des variables depuis ${ENV_FILE}${RESET}"
  set -o allexport
  source "$ENV_FILE"
  set +o allexport
else
  echo -e "${YELLOW}⚠️  Fichier .env non trouvé, utilisation des valeurs par défaut${RESET}"
fi

# === 3. Définir les variables avec valeurs par défaut si non définies ===
MYSQL_HOST="${MYSQL_HOST:-mysql-db}"
MYSQL_PORT="${MYSQL_PORT:-3306}"
MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-root}"
MYSQL_DATABASE="${MYSQL_DATABASE:-nest_db}"
MYSQL_USER="${MYSQL_USER:-nestjs_user}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-password}"
TZ="${TZ:-Europe/Paris}"

DATABASE_URL="${DATABASE_URL:-mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}}"

# === 4. Vérifie que le nom du conteneur est fourni ===
if [ -z "$1" ]; then
  echo -e "${YELLOW}⚠️  Usage: $0 <nom-du-conteneur>${RESET}"
  echo -e "${YELLOW}Exemple: $0 angular-app${RESET}"
  exit 1
fi

CONTAINER_NAME="$1"

# === 5. Vérifie si le conteneur est défini dans docker-compose ===
AVAILABLE_CONTAINERS=$(docker compose config --services)

if ! echo "$AVAILABLE_CONTAINERS" | grep -q "^${CONTAINER_NAME}$"; then
  echo -e "${RED}❌ Aucun conteneur nommé '${CONTAINER_NAME}' trouvé dans docker-compose.${RESET}"
  echo -e "${YELLOW}📦 Conteneurs disponibles :${RESET}"
  echo "$AVAILABLE_CONTAINERS" | sed "s/^/  - /"
  exit 1
fi

# === 6. Affiche les variables utilisées (debug) ===
echo -e "${YELLOW}🔧 Configuration utilisée :${RESET}"
echo -e "${GREEN}MYSQL_HOST=${MYSQL_HOST}${RESET}"
echo -e "${GREEN}MYSQL_PORT=${MYSQL_PORT}${RESET}"
echo -e "${GREEN}MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}${RESET}"
echo -e "${GREEN}MYSQL_DATABASE=${MYSQL_DATABASE}${RESET}"
echo -e "${GREEN}MYSQL_USER=${MYSQL_USER}${RESET}"
echo -e "${GREEN}MYSQL_PASSWORD=${MYSQL_PASSWORD}${RESET}"
echo -e "${GREEN}TZ=${TZ}${RESET}"
echo -e "${GREEN}DATABASE_URL=${DATABASE_URL}${RESET}"

# === 7. Redémarre le conteneur ===
echo -e "${YELLOW}🔄 Redémarrage du conteneur '${CONTAINER_NAME}'...${RESET}"
docker compose stop "${CONTAINER_NAME}" && docker compose up -d --build "${CONTAINER_NAME}"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Conteneur '${CONTAINER_NAME}' redémarré avec succès.${RESET}"
else
  echo -e "${RED}❌ Échec du redémarrage du conteneur '${CONTAINER_NAME}'.${RESET}"
  exit 1
fi
