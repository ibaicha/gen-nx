# Étape 1 : Build de l'application
FROM node:22-alpine AS base
 
# development stage
FROM base AS development 

WORKDIR /usr/src/app

COPY dist/api/package.json .
COPY dist/api/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/api/main.js"]