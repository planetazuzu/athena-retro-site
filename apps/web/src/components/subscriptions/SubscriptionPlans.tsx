import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Star, 
  Zap, 
  Crown,
  Shield,
  Gift,
  CreditCard,
  Calendar
} from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  popular: boolean;
  icon: string;
  color: string;
}

interface SubscriptionPlansProps {
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  currentPlan?: string;
}

const SubscriptionPlans = ({ onSelectPlan, currentPlan }: SubscriptionPlansProps) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Gratuito',
      description: 'Perfecto para empezar con las funcionalidades básicas',
      price: 0,
      period: 'monthly',
      features: [
        'Acceso básico a la aplicación',
        'Mapas offline limitados',
        'Comunidad básica',
        'Soporte por email',
        'Hasta 5 marcadores personalizados'
      ],
      popular: false,
      icon: '🆓',
      color: 'bg-gray-500/20 border-gray-500/30'
    },
    {
      id: 'basic',
      name: 'Básico',
      description: 'Para usuarios que necesitan más funcionalidades',
      price: billingPeriod === 'yearly' ? 4.99 : 6.99,
      period: billingPeriod,
      features: [
        'Todas las funcionalidades gratuitas',
        'Mapas offline ilimitados',
        'Sincronización entre dispositivos',
        'Soporte prioritario',
        'Marcadores ilimitados',
        'Exportar datos'
      ],
      popular: true,
      icon: '⭐',
      color: 'bg-blue-500/20 border-blue-500/30'
    },
    {
      id: 'pro',
      name: 'Profesional',
      description: 'Para profesionales y equipos',
      price: billingPeriod === 'yearly' ? 9.99 : 14.99,
      period: billingPeriod,
      features: [
        'Todas las funcionalidades básicas',
        'IA avanzada de supervivencia',
        'Integración con dispositivos IoT',
        'Soporte 24/7',
        'Colaboración en equipo',
        'API personalizada',
        'Análisis avanzados'
      ],
      popular: false,
      icon: '👑',
      color: 'bg-purple-500/20 border-purple-500/30'
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      description: 'Para organizaciones grandes',
      price: billingPeriod === 'yearly' ? 24.99 : 39.99,
      period: billingPeriod,
      features: [
        'Todas las funcionalidades profesionales',
        'Despliegue on-premise',
        'SSO y LDAP',
        'Soporte dedicado',
        'Capacitación personalizada',
        'SLA garantizado',
        'Integraciones personalizadas'
      ],
      popular: false,
      icon: '🏢',
      color: 'bg-yellow-500/20 border-yellow-500/30'
    }
  ];

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    onSelectPlan?.(plan);
    console.log('Plan seleccionado:', plan);
  };

  const getDiscount = (plan: SubscriptionPlan) => {
    if (plan.id === 'free') return 0;
    
    const monthlyPrice = plan.id === 'basic' ? 6.99 : plan.id === 'pro' ? 14.99 : 39.99;
    const yearlyPrice = plan.id === 'basic' ? 4.99 : plan.id === 'pro' ? 9.99 : 24.99;
    
    if (billingPeriod === 'yearly') {
      return Math.round(((monthlyPrice * 12) - (yearlyPrice * 12)) / (monthlyPrice * 12) * 100);
    }
    
    return 0;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold font-terminal text-primary mb-4">
          🚀 Planes de Suscripción
        </h2>
        <p className="text-muted-foreground font-terminal text-lg">
          Elige el plan que mejor se adapte a tus necesidades de supervivencia digital
        </p>
      </div>

      {/* Selector de período de facturación */}
      <div className="flex justify-center">
        <div className="bg-muted p-1 rounded-lg">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-md font-terminal transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-md font-terminal transition-colors ${
              billingPeriod === 'yearly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Anual
            {billingPeriod === 'yearly' && (
              <Badge variant="default" className="ml-2 bg-green-500">
                -30%
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const discount = getDiscount(plan);
          const isCurrentPlan = currentPlan === plan.id;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-primary' : ''} ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground font-terminal">
                    <Star className="h-3 w-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white font-terminal">
                    <Check className="h-3 w-3 mr-1" />
                    Plan Actual
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <CardTitle className="font-terminal text-primary">
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-terminal">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Precio */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-3xl font-bold font-terminal text-primary">
                      €{plan.price.toFixed(2)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground font-terminal">
                        /{plan.period === 'monthly' ? 'mes' : 'año'}
                      </span>
                    )}
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-sm text-muted-foreground font-terminal line-through">
                        €{(plan.price * (100 / (100 - discount))).toFixed(2)}
                      </span>
                      <Badge variant="default" className="bg-green-500">
                        -{discount}%
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Características */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-terminal text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Botón de acción */}
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full font-terminal ${
                    isCurrentPlan
                      ? 'bg-green-500 hover:bg-green-600'
                      : plan.popular
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Plan Actual
                    </>
                  ) : plan.price === 0 ? (
                    'Comenzar Gratis'
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Suscribirse
                    </>
                  )}
                </Button>

                {plan.price > 0 && (
                  <p className="text-xs text-center text-muted-foreground font-terminal">
                    💳 Pago seguro • Cancela cuando quieras
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Información adicional */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-bold font-terminal text-primary mb-1">Garantía 30 días</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Prueba sin riesgo. Reembolso completo si no estás satisfecho.
              </p>
            </div>
            <div>
              <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-bold font-terminal text-primary mb-1">Actualizaciones gratuitas</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Todas las nuevas funcionalidades incluidas en tu plan.
              </p>
            </div>
            <div>
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-bold font-terminal text-primary mb-1">Flexibilidad total</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Cambia de plan o cancela en cualquier momento.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
