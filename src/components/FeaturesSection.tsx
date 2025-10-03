import { Map, Brain, AlertTriangle, Shield, BookOpen, Users, Navigation, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      icon: Map,
      title: "Mapas y Rutas Offline",
      description: "Navega sin conexión con mapas topográficos detallados y rutas de escape predefinidas.",
      command: "$ athena map --offline --region mountain"
    },
    {
      icon: Brain,
      title: "Asistente IA para Decisiones",
      description: "IA que analiza tu situación y te da consejos personalizados en tiempo real.",
      command: "$ athena ai --emergency \"herida en pierna\""
    },
    {
      icon: AlertTriangle,
      title: "Alertas SOS y Geoposicionamiento",
      description: "Envía alertas de emergencia con tu ubicación exacta a contactos de confianza.",
      command: "$ athena sos --location --contacts"
    },
    {
      icon: BookOpen,
      title: "Checklist y Tutoriales",
      description: "Guías paso a paso para encender fuego, purificar agua, primeros auxilios y más.",
      command: "$ athena guide --fire-starting"
    },
    {
      icon: Shield,
      title: "Modo Supervivencia",
      description: "Optimiza la batería y recursos para situaciones de emergencia prolongadas.",
      command: "$ athena survival --mode extreme"
    },
    {
      icon: Users,
      title: "Comunidad Offline",
      description: "Conecta con otros supervivientes cercanos y comparte recursos y conocimientos.",
      command: "$ athena community --nearby"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border glow-effect">
            <span className="text-primary-dim font-terminal text-sm">$ athena --list-features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
            FUNCIONALIDADES DE SUPERVIVENCIA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
            Descubre cómo Athena Pocket te mantiene seguro con tecnología de IA avanzada y herramientas de supervivencia probadas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background border border-primary/20 rounded-sm p-6 terminal-card hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-all duration-500 rounded-sm" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4">
                  <feature.icon className="h-10 w-10 text-primary terminal-glow group-hover:animate-terminal-flicker group-hover:scale-110 transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary font-terminal mb-3 group-hover:terminal-glow transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-terminal text-sm mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Command Example */}
                <div className="bg-background-tertiary border border-primary/10 rounded-sm p-3 font-terminal text-xs group-hover:border-primary/30 transition-all duration-300">
                  <span className="text-primary-dim group-hover:text-primary transition-colors duration-300">{feature.command}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-up">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-6 terminal-border glow-effect">
            <p className="text-muted-foreground font-terminal mb-4">
              ¿Listo para llevar tu supervivencia al siguiente nivel?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg" className="glow-effect">
                <Link to="/app">
                  DESCARGAR AHORA
                </Link>
              </Button>
              <Button asChild variant="terminal" size="lg" className="glow-effect">
                <Link to="/guias">
                  VER GUIAS
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;