import { useState, useEffect } from 'react';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  maxUsers?: number;
  storage?: string;
  support?: 'basic' | 'priority' | 'dedicated';
  customDomain?: boolean;
  analytics?: boolean;
  apiAccess?: boolean;
  whiteLabel?: boolean;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  status: 'active' | 'cancelled' | 'expired' | 'paused' | 'pending';
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  amount: number;
  currency: string;
  paymentMethod: 'stripe' | 'paypal' | 'manual';
  autoRenew: boolean;
  trialEndsAt?: string;
  cancelledAt?: string;
  pauseUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionUsage {
  id: string;
  subscriptionId: string;
  userId: string;
  month: string;
  year: number;
  apiCalls: number;
  storageUsed: number;
  bandwidthUsed: number;
  usersCount: number;
  createdAt: string;
}

export const useSubscriptions = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscription[]>([]);
  const [usage, setUsage] = useState<SubscriptionUsage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock subscription plans
    const mockPlans: SubscriptionPlan[] = [
      {
        id: 'plan_starter',
        name: 'Plan Starter',
        description: 'Perfecto para comenzar tu proyecto',
        price: 9.99,
        currency: 'EUR',
        interval: 'monthly',
        features: [
          'Hasta 5 proyectos',
          '10GB de almacenamiento',
          'Soporte por email',
          'API básica',
          'Analytics básicos'
        ],
        maxUsers: 5,
        storage: '10GB',
        support: 'basic',
        analytics: true,
        apiAccess: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        active: true
      },
      {
        id: 'plan_professional',
        name: 'Plan Professional',
        description: 'Para equipos que necesitan más potencia',
        price: 29.99,
        currency: 'EUR',
        interval: 'monthly',
        features: [
          'Proyectos ilimitados',
          '100GB de almacenamiento',
          'Soporte prioritario',
          'API completa',
          'Analytics avanzados',
          'Dominio personalizado',
          'Hasta 25 usuarios'
        ],
        popular: true,
        maxUsers: 25,
        storage: '100GB',
        support: 'priority',
        customDomain: true,
        analytics: true,
        apiAccess: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        active: true
      },
      {
        id: 'plan_enterprise',
        name: 'Plan Enterprise',
        description: 'Para organizaciones grandes',
        price: 99.99,
        currency: 'EUR',
        interval: 'monthly',
        features: [
          'Todo del plan Professional',
          '1TB de almacenamiento',
          'Soporte dedicado 24/7',
          'API ilimitada',
          'Analytics personalizados',
          'White label',
          'Usuarios ilimitados',
          'SLA garantizado'
        ],
        maxUsers: -1, // Ilimitado
        storage: '1TB',
        support: 'dedicated',
        customDomain: true,
        analytics: true,
        apiAccess: true,
        whiteLabel: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        active: true
      },
      {
        id: 'plan_yearly_starter',
        name: 'Plan Starter (Anual)',
        description: 'Plan Starter con descuento anual',
        price: 99.99,
        currency: 'EUR',
        interval: 'yearly',
        features: [
          'Hasta 5 proyectos',
          '10GB de almacenamiento',
          'Soporte por email',
          'API básica',
          'Analytics básicos',
          '2 meses gratis'
        ],
        maxUsers: 5,
        storage: '10GB',
        support: 'basic',
        analytics: true,
        apiAccess: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        active: true
      }
    ];

    // Mock user subscriptions
    const mockSubscriptions: UserSubscription[] = [
      {
        id: 'sub_001',
        userId: 'user_001',
        planId: 'plan_professional',
        planName: 'Plan Professional',
        status: 'active',
        startDate: '2024-08-01T00:00:00Z',
        endDate: '2024-09-01T00:00:00Z',
        nextBillingDate: '2024-09-01T00:00:00Z',
        amount: 29.99,
        currency: 'EUR',
        paymentMethod: 'stripe',
        autoRenew: true,
        createdAt: '2024-08-01T00:00:00Z',
        updatedAt: '2024-08-01T00:00:00Z'
      },
      {
        id: 'sub_002',
        userId: 'user_002',
        planId: 'plan_enterprise',
        planName: 'Plan Enterprise',
        status: 'active',
        startDate: '2024-07-15T00:00:00Z',
        endDate: '2024-08-15T00:00:00Z',
        nextBillingDate: '2024-08-15T00:00:00Z',
        amount: 99.99,
        currency: 'EUR',
        paymentMethod: 'paypal',
        autoRenew: true,
        createdAt: '2024-07-15T00:00:00Z',
        updatedAt: '2024-07-15T00:00:00Z'
      },
      {
        id: 'sub_003',
        userId: 'user_003',
        planId: 'plan_starter',
        planName: 'Plan Starter',
        status: 'cancelled',
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-07-01T00:00:00Z',
        nextBillingDate: '2024-07-01T00:00:00Z',
        amount: 9.99,
        currency: 'EUR',
        paymentMethod: 'stripe',
        autoRenew: false,
        cancelledAt: '2024-06-25T00:00:00Z',
        createdAt: '2024-06-01T00:00:00Z',
        updatedAt: '2024-06-25T00:00:00Z'
      },
      {
        id: 'sub_004',
        userId: 'user_004',
        planId: 'plan_professional',
        planName: 'Plan Professional',
        status: 'paused',
        startDate: '2024-07-01T00:00:00Z',
        endDate: '2024-08-01T00:00:00Z',
        nextBillingDate: '2024-09-01T00:00:00Z',
        amount: 29.99,
        currency: 'EUR',
        paymentMethod: 'stripe',
        autoRenew: true,
        pauseUntil: '2024-09-01T00:00:00Z',
        createdAt: '2024-07-01T00:00:00Z',
        updatedAt: '2024-08-15T00:00:00Z'
      }
    ];

    // Mock usage data
    const mockUsage: SubscriptionUsage[] = [
      {
        id: 'usage_001',
        subscriptionId: 'sub_001',
        userId: 'user_001',
        month: 'August',
        year: 2024,
        apiCalls: 15420,
        storageUsed: 45.2,
        bandwidthUsed: 120.5,
        usersCount: 18,
        createdAt: '2024-08-01T00:00:00Z'
      },
      {
        id: 'usage_002',
        subscriptionId: 'sub_002',
        userId: 'user_002',
        month: 'August',
        year: 2024,
        apiCalls: 45680,
        storageUsed: 234.7,
        bandwidthUsed: 890.3,
        usersCount: 45,
        createdAt: '2024-08-01T00:00:00Z'
      }
    ];

    setPlans(mockPlans);
    setUserSubscriptions(mockSubscriptions);
    setUsage(mockUsage);
    setIsLoading(false);
  };

  // Crear nueva suscripción
  const createSubscription = async (
    userId: string,
    planId: string,
    paymentMethod: 'stripe' | 'paypal' | 'manual'
  ): Promise<{ success: boolean; subscription?: UserSubscription; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plan = plans.find(p => p.id === planId);
        if (!plan) {
          resolve({ success: false, error: 'Plan no encontrado' });
          return;
        }

        const newSubscription: UserSubscription = {
          id: `sub_${Date.now()}`,
          userId,
          planId,
          planName: plan.name,
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + (plan.interval === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
          nextBillingDate: new Date(Date.now() + (plan.interval === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
          amount: plan.price,
          currency: plan.currency,
          paymentMethod,
          autoRenew: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setUserSubscriptions(prev => [...prev, newSubscription]);
        resolve({ success: true, subscription: newSubscription });
      }, 1500);
    });
  };

  // Cancelar suscripción
  const cancelSubscription = async (subscriptionId: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserSubscriptions(prev => 
          prev.map(sub => 
            sub.id === subscriptionId 
              ? { ...sub, status: 'cancelled' as const, cancelledAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
              : sub
          )
        );
        resolve({ success: true });
      }, 1000);
    });
  };

  // Pausar suscripción
  const pauseSubscription = async (subscriptionId: string, pauseUntil: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserSubscriptions(prev => 
          prev.map(sub => 
            sub.id === subscriptionId 
              ? { ...sub, status: 'paused' as const, pauseUntil, updatedAt: new Date().toISOString() }
              : sub
          )
        );
        resolve({ success: true });
      }, 1000);
    });
  };

  // Reanudar suscripción
  const resumeSubscription = async (subscriptionId: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserSubscriptions(prev => 
          prev.map(sub => 
            sub.id === subscriptionId 
              ? { ...sub, status: 'active' as const, pauseUntil: undefined, updatedAt: new Date().toISOString() }
              : sub
          )
        );
        resolve({ success: true });
      }, 1000);
    });
  };

  // Cambiar plan
  const changePlan = async (subscriptionId: string, newPlanId: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlan = plans.find(p => p.id === newPlanId);
        if (!newPlan) {
          resolve({ success: false, error: 'Plan no encontrado' });
          return;
        }

        setUserSubscriptions(prev => 
          prev.map(sub => 
            sub.id === subscriptionId 
              ? { 
                  ...sub, 
                  planId: newPlanId,
                  planName: newPlan.name,
                  amount: newPlan.price,
                  updatedAt: new Date().toISOString()
                }
              : sub
          )
        );
        resolve({ success: true });
      }, 1500);
    });
  };

  // Obtener estadísticas
  const getSubscriptionStats = () => {
    const activeSubscriptions = userSubscriptions.filter(s => s.status === 'active');
    const totalRevenue = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);
    const monthlyRecurringRevenue = activeSubscriptions
      .filter(s => s.planId.includes('monthly') || s.planId.includes('starter') || s.planId.includes('professional') || s.planId.includes('enterprise'))
      .reduce((sum, s) => sum + s.amount, 0);
    
    const planStats = plans.map(plan => ({
      planId: plan.id,
      planName: plan.name,
      subscribers: userSubscriptions.filter(s => s.planId === plan.id && s.status === 'active').length,
      revenue: userSubscriptions
        .filter(s => s.planId === plan.id && s.status === 'active')
        .reduce((sum, s) => sum + s.amount, 0)
    }));

    return {
      totalSubscriptions: userSubscriptions.length,
      activeSubscriptions: activeSubscriptions.length,
      cancelledSubscriptions: userSubscriptions.filter(s => s.status === 'cancelled').length,
      pausedSubscriptions: userSubscriptions.filter(s => s.status === 'paused').length,
      totalRevenue,
      monthlyRecurringRevenue,
      averageRevenuePerUser: activeSubscriptions.length > 0 ? totalRevenue / activeSubscriptions.length : 0,
      churnRate: userSubscriptions.filter(s => s.status === 'cancelled').length / Math.max(userSubscriptions.length, 1) * 100,
      planStats
    };
  };

  // Obtener suscripción del usuario
  const getUserSubscription = (userId: string): UserSubscription | null => {
    return userSubscriptions.find(s => s.userId === userId && s.status === 'active') || null;
  };

  // Obtener uso de suscripción
  const getSubscriptionUsage = (subscriptionId: string): SubscriptionUsage | null => {
    return usage.find(u => u.subscriptionId === subscriptionId) || null;
  };

  // Filtrar suscripciones
  const filterSubscriptions = (filters: {
    status?: string;
    planId?: string;
    paymentMethod?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    let filtered = userSubscriptions;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(s => s.status === filters.status);
    }

    if (filters.planId && filters.planId !== 'all') {
      filtered = filtered.filter(s => s.planId === filters.planId);
    }

    if (filters.paymentMethod && filters.paymentMethod !== 'all') {
      filtered = filtered.filter(s => s.paymentMethod === filters.paymentMethod);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(s => new Date(s.createdAt) >= new Date(filters.dateFrom!));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(s => new Date(s.createdAt) <= new Date(filters.dateTo!));
    }

    return filtered;
  };

  return {
    plans,
    userSubscriptions,
    usage,
    isLoading,
    createSubscription,
    cancelSubscription,
    pauseSubscription,
    resumeSubscription,
    changePlan,
    getSubscriptionStats,
    getUserSubscription,
    getSubscriptionUsage,
    filterSubscriptions
  };
};
