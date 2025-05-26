# Étape 1 : Build de l'application
FROM node:22-alpine AS base
 
# development stage
FROM base AS development 


WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev


RUN npx nx build api

# --- Étape 2 : Image de prod ---
FROM node:22-alpine

WORKDIR /app

COPY --from=development  /app/dist/apps/api ./dist
COPY package*.json ./

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/main.js"]
