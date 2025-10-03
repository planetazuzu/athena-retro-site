import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Heart, 
  Target, 
  Users, 
  Calendar,
  Gift,
  Award,
  Medal,
  Shield,
  Flame,
  Gem,
  Sparkles,
  CheckCircle,
  Lock,
  TrendingUp,
  Clock
} from "lucide-react";
import { useAdvancedDonations, DonationBadge } from "@/hooks/useAdvancedDonations";

interface DonationBadgesProps {
  userId?: string;
  showAllBadges?: boolean;
  showProgress?: boolean;
}

const DonationBadges = ({ userId = 'current_user', showAllBadges = true, showProgress = true }: DonationBadgesProps) => {
  const { getUserBadges, getDonationStats } = useAdvancedDonations();
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const userBadges = getUserBadges(userId);
  const stats = getDonationStats();

  const filteredBadges = selectedRarity === 'all' 
    ? userBadges 
    : userBadges.filter(badge => badge.rarity === selectedRarity);

  const getBadgeIcon = (badge: DonationBadge) => {
    const iconMap: Record<string, JSX.Element> = {
      '🎉': <Trophy className="h-6 w-6" />,
      '💎': <Gem className="h-6 w-6" />,
      '👑': <Crown className="h-6 w-6" />,
      '🔥': <Flame className="h-6 w-6" />,
      '⭐': <Star className="h-6 w-6" />,
      '⚡': <Zap className="h-6 w-6" />,
      '❤️': <Heart className="h-6 w-6" />,
      '🎯': <Target className="h-6 w-6" />,
      '👥': <Users className="h-6 w-6" />,
      '📅': <Calendar className="h-6 w-6" />,
      '🎁': <Gift className="h-6 w-6" />,
      '🏆': <Award className="h-6 w-6" />,
      '🥇': <Medal className="h-6 w-6" />,
      '🛡️': <Shield className="h-6 w-6" />,
      '✨': <Sparkles className="h-6 w-6" />
    };

    return iconMap[badge.icon] || <Trophy className="h-6 w-6" />;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 'rare': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'epic': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'legendary': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500/20 to-gray-600/20';
      case 'rare': return 'from-blue-500/20 to-blue-600/20';
      case 'epic': return 'from-purple-500/20 to-purple-600/20';
      case 'legendary': return 'from-yellow-500/20 to-yellow-600/20';
      default: return 'from-gray-500/20 to-gray-600/20';
    }
  };

  const getProgressForBadge = (badge: DonationBadge) => {
    if (badge.isUnlocked) return 100;

    const requirements = badge.requirements;
    let current = 0;
    let target = 0;

    if (requirements.totalDonations) {
      current = stats.totalDonations;
      target = requirements.totalDonations;
    } else if (requirements.totalAmount) {
      current = stats.totalAmount;
      target = requirements.totalAmount;
    } else if (requirements.goalsSupported) {
      current = stats.totalBackers; // Aproximación
      target = requirements.goalsSupported;
    } else if (requirements.consecutiveMonths) {
      current = 1; // Aproximación
      target = requirements.consecutiveMonths;
    }

    return target > 0 ? Math.min((current / target) * 100, 100) : 0;
  };

  const formatRequirement = (badge: DonationBadge) => {
    const req = badge.requirements;
    if (req.totalDonations) {
      return `${req.totalDonations} donación${req.totalDonations > 1 ? 'es' : ''}`;
    }
    if (req.totalAmount) {
      return `€${req.totalAmount} en total`;
    }
    if (req.goalsSupported) {
      return `${req.goalsSupported} meta${req.goalsSupported > 1 ? 's' : ''} apoyada${req.goalsSupported > 1 ? 's' : ''}`;
    }
    if (req.consecutiveMonths) {
      return `${req.consecutiveMonths} mes${req.consecutiveMonths > 1 ? 'es' : ''} consecutivo${req.consecutiveMonths > 1 ? 's' : ''}`;
    }
    return 'Requisito especial';
  };

  const unlockedBadges = userBadges.filter(b => b.isUnlocked);
  const lockedBadges = userBadges.filter(b => !b.isUnlocked);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary font-terminal">SISTEMA DE BADGES</h2>
        <p className="text-xl text-muted-foreground font-terminal max-w-2xl mx-auto">
          Desbloquea badges únicos con tus donaciones y apoyo a la comunidad
        </p>
      </div>

      {/* Estadísticas de Badges */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {unlockedBadges.length}
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Badges Desbloqueados</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {lockedBadges.length}
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Por Desbloquear</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {userBadges.filter(b => b.rarity === 'legendary').length}
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Legendarios</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {Math.round((unlockedBadges.length / userBadges.length) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Progreso Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedRarity === 'all' ? 'default' : 'outline'}
          size="sm"
          className="font-terminal"
          onClick={() => setSelectedRarity('all')}
        >
          Todos
        </Button>
        <Button
          variant={selectedRarity === 'common' ? 'default' : 'outline'}
          size="sm"
          className="font-terminal"
          onClick={() => setSelectedRarity('common')}
        >
          Comunes
        </Button>
        <Button
          variant={selectedRarity === 'rare' ? 'default' : 'outline'}
          size="sm"
          className="font-terminal"
          onClick={() => setSelectedRarity('rare')}
        >
          Raros
        </Button>
        <Button
          variant={selectedRarity === 'epic' ? 'default' : 'outline'}
          size="sm"
          className="font-terminal"
          onClick={() => setSelectedRarity('epic')}
        >
          Épicos
        </Button>
        <Button
          variant={selectedRarity === 'legendary' ? 'default' : 'outline'}
          size="sm"
          className="font-terminal"
          onClick={() => setSelectedRarity('legendary')}
        >
          Legendarios
        </Button>
      </div>

      {/* Grid de Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map((badge) => {
          const progress = getProgressForBadge(badge);
          const isUnlocked = badge.isUnlocked;

          return (
            <Card 
              key={badge.id} 
              className={`terminal-border transition-all duration-300 hover:border-primary/50 ${
                isUnlocked ? 'ring-2 ring-primary/30' : 'opacity-75'
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 ${
                    isUnlocked 
                      ? `bg-gradient-to-br ${getRarityGradient(badge.rarity)} border-primary/50` 
                      : 'bg-gray-500/10 border-gray-500/30'
                  }`}>
                    {isUnlocked ? (
                      getBadgeIcon(badge)
                    ) : (
                      <Lock className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  {isUnlocked && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                  )}
                </div>
                
                <CardTitle className="font-terminal text-lg">
                  {badge.name}
                </CardTitle>
                
                <Badge className={getRarityColor(badge.rarity)}>
                  <span className="capitalize">{badge.rarity}</span>
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground font-terminal text-center">
                  {badge.description}
                </p>

                {/* Progreso */}
                {showProgress && !isUnlocked && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-terminal text-muted-foreground">
                        {formatRequirement(badge)}
                      </span>
                      <span className="font-terminal text-primary">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Fecha de desbloqueo */}
                {isUnlocked && badge.unlockedAt && (
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground font-terminal">
                      Desbloqueado el {new Date(badge.unlockedAt).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                )}

                {/* Estado */}
                <div className="text-center">
                  {isUnlocked ? (
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Desbloqueado
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/30">
                      <Lock className="h-3 w-3 mr-1" />
                      Bloqueado
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Información adicional */}
      <Card className="terminal-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Badges Únicos</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Cada badge representa un logro especial en la comunidad
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Progreso Visible</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Ve tu progreso hacia el siguiente badge
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-terminal font-bold text-primary mb-2">Reconocimiento</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Muestra tu apoyo y compromiso con la comunidad
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationBadges;
