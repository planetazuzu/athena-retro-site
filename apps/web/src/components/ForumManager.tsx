import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  Flag, 
  Lock, 
  Pin, 
  Trash2, 
  Edit, 
  Eye,
  Ban,
  Award,
  Search,
  Filter,
  X
} from "lucide-react";

interface ForumThread {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "open" | "closed" | "pinned" | "featured";
  replies: number;
  views: number;
  lastActivity: string;
  reports: number;
}

interface ForumUser {
  id: string;
  username: string;
  role: "user" | "moderator" | "admin";
  status: "active" | "banned" | "suspended";
  reputation: number;
  posts: number;
  joined: string;
  lastSeen: string;
}

const ForumManager = () => {
  const [activeTab, setActiveTab] = useState("threads");
  const [searchTerm, setSearchTerm] = useState("");

  const threads: ForumThread[] = [
    {
      id: "1",
      title: "Técnicas de orientación sin brújula",
      author: "juan_survival",
      category: "Navegación",
      status: "open",
      replies: 15,
      views: 234,
      lastActivity: "2024-01-15 14:30",
      reports: 0
    },
    {
      id: "2",
      title: "Guía completa de primeros auxilios",
      author: "maria_explorer",
      category: "Primeros Auxilios",
      status: "pinned",
      replies: 45,
      views: 892,
      lastActivity: "2024-01-15 16:20",
      reports: 0
    },
    {
      id: "3",
      title: "Construcción de refugios de emergencia",
      author: "carlos_guide",
      category: "Supervivencia",
      status: "closed",
      replies: 23,
      views: 567,
      lastActivity: "2024-01-14 10:15",
      reports: 2
    }
  ];

  const users: ForumUser[] = [
    {
      id: "1",
      username: "juan_survival",
      role: "user",
      status: "active",
      reputation: 1250,
      posts: 45,
      joined: "2023-06-15",
      lastSeen: "2024-01-15 16:30"
    },
    {
      id: "2",
      username: "maria_explorer",
      role: "moderator",
      status: "active",
      reputation: 2890,
      posts: 156,
      joined: "2023-03-20",
      lastSeen: "2024-01-15 15:45"
    },
    {
      id: "3",
      username: "carlos_guide",
      role: "user",
      status: "banned",
      reputation: -50,
      posts: 12,
      joined: "2023-11-10",
      lastSeen: "2024-01-14 09:20"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "default",
      closed: "secondary",
      pinned: "default",
      featured: "default",
      active: "default",
      banned: "destructive",
      suspended: "secondary"
    } as const;

    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      user: "secondary",
      moderator: "default",
      admin: "default"
    } as const;

    return <Badge variant={variants[role as keyof typeof variants]}>{role}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary font-terminal">Gestión de Foros</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="font-terminal">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button className="font-terminal">
            <MessageSquare className="h-4 w-4 mr-2" />
            Nueva Categoría
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="threads" className="font-terminal">
            <MessageSquare className="h-4 w-4 mr-2" />
            Hilos ({threads.length})
          </TabsTrigger>
          <TabsTrigger value="users" className="font-terminal">
            <Users className="h-4 w-4 mr-2" />
            Usuarios ({users.length})
          </TabsTrigger>
          <TabsTrigger value="reports" className="font-terminal">
            <Flag className="h-4 w-4 mr-2" />
            Reportes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="threads" className="mt-6">
          <Card className="terminal-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-terminal">Hilos del Foro</CardTitle>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Buscar hilos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 font-terminal"
                  />
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threads.map((thread) => (
                  <div key={thread.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-sm border border-primary/20">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium font-terminal">{thread.title}</h3>
                        {getStatusBadge(thread.status)}
                        {thread.reports > 0 && (
                          <Badge variant="destructive" className="font-terminal">
                            {thread.reports} reportes
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                        <span>Por: {thread.author}</span>
                        <span>Categoría: {thread.category}</span>
                        <span>{thread.replies} respuestas</span>
                        <span>{thread.views} vistas</span>
                        <span>Última actividad: {thread.lastActivity}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="Ver hilo">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Fijar">
                        <Pin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Cerrar">
                        <Lock className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Eliminar">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="terminal-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-terminal">Usuarios del Foro</CardTitle>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Buscar usuarios..."
                    className="w-64 font-terminal"
                  />
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-sm border border-primary/20">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium font-terminal">{user.username}</h3>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground font-terminal">
                        <span>Reputación: {user.reputation}</span>
                        <span>{user.posts} posts</span>
                        <span>Se unió: {user.joined}</span>
                        <span>Última vez: {user.lastSeen}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="Ver perfil">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Dar premio">
                        <Award className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Suspender">
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card className="terminal-border">
            <CardHeader>
              <CardTitle className="font-terminal">Reportes Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    type: "Contenido inapropiado",
                    reporter: "usuario1",
                    target: "carlos_guide",
                    content: "Hilo: Construcción de refugios",
                    date: "2024-01-15 14:30",
                    status: "pendiente"
                  },
                  {
                    id: "2",
                    type: "Spam",
                    reporter: "usuario2",
                    target: "spammer123",
                    content: "Múltiples posts promocionales",
                    date: "2024-01-15 13:45",
                    status: "revisado"
                  }
                ].map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-sm border border-primary/20">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium font-terminal">{report.type}</h3>
                        <Badge variant={report.status === "pendiente" ? "destructive" : "secondary"}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground font-terminal">
                        <p>Reportado por: {report.reporter}</p>
                        <p>Objetivo: {report.target}</p>
                        <p>Contenido: {report.content}</p>
                        <p>Fecha: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="Ver contenido">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Aceptar reporte">
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Rechazar">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumManager; 