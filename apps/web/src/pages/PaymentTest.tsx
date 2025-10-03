import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  CreditCard,
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";
import PaymentForm from "@/components/PaymentForm";

const PaymentTest = () => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [paymentId, setPaymentId] = useState<string>('');

  const handlePaymentSuccess = (id: string) => {
    setPaymentId(id);
    setPaymentStatus('success');
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    setPaymentStatus('error');
  };

  const resetPayment = () => {
    setPaymentStatus(null);
    setPaymentId('');
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="terminal-border max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary font-terminal mb-2">
              ¡PAGO EXITOSO!
            </h2>
            <p className="text-muted-foreground font-terminal mb-4">
              Tu suscripción ha sido activada correctamente.
            </p>
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-3 mb-6">
              <p className="text-xs font-terminal text-muted-foreground">ID de Transacción:</p>
              <p className="font-mono text-sm text-primary">{paymentId}</p>
            </div>
            <div className="space-y-3">
              <Link to="/admin">
                <Button className="w-full font-terminal glow-effect">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Admin
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={resetPayment}
                className="w-full font-terminal"
              >
                Probar Otro Pago
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="terminal-border max-w-md w-full">
          <CardContent className="p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-500 font-terminal mb-2">
              ERROR EN EL PAGO
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Hubo un problema al procesar tu pago. Inténtalo de nuevo.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={resetPayment}
                className="w-full font-terminal glow-effect"
              >
                Intentar de Nuevo
              </Button>
              <Link to="/admin">
                <Button variant="outline" className="w-full font-terminal">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Admin
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background-secondary border-b border-primary/30 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/admin" className="flex items-center space-x-2 group">
            <ArrowLeft className="h-5 w-5 text-primary group-hover:animate-pulse" />
            <span className="font-terminal text-primary">Volver al Admin</span>
          </Link>
          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal">
            MODO PRUEBA
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              PRUEBA DE SISTEMA DE PAGOS
            </h1>
            <p className="text-xl text-muted-foreground font-terminal max-w-2xl mx-auto">
              Prueba la integración completa de Stripe y PayPal con el sistema de pagos de Athena Pocket.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <PaymentForm
                amount={29.99}
                currency="USD"
                description="Suscripción Athena PRO - Mensual"
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>INFORMACIÓN DE PRUEBA</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-terminal font-medium text-primary mb-2">Tarjetas de Prueba Stripe:</h4>
                    <div className="space-y-2 text-sm font-terminal">
                      <div className="bg-background-secondary p-2 rounded-sm">
                        <span className="text-muted-foreground">Visa:</span> 4242 4242 4242 4242
                      </div>
                      <div className="bg-background-secondary p-2 rounded-sm">
                        <span className="text-muted-foreground">Mastercard:</span> 5555 5555 5555 4444
                      </div>
                      <div className="bg-background-secondary p-2 rounded-sm">
                        <span className="text-muted-foreground">American Express:</span> 3782 822463 10005
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-terminal font-medium text-primary mb-2">Datos de Prueba:</h4>
                    <div className="space-y-1 text-sm font-terminal text-muted-foreground">
                      <p>• Fecha de vencimiento: Cualquier fecha futura</p>
                      <p>• CVV: Cualquier número de 3-4 dígitos</p>
                      <p>• Código postal: Cualquier código válido</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>FUNCIONALIDADES</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm font-terminal">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Validación de formularios en tiempo real</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Formateo automático de números de tarjeta</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Simulación de procesamiento de pago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Manejo de errores y estados de carga</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Integración con panel de administración</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTest; 