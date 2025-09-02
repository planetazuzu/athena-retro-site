import { useState, useEffect } from 'react';
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
  Zap
} from "lucide-react";
import { usePayPal } from "@/hooks/usePayPal";

const PayPalManagement = () => {
  const { 
    transactions, 
    subscriptions, 
    plans, 
    getPayPalStats, 
    filterTransactions, 
    filterSubscriptions,
    cancelPayPalSubscription,
    refundPayPalPayment
  } = usePayPal();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const stats = getPayPalStats();

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (confirm('¿Estás seguro de que quieres cancelar esta suscripción?')) {
      try {
        const result = await cancelPayPalSubscription(subscriptionId);
        if (result.success) {
          alert('Suscripción cancelada exitosamente');
          // Aquí podrías actualizar el estado local
        } else {
          alert('Error al cancelar la suscripción: ' + result.error);
        }
      } catch (error) {
        alert('Error al cancelar la suscripción');
      }
    }
  };

  const handleRefundPayment = async (transactionId: string) => {
    if (confirm('¿Estás seguro de que quieres reembolsar este pago?')) {
      try {
        const result = await refundPayPalPayment(transactionId);
        if (result.success) {
          alert('Reembolso procesado exitosamente');
          // Aquí podrías actualizar el estado local
        } else {
          alert('Error al procesar el reembolso: ' + result.error);
        }
      } catch (error) {
        alert('Error al procesar el reembolso');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Completado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Pendiente</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Fallido</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Reembolsado</Badge>;
      case 'active':
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Activo</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Cancelado</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Suspendido</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/30">Expirado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'donation':
        return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30">Donación</Badge>;
      case 'subscription':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Suscripción</Badge>;
      case 'one_time':
        return <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30">Pago Único</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const filteredTransactions = filterTransactions({
    status: statusFilter !== 'all' ? statusFilter : undefined,
    type: typeFilter !== 'all' ? typeFilter : undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined
  });

  const filteredSubscriptions = filterSubscriptions({
    status: statusFilter !== 'all' ? statusFilter : undefined,
    planId: 'all'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold font-terminal">GESTIÓN DE PAYPAL</h2>
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

      {/* Estadísticas de PayPal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* Filtros */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <option value="completed">Completados</option>
              <option value="pending">Pendientes</option>
              <option value="failed">Fallidos</option>
              <option value="refunded">Reembolsados</option>
              <option value="active">Activos</option>
              <option value="cancelled">Cancelados</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los tipos</option>
              <option value="donation">Donaciones</option>
              <option value="subscription">Suscripciones</option>
              <option value="one_time">Pagos Únicos</option>
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

      {/* Transacciones */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>TRANSACCIONES PAYPAL</span>
            <Badge variant="outline" className="ml-2">
              {filteredTransactions.length} encontradas
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold font-terminal text-primary">{transaction.id}</h3>
                      {getStatusBadge(transaction.status)}
                      {getTypeBadge(transaction.type)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{transaction.customerName}</span>
                        <span>•</span>
                        <span>{transaction.customerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(transaction.createdAt).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground font-terminal">
                      {transaction.description}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal">
                      <span>PayPal ID: {transaction.paypalOrderId}</span>
                      <span>Payer ID: {transaction.paypalPayerId}</span>
                      {transaction.paypalCaptureId && (
                        <span>Capture ID: {transaction.paypalCaptureId}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold text-primary font-terminal">
                    €{transaction.amount.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground font-terminal">
                    Comisión: €{transaction.transactionFee.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground font-terminal">
                    Neto: €{transaction.netAmount.toFixed(2)}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRefundPayment(transaction.id)}
                      disabled={transaction.status !== 'completed'}
                      className="font-terminal"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Reembolsar
                    </Button>
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

      {/* Suscripciones */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>SUSCRIPCIONES PAYPAL</span>
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
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold font-terminal text-primary">{subscription.id}</h3>
                      {getStatusBadge(subscription.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{subscription.customerName}</span>
                        <span>•</span>
                        <span>{subscription.customerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Inicio: {new Date(subscription.startDate).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground font-terminal">
                      {subscription.planName}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal">
                      <span>PayPal Sub ID: {subscription.paypalSubscriptionId}</span>
                      <span>PayPal Plan ID: {subscription.paypalPlanId}</span>
                      <span>Próxima facturación: {new Date(subscription.nextBillingDate).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold text-primary font-terminal">
                    €{subscription.amount.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground font-terminal">
                    {subscription.planId.includes('monthly') ? 'Mensual' : 'Anual'}
                  </div>
                  <div className="text-xs text-muted-foreground font-terminal">
                    Auto-renovación: {subscription.autoRenew ? 'Sí' : 'No'}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCancelSubscription(subscription.id)}
                      disabled={subscription.status !== 'active'}
                      className="font-terminal"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Cancelar
                    </Button>
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

      {/* Planes de Suscripción */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>PLANES DE SUSCRIPCIÓN</span>
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
                  <div className="text-2xl font-bold text-primary font-terminal">€{plan.amount}</div>
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

      {/* Configuración de PayPal */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>CONFIGURACIÓN DE PAYPAL</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-terminal font-bold text-primary">Configuración de Producción</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Client ID de PayPal
                  </label>
                  <Input 
                    placeholder="Client ID de producción" 
                    className="font-terminal"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Secret de PayPal
                  </label>
                  <Input 
                    placeholder="Secret de producción" 
                    className="font-terminal"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Webhook URL
                  </label>
                  <Input 
                    placeholder="https://tu-sitio.com/api/paypal/webhook" 
                    className="font-terminal"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-terminal font-bold text-primary">Configuración de Sandbox</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Client ID de Sandbox
                  </label>
                  <Input 
                    placeholder="Client ID de sandbox" 
                    className="font-terminal"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Secret de Sandbox
                  </label>
                  <Input 
                    placeholder="Secret de sandbox" 
                    className="font-terminal"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Modo de Operación
                  </label>
                  <select className="w-full bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary">
                    <option value="sandbox">Sandbox (Testing)</option>
                    <option value="production">Producción</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-2">
            <Button className="font-terminal">
              <Shield className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
            <Button variant="outline" className="font-terminal">
              <RefreshCw className="h-4 w-4 mr-2" />
              Probar Conexión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayPalManagement;
