# ----------------------------
# Étape 1 : Construction de l'application Angular
# ----------------------------

# Utilise une image Node.js officielle (version 18.14) pour construire l'app
FROM node:22-alpine AS builder
RUN echo "✅ Démarrage image  ... Angular"
# Étape 1 : build Angular
 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npx nx build angular --configuration production

# Étape 2 : servir avec Nginx
FROM nginx:1.25-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/apps/angular/browser /usr/share/nginx/html
COPY ./apps/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]









