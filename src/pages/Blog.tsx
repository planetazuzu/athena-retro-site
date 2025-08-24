import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Técnicas de Supervivencia que Salvan Vidas",
      excerpt: "Descubre las técnicas más efectivas que han sido probadas en situaciones reales de emergencia...",
      author: "Dr. María González",
      date: "2024-01-15",
      category: "Técnicas",
      readTime: "8 min",
      featured: true
    },
    {
      id: 2,
      title: "Cómo la IA Revoluciona la Supervivencia Moderna",
      excerpt: "La inteligencia artificial está transformando la forma en que nos preparamos para emergencias...",
      author: "Carlos Ruiz",
      date: "2024-01-12",
      category: "Tecnología",
      readTime: "6 min",
      featured: false
    },
    {
      id: 3,
      title: "Casos Reales: Rescate en Sierra Nevada",
      excerpt: "Un relato detallado de cómo Athena Pocket ayudó en un rescate real en las montañas...",
      author: "Equipo de Rescate",
      date: "2024-01-10",
      category: "Casos Reales",
      readTime: "12 min",
      featured: false
    },
    {
      id: 4,
      title: "Preparación para Emergencias en Zonas Urbanas",
      excerpt: "Guía completa para sobrevivir en entornos urbanos durante crisis y desastres...",
      author: "Ana Martínez",
      date: "2024-01-08",
      category: "Preparación",
      readTime: "10 min",
      featured: false
    },
    {
      id: 5,
      title: "Actualización de Athena Pocket v2.1",
      excerpt: "Nuevas funciones de IA, mapas mejorados y mejor experiencia offline...",
      author: "Equipo de Desarrollo",
      date: "2024-01-05",
      category: "Actualizaciones",
      readTime: "4 min",
      featured: false
    },
    {
      id: 6,
      title: "Primeros Auxilios en Situaciones Extremas",
      excerpt: "Técnicas médicas básicas cuando no hay ayuda profesional disponible...",
      author: "Dr. Juan Pérez",
      date: "2024-01-03",
      category: "Primeros Auxilios",
      readTime: "15 min",
      featured: false
    }
  ];

  const categories = [
    "Todas",
    "Técnicas",
    "Tecnología",
    "Casos Reales",
    "Preparación",
    "Actualizaciones",
    "Primeros Auxilios"
  ];

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
                  className="w-full pl-10 pr-4 py-3 bg-background-secondary border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select className="bg-background-secondary border border-primary/20 rounded-sm px-4 py-3 font-terminal text-primary focus:border-primary focus:outline-none">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {blogPosts.filter(post => post.featured).map((post) => (
              <div key={post.id} className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-sm text-sm font-terminal">
                    Destacado
                  </span>
                  <span className="text-sm text-muted-foreground font-terminal">{post.category}</span>
                </div>
                <h2 className="text-3xl font-bold text-primary font-terminal mb-4">{post.title}</h2>
                <p className="text-muted-foreground font-terminal mb-6 text-lg">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Button asChild variant="cta">
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

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <article key={post.id} className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xs text-muted-foreground font-terminal">{post.category}</span>
                    <span className="text-xs text-muted-foreground font-terminal">•</span>
                    <span className="text-xs text-muted-foreground font-terminal">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary font-terminal mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground font-terminal mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground font-terminal">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <Button asChild variant="terminal" size="sm">
                      <Link to={`/blog/${post.id}`}>
                        Leer
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
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