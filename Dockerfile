FROM node:18.7.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install

COPY . .

EXPOSE 8080

RUN yarn build
CMD ["yarn", "start"]