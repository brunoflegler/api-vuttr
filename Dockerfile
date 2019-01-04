FROM node:8.14.0

WORKDIR /usr/app

COPY package*.json yarn.lock ./

RUN yarn install --production=true

COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]
