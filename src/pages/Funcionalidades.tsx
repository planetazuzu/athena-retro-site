import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Map, Brain, AlertTriangle, Shield, BookOpen, Users, Navigation as NavIcon, Zap, Smartphone, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Funcionalidades = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Advisor",
      description: "Asistente de inteligencia artificial que analiza tu situación y proporciona consejos personalizados en tiempo real. Aprende de tus patrones y mejora con cada uso.",
      details: [
        "Análisis de situación en tiempo real",
        "Consejos personalizados basados en contexto",
        "Aprendizaje continuo de patrones",
        "Respuestas en múltiples idiomas"
      ]
    },
    {
      icon: Map,
      title: "Mapas Offline",
      description: "Navegación completa sin conexión a internet. Mapas topográficos detallados con rutas de escape, puntos de interés y recursos de supervivencia.",
      details: [
        "Mapas topográficos detallados",
        "Rutas de escape predefinidas",
        "Puntos de interés marcados",
        "Funciona sin conexión"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Alertas SOS",
      description: "Sistema de emergencia que envía alertas automáticas con tu ubicación exacta a contactos de confianza y servicios de emergencia.",
      details: [
        "Alerta automática con GPS",
        "Contactos de emergencia",
        "Integración con servicios 911",
        "Modo silencioso disponible"
      ]
    },
    {
      icon: BookOpen,
      title: "Checklist Personalizado",
      description: "Guías interactivas paso a paso para técnicas de supervivencia, primeros auxilios y preparación para emergencias.",
      details: [
        "Tutoriales paso a paso",
        "Videos explicativos",
        "Checklists personalizables",
        "Progreso guardado"
      ]
    },
    {
      icon: Users,
      title: "Comunidad Offline",
      description: "Conecta con otros supervivientes cercanos, comparte recursos y conocimientos, y forma grupos de apoyo local.",
      details: [
        "Red de supervivientes",
        "Compartir recursos",
        "Grupos de apoyo",
        "Chat offline seguro"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            CARACTERÍSTICAS DE ATHENA POCKET
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Descubre cómo Athena Pocket usa IA para darte consejos de supervivencia, navegación offline y alertas de emergencia con un solo toque.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="cta" size="lg">
              <Link to="/descargas">Descargar Ahora</Link>
            </Button>
            <Button asChild variant="terminal" size="lg">
              <Link to="/guias">Ver Guías</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border hover:border-primary/50 transition-all duration-300">
                <div className="mb-6">
                  <feature.icon className="h-16 w-16 text-primary terminal-glow group-hover:animate-terminal-flicker" />
                </div>
                
                <h3 className="text-2xl font-bold text-primary font-terminal mb-4 group-hover:terminal-glow transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground font-terminal mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-muted-foreground font-terminal">
                      <span className="text-primary mr-2">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              ESPECIFICACIONES TÉCNICAS
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Tecnología avanzada que funciona cuando más la necesitas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary font-terminal mb-2">iOS & Android</h3>
              <p className="text-muted-foreground font-terminal">Compatible con todas las versiones modernas</p>
            </div>
            <div className="text-center">
              <WifiOff className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary font-terminal mb-2">Modo Offline</h3>
              <p className="text-muted-foreground font-terminal">Funciona completamente sin internet</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary font-terminal mb-2">Batería Optimizada</h3>
              <p className="text-muted-foreground font-terminal">Modo supervivencia para emergencias</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background-secondary border border-primary/30 rounded-sm p-8 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
              ¿Listo para probar Athena Pocket?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Descarga ahora y lleva tu supervivencia al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="/descargas">Descargar Gratis</Link>
              </Button>
              <Button asChild variant="terminal" size="lg">
                <Link to="/contacto">Contactar Soporte</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Funcionalidades; 