# ----------------------------
# Étape 1 : Construction de l'application Angular
# ----------------------------

# Utilise une image Node.js officielle (version 18.14) pour construire l'app
FROM node:18.14 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances pour npm
COPY package.json package-lock.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le code source du projet (y compris le code Angular)
COPY . .

# Construire l'application Angular en mode production via Nx
RUN npx nx build angular --configuration production
# Cela génère le code compilé dans `dist/apps/angular/browser`


# ----------------------------
# Étape 2 : Serveur Nginx pour héberger le frontend
# ----------------------------
FROM nginx:latest AS nginx

# (Optionnel, en commentaire) : Surcharger la configuration Nginx par défaut
# COPY apps/angular/config/nginx.conf  /etc/nginx/conf.d/default.conf

# Supprimer le contenu HTML par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier le code Angular compilé depuis l’étape précédente vers Nginx
COPY dist/apps/angular/browser /usr/share/nginx/html

# Copier une configuration Nginx personnalisée (utile pour les routes Angular)
COPY apps/angular/config/nginx.conf  /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour accéder à l'app via HTTP
EXPOSE 80

# Démarrer Nginx en mode "foreground" (nécessaire pour Docker)
CMD ["nginx", "-g", "daemon off;"]
