# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers Nx et les dépendances nécessaires

COPY package.json /package.json
COPY package-lock.json /package-lock.json
COPY tsconfig.base.json /tsconfig.base.json
COPY nx.json /nx.json
COPY workspace.json /workspace.json
COPY tsconfig.json /tsconfig.json

# Copier les sources nécessaires depuis le monorepo
COPY ../../libs ./libs
COPY ../../apps/api ./apps/api

# Installer les dépendances
RUN npm ci

# Build uniquement l'app NestJS ciblée
RUN npx nx build api

# Étape 2 : Image de production
FROM node:20-alpine AS runner

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier uniquement ce qu'il faut
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/api ./dist/apps/api

# Utiliser un utilisateur non-root
USER appuser

# Lancer l'application
CMD ["node", "dist/apps/api/main.js"]
