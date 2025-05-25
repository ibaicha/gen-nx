# Étape 1 : Build de l'application
FROM node:22-alpine AS base
 
# development stage
FROM base AS development 

# Stage 1 - build

WORKDIR /app

# Copier les fichiers de dépendances pour npm
COPY apps/api ./
COPY package.json package-lock.json ./

COPY . .

RUN npm ci

RUN npx nx build api

# Stage 2 - production
FROM node:20-alpine

WORKDIR /app

COPY --from=development  /app/dist/apps/api ./dist
COPY --from=development  /app/package*.json ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/main.js"]
