# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
# COPY package.json package.json
# RUN npm install 
COPY . .
CMD ["npm","run","dev"]
EXPOSE 8080