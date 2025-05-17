#!/bin/bash

# Vérifie si Docker tourne
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker ne semble pas démarré. Veuillez lancer Docker Desktop puis réessayer."
  exit 1
fi

echo "🔄 Redémarrage des services Docker avec docker-compose..."
ENV_FILE="./apps/api/.env"

# Vérifie si le fichier .env existe
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Fichier .env introuvable à l'emplacement : $ENV_FILE"
  exit 1
fi

# Arrêter les conteneurs
echo "🛑 Arrêt des conteneurs..."
docker compose --env-file "$ENV_FILE" down

# Lancer les conteneurs en arrière-plan
echo "🚀 Démarrage des conteneurs..."
docker compose --env-file "$ENV_FILE" up -d

echo "✅ Services Docker redémarrés avec succès."
