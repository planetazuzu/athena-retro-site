import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, X, Settings, CheckCircle } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  onCustomize: () => void;
}

const CookieConsent = ({ onAccept, onDecline, onCustomize }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Mostrar después de 1 segundo
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <Card className="terminal-border bg-background-secondary border-primary/30 max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-primary terminal-glow" />
              <h3 className="text-lg font-bold text-primary font-terminal">
                POLÍTICA DE COOKIES
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-primary"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground font-terminal text-sm leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia en Athena Pocket. Algunas son necesarias para el funcionamiento del sitio, 
              otras nos ayudan a mejorar nuestros servicios y personalizar el contenido.
            </p>

            {showDetails && (
              <div className="bg-background border border-primary/20 rounded-sm p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-terminal font-bold text-primary">Cookies Necesarias</h4>
                    <p className="text-muted-foreground font-terminal text-xs">
                      Funcionamiento básico del sitio
                    </p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-terminal font-bold text-primary">Cookies Analíticas</h4>
                    <p className="text-muted-foreground font-terminal text-xs">
                      Estadísticas de uso y rendimiento
                    </p>
                  </div>
                  <div className="w-4 h-4 border border-primary rounded-sm bg-primary/20" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-terminal font-bold text-primary">Cookies de Marketing</h4>
                    <p className="text-muted-foreground font-terminal text-xs">
                      Publicidad personalizada
                    </p>
                  </div>
                  <div className="w-4 h-4 border border-primary rounded-sm" />
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  onAccept();
                  setIsVisible(false);
                }}
                variant="cta"
                size="sm"
                className="glow-effect font-terminal"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                ACEPTAR TODAS
              </Button>
              
              <Button
                onClick={() => {
                  onDecline();
                  setIsVisible(false);
                }}
                variant="outline"
                size="sm"
                className="font-terminal"
              >
                RECHAZAR
              </Button>
              
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="ghost"
                size="sm"
                className="font-terminal"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showDetails ? "OCULTAR" : "PERSONALIZAR"}
              </Button>
            </div>

            <p className="text-muted-foreground font-terminal text-xs">
              Puedes cambiar tus preferencias en cualquier momento desde la configuración.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent; 