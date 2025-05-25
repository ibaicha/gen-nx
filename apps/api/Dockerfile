# ================================================
# ÉTAPE 1 : BUILDER - INSTALLATION ET COMPILATION
# ================================================
FROM node:20-alpine AS builder

# 1. Installer les dépendances système nécessaires
RUN apk add --no-cache git openssl python3 make g++ mysql-client

# 2. Configurer le workspace
WORKDIR /app

# 3. Copier les fichiers de configuration (optimisation du cache Docker)
COPY package.json package-lock.json nx.json tsconfig.base.json ./
COPY wait-for-db.sh /wait-for-db.sh

# 4. Installer les dépendances
RUN npm ci

# 5. Copier le reste du code source
COPY apps/api/ apps/api/
COPY libs/ libs/

# 6. Builder l'application (production)
RUN npx nx build api --prod --skip-nx-cache

# ================================================
# ÉTAPE 2 : RUNNER - IMAGE FINALE DE PRODUCTION
# ================================================
FROM node:20-alpine

# 1. Installer les dépendances runtime nécessaires
RUN apk add --no-cache mysql-client openssl && \
    chmod +x /wait-for-db.sh

# 2. Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 3. Configurer l'environnement
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL=mysql://user:pass@db:3306/dbname

# 4. Copier uniquement le nécessaire depuis le builder
COPY --from=builder --chown=appuser:appgroup /app/dist/apps/api ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/apps/api/prisma ./prisma
COPY --from=builder /wait-for-db.sh /wait-for-db.sh

# 5. Nettoyer les dépendances inutiles
RUN npm prune --production && \
    chown -R appuser:appgroup /app

# 6. Basculer vers l'utilisateur non-root
USER appuser

# 7. Préparer Prisma
RUN npx prisma generate

# 8. Exposer les ports
EXPOSE 3000 5555

# 9. Commande de démarrage
CMD ["/bin/sh", "-c", "/wait-for-db.sh && node dist/apps/api/main.js"]
