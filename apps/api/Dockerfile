# Étape 1 : Build de base
FROM node:22-alpine AS base

RUN apk add --no-cache \
    bash \
    git \
    openssl \
    mysql-client \
    tree

# Étape 2 : Étape de développement
FROM base AS development 

WORKDIR /app

COPY package*.json ./

# # # # RUN echo "### Après COPY package*.json ###" && tree -a /app

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

# # # # RUN echo "### Après npm install ###" && tree -a /app

COPY . .

# # # # RUN echo "### Après COPY . . ###" && tree -a /app

ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

RUN npx nx run api:build

# # # # RUN echo "### Après build Nx ###" && tree -a /app




# Étape 4 : Image production
FROM base AS production 

RUN apk add --no-cache bash openssl tree

ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}

WORKDIR /app

COPY --from=development /app/package.json ./
COPY --from=development /app/package-lock.json ./
COPY --from=development /app/dist/apps/api ./dist


# # # # RUN echo "### Après COPY depuis l'étape de développement ###" && tree -a /app

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --production

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

COPY apps/api/.env /.env
RUN chmod +x /.env

RUN npm install -D ts-node typescript

RUN echo "### Structure finale de l'image production ###" && tree -a /

EXPOSE 3000 5555

CMD ["/wait-for-db.sh", "node", "dist/main.js"]
