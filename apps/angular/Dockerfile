FROM node:18.14 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build Angular (via Nx)
RUN npx nx build angular --configuration production

# Optionnel : lister pour debug
RUN ls -la dist/apps/angular/browser

FROM nginx:latest AS nginx

# Nettoyer le HTML par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier le build Angular (si bien généré)
COPY --from=builder /app/dist/apps/angular/browser /usr/share/nginx/html

# Config nginx si nécessaire
COPY apps/angular/config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
