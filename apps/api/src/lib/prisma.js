import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],
  errorFormat: 'pretty',
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Función para conectar a la base de datos
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado a PostgreSQL exitosamente');
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error);
    throw error;
  }
}

// Función para desconectar de la base de datos
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log('✅ Desconectado de PostgreSQL');
  } catch (error) {
    console.error('❌ Error desconectando de PostgreSQL:', error);
  }
}

// Función para verificar la conexión
export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('❌ Error verificando conexión a la base de datos:', error);
    return false;
  }
}

export default prisma;
