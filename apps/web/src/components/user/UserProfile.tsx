import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Calendar, 
  Shield,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Bell,
  Lock,
  Globe,
  Award,
  Heart,
  MessageSquare
} from "lucide-react";

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  location: string;
  website: string;
  joinDate: Date;
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  preferences: {
    notifications: boolean;
    publicProfile: boolean;
    emailUpdates: boolean;
  };
  stats: {
    posts: number;
    donations: number;
    totalDonated: number;
    badges: number;
  };
}

interface UserProfileProps {
  user?: UserProfileData;
  onSave?: (userData: UserProfileData) => void;
  onCancel?: () => void;
  isEditable?: boolean;
}

const UserProfile = ({ user, onSave, onCancel, isEditable = false }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfileData>(user || {
    id: 'user-1',
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    bio: 'Apasionado por la supervivencia y la tecnología.',
    location: 'Madrid, España',
    website: 'https://mi-sitio.com',
    joinDate: new Date('2024-01-01'),
    role: 'user',
    isVerified: false,
    preferences: {
      notifications: true,
      publicProfile: true,
      emailUpdates: true
    },
    stats: {
      posts: 5,
      donations: 3,
      totalDonated: 150,
      badges: 2
    }
  });

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user || formData);
    setIsEditing(false);
    onCancel?.();
  };

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

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback className="text-xl font-terminal bg-primary/20">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold font-terminal text-primary">
                    {formData.name}
                  </h1>
                  {formData.isVerified && (
                    <Badge variant="default" className="bg-blue-500">
                      ✅ Verificado
                    </Badge>
                  )}
                  {getRoleBadge(formData.role)}
                </div>
                <p className="text-muted-foreground font-terminal">
                  Miembro desde {formData.joinDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {isEditable && (
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="font-terminal">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="font-terminal">
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="font-terminal">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Información personal */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <User className="h-5 w-5 mr-2" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="font-terminal text-primary">Nombre</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="font-terminal mt-1"
                />
              ) : (
                <p className="font-terminal mt-1">{formData.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="font-terminal text-primary">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="font-terminal mt-1"
                />
              ) : (
                <p className="font-terminal mt-1 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {formData.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="location" className="font-terminal text-primary">Ubicación</Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="font-terminal mt-1"
                />
              ) : (
                <p className="font-terminal mt-1 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  {formData.location}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="website" className="font-terminal text-primary">Sitio Web</Label>
              {isEditing ? (
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="font-terminal mt-1"
                />
              ) : (
                <p className="font-terminal mt-1">
                  {formData.website ? (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {formData.website}
                    </a>
                  ) : (
                    'No especificado'
                  )}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="bio" className="font-terminal text-primary">Biografía</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="font-terminal mt-1"
                rows={4}
              />
            ) : (
              <p className="font-terminal mt-1">{formData.bio}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Estadísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary font-terminal">
                {formData.stats.posts}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary font-terminal">
                {formData.stats.donations}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Donaciones</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400 font-terminal">
                €{formData.stats.totalDonated}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Total Donado</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary font-terminal">
                {formData.stats.badges}
              </p>
              <p className="text-sm text-muted-foreground font-terminal">Insignias</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferencias */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Preferencias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="font-terminal text-primary">Notificaciones</span>
              </div>
              <input
                type="checkbox"
                checked={formData.preferences.notifications}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, notifications: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="font-terminal text-primary">Perfil Público</span>
              </div>
              <input
                type="checkbox"
                checked={formData.preferences.publicProfile}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, publicProfile: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-terminal text-primary">Actualizaciones por Email</span>
              </div>
              <input
                type="checkbox"
                checked={formData.preferences.emailUpdates}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, emailUpdates: e.target.checked }
                }))}
                disabled={!isEditing}
                className="rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="font-terminal text-primary flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="font-terminal">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ver Posts
            </Button>
            <Button variant="outline" className="font-terminal">
              <Heart className="h-4 w-4 mr-2" />
              Ver Donaciones
            </Button>
            <Button variant="outline" className="font-terminal">
              <Award className="h-4 w-4 mr-2" />
              Ver Insignias
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
