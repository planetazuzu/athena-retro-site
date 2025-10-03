import { useState, useEffect } from 'react';

export interface PayPalTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'donation' | 'subscription' | 'one_time';
  customerName: string;
  customerEmail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  paypalOrderId: string;
  paypalPayerId: string;
  paypalPaymentId: string;
  paypalCaptureId?: string;
  paypalRefundId?: string;
  transactionFee: number;
  netAmount: number;
}

export interface PayPalSubscription {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  status: 'active' | 'cancelled' | 'suspended' | 'expired';
  customerName: string;
  customerEmail: string;
  startDate: string;
  nextBillingDate: string;
  paypalSubscriptionId: string;
  paypalPlanId: string;
  autoRenew: boolean;
}

export interface PayPalPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  paypalPlanId: string;
  active: boolean;
  features: string[];
}

export const usePayPal = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<PayPalTransaction[]>([]);
  const [subscriptions, setSubscriptions] = useState<PayPalSubscription[]>([]);
  const [plans, setPlans] = useState<PayPalPlan[]>([]);

  // Simular carga de PayPal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      loadMockData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const loadMockData = () => {
    // Mock transactions
    const mockTransactions: PayPalTransaction[] = [
      {
        id: 'paypal_txn_001',
        amount: 25.00,
        currency: 'EUR',
        status: 'completed',
        type: 'donation',
        customerName: 'Usuario Test',
        customerEmail: 'usuario@test.com',
        description: 'Donación: Soporte Premium',
        createdAt: '2024-09-01T10:30:00Z',
        updatedAt: '2024-09-01T10:30:00Z',
        paypalOrderId: 'PAY-123456789',
        paypalPayerId: 'PAYER123456',
        paypalPaymentId: 'PAYMENT123456',
        paypalCaptureId: 'CAPTURE123456',
        transactionFee: 1.25,
        netAmount: 23.75
      },
      {
        id: 'paypal_txn_002',
        amount: 50.00,
        currency: 'EUR',
        status: 'completed',
        type: 'subscription',
        customerName: 'Usuario VIP',
        customerEmail: 'vip@test.com',
        description: 'Suscripción Mensual VIP',
        createdAt: '2024-08-30T15:45:00Z',
        updatedAt: '2024-08-30T15:45:00Z',
        paypalOrderId: 'PAY-987654321',
        paypalPayerId: 'PAYER987654',
        paypalPaymentId: 'PAYMENT987654',
        paypalCaptureId: 'CAPTURE987654',
        transactionFee: 2.50,
        netAmount: 47.50
      },
      {
        id: 'paypal_txn_003',
        amount: 100.00,
        currency: 'EUR',
        status: 'pending',
        type: 'donation',
        customerName: 'Patrón Legendario',
        customerEmail: 'patron@test.com',
        description: 'Donación: Patrón Legendario',
        createdAt: '2024-08-29T09:15:00Z',
        updatedAt: '2024-08-29T09:15:00Z',
        paypalOrderId: 'PAY-456789123',
        paypalPayerId: 'PAYER456789',
        paypalPaymentId: 'PAYMENT456789',
        transactionFee: 5.00,
        netAmount: 95.00
      }
    ];

    // Mock subscriptions
    const mockSubscriptions: PayPalSubscription[] = [
      {
        id: 'sub_001',
        planId: 'plan_vip',
        planName: 'Plan VIP Mensual',
        amount: 50.00,
        currency: 'EUR',
        status: 'active',
        customerName: 'Usuario VIP',
        customerEmail: 'vip@test.com',
        startDate: '2024-08-01T00:00:00Z',
        nextBillingDate: '2024-10-01T00:00:00Z',
        paypalSubscriptionId: 'I-1234567890',
        paypalPlanId: 'P-1234567890',
        autoRenew: true
      },
      {
        id: 'sub_002',
        planId: 'plan_premium',
        planName: 'Plan Premium Anual',
        amount: 500.00,
        currency: 'EUR',
        status: 'active',
        customerName: 'Usuario Premium',
        customerEmail: 'premium@test.com',
        startDate: '2024-07-01T00:00:00Z',
        nextBillingDate: '2025-07-01T00:00:00Z',
        paypalSubscriptionId: 'I-0987654321',
        paypalPlanId: 'P-0987654321',
        autoRenew: true
      }
    ];

    // Mock plans
    const mockPlans: PayPalPlan[] = [
      {
        id: 'plan_basic',
        name: 'Plan Básico',
        description: 'Acceso básico a contenido exclusivo',
        amount: 5.00,
        currency: 'EUR',
        interval: 'monthly',
        paypalPlanId: 'P-BASIC-MONTHLY',
        active: true,
        features: ['Contenido exclusivo', 'Badge de soporte', 'Acceso a foros']
      },
      {
        id: 'plan_premium',
        name: 'Plan Premium',
        description: 'Acceso completo con beneficios especiales',
        amount: 25.00,
        currency: 'EUR',
        interval: 'monthly',
        paypalPlanId: 'P-PREMIUM-MONTHLY',
        active: true,
        features: ['Todo del plan básico', 'Acceso temprano a features', 'Soporte prioritario', 'Contenido premium']
      },
      {
        id: 'plan_vip',
        name: 'Plan VIP',
        description: 'Máximo nivel de acceso y beneficios',
        amount: 50.00,
        currency: 'EUR',
        interval: 'monthly',
        paypalPlanId: 'P-VIP-MONTHLY',
        active: true,
        features: ['Todo del plan premium', 'Mentoría personalizada', 'Nombre en créditos', 'Sesiones privadas']
      },
      {
        id: 'plan_legendary',
        name: 'Plan Legendario',
        description: 'El máximo nivel de soporte',
        amount: 100.00,
        currency: 'EUR',
        interval: 'monthly',
        paypalPlanId: 'P-LEGENDARY-MONTHLY',
        active: true,
        features: ['Todo del plan VIP', 'Sesión privada 1-on-1', 'Producto físico exclusivo', 'Acceso a betas']
      }
    ];

    setTransactions(mockTransactions);
    setSubscriptions(mockSubscriptions);
    setPlans(mockPlans);
  };

  // Simular creación de orden de PayPal
  const createPayPalOrder = async (amount: number, currency: string = 'EUR', description: string): Promise<{ orderId: string; status: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        resolve({
          orderId,
          status: 'APPROVED'
        });
      }, 1000);
    });
  };

  // Simular captura de pago
  const capturePayPalPayment = async (orderId: string): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular 90% de éxito
        if (Math.random() > 0.1) {
          const transactionId = `paypal_txn_${Math.random().toString(36).substr(2, 9)}`;
          resolve({
            success: true,
            transactionId
          });
        } else {
          resolve({
            success: false,
            error: 'Error en la captura del pago'
          });
        }
      }, 1500);
    });
  };

  // Simular creación de suscripción
  const createPayPalSubscription = async (planId: string, customerEmail: string, customerName: string): Promise<{ success: boolean; subscriptionId?: string; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subscriptionId = `sub_${Math.random().toString(36).substr(2, 9)}`;
        resolve({
          success: true,
          subscriptionId
        });
      }, 2000);
    });
  };

  // Simular cancelación de suscripción
  const cancelPayPalSubscription = async (subscriptionId: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true
        });
      }, 1000);
    });
  };

  // Simular reembolso
  const refundPayPalPayment = async (transactionId: string, amount?: number): Promise<{ success: boolean; refundId?: string; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const refundId = `refund_${Math.random().toString(36).substr(2, 9)}`;
        resolve({
          success: true,
          refundId
        });
      }, 1500);
    });
  };

  // Obtener estadísticas
  const getPayPalStats = () => {
    const completedTransactions = transactions.filter(t => t.status === 'completed');
    const totalAmount = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalFees = completedTransactions.reduce((sum, t) => sum + t.transactionFee, 0);
    const netAmount = totalAmount - totalFees;
    const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
    
    return {
      totalTransactions: transactions.length,
      completedTransactions: completedTransactions.length,
      totalAmount,
      totalFees,
      netAmount,
      activeSubscriptions: activeSubscriptions.length,
      totalSubscriptions: subscriptions.length
    };
  };

  // Filtrar transacciones
  const filterTransactions = (filters: {
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    let filtered = transactions;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(t => new Date(t.createdAt) >= new Date(filters.dateFrom!));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(t => new Date(t.createdAt) <= new Date(filters.dateTo!));
    }

    return filtered;
  };

  // Filtrar suscripciones
  const filterSubscriptions = (filters: {
    status?: string;
    planId?: string;
  }) => {
    let filtered = subscriptions;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(s => s.status === filters.status);
    }

    if (filters.planId && filters.planId !== 'all') {
      filtered = filtered.filter(s => s.planId === filters.planId);
    }

    return filtered;
  };

  return {
    isLoaded,
    error,
    transactions,
    subscriptions,
    plans,
    createPayPalOrder,
    capturePayPalPayment,
    createPayPalSubscription,
    cancelPayPalSubscription,
    refundPayPalPayment,
    getPayPalStats,
    filterTransactions,
    filterSubscriptions
  };
};
