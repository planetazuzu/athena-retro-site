import { useState } from 'react';
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
  Tag
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Reply {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  isAuthor: boolean;
}

interface DiscussionDetailProps {
  discussion: any;
  onBack: () => void;
  onReply: (content: string) => void;
}

const DiscussionDetail = ({ discussion, onBack, onReply }: DiscussionDetailProps) => {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: '1',
      content: 'Excelente pregunta. Te recomiendo empezar con lo básico: agua, refugio, fuego y señalización.',
      author: 'Carlos_Survival',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
      likes: 12,
      dislikes: 1,
      isAuthor: false
    },
    {
      id: '2',
      content: 'No olvides un buen cuchillo y una brújula. Son herramientas fundamentales.',
      author: 'Maria_Guide',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hora atrás
      likes: 8,
      dislikes: 0,
      isAuthor: false
    }
  ]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const newReply: Reply = {
        id: `reply-${Date.now()}`,
        content: replyContent.trim(),
        author: 'Usuario_Actual', // En producción sería el usuario autenticado
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        isAuthor: true
      };

      setReplies([newReply, ...replies]);
      setReplyContent('');
      
      // Aquí podrías guardar en localStorage o enviar a API
      console.log('✅ Respuesta enviada:', newReply);
      
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = (replyId: string, voteType: 'like' | 'dislike') => {
    setReplies(prev => prev.map(reply => {
      if (reply.id === replyId) {
        if (voteType === 'like') {
          return { ...reply, likes: reply.likes + 1 };
        } else {
          return { ...reply, dislikes: reply.dislikes + 1 };
        }
      }
      return reply;
    }));
  };

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
                    <span>{replies.length} respuestas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{discussion.views || 0} vistas</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulario de Respuesta */}
          <Card className="terminal-card mb-6">
            <CardHeader>
              <CardTitle className="font-terminal text-lg text-primary">
                <Reply className="h-5 w-5 mr-2" />
                RESPONDER
              </CardTitle>
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
                      placeholder="Escribe tu respuesta..."
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

          {/* Lista de Respuestas */}
          <Card className="terminal-card">
            <CardHeader>
              <CardTitle className="font-terminal text-lg text-primary">
                <MessageSquare className="h-5 w-5 mr-2" />
                RESPUESTAS ({replies.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {replies.length > 0 ? (
                <div className="space-y-4">
                  {replies.map((reply) => (
                    <div key={reply.id} className="border-b border-primary/10 pb-4 last:border-b-0">
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
                            <span className="text-xs text-muted-foreground font-terminal">
                              {formatDate(reply.createdAt)}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground font-terminal mb-3">
                            {reply.content}
                          </p>
                          
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVote(reply.id, 'like')}
                              className="font-terminal text-xs hover:text-green-400"
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {reply.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVote(reply.id, 'dislike')}
                              className="font-terminal text-xs hover:text-red-400"
                            >
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              {reply.dislikes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="font-terminal text-xs"
                            >
                              <Reply className="h-3 w-3 mr-1" />
                              Responder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-terminal">
                    No hay respuestas aún. ¡Sé el primero en responder!
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
