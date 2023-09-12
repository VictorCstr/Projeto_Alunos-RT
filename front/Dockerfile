FROM node:16-slim AS build
WORKDIR /code

COPY package*.json ./
RUN npm install

COPY . /code/

FROM nginx:latest as runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/dist/front-dnc /usr/share/nginx/html

EXPOSE 80

