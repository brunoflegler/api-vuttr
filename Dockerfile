FROM node:8.10

ENV YARN_VERSION 1.5.1

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json yarn.lock ./

RUN yarn install --production=true
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 3000
CMD [ "yarn", "start" ]
