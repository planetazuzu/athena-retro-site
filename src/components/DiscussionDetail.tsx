import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Eye, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Reply,
  ArrowLeft,
  Clock,
  User,
  Tag,
  Edit,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  EyeOff,
  Flag,
  CheckCircle,
  Activity
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useReplies, Reply as ReplyType } from '@/hooks/useReplies';
import { useAuth } from '@/hooks/useAuth';

interface DiscussionDetailProps {
  discussion: any;
  onBack: () => void;
  onReply: (content: string) => void;
}

const DiscussionDetail = ({ discussion, onBack, onReply }: DiscussionDetailProps) => {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ReplyType | null>(null);
  
  // Nuevas funcionalidades
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'votes' | 'relevance'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModerationTools, setShowModerationTools] = useState(false);

  const { isAdmin } = useAuth();

  // Usar el hook de respuestas con todas las funcionalidades
  const { 
    organizedReplies, 
    isLoading, 
    addReply, 
    voteReply, 
    deleteReply, 
    editReply,
    hideReply,
    showReply,
    reportReply,
    unreportReply,
    getModerationStats,
    getActivityStats,
    getUnreadCount,
    markAsRead,
    getLastVisitTime,
    getPaginatedReplies,
    getSearchStats
  } = useReplies(discussion.id);

  // Marcar como leído al abrir la discusión
  useEffect(() => {
    const now = Date.now();
    markAsRead(now);
  }, [discussion.id]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const parentReplyId = replyingTo?.id;
      const newReply = await addReply(replyContent, parentReplyId);
      
      if (newReply) {
        setReplyContent('');
        setReplyingTo(null);
        setShowReplyForm(false);
        
        // Llamar a la función del padre para actualizar contadores
        onReply(replyContent);
      }
      
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = (replyId: string, voteType: 'like' | 'dislike') => {
    voteReply(replyId, voteType);
  };

  const handleEditReply = (reply: ReplyType) => {
    setEditingReplyId(reply.id);
    setEditContent(reply.content);
  };

  const handleSaveEdit = async () => {
    if (!editingReplyId || !editContent.trim()) return;
    
    const success = editReply(editingReplyId, editContent);
    if (success) {
      setEditingReplyId(null);
      setEditContent('');
    }
  };

  const handleDeleteReply = (replyId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta respuesta?')) {
      deleteReply(replyId);
    }
  };

  const handleReplyToReply = (reply: ReplyType) => {
    setReplyingTo(reply);
    setShowReplyForm(true);
    setReplyContent('');
  };

  // Funciones de moderación
  const handleHideReply = (replyId: string) => {
    if (!isAdmin) return;
    if (confirm('¿Ocultar esta respuesta temporalmente?')) {
      hideReply(replyId);
    }
  };

  const handleShowReply = (replyId: string) => {
    if (!isAdmin) return;
    showReply(replyId);
  };

  const handleReportReply = (replyId: string) => {
    if (!isAdmin) return;
    if (confirm('¿Reportar esta respuesta como inapropiada?')) {
      reportReply(replyId);
    }
  };

  const handleUnreportReply = (replyId: string) => {
    if (!isAdmin) return;
    unreportReply(replyId);
  };

  // Obtener respuestas paginadas y filtradas
  const { replies: paginatedReplies, pagination } = getPaginatedReplies(
    currentPage, 
    10, 
    searchTerm, 
    sortBy
  );

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: es 
      });
    } catch {
      return 'Hace un momento';
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories: {[key: string]: string} = {
      'supervivencia': 'SUPERVIVENCIA GENERAL',
      'primeros-auxilios': 'PRIMEROS AUXILIOS',
      'navegacion': 'NAVEGACIÓN Y ORIENTACIÓN',
      'equipamiento': 'EQUIPAMIENTO Y REVIEWS'
    };
    return categories[category] || category;
  };

  // Obtener estadísticas
  const moderationStats = getModerationStats();
  const activityStats = getActivityStats();
  const searchStats = getSearchStats(searchTerm);

  // Componente para renderizar una respuesta individual
  const ReplyItem = ({ reply, level = 0 }: { reply: ReplyType; level?: number }) => {
    const isEditing = editingReplyId === reply.id;
    
    return (
      <div className={`border-l-2 border-primary/20 pl-4 ${level > 0 ? 'ml-4' : ''}`}>
        <div className="border-b border-primary/10 pb-4 last:border-b-0">
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary font-terminal">
                {reply.author.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-terminal font-medium text-primary">
                  {reply.author}
                </span>
                {reply.isAuthor && (
                  <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400 text-xs">
                    AUTOR
                  </Badge>
                )}
                {isAdmin && reply.isReported && (
                  <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 text-xs">
                    REPORTADO ({reply.reportCount || 1})
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground font-terminal">
                  {formatDate(reply.createdAt)}
                </span>
              </div>
              
              {isEditing ? (
                <div className="space-y-2 mb-3">
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="font-terminal"
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={handleSaveEdit}
                      className="font-terminal text-xs"
                    >
                      Guardar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingReplyId(null)}
                      className="font-terminal text-xs"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground font-terminal mb-3">
                  {reply.content}
                </p>
              )}
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(reply.id, 'like')}
                  className={`font-terminal text-xs ${
                    reply.userVote === 'like' 
                      ? 'text-green-400 bg-green-500/10' 
                      : 'hover:text-green-400'
                  }`}
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {reply.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(reply.id, 'dislike')}
                  className={`font-terminal text-xs ${
                    reply.userVote === 'dislike' 
                      ? 'text-red-400 bg-red-500/10' 
                      : 'hover:text-red-400'
                  }`}
                >
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  {reply.dislikes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReplyToReply(reply)}
                  className="font-terminal text-xs"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Responder
                </Button>
                
                {/* Botones de moderación (solo admin) */}
                {isAdmin && showModerationTools && (
                  <>
                    {reply.isHidden ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShowReply(reply.id)}
                        className="font-terminal text-xs hover:text-green-400"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Mostrar
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHideReply(reply.id)}
                        className="font-terminal text-xs hover:text-yellow-400"
                      >
                        <EyeOff className="h-3 w-3 mr-1" />
                        Ocultar
                      </Button>
                    )}
                    
                    {reply.isReported ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnreportReply(reply.id)}
                        className="font-terminal text-xs hover:text-green-400"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Quitar Reporte
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReportReply(reply.id)}
                        className="font-terminal text-xs hover:text-red-400"
                      >
                        <Flag className="h-3 w-3 mr-1" />
                        Reportar
                      </Button>
                    )}
                  </>
                )}
                
                {reply.isAuthor && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditReply(reply)}
                      className="font-terminal text-xs hover:text-blue-400"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteReply(reply.id)}
                      className="font-terminal text-xs hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Eliminar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Respuestas anidadas */}
          {reply.replies && reply.replies.length > 0 && (
            <div className="mt-4">
              {reply.replies.map((nestedReply) => (
                <ReplyItem 
                  key={nestedReply.id} 
                  reply={nestedReply} 
                  level={level + 1} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header con botón de regreso */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="font-terminal text-primary hover:text-primary-glow"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la Comunidad
            </Button>
          </div>

          {/* Discusión Principal */}
          <Card className="terminal-card mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal">
                      {getCategoryLabel(discussion.category)}
                    </Badge>
                    {activityStats.hasNewActivity && (
                      <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 font-terminal">
                        <Activity className="h-3 w-3 mr-1" />
                        ACTIVA
                      </Badge>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground font-terminal">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(discussion.createdAt)}</span>
                    </div>
                  </div>
                  <CardTitle className="font-terminal text-2xl text-primary terminal-glow">
                    {discussion.title}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="font-terminal">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                  {isAdmin && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="font-terminal"
                      onClick={() => setShowModerationTools(!showModerationTools)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {showModerationTools ? 'Ocultar' : 'Moderación'}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-muted-foreground font-terminal leading-relaxed">
                  {discussion.content}
                </p>
              </div>

              {/* Tags */}
              {discussion.tags && discussion.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-primary/10 border-primary/30 text-primary font-terminal"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Estadísticas */}
              <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground font-terminal">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>por {discussion.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{organizedReplies.length} respuestas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{discussion.views || 0} vistas</span>
                  </div>
                </div>
                
                {/* Estadísticas de actividad */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                  <span>{activityStats.todayReplies} hoy</span>
                  <span>{activityStats.weekReplies} esta semana</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulario de Respuesta */}
          <Card className="terminal-card mb-6">
            <CardHeader>
              <CardTitle className="font-terminal text-lg text-primary">
                <Reply className="h-5 w-5 mr-2" />
                {replyingTo ? `RESPONDER A ${replyingTo.author}` : 'RESPONDER'}
              </CardTitle>
              {replyingTo && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground font-terminal">
                    Respondiendo a:
                  </span>
                  <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal text-xs">
                    {replyingTo.content.substring(0, 50)}...
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                    className="font-terminal text-xs"
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReply} className="space-y-4">
                <div className="flex space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary font-terminal">
                      UA
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={replyingTo ? `Escribe tu respuesta a ${replyingTo.author}...` : "Escribe tu respuesta..."}
                      className="font-terminal"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="font-terminal glow-effect"
                    disabled={isSubmitting || !replyContent.trim()}
                  >
                    {isSubmitting ? '📝 ENVIANDO...' : '📝 RESPONDER'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Búsqueda y Filtros */}
          <Card className="terminal-card mb-6">
            <CardHeader>
              <CardTitle className="font-terminal text-lg text-primary">
                <Search className="h-5 w-5 mr-2" />
                BUSCAR Y FILTRAR RESPUESTAS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar en respuestas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 font-terminal"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-background border border-primary/20 text-primary font-terminal px-3 py-2 rounded-sm"
                  >
                    <option value="date">Por fecha</option>
                    <option value="votes">Por votos</option>
                    <option value="relevance">Por relevancia</option>
                  </select>
                </div>
              </div>
              
              {/* Estadísticas de búsqueda */}
              {searchStats && (
                <div className="mt-4 p-3 bg-primary/5 rounded-sm">
                  <p className="text-sm font-terminal text-primary">
                    Búsqueda: "{searchStats.searchTerm}" - {searchStats.totalMatches} resultados, {searchStats.authorMatches} autores
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lista de Respuestas */}
          <Card className="terminal-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-terminal text-lg text-primary">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  RESPUESTAS ({organizedReplies.length})
                </CardTitle>
                
                {/* Estadísticas de moderación (solo admin) */}
                {isAdmin && showModerationTools && (
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                    <span>Ocultas: {moderationStats.hiddenCount}</span>
                    <span>Reportadas: {moderationStats.reportedCount}</span>
                    <span>Total reportes: {moderationStats.totalReports}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="loading-dots mb-4">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <p className="text-muted-foreground font-terminal">CARGANDO RESPUESTAS...</p>
                </div>
              ) : paginatedReplies.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {paginatedReplies.map((reply) => (
                      <ReplyItem key={reply.id} reply={reply} />
                    ))}
                  </div>
                  
                  {/* Paginación */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-primary/20">
                      <div className="text-sm text-muted-foreground font-terminal">
                        Página {pagination.currentPage} de {pagination.totalPages} ({pagination.totalReplies} respuestas)
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(pagination.currentPage - 1)}
                          disabled={!pagination.hasPrevPage}
                          className="font-terminal"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Anterior
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(pagination.currentPage + 1)}
                          disabled={!pagination.hasNextPage}
                          className="font-terminal"
                        >
                          Siguiente
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-terminal">
                    {searchTerm ? 'No se encontraron respuestas para tu búsqueda.' : 'No hay respuestas aún. ¡Sé el primero en responder!'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
