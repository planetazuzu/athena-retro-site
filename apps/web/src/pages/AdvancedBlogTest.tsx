import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Edit, 
  Search, 
  MessageCircle, 
  Eye, 
  Heart, 
  ThumbsDown, 
  User, 
  Calendar, 
  Tag, 
  Folder, 
  Star, 
  TrendingUp, 
  Plus, 
  Settings, 
  CheckCircle, 
  Clock, 
  Upload, 
  Image, 
  Globe, 
  Filter, 
  SortAsc, 
  SortDesc
} from "lucide-react";
import Navigation from "@/components/Navigation";
import AdvancedBlogEditor from "@/components/blog/AdvancedBlogEditor";
import AdvancedBlogSearch from "@/components/blog/AdvancedBlogSearch";
import AdvancedComments from "@/components/blog/AdvancedComments";
import { useAdvancedBlog, BlogPost } from "@/hooks/useAdvancedBlog";

const AdvancedBlogTest = () => {
  const { 
    getPosts, 
    getBlogStats, 
    categories, 
    tags, 
    isLoading 
  } = useAdvancedBlog();

  const [activeTab, setActiveTab] = useState<'search' | 'editor' | 'comments' | 'demo'>('search');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');

  const stats = getBlogStats();
  const recentPosts = getPosts({ sortBy: 'newest' }).slice(0, 5);

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    setActiveTab('comments');
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setEditorMode('create');
    setActiveTab('editor');
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setEditorMode('edit');
    setActiveTab('editor');
  };

  const handleSavePost = (post: BlogPost) => {
    console.log('Post guardado:', post);
    setActiveTab('search');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)} días`;
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const getTagInfo = (tagId: string) => {
    return tags.find(tag => tag.id === tagId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-terminal mb-4">
            SISTEMA DE BLOG AVANZADO
          </h1>
          <p className="text-xl text-muted-foreground font-terminal max-w-3xl mx-auto">
            Editor avanzado, sistema de comentarios, búsqueda inteligente, 
            subida de imágenes y categorías dinámicas
          </p>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalPosts}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Posts Totales</div>
            </CardContent>
          </Card>
          
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalViews}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Vistas Totales</div>
            </CardContent>
          </Card>
          
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalComments}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Comentarios</div>
            </CardContent>
          </Card>
          
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalLikes}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Likes Totales</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Funcionalidades */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 font-terminal">
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Búsqueda</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Editor</span>
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Comentarios</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Demo</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Búsqueda */}
          <TabsContent value="search" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-primary font-terminal">Búsqueda de Posts</h2>
                <p className="text-muted-foreground font-terminal">Encuentra y explora artículos del blog</p>
              </div>
              <Button className="font-terminal" onClick={handleCreatePost}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Post
              </Button>
            </div>
            
            <AdvancedBlogSearch
              onPostSelect={handlePostSelect}
              showFilters={true}
              showSorting={true}
              showViewToggle={true}
            />
          </TabsContent>

          {/* Tab: Editor */}
          <TabsContent value="editor" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-primary font-terminal">
                  {editorMode === 'create' ? 'Crear Nuevo Post' : 'Editar Post'}
                </h2>
                <p className="text-muted-foreground font-terminal">
                  {editorMode === 'create' 
                    ? 'Crea un nuevo artículo con el editor avanzado' 
                    : 'Edita el contenido del post seleccionado'
                  }
                </p>
              </div>
              <Button 
                variant="outline" 
                className="font-terminal" 
                onClick={() => setActiveTab('search')}
              >
                Volver a Búsqueda
              </Button>
            </div>
            
            <AdvancedBlogEditor
              post={selectedPost || undefined}
              mode={editorMode}
              onSave={handleSavePost}
              onCancel={() => setActiveTab('search')}
            />
          </TabsContent>

          {/* Tab: Comentarios */}
          <TabsContent value="comments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-primary font-terminal">Sistema de Comentarios</h2>
                <p className="text-muted-foreground font-terminal">
                  {selectedPost 
                    ? `Comentarios de: ${selectedPost.title}` 
                    : 'Selecciona un post para ver sus comentarios'
                  }
                </p>
              </div>
              <Button 
                variant="outline" 
                className="font-terminal" 
                onClick={() => setActiveTab('search')}
              >
                Volver a Búsqueda
              </Button>
            </div>
            
            {selectedPost ? (
              <AdvancedComments
                postId={selectedPost.id}
                currentUserId="user_001"
                onReply={(commentId) => console.log('Responder a:', commentId)}
                onEdit={(commentId) => console.log('Editar comentario:', commentId)}
                onDelete={(commentId) => console.log('Eliminar comentario:', commentId)}
                onReport={(commentId) => console.log('Reportar comentario:', commentId)}
              />
            ) : (
              <Card className="terminal-border">
                <CardContent className="text-center py-12">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-terminal text-primary mb-2">
                    Selecciona un post
                  </h3>
                  <p className="text-muted-foreground font-terminal">
                    Ve a la pestaña "Búsqueda" y selecciona un post para ver sus comentarios
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab: Demo */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Características Implementadas */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Características Implementadas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Edit className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Editor Avanzado</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Editor con Markdown, vista previa y herramientas de formato
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Sistema de Comentarios</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Comentarios con threading, likes/dislikes y moderación
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Search className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Búsqueda Avanzada</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Filtros por categoría, autor, fecha y ordenamiento
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Upload className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Subida de Imágenes</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Gestión de imágenes con galería y previsualización
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Tag className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Categorías y Tags</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Sistema dinámico de categorías y etiquetas
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Optimización SEO</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Meta títulos, descripciones y palabras clave
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas del Blog */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Estadísticas del Blog</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {stats.publishedPosts}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">Publicados</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {stats.draftPosts}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">Borradores</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {stats.totalCategories}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">Categorías</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {stats.totalTags}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">Tags</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/20">
                    <h4 className="font-terminal font-bold text-primary mb-3">Promedio de Vistas</h4>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary font-terminal">
                        {stats.averageViewsPerPost}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">
                        vistas por post
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Posts Recientes */}
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Posts Recientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPosts.map((post) => {
                    const category = getCategoryInfo(post.category);
                    return (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-3 hover:bg-primary/5 rounded-lg cursor-pointer transition-colors"
                        onClick={() => handlePostSelect(post)}
                      >
                        <div className="flex items-center space-x-3">
                          {category && (
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                              style={{ backgroundColor: `${category.color}20`, color: category.color }}
                            >
                              {category.icon}
                            </div>
                          )}
                          <div>
                            <h4 className="font-terminal font-bold text-primary">
                              {post.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal">
                              <span>{post.author.name}</span>
                              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                              <span>{post.views} vistas</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.commentsCount}</span>
                          </div>
                          {post.featured && (
                            <Star className="h-3 w-3 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Instrucciones de Uso */}
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Instrucciones de Uso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-terminal font-bold text-primary mb-2">Búsqueda</h4>
                    <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                      <li>• Busca posts por título o contenido</li>
                      <li>• Filtra por categoría y autor</li>
                      <li>• Ordena por diferentes criterios</li>
                      <li>• Cambia entre vista de lista y grid</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-terminal font-bold text-primary mb-2">Editor</h4>
                    <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                      <li>• Crea nuevos posts con Markdown</li>
                      <li>• Sube imágenes y gestiona medios</li>
                      <li>• Configura SEO y metadatos</li>
                      <li>• Vista previa en tiempo real</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-terminal font-bold text-primary mb-2">Comentarios</h4>
                    <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                      <li>• Sistema de comentarios con threading</li>
                      <li>• Likes y dislikes en comentarios</li>
                      <li>• Respuestas anidadas</li>
                      <li>• Moderación y reportes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedBlogTest;
