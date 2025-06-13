FROM nginx:1.25-alpine
RUN echo "✅ Démarrage image ... Nginx"
RUN rm -f /etc/nginx/conf.d/default.conf
COPY apps/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ../../dist/apps/angular/browser /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]