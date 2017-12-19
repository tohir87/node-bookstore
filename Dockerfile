# specify the node base image with your desired version node:<version>
FROM node:7

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD node server.js

# replace this with your application's default port
EXPOSE 3000