import { Download, Github, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadSection = () => {
  const downloadOptions = [
    {
      platform: "Windows",
      version: "v2.1.0",
      size: "45.2 MB",
      format: ".exe",
      icon: "🪟"
    },
    {
      platform: "macOS",
      version: "v2.1.0", 
      size: "38.7 MB",
      format: ".dmg",
      icon: "🍎"
    },
    {
      platform: "Linux",
      version: "v2.1.0",
      size: "32.1 MB", 
      format: ".deb/.rpm",
      icon: "🐧"
    }
  ];

  const plans = [
    {
      name: "ATHENA FREE",
      price: "GRATIS",
      description: "Perfecto para uso personal y proyectos pequeños",
      features: [
        "✓ CLI completo con interfaz retro",
        "✓ Hasta 50 tareas automatizadas",
        "✓ 100+ scripts predefinidos",
        "✓ Soporte básico por email",
        "✓ Actualizaciones automáticas"
      ],
      cta: "DESCARGAR GRATIS",
      popular: false
    },
    {
      name: "ATHENA PRO",
      price: "$29.99",
      description: "Para desarrolladores y equipos productivos",
      features: [
        "✓ Todo lo de la versión FREE",
        "✓ Tareas ilimitadas",
        "✓ 1000+ scripts premium",
        "✓ Integración con APIs",
        "✓ Soporte prioritario 24/7",
        "✓ Temas personalizados",
        "✓ Backup en la nube"
      ],
      cta: "COMPRAR PRO",
      popular: true
    }
  ];

  return (
    <section id="downloads" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-background-secondary border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --download</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
            DESCARGAS & PLANES
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
            Elige la versión que mejor se adapte a tus necesidades. Comienza gratis y escala cuando lo necesites.
          </p>
        </div>

        {/* Download Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary font-terminal text-center mb-8">
            DESCARGA DIRECTA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {downloadOptions.map((option, index) => (
              <div
                key={index}
                className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h4 className="text-xl font-bold text-primary font-terminal mb-2">
                    {option.platform}
                  </h4>
                  <div className="space-y-1 mb-6 text-sm font-terminal text-muted-foreground">
                    <div>Versión: {option.version}</div>
                    <div>Tamaño: {option.size}</div>
                    <div>Formato: {option.format}</div>
                  </div>
                  <Button variant="terminal" className="w-full group-hover:scale-105 transition-transform">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary font-terminal text-center mb-8">
            PLANES DISPONIBLES
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-background-secondary border rounded-sm p-8 terminal-border transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-primary/50 ring-2 ring-primary/20' 
                    : 'border-primary/20 hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-sm text-xs font-terminal font-bold">
                      MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-primary font-terminal mb-2">
                    {plan.name}
                  </h4>
                  <div className="text-3xl font-bold text-primary terminal-glow font-terminal mb-2">
                    {plan.price}
                  </div>
                  <p className="text-muted-foreground font-terminal text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="text-muted-foreground font-terminal text-sm"
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.popular ? "cta" : "terminal"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Downloads */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-primary font-terminal mb-6">
            OTROS MÉTODOS DE DESCARGA
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="group">
              <Github className="h-4 w-4" />
              GitHub Releases
            </Button>
            <Button variant="outline" className="group">
              <Star className="h-4 w-4" />
              Package Managers
            </Button>
            <Button variant="outline" className="group">
              <Heart className="h-4 w-4" />
              Donar al Proyecto
            </Button>
          </div>
          <p className="text-muted-foreground font-terminal text-sm mt-4">
            npm install -g athena-pocket | brew install athena-pocket | choco install athena-pocket
          </p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;