import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  User, 
  Mail, 
  Calendar, 
  Shield,
  Globe,
  MessageSquare,
  UserPlus,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  location: string;
  website?: string;
  joinDate: Date;
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  isOnline: boolean;
  lastSeen?: Date;
  stats: {
    posts: number;
    donations: number;
    totalDonated: number;
    badges: number;
  };
}

interface UserSearchProps {
  users?: User[];
  onUserSelect?: (user: User) => void;
  onSendMessage?: (user: User) => void;
  onAddFriend?: (user: User) => void;
}

const UserSearch = ({ 
  users = [], 
  onUserSelect, 
  onSendMessage, 
  onAddFriend 
}: UserSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'lastSeen' | 'posts'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin' | 'moderator'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');

  // Datos de ejemplo si no se proporcionan
  useEffect(() => {
    if (users.length === 0) {
      const sampleUsers: User[] = [
        {
          id: 'user-1',
          name: 'María García',
          email: 'maria@ejemplo.com',
          bio: 'Apasionada por la supervivencia y la tecnología.',
          location: 'Madrid, España',
          website: 'https://maria-garcia.com',
          joinDate: new Date('2024-01-15'),
          role: 'user',
          isVerified: true,
          isOnline: true,
          lastSeen: new Date(),
          stats: { posts: 12, donations: 5, totalDonated: 200, badges: 3 }
        },
        {
          id: 'user-2',
          name: 'Carlos López',
          email: 'carlos@ejemplo.com',
          bio: 'Experto en técnicas de supervivencia urbana.',
          location: 'Barcelona, España',
          joinDate: new Date('2024-01-10'),
          role: 'moderator',
          isVerified: true,
          isOnline: false,
          lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
          stats: { posts: 25, donations: 8, totalDonated: 450, badges: 7 }
        },
        {
          id: 'user-3',
          name: 'Ana Martín',
          email: 'ana@ejemplo.com',
          bio: 'Nueva en la comunidad, aprendiendo sobre supervivencia.',
          location: 'Valencia, España',
          joinDate: new Date('2024-02-01'),
          role: 'user',
          isVerified: false,
          isOnline: true,
          lastSeen: new Date(),
          stats: { posts: 3, donations: 1, totalDonated: 50, badges: 1 }
        },
        {
          id: 'admin-1',
          name: 'Administrador',
          email: 'admin@athenapocket.com',
          bio: 'Desarrollador principal de Athena Pocket.',
          location: 'Madrid, España',
          joinDate: new Date('2023-12-01'),
          role: 'admin',
          isVerified: true,
          isOnline: true,
          lastSeen: new Date(),
          stats: { posts: 45, donations: 15, totalDonated: 1200, badges: 12 }
        }
      ];
      setFilteredUsers(sampleUsers);
    } else {
      setFilteredUsers(users);
    }
  }, [users]);

  // Filtrar y ordenar usuarios
  useEffect(() => {
    let filtered = [...filteredUsers];

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query)
      );
    }

    // Filtrar por rol
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => 
        statusFilter === 'online' ? user.isOnline : !user.isOnline
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'joinDate':
          aValue = a.joinDate.getTime();
          bValue = b.joinDate.getTime();
          break;
        case 'lastSeen':
          aValue = a.lastSeen?.getTime() || 0;
          bValue = b.lastSeen?.getTime() || 0;
          break;
        case 'posts':
          aValue = a.stats.posts;
          bValue = b.stats.posts;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, statusFilter, sortBy, sortOrder]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive" className="font-terminal">👑 Admin</Badge>;
      case 'moderator':
        return <Badge variant="secondary" className="font-terminal">🛡️ Moderador</Badge>;
      default:
        return <Badge variant="outline" className="font-terminal">👤 Usuario</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatLastSeen = (lastSeen?: Date) => {
    if (!lastSeen) return 'Nunca';
    
    const now = new Date();
    const diff = now.getTime() - lastSeen.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Hace ${days}d`;
    if (hours > 0) return `Hace ${hours}h`;
    if (minutes > 0) return `Hace ${minutes}m`;
    return 'Ahora';
  };

  return (
    <div className="space-y-6">
      {/* Header y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <User className="h-5 w-5 mr-2" />
            Buscar Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, email, ubicación..."
              className="pl-10 font-terminal"
            />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-terminal text-primary mb-2 block">Rol</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="w-full p-2 border rounded-sm bg-background font-terminal"
              >
                <option value="all">Todos los roles</option>
                <option value="user">Usuario</option>
                <option value="moderator">Moderador</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-terminal text-primary mb-2 block">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full p-2 border rounded-sm bg-background font-terminal"
              >
                <option value="all">Todos</option>
                <option value="online">En línea</option>
                <option value="offline">Desconectado</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-terminal text-primary mb-2 block">Ordenar por</label>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="flex-1 p-2 border rounded-sm bg-background font-terminal"
                >
                  <option value="name">Nombre</option>
                  <option value="joinDate">Fecha de registro</option>
                  <option value="lastSeen">Última conexión</option>
                  <option value="posts">Posts</option>
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="font-terminal"
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm font-terminal text-muted-foreground">
              {filteredUsers.length} usuarios encontrados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Lista de usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="font-terminal bg-primary/20">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium font-terminal text-primary truncate">
                      {user.name}
                    </h3>
                    {user.isVerified && (
                      <Badge variant="default" className="bg-blue-500">
                        ✅
                      </Badge>
                    )}
                  </div>

                  {getRoleBadge(user.role)}

                  <p className="text-sm text-muted-foreground font-terminal mt-2 line-clamp-2">
                    {user.bio}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal mt-3">
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      {user.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {user.joinDate.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground font-terminal mt-2">
                    <span>{user.stats.posts} posts</span>
                    <span>{user.stats.donations} donaciones</span>
                    <span>€{user.stats.totalDonated}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-terminal text-muted-foreground">
                      {user.isOnline ? 'En línea' : `Última vez: ${formatLastSeen(user.lastSeen)}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex space-x-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUserSelect?.(user)}
                  className="flex-1 font-terminal"
                >
                  <User className="h-3 w-3 mr-1" />
                  Ver Perfil
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSendMessage?.(user)}
                  className="flex-1 font-terminal"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Mensaje
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddFriend?.(user)}
                  className="font-terminal"
                >
                  <UserPlus className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold font-terminal text-primary mb-2">
              No se encontraron usuarios
            </h3>
            <p className="text-muted-foreground font-terminal">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserSearch;
