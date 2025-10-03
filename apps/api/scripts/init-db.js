// Script para inicializar la base de datos con datos de ejemplo
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Inicializando base de datos...');

  try {
    // Crear usuario administrador
    const adminPassword = process.env.ADMIN_PASSWORD || '941259018a';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
      where: { email: 'planetazuzu@gmail.com' },
      update: {},
      create: {
        email: 'planetazuzu@gmail.com',
        name: 'Administrador',
        password: hashedPassword,
        role: 'ADMIN',
        isVerified: true,
        bio: 'Administrador principal de Athena Pocket',
        location: 'Madrid, España'
      }
    });

    console.log('✅ Usuario administrador creado:', admin.email);

    // Crear posts de ejemplo
    const posts = await Promise.all([
      prisma.post.upsert({
        where: { slug: 'bienvenido-athena-pocket' },
        update: {},
        create: {
          title: 'Bienvenido a Athena Pocket',
          slug: 'bienvenido-athena-pocket',
          excerpt: 'Descubre las funcionalidades de supervivencia con IA que te ayudarán en cualquier situación.',
          content: `# Bienvenido a Athena Pocket

Athena Pocket es tu compañero de supervivencia digital que combina la tecnología más avanzada con conocimientos ancestrales de supervivencia.

## Características principales:

- **Mapas offline** para navegación sin conexión
- **IA de supervivencia** para situaciones de emergencia
- **Comunidad** de expertos y entusiastas
- **Guias detalladas** paso a paso

¡Comienza tu aventura de supervivencia digital hoy!`,
          authorId: admin.id,
          category: 'Tutoriales',
          tags: ['supervivencia', 'ia', 'guia'],
          featured: true,
          published: true,
          publishedAt: new Date(),
          readTime: 5
        }
      }),
      prisma.post.upsert({
        where: { slug: 'primeros-pasos-supervivencia' },
        update: {},
        create: {
          title: 'Primeros Pasos en Supervivencia',
          slug: 'primeros-pasos-supervivencia',
          excerpt: 'Aprende los conceptos básicos para mantenerte seguro en cualquier situación de emergencia.',
          content: `# Primeros Pasos en Supervivencia

La supervivencia comienza con la preparación. Aquí te enseñamos los fundamentos.

## Regla de los 3:

1. **3 minutos sin aire** - Prioridad máxima
2. **3 horas sin refugio** - En condiciones extremas
3. **3 días sin agua** - Hidratación crítica
4. **3 semanas sin comida** - Alimentación secundaria

## Kit básico de supervivencia:

- Cuchillo multiusos
- Encendedor o fósforos
- Botella de agua
- Linterna
- Cuerda o paracord
- Manta de emergencia

¡La preparación es la clave del éxito!`,
          authorId: admin.id,
          category: 'Tutoriales',
          tags: ['supervivencia', 'basico', 'emergencia'],
          published: true,
          publishedAt: new Date(),
          readTime: 8
        }
      })
    ]);

    console.log('✅ Posts de ejemplo creados:', posts.length);

    // Crear badges de ejemplo
    const badges = await Promise.all([
      prisma.badge.create({
        data: {
          name: 'Primer Apoyo',
          description: 'Haz tu primera donación a Athena Pocket',
          icon: '🎯',
          requirement: 1,
          category: 'donation',
          rarity: 'COMMON'
        }
      }),
      prisma.badge.create({
        data: {
          name: 'Apoyador',
          description: 'Donar €50 o más',
          icon: '💙',
          requirement: 50,
          category: 'donation',
          rarity: 'COMMON'
        }
      }),
      prisma.badge.create({
        data: {
          name: 'Campeón',
          description: 'Donar €250 o más',
          icon: '👑',
          requirement: 250,
          category: 'donation',
          rarity: 'EPIC'
        }
      })
    ]);

    console.log('✅ Badges creados:', badges.length);

    // Crear donaciones de ejemplo
    const donations = await Promise.all([
      prisma.donation.create({
        data: {
          amount: 50,
          donorName: 'Usuario Ejemplo',
          donorEmail: 'ejemplo@email.com',
          message: '¡Excelente proyecto!',
          status: 'COMPLETED',
          paymentMethod: 'stripe',
          donorId: admin.id
        }
      }),
      prisma.donation.create({
        data: {
          amount: 25,
          donorName: 'Anónimo',
          message: 'Sigan así',
          status: 'COMPLETED',
          paymentMethod: 'paypal'
        }
      })
    ]);

    console.log('✅ Donaciones de ejemplo creadas:', donations.length);

    console.log('🎉 Base de datos inicializada exitosamente!');
    console.log('👤 Usuario admin:', admin.email);
    console.log('📝 Posts:', posts.length);
    console.log('🏆 Badges:', badges.length);
    console.log('💰 Donaciones:', donations.length);

  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
