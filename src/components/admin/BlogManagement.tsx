import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Heart,
  MessageSquare,
  Calendar,
  Tag,
  User,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  publishDate?: string;
  featured: boolean;
}

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Simular datos de posts
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Introducción a Athena Pocket',
        excerpt: 'Descubre las características principales de nuestra nueva aplicación...',
        status: 'published',
        author: 'Administrador',
        category: 'Tutoriales',
        tags: ['introducción', 'características', 'guía'],
        views: 1250,
        likes: 89,
        dislikes: 3,
        comments: 15,
        createdAt: '2024-08-15T10:00:00Z',
        updatedAt: '2024-08-20T14:30:00Z',
        publishDate: '2024-08-15T10:00:00Z',
        featured: true
      },
      {
        id: '2',
        title: 'Configuración Avanzada',
        excerpt: 'Aprende a configurar Athena Pocket para obtener el máximo rendimiento...',
        status: 'published',
        author: 'Administrador',
        category: 'Tutoriales',
        tags: ['configuración', 'rendimiento', 'optimización'],
        views: 890,
        likes: 67,
        dislikes: 1,
        comments: 8,
        createdAt: '2024-08-20T09:00:00Z',
        updatedAt: '2024-08-25T11:15:00Z',
        publishDate: '2024-08-20T09:00:00Z',
        featured: false
      },
      {
        id: '3',
        title: 'Nuevas Funcionalidades',
        excerpt: 'Descubre las últimas actualizaciones y nuevas características...',
        status: 'draft',
        author: 'Administrador',
        category: 'Noticias',
        tags: ['actualizaciones', 'nuevas características', 'mejoras'],
        views: 0,
        likes: 0,
        dislikes: 0,
        comments: 0,
        createdAt: '2024-08-28T16:00:00Z',
        updatedAt: '2024-08-28T16:00:00Z',
        featured: false
      },
      {
        id: '4',
        title: 'Guía de Solución de Problemas',
        excerpt: 'Soluciona los problemas más comunes de Athena Pocket...',
        status: 'scheduled',
        author: 'Administrador',
        category: 'Soporte',
        tags: ['solución de problemas', 'soporte', 'ayuda'],
        views: 0,
        likes: 0,
        dislikes: 0,
        comments: 0,
        createdAt: '2024-08-29T12:00:00Z',
        updatedAt: '2024-08-29T12:00:00Z',
        publishDate: '2024-09-05T10:00:00Z',
        featured: false
      }
    ];
    
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  // Filtrar posts
  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, statusFilter, categoryFilter]);

  const handleStatusChange = (postId: string, newStatus: 'draft' | 'published' | 'scheduled') => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, status: newStatus } : post
    ));
  };

  const handleFeaturedChange = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, featured: !post.featured } : post
    ));
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Publicado</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Borrador</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Programado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Tutoriales': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'Noticias': 'bg-green-500/10 text-green-400 border-green-500/30',
      'Soporte': 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    };
    
    return (
      <Badge className={colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-400 border-gray-500/30'}>
        {category}
      </Badge>
    );
  };

  const calculateStats = () => {
    const published = posts.filter(p => p.status === 'published');
    const totalViews = published.reduce((sum, p) => sum + p.views, 0);
    const totalLikes = published.reduce((sum, p) => sum + p.likes, 0);
    const totalComments = published.reduce((sum, p) => sum + p.comments, 0);
    
    return { published: published.length, totalViews, totalLikes, totalComments };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold font-terminal">GESTIÓN DEL BLOG</h2>
        </div>
        <Button className="font-terminal">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Post
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-terminal"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los estados</option>
              <option value="published">Publicados</option>
              <option value="draft">Borradores</option>
              <option value="scheduled">Programados</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todas las categorías</option>
              <option value="Tutoriales">Tutoriales</option>
              <option value="Noticias">Noticias</option>
              <option value="Soporte">Soporte</option>
            </select>

            <div className="text-sm text-muted-foreground font-terminal flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {filteredPosts.length} posts encontrados
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas del Blog */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>ESTADÍSTICAS DEL BLOG</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.published}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Posts Publicados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalViews}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Total de Vistas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalLikes}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Total de Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalComments}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Total de Comentarios</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="terminal-border hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold font-terminal text-primary">{post.title}</h3>
                      {getStatusBadge(post.status)}
                      {getCategoryBadge(post.category)}
                      {post.featured && (
                        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Creado: {new Date(post.createdAt).toLocaleDateString('es-ES')}</span>
                      </div>
                      {post.publishDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Publicar: {new Date(post.publishDate).toLocaleDateString('es-ES')}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-terminal max-w-2xl">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views} vistas</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.comments} comentarios</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-3 w-3" />
                        <span>{post.tags.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="font-terminal">
                    <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'published')}>
                      <Eye className="h-4 w-4 mr-2" />
                      Publicar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'draft')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Marcar como borrador
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(post.id, 'scheduled')}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Programar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFeaturedChange(post.id)}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {post.featured ? 'Quitar destacado' : 'Marcar como destacado'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeletePost(post.id)} className="text-red-400">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
