import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, Smartphone, Apple, Star, Users, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Descargas = () => {
  const appStores = [
    {
      name: "App Store",
      icon: Apple,
      description: "Disponible para iPhone e iPad",
      rating: "4.8",
      reviews: "2,847",
      link: "#",
      color: "bg-black hover:bg-gray-800"
    },
    {
      name: "Google Play",
      icon: Smartphone,
      description: "Disponible para Android",
      rating: "4.7",
      reviews: "3,156",
      link: "#",
      color: "bg-green-600 hover:bg-green-700"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Gratis",
      description: "Sin costos ocultos ni suscripciones"
    },
    {
      icon: Zap,
      title: "Sin Anuncios",
      description: "Experiencia limpia sin interrupciones"
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Más de 50,000 usuarios activos"
    },
    {
      icon: Star,
      title: "Actualizaciones Regulares",
      description: "Nuevas funciones cada mes"
    }
  ];

  const systemRequirements = {
    ios: {
      title: "iOS",
      requirements: [
        "iOS 12.0 o superior",
        "iPhone 6s o posterior",
        "iPad 5th generation o posterior",
        "100 MB de espacio libre"
      ]
    },
    android: {
      title: "Android",
      requirements: [
        "Android 7.0 (API 24) o superior",
        "2 GB RAM mínimo",
        "100 MB de espacio libre",
        "GPS y sensores de movimiento"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --download</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            DESCARGAR ATHENA POCKET
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Instala Athena Pocket en tu dispositivo móvil y lleva la guía de supervivencia con IA siempre en tu bolsillo.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-12 terminal-border">
              <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-sm p-4 mb-6">
                <span className="text-yellow-500 font-terminal text-lg">🚧 EN DESARROLLO</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-6">
                COMING SOON
              </h2>
              
              <p className="text-xl text-muted-foreground font-terminal mb-8 max-w-2xl mx-auto">
                Athena Pocket está actualmente en desarrollo activo. Estamos trabajando arduamente para traerte la mejor experiencia de supervivencia con IA.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="bg-background border border-primary/20 rounded-sm p-6 mb-4">
                    <Apple className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-primary font-terminal mb-2">iOS</h3>
                    <p className="text-sm text-muted-foreground font-terminal">iPhone & iPad</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-background border border-primary/20 rounded-sm p-6 mb-4">
                    <Smartphone className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-primary font-terminal mb-2">Android</h3>
                    <p className="text-sm text-muted-foreground font-terminal">Phones & Tablets</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground font-terminal">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span>Desarrollo en progreso</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground font-terminal">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Pruebas de calidad</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground font-terminal">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Lanzamiento próximo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              ¿POR QUÉ ATHENA POCKET?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              La app de supervivencia más completa y confiable del mercado
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary font-terminal mb-2">{feature.title}</h3>
                <p className="text-muted-foreground font-terminal text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              REQUISITOS DEL SISTEMA
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Asegúrate de que tu dispositivo cumple con los requisitos mínimos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Object.entries(systemRequirements).map(([key, platform]) => (
              <div key={key} className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border">
                <h3 className="text-xl font-bold text-primary font-terminal mb-4">{platform.title}</h3>
                <ul className="space-y-2">
                  {platform.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground font-terminal">
                      <span className="text-primary mr-2">✓</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots/Demo */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              VISTA PREVIA DE LA APP
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Descubre la interfaz intuitiva y las poderosas herramientas de Athena Pocket
            </p>
          </div>
          
          <div className="bg-background border border-primary/20 rounded-sm p-8 terminal-border text-center">
            <div className="aspect-video bg-background-secondary border border-primary/10 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground font-terminal">
                  Capturas de pantalla y demo de la aplicación
                </p>
                <p className="text-sm text-muted-foreground font-terminal mt-2">
                  (Aquí se mostrarían las capturas reales de la app)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              PREGUNTAS FRECUENTES
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border">
              <h3 className="text-lg font-bold text-primary font-terminal mb-2">¿Es realmente gratis?</h3>
              <p className="text-muted-foreground font-terminal">Sí, Athena Pocket es completamente gratuito. No hay costos ocultos ni suscripciones premium.</p>
            </div>
            
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border">
              <h3 className="text-lg font-bold text-primary font-terminal mb-2">¿Funciona sin internet?</h3>
              <p className="text-muted-foreground font-terminal">Absolutamente. Todas las funciones principales funcionan offline, incluyendo mapas, guías y la IA local.</p>
            </div>
            
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border">
              <h3 className="text-lg font-bold text-primary font-terminal mb-2">¿Qué datos se comparten?</h3>
              <p className="text-muted-foreground font-terminal">Tu privacidad es nuestra prioridad. Solo compartimos datos cuando activas manualmente una alerta SOS.</p>
            </div>
            
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border">
              <h3 className="text-lg font-bold text-primary font-terminal mb-2">¿Puedo usar la app en múltiples dispositivos?</h3>
              <p className="text-muted-foreground font-terminal">Sí, puedes instalar Athena Pocket en todos tus dispositivos móviles sin restricciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-8 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
              ¿Listo para descargar?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Únete a más de 50,000 supervivientes que confían en Athena Pocket
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="#app-store">App Store</Link>
              </Button>
              <Button asChild variant="cta" size="lg">
                <Link to="#google-play">Google Play</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Descargas; 