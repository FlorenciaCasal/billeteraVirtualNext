# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
# RUN npm install

# Instala dependencias, solo las necesarias para producción
 RUN npm install --omit=dev && npm cache clean --force

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación para producción
 RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando para ejecutar la aplicación en desarrollo
# CMD ["npm", "run", "dev"]

# Comando para entorno de producción
 CMD ["npm", "start"]