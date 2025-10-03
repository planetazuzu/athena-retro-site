# 🗄️ Configuración de Base de Datos PostgreSQL

Esta guía te ayudará a conectar Athena Pocket con tu PostgreSQL existente.

## 📋 **Paso 1: Datos de Conexión**

Necesitas proporcionar estos datos de tu PostgreSQL:

```
Host: tu-servidor.com (o IP)
Puerto: 5432 (por defecto)
Base de datos: athena_pocket
Usuario: tu_usuario
Contraseña: tu_contraseña
```

## 📝 **Paso 2: Crear archivo .env**

Crea el archivo `apps/api/.env` con tu configuración:

```bash
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@tu-servidor.com:5432/athena_pocket"

# Otros datos necesarios
JWT_SECRET=tu_jwt_secret_super_seguro
ADMIN_EMAIL=planetazuzu@gmail.com
ADMIN_PASSWORD=941259018a
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5000
```

## 🚀 **Paso 3: Ejecutar Migraciones**

```bash
cd apps/api

# Generar cliente Prisma
npm run db:generate

# Crear migraciones
npm run db:migrate

# Inicializar con datos de ejemplo
npm run db:seed
```

## 🔍 **Paso 4: Verificar Conexión**

```bash
# Iniciar el servidor
npm run dev
```

Deberías ver:
```
✅ Conectado a PostgreSQL exitosamente
🚀 Servidor API ejecutándose en puerto 3001
```

## 🛠️ **Comandos Útiles**

```bash
# Ver datos en Prisma Studio
npm run db:studio

# Reiniciar base de datos
npm run db:reset

# Aplicar migraciones en producción
npm run db:deploy
```

## 🗃️ **Estructura de la Base de Datos**

La base de datos incluye estas tablas:

- **users** - Usuarios del sistema
- **posts** - Posts del blog
- **donations** - Donaciones recibidas
- **comments** - Comentarios en posts
- **messages** - Mensajes privados
- **badges** - Insignias disponibles
- **user_badges** - Insignias ganadas por usuarios

## 🔒 **Seguridad**

- Las contraseñas se hashean con bcrypt
- JWT para autenticación
- Validación de datos con Prisma
- Conexiones SSL (configurar en producción)

## 📞 **Soporte**

Si tienes problemas:

1. Verifica que tu PostgreSQL esté corriendo
2. Confirma que los datos de conexión sean correctos
3. Asegúrate de que el usuario tenga permisos para crear tablas
4. Revisa los logs del servidor para errores específicos

¡Listo! Tu base de datos estará conectada y funcionando. 🎉
