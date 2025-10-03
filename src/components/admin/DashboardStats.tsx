import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  CreditCard, 
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Euro,
  Target,
  Activity
} from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalPosts: number;
    totalTransactions: number;
    totalRevenue: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    goalProgress: number;
    activeUsers: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statCards = [
    {
      title: "Usuarios Totales",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Posts del Blog",
      value: stats.totalPosts,
      icon: FileText,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      title: "Transacciones",
      value: stats.totalTransactions,
      icon: CreditCard,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      title: "Ingresos Totales",
      value: `€${stats.totalRevenue.toFixed(2)}`,
      icon: Euro,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      title: "Vistas Totales",
      value: stats.totalViews,
      icon: Eye,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      title: "Likes Totales",
      value: stats.totalLikes,
      icon: Heart,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30"
    },
    {
      title: "Comentarios",
      value: stats.totalComments,
      icon: MessageSquare,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30"
    },
    {
      title: "Usuarios Activos",
      value: stats.activeUsers,
      icon: Activity,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Meta de Financiamiento */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>META DE FINANCIAMIENTO</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-terminal text-lg">Progreso: €{stats.totalRevenue.toFixed(2)} / €1,000</span>
              <Badge variant="outline" className="font-terminal">
                {stats.goalProgress.toFixed(1)}%
              </Badge>
            </div>
            <div className="w-full bg-background-secondary rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats.goalProgress, 100)}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">€{stats.totalRevenue.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground font-terminal">Recaudado</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">€{(1000 - stats.totalRevenue).toFixed(2)}</div>
                <div className="text-sm text-muted-foreground font-terminal">Faltan</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-terminal">{stats.totalTransactions}</div>
                <div className="text-sm text-muted-foreground font-terminal">Donaciones</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="terminal-border hover:border-primary/50 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-terminal text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-sm ${stat.bgColor} border ${stat.borderColor}`}>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-terminal text-primary">
                  {stat.value}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-xs text-muted-foreground font-terminal">
                    +12% este mes
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardStats;
