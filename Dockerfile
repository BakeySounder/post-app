FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /post-app

# Installing dependencies
COPY ./package*.json /post-app

RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","start"]
