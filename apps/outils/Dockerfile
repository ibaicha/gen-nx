
FROM node:22-alpine

RUN apk add --no-cache \
    bash \
    git \
    openssl \
    tree

WORKDIR /app

RUN echo "### Before COPY FN ###" && tree -a /app
COPY apps/api/prisma ./prisma
COPY package.json .
COPY package-lock.json .

RUN echo "### After COPY FN ###" && tree -a /app
# Configurer le registre npm
RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY apps/api/.env /.env
RUN chmod +x /.env

RUN echo "### After COPY All ###" && tree -a /app

EXPOSE 5555

CMD ["prisma", "studio", "--port", "5555"]