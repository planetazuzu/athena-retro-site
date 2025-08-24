import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
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

// Credenciales de admin (en producción esto debería estar en variables de entorno)
const ADMIN_CREDENTIALS = {
  email: 'planetazuzu@gmail.com', // Tu email real
  password: '941259018a' // Tu contraseña real
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
    const storedUser = localStorage.getItem('athena_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('athena_user');
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Verificar credenciales de admin
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminUser: User = {
          id: 'admin-1',
          email: email,
          role: 'admin',
          isVerified: true,
          createdAt: new Date()
        };
        
        setUser(adminUser);
        localStorage.setItem('athena_user', JSON.stringify(adminUser));
        setIsLoading(false);
        return true;
      }
      
      // Verificar si es un usuario registrado
      const users = JSON.parse(localStorage.getItem('athena_users') || '[]');
      const existingUser = users.find((u: User) => u.email === email);
      
      if (existingUser && existingUser.isVerified) {
        setUser(existingUser);
        localStorage.setItem('athena_user', JSON.stringify(existingUser));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Verificar si el email ya existe
      const users = JSON.parse(localStorage.getItem('athena_users') || '[]');
      const existingUser = users.find((u: User) => u.email === email);
      
      if (existingUser) {
        setIsLoading(false);
        return false; // Email ya registrado
      }
      
      // Crear nuevo usuario (no verificado)
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: email,
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
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
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
