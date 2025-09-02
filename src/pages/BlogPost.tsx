import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Eye, 
  ThumbsUp, 
  ThumbsDown, 
  Tag, 
  Share2,
  Bookmark,
  MessageCircle,
  Clock
} from "lucide-react";
import { useBlog } from "@/hooks/useBlog";
import { useAuth } from "@/hooks/useAuth";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, incrementViews, handleVote } = useBlog();
  const { user } = useAuth();
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = getPostById(id);
      if (foundPost) {
        setPost(foundPost);
        incrementViews(id);
        
        // Verificar si el usuario ya votó
        const storedVote = localStorage.getItem(`blog_vote_${id}_${user?.id || 'anonymous'}`);
        if (storedVote) {
          setUserVote(storedVote as 'like' | 'dislike');
        }
      }
      setLoading(false);
    }
  }, [id, getPostById, incrementViews, user]);

  const handleVoteClick = (type: 'like' | 'dislike') => {
    if (!id) return;
    
    // Si ya votó igual, quitar el voto
    if (userVote === type) {
      setUserVote(null);
      localStorage.removeItem(`blog_vote_${id}_${user?.id || 'anonymous'}`);
      return;
    }
    
    // Si votó diferente, cambiar el voto
    if (userVote && userVote !== type) {
      // Aquí podrías implementar lógica para cambiar el voto en la base de datos
    }
    
    setUserVote(type);
    localStorage.setItem(`blog_vote_${id}_${user?.id || 'anonymous'}`, type);
    handleVote(id, type);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderMarkdown = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-primary font-terminal mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-primary font-terminal mb-3 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-primary font-terminal mb-2 mt-6">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-primary/20 text-primary px-2 py-1 rounded font-mono text-sm">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline underline-offset-2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded my-4" />')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic bg-primary/5 py-2 my-4">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<ul class="list-disc pl-6 my-4"><li class="mb-2">$1</li></ul>')
      .replace(/^(\d+)\. (.*$)/gm, '<ol class="list-decimal pl-6 my-4"><li class="mb-2">$2</li></ol>')
      .replace(/\n\n/g, '<br><br>');
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href);
      // Aquí podrías mostrar un toast de confirmación
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-primary font-terminal">Cargando artículo...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-primary font-terminal mb-4">
              Artículo no encontrado
            </h1>
            <p className="text-muted-foreground font-terminal mb-8">
              El artículo que buscas no existe o ha sido eliminado.
            </p>
            <Button asChild variant="terminal">
              <Link to="/blog">Volver al Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="py-6 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground font-terminal">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-primary">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-6 font-terminal"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Blog
            </Button>

            <article className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border">
              {/* Meta info */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-sm text-sm font-terminal">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-sm text-sm font-terminal">
                    Destacado
                  </span>
                )}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-primary font-terminal mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground font-terminal mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author and date */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-primary/20">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground font-terminal">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={sharePost}
                    className="font-terminal"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-terminal"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-sm text-sm font-terminal">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div 
                className="prose prose-invert max-w-none font-terminal leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />

              {/* Engagement */}
              <div className="mt-12 pt-8 border-t border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-bold text-primary font-terminal">
                      ¿Te gustó este artículo?
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={userVote === 'like' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleVoteClick('like')}
                        className="font-terminal"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button
                        variant={userVote === 'dislike' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleVoteClick('dislike')}
                        className="font-terminal"
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        {post.dislikes}
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="cta" className="font-terminal">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comentar
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary font-terminal mb-12 text-center">
              ARTÍCULOS RELACIONADOS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Aquí podrías mostrar posts relacionados por categoría o tags */}
              <div className="bg-background border border-primary/20 rounded-sm p-6 terminal-border">
                <h3 className="text-lg font-bold text-primary font-terminal mb-3">
                  Más artículos de {post.category}
                </h3>
                <p className="text-muted-foreground font-terminal mb-4">
                  Descubre más contenido relacionado con este tema.
                </p>
                <Button asChild variant="terminal" size="sm">
                  <Link to="/blog">Ver más artículos</Link>
                </Button>
              </div>
              
              <div className="bg-background border border-primary/20 rounded-sm p-6 terminal-border">
                <h3 className="text-lg font-bold text-primary font-terminal mb-3">
                  Suscríbete al blog
                </h3>
                <p className="text-muted-foreground font-terminal mb-4">
                  Recibe los últimos artículos directamente en tu email.
                </p>
                <Button variant="cta" size="sm">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
