import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Code, 
  Quote,
  Eye,
  Edit3,
  Save,
  X,
  Clock,
  Calendar
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { BlogPost } from "@/hooks/useBlog";

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'dislikes'>) => void;
  onCancel: () => void;
}

const BlogEditor = ({ post, onSave, onCancel }: BlogEditorProps) => {
  const { user } = useAuth();
  const [currentPost, setCurrentPost] = useState<Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'dislikes'>>(
    post ? {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags,
      status: post.status,
      publishDate: post.publishDate,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      featuredImage: post.featuredImage,
      author: post.author,
      readTime: post.readTime,
      category: post.category,
      featured: post.featured
    } : {
      title: "",
      content: "",
      excerpt: "",
      tags: [],
      status: "draft",
      metaTitle: "",
      metaDescription: "",
      author: user?.name || "Admin",
      readTime: "5 min",
      category: "Técnicas",
      featured: false
    }
  );
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Técnicas",
    "Tecnología", 
    "Casos Reales",
    "Preparación",
    "Actualizaciones",
    "Primeros Auxilios",
    "Equipamiento",
    "Entrenamiento"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentPost.title.trim()) {
      newErrors.title = "El título es obligatorio";
    }
    
    if (!currentPost.content.trim()) {
      newErrors.content = "El contenido es obligatorio";
    }
    
    if (!currentPost.excerpt.trim()) {
      newErrors.excerpt = "El resumen es obligatorio";
    }
    
    if (!currentPost.metaTitle.trim()) {
      newErrors.metaTitle = "El meta título es obligatorio";
    }
    
    if (!currentPost.metaDescription.trim()) {
      newErrors.metaDescription = "La meta descripción es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(currentPost);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !currentPost.tags.includes(newTag.trim()) && currentPost.tags.length < 5) {
      setCurrentPost({
        ...currentPost,
        tags: [...currentPost.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCurrentPost({
      ...currentPost,
      tags: currentPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const insertMarkdown = (markdown: string) => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);
      
      const newText = before + markdown + selected + after;
      setCurrentPost({ ...currentPost, content: newText });
      
      // Focus back to textarea
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + markdown.length, start + markdown.length + selected.length);
      }, 0);
    }
  };

  const markdownButtons = [
    { icon: Bold, action: () => insertMarkdown("**texto**"), tooltip: "Negrita" },
    { icon: Italic, action: () => insertMarkdown("*texto*"), tooltip: "Cursiva" },
    { icon: List, action: () => insertMarkdown("- "), tooltip: "Lista" },
    { icon: ListOrdered, action: () => insertMarkdown("1. "), tooltip: "Lista numerada" },
    { icon: Link, action: () => insertMarkdown("[texto](url)"), tooltip: "Enlace" },
    { icon: Image, action: () => insertMarkdown("![alt](url)"), tooltip: "Imagen" },
    { icon: Code, action: () => insertMarkdown("`código`"), tooltip: "Código" },
    { icon: Quote, action: () => insertMarkdown("> "), tooltip: "Cita" }
  ];

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const handleContentChange = (content: string) => {
    setCurrentPost({
      ...currentPost,
      content,
      readTime: calculateReadTime(content)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary font-terminal">
          {post ? "Editar Post" : "Nuevo Post"}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel} className="font-terminal">
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="font-terminal">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Título del Post</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={currentPost.title}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                placeholder="Título del artículo..."
                className={`font-terminal ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Contenido</CardTitle>
              <div className="flex flex-wrap gap-2">
                {markdownButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={button.action}
                    className="font-terminal"
                    title={button.tooltip}
                  >
                    <button.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit" className="font-terminal">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="font-terminal">
                    <Eye className="h-4 w-4 mr-2" />
                    Vista Previa
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="mt-4">
                  <Textarea
                    id="content-editor"
                    value={currentPost.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Escribe tu contenido en Markdown..."
                    className={`min-h-[400px] font-terminal ${errors.content ? 'border-red-500' : ''}`}
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                  <div className="text-sm text-muted-foreground mt-2">
                    Tiempo de lectura estimado: {currentPost.readTime}
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-[400px] p-4 bg-background-secondary border border-primary/20 rounded-sm font-terminal prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: currentPost.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-primary/20 px-1 rounded">$1</code>')
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
                        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto" />')
                        .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic">$1</blockquote>')
                        .replace(/^- (.*$)/gm, '<ul class="list-disc pl-6"><li>$1</li></ul>')
                        .replace(/^(\d+)\. (.*$)/gm, '<ol class="list-decimal pl-6"><li>$2</li></ol>')
                        .replace(/\n/g, '<br>')
                    }} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={currentPost.status}
                onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value as any })}
                className="w-full p-2 border border-primary/20 rounded-sm bg-background font-terminal"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="scheduled">Programado</option>
              </select>
              
              {currentPost.status === "scheduled" && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Fecha de Publicación
                  </label>
                  <Input
                    type="datetime-local"
                    value={currentPost.publishDate || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, publishDate: e.target.value })}
                    className="font-terminal"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={currentPost.category}
                onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                className="w-full p-2 border border-primary/20 rounded-sm bg-background font-terminal"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Featured */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Destacado</CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentPost.featured}
                  onChange={(e) => setCurrentPost({ ...currentPost, featured: e.target.checked })}
                  className="rounded border-primary/20"
                />
                <span className="font-terminal text-sm">Marcar como destacado</span>
              </label>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Etiquetas ({currentPost.tags.length}/5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nueva etiqueta..."
                    className="font-terminal"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    disabled={currentPost.tags.length >= 5}
                  />
                  <Button onClick={handleAddTag} size="sm" className="font-terminal" disabled={currentPost.tags.length >= 5}>
                    +
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPost.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="font-terminal">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                  Meta Título
                </label>
                <Input
                  value={currentPost.metaTitle}
                  onChange={(e) => setCurrentPost({ ...currentPost, metaTitle: e.target.value })}
                  placeholder="Título para SEO..."
                  className={`font-terminal ${errors.metaTitle ? 'border-red-500' : ''}`}
                />
                {errors.metaTitle && <p className="text-red-500 text-sm mt-1">{errors.metaTitle}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                  Meta Descripción
                </label>
                <Textarea
                  value={currentPost.metaDescription}
                  onChange={(e) => setCurrentPost({ ...currentPost, metaDescription: e.target.value })}
                  placeholder="Descripción para SEO..."
                  className={`font-terminal ${errors.metaDescription ? 'border-red-500' : ''}`}
                  rows={3}
                />
                {errors.metaDescription && <p className="text-red-500 text-sm mt-1">{errors.metaDescription}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={currentPost.excerpt}
                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                placeholder="Breve resumen del artículo..."
                className={`font-terminal ${errors.excerpt ? 'border-red-500' : ''}`}
                rows={4}
              />
              {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor; 