import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, Search, Filter, Eye, ThumbsUp, ThumbsDown, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBlog, BlogPost } from "@/hooks/useBlog";

const Blog = () => {
  const { 
    posts, 
    loading, 
    getPublishedPosts, 
    getPostsByCategory, 
    searchPosts,
    incrementViews 
  } = useBlog();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const categories = [
    "Todas",
    "Técnicas",
    "Tecnología",
    "Casos Reales",
    "Preparación",
    "Actualizaciones",
    "Primeros Auxilios",
    "Equipamiento",
    "Entrenamiento"
  ];

  // Filtrar posts basado en búsqueda y categoría
  useEffect(() => {
    let posts = getPublishedPosts();
    
    // Filtrar por categoría
    if (selectedCategory !== "Todas") {
      posts = getPostsByCategory(selectedCategory);
    }
    
    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      posts = searchPosts(searchTerm);
    }
    
    setFilteredPosts(posts);
  }, [searchTerm, selectedCategory, posts]);

  const handlePostClick = (postId: string) => {
    incrementViews(postId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-primary font-terminal">Cargando blog...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            BLOG DE SUPERVIVENCIA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Artículos y novedades sobre técnicas de supervivencia, casos reales y actualizaciones de Athena Pocket.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background-secondary border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-background-secondary border border-primary/20 rounded-sm px-4 py-3 font-terminal text-primary focus:border-primary focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Resultados de búsqueda */}
            {searchTerm && (
              <div className="text-center mb-6">
                <p className="text-muted-foreground font-terminal">
                  {filteredPosts.length} resultado{filteredPosts.length !== 1 ? 's' : ''} para "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-8 text-center">
                ARTÍCULOS DESTACADOS
              </h2>
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border mb-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-sm text-sm font-terminal">
                      Destacado
                    </span>
                    <span className="text-sm text-muted-foreground font-terminal">{post.category}</span>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-primary font-terminal mb-4">{post.title}</h2>
                  <p className="text-muted-foreground font-terminal mb-6 text-lg">{post.excerpt}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-terminal">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <span>{post.readTime}</span>
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                        <ThumbsDown className="h-4 w-4" />
                        <span>{post.dislikes}</span>
                      </div>
                    </div>
                    <Button asChild variant="cta" onClick={() => handlePostClick(post.id)}>
                      <Link to={`/blog/${post.id}`}>
                        Leer Más
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {regularPosts.length > 0 ? (
              <>
                <h2 className="text-3xl font-bold text-primary font-terminal mb-12 text-center">
                  {selectedCategory === "Todas" ? "TODOS LOS ARTÍCULOS" : `ARTÍCULOS DE ${selectedCategory.toUpperCase()}`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <article key={post.id} className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-xs text-muted-foreground font-terminal">{post.category}</span>
                        <span className="text-xs text-muted-foreground font-terminal">•</span>
                        <span className="text-xs text-muted-foreground font-terminal">{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-primary font-terminal mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground font-terminal mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-terminal">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground font-terminal">
                            +{post.tags.length - 3} más
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground font-terminal">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <Button asChild variant="terminal" size="sm" onClick={() => handlePostClick(post.id)}>
                          <Link to={`/blog/${post.id}`}>
                            Leer
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/10 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsDown className="h-3 w-3" />
                          <span>{post.dislikes}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-primary font-terminal mb-4">
                  No se encontraron artículos
                </h3>
                <p className="text-muted-foreground font-terminal mb-8">
                  {searchTerm 
                    ? `No hay artículos que coincidan con "${searchTerm}"`
                    : `No hay artículos en la categoría "${selectedCategory}"`
                  }
                </p>
                <Button 
                  variant="terminal" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Todas");
                  }}
                >
                  Ver todos los artículos
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-background border border-primary/20 rounded-sm p-8 terminal-border">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
                SUSCRÍBETE AL BLOG
              </h2>
              <p className="text-muted-foreground font-terminal mb-6">
                Recibe los últimos artículos y novedades de supervivencia directamente en tu email
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 p-3 bg-background-secondary border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                />
                <Button variant="cta" className="font-terminal">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              CATEGORÍAS POPULARES
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.slice(1).map((category) => (
              <Button
                key={category}
                variant="terminal"
                className="font-terminal h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setSelectedCategory(category)}
              >
                <span className="text-sm">{category}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-8 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
              ¿Tienes una historia que compartir?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Contribuye con tu experiencia y ayuda a otros supervivientes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="/contacto">Escribir Artículo</Link>
              </Button>
              <Button asChild variant="terminal" size="lg">
                <Link to="/comunidad">Unirse a Comunidad</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog; 