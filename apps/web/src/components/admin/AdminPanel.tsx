import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  FileText, 
  Settings, 
  BarChart3, 
  Shield,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: Date;
}

interface Donation {
  id: string;
  amount: number;
  donor: string;
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalAmount: 0,
    pendingDonations: 0
  });

  // Cargar datos del localStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Cargar usuarios
    const storedUsers = JSON.parse(localStorage.getItem('athena_users') || '[]');
    setUsers(storedUsers);

    // Cargar donaciones (simuladas)
    const storedDonations = JSON.parse(localStorage.getItem('athena_donations') || '[]');
    setDonations(storedDonations);

    // Calcular estadísticas
    const totalAmount = storedDonations.reduce((sum: number, donation: Donation) => 
      donation.status === 'completed' ? sum + donation.amount : sum, 0
    );
    
    setStats({
      totalUsers: storedUsers.length,
      totalDonations: storedDonations.length,
      totalAmount,
      pendingDonations: storedDonations.filter((d: Donation) => d.status === 'pending').length
    });
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('athena_users', JSON.stringify(updatedUsers));
    loadData();
  };

  const toggleUserVerification = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isVerified: !user.isVerified } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('athena_users', JSON.stringify(updatedUsers));
    loadData();
  };

  const updateDonationStatus = (donationId: string, status: 'pending' | 'completed' | 'failed') => {
    const updatedDonations = donations.map(donation =>
      donation.id === donationId ? { ...donation, status } : donation
    );
    setDonations(updatedDonations);
    localStorage.setItem('athena_donations', JSON.stringify(updatedDonations));
    loadData();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-terminal text-primary">
                🔐 PANEL DE ADMINISTRACIÓN
              </h1>
              <p className="text-muted-foreground font-terminal mt-2">
                Gestión completa de Athena Pocket
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="font-terminal">
                ADMIN
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-terminal text-muted-foreground">Usuarios</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-terminal text-muted-foreground">Donaciones</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalDonations}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-terminal text-muted-foreground">Total €</p>
                  <p className="text-2xl font-bold text-primary">€{stats.totalAmount}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-terminal text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold text-primary">{stats.pendingDonations}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de gestión */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="font-terminal">👥 Usuarios</TabsTrigger>
            <TabsTrigger value="donations" className="font-terminal">💰 Donaciones</TabsTrigger>
            <TabsTrigger value="settings" className="font-terminal">⚙️ Configuración</TabsTrigger>
          </TabsList>

          {/* Tab Usuarios */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="font-terminal text-primary">Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <p className="text-center text-muted-foreground font-terminal py-8">
                      No hay usuarios registrados
                    </p>
                  ) : (
                    users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-sm">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium font-terminal">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Registrado: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.isVerified ? "default" : "secondary"}>
                            {user.isVerified ? "Verificado" : "Pendiente"}
                          </Badge>
                          <Badge variant={user.role === 'admin' ? "destructive" : "outline"}>
                            {user.role}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleUserVerification(user.id)}
                            className="font-terminal"
                          >
                            {user.isVerified ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          {user.role !== 'admin' && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteUser(user.id)}
                              className="font-terminal"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Donaciones */}
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle className="font-terminal text-primary">Gestión de Donaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.length === 0 ? (
                    <p className="text-center text-muted-foreground font-terminal py-8">
                      No hay donaciones registradas
                    </p>
                  ) : (
                    donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 border border-border rounded-sm">
                        <div>
                          <p className="font-medium font-terminal">€{donation.amount}</p>
                          <p className="text-sm text-muted-foreground">Donante: {donation.donor}</p>
                          {donation.message && (
                            <p className="text-sm text-muted-foreground">"{donation.message}"</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {new Date(donation.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={
                              donation.status === 'completed' ? 'default' : 
                              donation.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {donation.status}
                          </Badge>
                          {donation.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateDonationStatus(donation.id, 'completed')}
                                className="font-terminal"
                              >
                                ✅ Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateDonationStatus(donation.id, 'failed')}
                                className="font-terminal"
                              >
                                ❌ Rechazar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Configuración */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="font-terminal text-primary">Configuración del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="font-terminal text-primary">Estado del Sistema</Label>
                    <div className="mt-2 p-4 bg-green-500/10 border border-green-500/20 rounded-sm">
                      <p className="text-green-400 font-terminal">✅ Sistema operativo</p>
                      <p className="text-sm text-muted-foreground">Última verificación: {new Date().toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="font-terminal text-primary">Versión</Label>
                    <p className="text-sm text-muted-foreground">Athena Pocket v1.0.0</p>
                  </div>

                  <div>
                    <Label className="font-terminal text-primary">Base de Datos</Label>
                    <p className="text-sm text-muted-foreground">LocalStorage (Desarrollo)</p>
                  </div>

                  <Button className="font-terminal" onClick={() => {
                    localStorage.clear();
                    loadData();
                  }}>
                    🔄 Limpiar Datos de Desarrollo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
