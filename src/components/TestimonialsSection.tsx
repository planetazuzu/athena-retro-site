import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Rodriguez",
      role: "DevOps Engineer",
      company: "TechCorp",
      avatar: "👨‍💻",
      rating: 5,
      quote: "Athena Pocket revolucionó mi flujo de trabajo. La automatización de tareas me ahorra 4 horas diarias. El estilo retro es adictivo.",
      command: "$ athena saved-time --show"
    },
    {
      name: "Maria Santos",
      role: "Freelance Developer", 
      company: "Indie Creator",
      avatar: "👩‍💻",
      rating: 5,
      quote: "Como freelancer, necesito eficiencia máxima. Athena me permite gestionar múltiples proyectos sin perder la cabeza. ¡Imprescindible!",
      command: "$ athena projects --manage"
    },
    {
      name: "Alex Chen",
      role: "System Administrator",
      company: "StartupXYZ",
      avatar: "🧑‍💻",
      rating: 5,
      quote: "La seguridad y confiabilidad de Athena son excepcionales. Código abierto, sin telemetría. Exactamente lo que necesitaba.",
      command: "$ athena security --audit"
    }
  ];

  return (
    <section className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
            LO QUE DICEN LOS USUARIOS
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
            Miles de desarrolladores y profesionales confían en Athena Pocket para su productividad diaria.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background border border-primary/20 rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-primary font-terminal">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground font-terminal">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground font-terminal">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 text-primary fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground font-terminal text-sm mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Command Reference */}
                <div className="bg-background-tertiary border border-primary/10 rounded-sm p-2 font-terminal text-xs">
                  <span className="text-primary-dim">{testimonial.command}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-primary/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary terminal-glow font-terminal">4.9/5</div>
            <div className="text-muted-foreground font-terminal text-sm">Rating promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary terminal-glow font-terminal">50k+</div>
            <div className="text-muted-foreground font-terminal text-sm">Usuarios activos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary terminal-glow font-terminal">2.5M+</div>
            <div className="text-muted-foreground font-terminal text-sm">Tareas automatizadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary terminal-glow font-terminal">99.9%</div>
            <div className="text-muted-foreground font-terminal text-sm">Tiempo activo</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;