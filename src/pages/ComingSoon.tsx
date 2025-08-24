import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Download, 
  Bell, 
  Share2, 
  Heart, 
  Shield, 
  Map, 
  Brain,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fecha objetivo: 3 meses desde ahora
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + 3);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // Aquí se guardaría el email en una base de datos
      console.log("Email suscrito:", email);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "IA de Supervivencia",
      description: "Asistente inteligente que analiza tu situación y te da consejos personalizados"
    },
    {
      icon: Map,
      title: "Mapas Offline",
      description: "Navegación completa sin conexión a internet en cualquier parte del mundo"
    },
    {
      icon: Shield,
      title: "Alertas SOS",
      description: "Sistema de emergencia con geoposicionamiento automático"
    },
    {
      icon: Heart,
      title: "Primeros Auxilios",
      description: "Guías interactivas de medicina de emergencia paso a paso"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <Shield className="h-8 w-8 text-primary terminal-glow group-hover:animate-pulse" />
              <span className="text-xl font-terminal font-bold text-primary terminal-glow">
                ATHENA_POCKET
              </span>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm" className="font-terminal">
                <ArrowLeft className="h-4 w-4 mr-2" />
                VOLVER AL SITIO
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 terminal-scanlines" />
          <div className="absolute inset-0 terminal-crt" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              {/* App Icon */}
              <div className="mb-8">
                <div className="inline-block bg-background-secondary border border-primary/30 rounded-sm p-8 terminal-border">
                  <Smartphone className="h-24 w-24 text-primary terminal-glow mx-auto" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-primary terminal-glow font-terminal mb-6">
                ATHENA POCKET
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-terminal mb-8">
                Tu compañero de supervivencia con IA
              </p>

              {/* Countdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <Card key={unit} className="terminal-border bg-background-secondary">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary terminal-glow font-terminal">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-muted-foreground font-terminal uppercase">
                        {unit}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button variant="cta" size="xl" className="group glow-effect">
                  <Bell className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  NOTIFICARME CUANDO ESTÉ LISTA
                </Button>
                <Button variant="terminal" size="xl" className="group glow-effect">
                  <Share2 className="h-5 w-5 mr-2" />
                  COMPARTIR
                </Button>
              </div>

              {/* Progress Badge */}
              <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal text-sm">
                DESARROLLO: 75% COMPLETADO
              </Badge>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
                FUNCIONALIDADES PRINCIPALES
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
                Descubre las increíbles características que harán de Athena Pocket tu mejor aliado en situaciones de emergencia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="terminal-card group hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 text-primary terminal-glow mx-auto mb-4 group-hover:animate-pulse" />
                    <h3 className="text-lg font-bold text-primary font-terminal mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-terminal text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="terminal-border bg-background-secondary">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary font-terminal">
                    ¡SÉ EL PRIMERO EN SABERLO!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <p className="text-muted-foreground font-terminal">
                        Suscríbete para recibir notificaciones cuando la app esté disponible y obtener acceso anticipado.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@email.com"
                          className="flex-1 p-3 border border-primary/20 rounded-sm bg-background font-terminal text-foreground"
                          required
                        />
                        <Button type="submit" variant="cta" className="glow-effect">
                          <Bell className="h-4 w-4 mr-2" />
                          SUSCRIBIRSE
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎉</div>
                      <h3 className="text-xl font-bold text-primary font-terminal mb-2">
                        ¡SUSCRITO EXITOSAMENTE!
                      </h3>
                      <p className="text-muted-foreground font-terminal">
                        Te notificaremos cuando Athena Pocket esté disponible para descargar.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-primary/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground font-terminal text-sm">
              © 2024 Athena Pocket. Desarrollado con ❤️ para la comunidad de supervivencia.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link to="/" className="text-primary hover:text-primary-glow font-terminal text-sm">
                Sitio Web
              </Link>
              <Link to="/donar" className="text-primary hover:text-primary-glow font-terminal text-sm">
                Donar
              </Link>
              <Link to="/contacto" className="text-primary hover:text-primary-glow font-terminal text-sm">
                Contacto
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon; 