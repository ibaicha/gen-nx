# Étape 1 : Build de l'application
FROM node:22-alpine AS base
 
# development stage
FROM base AS development 


WORKDIR /usr/src/app

# 1. Copier les fichiers de verrouillage npm
# COPY package.json package-lock.json ./

# 2. Copier les dépendances spécifiques à l'API
# COPY apps/api/project.json ./apps/api/

# 3. Installation propre des dépendances
RUN npm ci 

# 4. Copier tout le code source
COPY . .

# 5. development  l'API
# RUN npm run build --workspace=apps/api
RUN npx nx build api --configuration production

# Étape 2 : Image finale
FROM base AS production
WORKDIR /usr/src/app

# 1. Copier uniquement le nécessaire
COPY --from=development  /usr/src/app/dist/apps/api ./dist

# COPY --from=development  /usr/src/app/node_modules ./node_modules
# COPY --from=development  /usr/src/app/apps/api/package.json .

# 2. Démarrer l'application
CMD ["node", "dist/main.js"]