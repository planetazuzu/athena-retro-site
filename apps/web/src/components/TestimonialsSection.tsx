import { Star, Shield, Map, Heart } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Rodriguez",
      role: "Guía de Montaña",
      company: "Expediciones Andes",
      avatar: "🏔️",
      rating: 5,
      quote: "Athena Pocket me salvó la vida durante una tormenta en el Aconcagua. La IA me guió para encontrar refugio y la función SOS alertó al equipo de rescate.",
      command: "$ athena emergency --storm --location 6962m"
    },
    {
      name: "Maria Santos",
      role: "Médica de Emergencias", 
      company: "Hospital Central",
      avatar: "🏥",
      rating: 5,
      quote: "Como médica, he visto cómo Athena ayuda a personas sin conocimientos médicos a aplicar primeros auxilios correctamente. Es como tener un médico en el bolsillo.",
      command: "$ athena medical --wound-treatment --bleeding"
    },
    {
      name: "Alex Chen",
      role: "Bombero Rescatista",
      company: "Cuerpo de Bomberos",
      avatar: "🚒",
      rating: 5,
      quote: "En situaciones de desastre, cada segundo cuenta. Athena nos ayuda a coordinar rescates y proporciona información vital en tiempo real.",
      command: "$ athena rescue --coordinate --team-5"
    },
    {
      name: "Ana García",
      role: "Instructora de Supervivencia",
      company: "Escuela de Supervivencia",
      avatar: "🌿",
      rating: 5,
      quote: "Recomiendo Athena a todos mis estudiantes. Las guías interactivas son perfectas para aprender técnicas de supervivencia paso a paso.",
      command: "$ athena guide --fire-starting --wet-conditions"
    },
    {
      name: "Luis Martínez",
      role: "Piloto Privado",
      company: "Aviación Civil",
      avatar: "✈️",
      rating: 5,
      quote: "Durante un aterrizaje de emergencia en zona remota, Athena me ayudó a identificar plantas comestibles y encontrar agua potable.",
      command: "$ athena survival --edible-plants --water-purification"
    },
    {
      name: "Sofia Torres",
      role: "Mochilera Experta",
      company: "Aventuras Extremas",
      avatar: "🎒",
      rating: 5,
      quote: "He viajado por 30 países y Athena siempre me ha mantenido segura. Los mapas offline son increíbles en zonas sin señal.",
      command: "$ athena navigation --offline --download-region"
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
            HISTORIAS DE SUPERVIVENCIA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
            Profesionales de emergencias, aventureros y supervivientes comparten cómo Athena Pocket les ha ayudado en situaciones críticas.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background border border-primary/20 rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden terminal-card"
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
                <div className="bg-background-tertiary border border-primary/10 rounded-sm p-2 font-terminal text-xs group-hover:border-primary/30 transition-all duration-300">
                  <span className="text-primary-dim group-hover:text-primary transition-colors duration-300">{testimonial.command}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-6 terminal-border">
            <p className="text-muted-foreground font-terminal mb-4">
              ¿Tienes tu propia historia de supervivencia con Athena?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-sm font-terminal font-bold hover:bg-primary-glow transition-all duration-300 terminal-glow">
                COMPARTIR HISTORIA
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-sm font-terminal hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                VER MÁS TESTIMONIOS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;