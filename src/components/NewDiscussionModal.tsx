import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, MessageSquare, Tag } from "lucide-react";

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (discussion: DiscussionData) => void;
}

interface DiscussionData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

const NewDiscussionModal = ({ isOpen, onClose, onSubmit }: NewDiscussionModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados de validación
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { value: 'supervivencia', label: 'SUPERVIVENCIA GENERAL' },
    { value: 'primeros-auxilios', label: 'PRIMEROS AUXILIOS' },
    { value: 'navegacion', label: 'NAVEGACIÓN Y ORIENTACIÓN' },
    { value: 'equipamiento', label: 'EQUIPAMIENTO Y REVIEWS' }
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      // Marcar todos los campos como tocados para mostrar errores
      setTouched({
        title: true,
        content: true,
        category: true,
        tags: true
      });
      return;
    }

    setIsLoading(true);
    try {
      const discussionData: DiscussionData = {
        title: title.trim(),
        content: content.trim(),
        category,
        tags
      };

      await onSubmit(discussionData);
      
      // Mostrar mensaje de éxito
      setShowSuccess(true);
      
      // Resetear formulario
      resetForm();
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error creating discussion:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

  // Función de validación
  const validateField = (field: string, value: string) => {
    let error = '';
    
    switch (field) {
      case 'title':
        if (!value.trim()) {
          error = 'El título es obligatorio';
        } else if (value.trim().length < 10) {
          error = 'El título debe tener al menos 10 caracteres';
        } else if (value.trim().length > 100) {
          error = 'El título no puede exceder 100 caracteres';
        }
        break;
        
      case 'content':
        if (!value.trim()) {
          error = 'El contenido es obligatorio';
        } else if (value.trim().length < 50) {
          error = 'El contenido debe tener al menos 50 caracteres';
        } else if (value.trim().length > 2000) {
          error = 'El contenido no puede exceder 2000 caracteres';
        }
        break;
        
      case 'category':
        if (!value) {
          error = 'Debes seleccionar una categoría';
        }
        break;
        
      case 'tags':
        if (tags.length > 5) {
          error = 'No puedes agregar más de 5 etiquetas';
        }
        break;
    }
    
    return error;
  };

  // Validar campo cuando cambia
  const handleFieldChange = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    
    // Marcar como tocado
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    newErrors.title = validateField('title', title);
    newErrors.content = validateField('content', content);
    newErrors.category = validateField('category', category);
    newErrors.tags = validateField('tags', tags);
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  // Resetear formulario
  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setTags([]);
    setNewTag('');
    setErrors({});
    setTouched({});
    setShowSuccess(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto terminal-card">
        <DialogHeader>
          <DialogTitle className="font-terminal text-xl text-primary terminal-glow flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>NUEVA DISCUSIÓN</span>
          </DialogTitle>
        </DialogHeader>

                 {showSuccess && (
           <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-sm">
             <div className="flex items-center space-x-2">
               <span className="text-2xl">✅</span>
               <p className="text-green-400 font-terminal">
                 ¡Discusión creada exitosamente! El modal se cerrará automáticamente.
               </p>
             </div>
           </div>
         )}
         
         <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-terminal text-primary">
              Título de la Discusión *
            </Label>
                         <Input
               id="title"
               value={title}
               onChange={(e) => {
                 setTitle(e.target.value);
                 handleFieldChange('title', e.target.value);
               }}
               onBlur={() => handleFieldChange('title', title)}
               placeholder="Ej: ¿Cuál es tu kit de supervivencia esencial?"
               className={`font-terminal ${touched.title && errors.title ? 'border-red-500' : ''}`}
               required
             />
             {touched.title && errors.title && (
               <p className="text-xs text-red-400 font-terminal">{errors.title}</p>
             )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="font-terminal text-primary">
              Categoría *
            </Label>
                         <Select 
               value={category} 
               onValueChange={(value) => {
                 setCategory(value);
                 handleFieldChange('category', value);
               }} 
               required
             >
               <SelectTrigger className={`font-terminal ${touched.category && errors.category ? 'border-red-500' : ''}`}>
                 <SelectValue placeholder="Selecciona una categoría" />
               </SelectTrigger>
               <SelectContent>
                 {categories.map((cat) => (
                   <SelectItem key={cat.value} value={cat.value}>
                     {cat.label}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
             {touched.category && errors.category && (
               <p className="text-xs text-red-400 font-terminal">{errors.category}</p>
             )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="font-terminal text-primary">
              Etiquetas (opcional)
            </Label>
                         <div className="flex flex-wrap gap-2 mb-2">
               {tags.map((tag, index) => (
                 <Badge 
                   key={index} 
                   variant="outline" 
                   className="bg-primary/10 border-primary/30 text-primary font-terminal"
                 >
                   {tag}
                   <button
                     type="button"
                     onClick={() => handleRemoveTag(tag)}
                     className="ml-2 hover:text-red-400"
                   >
                     <X className="h-3 w-3" />
                   </button>
                 </Badge>
               ))}
             </div>
             {touched.tags && errors.tags && (
               <p className="text-xs text-red-400 font-terminal">{errors.tags}</p>
             )}
             <p className="text-xs text-muted-foreground font-terminal">
               Máximo 5 etiquetas. Presiona Enter para agregar.
             </p>
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Agregar etiqueta..."
                className="font-terminal flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTag}
                className="font-terminal"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="font-terminal text-primary">
              Contenido de la Discusión *
            </Label>
                         <Textarea
               id="content"
               value={content}
               onChange={(e) => {
                 setContent(e.target.value);
                 handleFieldChange('content', e.target.value);
               }}
               onBlur={() => handleFieldChange('content', content)}
               placeholder="Describe tu pregunta, experiencia o tema de discusión..."
               className={`font-terminal min-h-[200px] resize-none ${touched.content && errors.content ? 'border-red-500' : ''}`}
               required
             />
             <div className="flex justify-between items-center">
               <p className="text-xs text-muted-foreground font-terminal">
                 💡 Sé específico y claro. Incluye detalles relevantes para obtener mejores respuestas.
               </p>
               <p className={`text-xs font-terminal ${content.length > 2000 ? 'text-red-400' : 'text-muted-foreground'}`}>
                 {content.length}/2000
               </p>
             </div>
             {touched.content && errors.content && (
               <p className="text-xs text-red-400 font-terminal">{errors.content}</p>
             )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-primary/20">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="font-terminal"
              disabled={isLoading}
            >
              Cancelar
            </Button>
                         <Button
               type="submit"
               className="font-terminal glow-effect"
               disabled={isLoading || !validateForm()}
             >
               {isLoading ? '📝 CREANDO...' : '📝 CREAR DISCUSIÓN'}
             </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDiscussionModal;
