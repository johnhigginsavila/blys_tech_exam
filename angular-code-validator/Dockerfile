# FROM node:10.23.0-alpine3.10
# WORKDIR '/app'
# COPY ./package.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# COPY dist/ /app/dist/
# RUN ls
# CMD ["npm", "run", "start"]

### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/angular-code-validator /usr/share/nginx/html