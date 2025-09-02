import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  UserPlus,
  Shield,
  Mail,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'banned' | 'pending';
  createdAt: string;
  lastLogin: string;
  postsCount: number;
  donationsCount: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  // Simular datos de usuarios
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Administrador',
        email: 'planetazuzu@gmail.com',
        role: 'admin',
        status: 'active',
        createdAt: '2024-01-01',
        lastLogin: '2024-09-01',
        postsCount: 15,
        donationsCount: 0
      },
      {
        id: '2',
        name: 'Usuario Test',
        email: 'usuario@test.com',
        role: 'user',
        status: 'active',
        createdAt: '2024-08-15',
        lastLogin: '2024-08-30',
        postsCount: 3,
        donationsCount: 2
      },
      {
        id: '3',
        name: 'Usuario Baneado',
        email: 'baneado@test.com',
        role: 'user',
        status: 'banned',
        createdAt: '2024-07-01',
        lastLogin: '2024-08-01',
        postsCount: 0,
        donationsCount: 0
      },
      {
        id: '4',
        name: 'Usuario Pendiente',
        email: 'pendiente@test.com',
        role: 'user',
        status: 'pending',
        createdAt: '2024-08-25',
        lastLogin: '2024-08-25',
        postsCount: 1,
        donationsCount: 0
      }
    ];
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filtrar usuarios
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter, roleFilter]);

  const handleStatusChange = (userId: string, newStatus: 'active' | 'banned' | 'pending') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleRoleChange = (userId: string, newRole: 'admin' | 'user') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Activo</Badge>;
      case 'banned':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Baneado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30">Admin</Badge>;
      case 'user':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">Usuario</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold font-terminal">GESTIÓN DE USUARIOS</h2>
        </div>
        <Button className="font-terminal">
          <UserPlus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card className="terminal-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-terminal"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="banned">Baneados</option>
              <option value="pending">Pendientes</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-background border border-primary/30 rounded-sm px-3 py-2 font-terminal text-primary"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="user">Usuarios</option>
            </select>

            <div className="text-sm text-muted-foreground font-terminal flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {filteredUsers.length} usuarios encontrados
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuarios */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="terminal-border hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold font-terminal text-primary">{user.name}</h3>
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Registrado: {new Date(user.createdAt).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal">
                      <span>Posts: {user.postsCount}</span>
                      <span>Donaciones: {user.donationsCount}</span>
                      <span>Último login: {new Date(user.lastLogin).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="font-terminal">
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'active')}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'banned')}>
                      <Ban className="h-4 w-4 mr-2" />
                      Banear
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}>
                      <Shield className="h-4 w-4 mr-2" />
                      {user.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estadísticas de Usuarios */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">ESTADÍSTICAS DE USUARIOS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {users.filter(u => u.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Usuarios Activos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {users.filter(u => u.status === 'banned').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Usuarios Baneados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Administradores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary font-terminal">
                {users.filter(u => u.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Pendientes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
