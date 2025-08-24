import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import NewDiscussionModal from "@/components/NewDiscussionModal";
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
  Plus
} from "lucide-react";

const Comunidad = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [stats, setStats] = useState({
    members: 1247,
    discussions: 3891,
    events: 24,
    countries: 67
  });

  // Cargar discusiones existentes al montar el componente
  useEffect(() => {
    const savedDiscussions = localStorage.getItem('athena_discussions');
    if (savedDiscussions) {
      const parsed = JSON.parse(savedDiscussions);
      setDiscussions(parsed);
      setStats(prev => ({ ...prev, discussions: parsed.length }));
    }
  }, []);

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

  // Filtrar discusiones por búsqueda y categoría
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                  <Users className="h-8 w-8 text-primary" />
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
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-terminal text-muted-foreground">Eventos</p>
                    <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                      24
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-terminal text-muted-foreground">Países</p>
                    <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                      67
                    </p>
                  </div>
                  <Globe className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="terminal-border mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                         <Input
                       placeholder="Buscar en la comunidad..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="pl-10 font-terminal"
                     />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                                     <select 
                     className="p-2 border border-primary/20 rounded-sm bg-background font-terminal"
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                   >
                     <option value="todos">Todos los temas</option>
                     <option value="supervivencia">Supervivencia</option>
                     <option value="primeros-auxilios">Primeros Auxilios</option>
                     <option value="navegacion">Navegación</option>
                     <option value="equipamiento">Equipamiento</option>
                   </select>
                </div>
                                 <Button 
                   className="font-terminal glow-effect"
                   onClick={() => setIsModalOpen(true)}
                 >
                   <Plus className="h-4 w-4 mr-2" />
                   Nueva Discusión
                 </Button>
              </div>
            </CardContent>
          </Card>

          {/* Forums Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="terminal-card">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>SUPERVIVENCIA GENERAL</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-terminal text-sm mb-4">
                  Técnicas de supervivencia, consejos y experiencias compartidas
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
                  Medicina de emergencia, RCP y atención médica básica
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
                 {filteredDiscussions.length > 0 ? (
                   filteredDiscussions.map((discussion, index) => (
                  <div key={index} className="border-b border-primary/10 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-terminal font-medium text-primary hover:text-primary-glow cursor-pointer">
                          {discussion.title}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground font-terminal">
                          <span>por {discussion.author}</span>
                          <span>{discussion.replies} respuestas</span>
                          <span>{discussion.views} vistas</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal">
                        NUEVO
                      </Badge>
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