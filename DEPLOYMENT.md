# 🚀 Guía de Despliegue - Athena Pocket

## 📋 Resumen

Esta guía te ayudará a desplegar Athena Pocket de forma rápida y sencilla, sin necesidad de configurar backend inicialmente.

## 🎯 **Opciones de Despliegue**

### **1. 🟢 Vercel (Recomendado - Más Fácil)**
- ✅ Despliegue automático desde GitHub
- ✅ HTTPS incluido
- ✅ CDN global
- ✅ Dominio personalizado
- ✅ Gratis para proyectos pequeños

### **2. 🟡 Netlify**
- ✅ Despliegue automático
- ✅ HTTPS incluido
- ✅ Formularios sin backend
- ✅ Gratis con límites

### **3. 🔵 Docker (Servidor propio)**
- ✅ Control total
- ✅ Personalizable
- ❌ Requiere servidor
- ❌ Configuración de dominio/SSL

## 🚀 **Despliegue Rápido en Vercel**

### **Paso 1: Preparar el repositorio**
```bash
# 1. Subir código a GitHub
git add .
git commit -m "Initial deployment setup"
git push origin main

# 2. Ir a vercel.com y conectar tu repositorio
```

### **Paso 2: Configurar en Vercel**
```bash
# Configuración automática:
# - Framework Preset: Vite
# - Root Directory: apps/web
# - Build Command: npm run build
# - Output Directory: dist
```

### **Paso 3: Variables de entorno (opcionales por ahora)**
```bash
# En el dashboard de Vercel, añadir:
NODE_ENV=production
VITE_APP_NAME=Athena Pocket
VITE_APP_VERSION=1.0.0
```

### **Paso 4: Deploy**
- ✅ Click en "Deploy"
- ✅ Esperar 2-3 minutos
- ✅ ¡Tu app estará online!

## 🐳 **Despliegue con Docker**

### **Desarrollo local:**
```bash
# 1. Construir y ejecutar
docker-compose up --build

# 2. Abrir navegador
open http://localhost:4000
```

### **Producción:**
```bash
# 1. Construir imagen
docker build -f apps/web/Dockerfile -t athena-pocket .

# 2. Ejecutar contenedor
docker run -p 80:80 athena-pocket

# 3. Configurar proxy reverso (Nginx/Apache)
# 4. Configurar SSL (Let's Encrypt)
```

## 🌐 **Despliegue en Netlify**

### **Método 1: Drag & Drop**
```bash
# 1. Construir la app localmente
cd apps/web
npm run build

# 2. Arrastrar carpeta 'dist' a netlify.com/drop
```

### **Método 2: Git Integration**
```bash
# 1. Conectar repositorio en netlify.com
# 2. Configurar:
#    - Build command: cd apps/web && npm run build
#    - Publish directory: apps/web/dist
```

## 📊 **Estado Actual del Despliegue**

### ✅ **Funcionará:**
- ✅ Interfaz completa (retro-terminal)
- ✅ Navegación entre páginas
- ✅ Sistema de autenticación básico (localStorage)
- ✅ Panel de administración
- ✅ Sistema de pagos (modo test)
- ✅ Foros y comunidad (localStorage)
- ✅ Blog y contenido
- ✅ Responsive design

### ⚠️ **Limitaciones (por ahora):**
- ⚠️ Datos no persisten entre sesiones
- ⚠️ Pagos no procesan dinero real
- ⚠️ No hay notificaciones por email
- ⚠️ No hay backup de datos

### 🔄 **Próximas mejoras:**
- 🔄 Backend API con base de datos
- 🔄 Pagos reales con Stripe/PayPal
- 🔄 Sistema de email
- 🔄 App móvil

## 🛠️ **Comandos Útiles**

### **Desarrollo:**
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

### **Docker:**
```bash
# Construir imagen
docker build -f apps/web/Dockerfile -t athena-pocket .

# Ejecutar contenedor
docker run -p 3000:80 athena-pocket

# Ver logs
docker logs <container_id>
```

## 🔧 **Troubleshooting**

### **Error: Build failed**
```bash
# Verificar que todas las dependencias estén instaladas
npm install

# Verificar que no haya errores de TypeScript
npm run type-check
```

### **Error: 404 en rutas**
```bash
# Verificar configuración de SPA routing
# En Vercel: vercel.json
# En Netlify: netlify.toml
```

### **Error: Assets no cargan**
```bash
# Verificar paths en vite.config.ts
# Verificar que los assets estén en public/
```

## 📞 **Soporte**

Si tienes problemas con el despliegue:
1. Revisa los logs en la plataforma de hosting
2. Verifica la configuración de build
3. Contacta al equipo de desarrollo

## 🎉 **¡Despliegue Exitoso!**

Una vez desplegado, tendrás:
- ✅ Una aplicación web completamente funcional
- ✅ Dominio público accesible
- ✅ HTTPS automático
- ✅ CDN global para velocidad

**URL de ejemplo:** `https://athena-pocket.vercel.app`

---

**Última actualización:** Enero 2025  
**Versión:** 1.0.0
