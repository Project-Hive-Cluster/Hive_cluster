# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /api
# COPY package.json package.json
# RUN npm install 
COPY . .
CMD ["npm","run","dev"]
EXPOSE 2000