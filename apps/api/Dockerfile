# Étape 1 : Image de base commune
FROM node:22-alpine AS base

# Installer les dépendances système nécessaires
RUN apk add --no-cache \
    bash \
    git \
    openssl \
    mysql-client

# Étape 2 : Builder pour la construction
FROM base AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY nx.json .
COPY apps/api/package.json apps/api/
COPY libs/ libs/

# Configurer le registre npm
RUN npm config set registry https://registry.npmmirror.com/

# Installer toutes les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application
RUN npx nx run api:build

# Étape 3 : Image de développement (générale)
FROM base AS development

WORKDIR /app

# Copier uniquement ce qui est nécessaire depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/api ./dist
COPY --from=builder /app/apps/api/.env .env
COPY --from=builder /app/wait-for-db.sh /wait-for-db.sh

# Permissions
RUN chmod +x /wait-for-db.sh

ENV NODE_ENV=development
EXPOSE 3000 5555

CMD ["node", "dist/main.js"]

# Étape 4 : Image spécifique pour Prisma Studio
FROM base AS prisma-studio

WORKDIR /app

# Copier uniquement ce qui est nécessaire pour Prisma Studio
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/apps/api/.env .