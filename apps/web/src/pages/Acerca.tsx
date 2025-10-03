import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Heart, Globe } from "lucide-react";

const Acerca = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              ACERCA DE ATHENA POCKET
            </h1>
            <p className="text-xl text-muted-foreground font-terminal max-w-2xl mx-auto">
              Tu compañero de supervivencia Digital con inteligencia artificial
            </p>
          </div>

          {/* Mission */}
          <Card className="terminal-border mb-8">
            <CardHeader>
              <CardTitle className="font-terminal flex items-center space-x-2">
                <Shield className="h-6 w-6" />
                <span>NUESTRA MISIÓN</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-terminal text-muted-foreground leading-relaxed">
                Athena Pocket nace de la necesidad de tener una herramienta de supervivencia 
                inteligente que combine tecnología avanzada con conocimientos tradicionales. 
                Nuestro objetivo es proporcionar a los usuarios una aplicación que no solo 
                les ayude en situaciones de emergencia, sino que también les eduque y 
                prepare para enfrentar cualquier desafío.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="terminal-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold text-primary font-terminal">
                    IA de Supervivencia
                  </h3>
                </div>
                <p className="text-muted-foreground font-terminal text-sm">
                  Asistente inteligente que analiza tu situación y proporciona 
                  consejos personalizados en tiempo real.
                </p>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold text-primary font-terminal">
                    Mapas Offline
                  </h3>
                </div>
                <p className="text-muted-foreground font-terminal text-sm">
                  Navegación completa sin conexión a internet en cualquier 
                  parte del mundo.
                </p>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold text-primary font-terminal">
                    Primeros Auxilios
                  </h3>
                </div>
                <p className="text-muted-foreground font-terminal text-sm">
                  Guías interactivas de medicina de emergencia paso a paso 
                  con instrucciones claras y visuales.
                </p>
              </CardContent>
            </Card>

            <Card className="terminal-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold text-primary font-terminal">
                    Comunidad
                  </h3>
                </div>
                <p className="text-muted-foreground font-terminal text-sm">
                  Conecta con otros entusiastas de la supervivencia y 
                  comparte experiencias y conocimientos.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team */}
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">NUESTRO EQUIPO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="font-terminal font-bold text-primary mb-2">
                    Equipo de Desarrollo
                  </h4>
                  <p className="text-muted-foreground font-terminal text-sm">
                    Expertos en tecnología y desarrollo de aplicaciones móviles
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="font-terminal font-bold text-primary mb-2">
                    Especialistas Médicos
                  </h4>
                  <p className="text-muted-foreground font-terminal text-sm">
                    Profesionales de la salud que validan nuestro contenido médico
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="font-terminal font-bold text-primary mb-2">
                    Instructores de Supervivencia
                  </h4>
                  <p className="text-muted-foreground font-terminal text-sm">
                    Expertos en técnicas de supervivencia y orientación
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Acerca; 