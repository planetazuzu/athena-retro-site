import { Download, Github, Heart, Star, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DownloadSection = () => {
  const downloadOptions = [
    {
      platform: "Android",
      version: "v1.0.0",
      size: "45.2 MB",
      format: ".apk",
      icon: "🤖",
      store: "Google Play"
    },
    {
      platform: "iOS", 
      version: "v1.0.0",
      size: "38.7 MB",
      format: ".ipa",
      icon: "🍎",
      store: "App Store"
    },
    {
      platform: "Web App",
      version: "v1.0.0",
      size: "PWA",
      format: "Progressive Web App",
      icon: "🌐",
      store: "Navegador"
    }
  ];

  const plans = [
    {
      name: "ATHENA FREE",
      price: "GRATIS",
      description: "Perfecto para emergencias básicas y uso personal",
      features: [
        "✓ IA de supervivencia básica",
        "✓ Mapas offline (5 regiones)",
        "✓ Alertas SOS (3 contactos)",
        "✓ Guías de primeros auxilios",
        "✓ Soporte por email"
      ],
      cta: "DESCARGAR GRATIS",
      popular: false
    },
    {
      name: "ATHENA PRO",
      price: "$9.99/mes",
      description: "Para aventureros y profesionales de emergencias",
      features: [
        "✓ Todo lo de la versión FREE",
        "✓ IA avanzada con análisis de situación",
        "✓ Mapas offline ilimitados",
        "✓ Alertas SOS ilimitadas",
        "✓ Guías premium de supervivencia",
        "✓ Soporte prioritario 24/7",
        "✓ Backup en la nube",
        "✓ Modo offline completo"
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
            Elige la versión que mejor se adapte a tus necesidades de supervivencia. Comienza gratis y escala cuando lo necesites.
          </p>
        </div>

        {/* Download Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary font-terminal text-center mb-8">
            DISPONIBLE PRÓXIMAMENTE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {downloadOptions.map((option, index) => (
              <div
                key={index}
                className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300 group terminal-card"
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
                    <div>Tienda: {option.store}</div>
                  </div>
                  <Button asChild variant="terminal" className="w-full group-hover:scale-105 transition-transform glow-effect">
                    <Link to="/app">
                      <Download className="h-4 w-4 mr-2" />
                      NOTIFICARME
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary font-terminal text-center mb-8">
            PLANES DE SUSCRIPCIÓN
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-background-secondary border rounded-sm p-6 terminal-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden ${
                  plan.popular ? 'border-primary/50' : 'border-primary/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-terminal">
                    MÁS POPULAR
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

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <span className="text-primary font-terminal">✓</span>
                      <span className="text-muted-foreground font-terminal text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild
                  variant={plan.popular ? "cta" : "terminal"} 
                  className="w-full group-hover:scale-105 transition-transform glow-effect"
                >
                  <Link to="/app">
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-block bg-background-secondary border border-primary/30 rounded-sm p-6 terminal-border max-w-2xl">
            <h4 className="text-xl font-bold text-primary font-terminal mb-4">
              ¿POR QUÉ ATHENA POCKET?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-terminal">
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-primary font-bold">Seguridad</div>
                <div className="text-muted-foreground">Datos encriptados y privacidad garantizada</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌍</div>
                <div className="text-primary font-bold">Offline</div>
                <div className="text-muted-foreground">Funciona sin conexión a internet</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className="text-primary font-bold">IA Avanzada</div>
                <div className="text-muted-foreground">Análisis inteligente de situaciones</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;