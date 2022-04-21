FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production --no-progress
COPY /src /usr/src/app/src
COPY config.env /usr/src/app/src
WORKDIR /usr/src/app/src
EXPOSE 3000
CMD [ "node",  "app.js"]