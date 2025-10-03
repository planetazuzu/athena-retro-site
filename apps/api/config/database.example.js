// Athena Pocket API - Configuración de Base de Datos
// ==================================================

// Reemplaza estos valores con los datos de tu PostgreSQL
const databaseConfig = {
  // URL de conexión a tu PostgreSQL
  // Formato: postgresql://usuario:password@host:puerto/base_de_datos
  url: "postgresql://usuario:password@tu-servidor.com:5432/athena_pocket",
  
  // Configuración alternativa por separado
  host: "tu-servidor.com",           // IP o dominio de tu servidor
  port: 5432,                        // Puerto de PostgreSQL
  database: "athena_pocket",         // Nombre de la base de datos
  username: "usuario",               // Usuario de la base de datos
  password: "password",              // Contraseña del usuario
  
  // Configuración SSL (si es necesario)
  ssl: {
    rejectUnauthorized: false        // Cambiar a true en producción
  },
  
  // Configuración de pool de conexiones
  pool: {
    min: 2,
    max: 10,
    idle: 10000
  }
};

module.exports = databaseConfig;
