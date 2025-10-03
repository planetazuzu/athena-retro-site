#!/bin/bash

# ===========================================
# Script de Build para Athena Pocket
# ===========================================

set -e  # Exit on any error

echo "🚀 Iniciando build de Athena Pocket..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    error "Node.js no está instalado"
    exit 1
fi

NODE_VERSION=$(node --version)
log "Node.js version: $NODE_VERSION"

# Verificar npm
if ! command -v npm &> /dev/null; then
    error "npm no está instalado"
    exit 1
fi

log "Instalando dependencias del monorepo..."
npm install

log "Ejecutando linting..."
npm run lint || warning "Linting falló, continuando..."

log "Ejecutando type check..."
npm run type-check || warning "Type check falló, continuando..."

log "Construyendo aplicación web..."
cd apps/web
npm run build

success "Build completado exitosamente!"

# Mostrar información del build
if [ -d "dist" ]; then
    DIST_SIZE=$(du -sh dist | cut -f1)
    log "Tamaño del build: $DIST_SIZE"
    
    # Listar archivos principales
    log "Archivos generados:"
    ls -la dist/ | head -10
fi

success "🎉 Athena Pocket está listo para desplegar!"
success "📁 Directorio de build: apps/web/dist"
success "🌐 Para preview local: cd apps/web && npm run preview -- --port 5001"

echo ""
echo "📋 Próximos pasos:"
echo "   1. Subir código a GitHub"
echo "   2. Conectar con Vercel/Netlify"
echo "   3. Configurar dominio personalizado"
echo "   4. ¡Disfrutar tu app online!"
