# Étape 1 : Build de l'application
FROM node:22-alpine AS base

# Installer les dépendances système nécessaires avec apk (gestionnaire Alpine)
RUN apk add --no-cache \
    bash \
    git \
    openssl \
    mysql-client \
    tree  # <--- Ajout de tree pour lister les fichiers

# Development stage
FROM base AS development 

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances pour optimiser le cache
COPY package*.json ./

# 📂 Afficher la structure du dossier après la copie des packages
RUN echo "### Après COPY package*.json ###" && tree -a /app

# Configurer le registre npm
RUN npm config set registry https://registry.npmmirror.com/

# Installer les dépendances Node.js
RUN npm install

# 📂 Afficher la structure après installation des dépendances
RUN echo "### Après npm install ###" && tree -a /app

# Copier tout le code source
COPY . .

# 📂 Afficher la structure après copie du code source
RUN echo "### Après COPY . . ###" && tree -a /app

# Définir une variable d'environnement par défaut
ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

# Construire l'application avec Nx
RUN npx nx run api:build

# 📂 Afficher la structure après build Nx
RUN echo "### Après build Nx ###" && tree -a /app

# Étape 2 : Production image
FROM base AS production 

# Installer les dépendances nécessaires avec apk
RUN apk add --no-cache bash openssl tree

# Définir une variable d'environnement
ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de développement
COPY --from=development /app/package.json ./
COPY --from=development /app/package-lock.json ./
COPY --from=development /app/dist/apps/api ./dist

COPY --from=development /app/dist/apps/api ./dist/api
COPY --from=development /app/dist/apps/libs ./dist/libs


# 📂 Afficher la structure après copie depuis le build
RUN echo "### Après COPY depuis l'étape de développement ###" && tree -a /app

# Configurer le registre npm
RUN npm config set registry https://registry.npmmirror.com/

# Installer uniquement les dépendances de production
RUN npm install --production

# Copier et rendre le script `wait-for-db.sh` exécutable
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Copier le fichier `.env` et lui attribuer les droits d'exécution
COPY apps/api/.env /.env
RUN chmod +x /.env

# Installer des dépendances de développement pour Typescript (si nécessaire à l'exécution)
RUN npm install -D ts-node typescript

# 📂 Afficher la structure finale du conteneur production
RUN echo "### Structure finale de l'image production ###" && tree -a /

# Exposer les ports nécessaires
EXPOSE 3000 5555

# Commande par défaut pour démarrer l'application
CMD ["/wait-for-db.sh", "node", "dist/main.js"]
