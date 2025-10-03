import { useState, useEffect } from 'react';

export interface DonationGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  category: 'development' | 'infrastructure' | 'community' | 'feature' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  rewards: DonationReward[];
  milestones: DonationMilestone[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  imageUrl?: string;
  isPublic: boolean;
}

export interface DonationReward {
  id: string;
  goalId: string;
  title: string;
  description: string;
  minAmount: number;
  maxAmount?: number;
  maxBackers?: number;
  currentBackers: number;
  benefits: string[];
  estimatedDelivery: string;
  isLimited: boolean;
  isPhysical: boolean;
  createdAt: string;
}

export interface DonationMilestone {
  id: string;
  goalId: string;
  title: string;
  description: string;
  targetAmount: number;
  isReached: boolean;
  reachedAt?: string;
  rewards: string[];
  createdAt: string;
}

export interface Donation {
  id: string;
  goalId: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  message?: string;
  isAnonymous: boolean;
  rewardId?: string;
  paymentMethod: 'stripe' | 'paypal' | 'manual';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DonationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirements: {
    totalDonations?: number;
    totalAmount?: number;
    goalsSupported?: number;
    consecutiveMonths?: number;
    specialAchievement?: string;
  };
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  goals: string[];
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  totalTarget: number;
  totalRaised: number;
  currency: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useAdvancedDonations = () => {
  const [goals, setGoals] = useState<DonationGoal[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [badges, setBadges] = useState<DonationBadge[]>([]);
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock donation goals
    const mockGoals: DonationGoal[] = [
      {
        id: 'goal_001',
        title: 'Nuevo Sistema de Chat en Tiempo Real',
        description: 'Implementar un sistema de chat en tiempo real para mejorar la comunicación entre usuarios de la comunidad.',
        targetAmount: 5000,
        currentAmount: 3250,
        currency: 'EUR',
        startDate: '2024-08-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        status: 'active',
        category: 'feature',
        priority: 'high',
        rewards: [
          {
            id: 'reward_001',
            goalId: 'goal_001',
            title: 'Soporte Básico',
            description: 'Ayuda a hacer realidad esta funcionalidad',
            minAmount: 10,
            maxBackers: 100,
            currentBackers: 45,
            benefits: ['Acceso temprano a la beta', 'Badge de soporte'],
            estimatedDelivery: '2024-12-01',
            isLimited: true,
            isPhysical: false,
            createdAt: '2024-08-01T00:00:00Z'
          },
          {
            id: 'reward_002',
            goalId: 'goal_001',
            title: 'Soporte Premium',
            description: 'Para los verdaderos fans del proyecto',
            minAmount: 50,
            maxBackers: 50,
            currentBackers: 23,
            benefits: ['Acceso temprano a la beta', 'Badge de soporte', 'Nombre en créditos', 'Sesión de feedback'],
            estimatedDelivery: '2024-12-01',
            isLimited: true,
            isPhysical: false,
            createdAt: '2024-08-01T00:00:00Z'
          }
        ],
        milestones: [
          {
            id: 'milestone_001',
            goalId: 'goal_001',
            title: '25% - Diseño y Planificación',
            description: 'Completar el diseño del sistema y la planificación técnica',
            targetAmount: 1250,
            isReached: true,
            reachedAt: '2024-08-15T00:00:00Z',
            rewards: ['Actualización de progreso', 'Vista previa del diseño'],
            createdAt: '2024-08-01T00:00:00Z'
          },
          {
            id: 'milestone_002',
            goalId: 'goal_001',
            title: '50% - Desarrollo Backend',
            description: 'Implementar la infraestructura del servidor de chat',
            targetAmount: 2500,
            isReached: true,
            reachedAt: '2024-09-01T00:00:00Z',
            rewards: ['Acceso a la API de chat', 'Documentación técnica'],
            createdAt: '2024-08-01T00:00:00Z'
          },
          {
            id: 'milestone_003',
            goalId: 'goal_001',
            title: '75% - Desarrollo Frontend',
            description: 'Crear la interfaz de usuario del chat',
            targetAmount: 3750,
            isReached: false,
            rewards: ['Beta privada', 'Feedback directo'],
            createdAt: '2024-08-01T00:00:00Z'
          }
        ],
        createdAt: '2024-08-01T00:00:00Z',
        updatedAt: '2024-09-15T00:00:00Z',
        createdBy: 'admin',
        isPublic: true
      },
      {
        id: 'goal_002',
        title: 'Mejora de Infraestructura del Servidor',
        description: 'Actualizar la infraestructura del servidor para mejorar el rendimiento y la escalabilidad.',
        targetAmount: 3000,
        currentAmount: 1800,
        currency: 'EUR',
        startDate: '2024-09-01T00:00:00Z',
        endDate: '2024-11-30T23:59:59Z',
        status: 'active',
        category: 'infrastructure',
        priority: 'critical',
        rewards: [
          {
            id: 'reward_003',
            goalId: 'goal_002',
            title: 'Soporte de Infraestructura',
            description: 'Ayuda a mantener el servidor funcionando',
            minAmount: 25,
            maxBackers: 200,
            currentBackers: 67,
            benefits: ['Badge de infraestructura', 'Reporte de rendimiento'],
            estimatedDelivery: '2024-11-15',
            isLimited: false,
            isPhysical: false,
            createdAt: '2024-09-01T00:00:00Z'
          }
        ],
        milestones: [
          {
            id: 'milestone_004',
            goalId: 'goal_002',
            title: '50% - Hardware Básico',
            description: 'Actualizar el hardware básico del servidor',
            targetAmount: 1500,
            isReached: true,
            reachedAt: '2024-09-20T00:00:00Z',
            rewards: ['Reporte de mejoras', 'Métricas de rendimiento'],
            createdAt: '2024-09-01T00:00:00Z'
          }
        ],
        createdAt: '2024-09-01T00:00:00Z',
        updatedAt: '2024-09-20T00:00:00Z',
        createdBy: 'admin',
        isPublic: true
      }
    ];

    // Mock donations
    const mockDonations: Donation[] = [
      {
        id: 'donation_001',
        goalId: 'goal_001',
        userId: 'user_001',
        userName: 'Usuario Generoso',
        userEmail: 'generoso@test.com',
        amount: 100,
        currency: 'EUR',
        message: '¡Excelente proyecto! Espero que se haga realidad pronto.',
        isAnonymous: false,
        rewardId: 'reward_002',
        paymentMethod: 'stripe',
        status: 'completed',
        transactionId: 'txn_001',
        createdAt: '2024-08-15T10:30:00Z',
        updatedAt: '2024-08-15T10:30:00Z'
      },
      {
        id: 'donation_002',
        goalId: 'goal_001',
        userId: 'user_002',
        userName: 'Anónimo',
        userEmail: 'anonimo@test.com',
        amount: 50,
        currency: 'EUR',
        message: 'Sigan así!',
        isAnonymous: true,
        rewardId: 'reward_001',
        paymentMethod: 'paypal',
        status: 'completed',
        transactionId: 'txn_002',
        createdAt: '2024-08-20T14:15:00Z',
        updatedAt: '2024-08-20T14:15:00Z'
      },
      {
        id: 'donation_003',
        goalId: 'goal_002',
        userId: 'user_003',
        userName: 'Patrón de la Infraestructura',
        userEmail: 'patron@test.com',
        amount: 200,
        currency: 'EUR',
        message: 'La infraestructura es fundamental. ¡Adelante!',
        isAnonymous: false,
        rewardId: 'reward_003',
        paymentMethod: 'stripe',
        status: 'completed',
        transactionId: 'txn_003',
        createdAt: '2024-09-10T09:45:00Z',
        updatedAt: '2024-09-10T09:45:00Z'
      }
    ];

    // Mock badges
    const mockBadges: DonationBadge[] = [
      {
        id: 'badge_001',
        name: 'Primer Donante',
        description: 'Has realizado tu primera donación',
        icon: '🎉',
        color: 'green',
        requirements: {
          totalDonations: 1
        },
        isUnlocked: true,
        unlockedAt: '2024-08-15T10:30:00Z',
        rarity: 'common'
      },
      {
        id: 'badge_002',
        name: 'Generoso',
        description: 'Has donado más de €100 en total',
        icon: '💎',
        color: 'blue',
        requirements: {
          totalAmount: 100
        },
        isUnlocked: true,
        unlockedAt: '2024-08-15T10:30:00Z',
        rarity: 'rare'
      },
      {
        id: 'badge_003',
        name: 'Patrón Legendario',
        description: 'Has donado más de €500 en total',
        icon: '👑',
        color: 'purple',
        requirements: {
          totalAmount: 500
        },
        isUnlocked: false,
        rarity: 'epic'
      },
      {
        id: 'badge_004',
        name: 'Soporte Continuo',
        description: 'Has donado durante 3 meses consecutivos',
        icon: '🔥',
        color: 'orange',
        requirements: {
          consecutiveMonths: 3
        },
        isUnlocked: false,
        rarity: 'rare'
      }
    ];

    // Mock campaigns
    const mockCampaigns: DonationCampaign[] = [
      {
        id: 'campaign_001',
        title: 'Campaña de Mejoras Q4 2024',
        description: 'Campaña especial para implementar mejoras importantes en el cuarto trimestre',
        goals: ['goal_001', 'goal_002'],
        startDate: '2024-08-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        status: 'active',
        totalTarget: 8000,
        totalRaised: 5050,
        currency: 'EUR',
        isPublic: true,
        createdAt: '2024-08-01T00:00:00Z',
        updatedAt: '2024-09-15T00:00:00Z'
      }
    ];

    setGoals(mockGoals);
    setDonations(mockDonations);
    setBadges(mockBadges);
    setCampaigns(mockCampaigns);
    setIsLoading(false);
  };

  // Crear nueva donación
  const createDonation = async (
    goalId: string,
    userId: string,
    userName: string,
    userEmail: string,
    amount: number,
    currency: string = 'EUR',
    message?: string,
    isAnonymous: boolean = false,
    rewardId?: string,
    paymentMethod: 'stripe' | 'paypal' | 'manual' = 'stripe'
  ): Promise<{ success: boolean; donation?: Donation; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) {
          resolve({ success: false, error: 'Meta de donación no encontrada' });
          return;
        }

        if (goal.status !== 'active') {
          resolve({ success: false, error: 'Esta meta de donación no está activa' });
          return;
        }

        const newDonation: Donation = {
          id: `donation_${Date.now()}`,
          goalId,
          userId,
          userName: isAnonymous ? 'Anónimo' : userName,
          userEmail,
          amount,
          currency,
          message,
          isAnonymous,
          rewardId,
          paymentMethod,
          status: 'completed',
          transactionId: `txn_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setDonations(prev => [...prev, newDonation]);
        
        // Actualizar el monto actual de la meta
        setGoals(prev => 
          prev.map(goal => 
            goal.id === goalId 
              ? { ...goal, currentAmount: goal.currentAmount + amount, updatedAt: new Date().toISOString() }
              : goal
          )
        );

        resolve({ success: true, donation: newDonation });
      }, 1500);
    });
  };

  // Crear nueva meta de donación
  const createGoal = async (
    title: string,
    description: string,
    targetAmount: number,
    category: DonationGoal['category'],
    priority: DonationGoal['priority'],
    endDate: string,
    createdBy: string
  ): Promise<{ success: boolean; goal?: DonationGoal; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newGoal: DonationGoal = {
          id: `goal_${Date.now()}`,
          title,
          description,
          targetAmount,
          currentAmount: 0,
          currency: 'EUR',
          startDate: new Date().toISOString(),
          endDate,
          status: 'active',
          category,
          priority,
          rewards: [],
          milestones: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy,
          isPublic: true
        };

        setGoals(prev => [...prev, newGoal]);
        resolve({ success: true, goal: newGoal });
      }, 1000);
    });
  };

  // Obtener estadísticas
  const getDonationStats = () => {
    const totalDonations = donations.filter(d => d.status === 'completed').length;
    const totalAmount = donations.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.amount, 0);
    const activeGoals = goals.filter(g => g.status === 'active').length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;
    const totalBackers = new Set(donations.filter(d => d.status === 'completed').map(d => d.userId)).size;
    
    const categoryStats = goals.reduce((acc, goal) => {
      acc[goal.category] = (acc[goal.category] || 0) + goal.currentAmount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalDonations,
      totalAmount,
      activeGoals,
      completedGoals,
      totalBackers,
      averageDonation: totalDonations > 0 ? totalAmount / totalDonations : 0,
      categoryStats,
      completionRate: goals.length > 0 ? (completedGoals / goals.length) * 100 : 0
    };
  };

  // Obtener progreso de meta
  const getGoalProgress = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return null;

    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const daysLeft = Math.ceil((new Date(goal.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const donationsCount = donations.filter(d => d.goalId === goalId && d.status === 'completed').length;

    return {
      progress: Math.min(progress, 100),
      daysLeft: Math.max(daysLeft, 0),
      donationsCount,
      isCompleted: goal.currentAmount >= goal.targetAmount,
      isExpired: new Date(goal.endDate) < new Date()
    };
  };

  // Obtener donaciones recientes
  const getRecentDonations = (limit: number = 10) => {
    return donations
      .filter(d => d.status === 'completed')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  // Obtener badges del usuario
  const getUserBadges = (userId: string) => {
    const userDonations = donations.filter(d => d.userId === userId && d.status === 'completed');
    const totalAmount = userDonations.reduce((sum, d) => sum + d.amount, 0);
    const totalDonations = userDonations.length;
    const goalsSupported = new Set(userDonations.map(d => d.goalId)).size;

    return badges.map(badge => {
      let isUnlocked = false;
      let unlockedAt: string | undefined;

      if (badge.requirements.totalDonations && totalDonations >= badge.requirements.totalDonations) {
        isUnlocked = true;
        unlockedAt = userDonations[badge.requirements.totalDonations - 1]?.createdAt;
      }

      if (badge.requirements.totalAmount && totalAmount >= badge.requirements.totalAmount) {
        isUnlocked = true;
        unlockedAt = userDonations.find(d => {
          const runningTotal = userDonations.slice(0, userDonations.indexOf(d) + 1).reduce((sum, donation) => sum + donation.amount, 0);
          return runningTotal >= badge.requirements.totalAmount!;
        })?.createdAt;
      }

      if (badge.requirements.goalsSupported && goalsSupported >= badge.requirements.goalsSupported) {
        isUnlocked = true;
        unlockedAt = userDonations[0]?.createdAt;
      }

      return {
        ...badge,
        isUnlocked,
        unlockedAt
      };
    });
  };

  // Filtrar metas
  const filterGoals = (filters: {
    status?: string;
    category?: string;
    priority?: string;
    isPublic?: boolean;
  }) => {
    let filtered = goals;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(g => g.status === filters.status);
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(g => g.category === filters.category);
    }

    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter(g => g.priority === filters.priority);
    }

    if (filters.isPublic !== undefined) {
      filtered = filtered.filter(g => g.isPublic === filters.isPublic);
    }

    return filtered;
  };

  return {
    goals,
    donations,
    badges,
    campaigns,
    isLoading,
    createDonation,
    createGoal,
    getDonationStats,
    getGoalProgress,
    getRecentDonations,
    getUserBadges,
    filterGoals
  };
};
