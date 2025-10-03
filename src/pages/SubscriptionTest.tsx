import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Crown, 
  Star, 
  Zap,
  Users,
  TrendingUp,
  BarChart3,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Shield,
  Clock,
  ArrowRight,
  Loader2
} from "lucide-react";
import SubscriptionPlans from "@/components/subscriptions/SubscriptionPlans";
import SubscriptionManagement from "@/components/subscriptions/SubscriptionManagement";
import { useSubscriptions } from "@/hooks/useSubscriptions";

const SubscriptionTest = () => {
  const { getSubscriptionStats, plans, userSubscriptions } = useSubscriptions();
  const [activeTab, setActiveTab] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const stats = getSubscriptionStats();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setActiveTab('management');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-primary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <CreditCard className="h-12 w-12 text-primary terminal-glow" />
              <h1 className="text-4xl font-bold text-primary font-terminal">SISTEMA DE SUSCRIPCIONES</h1>
            </div>
            <p className="text-xl text-muted-foreground font-terminal max-w-2xl mx-auto">
              Gestiona suscripciones, planes y facturación. Sistema completo de monetización para tu proyecto.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Banner de Plan Seleccionado */}
        {selectedPlan && (
          <Card className="terminal-border bg-green-500/10 border-green-500/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="font-terminal text-green-500 font-bold">¡Plan Seleccionado!</h3>
                  <p className="text-sm text-green-400 font-terminal">
                    Has seleccionado el plan: {plans.find(p => p.id === selectedPlan)?.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="terminal-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary font-terminal">{stats.activeSubscriptions}</div>
              <div className="text-sm text-muted-foreground font-terminal">Suscripciones Activas</div>
            </CardContent>
          </Card>
          <Card className="terminal-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary font-terminal">€{stats.monthlyRecurringRevenue.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground font-terminal">MRR (Ingresos Recurrentes)</div>
            </CardContent>
          </Card>
          <Card className="terminal-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary font-terminal">€{stats.averageRevenuePerUser.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground font-terminal">ARPU (Ingreso por Usuario)</div>
            </CardContent>
          </Card>
          <Card className="terminal-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary font-terminal">{stats.churnRate.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground font-terminal">Tasa de Cancelación</div>
            </CardContent>
          </Card>
        </div>

        {/* Análisis de Planes */}
        <Card className="terminal-border mb-8">
          <CardHeader>
            <CardTitle className="font-terminal flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>ANÁLISIS DE PLANES</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.planStats.map((planStat) => (
                <div key={planStat.planId} className="text-center p-4 bg-background-secondary rounded-sm">
                  <div className="text-lg font-bold text-primary font-terminal">{planStat.planName}</div>
                  <div className="text-2xl font-bold text-primary font-terminal mt-2">{planStat.subscribers}</div>
                  <div className="text-sm text-muted-foreground font-terminal">Suscriptores</div>
                  <div className="text-lg font-bold text-green-400 font-terminal mt-2">€{planStat.revenue.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground font-terminal">Ingresos</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Funcionalidades */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 font-terminal">
            <TabsTrigger value="plans">Planes</TabsTrigger>
            <TabsTrigger value="management">Gestión</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab de Planes */}
          <TabsContent value="plans" className="space-y-6">
            <SubscriptionPlans 
              onSelectPlan={handleSelectPlan}
              currentPlanId={selectedPlan}
            />
          </TabsContent>

          {/* Tab de Gestión */}
          <TabsContent value="management" className="space-y-6">
            <SubscriptionManagement userId="current_user" />
          </TabsContent>

          {/* Tab de Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-2">ANALYTICS DE SUSCRIPCIONES</h2>
              <p className="text-muted-foreground font-terminal">
                Análisis detallado del rendimiento de suscripciones y métricas clave.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Métricas de Crecimiento */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>MÉTRICAS DE CRECIMIENTO</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-terminal">Nuevos Suscriptores</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-terminal text-green-400">+12</div>
                        <div className="text-xs text-muted-foreground font-terminal">Este mes</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="font-terminal">Crecimiento MRR</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-terminal text-green-400">+15.3%</div>
                        <div className="text-xs text-muted-foreground font-terminal">vs mes anterior</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <span className="font-terminal">Tasa de Conversión</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-terminal text-blue-400">3.2%</div>
                        <div className="text-xs text-muted-foreground font-terminal">Trial a pago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Análisis de Retención */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>ANÁLISIS DE RETENCIÓN</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-terminal">Retención 30 días</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-terminal text-green-400">87.5%</div>
                        <div className="text-xs text-muted-foreground font-terminal">Usuarios activos</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        <span className="font-terminal">Tasa de Churn</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-terminal text-red-400">{stats.churnRate.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground font-terminal">Cancelaciones</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="font-terminal">Vida promedio</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-terminal text-blue-400">8.2 meses</div>
                        <div className="text-xs text-muted-foreground font-terminal">Por suscriptor</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Rendimiento */}
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>RENDIMIENTO MENSUAL</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400 font-terminal">+18%</div>
                    <div className="text-sm text-muted-foreground font-terminal">Crecimiento MRR</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400 font-terminal">€{stats.monthlyRecurringRevenue.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground font-terminal">MRR Actual</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400 font-terminal">{stats.activeSubscriptions}</div>
                    <div className="text-sm text-muted-foreground font-terminal">Suscriptores</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400 font-terminal">€{stats.averageRevenuePerUser.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground font-terminal">ARPU</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Información para Testing */}
        <Card className="terminal-border mt-8">
          <CardHeader>
            <CardTitle className="font-terminal flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>INFORMACIÓN PARA TESTING</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground font-terminal">
                Este es un sistema de prueba que simula la gestión completa de suscripciones. En producción, se conectaría con sistemas de pago reales.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-terminal font-bold text-primary mb-2">Características del Sistema:</h4>
                  <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                    <li>• Gestión completa de planes de suscripción</li>
                    <li>• Sistema de facturación automática</li>
                    <li>• Pausar/reanudar suscripciones</li>
                    <li>• Cambio de planes dinámico</li>
                    <li>• Analytics y métricas en tiempo real</li>
                    <li>• Gestión de uso y límites</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-terminal font-bold text-primary mb-2">Próximos Pasos:</h4>
                  <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                    <li>• Integración con Stripe/PayPal real</li>
                    <li>• Webhooks de facturación</li>
                    <li>• Base de datos persistente</li>
                    <li>• Sistema de notificaciones</li>
                    <li>• Reportes avanzados</li>
                    <li>• Gestión de trials y promociones</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionTest;
