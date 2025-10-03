import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  MessageCircle, 
  Search, 
  Users, 
  Settings, 
  Activity, 
  Trophy, 
  Heart, 
  Star, 
  Zap, 
  Crown, 
  Shield, 
  Flame, 
  Gem, 
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Globe,
  Edit,
  Send,
  UserPlus,
  UserMinus
} from "lucide-react";
import Navigation from "@/components/Navigation";
import UserProfile from "@/components/user/UserProfile";
import PrivateMessages from "@/components/user/PrivateMessages";
import UserSearch from "@/components/user/UserSearch";
import { useUserFeatures, UserProfile as UserProfileType } from "@/hooks/useUserFeatures";

const UserFeaturesTest = () => {
  const { profiles, isLoading } = useUserFeatures();
  const [activeTab, setActiveTab] = useState<'profiles' | 'messages' | 'search' | 'demo'>('profiles');
  const [selectedUserId, setSelectedUserId] = useState<string>('user_001');
  const [selectedUser, setSelectedUser] = useState<UserProfileType | null>(null);

  const handleUserSelect = (user: UserProfileType) => {
    setSelectedUser(user);
    setSelectedUserId(user.id);
  };

  const handleEditProfile = () => {
    console.log('Editar perfil:', selectedUserId);
  };

  const handleSendMessage = () => {
    console.log('Enviar mensaje a:', selectedUserId);
  };

  const handleFollow = (userId: string) => {
    console.log('Seguir/dejar de seguir:', userId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-terminal mb-4">
            SISTEMA DE FUNCIONALIDADES DE USUARIO
          </h1>
          <p className="text-xl text-muted-foreground font-terminal max-w-3xl mx-auto">
            Perfiles personalizables, sistema de logros y badges, historial de actividad, 
            mensajes privados y sistema de seguimiento
          </p>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {profiles.length}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Usuarios Registrados</div>
            </CardContent>
          </Card>
          
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {profiles.reduce((acc, user) => acc + user.stats.postsCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Posts Totales</div>
            </CardContent>
          </Card>
          
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {profiles.reduce((acc, user) => acc + user.stats.badgesEarned, 0)}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Badges Otorgados</div>
            </CardContent>
          </Card>
          
          <Card className="terminal-border">
            <CardContent className="text-center p-4">
              <Star className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary font-terminal">
                {profiles.reduce((acc, user) => acc + user.stats.reputation, 0)}
              </div>
              <div className="text-sm text-muted-foreground font-terminal">Reputación Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Funcionalidades */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 font-terminal">
            <TabsTrigger value="profiles" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Perfiles</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Mensajes</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Búsqueda</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Demo</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Perfiles */}
          <TabsContent value="profiles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Lista de Usuarios */}
              <div className="lg:col-span-1">
                <Card className="terminal-border">
                  <CardHeader>
                    <CardTitle className="font-terminal">Usuarios Disponibles</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {profiles.map((user) => (
                        <div
                          key={user.id}
                          className={`p-3 cursor-pointer transition-colors hover:bg-primary/5 ${
                            selectedUserId === user.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                          }`}
                          onClick={() => setSelectedUserId(user.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-xs font-terminal text-primary">
                                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              </div>
                              {user.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-background rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1">
                                <h4 className="font-terminal font-medium text-primary truncate">
                                  {user.name}
                                </h4>
                                {user.isVerified && (
                                  <CheckCircle className="h-3 w-3 text-blue-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground font-terminal truncate">
                                @{user.username}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Perfil Seleccionado */}
              <div className="lg:col-span-3">
                <UserProfile
                  userId={selectedUserId}
                  currentUserId="user_001"
                  onEdit={handleEditProfile}
                  onMessage={handleSendMessage}
                />
              </div>
            </div>
          </TabsContent>

          {/* Tab: Mensajes */}
          <TabsContent value="messages" className="space-y-6">
            <PrivateMessages
              currentUserId="user_001"
              selectedUserId={selectedUserId}
              onUserSelect={setSelectedUserId}
            />
          </TabsContent>

          {/* Tab: Búsqueda */}
          <TabsContent value="search" className="space-y-6">
            <UserSearch
              currentUserId="user_001"
              onUserSelect={handleUserSelect}
              onFollow={handleFollow}
              showFollowButton={true}
              showMessageButton={true}
            />
          </TabsContent>

          {/* Tab: Demo */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Características Implementadas */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Características Implementadas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Perfiles Personalizables</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Avatar, biografía, ubicación, enlaces sociales
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Trophy className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Sistema de Badges</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Badges con rarezas (común, raro, épico, legendario)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Sistema de Logros</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Logros desbloqueables con puntos y categorías
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Mensajes Privados</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Sistema completo de mensajería privada
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Sistema de Seguimiento</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Seguir/dejar de seguir usuarios
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-terminal font-bold text-primary">Historial de Actividad</h4>
                        <p className="text-sm text-muted-foreground font-terminal">
                          Registro de actividades públicas del usuario
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas del Sistema */}
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Estadísticas del Sistema</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {profiles.length}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">Usuarios</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {profiles.reduce((acc, user) => acc + user.badges.length, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">Badges</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {profiles.reduce((acc, user) => acc + user.achievements.length, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">Logros</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-terminal">
                        {profiles.filter(user => user.isOnline).length}
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">En Línea</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/20">
                    <h4 className="font-terminal font-bold text-primary mb-3">Distribución de Niveles</h4>
                    <div className="space-y-2">
                      {[1, 5, 10, 15, 20].map(level => {
                        const count = profiles.filter(user => 
                          user.stats.level >= level && user.stats.level < level + 5
                        ).length;
                        return (
                          <div key={level} className="flex items-center justify-between">
                            <span className="text-sm font-terminal text-muted-foreground">
                              Nivel {level}-{level + 4}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${(count / profiles.length) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-terminal text-primary w-8 text-right">
                                {count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instrucciones de Uso */}
            <Card className="terminal-border">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Instrucciones de Uso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-terminal font-bold text-primary mb-2">Perfiles</h4>
                    <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                      <li>• Selecciona un usuario de la lista</li>
                      <li>• Ve su perfil completo</li>
                      <li>• Explora badges y logros</li>
                      <li>• Revisa su historial de actividad</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-terminal font-bold text-primary mb-2">Mensajes</h4>
                    <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                      <li>• Ve a la pestaña "Mensajes"</li>
                      <li>• Selecciona una conversación</li>
                      <li>• Envía mensajes privados</li>
                      <li>• Redacta nuevos mensajes</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-terminal font-bold text-primary mb-2">Búsqueda</h4>
                    <ul className="text-sm text-muted-foreground font-terminal space-y-1">
                      <li>• Busca usuarios por nombre</li>
                      <li>• Filtra por estado o tipo</li>
                      <li>• Ordena por diferentes criterios</li>
                      <li>• Sigue a otros usuarios</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserFeaturesTest;
