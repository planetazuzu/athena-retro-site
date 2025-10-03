import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  images: BlogImage[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  dislikes: number;
  commentsCount: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  featured: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  size: number;
  uploadedAt: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  parentId?: string;
  replies: BlogComment[];
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isModerated: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  postCount: number;
  isActive: boolean;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color: string;
  postCount: number;
  isTrending: boolean;
}

export interface BlogSearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'newest' | 'oldest' | 'popular' | 'trending' | 'most_commented';
  featured?: boolean;
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalCategories: number;
  totalTags: number;
  averageViewsPerPost: number;
  mostPopularPost?: BlogPost;
  mostCommentedPost?: BlogPost;
  topCategories: BlogCategory[];
  trendingTags: BlogTag[];
}

export const useAdvancedBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [images, setImages] = useState<BlogImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock categories
    const mockCategories: BlogCategory[] = [
      {
        id: 'cat_001',
        name: 'Desarrollo Web',
        slug: 'desarrollo-web',
        description: 'Artículos sobre desarrollo web, frameworks y tecnologías',
        color: '#3B82F6',
        icon: '💻',
        postCount: 8,
        isActive: true
      },
      {
        id: 'cat_002',
        name: 'Diseño UI/UX',
        slug: 'diseno-ui-ux',
        description: 'Diseño de interfaces y experiencia de usuario',
        color: '#8B5CF6',
        icon: '🎨',
        postCount: 5,
        isActive: true
      },
      {
        id: 'cat_003',
        name: 'Tecnología Retro',
        slug: 'tecnologia-retro',
        description: 'Todo sobre tecnología vintage y retro',
        color: '#10B981',
        icon: '🕹️',
        postCount: 12,
        isActive: true
      },
      {
        id: 'cat_004',
        name: 'Tutoriales',
        slug: 'tutoriales',
        description: 'Guías paso a paso y tutoriales detallados',
        color: '#F59E0B',
        icon: '📚',
        postCount: 15,
        isActive: true
      }
    ];

    // Mock tags
    const mockTags: BlogTag[] = [
      { id: 'tag_001', name: 'React', slug: 'react', color: '#61DAFB', postCount: 6, isTrending: true },
      { id: 'tag_002', name: 'TypeScript', slug: 'typescript', color: '#3178C6', postCount: 4, isTrending: true },
      { id: 'tag_003', name: 'Tailwind CSS', slug: 'tailwind-css', color: '#06B6D4', postCount: 5, isTrending: false },
      { id: 'tag_004', name: 'Vite', slug: 'vite', color: '#646CFF', postCount: 3, isTrending: false },
      { id: 'tag_005', name: 'Retro Design', slug: 'retro-design', color: '#00FF00', postCount: 8, isTrending: true },
      { id: 'tag_006', name: 'CSS Grid', slug: 'css-grid', color: '#FF6B6B', postCount: 2, isTrending: false },
      { id: 'tag_007', name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', postCount: 7, isTrending: true },
      { id: 'tag_008', name: 'Web Development', slug: 'web-development', color: '#4ECDC4', postCount: 10, isTrending: false }
    ];

    // Mock images
    const mockImages: BlogImage[] = [
      {
        id: 'img_001',
        url: 'https://via.placeholder.com/800x400/00ff00/000000?text=Retro+Design',
        alt: 'Diseño retro con colores neón',
        caption: 'Ejemplo de diseño retro con efectos de glow',
        width: 800,
        height: 400,
        size: 125000,
        uploadedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'img_002',
        url: 'https://via.placeholder.com/600x300/ff00ff/ffffff?text=React+Components',
        alt: 'Componentes de React',
        caption: 'Estructura de componentes en React',
        width: 600,
        height: 300,
        size: 89000,
        uploadedAt: '2024-01-20T14:30:00Z'
      }
    ];

    // Mock blog posts
    const mockPosts: BlogPost[] = [
      {
        id: 'post_001',
        title: 'Sistema de Donaciones Avanzado - Nueva Funcionalidad',
        content: `# Sistema de Donaciones Avanzado

Hemos implementado un sistema completo de donaciones que incluye:

## Características Principales

- **Metas de Financiamiento**: Crea objetivos específicos con fechas límite
- **Sistema de Recompensas**: Beneficios por nivel de donación
- **Badges Únicos**: Sistema de logros con rarezas
- **Transparencia Total**: Todas las donaciones son públicas

## Cómo Funciona

1. Los administradores crean metas de financiamiento
2. Los usuarios pueden donar y seleccionar recompensas
3. Se desbloquean badges según el progreso
4. El sistema mantiene transparencia total

¡Prueba el sistema en la página de donaciones!`,
        excerpt: 'Hemos implementado un sistema completo de donaciones con metas, recompensas y badges únicos.',
        author: {
          id: 'user_001',
          name: 'Plane Tazuzu',
          username: 'planetazuzu',
          avatar: 'https://via.placeholder.com/40/00ff00/000000?text=PT'
        },
        category: 'cat_001',
        tags: ['tag_001', 'tag_002', 'tag_005'],
        images: [mockImages[0]],
        status: 'published',
        publishedAt: '2024-03-15T09:00:00Z',
        createdAt: '2024-03-15T08:30:00Z',
        updatedAt: '2024-03-15T09:00:00Z',
        views: 1250,
        likes: 89,
        dislikes: 2,
        commentsCount: 23,
        featured: true,
        seo: {
          metaTitle: 'Sistema de Donaciones Avanzado - Athena Retro Site',
          metaDescription: 'Nuevo sistema de donaciones con metas, recompensas y badges únicos',
          keywords: ['donaciones', 'financiamiento', 'badges', 'recompensas']
        }
      },
      {
        id: 'post_002',
        title: 'Diseño Retro-Terminal: Guía Completa',
        content: `# Diseño Retro-Terminal: Guía Completa

El diseño retro-terminal combina la estética de los años 80 con la funcionalidad moderna.

## Elementos Clave

### Colores
- Verde neón (#00FF00) para el texto principal
- Negro profundo (#000000) para el fondo
- Grises para elementos secundarios

### Tipografía
- Fuentes monospace para autenticidad
- Efectos de glow en elementos importantes
- Scanlines para simular CRT

### Efectos Visuales
- Glow en botones y enlaces
- Scanlines animadas
- Efectos de parpadeo en el cursor

## Implementación

\`\`\`css
.terminal-glow {
  text-shadow: 0 0 10px #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}
\`\`\`

¡Experimenta con estos elementos para crear tu propio diseño retro!`,
        excerpt: 'Aprende a crear diseños retro-terminal auténticos con esta guía completa.',
        author: {
          id: 'user_001',
          name: 'Plane Tazuzu',
          username: 'planetazuzu',
          avatar: 'https://via.placeholder.com/40/00ff00/000000?text=PT'
        },
        category: 'cat_002',
        tags: ['tag_003', 'tag_005', 'tag_006'],
        images: [mockImages[1]],
        status: 'published',
        publishedAt: '2024-03-10T14:00:00Z',
        createdAt: '2024-03-10T13:30:00Z',
        updatedAt: '2024-03-10T14:00:00Z',
        views: 890,
        likes: 67,
        dislikes: 1,
        commentsCount: 15,
        featured: false,
        seo: {
          metaTitle: 'Diseño Retro-Terminal: Guía Completa - Athena Retro Site',
          metaDescription: 'Aprende a crear diseños retro-terminal auténticos con efectos de glow y scanlines',
          keywords: ['diseño', 'retro', 'terminal', 'css', 'glow']
        }
      },
      {
        id: 'post_003',
        title: 'React 18: Nuevas Características y Mejoras',
        content: `# React 18: Nuevas Características y Mejoras

React 18 introduce características revolucionarias que mejoran el rendimiento y la experiencia del desarrollador.

## Características Principales

### Concurrent Features
- **Automatic Batching**: Mejora el rendimiento automáticamente
- **Suspense**: Mejor manejo de estados de carga
- **Transitions**: Actualizaciones no urgentes

### Nuevos Hooks
- **useId**: Genera IDs únicos
- **useDeferredValue**: Diferir actualizaciones
- **useTransition**: Marcar actualizaciones como transiciones

## Migración

La migración a React 18 es gradual y compatible con versiones anteriores.

\`\`\`bash
npm install react@18 react-dom@18
\`\`\`

¡Actualiza tu proyecto y aprovecha estas nuevas características!`,
        excerpt: 'Descubre las nuevas características de React 18 y cómo migrar tu proyecto.',
        author: {
          id: 'user_002',
          name: 'Retro Developer',
          username: 'retrodev',
          avatar: 'https://via.placeholder.com/40/ff00ff/ffffff?text=RD'
        },
        category: 'cat_001',
        tags: ['tag_001', 'tag_002', 'tag_007'],
        images: [],
        status: 'published',
        publishedAt: '2024-03-05T11:00:00Z',
        createdAt: '2024-03-05T10:30:00Z',
        updatedAt: '2024-03-05T11:00:00Z',
        views: 2100,
        likes: 156,
        dislikes: 3,
        commentsCount: 34,
        featured: true,
        seo: {
          metaTitle: 'React 18: Nuevas Características y Mejoras - Athena Retro Site',
          metaDescription: 'Descubre las nuevas características de React 18 y cómo migrar tu proyecto',
          keywords: ['react', 'react18', 'javascript', 'frontend', 'hooks']
        }
      }
    ];

    // Mock comments
    const mockComments: BlogComment[] = [
      {
        id: 'comment_001',
        postId: 'post_001',
        author: {
          id: 'user_002',
          name: 'Retro Developer',
          username: 'retrodev',
          avatar: 'https://via.placeholder.com/40/ff00ff/ffffff?text=RD'
        },
        content: '¡Increíble implementación! Me encanta el sistema de badges. ¿Planean agregar más tipos de recompensas?',
        likes: 12,
        dislikes: 0,
        createdAt: '2024-03-15T10:30:00Z',
        updatedAt: '2024-03-15T10:30:00Z',
        isEdited: false,
        isModerated: false,
        replies: [
          {
            id: 'comment_002',
            postId: 'post_001',
            author: {
              id: 'user_001',
              name: 'Plane Tazuzu',
              username: 'planetazuzu',
              avatar: 'https://via.placeholder.com/40/00ff00/000000?text=PT'
            },
            content: '¡Gracias! Sí, estamos trabajando en recompensas físicas y acceso temprano a nuevas funcionalidades.',
            parentId: 'comment_001',
            likes: 8,
            dislikes: 0,
            createdAt: '2024-03-15T11:00:00Z',
            updatedAt: '2024-03-15T11:00:00Z',
            isEdited: false,
            isModerated: false,
            replies: []
          }
        ]
      },
      {
        id: 'comment_003',
        postId: 'post_002',
        author: {
          id: 'user_003',
          name: 'Design Enthusiast',
          username: 'designer',
          avatar: 'https://via.placeholder.com/40/00ffff/000000?text=DE'
        },
        content: 'Excelente guía. ¿Podrías compartir más ejemplos de efectos de glow?',
        likes: 5,
        dislikes: 0,
        createdAt: '2024-03-10T15:30:00Z',
        updatedAt: '2024-03-10T15:30:00Z',
        isEdited: false,
        isModerated: false,
        replies: []
      }
    ];

    setCategories(mockCategories);
    setTags(mockTags);
    setImages(mockImages);
    setPosts(mockPosts);
    setComments(mockComments);
    setIsLoading(false);
  };

  // Obtener posts con filtros
  const getPosts = (filters?: BlogSearchFilters): BlogPost[] => {
    let filteredPosts = [...posts];

    if (filters) {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tagId => {
            const tag = tags.find(t => t.id === tagId);
            return tag?.name.toLowerCase().includes(query);
          })
        );
      }

      if (filters.category) {
        filteredPosts = filteredPosts.filter(post => post.category === filters.category);
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredPosts = filteredPosts.filter(post =>
          filters.tags!.some(tagId => post.tags.includes(tagId))
        );
      }

      if (filters.author) {
        filteredPosts = filteredPosts.filter(post => post.author.id === filters.author);
      }

      if (filters.dateFrom) {
        filteredPosts = filteredPosts.filter(post =>
          new Date(post.publishedAt || post.createdAt) >= new Date(filters.dateFrom!)
        );
      }

      if (filters.dateTo) {
        filteredPosts = filteredPosts.filter(post =>
          new Date(post.publishedAt || post.createdAt) <= new Date(filters.dateTo!)
        );
      }

      if (filters.featured !== undefined) {
        filteredPosts = filteredPosts.filter(post => post.featured === filters.featured);
      }

      // Ordenamiento
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'newest':
            filteredPosts.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
            break;
          case 'oldest':
            filteredPosts.sort((a, b) => new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime());
            break;
          case 'popular':
            filteredPosts.sort((a, b) => b.views - a.views);
            break;
          case 'trending':
            filteredPosts.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
            break;
          case 'most_commented':
            filteredPosts.sort((a, b) => b.commentsCount - a.commentsCount);
            break;
        }
      }
    }

    return filteredPosts;
  };

  // Obtener post por ID
  const getPost = (postId: string): BlogPost | null => {
    return posts.find(post => post.id === postId) || null;
  };

  // Crear nuevo post
  const createPost = async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'dislikes' | 'commentsCount'>): Promise<{ success: boolean; post?: BlogPost; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost: BlogPost = {
          ...postData,
          id: `post_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 0,
          likes: 0,
          dislikes: 0,
          commentsCount: 0
        };

        setPosts(prev => [newPost, ...prev]);
        resolve({ success: true, post: newPost });
      }, 1500);
    });
  };

  // Actualizar post
  const updatePost = async (postId: string, updates: Partial<BlogPost>): Promise<{ success: boolean; post?: BlogPost; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, ...updates, updatedAt: new Date().toISOString() }
            : post
        ));
        
        const updatedPost = posts.find(p => p.id === postId);
        resolve({ success: true, post: updatedPost });
      }, 1000);
    });
  };

  // Eliminar post
  const deletePost = async (postId: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPosts(prev => prev.filter(post => post.id !== postId));
        setComments(prev => prev.filter(comment => comment.postId !== postId));
        resolve({ success: true });
      }, 1000);
    });
  };

  // Incrementar vistas
  const incrementViews = async (postId: string): Promise<void> => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, views: post.views + 1 }
        : post
    ));
  };

  // Like/Dislike post
  const togglePostReaction = async (postId: string, userId: string, type: 'like' | 'dislike'): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPosts(prev => prev.map(post => {
          if (post.id === postId) {
            const isLiked = post.isLiked;
            const isDisliked = post.isDisliked;
            
            let newLikes = post.likes;
            let newDislikes = post.dislikes;
            let newIsLiked = isLiked;
            let newIsDisliked = isDisliked;

            if (type === 'like') {
              if (isLiked) {
                newLikes--;
                newIsLiked = false;
              } else {
                if (isDisliked) {
                  newDislikes--;
                  newIsDisliked = false;
                }
                newLikes++;
                newIsLiked = true;
              }
            } else {
              if (isDisliked) {
                newDislikes--;
                newIsDisliked = false;
              } else {
                if (isLiked) {
                  newLikes--;
                  newIsLiked = false;
                }
                newDislikes++;
                newIsDisliked = true;
              }
            }

            return {
              ...post,
              likes: newLikes,
              dislikes: newDislikes,
              isLiked: newIsLiked,
              isDisliked: newIsDisliked
            };
          }
          return post;
        }));
        resolve({ success: true });
      }, 500);
    });
  };

  // Obtener comentarios de un post
  const getPostComments = (postId: string): BlogComment[] => {
    return comments.filter(comment => comment.postId === postId && !comment.parentId);
  };

  // Crear comentario
  const createComment = async (commentData: Omit<BlogComment, 'id' | 'createdAt' | 'updatedAt' | 'isEdited' | 'isModerated' | 'replies'>): Promise<{ success: boolean; comment?: BlogComment; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment: BlogComment = {
          ...commentData,
          id: `comment_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isEdited: false,
          isModerated: false,
          replies: []
        };

        setComments(prev => [...prev, newComment]);
        
        // Actualizar contador de comentarios del post
        setPosts(prev => prev.map(post => 
          post.id === commentData.postId 
            ? { ...post, commentsCount: post.commentsCount + 1 }
            : post
        ));

        resolve({ success: true, comment: newComment });
      }, 1000);
    });
  };

  // Like/Dislike comentario
  const toggleCommentReaction = async (commentId: string, userId: string, type: 'like' | 'dislike'): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setComments(prev => prev.map(comment => {
          if (comment.id === commentId) {
            const isLiked = comment.isLiked;
            const isDisliked = comment.isDisliked;
            
            let newLikes = comment.likes;
            let newDislikes = comment.dislikes;
            let newIsLiked = isLiked;
            let newIsDisliked = isDisliked;

            if (type === 'like') {
              if (isLiked) {
                newLikes--;
                newIsLiked = false;
              } else {
                if (isDisliked) {
                  newDislikes--;
                  newIsDisliked = false;
                }
                newLikes++;
                newIsLiked = true;
              }
            } else {
              if (isDisliked) {
                newDislikes--;
                newIsDisliked = false;
              } else {
                if (isLiked) {
                  newLikes--;
                  newIsLiked = false;
                }
                newDislikes++;
                newIsDisliked = true;
              }
            }

            return {
              ...comment,
              likes: newLikes,
              dislikes: newDislikes,
              isLiked: newIsLiked,
              isDisliked: newIsDisliked
            };
          }
          return comment;
        }));
        resolve({ success: true });
      }, 500);
    });
  };

  // Subir imagen
  const uploadImage = async (file: File): Promise<{ success: boolean; image?: BlogImage; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newImage: BlogImage = {
          id: `img_${Date.now()}`,
          url: URL.createObjectURL(file),
          alt: file.name,
          width: 800,
          height: 600,
          size: file.size,
          uploadedAt: new Date().toISOString()
        };

        setImages(prev => [...prev, newImage]);
        resolve({ success: true, image: newImage });
      }, 2000);
    });
  };

  // Obtener estadísticas
  const getBlogStats = (): BlogStats => {
    const publishedPosts = posts.filter(post => post.status === 'published');
    const totalViews = posts.reduce((acc, post) => acc + post.views, 0);
    const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);
    const totalComments = posts.reduce((acc, post) => acc + post.commentsCount, 0);

    const mostPopularPost = posts.reduce((prev, current) => 
      (prev.views > current.views) ? prev : current
    );

    const mostCommentedPost = posts.reduce((prev, current) => 
      (prev.commentsCount > current.commentsCount) ? prev : current
    );

    const topCategories = categories
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);

    const trendingTags = tags
      .filter(tag => tag.isTrending)
      .sort((a, b) => b.postCount - a.postCount);

    return {
      totalPosts: posts.length,
      publishedPosts: publishedPosts.length,
      draftPosts: posts.filter(post => post.status === 'draft').length,
      totalViews,
      totalLikes,
      totalComments,
      totalCategories: categories.length,
      totalTags: tags.length,
      averageViewsPerPost: publishedPosts.length > 0 ? Math.round(totalViews / publishedPosts.length) : 0,
      mostPopularPost,
      mostCommentedPost,
      topCategories,
      trendingTags
    };
  };

  return {
    posts,
    comments,
    categories,
    tags,
    images,
    isLoading,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    incrementViews,
    togglePostReaction,
    getPostComments,
    createComment,
    toggleCommentReaction,
    uploadImage,
    getBlogStats
  };
};
