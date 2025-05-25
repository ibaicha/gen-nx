# Étape 1 : Build de développement
FROM node:22-alpine AS builder

# Installation des outils
RUN apk add --no-cache bash git openssl mysql-client

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code
COPY . .

# Génération des fichiers Prisma
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build de l'application
RUN npx nx build api

# Étape 2 : Image de production
FROM node:22-alpine

WORKDIR /app

# Copie depuis l'étape builder (anciennement development)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma  

# Scripts utilitaires
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Fichier d'environnement
COPY apps/api/.env .env

# Installation ts-node (si nécessaire)
RUN npm install -D ts-node typescript

EXPOSE 3000 5555

CMD ["/wait-for-db.sh", "node", "dist/apps/api/main.js"]
