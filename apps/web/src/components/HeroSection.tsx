import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Play, ArrowRight, Shield, Map, Brain, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/athena-hero.jpg";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const fullText = "ATHENA POCKET: SUPERVIVENCIA ASISTIDA POR IA";

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

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6
    }));
    setParticles(newParticles);
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
      
      {/* CRT Effect */}
      <div className="absolute inset-0 terminal-crt" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      {/* Particle Effects */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window Header */}
          <div className="inline-block bg-background-secondary border border-primary/30 rounded-t-sm p-3 mb-0 terminal-border glow-effect">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-muted-foreground text-sm font-terminal ml-4">~/athena-pocket</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="bg-background border-x border-b border-primary/30 p-8 terminal-border rounded-b-sm terminal-card">
            {/* Typing Animation */}
            <div className="mb-8">
              <div className="text-left font-terminal text-sm text-muted-foreground mb-2">
                $ athena --survival-mode
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
                Tu compañero de supervivencia con IA que te guía en situaciones extremas. Mapas offline, alertas SOS, consejos personalizados y más.
              </p>
            </div>

            {/* Survival Features Preview */}
            <div className="text-left mb-8 bg-background-tertiary border border-primary/20 rounded-sm p-4 terminal-card">
              <div className="space-y-2 font-terminal text-sm">
                <div className="text-primary-dim">$ athena map --offline</div>
                <div className="text-muted-foreground">✓ Mapas descargados: 15 regiones</div>
                <div className="text-primary-dim">$ athena ai --emergency "herida en pierna"</div>
                <div className="text-muted-foreground">✓ Primeros auxilios: Presionar herida, elevar pierna</div>
                <div className="text-primary-dim">$ athena sos --location</div>
                <div className="text-muted-foreground">✓ Alerta enviada: Coordenadas GPS compartidas</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start animate-slide-up">
              <Button asChild variant="cta" size="xl" className="group glow-effect">
                <Link to="/app">
                  <Download className="h-5 w-5 group-hover:animate-bounce" />
                  DESCARGAR AHORA
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="terminal" size="xl" className="group glow-effect">
                <Link to="/app">
                  <Play className="h-5 w-5" />
                  VER DEMO
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-primary/20">
              <div className="text-center terminal-card p-4">
                <div className="text-2xl font-bold text-primary terminal-glow font-terminal">50k+</div>
                <div className="text-muted-foreground font-terminal text-sm">Descargas</div>
              </div>
              <div className="text-center terminal-card p-4">
                <div className="text-2xl font-bold text-primary terminal-glow font-terminal">100+</div>
                <div className="text-muted-foreground font-terminal text-sm">Guías de supervivencia</div>
              </div>
              <div className="text-center terminal-card p-4">
                <div className="text-2xl font-bold text-primary terminal-glow font-terminal">24/7</div>
                <div className="text-muted-foreground font-terminal text-sm">IA disponible</div>
              </div>
              <div className="text-center terminal-card p-4">
                <div className="text-2xl font-bold text-primary terminal-glow font-terminal">15</div>
                <div className="text-muted-foreground font-terminal text-sm">Regiones offline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;