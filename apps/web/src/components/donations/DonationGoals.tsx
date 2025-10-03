import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  CheckCircle,
  Clock
} from "lucide-react";

interface DonationGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  status: 'active' | 'completed' | 'expired';
  category: string;
  donors: number;
  createdAt: Date;
}

interface DonationGoalsProps {
  goals?: DonationGoal[];
  onDonate?: (goalId: string, amount: number) => void;
}

const DonationGoals = ({ goals = [], onDonate }: DonationGoalsProps) => {
  const [donationGoals, setDonationGoals] = useState<DonationGoal[]>(goals);

  // Datos de ejemplo si no se proporcionan
  useEffect(() => {
    if (goals.length === 0) {
      setDonationGoals([
        {
          id: '1',
          title: 'Desarrollo de App Móvil',
          description: 'Crear la aplicación móvil de Athena Pocket para iOS y Android',
          targetAmount: 5000,
          currentAmount: 3200,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
          status: 'active',
          category: 'Desarrollo',
          donors: 45,
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Servidores de Producción',
          description: 'Infraestructura cloud para soportar miles de usuarios',
          targetAmount: 2000,
          currentAmount: 2000,
          deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // Ya pasó
          status: 'completed',
          category: 'Infraestructura',
          donors: 28,
          createdAt: new Date()
        },
        {
          id: '3',
          title: 'Investigación de IA',
          description: 'Mejorar los algoritmos de supervivencia con IA',
          targetAmount: 3000,
          currentAmount: 1200,
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 días
          status: 'active',
          category: 'Investigación',
          donors: 18,
          createdAt: new Date()
        }
      ]);
    }
  }, [goals]);

  const getProgressPercentage = (goal: DonationGoal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (goal: DonationGoal) => {
    const daysRemaining = getDaysRemaining(goal.deadline);
    
    if (goal.status === 'completed') {
      return <Badge variant="default" className="bg-green-500">✅ Completado</Badge>;
    }
    
    if (daysRemaining <= 0) {
      return <Badge variant="destructive">⏰ Expirado</Badge>;
    }
    
    if (daysRemaining <= 7) {
      return <Badge variant="secondary" className="bg-orange-500">🔥 Urgente</Badge>;
    }
    
    return <Badge variant="outline" className="border-green-500 text-green-400">🟢 Activo</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Desarrollo':
        return '💻';
      case 'Infraestructura':
        return '☁️';
      case 'Investigación':
        return '🔬';
      case 'Marketing':
        return '📢';
      default:
        return '🎯';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-terminal text-primary mb-2">
          🎯 Metas de Donación
        </h2>
        <p className="text-muted-foreground font-terminal">
          Apoya el desarrollo de Athena Pocket y haz posible el futuro de la supervivencia digital
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donationGoals.map((goal) => {
          const progressPercentage = getProgressPercentage(goal);
          const daysRemaining = getDaysRemaining(goal.deadline);
          const isCompleted = goal.status === 'completed';
          const isExpired = daysRemaining <= 0 && goal.status !== 'completed';

          return (
            <Card key={goal.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="font-terminal text-primary text-lg">
                      {getCategoryIcon(goal.category)} {goal.title}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 font-terminal">
                      {goal.category}
                    </Badge>
                  </div>
                  {getStatusBadge(goal)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground font-terminal">
                  {goal.description}
                </p>

                {/* Progreso */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-terminal text-primary">
                      Progreso
                    </span>
                    <span className="text-sm font-terminal text-muted-foreground">
                      {progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm font-terminal">
                    <span className="text-muted-foreground">
                      €{goal.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-primary">
                      €{goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-terminal">{goal.donors} donantes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isExpired ? (
                      <Clock className="h-4 w-4 text-red-400" />
                    ) : (
                      <Calendar className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-terminal">
                      {isExpired ? 'Expirado' : `${daysRemaining} días`}
                    </span>
                  </div>
                </div>

                {/* Botón de donación */}
                {!isCompleted && !isExpired && (
                  <Button 
                    className="w-full font-terminal"
                    onClick={() => onDonate?.(goal.id, 50)} // Donación sugerida de €50
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Donar €50
                  </Button>
                )}

                {isCompleted && (
                  <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-sm">
                    <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-terminal text-sm">
                      ¡Meta alcanzada!
                    </p>
                  </div>
                )}

                {isExpired && (
                  <div className="text-center p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
                    <Clock className="h-6 w-6 text-red-400 mx-auto mb-2" />
                    <p className="text-red-400 font-terminal text-sm">
                      Tiempo agotado
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumen general */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Resumen de Metas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary font-terminal">
                {donationGoals.length}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Metas Totales</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400 font-terminal">
                {donationGoals.filter(g => g.status === 'completed').length}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Completadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary font-terminal">
                €{donationGoals.reduce((sum, g) => sum + g.currentAmount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Recaudado</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted-foreground font-terminal">
                {donationGoals.reduce((sum, g) => sum + g.donors, 0)}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Donantes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationGoals;
