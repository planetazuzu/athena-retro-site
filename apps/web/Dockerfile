# ===========================================
# Dockerfile para Athena Pocket Web App
# ===========================================

# Usar Node.js 18 Alpine como base
FROM node:18-alpine AS base

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat

# Configurar directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración del monorepo
COPY package.json turbo.json ./
COPY apps/web/package.json ./apps/web/

# Instalar dependencias
RUN npm ci --only=production

# ===========================================
# Stage: Builder
# ===========================================
FROM base AS builder

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm ci

# Copiar código fuente
COPY apps/web ./apps/web
COPY packages ./packages

# Construir la aplicación
WORKDIR /app/apps/web
RUN npm run build

# ===========================================
# Stage: Production
# ===========================================
FROM nginx:alpine AS production

# Copiar archivos construidos
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY apps/web/nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
