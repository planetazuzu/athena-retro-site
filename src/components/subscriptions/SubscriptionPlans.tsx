import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Crown, 
  Star, 
  Zap,
  Users,
  HardDrive,
  Headphones,
  Globe,
  BarChart3,
  Code,
  Shield,
  Clock,
  CreditCard,
  Loader2,
  ArrowRight
} from "lucide-react";
import { useSubscriptions, SubscriptionPlan } from "@/hooks/useSubscriptions";

interface SubscriptionPlansProps {
  onSelectPlan?: (planId: string) => void;
  currentPlanId?: string;
  showCurrentPlan?: boolean;
}

const SubscriptionPlans = ({ onSelectPlan, currentPlanId, showCurrentPlan = true }: SubscriptionPlansProps) => {
  const { plans, isLoading, createSubscription } = useSubscriptions();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = async (planId: string) => {
    if (currentPlanId === planId) return;
    
    setSelectedPlan(planId);
    setIsProcessing(true);

    try {
      // Simular creación de suscripción
      const result = await createSubscription('current_user', planId, 'stripe');
      
      if (result.success) {
        onSelectPlan?.(planId);
        // Aquí podrías mostrar un mensaje de éxito
      } else {
        // Aquí podrías mostrar un mensaje de error
        console.error('Error al crear suscripción:', result.error);
      }
    } catch (error) {
      console.error('Error al procesar suscripción:', error);
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  const getPlanIcon = (plan: SubscriptionPlan) => {
    if (plan.popular) return <Crown className="h-6 w-6" />;
    if (plan.id.includes('enterprise')) return <Shield className="h-6 w-6" />;
    if (plan.id.includes('professional')) return <Star className="h-6 w-6" />;
    return <Zap className="h-6 w-6" />;
  };

  const getPlanColor = (plan: SubscriptionPlan) => {
    if (plan.popular) return 'border-yellow-500/50 bg-yellow-500/5';
    if (plan.id.includes('enterprise')) return 'border-purple-500/50 bg-purple-500/5';
    if (plan.id.includes('professional')) return 'border-blue-500/50 bg-blue-500/5';
    return 'border-primary/50 bg-primary/5';
  };

  const formatPrice = (price: number, interval: string) => {
    if (interval === 'yearly') {
      const monthlyPrice = price / 12;
      return {
        display: `€${price.toFixed(2)}`,
        subtext: `€${monthlyPrice.toFixed(2)}/mes`,
        savings: `Ahorra €${((price / 12) * 12 - price).toFixed(2)}`
      };
    }
    return {
      display: `€${price.toFixed(2)}`,
      subtext: `/mes`,
      savings: null
    };
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('proyecto')) return <Zap className="h-4 w-4" />;
    if (feature.includes('almacenamiento') || feature.includes('GB') || feature.includes('TB')) return <HardDrive className="h-4 w-4" />;
    if (feature.includes('soporte')) return <Headphones className="h-4 w-4" />;
    if (feature.includes('API')) return <Code className="h-4 w-4" />;
    if (feature.includes('Analytics') || feature.includes('analytics')) return <BarChart3 className="h-4 w-4" />;
    if (feature.includes('dominio') || feature.includes('personalizado')) return <Globe className="h-4 w-4" />;
    if (feature.includes('usuario')) return <Users className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 font-terminal">Cargando planes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary font-terminal">PLANES DE SUSCRIPCIÓN</h2>
        <p className="text-xl text-muted-foreground font-terminal max-w-2xl mx-auto">
          Elige el plan perfecto para tu proyecto. Todos los planes incluyen soporte y actualizaciones automáticas.
        </p>
      </div>

      {/* Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const priceInfo = formatPrice(plan.price, plan.interval);
          const isCurrentPlan = currentPlanId === plan.id;
          const isSelected = selectedPlan === plan.id;
          const isProcessing = isProcessing && selectedPlan === plan.id;

          return (
            <Card 
              key={plan.id} 
              className={`terminal-border transition-all duration-300 hover:border-primary/70 ${
                plan.popular ? 'ring-2 ring-yellow-500/30' : ''
              } ${getPlanColor(plan)} ${isCurrentPlan ? 'ring-2 ring-green-500/50' : ''}`}
            >
              {/* Badge Popular */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-yellow-900 font-terminal">
                    <Star className="h-3 w-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}

              {/* Badge Plan Actual */}
              {isCurrentPlan && showCurrentPlan && (
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-green-500 text-green-900 font-terminal">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Plan Actual
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    {getPlanIcon(plan)}
                  </div>
                </div>
                
                <CardTitle className="font-terminal text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground font-terminal">{plan.description}</p>
                
                <div className="mt-4">
                  <div className="text-3xl font-bold text-primary font-terminal">
                    {priceInfo.display}
                  </div>
                  <div className="text-sm text-muted-foreground font-terminal">
                    {priceInfo.subtext}
                  </div>
                  {priceInfo.savings && (
                    <div className="text-xs text-green-400 font-terminal mt-1">
                      {priceInfo.savings} al año
                    </div>
                  )}
                </div>

                <Badge variant="outline" className="font-terminal mt-2">
                  {plan.interval === 'monthly' ? 'Mensual' : 'Anual'}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Características */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-sm text-muted-foreground font-terminal">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Detalles del plan */}
                <div className="pt-4 border-t border-primary/20">
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-terminal">
                    {plan.maxUsers && (
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{plan.maxUsers === -1 ? '∞' : plan.maxUsers} usuarios</span>
                      </div>
                    )}
                    {plan.storage && (
                      <div className="flex items-center space-x-1">
                        <HardDrive className="h-3 w-3" />
                        <span>{plan.storage}</span>
                      </div>
                    )}
                    {plan.support && (
                      <div className="flex items-center space-x-1">
                        <Headphones className="h-3 w-3" />
                        <span className="capitalize">{plan.support}</span>
                      </div>
                    )}
                    {plan.customDomain && (
                      <div className="flex items-center space-x-1">
                        <Globe className="h-3 w-3" />
                        <span>Dominio</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón de acción */}
                <Button 
                  className={`w-full font-terminal ${
                    isCurrentPlan 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : plan.popular 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900' 
                        : ''
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : isCurrentPlan ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Plan Actual
                    </>
                  ) : (
                    <>
                      {plan.popular ? (
                        <Crown className="h-4 w-4 mr-2" />
                      ) : (
                        <ArrowRight className="h-4 w-4 mr-2" />
                      )}
                      {plan.interval === 'yearly' ? 'Suscribirse Anual' : 'Suscribirse'}
                    </>
                  )}
                </Button>

                {/* Información adicional */}
                {plan.interval === 'yearly' && (
                  <div className="text-xs text-center text-green-400 font-terminal">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Incluye 2 meses gratis
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Información adicional */}
      <Card className="terminal-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Pago Seguro</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Procesamos pagos de forma segura con Stripe y PayPal
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Cancelación Flexible</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Cancela o cambia tu plan en cualquier momento
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Garantía 30 días</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Si no estás satisfecho, te devolvemos tu dinero
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
