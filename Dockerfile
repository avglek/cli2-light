# stage1 as builder
FROM node:16-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /cli2_light && mv ./node_modules ./cli2_light

WORKDIR /cli2_light

COPY . .

# Build the project and copy the files
RUN npm run build


FROM nginx:alpine

#!/bin/sh

#RUN mkdir /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/


## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /cli2_light/build /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx"]