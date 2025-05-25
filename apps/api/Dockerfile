# Étape 1 : Build de l'application
FROM node:20-alpine AS development

# Créer le dossier de travail
WORKDIR /app


# Configurer npm (optionnel : miroir pour la Chine)
RUN npm config set registry https://registry.npmmirror.com/
# Copier les fichiers Nx et les dépendances nécessaires


# 3. Copier les fichiers essentiels pour Nx (dans le bon ordre)
COPY package.json package-lock.json ./
COPY nx.json .
COPY tsconfig.base.json .
COPY apps/api/project.json ./apps/api/project.json


COPY eslint.config.js . 



# Copier les sources nécessaires depuis le monorepo
COPY libs ./libs
COPY /apps/api ./apps/api

# Installer les dépendances
RUN npm install

# Build uniquement l'app NestJS ciblée

 

RUN npx nx build api --configuration production

# Étape 2 : Image de production
FROM node:20-alpine AS runner

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier uniquement ce qu'il faut
COPY --from=development /app/package.json ./
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist/apps/api ./dist/apps/api
COPY --from=development /app/dist ./dist




# Utiliser un utilisateur non-root
USER appuser

# Lancer l'application
CMD ["node", "dist/apps/api/main.js"]
