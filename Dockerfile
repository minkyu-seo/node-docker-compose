# Dockerfile
FROM node:13-alpine

RUN mkdir /service

COPY package.json /service/package.json

RUN cd /service; npm install

COPY ./src /service/src

EXPOSE 3000

WORKDIR /service

CMD ["npm", "start", "run"]
