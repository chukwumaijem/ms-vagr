FROM node:10.23.3-alpine3.11

RUN mkdir -m 755 /home/node/app
COPY . /home/node/app

WORKDIR /home/node/app
RUN rm -rf node_modules
RUN npm install

ENTRYPOINT npm start
