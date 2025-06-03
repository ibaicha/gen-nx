FROM nginx:alpine
RUN apk add --no-cache netcat-openbsd
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["sh", "-c", "/wait-for.sh localhost 3000 -- nginx -g 'daemon off;'"]
EXPOSE 80