import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Crown, 
  Gem,
  Target,
  Heart,
  Zap,
  Shield,
  Award,
  Gift
} from "lucide-react";

interface DonationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  currentProgress: number;
  isUnlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'donation' | 'milestone' | 'special';
}

interface DonationBadgesProps {
  totalDonated?: number;
  badges?: DonationBadge[];
}

const DonationBadges = ({ totalDonated = 0, badges = [] }: DonationBadgesProps) => {
  const [donationBadges, setDonationBadges] = useState<DonationBadge[]>(badges);

  // Generar badges por defecto si no se proporcionan
  useEffect(() => {
    if (badges.length === 0) {
      const defaultBadges: DonationBadge[] = [
        {
          id: 'first-donation',
          name: 'Primer Apoyo',
          description: 'Haz tu primera donación a Athena Pocket',
          icon: '🎯',
          requirement: 1,
          currentProgress: totalDonated >= 1 ? 1 : 0,
          isUnlocked: totalDonated >= 1,
          rarity: 'common',
          category: 'donation'
        },
        {
          id: 'supporter',
          name: 'Apoyador',
          description: 'Donar €50 o más',
          icon: '💙',
          requirement: 50,
          currentProgress: Math.min(totalDonated, 50),
          isUnlocked: totalDonated >= 50,
          rarity: 'common',
          category: 'donation'
        },
        {
          id: 'generous-supporter',
          name: 'Apoyador Generoso',
          description: 'Donar €100 o más',
          icon: '🌟',
          requirement: 100,
          currentProgress: Math.min(totalDonated, 100),
          isUnlocked: totalDonated >= 100,
          rarity: 'rare',
          category: 'donation'
        },
        {
          id: 'champion',
          name: 'Campeón',
          description: 'Donar €250 o más',
          icon: '👑',
          requirement: 250,
          currentProgress: Math.min(totalDonated, 250),
          isUnlocked: totalDonated >= 250,
          rarity: 'epic',
          category: 'donation'
        },
        {
          id: 'legend',
          name: 'Leyenda',
          description: 'Donar €500 o más',
          icon: '💎',
          requirement: 500,
          currentProgress: Math.min(totalDonated, 500),
          isUnlocked: totalDonated >= 500,
          rarity: 'legendary',
          category: 'donation'
        },
        {
          id: 'early-adopter',
          name: 'Adoptador Temprano',
          description: 'Apoyar en los primeros 100 donantes',
          icon: '⚡',
          requirement: 1,
          currentProgress: 1,
          isUnlocked: true,
          rarity: 'rare',
          category: 'milestone'
        },
        {
          id: 'community-hero',
          name: 'Héroe de la Comunidad',
          description: 'Ser parte de la comunidad por más de 6 meses',
          icon: '🛡️',
          requirement: 1,
          currentProgress: 1,
          isUnlocked: true,
          rarity: 'epic',
          category: 'milestone'
        },
        {
          id: 'special-contributor',
          name: 'Contribuidor Especial',
          description: 'Contribución especial al desarrollo',
          icon: '🎁',
          requirement: 1,
          currentProgress: 1,
          isUnlocked: false,
          rarity: 'legendary',
          category: 'special'
        }
      ];
      
      setDonationBadges(defaultBadges);
    }
  }, [badges, totalDonated]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
      case 'rare':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'epic':
        return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      case 'legendary':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      default:
        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return <Target className="h-4 w-4" />;
      case 'rare':
        return <Star className="h-4 w-4" />;
      case 'epic':
        return <Crown className="h-4 w-4" />;
      case 'legendary':
        return <Gem className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'donation':
        return <Heart className="h-4 w-4" />;
      case 'milestone':
        return <Zap className="h-4 w-4" />;
      case 'special':
        return <Gift className="h-4 w-4" />;
      default:
        return <Trophy className="h-4 w-4" />;
    }
  };

  const unlockedBadges = donationBadges.filter(badge => badge.isUnlocked);
  const lockedBadges = donationBadges.filter(badge => !badge.isUnlocked);
  const totalBadges = donationBadges.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-terminal text-primary mb-2">
          🏆 Insignias de Donación
        </h2>
        <p className="text-muted-foreground font-terminal">
          Desbloquea insignias especiales apoyando el desarrollo de Athena Pocket
        </p>
      </div>

      {/* Resumen */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Progreso de Insignias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-terminal text-primary">Insignias Desbloqueadas</span>
              <span className="font-terminal text-primary">
                {unlockedBadges.length} / {totalBadges}
              </span>
            </div>
            <Progress 
              value={(unlockedBadges.length / totalBadges) * 100} 
              className="h-3"
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary font-terminal">
                  {unlockedBadges.length}
                </p>
                <p className="text-sm text-muted-foreground font-terminal">Desbloqueadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground font-terminal">
                  {lockedBadges.length}
                </p>
                <p className="text-sm text-muted-foreground font-terminal">Bloqueadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary font-terminal">
                  €{totalDonated}
                </p>
                <p className="text-sm text-muted-foreground font-terminal">Total Donado</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insignias desbloqueadas */}
      {unlockedBadges.length > 0 && (
        <div>
          <h3 className="text-xl font-bold font-terminal text-primary mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" />
            Insignias Desbloqueadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedBadges.map((badge) => (
              <Card key={badge.id} className={`border-2 ${getRarityColor(badge.rarity)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <CardTitle className="font-terminal text-lg">{badge.name}</CardTitle>
                        <Badge variant="outline" className="font-terminal text-xs">
                          {getRarityIcon(badge.rarity)} {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="bg-green-500">
                        ✅ Desbloqueada
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-terminal mb-3">
                    {badge.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(badge.category)}
                      <span className="text-xs font-terminal text-muted-foreground">
                        {badge.category}
                      </span>
                    </div>
                    {badge.category === 'donation' && (
                      <span className="text-xs font-terminal text-primary">
                        €{badge.requirement}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Insignias bloqueadas */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-xl font-bold font-terminal text-primary mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Próximas Insignias
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map((badge) => (
              <Card key={badge.id} className="opacity-60 border border-muted">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl grayscale">{badge.icon}</span>
                      <div>
                        <CardTitle className="font-terminal text-lg text-muted-foreground">
                          {badge.name}
                        </CardTitle>
                        <Badge variant="outline" className="font-terminal text-xs">
                          {getRarityIcon(badge.rarity)} {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      🔒 Bloqueada
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-terminal mb-3">
                    {badge.description}
                  </p>
                  
                  {badge.category === 'donation' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-terminal">
                        <span>Progreso: €{badge.currentProgress}</span>
                        <span>Meta: €{badge.requirement}</span>
                      </div>
                      <Progress 
                        value={(badge.currentProgress / badge.requirement) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs font-terminal text-primary">
                        Faltan €{badge.requirement - badge.currentProgress} para desbloquear
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(badge.category)}
                      <span className="text-xs font-terminal text-muted-foreground">
                        {badge.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationBadges;
