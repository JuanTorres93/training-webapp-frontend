# Usar una imagen base de Node.js para construir la aplicación

# TODO Descomentar y cambiar por línea de abajo cuando sepa sobre nginx
# FROM node:18-alpine as build
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json (si existe)
COPY ./package*.json ./

# Instalar las dependencias del frontend
RUN npm install

# Copiar el código de la aplicación y construirla
COPY ./public ./public
COPY ./src ./src
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000

# TODO Descomentar cuando sepa sobre nginx
# # Usar una imagen base de nginx para servir la aplicación
# FROM nginx:alpine
# 
# # Copiar los archivos estáticos de la carpeta de construcción a nginx
# COPY --from=build /app/build /usr/share/nginx/html
# 
# # Exponer el puerto en el que nginx está sirviendo
# EXPOSE 80
# 
# # Comando por defecto para ejecutar nginx
# CMD ["nginx", "-g", "daemon off;"]
