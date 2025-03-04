FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration if you have any
COPY nginx/default.conf /etc/nginx/nginx.conf

EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]  
