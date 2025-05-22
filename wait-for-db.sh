#!/bin/sh
# Charger les variables d'environnement
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Waiting for database to be ready..."

# Variables d'environnement par défaut si elles ne sont pas définies
DATABASE_HOST=${MYSQL_HOST:-mysql-db}
DATABASE_PORT=${MYSQL_PORT:-3306}

MYSQL_DATABASE=${MYSQL_DATABASE:-nest_db}
DATABASE_PORT=${MYSQL_PORT:-3306}


MAX_TRIES=${MAX_TRIES:-60}

# Fichier de marquage pour indiquer que les migrations et le seed ont été exécutés
MARKER_FILE="/usr/src/app/.migrations/.migrations_applied"
TRIES=0

while ! nc -z "$DATABASE_HOST" "$DATABASE_PORT"; do
  sleep 1
  TRIES=$((TRIES + 1))
  if [ "$TRIES" -ge "$MAX_TRIES" ]; then
    echo "Timeout reached! MySQL is not available after $MAX_TRIES attempts."
    exit 1
  fi
done

echo "Database is up!"

if [ ! -f "$MARKER_FILE" ]; then
  echo "Première exécution : déploiement des migrations et exécution du seed..."

  # Exécuter les migrations
  npx prisma migrate deploy
  if [ $? -ne 0 ]; then
    echo "Échec du déploiement des migrations. Arrêt du script."
    exit 1
  fi



  # Exécuter le seed
  npx ts-node-dev ./prisma/seed.ts
  if [ $? -ne 0 ]; then
    echo "Échec de l'exécution du seed. Arrêt du script."
    exit 1
  fi

  echo "Migrations et seed appliqués avec succès. Création du fichier de marquage."
  mkdir -p "$(dirname "$MARKER_FILE")"
  touch "$MARKER_FILE"
else
  echo "Les migrations et le seed ont déjà été appliqués. Aucun changement nécessaire."
fi

exec "$@"
 