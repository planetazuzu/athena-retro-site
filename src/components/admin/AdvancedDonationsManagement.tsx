import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  AlertTriangle,
  Calendar,
  BarChart3,
  Activity,
  Award,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  Search,
  Download,
  Upload,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Flame,
  Gem,
  Sparkles
} from "lucide-react";
import { useAdvancedDonations, DonationGoal, DonationReward, DonationMilestone } from "@/hooks/useAdvancedDonations";

const AdvancedDonationsManagement = () => {
  const { 
    goals, 
    donations, 
    badges, 
    campaigns, 
    getDonationStats, 
    getRecentDonations, 
    filterGoals,
    isLoading 
  } = useAdvancedDonations();

  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [selectedGoal, setSelectedGoal] = useState<DonationGoal | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all',
    search: ''
  });

  const stats = getDonationStats();
  const recentDonations = getRecentDonations(10);
  const filteredGoals = filterGoals({
    status: filters.status !== 'all' ? filters.status : undefined,
    category: filters.category !== 'all' ? filters.category : undefined,
    priority: filters.priority !== 'all' ? filters.priority : undefined,
    isPublic: undefined
  });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'paused': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-terminal text-primary">Cargando gestión de donaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary font-terminal">GESTIÓN DE DONACIONES AVANZADAS</h2>
          <p className="text-muted-foreground font-terminal">Administra metas, donaciones, badges y campañas</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="font-terminal">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="font-terminal">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Meta
          </Button>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {formatCurrency(stats.totalAmount)}
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Total Recaudado</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {stats.totalDonations}
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Donaciones</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {stats.totalBackers}
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Patrocinadores</div>
          </CardContent>
        </Card>
        <Card className="terminal-border">
          <CardContent className="text-center p-4">
            <div className="text-2xl font-bold text-primary font-terminal">
              {stats.activeGoals}
            </div>
            <div className="text-sm text-muted-foreground font-terminal">Metas Activas</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Gestión */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 font-terminal">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Metas</span>
          </TabsTrigger>
          <TabsTrigger value="donations" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Donaciones</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Badges</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Campañas</span>
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
                <div className="space-y-3">
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
        </TabsContent>

        {/* Tab: Metas */}
        <TabsContent value="goals" className="space-y-6">
          {/* Filtros */}
          <Card className="terminal-border">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Estado
                  </label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Activas</SelectItem>
                      <SelectItem value="completed">Completadas</SelectItem>
                      <SelectItem value="paused">Pausadas</SelectItem>
                      <SelectItem value="cancelled">Canceladas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Categoría
                  </label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="development">Desarrollo</SelectItem>
                      <SelectItem value="infrastructure">Infraestructura</SelectItem>
                      <SelectItem value="community">Comunidad</SelectItem>
                      <SelectItem value="feature">Funcionalidad</SelectItem>
                      <SelectItem value="emergency">Emergencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Prioridad
                  </label>
                  <Select value={filters.priority} onValueChange={(value) => setFilters({...filters, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                    Buscar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar metas..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="pl-10 font-terminal"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Metas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGoals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const daysLeft = Math.ceil((new Date(goal.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

              return (
                <Card key={goal.id} className="terminal-border">
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
                          <Badge className={getStatusColor(goal.status)}>
                            <span className="capitalize">{goal.status}</span>
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
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary font-terminal">
                          {goal.rewards.length}
                        </div>
                        <div className="text-xs text-muted-foreground font-terminal">Recompensas</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary font-terminal">
                          {goal.milestones.length}
                        </div>
                        <div className="text-xs text-muted-foreground font-terminal">Hitos</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary font-terminal">
                          {daysLeft}
                        </div>
                        <div className="text-xs text-muted-foreground font-terminal">Días restantes</div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="font-terminal">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline" className="font-terminal">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" className="font-terminal">
                        <Settings className="h-4 w-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Tab: Donaciones */}
        <TabsContent value="donations" className="space-y-6">
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">TODAS LAS DONACIONES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {donations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-terminal font-medium">
                          {donation.isAnonymous ? 'Anónimo' : donation.userName}
                        </div>
                        <div className="text-sm text-muted-foreground font-terminal">
                          {donation.userEmail}
                        </div>
                        <div className="text-xs text-muted-foreground font-terminal">
                          {formatDate(donation.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-terminal font-bold text-primary text-lg">
                        {formatCurrency(donation.amount)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {donation.paymentMethod}
                        </Badge>
                        <Badge className={getStatusColor(donation.status)}>
                          <span className="capitalize">{donation.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Badges */}
        <TabsContent value="badges" className="space-y-6">
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">GESTIÓN DE BADGES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="p-4 border border-primary/30 rounded-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <h4 className="font-terminal font-bold text-primary">{badge.name}</h4>
                        <Badge className={badge.isUnlocked ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-gray-500/10 text-gray-400 border-gray-500/30'}>
                          <span className="capitalize">{badge.rarity}</span>
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-terminal mb-3">
                      {badge.description}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="font-terminal">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" className="font-terminal">
                        <Settings className="h-4 w-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Campañas */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">GESTIÓN DE CAMPAÑAS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-primary/30 rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-terminal font-bold text-primary">{campaign.title}</h4>
                        <p className="text-sm text-muted-foreground font-terminal">{campaign.description}</p>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        <span className="capitalize">{campaign.status}</span>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary font-terminal">
                          {formatCurrency(campaign.totalRaised)}
                        </div>
                        <div className="text-xs text-muted-foreground font-terminal">Recaudado</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary font-terminal">
                          {formatCurrency(campaign.totalTarget)}
                        </div>
                        <div className="text-xs text-muted-foreground font-terminal">Objetivo</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary font-terminal">
                          {campaign.goals.length}
                        </div>
                        <div className="text-xs text-muted-foreground font-terminal">Metas</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedDonationsManagement;
