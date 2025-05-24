# Étape 1 : Environnement de développement
FROM node:22-alpine AS development

# Installer les dépendances système nécessaires avec apk (gestionnaire Alpine)
RUN apk add --no-cache \
    bash \
    git \
    openssl \
    mysql-client

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances pour optimiser le cache

COPY package*.json .
COPY apps/api/src/prisma ./apps/api/prisma
# Configurer le registre npm
RUN npm install -g pnpm && npm config set registry https://registry.npmmirror.com/

# Installer les dépendances Node.js
RUN pnpm install
RUN npx prisma generate --schema=apps/api/src/prisma/schema.prisma

# Copier tout le code source
COPY . .

# Copier les fichiers Prisma et le script seed.ts
COPY apps/api/src/prisma/seed.ts apps/api/prisma/seed.ts

# Générer les fichiers Prisma
# RUN npx prisma generate

# Définir une variable d'environnement par défaut
ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

# Construire l'application avec Nx
RUN pnpm nx build api

# Étape 2 : Environnement de production
FROM node:22-alpine AS production

# Installer les dépendances nécessaires avec apk
RUN apk add --no-cache bash openssl

# Définir une variable d'environnement
ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de développement
COPY --from=development /app/package.json ./
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist
COPY --from=development /app/apps/api/prisma ./prisma

# Configurer le registre npm
RUN npm config set registry https://registry.npmmirror.com/

# Générer à nouveau les fichiers Prisma (par sécurité)
RUN npx prisma generate


# Copier et rendre le script `wait-for-db.sh` exécutable
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Copier le fichier `.env`
COPY apps/api/.env .env

# Installer ts-node & typescript uniquement si nécessaire
RUN npm install -D ts-node typescript

# Exposer les ports nécessaires
EXPOSE 3000 5555

# Commande par défaut pour démarrer l'application
CMD ["/wait-for-db.sh", "node", "dist/apps/api/main.js"]
