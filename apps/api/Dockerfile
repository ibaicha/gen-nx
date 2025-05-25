# Étape 1: Builder - Installation des dépendances et compilation
FROM node:20-alpine AS builder

# Installer les dépendances système nécessaires
RUN apk add --no-cache git openssl python3 make g++

# Configurer le répertoire de travail
WORKDIR /app

# 1. Copier les fichiers de configuration du monorepo
COPY package.json package-lock.json wait-for-db.sh ./
COPY nx.json .
COPY tsconfig.base.json .


# 2. Copier les fichiers spécifiques à l'application
COPY apps/api/ apps/api/
COPY libs/ libs/

# 3. Installer les dépendances et build
RUN npm ci
RUN npx nx build api --prod --skip-nx-cache

# Étape 2: Runner - Image finale de production
FROM node:20-alpine

# Créer un utilisateur non-root pour plus de sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Configurer NODE_ENV
ENV NODE_ENV=production

# Copier depuis le builder
COPY --from=builder --chown=appuser:appgroup /app/dist/apps/api ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules

# Copier les fichiers nécessaires au runtime
COPY --chown=appuser:appgroup apps/api/prisma ./prisma
COPY --chown=appuser:appgroup apps/api/.env .env

# Installer Prisma et autres dépendances de production
RUN npm install -g prisma

# Changer les permissions
RUN chown -R appuser:appgroup /app

# Passer à l'utilisateur non-root
USER appuser

EXPOSE 3000 5555

CMD ["/wait-for-db.sh", "node", "dist/apps/api/main.js"]
