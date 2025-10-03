import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  fallbackToLogin?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  fallbackToLogin = true 
}: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="text-primary font-terminal">VERIFICANDO ACCESO...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado
  if (!user) {
    if (fallbackToLogin) {
      return <LoginForm />;
    }
    return <Navigate to="/" replace />;
  }

  // Si requiere admin y el usuario no es admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚫</span>
            </div>
            <h1 className="text-2xl font-bold text-red-400 font-terminal mb-2">
              ACCESO DENEGADO
            </h1>
            <p className="text-muted-foreground font-terminal">
              No tienes permisos de administrador para acceder a esta página.
            </p>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-sm font-terminal hover:bg-primary/90"
          >
            VOLVER
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
