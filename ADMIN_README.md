# Panel de Administración - Athena Pocket

## 🚀 Descripción

El Panel de Administración de **Athena Pocket** es una interfaz completa para gestionar todos los aspectos de la aplicación de supervivencia con IA. Proporciona herramientas avanzadas para administradores y moderadores.

## 🔐 Acceso

- **URL**: `/admin`
- **Credenciales**: Por defecto, cualquier usuario/contraseña funciona (modo demo)
- **Roles**: Administrador, Moderador

## 📋 Funcionalidades Principales

### 1. Dashboard
- **Estadísticas en tiempo real**: Usuarios activos, hilos, posts, descargas
- **Actividad reciente**: Últimas acciones del sistema
- **Estado del servidor**: Monitoreo de salud del sistema

### 2. Configuración General
- **Email de contacto**: Cambiar dirección de contacto principal
- **Nombre del sitio**: Personalizar branding
- **Versión**: Gestionar versiones de la aplicación
- **Branding**: Configurar logos, colores, ASCII banner

### 3. Gestión de Foros
- **Categorías**: Crear, editar, eliminar categorías de foros
- **Hilos**: Moderar contenido, fijar, cerrar, destacar hilos
- **Usuarios**: Gestionar roles, reputación, bans, badges
- **Reportes**: Revisar y gestionar reportes de contenido
- **Métricas**: Estadísticas de actividad del foro

### 4. Gestión del Blog
- **Editor Markdown**: Editor rico con vista previa en tiempo real
- **SEO**: Meta títulos, descripciones, Open Graph
- **Programación**: Publicar posts programados
- **Etiquetas**: Sistema de categorización
- **Estados**: Borrador, publicado, programado

### 5. Gestión de Usuarios
- **Perfiles**: Ver y editar información de usuarios
- **Roles**: Asignar permisos (usuario, moderador, admin)
- **Reputación**: Sistema de puntos y badges
- **Moderación**: Suspender, banear usuarios
- **Grupos locales**: Gestionar comunidades locales

### 6. Contenido IA
- **Archivos de conocimiento**: Subir/editar JSON/TXT para la IA
- **Categorización**: Etiquetar por temas (primeros auxilios, supervivencia)
- **Versionado**: Control de versiones del contenido
- **Validación**: Verificar integridad de datos

### 7. Traducciones
- **Idiomas**: Gestionar múltiples idiomas
- **Frases clave**: Editar textos del sistema
- **Sincronización**: Mantener consistencia entre idiomas

### 8. Sistema de Descargas
- **Versiones**: Gestionar APK/ZIP descargables
- **Hashes**: Verificar integridad de archivos
- **Códigos de activación**: Generar licencias offline
- **Estadísticas**: Seguimiento de descargas

### 9. Logs y Auditoría
- **Registro completo**: Todas las acciones de admins/moderadores
- **Filtros**: Buscar por usuario, acción, fecha
- **Exportación**: Descargar logs para análisis

## 🛠️ Características Técnicas

### Editor de Blog
```typescript
// Ejemplo de uso del editor
<BlogEditor
  onSave={(post) => {
    // Guardar post en backend
    console.log("Post guardado:", post);
  }}
  onCancel={() => {
    // Cancelar edición
  }}
/>
```

### Gestor de Foros
```typescript
// Componente de gestión avanzada
<ForumManager />
```

### Autenticación
- Sistema de roles integrado
- Sesiones persistentes
- Logout automático por inactividad

### Responsive Design
- Interfaz adaptativa para móviles
- Sidebar colapsible
- Navegación optimizada

## 🎨 Estilo y Temática

### Terminal Retro
- **Colores**: Verde neón (#0f0) sobre fondo oscuro
- **Tipografía**: Monospace para elementos técnicos
- **Bordes**: Estilo terminal con esquinas rectas
- **Efectos**: Glow en elementos principales

### Componentes UI
- **Cards**: Bordes terminal con esquinas rectas
- **Botones**: Estilo retro con hover effects
- **Badges**: Indicadores de estado coloridos
- **Tabs**: Navegación entre secciones

## 📱 Navegación

### Sidebar Principal
1. **Dashboard** - Vista general
2. **Configuración** - Ajustes del sitio
3. **Foros** - Gestión de comunidad
4. **Blog** - Gestión de contenido
5. **Usuarios** - Gestión de usuarios
6. **Contenido IA** - Archivos de conocimiento
7. **Traducciones** - Gestión de idiomas
8. **Descargas** - Sistema de licencias
9. **Logs** - Auditoría del sistema

### Accesos Rápidos
- **Nuevo Post**: Desde sección Blog
- **Gestión Avanzada**: Desde sección Foros
- **Nuevo Usuario**: Desde sección Usuarios

## 🔧 Configuración Avanzada

### Variables de Entorno
```env
ADMIN_EMAIL=admin@athena.com
ADMIN_PASSWORD=secure_password
SESSION_TIMEOUT=3600
LOG_LEVEL=info
```

### Personalización
- **Colores**: Modificar variables CSS en `tailwind.config.ts`
- **Logo**: Reemplazar favicon y assets
- **Texto**: Editar strings en componentes
- **Funcionalidades**: Extender componentes según necesidades

## 🚀 Despliegue

### Requisitos
- Node.js 18+
- React 18+
- TypeScript 5+

### Instalación
```bash
npm install
npm run build
npm run preview
```

### Producción
```bash
npm run build
# Desplegar carpeta dist/
```

## 📊 Métricas y Analytics

### Dashboard Metrics
- **Usuarios activos**: Últimas 24 horas
- **Hilos activos**: Total de conversaciones
- **Posts recientes**: Contenido nuevo
- **Descargas**: Estadísticas de descarga

### Logs de Auditoría
- **Acciones**: Quién hizo qué y cuándo
- **Objetivos**: Sobre qué elemento se actuó
- **Timestamps**: Fechas y horas precisas
- **Roles**: Permisos del usuario que actuó

## 🔒 Seguridad

### Autenticación
- Formulario de login seguro
- Validación de credenciales
- Sesiones con timeout
- Logout automático

### Autorización
- Sistema de roles granular
- Permisos por sección
- Acceso restringido por funcionalidad
- Logs de todas las acciones

### Validación
- Sanitización de inputs
- Validación de archivos
- Prevención de XSS
- CSRF protection

## 🐛 Troubleshooting

### Problemas Comunes
1. **Login no funciona**: Verificar credenciales
2. **Editor no carga**: Revisar dependencias
3. **Sidebar no responde**: Verificar JavaScript
4. **Estilos no aplican**: Verificar Tailwind CSS

### Logs de Error
- Revisar consola del navegador
- Verificar logs del servidor
- Comprobar red y conectividad

## 📞 Soporte

### Contacto
- **Email**: admin@athena.com
- **Documentación**: Este archivo
- **Issues**: Repositorio GitHub

### Contribución
1. Fork del repositorio
2. Crear rama feature
3. Implementar cambios
4. Crear Pull Request

---

**Athena Pocket Admin Panel** - Versión 2.1.3
*Desarrollado con React, TypeScript y Tailwind CSS* 