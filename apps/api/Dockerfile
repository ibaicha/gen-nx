FROM node:22-alpine AS production

# Dépendances système minimales pour Node
RUN apk add --no-cache bash openssl

# Variables d'environnement
ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}

WORKDIR /app

# Copie sélective depuis l'étape development
COPY --from=development /app/package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist
COPY --from=development /app/prisma ./prisma

# Scripts utilitaires
COPY --from=development /app/wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Fichier .env sécurisé
COPY --from=development /app/apps/api/.env /app/.env
RUN chmod 644 /app/.env

# Génération Prisma (si nécessaire)
RUN npx prisma generate

EXPOSE 3000 5555

CMD ["/wait-for-db.sh", "node", "dist/main.js"]

