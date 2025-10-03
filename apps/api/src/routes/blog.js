import express from 'express';

const router = express.Router();

// Base de datos simple en memoria
let blogPosts = [
  {
    id: '1',
    title: 'Bienvenido a Athena Pocket',
    slug: 'bienvenido-athena-pocket',
    excerpt: 'Descubre las funcionalidades de supervivencia con IA que te ayudarán en cualquier situación.',
    content: 'Athena Pocket es tu compañero de supervivencia digital...',
    author: 'Administrador',
    publishedAt: new Date('2024-01-15'),
    tags: ['supervivencia', 'ia', 'guia'],
    featured: true
  },
  {
    id: '2',
    title: 'Primeros Pasos en Supervivencia',
    slug: 'primeros-pasos-supervivencia',
    excerpt: 'Aprende los conceptos básicos para mantenerte seguro en cualquier situación de emergencia.',
    content: 'La supervivencia comienza con la preparación...',
    author: 'Administrador',
    publishedAt: new Date('2024-01-20'),
    tags: ['supervivencia', 'basico', 'emergencia'],
    featured: false
  }
];

// Obtener todos los posts del blog
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, tag, featured } = req.query;
    
    let filteredPosts = [...blogPosts];

    // Filtrar por tag
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.includes(tag)
      );
    }

    // Filtrar por featured
    if (featured === 'true') {
      filteredPosts = filteredPosts.filter(post => post.featured);
    }

    // Ordenar por fecha de publicación (más recientes primero)
    filteredPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json({
      posts: paginatedPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        publishedAt: post.publishedAt,
        tags: post.tags,
        featured: post.featured
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredPosts.length / limit),
        totalPosts: filteredPosts.length,
        hasNext: endIndex < filteredPosts.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error obteniendo posts del blog:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener post por slug
router.get('/:slug', (req, res) => {
  try {
    const post = blogPosts.find(p => p.slug === req.params.slug);
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      publishedAt: post.publishedAt,
      tags: post.tags,
      featured: post.featured
    });
  } catch (error) {
    console.error('Error obteniendo post:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener tags disponibles
router.get('/tags/list', (req, res) => {
  try {
    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
    res.json({ tags: allTags });
  } catch (error) {
    console.error('Error obteniendo tags:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
