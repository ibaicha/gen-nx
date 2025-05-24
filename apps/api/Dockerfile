# Étape 1 : Environnement de développement
FROM node:22-alpine AS development

# Installer les outils nécessaires
RUN apk add --no-cache \
    bash \
    git \
    openssl \
    mysql-client

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de config pour les dépendances
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Configurer le registre et installer pnpm
RUN npm install -g pnpm && npm config set registry https://registry.npmmirror.com/

# Installer les dépendances
RUN pnpm install

# Copier le reste du code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Compiler l'application
RUN pnpm nx build api

# Étape 2 : Environnement de production
FROM node:22-alpine AS production

# Installer les outils nécessaires
RUN apk add --no-cache bash openssl

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis le build
COPY --from=development /app/package.json ./
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist
COPY --from=development /app/apps/api/prisma ./prisma

# Copier le fichier .env spécifique à l’API
COPY apps/api/.env .env

# Copier le script wait-for-db
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# (Optionnel) Regénérer Prisma (utile si build > prod prend du temps ou fichier .env change)
RUN npx prisma generate --schema=prisma/schema.prisma

# Exposer les ports
EXPOSE 3000 5555

# Commande de démarrage
CMD ["/wait-for-db.sh", "node", "dist/apps/api/main.js"]
