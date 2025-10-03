import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Calendar,
  Pause,
  Play,
  X,
  RefreshCw,
  TrendingUp,
  Users,
  HardDrive,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  ArrowUpDown
} from "lucide-react";
import { useSubscriptions, UserSubscription } from "@/hooks/useSubscriptions";

interface SubscriptionManagementProps {
  userId?: string;
}

const SubscriptionManagement = ({ userId = 'current_user' }: SubscriptionManagementProps) => {
  const { 
    userSubscriptions, 
    plans, 
    usage,
    cancelSubscription, 
    pauseSubscription, 
    resumeSubscription, 
    changePlan,
    getSubscriptionStats,
    getUserSubscription,
    getSubscriptionUsage
  } = useSubscriptions();

  const [activeTab, setActiveTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const currentSubscription = getUserSubscription(userId);
  const currentUsage = currentSubscription ? getSubscriptionUsage(currentSubscription.id) : null;
  const stats = getSubscriptionStats();

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm('¿Estás seguro de que quieres cancelar tu suscripción?')) return;
    
    setIsProcessing(subscriptionId);
    try {
      const result = await cancelSubscription(subscriptionId);
      if (result.success) {
        // Aquí podrías mostrar un mensaje de éxito
        console.log('Suscripción cancelada exitosamente');
      }
    } catch (error) {
      console.error('Error al cancelar suscripción:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  const handlePauseSubscription = async (subscriptionId: string) => {
    const pauseUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 días
    setIsProcessing(subscriptionId);
    try {
      const result = await pauseSubscription(subscriptionId, pauseUntil);
      if (result.success) {
        console.log('Suscripción pausada exitosamente');
      }
    } catch (error) {
      console.error('Error al pausar suscripción:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleResumeSubscription = async (subscriptionId: string) => {
    setIsProcessing(subscriptionId);
    try {
      const result = await resumeSubscription(subscriptionId);
      if (result.success) {
        console.log('Suscripción reanudada exitosamente');
      }
    } catch (error) {
      console.error('Error al reanudar suscripción:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleChangePlan = async (subscriptionId: string, newPlanId: string) => {
    if (!confirm('¿Estás seguro de que quieres cambiar tu plan?')) return;
    
    setIsProcessing(subscriptionId);
    try {
      const result = await changePlan(subscriptionId, newPlanId);
      if (result.success) {
        console.log('Plan cambiado exitosamente');
      }
    } catch (error) {
      console.error('Error al cambiar plan:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Activo</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Cancelado</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Pausado</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/30">Expirado</Badge>;
      case 'pending':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary font-terminal">GESTIÓN DE SUSCRIPCIONES</h2>
          <p className="text-muted-foreground font-terminal">Administra tu suscripción y plan actual</p>
        </div>
        <Button className="font-terminal">
          <Settings className="h-4 w-4 mr-2" />
          Configuración
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="terminal-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary font-terminal">{stats.activeSubscriptions}</div>
            <div className="text-sm text-muted-foreground font-terminal">Suscripciones Activas</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary font-terminal">€{stats.monthlyRecurringRevenue.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground font-terminal">MRR</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary font-terminal">{stats.churnRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground font-terminal">Tasa de Cancelación</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary font-terminal">€{stats.averageRevenuePerUser.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground font-terminal">ARPU</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 font-terminal">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="current">Plan Actual</TabsTrigger>
          <TabsTrigger value="usage">Uso</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        {/* Tab Resumen */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Plan Actual */}
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>PLAN ACTUAL</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentSubscription ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold font-terminal text-primary">{currentSubscription.planName}</h3>
                      {getStatusBadge(currentSubscription.status)}
                    </div>
                    <div className="text-2xl font-bold text-primary font-terminal">
                      €{currentSubscription.amount.toFixed(2)}
                      <span className="text-sm text-muted-foreground font-normal">/mes</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Próxima facturación: {formatDate(currentSubscription.nextBillingDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="h-4 w-4" />
                        <span>Renovación automática: {currentSubscription.autoRenew ? 'Activada' : 'Desactivada'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-terminal">No tienes una suscripción activa</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Uso del mes actual */}
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>USO DEL MES</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentUsage ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-terminal">Llamadas API</span>
                      <span className="font-bold font-terminal">{currentUsage.apiCalls.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-terminal">Almacenamiento</span>
                      <span className="font-bold font-terminal">{currentUsage.storageUsed} GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-terminal">Ancho de banda</span>
                      <span className="font-bold font-terminal">{currentUsage.bandwidthUsed} GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-terminal">Usuarios</span>
                      <span className="font-bold font-terminal">{currentUsage.usersCount}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-terminal">No hay datos de uso disponibles</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Plan Actual */}
        <TabsContent value="current" className="space-y-6">
          {currentSubscription ? (
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>DETALLES DE SUSCRIPCIÓN</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Información del plan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold font-terminal text-primary mb-3">Información del Plan</h3>
                      <div className="space-y-2 text-sm font-terminal">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan:</span>
                          <span>{currentSubscription.planName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Precio:</span>
                          <span>€{currentSubscription.amount.toFixed(2)}/mes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estado:</span>
                          {getStatusBadge(currentSubscription.status)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Método de pago:</span>
                          <span className="capitalize">{currentSubscription.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold font-terminal text-primary mb-3">Fechas Importantes</h3>
                      <div className="space-y-2 text-sm font-terminal">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Inicio:</span>
                          <span>{formatDate(currentSubscription.startDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Próxima facturación:</span>
                          <span>{formatDate(currentSubscription.nextBillingDate)}</span>
                        </div>
                        {currentSubscription.cancelledAt && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cancelado:</span>
                            <span>{formatDate(currentSubscription.cancelledAt)}</span>
                          </div>
                        )}
                        {currentSubscription.pauseUntil && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pausado hasta:</span>
                            <span>{formatDate(currentSubscription.pauseUntil)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="pt-6 border-t border-primary/20">
                    <h3 className="font-bold font-terminal text-primary mb-4">Acciones</h3>
                    <div className="flex flex-wrap gap-3">
                      {currentSubscription.status === 'active' && (
                        <>
                          <Button 
                            variant="outline" 
                            className="font-terminal"
                            onClick={() => handlePauseSubscription(currentSubscription.id)}
                            disabled={isProcessing === currentSubscription.id}
                          >
                            {isProcessing === currentSubscription.id ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Pause className="h-4 w-4 mr-2" />
                            )}
                            Pausar
                          </Button>
                          <Button 
                            variant="outline" 
                            className="font-terminal"
                            onClick={() => handleCancelSubscription(currentSubscription.id)}
                            disabled={isProcessing === currentSubscription.id}
                          >
                            {isProcessing === currentSubscription.id ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <X className="h-4 w-4 mr-2" />
                            )}
                            Cancelar
                          </Button>
                        </>
                      )}
                      {currentSubscription.status === 'paused' && (
                        <Button 
                          className="font-terminal"
                          onClick={() => handleResumeSubscription(currentSubscription.id)}
                          disabled={isProcessing === currentSubscription.id}
                        >
                          {isProcessing === currentSubscription.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Play className="h-4 w-4 mr-2" />
                          )}
                          Reanudar
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        className="font-terminal"
                        onClick={() => setActiveTab('overview')}
                      >
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Cambiar Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="terminal-border">
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold font-terminal text-primary mb-2">Sin Suscripción Activa</h3>
                <p className="text-muted-foreground font-terminal mb-6">
                  No tienes una suscripción activa. Elige un plan para comenzar.
                </p>
                <Button className="font-terminal">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Ver Planes
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab Uso */}
        <TabsContent value="usage" className="space-y-6">
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>ANÁLISIS DE USO</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentUsage ? (
                <div className="space-y-6">
                  {/* Métricas principales */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-background-secondary rounded-sm">
                      <div className="text-2xl font-bold text-primary font-terminal">{currentUsage.apiCalls.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground font-terminal">Llamadas API</div>
                    </div>
                    <div className="text-center p-4 bg-background-secondary rounded-sm">
                      <div className="text-2xl font-bold text-primary font-terminal">{currentUsage.storageUsed} GB</div>
                      <div className="text-sm text-muted-foreground font-terminal">Almacenamiento</div>
                    </div>
                    <div className="text-center p-4 bg-background-secondary rounded-sm">
                      <div className="text-2xl font-bold text-primary font-terminal">{currentUsage.bandwidthUsed} GB</div>
                      <div className="text-sm text-muted-foreground font-terminal">Ancho de banda</div>
                    </div>
                    <div className="text-center p-4 bg-background-secondary rounded-sm">
                      <div className="text-2xl font-bold text-primary font-terminal">{currentUsage.usersCount}</div>
                      <div className="text-sm text-muted-foreground font-terminal">Usuarios</div>
                    </div>
                  </div>

                  {/* Detalles de uso */}
                  <div className="space-y-4">
                    <h3 className="font-bold font-terminal text-primary">Detalles del Uso</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                        <div className="flex items-center space-x-3">
                          <Code className="h-5 w-5 text-primary" />
                          <span className="font-terminal">Llamadas API</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-terminal">{currentUsage.apiCalls.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground font-terminal">Este mes</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                        <div className="flex items-center space-x-3">
                          <HardDrive className="h-5 w-5 text-primary" />
                          <span className="font-terminal">Almacenamiento usado</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-terminal">{currentUsage.storageUsed} GB</div>
                          <div className="text-xs text-muted-foreground font-terminal">De almacenamiento</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <span className="font-terminal">Ancho de banda</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-terminal">{currentUsage.bandwidthUsed} GB</div>
                          <div className="text-xs text-muted-foreground font-terminal">Transferencia</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-terminal">Usuarios activos</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold font-terminal">{currentUsage.usersCount}</div>
                          <div className="text-xs text-muted-foreground font-terminal">En el proyecto</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-terminal text-primary mb-2">Sin Datos de Uso</h3>
                  <p className="text-muted-foreground font-terminal">
                    No hay datos de uso disponibles para mostrar.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Historial */}
        <TabsContent value="history" className="space-y-6">
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>HISTORIAL DE SUSCRIPCIONES</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold font-terminal text-primary">{subscription.planName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                          <span>€{subscription.amount.toFixed(2)}/mes</span>
                          <span>•</span>
                          <span>{formatDate(subscription.startDate)}</span>
                          <span>•</span>
                          <span className="capitalize">{subscription.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(subscription.status)}
                      <div className="text-xs text-muted-foreground font-terminal mt-1">
                        {subscription.status === 'active' && `Renovación: ${formatDate(subscription.nextBillingDate)}`}
                        {subscription.status === 'cancelled' && subscription.cancelledAt && `Cancelado: ${formatDate(subscription.cancelledAt)}`}
                        {subscription.status === 'paused' && subscription.pauseUntil && `Pausado hasta: ${formatDate(subscription.pauseUntil)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagement;
