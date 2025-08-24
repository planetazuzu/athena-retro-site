import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Mail, 
  Calendar,
  Shield,
  Crown,
  User,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  CheckCircle,
  XCircle
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user' | 'premium';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  subscription: 'free' | 'pro' | 'enterprise';
  avatar?: string;
}

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    premiumUsers: 0,
    newUsersThisMonth: 0
  });

  // Simular datos de usuarios
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "user_001",
        name: "Carlos Rodriguez",
        email: "carlos@email.com",
        role: "premium",
        status: "active",
        joinDate: "2024-01-10T10:30:00Z",
        lastLogin: "2024-01-15T14:20:00Z",
        subscription: "pro"
      },
      {
        id: "user_002",
        name: "Maria Santos",
        email: "maria@email.com",
        role: "user",
        status: "active",
        joinDate: "2024-01-08T15:45:00Z",
        lastLogin: "2024-01-15T09:15:00Z",
        subscription: "free"
      },
      {
        id: "user_003",
        name: "Alex Chen",
        email: "alex@email.com",
        role: "moderator",
        status: "active",
        joinDate: "2024-01-05T09:15:00Z",
        lastLogin: "2024-01-15T16:30:00Z",
        subscription: "enterprise"
      },
      {
        id: "user_004",
        name: "Ana García",
        email: "ana@email.com",
        role: "user",
        status: "inactive",
        joinDate: "2024-01-12T08:20:00Z",
        lastLogin: "2024-01-13T11:45:00Z",
        subscription: "free"
      },
      {
        id: "user_005",
        name: "Luis Martínez",
        email: "luis@email.com",
        role: "premium",
        status: "suspended",
        joinDate: "2024-01-03T14:30:00Z",
        lastLogin: "2024-01-14T13:20:00Z",
        subscription: "pro"
      },
      {
        id: "user_006",
        name: "Sofia Lopez",
        email: "sofia@email.com",
        role: "admin",
        status: "active",
        joinDate: "2024-01-01T10:00:00Z",
        lastLogin: "2024-01-15T17:00:00Z",
        subscription: "enterprise"
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    
    // Calcular estadísticas
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    setStats({
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      premiumUsers: mockUsers.filter(u => u.subscription !== 'free').length,
      newUsersThisMonth: mockUsers.filter(u => new Date(u.joinDate) >= thisMonth).length
    });
    
    setIsLoading(false);
  }, []);

  // Filtrar usuarios
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(u => u.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { color: "bg-red-500/10 border-red-500/30 text-red-500", text: "ADMIN", icon: Crown },
      moderator: { color: "bg-blue-500/10 border-blue-500/30 text-blue-500", text: "MODERADOR", icon: Shield },
      premium: { color: "bg-purple-500/10 border-purple-500/30 text-purple-500", text: "PREMIUM", icon: Crown },
      user: { color: "bg-gray-500/10 border-gray-500/30 text-gray-500", text: "USUARIO", icon: User }
    };

    const config = roleConfig[role as keyof typeof roleConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge variant="outline" className={`font-terminal ${config.color}`}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-500/10 border-green-500/30 text-green-500", text: "ACTIVO" },
      inactive: { color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-500", text: "INACTIVO" },
      suspended: { color: "bg-red-500/10 border-red-500/30 text-red-500", text: "SUSPENDIDO" }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant="outline" className={`font-terminal ${config.color}`}>
        {config.text}
      </Badge>
    );
  };

  const getSubscriptionBadge = (subscription: string) => {
    const subscriptionConfig = {
      free: { color: "bg-gray-500/10 border-gray-500/30 text-gray-500", text: "GRATIS" },
      pro: { color: "bg-blue-500/10 border-blue-500/30 text-blue-500", text: "PRO" },
      enterprise: { color: "bg-purple-500/10 border-purple-500/30 text-purple-500", text: "ENTERPRISE" }
    };

    const config = subscriptionConfig[subscription as keyof typeof subscriptionConfig];
    return (
      <Badge variant="outline" className={`font-terminal ${config.color}`}>
        {config.text}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleRoleChange = (userId: string, newRole: 'admin' | 'moderator' | 'user' | 'premium') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-primary terminal-glow" />
          <h2 className="text-2xl font-bold text-primary font-terminal">
            GESTIÓN DE USUARIOS
          </h2>
        </div>
        <Button className="font-terminal glow-effect">
          <UserPlus className="h-4 w-4 mr-2" />
          Añadir Usuario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Total Usuarios</p>
                <p className="text-2xl font-bold text-primary terminal-glow font-terminal">
                  {stats.totalUsers}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Usuarios Activos</p>
                <p className="text-2xl font-bold text-green-500 terminal-glow font-terminal">
                  {stats.activeUsers}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Usuarios Premium</p>
                <p className="text-2xl font-bold text-purple-500 terminal-glow font-terminal">
                  {stats.premiumUsers}
                </p>
              </div>
              <Crown className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-terminal text-muted-foreground">Nuevos Este Mes</p>
                <p className="text-2xl font-bold text-blue-500 terminal-glow font-terminal">
                  {stats.newUsersThisMonth}
                </p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-terminal"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="p-2 border border-primary/20 rounded-sm bg-background font-terminal"
              >
                <option value="all">Todos los roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderador</option>
                <option value="premium">Premium</option>
                <option value="user">Usuario</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border border-primary/20 rounded-sm bg-background font-terminal"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="suspended">Suspendido</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">
            Usuarios ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full font-terminal">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left p-2 text-sm font-medium text-primary">Usuario</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Email</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Rol</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Estado</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Suscripción</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Fecha Registro</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Último Login</th>
                  <th className="text-left p-2 text-sm font-medium text-primary">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="p-2">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="p-2">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="p-2">
                      {getSubscriptionBadge(user.subscription)}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {formatDateTime(user.lastLogin)}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="font-terminal">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="font-terminal">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="font-terminal"
                            onClick={() => handleStatusChange(user.id, 'suspended')}
                          >
                            <Lock className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="font-terminal"
                            onClick={() => handleStatusChange(user.id, 'active')}
                          >
                            <Unlock className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManager; 