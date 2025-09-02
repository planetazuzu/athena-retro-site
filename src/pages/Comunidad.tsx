import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import NewDiscussionModal from "@/components/NewDiscussionModal";
import DiscussionDetail from "@/components/DiscussionDetail";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Shield, 
  Heart, 
  Globe,
  Search,
  Filter,
  Plus,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Comunidad = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'recientes' | 'respuestas' | 'vistas'>('recientes');
  const [stats, setStats] = useState({
    members: 1247,
    discussions: 3891,
    events: 24,
    countries: 67
  });
  const [moderationIndex, setModerationIndex] = useState<Record<string, { hidden: number; reported: number }>>({});
  const [adminFilter, setAdminFilter] = useState<'todas' | 'reportadas' | 'ocultas'>('todas');
  const { isAdmin } = useAuth();

  // Cargar discusiones existentes al montar el componente
  useEffect(() => {
    const savedDiscussions = localStorage.getItem('athena_discussions');
    if (savedDiscussions) {
      const parsed = JSON.parse(savedDiscussions);
      setDiscussions(parsed);
      setStats(prev => ({ ...prev, discussions: parsed.length }));
    }
  }, []);

  // Construir índice de moderación por discusión (solo admin)
  useEffect(() => {
    try {
      const storedReplies = localStorage.getItem('athena_replies');
      if (!storedReplies) {
        setModerationIndex({});
        return;
      }
      const replies = JSON.parse(storedReplies) as Array<any>;
      const index: Record<string, { hidden: number; reported: number }> = {};
      for (const r of replies) {
        const key = r.discussionId;
        if (!index[key]) index[key] = { hidden: 0, reported: 0 };
        if (r.isHidden) index[key].hidden += 1;
        if (r.isReported) index[key].reported += 1;
      }
      setModerationIndex(index);
    } catch (e) {
      setModerationIndex({});
    }
  }, [selectedDiscussion, discussions]);

  // Función para crear nueva discusión
  const handleCreateDiscussion = async (discussionData: any) => {
    const newDiscussion = {
      id: `disc-${Date.now()}`,
      ...discussionData,
      author: 'Usuario_Actual', // En producción sería el usuario autenticado
      replies: 0,
      views: 0,
      lastActivity: 'Ahora',
      createdAt: new Date().toISOString(),
      isNew: true
    };

    const updatedDiscussions = [newDiscussion, ...discussions];
    setDiscussions(updatedDiscussions);
    setStats(prev => ({ ...prev, discussions: updatedDiscussions.length }));
    
    // Guardar en localStorage
    localStorage.setItem('athena_discussions', JSON.stringify(updatedDiscussions));
    
    console.log('✅ Nueva discusión creada:', newDiscussion);
  };

  // Función para manejar respuestas
  const handleReply = async (content: string) => {
    if (!selectedDiscussion) return;

    // Actualizar contador de respuestas
    const updatedDiscussions = discussions.map(disc => {
      if (disc.id === selectedDiscussion.id) {
        const updated = { ...disc, replies: (disc.replies || 0) + 1, lastActivity: 'Ahora' };
        return updated;
      }
      return disc;
    });
    
    setDiscussions(updatedDiscussions);
    localStorage.setItem('athena_discussions', JSON.stringify(updatedDiscussions));
  };

  // Función para volver al listado
  const handleBackToList = () => {
    setSelectedDiscussion(null);
  };

  // Función para abrir detalle de discusión
  const handleOpenDiscussion = (discussion: any) => {
    // Incrementar vistas y obtener el objeto actualizado
    const updatedDiscussions = discussions.map(disc => {
      if (disc.id === discussion.id) {
        return { ...disc, views: (disc.views || 0) + 1 };
      }
      return disc;
    });
    
    setDiscussions(updatedDiscussions);
    localStorage.setItem('athena_discussions', JSON.stringify(updatedDiscussions));
    
    const fresh = updatedDiscussions.find(d => d.id === discussion.id) || discussion;
    setSelectedDiscussion(fresh);
  };

  // Filtrar discusiones por búsqueda y categoría
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || discussion.category === selectedCategory;
    // Filtro admin
    const mod = moderationIndex[discussion.id] || { hidden: 0, reported: 0 };
    const matchesAdminFilter = !isAdmin || adminFilter === 'todas' ||
      (adminFilter === 'reportadas' && mod.reported > 0) ||
      (adminFilter === 'ocultas' && mod.hidden > 0);

    return matchesSearch && matchesCategory && matchesAdminFilter;
  });

  // Ordenar según criterio
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (sortBy === 'recientes') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'respuestas') {
      return (b.replies || 0) - (a.replies || 0);
    }
    // vistas
    return (b.views || 0) - (a.views || 0);
  });

  // Si hay una discusión seleccionada, mostrar el detalle
  if (selectedDiscussion) {
    return (
      <DiscussionDetail
        discussion={selectedDiscussion}
        onBack={handleBackToList}
        onReply={handleReply}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              COMUNIDAD ATHENA POCKET
            </h1>
            <p className="text-xl text-muted-foreground font-terminal max-w-2xl mx-auto">
              Conecta con otros entusiastas de la supervivencia y comparte conocimientos
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="terminal-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-terminal text-muted-foreground">Miembros</p>
                    <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                      {stats.members.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-terminal text-muted-foreground">Discusiones</p>
                    <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                      {stats.discussions.toLocaleString()}
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-terminal text-muted-foreground">Eventos</p>
                    <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                      {stats.events}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-terminal text-muted-foreground">Países</p>
                    <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                      {stats.countries}
                    </p>
                  </div>
                  <Globe className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar discusiones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-terminal"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-background border border-primary/20 text-primary font-terminal px-3 py-2 rounded-sm"
              >
                <option value="todos">TODAS LAS CATEGORÍAS</option>
                <option value="supervivencia">SUPERVIVENCIA GENERAL</option>
                <option value="primeros-auxilios">PRIMEROS AUXILIOS</option>
                <option value="navegacion">NAVEGACIÓN Y ORIENTACIÓN</option>
                <option value="equipamiento">EQUIPAMIENTO Y REVIEWS</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground font-terminal">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-background border border-primary/20 text-primary font-terminal px-3 py-2 rounded-sm"
              >
                <option value="recientes">Más recientes</option>
                <option value="respuestas">Más respuestas</option>
                <option value="vistas">Más vistas</option>
              </select>
            </div>
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground font-terminal">Moderación:</span>
                <select
                  value={adminFilter}
                  onChange={(e) => setAdminFilter(e.target.value as any)}
                  className="bg-background border border-primary/20 text-primary font-terminal px-3 py-2 rounded-sm"
                >
                  <option value="todas">Todas</option>
                  <option value="reportadas">Solo reportadas</option>
                  <option value="ocultas">Solo ocultas</option>
                </select>
              </div>
            )}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="font-terminal glow-effect"
            >
              <Plus className="h-4 w-4 mr-2" />
              NUEVA DISCUSIÓN
            </Button>
          </div>

          {/* Forum Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="terminal-card">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>SUPERVIVENCIA GENERAL</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-terminal text-sm mb-4">
                  Técnicas básicas, refugios, fuego y agua
                </p>
                <div className="flex items-center justify-between text-sm font-terminal">
                  <span className="text-muted-foreground">1,234 temas</span>
                  <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                    ACTIVO
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>PRIMEROS AUXILIOS</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-terminal text-sm mb-4">
                  Medicina de emergencia y atención médica
                </p>
                <div className="flex items-center justify-between text-sm font-terminal">
                  <span className="text-muted-foreground">567 temas</span>
                  <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                    ACTIVO
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>NAVEGACIÓN Y ORIENTACIÓN</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-terminal text-sm mb-4">
                  Mapas, brújulas, GPS y técnicas de orientación
                </p>
                <div className="flex items-center justify-between text-sm font-terminal">
                  <span className="text-muted-foreground">789 temas</span>
                  <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                    ACTIVO
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>EQUIPAMIENTO Y REVIEWS</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-terminal text-sm mb-4">
                  Reseñas de equipos, recomendaciones y comparativas
                </p>
                <div className="flex items-center justify-between text-sm font-terminal">
                  <span className="text-muted-foreground">456 temas</span>
                  <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                    ACTIVO
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Discussions */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">DISCUSIONES RECIENTES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedDiscussions.length > 0 ? (
                  sortedDiscussions.map((discussion, index) => (
                    <div 
                      key={index} 
                      className="border-b border-primary/10 pb-4 last:border-b-0 hover:bg-primary/5 p-3 rounded-sm transition-colors cursor-pointer"
                      onClick={() => handleOpenDiscussion(discussion)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-terminal font-medium text-primary hover:text-primary-glow cursor-pointer">
                            {discussion.title}
                          </h4>
                          <p className="text-muted-foreground font-terminal text-sm mt-2 line-clamp-2">
                            {discussion.content.substring(0, 150)}...
                          </p>
                          <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground font-terminal">
                            <span>por {discussion.author}</span>
                            <span>{discussion.replies || 0} respuestas</span>
                            <span>{discussion.views || 0} vistas</span>
                            <span>{discussion.lastActivity}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal text-xs">
                              {discussion.category}
                            </Badge>
                            {discussion.tags && discussion.tags.map((tag: string, tagIndex: number) => (
                              <Badge key={tagIndex} variant="outline" className="bg-primary/5 border-primary/20 text-primary/70 font-terminal text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {/* Indicadores de moderación solo para admin */}
                            {isAdmin && moderationIndex[discussion.id] && (
                              <>
                                {moderationIndex[discussion.id].reported > 0 && (
                                  <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 font-terminal text-xs">
                                    {moderationIndex[discussion.id].reported} reportadas
                                  </Badge>
                                )}
                                {moderationIndex[discussion.id].hidden > 0 && (
                                  <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400 font-terminal text-xs">
                                    {moderationIndex[discussion.id].hidden} ocultas
                                  </Badge>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        {discussion.isNew && (
                          <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 font-terminal">
                            NUEVO
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-terminal">
                      No hay discusiones aún. ¡Sé el primero en crear una!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Nueva Discusión */}
      <NewDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateDiscussion}
      />
    </div>
  );
};

export default Comunidad; 