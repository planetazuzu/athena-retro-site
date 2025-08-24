import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

interface CookieConsent {
  accepted: boolean;
  preferences: CookiePreferences;
  timestamp: number;
}

const useCookies = () => {
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar preferencias de cookies desde localStorage
  useEffect(() => {
    const loadCookieConsent = () => {
      try {
        const stored = localStorage.getItem('athena-cookie-consent');
        if (stored) {
          const parsed = JSON.parse(stored);
          setCookieConsent(parsed);
        }
      } catch (error) {
        console.error('Error loading cookie consent:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCookieConsent();
  }, []);

  // Guardar preferencias de cookies
  const saveCookieConsent = (preferences: CookiePreferences) => {
    const consent: CookieConsent = {
      accepted: true,
      preferences,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem('athena-cookie-consent', JSON.stringify(consent));
      setCookieConsent(consent);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  // Aceptar todas las cookies
  const acceptAllCookies = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    saveCookieConsent(preferences);
  };

  // Rechazar cookies opcionales
  const declineOptionalCookies = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };
    saveCookieConsent(preferences);
  };

  // Personalizar cookies
  const customizeCookies = (preferences: Partial<CookiePreferences>) => {
    const currentPreferences = cookieConsent?.preferences || {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };

    const newPreferences: CookiePreferences = {
      ...currentPreferences,
      ...preferences,
      timestamp: Date.now()
    };

    saveCookieConsent(newPreferences);
  };

  // Verificar si se han aceptado las cookies
  const hasConsented = () => {
    return cookieConsent?.accepted || false;
  };

  // Verificar si se han aceptado cookies específicas
  const hasAccepted = (type: keyof CookiePreferences) => {
    return cookieConsent?.preferences[type] || false;
  };

  // Obtener estadísticas de visitas (solo si se aceptaron cookies analíticas)
  const canTrackAnalytics = () => {
    return hasAccepted('analytics');
  };

  // Obtener publicidad personalizada (solo si se aceptaron cookies de marketing)
  const canShowMarketing = () => {
    return hasAccepted('marketing');
  };

  // Limpiar todas las cookies
  const clearAllCookies = () => {
    try {
      localStorage.removeItem('athena-cookie-consent');
      setCookieConsent(null);
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  };

  // Obtener información de las cookies
  const getCookieInfo = () => {
    return {
      hasConsented: hasConsented(),
      preferences: cookieConsent?.preferences,
      timestamp: cookieConsent?.timestamp,
      canTrackAnalytics: canTrackAnalytics(),
      canShowMarketing: canShowMarketing()
    };
  };

  return {
    cookieConsent,
    isLoading,
    acceptAllCookies,
    declineOptionalCookies,
    customizeCookies,
    hasConsented,
    hasAccepted,
    canTrackAnalytics,
    canShowMarketing,
    clearAllCookies,
    getCookieInfo
  };
};

export default useCookies; 