import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Euro,
  Calendar,
  TrendingUp,
  BarChart3,
  Settings,
  RefreshCw,
  AlertTriangle,
  Shield,
  Users,
  Zap,
  Pause,
  Play,
  ArrowUpDown,
  Loader2
} from "lucide-react";
import { useSubscriptions } from "@/hooks/useSubscriptions";

const AdminSubscriptionManagement = () => {
  const { 
    plans,
    userSubscriptions, 
    usage,
    getSubscriptionStats, 
    filterSubscriptions,
    cancelSubscription,
    pauseSubscription,
    resumeSubscription,
    changePlan
  } = useSubscriptions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const stats = getSubscriptionStats();

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (confirm('¿Estás seguro de que quieres cancelar esta suscripción?')) {
      setIsProcessing(subscriptionId);
      try {
        const result = await cancelSubscription(subscriptionId);
        if (result.success) {
          alert('Suscripción cancelada exitosamente');
        } else {
          alert('Error al cancelar la suscripción: ' + result.error);
        }
      } catch (error) {
        alert('Error al cancelar la suscripción');
      } finally {
        setIsProcessing(null);
      }
    }
  };

  const handlePauseSubscription = async (subscriptionId: string) => {
    const pauseUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    setIsProcessing(subscriptionId);
    try {
      const result = await pauseSubscription(subscriptionId, pauseUntil);
      if (result.success) {
        alert('Suscripción pausada exitosamente');
      } else {
        alert('Error al pausar la suscripción: ' + result.error);
      }
    } catch (error) {
      alert('Error al pausar la suscripción');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleResumeSubscription = async (subscriptionId: string) => {
    setIsProcessing(subscriptionId);
    try {
      const result = await resumeSubscription(subscriptionId);
      if (result.success) {
        alert('Suscripción reanudada exitosamente');
      } else {
        alert('Error al reanudar la suscripción: ' + result.error);
      }
    } catch (error) {
      alert('Error al reanudar la suscripción');
    } finally {
      setIsProcessing(null);
    }
  };

  const handleChangePlan = async (subscriptionId: string, newPlanId: string) => {
    if (confirm('¿Estás seguro de que quieres cambiar este plan?')) {
      setIsProcessing(subscriptionId);
      try {
        const result = await changePlan(subscriptionId, newPlanId);
        if (result.success) {
          alert('Plan cambiado exitosamente');
        } else {
          alert('Error al cambiar el plan: ' + result.error);
        }
      } catch (error) {
        alert('Error al cambiar el plan');
      } finally {
        setIsProcessing(null);
      }
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

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'stripe':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Stripe</Badge>;
      case 'paypal':
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">PayPal</Badge>;
      case 'manual':
        return <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/30">Manual</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const filteredSubscriptions = filterSubscriptions({
    status: statusFilter !== 'all' ? statusFilter : undefined,
    planId: planFilter !== 'all' ? planFilter : undefined,
    paymentMethod: paymentMethodFilter !== 'all' ? paymentMethodFilter : undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold font-terminal">GESTIÓN DE SUSCRIPCIONES</h2>
        </div>
        <div className="flex space-x-2">
          <Button className="font-terminal">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar
          </Button>
          <Button className="font-terminal">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Estadísticas de Suscripciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="terminal-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary font-terminal">{stats.totalSubscriptions}</div>
            <div className="text-sm text-muted-foreground font-terminal">Total Suscripciones</div>
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
            <div className="text-2xl font-bold text-primary font-terminal">€{stats.monthlyRecurringRevenue.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground font-terminal">MRR</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary font-terminal">{stats.churnRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground font-terminal">Tasa de Churn</div>
          </CardContent>
        </Card>
      </div>

      {/* Análisis de Planes */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
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

      {/* Filtros */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-terminal"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="cancelled">Cancelados</option>
              <option value="paused">Pausados</option>
              <option value="expired">Expirados</option>
              <option value="pending">Pendientes</option>
            </select>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los planes</option>
              {plans.map(plan => (
                <option key={plan.id} value={plan.id}>{plan.name}</option>
              ))}
            </select>

            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los métodos</option>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="manual">Manual</option>
            </select>

            <Input
              type="date"
              placeholder="Desde"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="font-terminal"
            />

            <Input
              type="date"
              placeholder="Hasta"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="font-terminal"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Suscripciones */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>SUSCRIPCIONES</span>
            <Badge variant="outline" className="ml-2">
              {filteredSubscriptions.length} encontradas
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubscriptions.map((subscription) => (
              <div key={subscription.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold font-terminal text-primary">{subscription.id}</h3>
                      {getStatusBadge(subscription.status)}
                      {getPaymentMethodBadge(subscription.paymentMethod)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>Usuario: {subscription.userId}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Inicio: {formatDate(subscription.startDate)}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground font-terminal">
                      {subscription.planName}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal">
                      <span>Próxima facturación: {formatDate(subscription.nextBillingDate)}</span>
                      <span>Auto-renovación: {subscription.autoRenew ? 'Sí' : 'No'}</span>
                      {subscription.cancelledAt && (
                        <span>Cancelado: {formatDate(subscription.cancelledAt)}</span>
                      )}
                      {subscription.pauseUntil && (
                        <span>Pausado hasta: {formatDate(subscription.pauseUntil)}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold text-primary font-terminal">
                    €{subscription.amount.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground font-terminal">
                    {subscription.planId.includes('yearly') ? 'Anual' : 'Mensual'}
                  </div>
                  <div className="flex space-x-2">
                    {subscription.status === 'active' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handlePauseSubscription(subscription.id)}
                          disabled={isProcessing === subscription.id}
                          className="font-terminal"
                        >
                          {isProcessing === subscription.id ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <Pause className="h-3 w-3 mr-1" />
                          )}
                          Pausar
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCancelSubscription(subscription.id)}
                          disabled={isProcessing === subscription.id}
                          className="font-terminal"
                        >
                          {isProcessing === subscription.id ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          Cancelar
                        </Button>
                      </>
                    )}
                    {subscription.status === 'paused' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleResumeSubscription(subscription.id)}
                        disabled={isProcessing === subscription.id}
                        className="font-terminal"
                      >
                        {isProcessing === subscription.id ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Play className="h-3 w-3 mr-1" />
                        )}
                        Reanudar
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="font-terminal">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gestión de Planes */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>GESTIÓN DE PLANES</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="terminal-border">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-terminal text-lg">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-terminal">{plan.description}</p>
                  <div className="text-2xl font-bold text-primary font-terminal">€{plan.price}</div>
                  <Badge variant="outline" className="font-terminal">
                    {plan.interval === 'monthly' ? 'Mensual' : 'Anual'}
                  </Badge>
                  <Badge variant={plan.active ? "default" : "secondary"} className="ml-2">
                    {plan.active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm text-muted-foreground font-terminal">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 font-terminal">
                      <Settings className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 font-terminal">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSubscriptionManagement;
