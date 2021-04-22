FROM node:15-alpine as build-step

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
