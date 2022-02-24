FROM node:16.14-alpine

RUN mkdir -m 755 /home/node/app
COPY . /home/node/app

WORKDIR /home/node/app
RUN rm -rf node_modules
RUN npm install

ENTRYPOINT npm run dev
