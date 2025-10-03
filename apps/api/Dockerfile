# Dockerfile para el backend API
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY apps/api/package.json ./
COPY package.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar código fuente
COPY apps/api/src ./src

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S athena -u 1001

# Cambiar permisos
RUN chown -R athena:nodejs /app
USER athena

# Exponer puerto
EXPOSE 3001

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3001

# Comando de inicio
CMD ["node", "src/server.js"]
