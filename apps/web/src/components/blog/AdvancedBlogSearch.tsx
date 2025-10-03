import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  User,
  Clock,
  TrendingUp,
  Star,
  Eye
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  category: string;
  readTime: number;
  views: number;
  featured: boolean;
}

interface AdvancedBlogSearchProps {
  posts?: BlogPost[];
  onSearch?: (query: string, filters: SearchFilters) => void;
  onPostSelect?: (post: BlogPost) => void;
}

interface SearchFilters {
  tags: string[];
  category: string;
  author: string;
  dateRange: string;
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending';
}

const AdvancedBlogSearch = ({ posts = [], onSearch, onPostSelect }: AdvancedBlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    tags: [],
    category: '',
    author: '',
    dateRange: '',
    sortBy: 'newest'
  });
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [showFilters, setShowFilters] = useState(false);

  // Datos de ejemplo si no se proporcionan
  useEffect(() => {
    if (posts.length === 0) {
      const samplePosts: BlogPost[] = [
        {
          id: '1',
          title: 'Bienvenido a Athena Pocket',
          slug: 'bienvenido-athena-pocket',
          excerpt: 'Descubre las funcionalidades de supervivencia con IA que te ayudarán en cualquier situación.',
          author: 'Administrador',
          publishedAt: new Date('2024-01-15'),
          tags: ['supervivencia', 'ia', 'guia'],
          category: 'Tutoriales',
          readTime: 5,
          views: 1250,
          featured: true
        },
        {
          id: '2',
          title: 'Primeros Pasos en Supervivencia',
          slug: 'primeros-pasos-supervivencia',
          excerpt: 'Aprende los conceptos básicos para mantenerte seguro en cualquier situación de emergencia.',
          author: 'Administrador',
          publishedAt: new Date('2024-01-20'),
          tags: ['supervivencia', 'basico', 'emergencia'],
          category: 'Tutoriales',
          readTime: 8,
          views: 890,
          featured: false
        },
        {
          id: '3',
          title: 'Actualización v1.2.0',
          slug: 'actualizacion-v1-2-0',
          excerpt: 'Nuevas funcionalidades y mejoras en la aplicación de supervivencia.',
          author: 'Equipo Dev',
          publishedAt: new Date('2024-02-01'),
          tags: ['actualizacion', 'novedades', 'app'],
          category: 'Noticias',
          readTime: 3,
          views: 2100,
          featured: true
        }
      ];
      setFilteredPosts(samplePosts);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts]);

  const availableTags = [...new Set(filteredPosts.flatMap(post => post.tags))];
  const availableCategories = [...new Set(filteredPosts.map(post => post.category))];
  const availableAuthors = [...new Set(filteredPosts.map(post => post.author))];

  const handleSearch = () => {
    let filtered = [...filteredPosts];

    // Filtrar por texto de búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filtrar por tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(post => 
        filters.tags.some(tag => post.tags.includes(tag))
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Filtrar por autor
    if (filters.author) {
      filtered = filtered.filter(post => post.author === filters.author);
    }

    // Filtrar por rango de fechas
    if (filters.dateRange) {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(post => post.publishedAt >= cutoffDate);
    }

    // Ordenar
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'trending':
        // Combinar views y fecha reciente para trending
        filtered.sort((a, b) => {
          const scoreA = a.views / (Date.now() - a.publishedAt.getTime());
          const scoreB = b.views / (Date.now() - b.publishedAt.getTime());
          return scoreB - scoreA;
        });
        break;
    }

    setFilteredPosts(filtered);
    onSearch?.(searchQuery, filters);
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const clearFilters = () => {
    setFilters({
      tags: [],
      category: '',
      author: '',
      dateRange: '',
      sortBy: 'newest'
    });
    setSearchQuery('');
    setFilteredPosts(posts);
  };

  useEffect(() => {
    handleSearch();
  }, [filters, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Búsqueda Avanzada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar posts, autores, tags..."
                className="pl-10 font-terminal"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="font-terminal"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Filtros avanzados */}
          {showFilters && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-terminal text-primary">Categoría</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded-sm bg-background font-terminal"
                  >
                    <option value="">Todas las categorías</option>
                    {availableCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-terminal text-primary">Autor</label>
                  <select
                    value={filters.author}
                    onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded-sm bg-background font-terminal"
                  >
                    <option value="">Todos los autores</option>
                    {availableAuthors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-terminal text-primary">Fecha</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded-sm bg-background font-terminal"
                  >
                    <option value="">Todas las fechas</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                    <option value="year">Último año</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-terminal text-primary">Ordenar por</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="w-full mt-1 p-2 border rounded-sm bg-background font-terminal"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="oldest">Más antiguos</option>
                    <option value="popular">Más populares</option>
                    <option value="trending">Tendencia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-terminal text-primary mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer font-terminal"
                      onClick={() => toggleTag(tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={clearFilters} variant="outline" className="font-terminal">
                  Limpiar Filtros
                </Button>
                <div className="text-sm font-terminal text-muted-foreground">
                  {filteredPosts.length} posts encontrados
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPostSelect?.(post)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold font-terminal text-primary">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <Badge variant="default" className="bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Destacado
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground font-terminal mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm font-terminal text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.publishedAt.toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime} min
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-terminal text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Badge variant="outline" className="font-terminal">
                  {post.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold font-terminal text-primary mb-2">
              No se encontraron posts
            </h3>
            <p className="text-muted-foreground font-terminal">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedBlogSearch;
