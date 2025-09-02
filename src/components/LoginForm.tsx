import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Lock, Mail, UserPlus, Shield } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('planetazuzu@gmail.com'); // Email del admin por defecto
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const { login, register, user, isAdmin } = useAuth();

  // Si ya está logueado, redirigir
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          setMessage('✅ Login exitoso! Redirigiendo...');
          setMessageType('success');
          // La redirección se maneja en el useEffect
        } else {
          setMessage('❌ Credenciales incorrectas o usuario no verificado');
          setMessageType('error');
        }
      } else {
        const success = await register(email);
        if (success) {
          setMessage('✅ Registro exitoso! Revisa tu email para verificación');
          setMessageType('success');
          setEmail('');
        } else {
          setMessage('❌ Email ya registrado');
          setMessageType('error');
        }
      }
    } catch (error) {
      setMessage('❌ Error del servidor');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setIsLogin(value === "login");
    if (value === "login") {
      setEmail('planetazuzu@gmail.com'); // Restaurar email del admin
    } else {
      setEmail(''); // Limpiar email para registro
    }
    setMessage(''); // Limpiar mensajes
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="terminal-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-terminal text-2xl text-primary terminal-glow">
              {isLogin ? 'ACCESO ADMIN' : 'REGISTRO USUARIO'}
            </CardTitle>
            <p className="text-muted-foreground font-terminal text-sm">
              {isLogin 
                ? 'Ingresa con tus credenciales de administrador'
                : 'Regístrate para acceder a la comunidad'
              }
            </p>
          </CardHeader>
          
          <CardContent>
            <Tabs value={isLogin ? "login" : "register"} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger 
                  value="login" 
                  className="font-terminal"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  ADMIN
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="font-terminal"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  USUARIO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="font-terminal text-primary">
                      Email Administrador
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="planetazuzu@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 font-terminal"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="font-terminal text-primary">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 font-terminal"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Información de credenciales */}
                  <div className="bg-primary/10 border border-primary/20 rounded-sm p-3">
                    <p className="text-xs text-primary font-terminal">
                      🔑 <strong>Credenciales de Admin:</strong><br/>
                      Email: planetazuzu@gmail.com<br/>
                      Contraseña: 941259018a
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full font-terminal glow-effect"
                    disabled={isLoading}
                  >
                    {isLoading ? '🔐 VERIFICANDO...' : '🔓 ACCEDER'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="font-terminal text-primary">
                      Email de Usuario
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="usuario@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 font-terminal"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-sm p-3">
                    <p className="text-xs text-primary font-terminal">
                      ℹ️ Solo necesitas tu email. Te enviaremos un enlace de verificación.
                      Los administradores revisarán tu solicitud manualmente.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full font-terminal glow-effect"
                    disabled={isLoading}
                  >
                    {isLoading ? '📧 ENVIANDO...' : '📝 REGISTRARSE'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {message && (
              <div className={`mt-4 p-3 rounded-sm text-sm font-terminal ${
                messageType === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-400'
              }`}>
                {message}
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground font-terminal">
                {isLogin 
                  ? '¿Eres usuario? Cambia a la pestaña de registro'
                  : '¿Eres administrador? Cambia a la pestaña de login'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
