import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Settings, 
  Users, 
  FileText, 
  MessageSquare, 
  Shield, 
  BarChart3, 
  Globe, 
  Download, 
  Activity,
  LogOut,
  Menu,
  X,
  CreditCard,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlogEditor from "@/components/BlogEditor";
import ForumManager from "@/components/ForumManager";
import DevelopmentStatus from "@/components/DevelopmentStatus";
import DonationSystem from "@/components/DonationSystem";
import VisitCounter from "@/components/VisitCounter";
import PaymentConfig from "@/components/PaymentConfig";
import TransactionManager from "@/components/TransactionManager";
import UserManager from "@/components/UserManager";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [showForumManager, setShowForumManager] = useState(false);
  const [showDonationSystem, setShowDonationSystem] = useState(false);
  const navigate = useNavigate();

  const adminSections = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: BarChart3,
      description: "Vista general del sistema"
    },
    {
      id: "users",
      title: "Usuarios",
      icon: Users,
      description: "Gestión de usuarios y comunidad"
    },
    {
      id: "payments",
      title: "Pagos",
      icon: CreditCard,
      description: "Configuración de métodos de pago"
    },
    {
      id: "transactions",
      title: "Transacciones",
      icon: DollarSign,
      description: "Gestión de transacciones y ventas"
    },
    {
      id: "config",
      title: "Configuración",
      icon: Settings,
      description: "Configuración general del sitio"
    },
    {
      id: "forums",
      title: "Foros",
      icon: MessageSquare,
      description: "Gestión de foros y moderación"
    },
    {
      id: "blog",
      title: "Blog",
      icon: FileText,
      description: "Gestión de artículos y contenido"
    },
    {
      id: "content",
      title: "Contenido IA",
      icon: Shield,
      description: "Guías y conocimiento de emergencia"
    },
    {
      id: "translations",
      title: "Traducciones",
      icon: Globe,
      description: "Gestión de idiomas"
    },
    {
      id: "downloads",
      title: "Descargas",
      icon: Download,
      description: "Sistema de licencias y versiones"
    },
    {
      id: "logs",
      title: "Logs",
      icon: Activity,
      description: "Registro de auditoría"
    }
  ];

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "941259018a") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setCurrentSection("dashboard");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="terminal-border max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary terminal-glow" />
              <h1 className="text-2xl font-bold text-primary font-terminal">
                ATHENA ADMIN
              </h1>
            </div>
            <p className="text-muted-foreground font-terminal">
              Acceso al Panel de Administración
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                  Contraseña de Administrador
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la contraseña..."
                  className="font-terminal"
                  required
                />
              </div>
              {loginError && (
                <p className="text-destructive text-sm font-terminal">{loginError}</p>
              )}
              <Button type="submit" className="w-full font-terminal">
                ACCEDER
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background-secondary border-b border-primary/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary terminal-glow" />
              <h1 className="text-xl font-bold text-primary font-terminal">
                ATHENA ADMIN PANEL
              </h1>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="font-terminal">
            <LogOut className="h-4 w-4 mr-2" />
            CERRAR SESIÓN
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-background-secondary border-r border-primary/30 w-64 min-h-screen p-4 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static absolute z-40`}>
          <nav className="space-y-2">
            {adminSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setCurrentSection(section.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left p-3 rounded-sm font-terminal transition-all duration-300 ${
                  currentSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs opacity-75">{section.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentSection === "dashboard" && (
            <DashboardSection />
          )}
          {currentSection === "users" && <UserManager />}
          {currentSection === "payments" && <PaymentConfig />}
          {currentSection === "transactions" && <TransactionManager />}
          {currentSection === "config" && (
            <ConfigSection onOpenDonations={() => setShowDonationSystem(true)} />
          )}
          {currentSection === "forums" && (
            <ForumsSection onOpenManager={() => setShowForumManager(true)} />
          )}
          {currentSection === "blog" && (
            <BlogSection onNewPost={() => setShowBlogEditor(true)} />
          )}
          {currentSection === "content" && <ContentSection />}
          {currentSection === "translations" && <TranslationsSection />}
          {currentSection === "downloads" && <DownloadsSection />}
          {currentSection === "logs" && <LogsSection />}
        </main>
      </div>

      {/* Modals */}
      {showBlogEditor && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-primary/30 rounded-sm max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <BlogEditor
              onSave={(post) => {
                console.log("Post guardado:", post);
                setShowBlogEditor(false);
              }}
              onCancel={() => setShowBlogEditor(false)}
            />
          </div>
        </div>
      )}

      {showForumManager && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-primary/30 rounded-sm max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <ForumManager onClose={() => setShowForumManager(false)} />
          </div>
        </div>
      )}

      {showDonationSystem && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-primary/30 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <DonationSystem onClose={() => setShowDonationSystem(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary font-terminal">
          DASHBOARD
        </h2>
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal">
          v2.1.3
        </Badge>
      </div>

      {/* Visit Counter */}
      <VisitCounter />

      {/* Development Status */}
      <DevelopmentStatus />

      {/* Quick Actions */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate('/payment-test')}
              className="font-terminal glow-effect"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Probar Sistema de Pagos
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCurrentSection('payments')}
              className="font-terminal"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Configurar Pagos
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCurrentSection('transactions')}
              className="font-terminal"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Ver Transacciones
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="terminal-card">
          <CardHeader>
            <CardTitle className="font-terminal">Estado del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-terminal">Servidor</span>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-500">
                  ONLINE
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-terminal">Base de Datos</span>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-500">
                  CONECTADO
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-terminal">IA Service</span>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-500">
                  ACTIVO
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardHeader>
            <CardTitle className="font-terminal">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm font-terminal">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nuevo post publicado</span>
                <span className="text-primary">2m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Usuario registrado</span>
                <span className="text-primary">5m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Descarga de app</span>
                <span className="text-primary">10m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardHeader>
            <CardTitle className="font-terminal">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full font-terminal">
                <FileText className="h-4 w-4 mr-2" />
                Nuevo Post
              </Button>
              <Button variant="outline" size="sm" className="w-full font-terminal">
                <Users className="h-4 w-4 mr-2" />
                Gestionar Usuarios
              </Button>
              <Button variant="outline" size="sm" className="w-full font-terminal">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Config Section
const ConfigSection = ({ onOpenDonations }: { onOpenDonations: () => void }) => {
  return (
    <div className="space-y-6">
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Configuración General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-primary font-terminal mb-2 block">
              Email de Contacto
            </label>
            <Input defaultValue="contacto@athena.com" className="font-terminal" />
          </div>
          <div>
            <label className="text-sm font-medium text-primary font-terminal mb-2 block">
              Nombre del Sitio
            </label>
            <Input defaultValue="Athena Pocket" className="font-terminal" />
          </div>
          <div>
            <label className="text-sm font-medium text-primary font-terminal mb-2 block">
              Versión
            </label>
            <Input defaultValue="v2.1.3-beta" className="font-terminal" />
          </div>
          <div className="flex space-x-2">
            <Button className="font-terminal">Guardar Cambios</Button>
            <Button variant="outline" onClick={onOpenDonations} className="font-terminal">
              Gestionar Donaciones
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Forums Section
const ForumsSection = ({ onOpenManager }: { onOpenManager: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary font-terminal">Gestión de Foros</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onOpenManager} className="font-terminal">
            Gestión Avanzada
          </Button>
          <Button className="font-terminal">Nueva Categoría</Button>
        </div>
      </div>
      
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Supervivencia General", threads: 45, status: "active" },
              { name: "Primeros Auxilios", threads: 23, status: "active" },
              { name: "Navegación y Orientación", threads: 18, status: "active" },
              { name: "Construcción de Refugios", threads: 12, status: "moderated" }
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                <div>
                  <h3 className="font-medium font-terminal">{category.name}</h3>
                  <p className="text-sm text-muted-foreground font-terminal">{category.threads} hilos</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={category.status === "active" ? "default" : "secondary"}>
                    {category.status}
                  </Badge>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Blog Section
const BlogSection = ({ onNewPost }: { onNewPost: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary font-terminal">Gestión del Blog</h2>
        <Button onClick={onNewPost} className="font-terminal">Nuevo Post</Button>
      </div>
      
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Posts Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Guía completa de supervivencia en montaña", status: "published", date: "2024-01-15" },
              { title: "Técnicas de purificación de agua", status: "draft", date: "2024-01-14" },
              { title: "Primeros auxilios en situaciones extremas", status: "published", date: "2024-01-13" }
            ].map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                <div>
                  <h3 className="font-medium font-terminal">{post.title}</h3>
                  <p className="text-sm text-muted-foreground font-terminal">{post.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status}
                  </Badge>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Users Section
const UsersSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary font-terminal">Gestión de Usuarios</h2>
        <Button className="font-terminal">Nuevo Usuario</Button>
      </div>
      
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Usuarios Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "juan_survival", role: "user", status: "active", joined: "2024-01-15" },
              { name: "maria_explorer", role: "moderator", status: "active", joined: "2024-01-14" },
              { name: "carlos_guide", role: "user", status: "banned", joined: "2024-01-13" }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                <div>
                  <h3 className="font-medium font-terminal">{user.name}</h3>
                  <p className="text-sm text-muted-foreground font-terminal">Se unió: {user.joined}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={user.role === "moderator" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                  <Badge variant={user.status === "active" ? "default" : "destructive"}>
                    {user.status}
                  </Badge>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Content Section
const ContentSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary font-terminal">Contenido IA</h2>
        <Button className="font-terminal">Subir Archivo</Button>
      </div>
      
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Archivos de Conocimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "primeros_auxilios.json", type: "Primeros Auxilios", size: "2.3 KB" },
              { name: "supervivencia_montana.txt", type: "Supervivencia", size: "1.8 KB" },
              { name: "navegacion_offline.json", type: "Navegación", size: "3.1 KB" }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                <div>
                  <h3 className="font-medium font-terminal">{file.name}</h3>
                  <p className="text-sm text-muted-foreground font-terminal">{file.type} • {file.size}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">Editar</Button>
                  <Button variant="ghost" size="sm">Descargar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Translations Section
const TranslationsSection = () => {
  return (
    <div className="space-y-6">
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Gestión de Idiomas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Idioma Principal
              </label>
              <select className="w-full p-2 border border-primary/20 rounded-sm bg-background font-terminal">
                <option>Español</option>
                <option>English</option>
                <option>Français</option>
              </select>
            </div>
            <Button className="font-terminal">Gestionar Traducciones</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Downloads Section
const DownloadsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary font-terminal">Sistema de Descargas</h2>
        <Button className="font-terminal">Nueva Versión</Button>
      </div>
      
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Versiones Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { version: "v2.1.3", platform: "Android", size: "45.2 MB", downloads: "1,234" },
              { version: "v2.1.2", platform: "iOS", size: "52.1 MB", downloads: "987" },
              { version: "v2.1.1", platform: "Android", size: "44.8 MB", downloads: "2,156" }
            ].map((release, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                <div>
                  <h3 className="font-medium font-terminal">{release.version} - {release.platform}</h3>
                  <p className="text-sm text-muted-foreground font-terminal">{release.size} • {release.downloads} descargas</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">Ver Hash</Button>
                  <Button variant="ghost" size="sm">Generar Código</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Logs Section
const LogsSection = () => {
  return (
    <div className="space-y-6">
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Registro de Auditoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Usuario baneado", user: "admin@athena.com", target: "carlos_guide", time: "2024-01-15 14:30" },
              { action: "Post editado", user: "mod@athena.com", target: "Guía de supervivencia", time: "2024-01-15 13:45" },
              { action: "Nueva categoría creada", user: "admin@athena.com", target: "Construcción", time: "2024-01-15 12:20" },
              { action: "Configuración actualizada", user: "admin@athena.com", target: "Email de contacto", time: "2024-01-15 11:15" }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm">
                <div>
                  <h3 className="font-medium font-terminal">{log.action}</h3>
                  <p className="text-sm text-muted-foreground font-terminal">
                    Por: {log.user} • Objetivo: {log.target}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground font-terminal">{log.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin; 