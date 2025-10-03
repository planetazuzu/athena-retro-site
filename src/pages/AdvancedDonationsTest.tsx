import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Target, 
  Trophy, 
  TrendingUp, 
  Users, 
  Euro, 
  Gift, 
  Star,
  Crown,
  Zap,
  Shield,
  Calendar,
  BarChart3,
  Activity,
  Award,
  Flame,
  Gem,
  Sparkles
} from "lucide-react";
import Navigation from "@/components/Navigation";
import DonationGoals from "@/components/donations/DonationGoals";
import DonationForm from "@/components/donations/DonationForm";
import DonationBadges from "@/components/donations/DonationBadges";
import { useAdvancedDonations } from "@/hooks/useAdvancedDonations";

const AdvancedDonationsTest = () => {
  const { getDonationStats, getRecentDonations, goals, isLoading } = useAdvancedDonations();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const stats = getDonationStats();
  const recentDonations = getRecentDonations(5);
  const selectedGoalData = goals.find(g => g.id === selectedGoal);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="font-terminal text-primary">Cargando sistema de donaciones...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-primary font-terminal">
            SISTEMA DE DONACIONES AVANZADO
          </h1>
          <p className="text-xl text-muted-foreground font-terminal max-w-3xl mx-auto">
            Apoya nuestros proyectos, desbloquea recompensas exclusivas y forma parte de una comunidad que construye el futuro
          </p>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="terminal-border">
            <CardContent className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {formatCurrency(stats.totalAmount)}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Total Recaudado</div>
            </CardContent>
          </Card>

          <Card className="terminal-border">
            <CardContent className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalDonations}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Donaciones</div>
            </CardContent>
          </Card>

          <Card className="terminal-border">
            <CardContent className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.totalBackers}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Patrocinadores</div>
            </CardContent>
          </Card>

          <Card className="terminal-border">
            <CardContent className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {stats.activeGoals}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Metas Activas</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Principales */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 font-terminal">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Metas</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Badges</span>
            </TabsTrigger>
            <TabsTrigger value="donate" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Donar</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Resumen */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Donaciones Recientes */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>DONACIONES RECIENTES</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDonations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-terminal text-sm font-medium">
                              {donation.isAnonymous ? 'Anónimo' : donation.userName}
                            </div>
                            <div className="text-xs text-muted-foreground font-terminal">
                              {formatDate(donation.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-terminal font-bold text-primary">
                            {formatCurrency(donation.amount)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {donation.paymentMethod}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas por Categoría */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>POR CATEGORÍA</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.categoryStats).map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="font-terminal text-sm capitalize">{category}</span>
                        </div>
                        <span className="font-terminal font-bold text-primary">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Información del Sistema */}
            <Card className="terminal-border">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-terminal font-bold text-primary mb-2">Transparencia Total</h3>
                    <p className="text-sm text-muted-foreground font-terminal">
                      Todas las donaciones son públicas y auditables
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
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-terminal font-bold text-primary mb-2">Sistema de Badges</h3>
                    <p className="text-sm text-muted-foreground font-terminal">
                      Desbloquea badges únicos con tus contribuciones
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Metas */}
          <TabsContent value="goals">
            <DonationGoals 
              onSelectGoal={setSelectedGoal}
              showCreateButton={true}
            />
          </TabsContent>

          {/* Tab: Badges */}
          <TabsContent value="badges">
            <DonationBadges 
              userId="current_user"
              showAllBadges={true}
              showProgress={true}
            />
          </TabsContent>

          {/* Tab: Donar */}
          <TabsContent value="donate">
            {selectedGoalData ? (
              <DonationForm 
                goal={selectedGoalData}
                onSuccess={(donationId) => {
                  alert(`¡Donación exitosa! ID: ${donationId}`);
                  setSelectedGoal(null);
                  setActiveTab('overview');
                }}
                onCancel={() => setSelectedGoal(null)}
              />
            ) : (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-terminal text-primary mb-2">
                    Selecciona una Meta
                  </h3>
                  <p className="text-muted-foreground font-terminal mb-6">
                    Ve a la pestaña "Metas" y selecciona una meta para donar
                  </p>
                  <Button 
                    className="font-terminal"
                    onClick={() => setActiveTab('goals')}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Ver Metas Disponibles
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedDonationsTest;
