# 🚀 Athena Retro Site

**Sitio web retro-terminal para la comunidad de supervivencia Athena Pocket**

## ✨ Características

### 🎨 **Diseño Retro-Terminal**
- Estética de terminal CRT con efectos de scanlines
- Colores neon y efectos de glow
- Tipografía monoespaciada
- Animaciones fluidas y micro-interacciones

### 🔐 **Sistema de Autenticación**
- **Login de Administradores**: Acceso directo con credenciales
- **Registro de Usuarios**: Sistema de verificación por email
- **Rutas Protegidas**: Control de acceso basado en roles
- **Guards de Autenticación**: Protección de páginas privadas

### 👥 **Panel de Administración**
- Dashboard con estadísticas en tiempo real
- Gestión de usuarios y moderación
- Configuración de pagos (Stripe/PayPal)
- Editor de blog con Markdown
- Sistema de donaciones

### 💬 **Comunidad y Foro**
- Creación de discusiones con validación
- Sistema de categorías y etiquetas
- Búsqueda y filtros en tiempo real
- Sistema de respuestas y votación
- Almacenamiento local persistente

### 💰 **Sistema de Pagos**
- Integración con Stripe
- Integración con PayPal
- Configuración desde panel admin
- Gestión de transacciones
- Sistema de donaciones

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Routing**: React Router v6
- **Estado**: React Context + Custom Hooks
- **Autenticación**: Sistema personalizado con localStorage
- **Pagos**: Stripe + PayPal (configurables)

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/athena-retro-site.git
cd athena-retro-site

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Configuración

### Variables de Entorno
```env
# Credenciales de Admin (en producción usar variables de entorno)
ADMIN_EMAIL=planetazuzu@gmail.com
ADMIN_PASSWORD=941259018a

# Stripe (opcional)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# PayPal (opcional)
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
```

### Configuración de Pagos
1. Acceder al panel de administración
2. Ir a la sección "Pagos"
3. Configurar claves de API de Stripe/PayPal
4. Activar/desactivar gateways según necesidad

## 📱 Uso

### **Usuarios Regulares**
- Registrarse con email
- Esperar verificación del administrador
- Acceder a la comunidad
- Crear discusiones y responder

### **Administradores**
- Login directo con credenciales
- Acceso completo al panel admin
- Moderación de contenido
- Gestión de usuarios y pagos

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI base
│   ├── Navigation.tsx  # Navegación principal
│   ├── LoginForm.tsx   # Formulario de autenticación
│   └── ...
├── pages/              # Páginas de la aplicación
│   ├── Index.tsx       # Página principal
│   ├── Admin.tsx       # Panel de administración
│   ├── Comunidad.tsx   # Foro comunitario
│   └── ...
├── hooks/              # Custom hooks
│   ├── useAuth.tsx     # Hook de autenticación
│   ├── useCookies.ts   # Hook de gestión de cookies
│   └── ...
├── contexts/           # Contextos de React
└── App.tsx            # Componente principal
```

## 🔐 Autenticación

### **Flujo de Login Admin**
1. Usuario ingresa credenciales
2. Sistema verifica contra credenciales hardcodeadas
3. Si son correctas, se crea sesión de admin
4. Acceso completo al panel de administración

### **Flujo de Registro Usuario**
1. Usuario ingresa email
2. Sistema verifica que no exista
3. Se crea usuario no verificado
4. Administrador debe verificar manualmente
5. Usuario puede acceder a la comunidad

### **Rutas Protegidas**
- `/admin` - Solo administradores
- `/comunidad` - Usuarios autenticados
- `/login` - Acceso público

## 🎯 Funcionalidades Principales

### **Sistema de Discusiones**
- ✅ Crear nueva discusión
- ✅ Validación de formularios
- ✅ Categorías y etiquetas
- ✅ Almacenamiento local
- ❌ Sistema de respuestas (en desarrollo)
- ❌ Votación de posts

### **Panel de Administración**
- ✅ Dashboard con estadísticas
- ✅ Gestión de usuarios
- ✅ Configuración de pagos
- ✅ Editor de blog
- ❌ Moderación de contenido

### **Sistema de Pagos**
- ✅ Configuración de gateways
- ✅ Formularios de pago
- ✅ Gestión de transacciones
- ❌ Procesamiento real de pagos

## 🚧 Estado del Desarrollo

### **✅ Completado**
- [x] Diseño retro-terminal
- [x] Sistema de autenticación básico
- [x] Panel de administración
- [x] Formulario de nueva discusión
- [x] Sistema de cookies y visitas
- [x] Integración de pagos (UI)

### **🔄 En Desarrollo**
- [ ] Sistema de respuestas completo
- [ ] Votación de posts
- [ ] Moderación de contenido
- [ ] Sistema de notificaciones

### **❌ Pendiente**
- [ ] Base de datos real
- [ ] API REST
- [ ] Autenticación JWT
- [ ] Procesamiento real de pagos
- [ ] Sistema de email
- [ ] Chat en tiempo real

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Planeta Zuzu** - [planetazuzu@gmail.com](mailto:planetazuzu@gmail.com)

## 🙏 Agradecimientos

- Comunidad de supervivencia Athena Pocket
- Contribuidores del proyecto
- Usuarios beta testers

---

**Athena Retro Site** - Conectando supervivientes a través de la tecnología retro 🚀
