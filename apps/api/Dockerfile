# Étape 1 : Build de l'application
FROM node:22-alpine AS base
 
# development stage
FROM base AS development 


WORKDIR /app

 
 
COPY nx.json ./
              
COPY tsconfig.base.json ./
COPY apps ./apps
COPY libs ./libs
COPY eslint.config.js ./

# COPY .nx ./.nx                       
COPY package.json package-lock.json ./


RUN npm ci

# Utiliser le binaire local nx
RUN ./node_modules/.bin/nx build api



# --- Étape 2 : Image de prod ---
FROM base AS production

WORKDIR /app

COPY --from=development  /app/dist/apps/api ./dist
COPY package*.json ./

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/main.js"]
