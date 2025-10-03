# 🔧 Variables de Entorno - Athena Pocket

## 📋 Resumen

Este documento describe todas las variables de entorno necesarias para el funcionamiento completo de Athena Pocket.

## 🚨 **IMPORTANTE**

- **NUNCA** subas archivos `.env` al repositorio
- Usa `.env.example` como plantilla
- Cambia TODAS las contraseñas por defecto
- Usa claves diferentes para desarrollo y producción

## 📁 Archivos de Configuración

```
├── env.example          # Plantilla para todos los entornos
├── env.production       # Configuración de producción
└── apps/web/.env.local  # Desarrollo local (no subir a git)
```

## 🌐 Variables por Categoría

### **🔧 Configuración General**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `development` / `production` |
| `VITE_APP_URL` | URL de la aplicación | `http://localhost:8080` |
| `VITE_API_URL` | URL del backend API | `http://localhost:3001` |
| `VITE_APP_NAME` | Nombre de la aplicación | `Athena Pocket` |
| `VITE_APP_VERSION` | Versión de la aplicación | `1.0.0` |

### **🔐 Autenticación**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_ADMIN_EMAIL` | Email del administrador | `admin@athenapocket.com` |
| `VITE_ADMIN_PASSWORD` | Contraseña del admin | `secure_password_here` |
| `JWT_SECRET` | Clave secreta para JWT | `64_characters_minimum` |
| `JWT_EXPIRES_IN` | Expiración del token | `7d` |
| `ENCRYPTION_KEY` | Clave de encriptación | `32_characters_exact` |
| `BCRYPT_ROUNDS` | Rounds para hash de passwords | `12` |

### **💳 Pagos - Stripe**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe | `pk_test_...` / `pk_live_...` |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe | `sk_test_...` / `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook | `whsec_...` |

### **💰 Pagos - PayPal**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_PAYPAL_CLIENT_ID` | Client ID de PayPal | `client_id_from_paypal` |
| `PAYPAL_CLIENT_SECRET` | Client Secret de PayPal | `client_secret_from_paypal` |
| `PAYPAL_ENVIRONMENT` | Entorno de PayPal | `sandbox` / `live` |
| `PAYPAL_WEBHOOK_ID` | ID del webhook | `webhook_id_from_paypal` |

### **📧 Sistema de Email**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SENDGRID_API_KEY` | API Key de SendGrid | `SG.xxxxxxxxxxxxx` |
| `FROM_EMAIL` | Email remitente | `noreply@athenapocket.com` |
| `FROM_NAME` | Nombre del remitente | `Athena Pocket` |

### **🗄️ Base de Datos**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL completa de PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `DATABASE_HOST` | Host de la base de datos | `localhost` |
| `DATABASE_PORT` | Puerto de la base de datos | `5432` |
| `DATABASE_NAME` | Nombre de la base de datos | `athena_pocket` |
| `DATABASE_USER` | Usuario de la base de datos | `athena_user` |
| `DATABASE_PASSWORD` | Contraseña de la base de datos | `secure_db_password` |

### **☁️ Servicios Cloud**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS Access Key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Key | `secret_key_here` |
| `AWS_REGION` | Región de AWS | `eu-west-1` |
| `AWS_BUCKET_NAME` | Nombre del bucket S3 | `athena-pocket-files` |
| `REDIS_URL` | URL de Redis | `redis://localhost:6379` |

### **📊 Analytics y Monitoreo**
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `VITE_SENTRY_DSN` | Sentry DSN | `https://xxx@sentry.io/xxx` |

## 🚀 Configuración por Entorno

### **Desarrollo Local**
```bash
# Copiar plantilla
cp env.example apps/web/.env.local

# Editar variables
nano apps/web/.env.local
```

### **Producción**
```bash
# En tu servidor o plataforma de hosting
cp env.production .env

# Configurar variables en el panel de control
# Ejemplo: Vercel, Railway, Heroku, etc.
```

## 🔒 Seguridad

### **Contraseñas Seguras**
- Mínimo 16 caracteres
- Incluir mayúsculas, minúsculas, números y símbolos
- Usar un generador de contraseñas

### **Claves de API**
- Rotar regularmente
- Usar diferentes claves por entorno
- Nunca hardcodear en el código

### **JWT Secret**
- Mínimo 64 caracteres
- Usar un generador seguro
- Diferente por entorno

## 📝 Checklist de Configuración

### **Para Desarrollo:**
- [ ] Copiar `env.example` a `.env.local`
- [ ] Configurar Stripe en modo test
- [ ] Configurar PayPal en sandbox
- [ ] Configurar base de datos local
- [ ] Cambiar contraseñas por defecto

### **Para Producción:**
- [ ] Configurar dominio y SSL
- [ ] Stripe en modo live
- [ ] PayPal en modo live
- [ ] Base de datos de producción
- [ ] Email de producción
- [ ] Analytics reales
- [ ] Monitoreo de errores

## 🆘 Troubleshooting

### **Error: Variable no encontrada**
```bash
# Verificar que la variable esté en el archivo .env
# Verificar que tenga el prefijo VITE_ para variables del frontend
```

### **Error: Clave de API inválida**
```bash
# Verificar que la clave sea correcta
# Verificar que esté en el entorno correcto (test/live)
```

### **Error: Base de datos no conecta**
```bash
# Verificar DATABASE_URL
# Verificar que la base de datos esté corriendo
# Verificar credenciales
```

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa este documento
2. Verifica los logs de la aplicación
3. Contacta al equipo de desarrollo

---

**Última actualización:** Enero 2025
**Versión:** 1.0.0
