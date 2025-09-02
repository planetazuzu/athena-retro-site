import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  publishDate?: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  category: string;
  featured: boolean;
  views: number;
  likes: number;
  dislikes: number;
}

const STORAGE_KEY = 'athena_blog_posts';

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar posts desde localStorage
  const loadPosts = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedPosts = JSON.parse(stored);
        setPosts(parsedPosts);
      } else {
        // Posts de ejemplo si no hay ninguno
        const defaultPosts: BlogPost[] = [
          {
            id: "1",
            title: "10 Técnicas de Supervivencia que Salvan Vidas",
            content: `# 10 Técnicas de Supervivencia que Salvan Vidas

## Introducción
En situaciones de emergencia, conocer técnicas básicas de supervivencia puede marcar la diferencia entre la vida y la muerte.

## 1. Regla de los Tres
- **3 minutos** sin aire
- **3 horas** sin refugio en condiciones extremas
- **3 días** sin agua
- **3 semanas** sin comida

## 2. Construir Refugio
Un refugio adecuado debe:
- Proteger del viento
- Mantener el calor corporal
- Ser visible para rescate

## 3. Encontrar Agua
- Buscar en valles y depresiones
- Recolectar agua de lluvia
- Purificar antes de beber

## Conclusión
Estas técnicas básicas pueden salvar vidas en situaciones de emergencia.`,
            excerpt: "Descubre las técnicas más efectivas que han sido probadas en situaciones reales de emergencia...",
            author: "Dr. María González",
            createdAt: "2024-01-15T00:00:00Z",
            updatedAt: "2024-01-15T00:00:00Z",
            tags: ["supervivencia", "técnicas", "emergencia"],
            status: "published",
            metaTitle: "10 Técnicas de Supervivencia que Salvan Vidas",
            metaDescription: "Aprende las técnicas más efectivas de supervivencia probadas en situaciones reales de emergencia",
            category: "Técnicas",
            readTime: "8 min",
            featured: true,
            views: 1250,
            likes: 89,
            dislikes: 2
          },
          {
            id: "2",
            title: "Cómo la IA Revoluciona la Supervivencia Moderna",
            content: `# Cómo la IA Revoluciona la Supervivencia Moderna

## La Nueva Era de la Supervivencia
La inteligencia artificial está transformando la forma en que nos preparamos para emergencias.

## Aplicaciones Prácticas
- **Predicción de desastres** con mayor precisión
- **Análisis de rutas** en tiempo real
- **Detección temprana** de amenazas

## Casos de Uso
1. **Athena Pocket**: App que usa IA para guiar en emergencias
2. **Sistemas de alerta**: Notificaciones inteligentes
3. **Análisis de datos**: Patrones de supervivencia

## El Futuro
La IA continuará evolucionando para hacer la supervivencia más accesible y efectiva.`,
            excerpt: "La inteligencia artificial está transformando la forma en que nos preparamos para emergencias...",
            author: "Carlos Ruiz",
            createdAt: "2024-01-12T00:00:00Z",
            updatedAt: "2024-01-12T00:00:00Z",
            tags: ["IA", "tecnología", "supervivencia"],
            status: "published",
            metaTitle: "IA en Supervivencia Moderna",
            metaDescription: "Descubre cómo la inteligencia artificial revoluciona las técnicas de supervivencia",
            category: "Tecnología",
            readTime: "6 min",
            featured: false,
            views: 890,
            likes: 67,
            dislikes: 1
          }
        ];
        setPosts(defaultPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Guardar posts en localStorage
  const savePosts = (newPosts: BlogPost[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
      setPosts(newPosts);
    } catch (error) {
      console.error('Error saving blog posts:', error);
    }
  };

  // Crear nuevo post
  const createPost = (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'dislikes'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      dislikes: 0
    };
    
    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    return newPost;
  };

  // Actualizar post existente
  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    const updatedPosts = posts.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    );
    savePosts(updatedPosts);
  };

  // Eliminar post
  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    savePosts(updatedPosts);
  };

  // Obtener post por ID
  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  // Obtener posts publicados
  const getPublishedPosts = () => {
    return posts.filter(post => post.status === 'published');
  };

  // Obtener posts por categoría
  const getPostsByCategory = (category: string) => {
    if (category === 'Todas') return getPublishedPosts();
    return getPublishedPosts().filter(post => post.category === category);
  };

  // Buscar posts
  const searchPosts = (query: string) => {
    const publishedPosts = getPublishedPosts();
    if (!query.trim()) return publishedPosts;
    
    const lowercaseQuery = query.toLowerCase();
    return publishedPosts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Incrementar vistas
  const incrementViews = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      updatePost(id, { views: post.views + 1 });
    }
  };

  // Manejar likes/dislikes
  const handleVote = (id: string, type: 'like' | 'dislike') => {
    const post = posts.find(p => p.id === id);
    if (post) {
      if (type === 'like') {
        updatePost(id, { likes: post.likes + 1 });
      } else {
        updatePost(id, { dislikes: post.dislikes + 1 });
      }
    }
  };

  // Obtener estadísticas
  const getStats = () => {
    const publishedPosts = getPublishedPosts();
    return {
      totalPosts: posts.length,
      publishedPosts: publishedPosts.length,
      draftPosts: posts.filter(p => p.status === 'draft').length,
      scheduledPosts: posts.filter(p => p.status === 'scheduled').length,
      totalViews: publishedPosts.reduce((sum, post) => sum + post.views, 0),
      totalLikes: publishedPosts.reduce((sum, post) => sum + post.likes, 0),
      totalDislikes: publishedPosts.reduce((sum, post) => sum + post.dislikes, 0)
    };
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getPublishedPosts,
    getPostsByCategory,
    searchPosts,
    incrementViews,
    handleVote,
    getStats
  };
};
