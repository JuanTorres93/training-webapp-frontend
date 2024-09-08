# FROM node:18-alpine as build
FROM node

WORKDIR /app

# Copiar el package.json y package-lock.json (si existe)
COPY package.json .

# Instalar las dependencias del frontend
RUN npm install

# Copiar el código de la aplicación y construirla
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
