# Building from latest node LTS
FROM node:argon

# Change dir to the app directory
WORKDIR /app

# Setting the environment variable for node
ENV NODE_ENV development

# Copy package.json to the working dir
COPY package.json /app

# Install app dependencies
RUN npm install

# Bundle app source
COPY . /app

# Exposing the port
EXPOSE 3000

# Running the application
CMD [ "npm", "run", "server" ]
