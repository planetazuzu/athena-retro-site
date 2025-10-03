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
  BarChart3
} from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending' | 'refunded';
  type: 'stripe' | 'paypal' | 'donation' | 'subscription';
  customerName: string;
  customerEmail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  transactionFee: number;
}

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Simular datos de transacciones
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: 'txn_001',
        amount: 25.00,
        currency: 'EUR',
        status: 'succeeded',
        type: 'donation',
        customerName: 'Usuario Test',
        customerEmail: 'usuario@test.com',
        description: 'Donación: Soporte Premium',
        createdAt: '2024-09-01T10:30:00Z',
        updatedAt: '2024-09-01T10:30:00Z',
        paymentMethod: 'stripe',
        transactionFee: 1.25
      },
      {
        id: 'txn_002',
        amount: 50.00,
        currency: 'EUR',
        status: 'succeeded',
        type: 'subscription',
        customerName: 'Usuario VIP',
        customerEmail: 'vip@test.com',
        description: 'Suscripción Mensual VIP',
        createdAt: '2024-08-30T15:45:00Z',
        updatedAt: '2024-08-30T15:45:00Z',
        paymentMethod: 'stripe',
        transactionFee: 2.50
      },
      {
        id: 'txn_003',
        amount: 100.00,
        currency: 'EUR',
        status: 'pending',
        type: 'donation',
        customerName: 'Patrón Legendario',
        customerEmail: 'patron@test.com',
        description: 'Donación: Patrón Legendario',
        createdAt: '2024-08-29T09:15:00Z',
        updatedAt: '2024-08-29T09:15:00Z',
        paymentMethod: 'paypal',
        transactionFee: 5.00
      },
      {
        id: 'txn_004',
        amount: 5.00,
        currency: 'EUR',
        status: 'failed',
        type: 'donation',
        customerName: 'Usuario Básico',
        customerEmail: 'basico@test.com',
        description: 'Donación: Soporte Básico',
        createdAt: '2024-08-28T14:20:00Z',
        updatedAt: '2024-08-28T14:20:00Z',
        paymentMethod: 'stripe',
        transactionFee: 0.25
      },
      {
        id: 'txn_005',
        amount: 75.00,
        currency: 'EUR',
        status: 'refunded',
        type: 'subscription',
        customerName: 'Usuario Reembolso',
        customerEmail: 'reembolso@test.com',
        description: 'Suscripción Anual Premium',
        createdAt: '2024-08-25T11:00:00Z',
        updatedAt: '2024-08-27T16:30:00Z',
        paymentMethod: 'stripe',
        transactionFee: 3.75
      }
    ];
    
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  // Filtrar transacciones
  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(txn => 
        txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(txn => txn.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(txn => txn.type === typeFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, typeFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Exitoso</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Fallido</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Pendiente</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Reembolsado</Badge>;
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
      case 'stripe':
        return <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/30">Stripe</Badge>;
      case 'paypal':
        return <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">PayPal</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'stripe':
        return <CreditCard className="h-4 w-4 text-indigo-400" />;
      case 'paypal':
        return <div className="w-4 h-4 bg-blue-500 rounded-sm" />;
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const calculateTotals = () => {
    const succeeded = filteredTransactions.filter(t => t.status === 'succeeded');
    const totalAmount = succeeded.reduce((sum, t) => sum + t.amount, 0);
    const totalFees = succeeded.reduce((sum, t) => sum + t.transactionFee, 0);
    const netAmount = totalAmount - totalFees;
    
    return { totalAmount, totalFees, netAmount };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold font-terminal">GESTIÓN DE TRANSACCIONES</h2>
        </div>
        <Button className="font-terminal">
          <Download className="h-4 w-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transacciones..."
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
              <option value="succeeded">Exitosas</option>
              <option value="failed">Fallidas</option>
              <option value="pending">Pendientes</option>
              <option value="refunded">Reembolsadas</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los tipos</option>
              <option value="donation">Donaciones</option>
              <option value="subscription">Suscripciones</option>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
            </select>

            <div className="text-sm text-muted-foreground font-terminal flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {filteredTransactions.length} transacciones
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen Financiero */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>RESUMEN FINANCIERO</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                €{totals.totalAmount.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Total Bruto</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                €{totals.totalFees.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Comisiones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                €{totals.netAmount.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Neto</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {filteredTransactions.filter(t => t.status === 'succeeded').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Transacciones</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Transacciones */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="terminal-border hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    {getPaymentMethodIcon(transaction.paymentMethod)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold font-terminal text-primary">{transaction.id}</h3>
                      {getStatusBadge(transaction.status)}
                      {getTypeBadge(transaction.type)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
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
                    Neto: €{(transaction.amount - transaction.transactionFee).toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estadísticas por Estado */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">ESTADÍSTICAS POR ESTADO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400 font-terminal">
                {transactions.filter(t => t.status === 'succeeded').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Exitosas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400 font-terminal">
                {transactions.filter(t => t.status === 'failed').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Fallidas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 font-terminal">
                {transactions.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Pendientes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 font-terminal">
                {transactions.filter(t => t.status === 'refunded').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Reembolsadas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionManagement;
