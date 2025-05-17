#!/bin/bash

# Vérifie si Docker tourne
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker ne semble pas démarré. Veuillez lancer Docker Desktop puis réessayer."
  exit 1
fi

echo "🔍 Nettoyage Docker COMPLET pour projet Nx"

PROJECT_NAME=$(basename "$PWD")

# 🔻 1. Stop et supprime TOUS les conteneurs
echo "🛑 Arrêt de TOUS les conteneurs..."
docker ps -q | xargs -r docker stop

echo "🧨 Suppression de TOUS les conteneurs..."
docker ps -aq | xargs -r docker rm -f

# 🔻 2. Supprime TOUTES les images (optionnel : filtre possible)
echo "🖼 Suppression de TOUTES les images Docker..."
docker images -aq | xargs -r docker rmi -f

# 🔻 3. Supprime TOUS les volumes (même utilisés)
echo "📦 Suppression de TOUS les volumes Docker..."
docker volume ls -q | xargs -r docker volume rm -f

# 🔻 4. Supprime tous les networks créés (sauf default, bridge, host)
echo "🌐 Suppression des réseaux utilisateurs..."
docker network ls --filter "type=custom" -q | xargs -r docker network rm

# 🔻 5. Supprime TOUT le cache builder
echo "🛠 Suppression du cache Docker builder complet..."
docker builder prune -af --filter type=exec.cachemount --filter type=source.local

# 🔻 6. Supprime dist/ et node_modules
echo "🧼 Suppression du dossier dist/..."
rm -rf dist

# Décommente si tu veux aussi supprimer node_modules :
# echo "🧼 Suppression de node_modules/..."
# rm -rf node_modules

echo "✅ Nettoyage Docker NX COMPLET terminé pour $PROJECT_NAME."

