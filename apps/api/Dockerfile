# Étape 1 : Build de l'application NestJS
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de base Nx
COPY nx.json workspace.json project.json package.json tsconfig.base.json ./
COPY tsconfig.json ./
COPY package-lock.json ./

# Copier les libs et apps nécessaires
COPY libs ./libs
COPY apps/api ./apps/api

# Installer les dépendances
RUN npm ci

# Build de l'application NestJS
RUN npm run build api

# Étape 2 : Image de production
FROM node:20-alpine AS runner

# Créer l'utilisateur node
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour exécuter l'app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/api ./dist/apps/api

# Définir l'utilisateur non-root
USER appuser

# Démarrer l'application NestJS
CMD ["node", "dist/apps/api/main.js"]
