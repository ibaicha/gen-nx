# Étape 1 : Build de l'application
FROM node:22-alpine AS development

# Créer le dossier de travail
WORKDIR /usr/src/app

# Copy the root package.json and yarn.lock to install dependencies
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the entire monorepo to the container
COPY . .
# Build the NestJS app
RUN npx nx build api --prod
# Use a lightweight Node.js image for the production environment
FROM node:22-alpine
# Set working directory
WORKDIR /usr/src/app
# Copy the build output and install only production dependencies
# COPY --from=development /usr/src/app/dist/apps/api /usr/src/app
COPY --from=development /usr/src/app/node_modules /usr/src/app/node_modules


COPY --from=development /usr/src/app/dist/apps/api ./
# Expose the api port
EXPOSE 3000
# Start the NestJS app
CMD ["node", "main.js"]