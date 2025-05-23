# Étape 1 : Build de développement
FROM node:22-alpine AS development

# Installer les outils nécessaires
RUN apk add --no-cache bash git openssl mysql-client

# Définir le répertoire de travail
WORKDIR /app

# Configurer npm (optionnel : miroir pour la Chine)
RUN npm config set registry https://registry.npmmirror.com/

# 2. Copier package.json et package-lock.json depuis la racine du projet
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

# 3. Installer les dépendances (vérification visuelle)
RUN ls -la && npm install

# Copier le reste du code
COPY . .

# Générer les fichiers Prisma
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build de l'application NestJS via Nx
RUN npx nx build api

# Étape 2 : Image de production
FROM node:22-alpine AS production

# Installer les outils nécessaires
RUN apk add --no-cache bash openssl

# Définir le répertoire de travail
WORKDIR /app

# Définir l'environnement de production
ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}

# Copier les fichiers nécessaires depuis le build de développement
COPY --from=development /app/package.json ./
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist
COPY --from=development /app/apps/api/prisma ./prisma

# Copier le script d'attente de la base de données
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Copier le fichier d'environnement
COPY apps/api/.env .env

# (Optionnel) Installer ts-node si nécessaire à l'exécution
RUN npm install -D ts-node typescript

# Exposer les ports nécessaires
EXPOSE 3000 5555

# Commande par défaut
CMD ["/wait-for-db.sh", "node", "dist/apps/api/main.js"]
