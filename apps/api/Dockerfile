# Étape 1 : Image de base
FROM node:22-alpine AS base
WORKDIR /app

# Étape 2 : Phase de développement
FROM base AS development

# Installer les dépendances système
RUN apk add --no-cache \
    bash \
    git \
    openssl \
    mysql-client && \
    echo "=== Dépendances système installées ===" && \
    apk info

# Configuration NPM
RUN npm config set registry https://registry.npmmirror.com/

# Copie et vérification des dépendances
COPY package*.json ./
RUN echo "=== Fichiers avant installation ===" && \
    ls -la && \
    npm install && \
    echo "=== Structure après installation ===" && \
    find node_modules -maxdepth 2 -type d -print | sort && \
    echo "=== Taille des dépendances ===" && \
    du -sh node_modules

# Copie du code source avec vérification
COPY . .
RUN echo "=== Structure complète avant build ===" && \
    find apps/api/src -type f -print | sort && \
    echo "=== Fichiers Prisma ===" && \
    ls -la apps/api/prisma

# Build de l'application
ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}
RUN npx nx run api:build && \
    echo "=== Fichiers générés ===" && \
    ls -la dist/apps/api

# Étape 3 : Phase de production
FROM base AS production

# Dépendances système minimales
RUN apk add --no-cache bash openssl && \
    echo "=== Dépôts Alpine ===" && \
    cat /etc/apk/repositories

# Configuration de l'environnement
ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}
WORKDIR /app

# Copie des artefacts depuis le stage development
COPY --from=development /app/package*.json ./
COPY --from=development /app/dist/apps/api ./dist
RUN echo "=== Fichiers copiés en production ===" && \
    ls -laR /app

# Installation production
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install --production && \
    echo "=== Dépendances production ===" && \
    npm list --depth=0

# Configuration des scripts
COPY wait-for-db.sh /wait-for-db.sh
COPY apps/api/.env.production /.env
RUN chmod +x /wait-for-db.sh && \
    echo "=== Permissions ===" && \
    ls -la /wait-for-db.sh /.env

# Vérification finale
RUN echo "=== Structure finale ===" && \
    find /app -type d -name "node_modules" -prune -o -print | sort && \
    echo "=== Variables d'environnement ===" && \
    printenv | sort

EXPOSE 3000 5555
CMD ["/wait-for-db.sh", "node", "dist/main.js"]