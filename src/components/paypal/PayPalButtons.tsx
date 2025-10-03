import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Heart, 
  Crown, 
  Star, 
  Zap,
  CheckCircle,
  XCircle,
  Loader2,
  Gift,
  Shield,
  Users,
  Calendar
} from "lucide-react";
import { usePayPal } from "@/hooks/usePayPal";

interface PayPalButtonsProps {
  type: 'donation' | 'subscription';
  amount?: number;
  planId?: string;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
}

const PayPalButtons = ({ type, amount, planId, onSuccess, onError }: PayPalButtonsProps) => {
  const { 
    isLoaded, 
    plans, 
    createPayPalOrder, 
    capturePayPalPayment, 
    createPayPalSubscription 
  } = usePayPal();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'creating_order' | 'approving' | 'capturing' | 'success' | 'error'>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const donationTiers = [
    { amount: 5, title: "Soporte Básico", description: "Ayuda a mantener el proyecto", benefits: ["Acceso a contenido exclusivo", "Badge de soporte"], icon: Heart },
    { amount: 25, title: "Soporte Premium", description: "Nuestro tier más popular", benefits: ["Todo del tier básico", "Acceso temprano a features", "Soporte prioritario"], icon: Star },
    { amount: 50, title: "Soporte VIP", description: "Para los verdaderos fans", benefits: ["Todo del tier premium", "Mentoría personalizada", "Nombre en créditos"], icon: Crown },
    { amount: 100, title: "Patrón Legendario", description: "El máximo nivel de soporte", benefits: ["Todo del tier VIP", "Sesión privada 1-on-1", "Producto físico exclusivo"], icon: Zap }
  ];

  const handleDonation = async (donationAmount: number) => {
    if (type !== 'donation') return;
    
    setIsProcessing(true);
    setCurrentStep('creating_order');
    setErrorMessage(null);

    try {
      // Crear orden de PayPal
      const order = await createPayPalOrder(donationAmount, 'EUR', `Donación: ${donationAmount}€`);
      setOrderId(order.orderId);
      setCurrentStep('approving');

      // Simular aprobación del usuario
      setTimeout(() => {
        setCurrentStep('capturing');
        handleCapturePayment(order.orderId, donationAmount);
      }, 2000);

    } catch (error) {
      setCurrentStep('error');
      setErrorMessage('Error al crear la orden de PayPal');
      onError?.('Error al crear la orden de PayPal');
      setIsProcessing(false);
    }
  };

  const handleSubscription = async (selectedPlanId: string) => {
    if (type !== 'subscription') return;
    
    setIsProcessing(true);
    setCurrentStep('creating_order');
    setErrorMessage(null);

    try {
      const plan = plans.find(p => p.id === selectedPlanId);
      if (!plan) throw new Error('Plan no encontrado');

      // Crear suscripción de PayPal
      const subscription = await createPayPalSubscription(selectedPlanId, 'usuario@test.com', 'Usuario Test');
      
      if (subscription.success) {
        setCurrentStep('success');
        onSuccess?.(subscription.subscriptionId!);
      } else {
        setCurrentStep('error');
        setErrorMessage(subscription.error || 'Error al crear la suscripción');
        onError?.(subscription.error || 'Error al crear la suscripción');
      }
    } catch (error) {
      setCurrentStep('error');
      setErrorMessage('Error al crear la suscripción');
      onError?.('Error al crear la suscripción');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCapturePayment = async (orderId: string, amount: number) => {
    try {
      const capture = await capturePayPalPayment(orderId);
      
      if (capture.success) {
        setCurrentStep('success');
        onSuccess?.(capture.transactionId!);
      } else {
        setCurrentStep('error');
        setErrorMessage(capture.error || 'Error al procesar el pago');
        onError?.(capture.error || 'Error al procesar el pago');
      }
    } catch (error) {
      setCurrentStep('error');
      setErrorMessage('Error al procesar el pago');
      onError?.('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'creating_order':
        return <Loader2 className="h-5 w-5 animate-spin" />;
      case 'approving':
        return <Shield className="h-5 w-5" />;
      case 'capturing':
        return <CreditCard className="h-5 w-5" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStepText = () => {
    switch (currentStep) {
      case 'creating_order':
        return 'Creando orden de PayPal...';
      case 'approving':
        return 'Esperando aprobación...';
      case 'capturing':
        return 'Procesando pago...';
      case 'success':
        return '¡Pago exitoso!';
      case 'error':
        return 'Error en el proceso';
      default:
        return '';
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 font-terminal">Cargando PayPal...</span>
      </div>
    );
  }

  if (type === 'donation') {
    return (
      <div className="space-y-6">
        {/* Estado del proceso */}
        {currentStep !== 'idle' && (
          <Card className="terminal-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {getStepIcon()}
                <div>
                  <p className="font-terminal text-primary">{getStepText()}</p>
                  {orderId && (
                    <p className="text-sm text-muted-foreground font-terminal">
                      Orden: {orderId}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tiers de Donación */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {donationTiers.map((tier) => {
            const IconComponent = tier.icon;
            return (
              <Card key={tier.amount} className="terminal-border hover:border-primary/50 transition-all duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-terminal text-lg">{tier.title}</CardTitle>
                  <p className="text-sm text-muted-foreground font-terminal">{tier.description}</p>
                  <div className="text-2xl font-bold text-primary font-terminal">€{tier.amount}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm text-muted-foreground font-terminal">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full font-terminal"
                    onClick={() => handleDonation(tier.amount)}
                    disabled={isProcessing}
                  >
                    {isProcessing && currentStep === 'creating_order' ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Gift className="h-4 w-4 mr-2" />
                        Donar €{tier.amount}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Información de PayPal */}
        <Card className="terminal-border">
          <CardHeader>
            <CardTitle className="font-terminal flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>INFORMACIÓN DE PAYPAL</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">Seguro</div>
                <div className="text-sm text-muted-foreground font-terminal">Pagos encriptados SSL</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">Rápido</div>
                <div className="text-sm text-muted-foreground font-terminal">Procesamiento instantáneo</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">Confiable</div>
                <div className="text-sm text-muted-foreground font-terminal">Millones de usuarios</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (type === 'subscription') {
    return (
      <div className="space-y-6">
        {/* Estado del proceso */}
        {currentStep !== 'idle' && (
          <Card className="terminal-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {getStepIcon()}
                <div>
                  <p className="font-terminal text-primary">{getStepText()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Planes de Suscripción */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <Card key={plan.id} className="terminal-border hover:border-primary/50 transition-all duration-300">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-terminal text-lg">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground font-terminal">{plan.description}</p>
                <div className="text-2xl font-bold text-primary font-terminal">€{plan.amount}</div>
                <Badge variant="outline" className="font-terminal">
                  {plan.interval === 'monthly' ? 'Mensual' : 'Anual'}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground font-terminal">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full font-terminal"
                  onClick={() => handleSubscription(plan.id)}
                  disabled={isProcessing}
                >
                  {isProcessing && currentStep === 'creating_order' ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4 mr-2" />
                      Suscribirse
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Información de Suscripciones */}
        <Card className="terminal-border">
          <CardHeader>
            <CardTitle className="font-terminal flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>INFORMACIÓN DE SUSCRIPCIONES</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">Flexible</div>
                <div className="text-sm text-muted-foreground font-terminal">Cancela cuando quieras</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">Automático</div>
                <div className="text-sm text-muted-foreground font-terminal">Renovación automática</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">Beneficios</div>
                <div className="text-sm text-muted-foreground font-terminal">Acceso continuo</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default PayPalButtons;
