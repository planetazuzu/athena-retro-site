import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  ShoppingCart
} from "lucide-react";

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'paypal';
  date: string;
  description: string;
  email: string;
}

const TransactionManager = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
    pendingTransactions: 0,
    failedTransactions: 0
  });

  // Simular datos de transacciones
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: "txn_001",
        customer: "Carlos Rodriguez",
        amount: 29.99,
        currency: "USD",
        status: "completed",
        paymentMethod: "stripe",
        date: "2024-01-15T10:30:00Z",
        description: "Suscripción Athena PRO - Mensual",
        email: "carlos@email.com"
      },
      {
        id: "txn_002",
        customer: "Maria Santos",
        amount: 99.99,
        currency: "USD",
        status: "completed",
        paymentMethod: "paypal",
        date: "2024-01-14T15:45:00Z",
        description: "Suscripción Athena PRO - Anual",
        email: "maria@email.com"
      },
      {
        id: "txn_003",
        customer: "Alex Chen",
        amount: 29.99,
        currency: "USD",
        status: "pending",
        paymentMethod: "stripe",
        date: "2024-01-15T09:15:00Z",
        description: "Suscripción Athena PRO - Mensual",
        email: "alex@email.com"
      },
      {
        id: "txn_004",
        customer: "Ana García",
        amount: 29.99,
        currency: "USD",
        status: "failed",
        paymentMethod: "stripe",
        date: "2024-01-15T08:20:00Z",
        description: "Suscripción Athena PRO - Mensual",
        email: "ana@email.com"
      },
      {
        id: "txn_005",
        customer: "Luis Martínez",
        amount: 99.99,
        currency: "USD",
        status: "refunded",
        paymentMethod: "paypal",
        date: "2024-01-13T14:30:00Z",
        description: "Suscripción Athena PRO - Anual",
        email: "luis@email.com"
      }
    ];

    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
    
    // Calcular estadísticas
    const totalRevenue = mockTransactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
    
    setStats({
      totalRevenue,
      totalTransactions: mockTransactions.length,
      pendingTransactions: mockTransactions.filter(t => t.status === 'pending').length,
      failedTransactions: mockTransactions.filter(t => t.status === 'failed').length
    });
    
    setIsLoading(false);
  }, []);

  // Filtrar transacciones
  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: "bg-green-500/10 border-green-500/30 text-green-500", text: "COMPLETADO" },
      pending: { color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-500", text: "PENDIENTE" },
      failed: { color: "bg-red-500/10 border-red-500/30 text-red-500", text: "FALLIDO" },
      refunded: { color: "bg-blue-500/10 border-blue-500/30 text-blue-500", text: "REEMBOLSADO" }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant="outline" className={`font-terminal ${config.color}`}>
        {config.text}
      </Badge>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    return method === 'stripe' ? <DollarSign className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simular refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Cliente,Email,Monto,Estado,Método,Fecha,Descripción\n" +
      filteredTransactions.map(t => 
        `${t.id},${t.customer},${t.email},${t.amount} ${t.currency},${t.status},${t.paymentMethod},${formatDate(t.date)},${t.description}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transacciones.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CreditCard className="h-6 w-6 text-primary terminal-glow" />
          <h2 className="text-2xl font-bold text-primary font-terminal">
            GESTIÓN DE TRANSACCIONES
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="font-terminal"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="font-terminal"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Ingresos Totales</p>
                <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Total Transacciones</p>
                <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                  {stats.totalTransactions}
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-500 terminal-glow font-terminal">
                  {stats.pendingTransactions}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Fallidas</p>
                <p className="text-2xl font-bold text-red-500 terminal-glow font-terminal">
                  {stats.failedTransactions}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-terminal"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-primary/20 rounded-sm bg-background font-terminal"
              >
                <option value="all">Todos los estados</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
                <option value="failed">Fallidos</option>
                <option value="refunded">Reembolsados</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">
            Transacciones ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full font-terminal">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left p-2 text-sm font-medium text-primary">ID</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Cliente</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Email</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Monto</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Estado</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Método</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Fecha</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <td className="p-2 text-sm font-mono text-muted-foreground">
                      {transaction.id}
                    </td>
                    <td className="p-2 text-sm">
                      {transaction.customer}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {transaction.email}
                    </td>
                    <td className="p-2 text-sm font-bold">
                      ${transaction.amount} {transaction.currency}
                    </td>
                    <td className="p-2">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-1">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                        <span className="text-sm capitalize">{transaction.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm" className="font-terminal">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionManager; 