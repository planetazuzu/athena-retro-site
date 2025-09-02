import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Heart, 
  Clock, 
  Users, 
  Euro,
  Gift,
  Star,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingUp,
  Loader2,
  ArrowRight,
  Crown,
  Trophy
} from "lucide-react";
import { useAdvancedDonations, DonationGoal } from "@/hooks/useAdvancedDonations";

interface DonationGoalsProps {
  onSelectGoal?: (goalId: string) => void;
  showCreateButton?: boolean;
  limit?: number;
}

const DonationGoals = ({ onSelectGoal, showCreateButton = false, limit }: DonationGoalsProps) => {
  const { goals, isLoading, getGoalProgress, filterGoals } = useAdvancedDonations();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filteredGoals = filterGoals({
    status: 'active',
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    priority: selectedPriority !== 'all' ? selectedPriority : undefined,
    isPublic: true
  }).slice(0, limit);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return <Zap className="h-4 w-4" />;
      case 'infrastructure': return <Shield className="h-4 w-4" />;
      case 'community': return <Users className="h-4 w-4" />;
      case 'feature': return <Star className="h-4 w-4" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'development': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'infrastructure': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'community': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'feature': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'emergency': return 'bg-red-500/10 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/10 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 font-terminal">Cargando metas de donación...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary font-terminal">METAS DE DONACIÓN</h2>
          <p className="text-muted-foreground font-terminal">Apoya nuestros proyectos y haz que se hagan realidad</p>
        </div>
        {showCreateButton && (
          <Button className="font-terminal">
            <Target className="h-4 w-4 mr-2" />
            Crear Meta
          </Button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
        >
          <option value="all">Todas las categorías</option>
          <option value="development">Desarrollo</option>
          <option value="infrastructure">Infraestructura</option>
          <option value="community">Comunidad</option>
          <option value="feature">Funcionalidad</option>
          <option value="emergency">Emergencia</option>
        </select>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
        >
          <option value="all">Todas las prioridades</option>
          <option value="critical">Crítica</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>

      {/* Lista de Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => {
          const progress = getGoalProgress(goal.id);
          if (!progress) return null;

          return (
            <Card key={goal.id} className="terminal-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getCategoryColor(goal.category)}>
                        {getCategoryIcon(goal.category)}
                        <span className="ml-1 capitalize">{goal.category}</span>
                      </Badge>
                      <Badge className={getPriorityColor(goal.priority)}>
                        <span className="capitalize">{goal.priority}</span>
                      </Badge>
                    </div>
                    <CardTitle className="font-terminal text-lg">{goal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-terminal mt-2">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progreso */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-terminal">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                    <span className="text-sm text-muted-foreground font-terminal">
                      {progress.progress.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={progress.progress} className="h-2" />
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary font-terminal">
                      {progress.donationsCount}
                    </div>
                    <div className="text-xs text-muted-foreground font-terminal">Donaciones</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary font-terminal">
                      {progress.daysLeft}
                    </div>
                    <div className="text-xs text-muted-foreground font-terminal">Días restantes</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary font-terminal">
                      {goal.rewards.length}
                    </div>
                    <div className="text-xs text-muted-foreground font-terminal">Recompensas</div>
                  </div>
                </div>

                {/* Milestones */}
                {goal.milestones.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium font-terminal text-primary">Hitos Alcanzados</h4>
                    <div className="space-y-1">
                      {goal.milestones.filter(m => m.isReached).slice(0, 2).map((milestone) => (
                        <div key={milestone.id} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-muted-foreground font-terminal">{milestone.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recompensas destacadas */}
                {goal.rewards.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium font-terminal text-primary">Recompensas Disponibles</h4>
                    <div className="space-y-1">
                      {goal.rewards.slice(0, 2).map((reward) => (
                        <div key={reward.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <Gift className="h-3 w-3 text-primary" />
                            <span className="text-muted-foreground font-terminal">{reward.title}</span>
                          </div>
                          <span className="font-terminal text-primary">
                            {formatCurrency(reward.minAmount)}+
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fechas */}
                <div className="flex items-center justify-between text-xs text-muted-foreground font-terminal">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Inicio: {formatDate(goal.startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Fin: {formatDate(goal.endDate)}</span>
                  </div>
                </div>

                {/* Botón de acción */}
                <Button 
                  className="w-full font-terminal"
                  onClick={() => onSelectGoal?.(goal.id)}
                  disabled={progress.isCompleted || progress.isExpired}
                >
                  {progress.isCompleted ? (
                    <>
                      <Trophy className="h-4 w-4 mr-2" />
                      ¡Meta Completada!
                    </>
                  ) : progress.isExpired ? (
                    <>
                      <Clock className="h-4 w-4 mr-2" />
                      Tiempo Agotado
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Apoyar Meta
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mensaje si no hay metas */}
      {filteredGoals.length === 0 && (
        <Card className="terminal-border">
          <CardContent className="text-center py-12">
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold font-terminal text-primary mb-2">No hay metas disponibles</h3>
            <p className="text-muted-foreground font-terminal">
              No se encontraron metas de donación con los filtros seleccionados.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Información adicional */}
      <Card className="terminal-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Transparencia Total</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Todas las donaciones son públicas y transparentes
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Recompensas Exclusivas</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Obtén recompensas únicas por tu apoyo
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Impacto Real</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Ve el progreso en tiempo real de cada meta
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationGoals;
