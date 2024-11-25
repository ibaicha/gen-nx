
# Stage 1: Build the Angular application
FROM node:18.14 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npx nx build angular --configuration production

# Stage 2: Serve the Angular application using Nginx
FROM nginx:latest
COPY apps/angular/config/nginx.conf  /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY dist/apps/angular/browser /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]