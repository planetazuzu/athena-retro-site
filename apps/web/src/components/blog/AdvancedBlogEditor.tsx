import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Eye, 
  Upload, 
  Tag, 
  Calendar,
  User,
  Image as ImageIcon,
  Link,
  Bold,
  Italic,
  List,
  Quote
} from "lucide-react";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  featured: boolean;
  publishedAt?: Date;
}

interface AdvancedBlogEditorProps {
  post?: BlogPost;
  onSave?: (post: BlogPost) => void;
  onPreview?: (post: BlogPost) => void;
}

const AdvancedBlogEditor = ({ post, onSave, onPreview }: AdvancedBlogEditorProps) => {
  const [formData, setFormData] = useState<BlogPost>({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || 'Administrador',
    tags: post?.tags || [],
    featured: post?.featured || false,
    ...post
  });

  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('Título y contenido son requeridos');
      return;
    }

    const postToSave = {
      ...formData,
      id: formData.id || `post-${Date.now()}`,
      publishedAt: formData.publishedAt || new Date()
    };

    onSave?.(postToSave);
    console.log('✅ Post guardado:', postToSave);
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
    onPreview?.(formData);
  };

  const insertMarkdown = (type: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let replacement = '';
    switch (type) {
      case 'bold':
        replacement = `**${selectedText || 'texto en negrita'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'texto en cursiva'}*`;
        break;
      case 'list':
        replacement = `- ${selectedText || 'elemento de lista'}`;
        break;
      case 'quote':
        replacement = `> ${selectedText || 'cita'}`;
        break;
      case 'link':
        replacement = `[${selectedText || 'texto del enlace'}](url)`;
        break;
      case 'image':
        replacement = `![${selectedText || 'descripción'}](url-de-la-imagen)`;
        break;
    }

    const newContent = 
      textarea.value.substring(0, start) + 
      replacement + 
      textarea.value.substring(end);

    setFormData(prev => ({ ...prev, content: newContent }));
  };

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-terminal text-primary">Vista Previa</h2>
          <Button onClick={handlePreview} className="font-terminal">
            <Eye className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-terminal text-primary">{formData.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {formData.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{formData.excerpt}</p>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {formData.content}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-terminal text-primary">Editor de Blog</h2>
        <div className="flex space-x-2">
          <Button onClick={handlePreview} variant="outline" className="font-terminal">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          <Button onClick={handleSave} className="font-terminal">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary">Información del Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="font-terminal text-primary">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título del post..."
              className="font-terminal"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="font-terminal text-primary">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-del-post"
              className="font-terminal"
            />
          </div>

          <div>
            <Label htmlFor="excerpt" className="font-terminal text-primary">Resumen</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Breve descripción del post..."
              className="font-terminal"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="author" className="font-terminal text-primary">Autor</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Nombre del autor"
              className="font-terminal"
            />
          </div>

          <div>
            <Label className="font-terminal text-primary">Tags</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nuevo tag..."
                className="font-terminal"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button onClick={addTag} size="sm" className="font-terminal">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="font-terminal">
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-xs hover:text-red-400"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="featured" className="font-terminal text-primary">
              Post destacado
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary">Contenido</CardTitle>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertMarkdown('bold')}
              className="font-terminal"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertMarkdown('italic')}
              className="font-terminal"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertMarkdown('list')}
              className="font-terminal"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertMarkdown('quote')}
              className="font-terminal"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertMarkdown('link')}
              className="font-terminal"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertMarkdown('image')}
              className="font-terminal"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Escribe el contenido de tu post aquí..."
            className="font-terminal min-h-[400px]"
            rows={20}
          />
          <p className="text-xs text-muted-foreground font-terminal mt-2">
            💡 Usa Markdown para formatear el texto. Puedes usar los botones de arriba para insertar elementos comunes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedBlogEditor;
