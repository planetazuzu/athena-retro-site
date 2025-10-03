import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar Prisma
import { connectDatabase, checkDatabaseConnection } from './lib/prisma.js';

// Importar rutas
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import donationRoutes from './routes/donations.js';
import blogRoutes from './routes/blog.js';
import adminRoutes from './routes/admin.js';

// Configuración
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true
}));

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../web/dist')));
}

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Servir el frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../web/dist/index.html'));
  });
}

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo salió mal!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

// Función para inicializar la aplicación
async function startServer() {
  try {
    // Verificar conexión a la base de datos
    console.log('🔍 Verificando conexión a la base de datos...');
    const isConnected = await checkDatabaseConnection();
    
    if (!isConnected) {
      console.log('⚠️ No se pudo conectar a la base de datos. Verifica tu configuración.');
      console.log('📝 Asegúrate de configurar la variable DATABASE_URL correctamente.');
      console.log('💡 Ejemplo: postgresql://usuario:password@tu-servidor.com:5432/athena_pocket');
    } else {
      console.log('✅ Base de datos conectada exitosamente');
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor API ejecutándose en puerto ${PORT}`);
      console.log(`📱 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5000'}`);
      console.log(`🔧 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️ Base de datos: ${isConnected ? 'Conectada ✅' : 'Desconectada ⚠️'}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
}

// Iniciar la aplicación
startServer();

export default app;
