import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Users, Zap, Shield, Gift, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Donaciones = () => {
  const donationTiers = [
    {
      name: "Soporte Básico",
      amount: "5€",
      description: "Ayuda a mantener los servidores",
      benefits: [
        "Acceso a funciones premium",
        "Sin anuncios",
        "Soporte prioritario"
      ]
    },
    {
      name: "Soporte Avanzado",
      amount: "15€",
      description: "Impulsa nuevas funcionalidades",
      benefits: [
        "Todo del plan básico",
        "Nuevas regiones de mapas",
        "Guías exclusivas",
        "Acceso beta a nuevas funciones"
      ]
    },
    {
      name: "Soporte Premium",
      amount: "30€",
      description: "Desarrollo de IA avanzada",
      benefits: [
        "Todo de planes anteriores",
        "IA personalizada",
        "Consultas directas con expertos",
        "Contenido exclusivo mensual"
      ]
    }
  ];

  const impactAreas = [
    {
      icon: Zap,
      title: "Desarrollo de IA",
      description: "Mejorar la inteligencia artificial para consejos más precisos"
    },
    {
      icon: Shield,
      title: "Seguridad",
      description: "Mantener la privacidad y seguridad de todos los usuarios"
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Crear más contenido educativo y eventos de supervivencia"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --donate</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            APOYA ATHENA POCKET
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Ayuda a mantener y actualizar Athena Pocket. Cada donación impulsa nueva IA y contenido de supervivencia.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Heart className="h-8 w-8 text-red-500 animate-pulse" />
            <span className="text-lg font-terminal text-muted-foreground">
              Más de 1,200 donadores ya han contribuido
            </span>
          </div>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              ¿POR QUÉ DONAR?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Tu apoyo nos permite mantener Athena Pocket gratuito para todos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <div key={index} className="text-center">
                <area.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary font-terminal mb-2">{area.title}</h3>
                <p className="text-muted-foreground font-terminal">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              NIVELES DE DONACIÓN
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Elige el nivel que mejor se adapte a tu capacidad de apoyo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {donationTiers.map((tier, index) => (
              <div key={index} className="bg-background border border-primary/20 rounded-sm p-8 terminal-border hover:border-primary/50 transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary font-terminal mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-primary terminal-glow font-terminal mb-2">{tier.amount}</div>
                  <p className="text-muted-foreground font-terminal text-sm">{tier.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground font-terminal">
                      <Star className="h-4 w-4 text-primary mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="w-full font-terminal" variant={index === 1 ? "cta" : "terminal"} size="lg">
                  <Link to="#donate">
                    <Gift className="h-5 w-5 mr-2" />
                    Donar {tier.amount}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-6 text-center">
                DONACIÓN PERSONALIZADA
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary font-terminal mb-2">
                    Cantidad (€)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    className="w-full p-3 bg-background border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                    placeholder="10.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary font-terminal mb-2">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-3 bg-background border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                    placeholder="¿Por qué decides apoyar Athena Pocket?"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    className="rounded border-primary/20 text-primary focus:ring-primary"
                  />
                  <label htmlFor="anonymous" className="text-sm text-muted-foreground font-terminal">
                    Donación anónima
                  </label>
                </div>
                
                <Button className="w-full font-terminal" variant="cta" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Realizar Donación
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              IMPACTO DE LAS DONACIONES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary terminal-glow font-terminal mb-2">€15,420</div>
              <div className="text-muted-foreground font-terminal">Recaudado este año</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary terminal-glow font-terminal mb-2">1,247</div>
              <div className="text-muted-foreground font-terminal">Donadores activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary terminal-glow font-terminal mb-2">24</div>
              <div className="text-muted-foreground font-terminal">Nuevas funciones</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary terminal-glow font-terminal mb-2">50k+</div>
              <div className="text-muted-foreground font-terminal">Usuarios beneficiados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-6 text-center">
                TRANSPARENCIA
              </h2>
              <p className="text-muted-foreground font-terminal mb-6 text-center">
                Creemos en la transparencia total sobre cómo se utilizan las donaciones
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-terminal mb-2">60%</div>
                  <div className="text-muted-foreground font-terminal text-sm">Desarrollo de IA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-terminal mb-2">25%</div>
                  <div className="text-muted-foreground font-terminal text-sm">Infraestructura</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-terminal mb-2">15%</div>
                  <div className="text-muted-foreground font-terminal text-sm">Contenido educativo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-8 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
              ¿Listo para hacer la diferencia?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Cada donación, sin importar el tamaño, nos ayuda a salvar vidas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="#donate">
                  <Heart className="h-5 w-5 mr-2" />
                  Donar Ahora
                </Link>
              </Button>
              <Button asChild variant="terminal" size="lg">
                <Link to="/acerca">Conocer el Equipo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donaciones; 