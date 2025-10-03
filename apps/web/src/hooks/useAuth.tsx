import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  isVerified: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciales de admin (desde variables de entorno)
const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'planetazuzu@gmail.com',
  password: import.meta.env.VITE_ADMIN_PASSWORD || '941259018a'
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem('athena_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Verificar que el usuario tenga la estructura correcta
        if (userData.id && userData.email && userData.role) {
          setUser(userData);
        } else {
          localStorage.removeItem('athena_user');
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.removeItem('athena_user');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Verificar credenciales de admin
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminUser: User = {
          id: 'admin-1',
          email: email,
          name: 'Administrador',
          role: 'admin',
          isVerified: true,
          createdAt: new Date()
        };
        
        setUser(adminUser);
        localStorage.setItem('athena_user', JSON.stringify(adminUser));
        console.log('✅ Admin logueado exitosamente');
        return true;
      }
      
      // Verificar si es un usuario registrado
      const users = JSON.parse(localStorage.getItem('athena_users') || '[]');
      const existingUser = users.find((u: User) => u.email === email);
      
      if (existingUser && existingUser.isVerified) {
        setUser(existingUser);
        localStorage.setItem('athena_user', JSON.stringify(existingUser));
        console.log('✅ Usuario logueado exitosamente');
        return true;
      }
      
      console.log('❌ Login fallido: credenciales incorrectas o usuario no verificado');
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Verificar si el email ya existe
      const users = JSON.parse(localStorage.getItem('athena_users') || '[]');
      const existingUser = users.find((u: User) => u.email === email);
      
      if (existingUser) {
        console.log('❌ Email ya registrado:', email);
        return false;
      }
      
      // Crear nuevo usuario (no verificado)
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: email,
        name: email.split('@')[0], // Usar parte del email como nombre
        role: 'user',
        isVerified: false,
        createdAt: new Date()
      };
      
      // Guardar en lista de usuarios
      users.push(newUser);
      localStorage.setItem('athena_users', JSON.stringify(users));
      
      // Enviar email de verificación (simulado)
      console.log(`📧 Email de verificación enviado a: ${email}`);
      console.log('🔑 En producción, aquí se enviaría un email real');
      
      return true;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Usuario deslogueado');
    setUser(null);
    localStorage.removeItem('athena_user');
  };

  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
