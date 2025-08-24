import { useState, useEffect } from 'react';
import useCookies from './useCookies';

interface VisitData {
  page: string;
  timestamp: number;
  userAgent: string;
  referrer: string;
}

interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  lastVisit: number;
}

const useVisitCounter = () => {
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: 0,
    todayVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    lastVisit: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { canTrackAnalytics } = useCookies();

  // Generar ID único para el visitante
  const getVisitorId = (): string => {
    let visitorId = localStorage.getItem('athena-visitor-id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('athena-visitor-id', visitorId);
    }
    return visitorId;
  };

  // Registrar una visita
  const recordVisit = (page: string = window.location.pathname) => {
    if (!canTrackAnalytics()) {
      return;
    }

    const visitData: VisitData = {
      page,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    // Guardar visita en localStorage (en producción iría a una API)
    const visits = JSON.parse(localStorage.getItem('athena-visits') || '[]');
    visits.push(visitData);
    localStorage.setItem('athena-visits', JSON.stringify(visits));

    // Actualizar estadísticas
    updateStats();
  };

  // Actualizar estadísticas
  const updateStats = () => {
    const visits = JSON.parse(localStorage.getItem('athena-visits') || '[]');
    const visitorId = getVisitorId();
    
    const now = Date.now();
    const today = new Date().setHours(0, 0, 0, 0);
    
    const totalVisits = visits.length;
    const todayVisits = visits.filter((visit: VisitData) => 
      new Date(visit.timestamp).setHours(0, 0, 0, 0) === today
    ).length;
    
    const uniqueVisitors = new Set(visits.map((visit: VisitData) => visitorId)).size;
    const pageViews = visits.length;
    const lastVisit = visits.length > 0 ? visits[visits.length - 1].timestamp : 0;

    setStats({
      totalVisits,
      todayVisits,
      uniqueVisitors,
      pageViews,
      lastVisit
    });
  };

  // Cargar estadísticas iniciales
  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 500));
      
      updateStats();
      setIsLoading(false);
    };

    loadStats();
  }, []);

  // Registrar visita cuando cambia la página
  useEffect(() => {
    if (canTrackAnalytics()) {
      recordVisit();
    }
  }, [window.location.pathname]);

  // Obtener estadísticas de una página específica
  const getPageStats = (page: string) => {
    const visits = JSON.parse(localStorage.getItem('athena-visits') || '[]');
    return visits.filter((visit: VisitData) => visit.page === page).length;
  };

  // Obtener páginas más visitadas
  const getTopPages = (limit: number = 5) => {
    const visits = JSON.parse(localStorage.getItem('athena-visits') || '[]');
    const pageCounts: { [key: string]: number } = {};
    
    visits.forEach((visit: VisitData) => {
      pageCounts[visit.page] = (pageCounts[visit.page] || 0) + 1;
    });

    return Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([page, count]) => ({ page, count }));
  };

  // Obtener estadísticas de tiempo real
  const getRealTimeStats = () => {
    const visits = JSON.parse(localStorage.getItem('athena-visits') || '[]');
    const now = Date.now();
    const lastHour = now - (60 * 60 * 1000);
    
    const recentVisits = visits.filter((visit: VisitData) => 
      visit.timestamp > lastHour
    );

    return {
      activeUsers: recentVisits.length,
      recentPages: recentVisits.slice(-5).reverse().map((visit: VisitData) => ({
        page: visit.page,
        time: visit.timestamp
      }))
    };
  };

  // Limpiar datos de visitas (para testing)
  const clearVisitData = () => {
    localStorage.removeItem('athena-visits');
    localStorage.removeItem('athena-visitor-id');
    setStats({
      totalVisits: 0,
      todayVisits: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      lastVisit: 0
    });
  };

  return {
    stats,
    isLoading,
    recordVisit,
    updateStats,
    getPageStats,
    getTopPages,
    getRealTimeStats,
    clearVisitData,
    canTrackAnalytics
  };
};

export default useVisitCounter; 