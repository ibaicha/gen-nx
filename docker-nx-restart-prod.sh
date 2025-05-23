#!/bin/bash

# Nom du fichier docker-compose et .env à utiliser pour la prod
COMPOSE_FILE="docker-compose.prod.yml"
ENV_FILE="./apps/api/.env.production"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifie si Docker est en cours d'exécution
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}❌ Docker ne semble pas démarré. Veuillez lancer Docker Desktop puis réessayer.${NC}"
  exit 1
fi

# Vérifie l'existence du fichier docker-compose
if [ ! -f "$COMPOSE_FILE" ]; then
  echo -e "${RED}❌ Fichier $COMPOSE_FILE introuvable.${NC}"
  exit 1
fi

# Vérifie l'existence du fichier .env.production
if [ ! -f "$ENV_FILE" ]; then
  echo -e "${RED}❌ Fichier .env introuvable à l'emplacement : $ENV_FILE${NC}"
  exit 1
fi

echo -e "${GREEN}🔄 Redémarrage des services Docker (production)...${NC}"

# Arrêt des conteneurs
echo -e "${GREEN}🛑 Arrêt des conteneurs...${NC}"
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" down

# Démarrage des conteneurs
echo -e "${GREEN}🚀 Démarrage des conteneurs en mode détaché...${NC}"
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d

echo -e "${GREEN}✅ Services Docker (production) redémarrés avec succès.${NC}"
