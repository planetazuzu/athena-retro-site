import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/athena-hero.jpg";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "ATHENA POCKET: CLI RETRO PARA TU PRODUCTIVIDAD";

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Terminal Scanlines Effect */}
      <div className="absolute inset-0 terminal-scanlines" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window Header */}
          <div className="inline-block bg-background-secondary border border-primary/30 rounded-t-sm p-3 mb-0 terminal-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground text-sm font-terminal ml-4">~/athena-pocket</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="bg-background border-x border-b border-primary/30 p-8 terminal-border rounded-b-sm">
            {/* Typing Animation */}
            <div className="mb-8">
              <div className="text-left font-terminal text-sm text-muted-foreground mb-2">
                $ athena --info
              </div>
              <h1 className="text-left font-terminal text-2xl md:text-4xl font-bold text-primary terminal-glow min-h-[2.5rem] md:min-h-[4rem]">
                {displayedText}
                <span className="animate-pulse text-primary-glow">|</span>
              </h1>
            </div>

            {/* Description */}
            <div className="text-left mb-8 animate-slide-up">
              <div className="text-muted-foreground font-terminal text-sm mb-2">
                $ athena --description
              </div>
              <p className="text-lg md:text-xl text-foreground font-terminal leading-relaxed">
                La herramienta CLI definitiva para automatizar tareas, gestionar scripts y maximizar tu productividad con el estilo retro que amas.
              </p>
            </div>

            {/* Terminal Commands Preview */}
            <div className="text-left mb-8 bg-background-tertiary border border-primary/20 rounded-sm p-4">
              <div className="space-y-2 font-terminal text-sm">
                <div className="text-primary-dim">$ athena task create "Deploy website"</div>
                <div className="text-muted-foreground">✓ Tarea creada exitosamente</div>
                <div className="text-primary-dim">$ athena script run backup</div>
                <div className="text-muted-foreground">✓ Ejecutando script de respaldo...</div>
                <div className="text-primary-dim">$ athena stats --today</div>
                <div className="text-muted-foreground">✓ 12 tareas completadas, 3.2h ahorradas</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start animate-slide-up">
              <Button variant="cta" size="xl" className="group">
                <Download className="h-5 w-5 group-hover:animate-bounce" />
                DESCARGAR GRATIS
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="terminal" size="xl" className="group">
                <Play className="h-5 w-5" />
                VER DEMO
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary terminal-glow font-terminal">50k+</div>
                <div className="text-muted-foreground font-terminal text-sm">Descargas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary terminal-glow font-terminal">1000+</div>
                <div className="text-muted-foreground font-terminal text-sm">Scripts disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary terminal-glow font-terminal">24/7</div>
                <div className="text-muted-foreground font-terminal text-sm">Soporte activo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;