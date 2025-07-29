import { Terminal, Zap, Settings, Shield, Boxes, Code } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Terminal,
      title: "CLI Retro Auténtico",
      description: "Interfaz de línea de comandos con estética terminal clásica y efectos visuales nostálgicos.",
      command: "$ athena --theme retro"
    },
    {
      icon: Zap,
      title: "Automatización de Tareas",
      description: "Crea, programa y ejecuta tareas automáticamente. Aumenta tu productividad 10x.",
      command: "$ athena auto --schedule daily"
    },
    {
      icon: Code,
      title: "Gestión de Scripts",
      description: "Organiza y ejecuta scripts personalizados con un sistema de templates avanzado.",
      command: "$ athena script --template nodejs"
    },
    {
      icon: Settings,
      title: "Personalización Total",
      description: "Configura colores, temas, aliases y shortcuts según tu flujo de trabajo.",
      command: "$ athena config --customize"
    },
    {
      icon: Shield,
      title: "Seguro y Confiable",
      description: "Código abierto, sin telemetría invasiva. Tus datos permanecen en tu máquina.",
      command: "$ athena security --status"
    },
    {
      icon: Boxes,
      title: "Multiplataforma",
      description: "Compatible con Windows, macOS y Linux. Una sola herramienta para todos tus sistemas.",
      command: "$ athena --platform all"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --list-features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
            FUNCIONALIDADES PRINCIPALES
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
            Descubre todas las herramientas que Athena Pocket pone a tu disposición para revolucionar tu productividad.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background border border-primary/20 rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4">
                  <feature.icon className="h-10 w-10 text-primary terminal-glow group-hover:animate-terminal-flicker" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary font-terminal mb-3 group-hover:terminal-glow transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-terminal text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Command Example */}
                <div className="bg-background-tertiary border border-primary/10 rounded-sm p-3 font-terminal text-xs">
                  <span className="text-primary-dim">{feature.command}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-6 terminal-border">
            <p className="text-muted-foreground font-terminal mb-4">
              ¿Listo para experimentar el poder de Athena Pocket?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-sm font-terminal font-bold hover:bg-primary-glow transition-all duration-300 terminal-glow">
                EXPLORAR DOCUMENTACIÓN
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-sm font-terminal hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                VER CASOS DE USO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;