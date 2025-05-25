# Étape 1 : Build de l'application
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copier les fichiers de base
COPY package*.json ./
COPY nx.json workspace.json tsconfig.base.json ./
COPY tsconfig.json ./
COPY libs ./libs
COPY apps/api ./apps/api

# Installer les dépendances
RUN npm install

# Build l'application NestJS (avec ou sans --prod selon config Nx)
RUN npx nx build api

# Étape 2 : Création de l’image finale
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

# Copier uniquement les dépendances nécessaires à l'exécution
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copier le code buildé
COPY --from=builder /usr/src/app/dist/apps/api ./dist

# Exposer le port utilisé par NestJS
EXPOSE 3000

# Lancer l'application
CMD ["node", "dist/main.js"]
