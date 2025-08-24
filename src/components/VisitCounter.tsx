import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Eye, Activity } from "lucide-react";

interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  pageViews: number;
}

const VisitCounter = () => {
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: 0,
    todayVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const loadStats = async () => {
      setIsLoading(true);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos simulados - en producción vendrían de una API
      const mockStats: VisitStats = {
        totalVisits: 15420,
        todayVisits: 342,
        uniqueVisitors: 8920,
        pageViews: 45678
      };
      
      setStats(mockStats);
      setIsLoading(false);
    };

    loadStats();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const statsCards = [
    {
      title: "Total Visitas",
      value: stats.totalVisits,
      icon: Users,
      color: "text-primary",
      description: "Visitas totales"
    },
    {
      title: "Hoy",
      value: stats.todayVisits,
      icon: TrendingUp,
      color: "text-green-500",
      description: "Visitas de hoy"
    },
    {
      title: "Visitantes Únicos",
      value: stats.uniqueVisitors,
      icon: Eye,
      color: "text-blue-500",
      description: "Usuarios únicos"
    },
    {
      title: "Páginas Vistas",
      value: stats.pageViews,
      icon: Activity,
      color: "text-purple-500",
      description: "Total de páginas"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="terminal-border animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-primary terminal-glow" />
          <h3 className="text-xl font-bold text-primary font-terminal">
            ESTADÍSTICAS DE VISITAS
          </h3>
        </div>
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal">
          EN TIEMPO REAL
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card 
            key={index} 
            className="terminal-card group hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color} group-hover:animate-pulse`} />
                <Badge variant="secondary" className="text-xs font-terminal">
                  +{Math.floor(Math.random() * 10) + 1}%
                </Badge>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground font-terminal">
                  {stat.title}
                </h4>
                <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                  {formatNumber(stat.value)}
                </p>
                <p className="text-xs text-muted-foreground font-terminal">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Activity */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-terminal text-primary">ACTIVIDAD EN VIVO</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-terminal">
              <span className="text-muted-foreground">Usuario anónimo visitó /funcionalidades</span>
              <span className="text-primary">hace 30s</span>
            </div>
            <div className="flex items-center justify-between text-xs font-terminal">
              <span className="text-muted-foreground">Usuario anónimo descargó la app</span>
              <span className="text-primary">hace 2m</span>
            </div>
            <div className="flex items-center justify-between text-xs font-terminal">
              <span className="text-muted-foreground">Usuario anónimo leyó guía de supervivencia</span>
              <span className="text-primary">hace 5m</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitCounter; 