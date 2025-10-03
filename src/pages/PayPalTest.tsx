import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Heart, 
  Crown, 
  Star, 
  Zap,
  Target,
  BarChart3,
  Users,
  Calendar,
  Euro,
  TrendingUp,
  Shield,
  CheckCircle
} from "lucide-react";
import PayPalButtons from "@/components/paypal/PayPalButtons";
import { usePayPal } from "@/hooks/usePayPal";

const PayPalTest = () => {
  const { getPayPalStats, transactions, subscriptions, plans } = usePayPal();
  const [activeTab, setActiveTab] = useState('donations');
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTransactionId, setLastTransactionId] = useState<string>('');

  const stats = getPayPalStats();

  const handleSuccess = (transactionId: string) => {
    setLastTransactionId(transactionId);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleError = (error: string) => {
    console.error('Error en PayPal:', error);
  };

  const donationTiers = [
    { amount: 5, title: "Soporte Básico", description: "Ayuda a mantener el proyecto", benefits: ["Acceso a contenido exclusivo", "Badge de soporte"], icon: Heart, color: "text-blue-400" },
    { amount: 25, title: "Soporte Premium", description: "Nuestro tier más popular", benefits: ["Todo del tier básico", "Acceso temprano a features", "Soporte prioritario"], icon: Star, color: "text-green-400" },
    { amount: 50, title: "Soporte VIP", description: "Para los verdaderos fans", benefits: ["Todo del tier premium", "Mentoría personalizada", "Nombre en créditos"], icon: Crown, color: "text-purple-400" },
    { amount: 100, title: "Patrón Legendario", description: "El máximo nivel de soporte", benefits: ["Todo del tier VIP", "Sesión privada 1-on-1", "Producto físico exclusivo"], icon: Zap, color: "text-yellow-400" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-primary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <CreditCard className="h-12 w-12 text-primary terminal-glow" />
              <h1 className="text-4xl font-bold text-primary font-terminal">SISTEMA PAYPAL</h1>
            </div>
            <p className="text-xl text-muted-foreground font-terminal max-w-2xl mx-auto">
              Prueba nuestro sistema completo de pagos con PayPal. Donaciones, suscripciones y mucho más.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Banner de Éxito */}
        {showSuccess && (
          <Card className="terminal-border bg-green-500/10 border-green-500/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="font-terminal text-green-500 font-bold">¡Transacción Exitosa!</h3>
                  <p className="text-sm text-green-400 font-terminal">
                    ID de transacción: {lastTransactionId}
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
              <div className="text-2xl font-bold text-primary font-terminal">€{stats.totalAmount.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground font-terminal">Total Recaudado</div>
            </CardContent>
          </Card>
          <Card className="terminal-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary font-terminal">{stats.totalTransactions}</div>
              <div className="text-sm text-muted-foreground font-terminal">Transacciones</div>
            </CardContent>
          </Card>
          <Card className="terminal-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary font-terminal">{stats.activeSubscriptions}</div>
              <div className="text-sm text-muted-foreground font-terminal">Suscripciones Activas</div>
            </CardContent>
          </Card>
          <Card className="terminal-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary font-terminal">€{stats.netAmount.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground font-terminal">Neto (Sin Comisiones)</div>
            </CardContent>
          </Card>
        </div>

        {/* Meta de Financiamiento */}
        <Card className="terminal-border mb-8">
          <CardHeader>
            <CardTitle className="font-terminal flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>META DE FINANCIAMIENTO</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-terminal text-lg">Progreso: €{stats.totalAmount.toFixed(2)} / €1,000</span>
                <Badge variant="outline" className="font-terminal">
                  {((stats.totalAmount / 1000) * 100).toFixed(1)}%
                </Badge>
              </div>
              <div className="w-full bg-background-secondary rounded-full h-4">
                <div 
                  className="bg-primary h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats.totalAmount / 1000) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary font-terminal">€{stats.totalAmount.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground font-terminal">Recaudado</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary font-terminal">€{(1000 - stats.totalAmount).toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground font-terminal">Faltan</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary font-terminal">{stats.totalTransactions}</div>
                  <div className="text-sm text-muted-foreground font-terminal">Transacciones</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Funcionalidades */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 font-terminal">
            <TabsTrigger value="donations">Donaciones</TabsTrigger>
            <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab de Donaciones */}
          <TabsContent value="donations" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-2">SISTEMA DE DONACIONES</h2>
              <p className="text-muted-foreground font-terminal">
                Apoya nuestro proyecto con PayPal. Cada donación nos ayuda a seguir creando contenido de calidad.
              </p>
            </div>

            <PayPalButtons 
              type="donation" 
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </TabsContent>

          {/* Tab de Suscripciones */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-2">PLANES DE SUSCRIPCIÓN</h2>
              <p className="text-muted-foreground font-terminal">
                Accede a contenido exclusivo y beneficios especiales con nuestros planes de suscripción.
              </p>
            </div>

            <PayPalButtons 
              type="subscription" 
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </TabsContent>

          {/* Tab de Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-2">ANALYTICS Y REPORTES</h2>
              <p className="text-muted-foreground font-terminal">
                Estadísticas detalladas de nuestro sistema de pagos y donaciones.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transacciones Recientes */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>TRANSACCIONES RECIENTES</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                        <div>
                          <div className="font-medium font-terminal">{txn.customerName}</div>
                          <div className="text-sm text-muted-foreground font-terminal">{txn.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary font-terminal">€{txn.amount}</div>
                          <Badge variant="outline" className="text-xs">
                            {txn.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suscripciones Activas */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>SUSCRIPCIONES ACTIVAS</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subscriptions.filter(s => s.status === 'active').slice(0, 5).map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                        <div>
                          <div className="font-medium font-terminal">{sub.customerName}</div>
                          <div className="text-sm text-muted-foreground font-terminal">{sub.planName}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary font-terminal">€{sub.amount}</div>
                          <Badge variant="outline" className="text-xs">
                            {sub.interval}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos de Rendimiento */}
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>RENDIMIENTO MENSUAL</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400 font-terminal">+15%</div>
                    <div className="text-sm text-muted-foreground font-terminal">Crecimiento</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400 font-terminal">€{stats.totalAmount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground font-terminal">Este Mes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400 font-terminal">{stats.totalTransactions}</div>
                    <div className="text-sm text-muted-foreground font-terminal">Transacciones</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400 font-terminal">{stats.activeSubscriptions}</div>
                    <div className="text-sm text-muted-foreground font-terminal">Suscriptores</div>
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
                Este es un sistema de prueba que simula la integración con PayPal. En producción, se conectaría con la API real de PayPal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-terminal font-bold text-primary mb-2">Características del Sistema:</h4>
                  <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                    <li>• Simulación completa del flujo de PayPal</li>
                    <li>• Manejo de estados de transacciones</li>
                    <li>• Sistema de suscripciones</li>
                    <li>• Analytics en tiempo real</li>
                    <li>• Interfaz responsive</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-terminal font-bold text-primary mb-2">Próximos Pasos:</h4>
                  <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                    <li>• Integración con PayPal real</li>
                    <li>• Webhooks de PayPal</li>
                    <li>• Base de datos persistente</li>
                    <li>• Sistema de notificaciones</li>
                    <li>• Reportes avanzados</li>
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

export default PayPalTest;
