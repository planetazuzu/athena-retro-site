import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Shield,
  Terminal,
  Zap
} from "lucide-react";
import DashboardStats from "./DashboardStats";
import UserManagement from "./UserManagement";
import BlogManagement from "./BlogManagement";
import TransactionManagement from "./TransactionManagement";
import PayPalManagement from "./PayPalManagement";
import AdminSubscriptionManagement from "./SubscriptionManagement";
import AdvancedDonationsManagement from "./AdvancedDonationsManagement";

type AdminSection = 'dashboard' | 'users' | 'blog' | 'transactions' | 'paypal' | 'subscriptions' | 'donations' | 'settings';

const AdminPanel = () => {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 4,
    totalPosts: 4,
    totalTransactions: 5,
    totalRevenue: 255.00,
    totalViews: 2140,
    totalLikes: 156,
    totalComments: 23,
    goalProgress: 25.5,
    activeUsers: 3
  });

  const navigationItems = [
    {
      id: 'dashboard' as AdminSection,
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Vista general del sistema'
    },
    {
      id: 'users' as AdminSection,
      label: 'Usuarios',
      icon: Users,
      description: 'Gestión de usuarios y permisos'
    },
    {
      id: 'blog' as AdminSection,
      label: 'Blog',
      icon: FileText,
      description: 'Gestión de posts y contenido'
    },
    {
      id: 'transactions' as AdminSection,
      label: 'Transacciones',
      icon: CreditCard,
      description: 'Historial de pagos y donaciones'
    },
    {
      id: 'paypal' as AdminSection,
      label: 'PayPal',
      icon: CreditCard,
      description: 'Gestión de PayPal y suscripciones'
    },
    {
      id: 'subscriptions' as AdminSection,
      label: 'Suscripciones',
      icon: CreditCard,
      description: 'Gestión de planes y suscripciones'
    },
    {
      id: 'donations' as AdminSection,
      label: 'Donaciones',
      icon: Heart,
      description: 'Gestión de metas y donaciones avanzadas'
    },
    {
      id: 'settings' as AdminSection,
      label: 'Configuración',
      icon: Settings,
      description: 'Configuración del sistema'
    }
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardStats stats={stats} />;
      case 'users':
        return <UserManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'transactions':
        return <TransactionManagement />;
      case 'paypal':
        return <PayPalManagement />;
      case 'subscriptions':
        return <AdminSubscriptionManagement />;
      case 'donations':
        return <AdvancedDonationsManagement />;
      case 'settings':
        return (
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">CONFIGURACIÓN DEL SISTEMA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-terminal">
                Panel de configuración en desarrollo...
              </p>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardStats stats={stats} />;
    }
  };

  const getSectionIcon = (sectionId: AdminSection) => {
    const item = navigationItems.find(item => item.id === sectionId);
    return item ? item.icon : LayoutDashboard;
  };

  const getSectionLabel = (sectionId: AdminSection) => {
    const item = navigationItems.find(item => item.id === sectionId);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background-secondary border-b border-primary/30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Terminal className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold font-terminal text-primary">ATHENA ADMIN</h1>
                <p className="text-xs text-muted-foreground font-terminal">Panel de Administración</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 font-terminal">
              <Shield className="h-3 w-3 mr-1" />
              Administrador
            </Badge>
            <Button variant="ghost" size="sm" className="font-terminal">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-background-secondary border-r border-primary/30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start font-terminal ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => {
                      setCurrentSection(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <IconComponent className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Button>
                );
              })}
            </nav>

            {/* Información del Sistema */}
            <div className="mt-8 p-4 bg-background border border-primary/20 rounded-sm">
              <h3 className="font-terminal text-sm font-bold text-primary mb-2">SISTEMA</h3>
              <div className="space-y-2 text-xs text-muted-foreground font-terminal">
                <div className="flex items-center space-x-2">
                  <Zap className="h-3 w-3" />
                  <span>Estado: Operativo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-3 w-3" />
                  <span>Versión: 1.0.0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Terminal className="h-3 w-3" />
                  <span>Modo: Desarrollo</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Section Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              {(() => {
                const IconComponent = getSectionIcon(currentSection);
                return <IconComponent className="h-6 w-6 text-primary" />;
              })()}
              <h2 className="text-3xl font-bold font-terminal text-primary">
                {getSectionLabel(currentSection)}
              </h2>
            </div>
            <p className="text-muted-foreground font-terminal">
              {(() => {
                const item = navigationItems.find(item => item.id === currentSection);
                return item ? item.description : '';
              })()}
            </p>
          </div>

          {/* Section Content */}
          {renderSection()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
