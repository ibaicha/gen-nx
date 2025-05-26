# Étape 1 : Build de l'application
FROM node:22-alpine AS base
 
# development stage
FROM base AS development 


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

RUN ls -la /app && \
    echo "=== Taille des éléments ===" && \
    du -sh /app/* && \
    echo "=== Arborescence (max 3 niveaux) ===" && \
    (command -v tree >/dev/null && tree -ahpugCD -L 3 /app || ls -laR /app | head -n 30)
# Copier les fichiers Prisma nécessaires pour la génération
# COPY apps/api/prisma ./prisma
# # COPY apps/api/src/prisma/seed.ts ./prisma

# Configurer le registre npm
RUN npm config set registry https://registry.npmmirror.com/

# Installer les dépendances Node.js
RUN npm install

# Générer les fichiers Prisma
# # RUN npx prisma generate

# Copier tout le code source
COPY . .

# Définir une variable d'environnement par défaut
ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

# Construire l'application avec Nx
RUN npx nx run api:build

FROM base AS production 

# Installer les dépendances nécessaires avec apk
RUN apk add --no-cache bash openssl

# Définir une variable d'environnement
ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de développement
COPY --from=development /app/package.json ./
COPY --from=development /app/package-lock.json ./
COPY --from=development /app/dist/apps/api ./dist
# # COPY --from=development /app/prisma ./prisma

# Configurer le registre npm
RUN npm config set registry https://registry.npmmirror.com/

# Installer uniquement les dépendances de production
RUN npm install --production

# Générer à nouveau les fichiers Prisma
# # RUN npx prisma generate

# Copier et rendre le script `wait-for-db.sh` exécutable
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Copier le fichier `.env` et lui attribuer les droits d'exécution
COPY apps/api/.env /.env
RUN chmod +x /.env

# Installer des dépendances de développement pour Typescript (si nécessaire à l'exécution)
RUN npm install -D ts-node typescript

# Exposer les ports nécessaires
EXPOSE 3000 5555

# Commande par défaut pour démarrer l'application
CMD ["/wait-for-db.sh", "node", "dist/main.js"]