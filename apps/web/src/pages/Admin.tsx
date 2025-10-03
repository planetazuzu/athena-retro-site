import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminPanel from "@/components/admin/AdminPanel";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirigir si no es admin
  useEffect(() => {
    if (isAuthenticated && user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Mostrar loading mientras se verifica la autenticación
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="text-primary font-terminal mt-4">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Redirigir si no es admin
  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Mostrar el panel de administrador
  return <AdminPanel />;
};

export default Admin; 